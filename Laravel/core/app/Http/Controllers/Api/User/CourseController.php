<?php

namespace App\Http\Controllers\Api\User;

use App\Constants\Status;
use App\Http\Controllers\Controller;
use App\Lib\GoogleAuthenticator;
use App\Models\Coupon;
use App\Models\Course;
use App\Models\CourseComplete;
use App\Models\CoursePurchased;
use App\Models\CourseResource;
use App\Models\Curriculum;
use App\Models\GetCertificateUser;
use App\Models\Quiz;
use App\Models\QuizSubmit;
use App\Models\Review;
use App\Models\User;
use App\Models\UserActivity;
use App\Models\UserProgress;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function enrolledCourse()
    {

        $enrolledCourses = CoursePurchased::where('user_id', auth()->id())->where('payment_status', Status::PAYMENT_SUCCESS)->with('course')->paginate(getPaginate());

        $notify[] = 'Enrolled courses';
        return responseSuccess('enrolled_courses', $notify, [
            'enrolled_courses' => $enrolledCourses
        ]);
    }



    public function watchCourse($slug)
    {

        $course = Course::with('sections', 'lectures', 'quizzes', 'curriculums', 'sections.curriculums.lectures', 'sections.curriculums.quizzes', 'sections.curriculums.quizzes.questions.options', 'objects', 'requirements', 'contents', 'sections.curriculums.lectures.resources', 'instructor', 'reviews.user', 'reviews.instructor', 'purchases')->where('slug', $slug)->first();

        if (!$course) {
            $notify[] =  'Invalid course';
            return responseError('course_not_found', $notify);
        }

        $enrollCourse = $course->purchases()->where('payment_status', Status::PAYMENT_SUCCESS)->where('user_id', auth()->id())->exists();

        if (!$enrollCourse) {
            $notify[] =  'You need to enroll in this course to watch the lecture';
            return responseError('enroll_course_failed', $notify);
        }

        $enrolledUsers = User::whereHas('purchases', function ($query) use ($course) {
            $query->where('payment_status', Status::PAYMENT_SUCCESS)->where('course_id', $course->id);
        })->latest()->take(4)->get();

        $notify[] = 'Course content';
        return responseSuccess('course_content', $notify, [
            'course' => $course,
            'enrolled_users' => $enrolledUsers

        ]);
    }

    public function lectureComplete($id)
    {

        $curriculum = Curriculum::find($id);

        if (!$curriculum) {
            $notify[] =  'Invalid curriculum';
            return responseError('curriculum_not_found', $notify);
        }

        $course = $curriculum->course;

        if (!$course) {
            $notify[] =  'Invalid course';
            return responseError('course_not_found', $notify);
        }

        $enrollCourse = CoursePurchased::where('user_id', auth()->id())->where('course_id', $course->id)->where('payment_status', Status::PAYMENT_SUCCESS)->exists();

        if (!$enrollCourse) {
            $notify[] =  'You are not enrolled in this course';
            return responseError('enroll_course_failed', $notify);
        }

        $userProgress = UserProgress::where('user_id', auth()->id())->where('course_id', $course->id)->where('curriculum_id', $curriculum->id)->first();

        if ($userProgress) {
            $userProgress->delete();
        } else {
            $userProgress = new UserProgress();
            $userProgress->user_id = auth()->id();
            $userProgress->course_id = $course->id;
            $userProgress->curriculum_id = $curriculum->id;
            $userProgress->save();
        }


        $totalCurriculum = $course->curriculums()->count();
        $completedCurriculum = UserProgress::where('user_id', auth()->id())->where('course_id', $course->id)->count();
        $percentage = ($completedCurriculum / $totalCurriculum) * 100;


        $notify[] = 'Lecture completed successfully';
        return responseSuccess('lecture_completed', $notify, [
            'percentage' => $percentage,
            'course' => $course->load('sections')
        ]);
    }



    public function quizView($id)
    {
        $quiz = Quiz::with('questions.options')->find($id);

        if (!$quiz) {
            $notify[] =  'Invalid Quiz';
            return responseError('quiz_not_found', $notify);
        }

        $section = $quiz->section;

        if (!$section) {
            $notify[] =  'Invalid Section';
            return responseError('section_not_found', $notify);
        }

        $course = $section->course;

        if (!$course) {
            $notify[] = 'Invalid Course';
            return responseError('course_not_found', $notify);
        }

        $enrollCourse = CoursePurchased::where('user_id', auth()->id())->where('course_id', $course->id)->where('payment_status', Status::PAYMENT_SUCCESS)->exists();

        if (!$enrollCourse) {
            $notify[] =  'You need to enroll in this course to access the quiz';
            return responseError('enroll_course_failed', $notify);
        }


        $notify[] = 'Quiz content';
        return responseSuccess('quiz_content', $notify, ['quiz' => $quiz, 'course' => $course]);
    }


    public function quizSubmit(Request $request)
    {
        $quiz = Quiz::find($request->quiz_id);

        if (!$quiz) {
            $notify[] =  'Invalid Quiz';
            return responseError('quiz_not_found', $notify);
        }

        $section = $quiz->section;

        if (!$section) {
            $notify[] = 'Invalid Section';
            return responseError('section_not_found', $notify);
        }

        $course = $section->course;

        if (!$course) {
            $notify[] = 'Invalid Course';
            return responseError('course_not_found', $notify);
        }

        $enrollCourse = CoursePurchased::where('user_id', auth()->id())->where('course_id', $course->id)->where('payment_status', Status::PAYMENT_SUCCESS)->exists();
        if (!$enrollCourse) {
            $notify[] =  'You need to enroll in this course to access the quiz';
            return responseError('enroll_course_failed', $notify);
        }

        UserProgress::where('user_id', auth()->id())->where('course_id', $course->id)->where('curriculum_id', $quiz->curriculum_id)->delete();


        $validator = Validator::make($request->all(), [
            'answers' => 'required',
        ], [
            'required' => 'Answer is required',
        ]);

        if ($validator->fails()) {
            return responseError('validation_error', $validator->errors());
        }


        $options = $quiz->options()->whereIn('id', $request->answers)->get();

        if (count($quiz->questions) != count($options)) {
            $notify[] =  'Invalid answer options';
            return responseError('validation_error', $notify);
        }

        $quizSubmitData = QuizSubmit::where('course_id', $course->id)->where('quiz_id', $quiz->id)->where('user_id', auth()->id())->get();

        if (count($quizSubmitData) > 0) {
            foreach ($quizSubmitData as $data) {
                $data->delete();
            }
        }


        foreach ($options as $option) {
            $quizSubmit = new QuizSubmit();
            $quizSubmit->user_id = auth()->id();
            $quizSubmit->course_id = $course->id;
            $quizSubmit->course_section_id = $section->id;
            $quizSubmit->quiz_id = $quiz->id;
            $quizSubmit->quiz_question_id = $option->quiz_question_id;
            $quizSubmit->quiz_option_id = $option->id;
            $quizSubmit->answer = $option->answer;
            $quizSubmit->save();
        }

        $userProgress = new UserProgress();
        $userProgress->user_id = auth()->id();
        $userProgress->course_id = $course->id;
        $userProgress->curriculum_id = $quiz->curriculum_id;
        $userProgress->save();

        $notify[] = 'Quiz submitted successfully';
        return responseSuccess('quiz_submitted', $notify, [
            'quiz' => $quiz
        ]);
    }

    public function ResourcesDownload($resourceId)
    {
        $resource = CourseResource::find($resourceId);

        if (!$resource) {
            $notify[] = 'Invalid Resource';
            return responseError('resource_not_found', $notify);
        }

        $course = $resource->course;

        if (!$course) {
            $notify[] = 'Invalid Course';
            return responseError('course_not_found', $notify);
        }

        $enrollCourse = CoursePurchased::where('user_id', auth()->id())->where('course_id', $course->id)->where('payment_status', Status::PAYMENT_SUCCESS)->exists();

        if (!$enrollCourse) {
            $notify[] = 'You need to enroll in this course to access the resources';
            return responseError('enroll_course_failed', $notify);
        }

        $file = $resource->file;
        $path = getFilePath('resources');
        $fullPath = $path . '/' . $file;

        if (!file_exists($fullPath)) {

            $notify[] = 'resources not found';
            return responseError('resources_not_found', $notify);
        }


        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $mimetype = mime_content_type($fullPath);

        if (!headers_sent()) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET,');
            header('Access-Control-Allow-Headers: Content-Type');
        }

        header("Content-Type: " . $mimetype);
        return readfile($fullPath);
    }



    public function userActivity()
    {
        $activity = UserActivity::where('user_id', auth()->id())->whereDate('active_date', now())->exists();

        if (!$activity) {
            $activity = new UserActivity();
            $activity->user_id = auth()->id();
            $activity->active_date = now();
            $activity->save();
        }

        $notify[] = 'User activity recorded';
        return responseSuccess(
            'activity_list',
            $notify,
            ['activities' => $activity]
        );
    }


    public function reviewSubmit(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'rate_value' => 'required|in:1,2,3,4,5',
        ]);
        if ($validator->fails()) {
            return responseError('validation_error', $validator->errors());
        }
        $course = Course::active()->where('slug', $slug)->first();

        if (!$course) {
            $notify[] =  'Invalid Course';
            return responseError('course_not_found', $notify);
        }

        $enrollCourse = CoursePurchased::where('user_id', auth()->id())->where('course_id', $course->id)->where('payment_status', Status::PAYMENT_SUCCESS)->exists();

        if (!$enrollCourse) {
            $notify[] =  'You need to enroll in this course to access the review';
            return responseError('enroll_course_failed', $notify);
        }
        $courseReview = Review::where('user_id', auth()->id())->where('course_id', $course->id)->first();
        if ($courseReview) {
            $notify[] =  'You have already submitted a review for this course';
            return responseError('review_submitted', $notify);
        }


        if ($request->rate_value) {
            $courseReview = new Review();
            $courseReview->user_id = auth()->id();
            $courseReview->course_id = $course->id;
            $courseReview->instructor_id = $course->instructor_id;
            $courseReview->comment = $request->user_comment;
            $courseReview->rating = $request->rate_value;
            $courseReview->save();
        }

        $course = $course->load('reviews');

        $notify[] = 'Review submitted successfully';
        return responseSuccess('review_submitted', $notify, [
            'course_review' => $course->reviews->load('user'),
            'course' => $course
        ]);
    }

    public function certificateDownload($slug)
    {
        $course = Course::active()->where('slug', $slug)->first();

        if (!$course) {
            $notify[] = 'Invalid Course';
            return responseError('course_not_found', $notify);
        }

        $enrollCourse = CoursePurchased::where('user_id', auth()->id())->where('course_id', $course->id)->where('payment_status', Status::PAYMENT_SUCCESS)->exists();


        if (!$enrollCourse) {
            $notify[] = 'You need to enroll in this course to access the certificate';
            return responseError('enroll_course_failed', $notify);
        }

        $courseComplete = $course->completes()->where('user_id', auth()->id())->first();

        if (!$courseComplete) {
            $notify[] =  'You have not completed this course yet';
            return responseError('course_not_completed', $notify);
        }

        $user = auth()->user();

        $getCertificateData = GetCertificateUser::where('user_id', $user->id)->where('course_id', $course->id)->first();

        if (!$getCertificateData) {
            $secret = getTrx();
            $getCertificateData = new GetCertificateUser();
            $getCertificateData->user_id = $user->id;
            $getCertificateData->course_id = $course->id;
            $getCertificateData->secret = $secret;
            $getCertificateData->save();
        }


        $url  = gs('verify_url') . '/' . $getCertificateData->secret;



        $qrCodeUrl = certificateQr($url);


        $general = gs();

        $logo = '<img src="data:image/png;base64,' . base64_encode(file_get_contents(getFilePath('logoIcon') . '/logo_dark.png')) . '" />';
        $qrCode = '<img  src="data:image/png;base64,' . base64_encode(file_get_contents($qrCodeUrl)) . '" />';

        $certificate = str_replace("{{student_name}}", $user->firstname . ' ' . $user->lastname, $general->certificate_template);
        $certificate = str_replace("{{site_name}}", $general->site_name, $certificate);
        $certificate = str_replace("{{qr_code}}", $qrCode, $certificate);
        $certificate = str_replace("{{course_title}}", $course->title, $certificate);
        $certificate = str_replace("{{instructor_name}}", $course->instructor->firstname . ' ' . $course->instructor->lastname, $certificate);
        $certificate = str_replace("{{site_logo}}", $logo, $certificate);
        $certificate = str_replace("{{course_completion_date}}", showDateTime($courseComplete->created_at, 'F j, Y'), $certificate);
        $certificate = str_replace("{{course_based_message}}", $course->congrats_message, $certificate);

        $data = [
            'certificate' => $certificate
        ];


        $pdf = PDF::loadView('certificate_pdf', $data)
            ->setPaper('a4', 'landscape')
            ->setOption('dpi', 110)
            ->setOption('defaultFont', 'sans-serif');


        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="certificate.pdf"');
    }

    public function courseComplete($slug)
    {
        $course = Course::active()->where('slug', $slug)->first();

        if (!$course) {
            $notify[] = 'Invalid Course';
            return responseError('course_not_found', $notify);
        }

        $enrollCourse = CoursePurchased::where('user_id', auth()->id())->where('course_id', $course->id)->where('payment_status', Status::PAYMENT_SUCCESS)->exists();

        if (!$enrollCourse) {
            $notify[] =  'You need to enroll in this course to access the course completion';
            return responseError('enroll_course_failed', $notify);
        }

        if ($course->progress != 100) {
            $notify[] =  'Please complete the all course lecture.';
            return responseError('course_completion_failed', $notify);
        }

        $user = auth()->user();
        $isCompleted = CourseComplete::where('user_id', $user->id)->where('course_id', $course->id)->exists();
        if ($isCompleted) {
            $notify[] = 'You have already completed this course';
            return responseError('course_completion_failed', $notify);
        }

        $courseComplete = new CourseComplete();
        $courseComplete->user_id = auth()->id();
        $courseComplete->course_id = $course->id;
        $courseComplete->instructor_id = $course->instructor_id;
        $courseComplete->save();


        Notify(auth()->user(),'COURSE_COMPLETE',[
            'congrats_message'=>$course->congrats_message,
        ]);

        $notify[] = 'Course completed successfully';
        return responseSuccess('course_completion', $notify);
    }


    public function checkCoupon(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'coupon_code' => 'required',
        ]);
        if ($validator->fails()) {
            return responseError('validation_error', $validator->errors());
        }

        $coupon      = $this->getCouponByCode($request->coupon_code);


        if (!$coupon) {
            $notify[] = 'Invalid Coupon code';
            return responseError('coupon_not_found', $notify);
        }

        if ($coupon->applied_coupons_count >= $coupon->usage_limit_per_coupon) {
            $notify[] =  'Coupon usage limit reached.';
            return responseError('coupon_usage_limit_reached', $notify);
        }


        if ($coupon->user_applied_count >= $coupon->usage_limit_per_user) {
            $notify[] = 'Coupon usage limit reached.';
            return responseError('coupon_usage_limit_reached', $notify);
        }

        $course = Course::active()->find($request->course_id);

        if (!$course) {
            $notify[] = 'Invalid Course';
            return responseError('course_not_found', $notify);
        }

        $minimumSpend = $coupon->minimum_spend;
        $maximumSpend = $coupon->maximum_spend;
        $price = $course->price - $course->discount_price;


        if ($price < $minimumSpend) {
            $notify[] =  'Course price should be greater than or equal to ' . $minimumSpend;
            return responseError('course_price_error', $notify);
        }

        if ($price > $maximumSpend) {
            $notify[] = 'Course price should be less than or equal to ' . $maximumSpend;
            return responseError('course_price_error', $notify);
        }

        $couponDiscount =    $coupon->discountAmount($price);

        $notify[] = 'Coupon applied successfully';
        return responseSuccess('coupon_applied', $notify, [
            'coupon_code' => $coupon->coupon_code,
            'amount'      => getAmount($couponDiscount),
            'coupon'    => $coupon,

        ]);
    }

    public function getCouponByCode(string $code)
    {
        return Coupon::activeAndValid()->matchCode($code)
            ->withCount('appliedCoupons')
            ->withCount(['appliedCoupons as user_applied_count' => function ($appliedCoupon) {
                $appliedCoupon->where('user_id', auth()->id());
            }])->first();
    }
}
