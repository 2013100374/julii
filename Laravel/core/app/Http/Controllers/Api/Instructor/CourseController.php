<?php

namespace App\Http\Controllers\Api\Instructor;

use App\Constants\Status;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseLecture;
use App\Models\CourseResource;
use App\Models\CourseSection;
use App\Models\Curriculum;
use App\Models\Quiz;
use App\Models\QuizOption;
use App\Models\QuizQuestion;
use App\Rules\FileTypeValidate;
use App\Traits\CourseDeleteManage;
use App\Traits\CourseManage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{

    use CourseDeleteManage, CourseManage;


    public function list()
    {

        $courses = Course::with([
            'sections',
            'sections.curriculums.lectures',
            'sections.curriculums.quizzes',
            'sections.curriculums.quizzes.questions.options',
            'objects',
            'requirements',
            'contents',
            'sections.curriculums.lectures.resources',
            'purchases'
        ])
            ->where('instructor_id', auth()->id())
            ->withSum(['purchases' => function ($q) {
                $q->where('payment_status', Status::PAYMENT_SUCCESS);
            }], 'amount')
            ->paginate(getPaginate());
      
        $notify[] = 'Courses page data';
        return responseSuccess('courses', $notify, [
            'courses' => $courses
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:courses,slug',
        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = new Course();
        $course->title = $request->title;
        $course->slug = $request->slug;
        $course->instructor_id = auth()->user()->id;

        $course->save();

        $notify[] = 'Course created successfully';
        return responseSuccess('course_created', $notify, [
            'course' => $course
        ]);
    }

    public function addSection(Request $request, $slug)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'learning_object' => 'nullable|string',
            'section_id' => 'nullable|integer'
        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();

        if (!$course) {
            $notify[] = 'Invalid course';
            return responseError('Invalid course', $notify);
        }

        if ($request->section_id) {
            $courseSection = CourseSection::where('course_id', $course->id)->find($request->section_id);
            if (!$courseSection) {
                $notify[] = 'Invalid section';
                return responseError('Invalid section', $notify);
            }
            $notify[] = 'Section updated successfully';
        } else {
            $courseSection = new CourseSection();
            $notify[] = 'Section added successfully';
        }

        $courseSection->course_id = $course->id;
        $courseSection->title = $request->title;
        $courseSection->learning_object = $request->learning_object;
        $courseSection->save();


        return responseSuccess('section_added', $notify, [
            'course' => $course,
            'course_section' => $courseSection
        ]);
    }


    public function addLecture(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'section_id' => 'required|integer',
            'lecture_id' => 'nullable|integer',

        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();

        if (!$course) {
            $notify[] = 'Invalid course';
            return responseError('Invalid course', $notify);
        }

        $courseSection = CourseSection::where('course_id', $course->id)->find($request->section_id);

        if (!$courseSection) {
            $notify[] = 'Invalid section';
            return responseError('Invalid section', $notify);
        }

        if ($request->lecture_id) {
            $lecture = CourseLecture::where('course_section_id', $courseSection->id)->find($request->lecture_id);
            if (!$lecture) {
                $notify[] = ['error', 'Lecture already exists'];
                return responseError('Lecture already exists', $notify);
            }
        } else {
            $curriculum = new Curriculum();
            $curriculum->course_id = $course->id;
            $curriculum->course_section_id = $courseSection->id;
            $curriculum->type = Status::LECTURE;
            $curriculum->save();

            $lecture = new CourseLecture();
            $lecture->content_type = 0;
            $lecture->curriculum_id = $curriculum->id;
            $lecture->serial_number = CourseLecture::where('course_id', $course->id)->max('serial_number') + 1;
        }

        $lecture->course_id = $course->id;
        $lecture->course_section_id = $courseSection->id;
        $lecture->title = $request->title;
        $lecture->is_preview = $request->is_preview ? Status::YES : Status::NO;
        $lecture->save();



        $this->rearrangeLectureSerialNumbers($course->id);

        $notify[] = 'Lecture added successfully';
        return responseSuccess('lecture_added', $notify, [
            'course' => $course,
            'lecture' => $lecture,

        ]);
    }

    private function rearrangeLectureSerialNumbers($courseId)
    {


        $sections = CourseSection::where('course_id', $courseId)->orderBy('id')->get();


        $serial = 1;
        foreach ($sections as $section) {
            $lectures = CourseLecture::where('course_section_id', $section->id)
                ->orderBy('serial_number')
                ->get();

            foreach ($lectures as $lecture) {
                $lecture->serial_number = $serial;
                $lecture->save();
                $serial++;
            }
        }
    }

    public function addLectureVideo(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'lecture_id' => 'required|integer',
            'section_id' => 'required|integer',
            'video_file' => ['required', new FileTypeValidate(['mp4', 'mkv', 'vob', 'avi', 'mpeg'])],
            'video_duration' => 'required'
        ]);


        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();
        if (!$course) {
            $notify[] =  'Invalid course';
            return responseError('Invalid course', $notify);
        }
        $courseSection = CourseSection::where('course_id', $course->id)->find($request->section_id);
        if (!$courseSection) {
            $notify[] = 'Invalid section';
            return responseError('Invalid section', $notify);
        }
        $lecture = CourseLecture::where('course_section_id', $courseSection->id)
            ->whereIn('content_type', [Status::NO, Status::VIDEO])
            ->find($request->lecture_id);
        if (!$lecture) {
            $notify[] = 'Invalid lecture';
            return responseError('Invalid lecture', $notify);
        }
        if ($lecture->file) {
            $course->status = Status::PENDING;
            $course->save();
        }


        if ($request->hasFile('video_file')) {
            $fileName = preg_replace('/[^a-zA-Z0-9-_\.]/', '', titleToKey($lecture->title)) . '_' . uniqid() . '.' . $request->video_file->getClientOriginalExtension();
            $lecture->file = fileUploader($request->video_file, getFilePath('video'), old: $lecture->file, filename: $fileName);
        }


        $lecture->content_type = Status::VIDEO;
        $lecture->video_duration = $request->video_duration;
        $lecture->save();

        $notify[] = 'Lecture Video added successfully';
        return responseSuccess('video_added', $notify, [
            'lecture' => $lecture
        ]);
    }

    public function addLectureArticle(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'lecture_id' => 'required|integer',
            'section_id' => 'required|integer',
            'article' => 'required|string'
        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());


        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();
        if (!$course) {
            $notify[] = 'Invalid course';
            return responseError('Invalid course', $notify);
        }
        $courseSection = CourseSection::where('course_id', $course->id)->find($request->section_id);
        if (!$courseSection) {
            $notify[] = 'Invalid section';
            return responseError('Invalid section', $notify);
        }
        $lecture = CourseLecture::where('course_section_id', $courseSection->id)
            ->whereIn('content_type', [Status::NO, Status::ARTICLE])
            ->find($request->lecture_id);
        if (!$lecture) {
            $notify[] = 'Invalid lecture';
            return responseError('Invalid lecture', $notify);
        }

        $lecture->article = $request->article;
        $lecture->content_type = Status::ARTICLE;
        $lecture->save();

        $notify[] = 'Lecture article added successfully';
        return responseSuccess('video_added', $notify, [
            'lecture' => $lecture
        ]);
    }

    public function addQuiz(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'section_id' => 'required|integer',
            'quiz_id' => 'nullable|integer',
            'passing_percentage' => 'required|between:0,100',

        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();

        if (!$course) {
            $notify[] = 'Invalid course';
            return responseError('Invalid course', $notify);
        }

        $courseSection = CourseSection::where('course_id', $course->id)->find($request->section_id);

        if (!$courseSection) {
            $notify[] = 'Invalid section';
            return responseError('Invalid section', $notify);
        }


        if ($request->quiz_id) {
            $quiz = Quiz::find($request->quiz_id);
        } else {
            $curriculum = new Curriculum();
            $curriculum->course_id = $course->id;
            $curriculum->course_section_id = $courseSection->id;
            $curriculum->type = Status::QUIZ;
            $curriculum->save();

            $quiz = new Quiz();
            $quiz->curriculum_id = $curriculum->id;
            $quiz->serial_number = Quiz::where('course_id', $course->id)->max('serial_number') + 1;
        }
        $quiz->course_id = $course->id;
        $quiz->course_section_id = $courseSection->id;
        $quiz->title = $request->title;
        $quiz->description = $request->description;
        $quiz->passing_percentage = $request->passing_percentage;
        $quiz->save();

        if (!$request->quiz_id) {
            $this->rearrangeCourseQuizSerialNumbers($course->id);
        }


        $notify[] = 'Quiz created successfully';
        return responseSuccess('quiz_added', $notify, [
            'quiz' => $quiz
        ]);
    }


    private function rearrangeCourseQuizSerialNumbers($courseId)
    {
        $sections = CourseSection::where('course_id', $courseId)->orderBy('id')->get();

        $serial = 1;
        foreach ($sections as $section) {
            $quizzes = Quiz::where('course_section_id', $section->id)
                ->orderBy('serial_number')
                ->get();

            foreach ($quizzes as $quiz) {
                $quiz->serial_number = $serial;
                $quiz->save();
                $serial++;
            }
        }
    }


    public function addQuizOption(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'section_id' => 'required|integer',
            'quiz_id' => 'required|integer',
            'question' => 'required|string',
            'answers' => 'required|array|min:2',
            'explain' => 'nullable|string',
            'question_id' => 'nullable|integer',
        ], [
            'answers.required' => 'Answers are required.',
            'answers.array' => 'Answers must be an array.',
            'answers.min' => 'Answers must have at least 2 options.',
        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();

        if (!$course) {
            $notify[] = 'Invalid course';
            return responseError('Invalid course', $notify);
        }

        $courseSection = CourseSection::where('course_id', $course->id)->find($request->section_id);

        if (!$courseSection) {
            $notify[] = 'Invalid section';
            return responseError('Invalid section', $notify);
        }

        $quiz = Quiz::where('course_section_id', $courseSection->id)->find($request->quiz_id);

        if (!$quiz) {
            $notify[] = 'Invalid quiz';
            return responseError('Invalid quiz', $notify);
        }


        if ($request->question_id) {
            $question = QuizQuestion::where('quiz_id', $quiz->id)->find($request->question_id);
            if (!$question) {
                $notify[] = 'Invalid question';
                return responseError('Invalid question', $notify);
            }
            $question->options()->delete();
        } else {
            $question = new QuizQuestion();
        }

        $question->quiz_id = $quiz->id;
        $question->question = $request->question;

        $question->save();

        foreach ($request->answers as  $ans) {
            if ($ans['answer']) {
                try {
                    $options = new QuizOption();
                    $options->quiz_id = $quiz->id;
                    $options->quiz_question_id = $question->id;
                    $options->option = $ans['answer'];
                    $options->explanation = $ans['explanation'];
                    $options->answer = $ans['correct'] ? 1 : 0;
                    $options->save();
                } catch (\Throwable $th) {
                    $notify[] = 'Error while saving option: ' . $ans['answer'];
                    return responseError('options_added_error', $notify);
                   
                }
            }
        }

        $notify[] = 'Quiz options added successfully';
        return responseSuccess('options_added', $notify, [
            'question' => $question->load('options'),
            'quiz' => $quiz

        ]);
    }






    public function saveResources(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'section_id' => 'required|integer',
            'lecture_id' => 'required|integer',
            'resources' => ['required', new FileTypeValidate(['mp4', 'mkv', 'vob', 'avi', 'mpeg', 'jpg', 'jpeg', 'png', 'docx', 'pdf', 'pptx','zip','rar'])]
        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();

        if (!$course) {
            $notify[] = 'Invalid course';
            return responseError('Invalid course', $notify);
        }

        $courseSection = CourseSection::where('course_id', $course->id)->find($request->section_id);

        if (!$courseSection) {
            $notify[] = 'Invalid section';
            return responseError('Invalid section', $notify);
        }

        $courseLecture = CourseLecture::where('course_id', $course->id)->where('course_section_id', $courseSection->id)->find($request->lecture_id);
        if (!$courseLecture) {
            $notify[] = 'Invalid lecture';
            return responseError('Invalid lecture', $notify);
        }


        $resources = new CourseResource();
        $resources->course_id = $course->id;
        $resources->course_section_id = $courseSection->id;
        $resources->course_lecture_id = $courseLecture->id;
        if ($request->resources) {
            $fileName = 'resources_' . uniqid() . '.' . $request->resources->getClientOriginalExtension();
            $resources->file = fileUploader($request->resources, getFilePath('resources'), old: $resources->file, filename: $fileName);
        }
        $resources->save();

        $notify[] = 'Resource added successfully';
        return responseSuccess('resource_added', $notify, [
            'resource' => $resources
        ]);
    }




    public function checkSlug(Request $request)
    {

        $exist = Course::where('slug', $request->slug)->exists();
        return response()->json([
            'exists' => $exist
        ]);
    }


    public function courseDetails($slug)
    {
        $course = Course::with('sections', 'sections.curriculums.lectures', 'sections.curriculums.quizzes', 'sections.curriculums.quizzes.questions.options', 'objects', 'requirements', 'contents', 'sections.curriculums.lectures.resources')->where('instructor_id', auth()->id())->where('slug', $slug)->first();


        if (!$course) {
            $notify[] = 'Invalid course';
            return responseError('course_not_found', $notify);
        }


        $notify[] = 'Course details fetched successfully';
        return responseSuccess('course_details', $notify, [
            'course' => $course,

        ]);
    }
    
    
       public function downloadResource($resourceId)
    {
        $resource = CourseResource::whereHas('course', function($query){
            $query->where('instructor_id', auth()->id());
            })->find($resourceId);

        if (!$resource) {
            $notify[] = 'Invalid Resource';
            return responseError('resource_not_found', $notify);
        }

        $course = $resource->course;

        if (!$course) {
            $notify[] = 'Invalid Course';
            return responseError('course_not_found', $notify);
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
    
    
    
    
}
