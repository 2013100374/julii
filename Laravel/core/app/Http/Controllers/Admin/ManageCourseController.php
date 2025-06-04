<?php

namespace App\Http\Controllers\Admin;

use App\Constants\Status;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CoursePurchased;
use App\Models\CourseResource;
use App\Models\GetCertificateUser;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ManageCourseController extends Controller
{


    public function index($instructorId = null)
    {
        $pageTitle = 'All Courses';
        $courses = $this->courseData(instructorId: $instructorId);
        return view('admin.courses.lists', compact('pageTitle', 'courses'));
    }

    public function pending($instructorId = null)
    {
        $pageTitle = 'Pending Courses';
        $courses = $this->courseData('pending', instructorId: $instructorId);
        return view('admin.courses.lists', compact('pageTitle', 'courses'));
    }
    public function approved($instructorId = null)
    {
        $pageTitle = 'Approved Courses';
        $courses = $this->courseData('approved', instructorId: $instructorId);
        return view('admin.courses.lists', compact('pageTitle', 'courses'));
    }

    public function rejected($instructorId = null)
    {
        $pageTitle = 'Rejected Courses';
        $courses = $this->courseData('rejected', instructorId: $instructorId);
        return view('admin.courses.lists', compact('pageTitle', 'courses'));
    }

    public function popularCourses($instructorId = null)
    {
        $pageTitle = 'Popular Courses';
        $courses = $this->courseData('popular', instructorId: $instructorId);
        return view('admin.courses.lists', compact('pageTitle', 'courses'));
    }


    public function trash()
    {
        $pageTitle = 'Trash Courses';
        $courses = Course::searchable(['title', 'instructor:username'])->with(['category', 'subcategory', 'instructor'])->orderBy('id', 'desc')->onlyTrashed()->paginate(getPaginate());
        return view('admin.courses.lists', compact('pageTitle', 'courses'));
    }


    public function restore($slug)
    {
        $course = Course::withTrashed()->where('slug', $slug)->first();
        if (!$course) {
            $notify[] = ['error', 'Invalid course'];
            return back()->withNotify($notify);
        }
        $course->restore();
        $notify[] = ['success', 'Course has been restored successfully'];
        return back()->withNotify($notify);
    }


    protected function courseData($scope = null, $instructorId = null)
    {
        if ($scope) {
            $courses = Course::$scope();
        } else {
            $courses = Course::query();
        }
        if ($instructorId) {
            $courses = $courses->where('instructor_id', $instructorId);
        }


        return $courses->searchable(['title', 'instructor:username', 'category:name', 'subcategory:name'])->with(['category', 'subcategory', 'instructor'])->orderBy('id', 'desc')->paginate(getPaginate());
    }




    public function details($slug)
    {
        $pageTitle = 'Course Details';

        $course = Course::withTrashed()->with('sections', 'lectures', 'quizzes', 'sections.curriculums.lectures', 'sections.curriculums.quizzes', 'sections.curriculums.quizzes.questions.options', 'objects', 'requirements', 'contents', 'sections.curriculums.lectures.resources', 'instructor')->where('slug', $slug)->first();


        if (!$course) {
            $notify[] = ['error', 'Invalid course'];
            return back()->withNotify($notify);
        }

        $enrolledUsers = CoursePurchased::where('payment_status', Status::PAYMENT_SUCCESS)->where('course_id', $course->id)->count();
        return view('admin.courses.details', compact('pageTitle', 'course', 'enrolledUsers'));
    }


    public function approve($id)
    {
        $course = Course::where('id', $id)->where('status', Status::PENDING)->firstOrFail();
        $course->status = Status::APPROVED;
        $course->save();
        $notify[] = ['success', 'Course approved successfully'];
        return back()->withNotify($notify);
    }

    public function reject(Request $request, $id)
    {

        $course = Course::where('id', $id)->where('status','!=',Status::PENDING)->firstOrFail();
        $course->status = Status::REJECT;
        $course->reject_reason = $request->reason;

        $course->save();
        $notify[] = ['success', 'Course approved successfully'];
        return back()->withNotify($notify);
    }






    public function downloadResource($id)
    {
        $resource = CourseResource::find($id);

        if (!$resource) {
            $notify[] = ['error', 'Invalid Resource'];
            return back()->withNotify($notify);
        }

        $course = $resource->course;

        if (!$course) {
            $notify[] = ['error', 'Invalid Course'];
            return back()->withNotify($notify);
        }

        $file = $resource->file;
        $path = getFilePath('resources');
        $fullPath = $path . '/' . $file;

        if (!file_exists($fullPath)) {

            $notify[] = 'resources not found';
            return back()->withNotify($notify);
        }

        $title = slug($resource->file);

        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $mimetype = mime_content_type($fullPath);

        if (!headers_sent()) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET,');
            header('Access-Control-Allow-Headers: Content-Type');
        }
        header('Content-Disposition: attachment; filename="' . $title . '.' . $ext . '";');
        header("Content-Type: " . $mimetype);
        return readfile($fullPath);
    }



    public function certificateTemplate()
    {
        $pageTitle = 'Certificate Template';
        return view('admin.course.certificate_template', compact('pageTitle'));
    }

    public function certificateTemplateUpdate(Request $request)
    {
        $request->validate([
            'certificate_template' => 'required'
        ]);

        $general = gs();
        $general->verify_url = $request->verify_url;
        $general->certificate_template = $request->certificate_template;
        $general->save();

        $notify[] = ['success', 'certificate template settings updated successfully'];
        return back()->withNotify($notify);
    }


    public function popular($slug)
    {
        $course = Course::where('slug', $slug)->first();

        if (!$course) {
            $notify[] = ['error', 'Invalid course'];
            return back()->withNotify($notify);
        }
        $course->is_populer = Status::YES;
        $course->save();
        $notify[] = ['success', 'Course popular status updated successfully'];
        return back()->withNotify($notify);
    }

    public function removePopular($slug)
    {
        $course = Course::where('slug', $slug)->first();

        if (!$course) {
            $notify[] = ['error', 'Invalid course'];
            return back()->withNotify($notify);
        }
        $course->is_populer = Status::NO;
        $course->save();
        $notify[] = ['success', 'Course popular status updated successfully'];
        return back()->withNotify($notify);
    }



    public function enrolledCourses($id = 0)
    {
        $pageTitle = 'Enrolled Courses';
        $enrolledCourses = CoursePurchased::where('payment_status', Status::PAYMENT_SUCCESS);
        if ($id > 0) {
            $enrolledCourses = $enrolledCourses->where('user_id', $id);
        }
        $enrolledCourses = $enrolledCourses->searchable(['user:username', 'course:title'])
            ->with(['user', 'course'])->orderBy('id', 'desc')->paginate(getPaginate());
        return view('admin.courses.enrolled_courses', compact('pageTitle', 'enrolledCourses'));
    }


    public function certificatePreview($id)
    {
        $getCertificate = GetCertificateUser::searchable('user:username', 'course:title')
            ->with('user', 'course')
            ->findOrFail($id);
        $user = $getCertificate->user;
        if (!$user) {
            abort(404);
        }
        $course = $getCertificate->course;
        if (!$course) {
            abort(404);
        }
        $courseComplete = $course->completes()->where('user_id', $user->id)->first();
        if (!$courseComplete) {
            abort(404);
        }
        $url  = gs('verify_url') . '/' . $getCertificate->secret;
        $qrCodeUrl = certificateQr($url);
        $logo = '<img src="data:image/png;base64,' . base64_encode(file_get_contents(getFilePath('logoIcon') . '/logo_dark.png')) . '" />';
        $qrCode = '<img src="data:image/png;base64,' . base64_encode(file_get_contents($qrCodeUrl)) . '" />';
        $certificate = str_replace("{{student_name}}", $user->firstname . ' ' . $user->lastname, gs('certificate_template'));
        $certificate = str_replace("{{site_name}}", gs('site_name'), $certificate);
        $certificate = str_replace("{{site_logo}}", $logo, $certificate);
        $certificate = str_replace("{{qr_code}}", $qrCode, $certificate);
        $certificate = str_replace("{{course_title}}", $course->title, $certificate);
        $certificate = str_replace("{{instructor_name}}", $course->instructor->firstname . ' ' . $course->instructor->lastname, $certificate);
        $certificate = str_replace("{{course_completion_date}}", showDateTime($courseComplete->created_at, 'F j, Y'), $certificate);
        $certificate = str_replace("{{course_based_message}}", $course->congrats_message, $certificate);
        $data = [
            'certificate' => $certificate
        ];
        // Generate PDF
        $pdf = Pdf::loadView('certificate_pdf', $data)
            ->setPaper('a4', 'landscape')
            ->setOption('dpi', 110)
            ->setOption('defaultFont', 'sans-serif');
        //
        return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="certificate.pdf"');
    }
}
