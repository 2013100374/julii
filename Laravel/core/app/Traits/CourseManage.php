<?php

namespace App\Traits;

use App\Constants\Status;
use App\Models\Category;
use App\Models\Course;
use App\Models\CourseContent;
use App\Models\CourseRequirement;
use App\Models\LearningObject;
use App\Models\SubCategory;
use App\Rules\FileTypeValidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait CourseManage
{


    public function saveContent(Request $request, $slug)
    {

        $validator = Validator::make($request->all(), [
            'subtitle' => 'required|string|max:255',
            'category_id' => 'required|integer',
            'sub_category_id' => 'required|integer',
            'description' => 'required|string',
            'level' => 'required|integer|in:1,2,3',
            'image' => ['nullable', new FileTypeValidate(['jpg', 'jpeg', 'png'])],
            'intro' =>  ['nullable', new FileTypeValidate(['mp4', 'mkv', 'vob', 'avi', 'mpeg'])],
            'course_duration'=>'required|integer',
        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();
        if (!$course) {
            $notify[] = 'Course not found';
            return responseError('course_not_found', $notify);
        }

        $category = Category::active()->find($request->category_id);

        if (!$category) {
            $notify[] = 'Category not found';
            return responseError('category_not_found', $notify);
        }

        $subCategory = SubCategory::active()->where('category_id', $category->id)->find($request->sub_category_id);
        if (!$subCategory) {
            $notify[] = 'Subcategory not found';
            return responseError('sub_category_not_found', $notify);
        }

        $course->subtitle = $request->subtitle;
        $course->category_id = $category->id;
        $course->sub_category_id = $subCategory->id;
        $course->description = $request->description;
        $course->level = $request->level;
        $course->course_duration = $request->course_duration;
        if ($request->hasFile('image')) {
            try {
                $course->image = fileUploader($request->image, getFilePath('courseImage'),getFileSize('courseImage'),$course->image,getFileThumb('courseImage'));
            } catch (\Throwable $th) {
                $notify[] = ['error', 'Failed to upload image'];
                return responseError('image_upload_error', $notify);
            }
        }

        if ($request->hasFile('intro')) {
            try {
                $course->intro = fileUploader($request->intro, getFilePath('courseIntro'), old: $course->intro);
            } catch (\Throwable $th) {
                $notify[] = ['error', 'Failed to upload intro video'];
                return responseError('intro_video_upload_error', $notify);
            }
        }


        $course->save();

        $notify[] = 'Course content save successfully';
        return responseSuccess('course_content', $notify, [
            'course' => $course
        ]);
    }


    public function savePrice(Request $request, $slug)
    {
       
        $validator = Validator::make($request->all(), [
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'duration' => 'nullable|date|after_or_equal:now',
            'discount_type' => 'nullable|in:0,1,2',
        ]);


        if ($request->discount && $request->discount_type) {
            if ($request->discount_type == Status::PERCENT) {

                $validator->sometimes('discount', 'max:100', function ($input) {
                    return true;
                });
            } elseif ($request->discount_type == Status::FIXED) {

                $validator->sometimes('discount', 'max:' . $request->price, function ($input) {
                    return true;
                });
            }
        }


        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();
        if (!$course) {
            $notify[] = 'Course not found';
            return responseError('course_not_found', $notify);
        }


        $course->price = $request->price;
        $course->discount = $request->discount;
        $course->duration = $request->duration;
        $course->discount_type = $request->discount_type;
        $course->save();


        $notify[] = 'Course price saved successfully';
        return responseSuccess('course_price', $notify, [
            'course' => $course
        ]);
    }


    public function saveMessage(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'welcome_message' => 'nullable|string',
            'congrats_message' => 'required|string',
        ]);

        if ($validator->fails()) return responseError('validation_error', $validator->errors());

        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();

        if (!$course) {
            $notify[] = 'Course not found';
            return responseError('course_not_found', $notify);
        }

        $course->welcome_message = $request->welcome_message;
        $course->congrats_message = $request->congrats_message;
        $course->save();

        $notify[] = 'Course message saved successfully';
        return responseSuccess('course_message', $notify, [
            'course' => $course
        ]);
    }

    public function intendedLearners(Request $request, $slug)
    {
        $validator = Validator::make($request->all(), [
            'object.*'      => 'nullable|string',  
            'requirement.*' => 'nullable|string',  
            'content.*'     => 'nullable|string',
        ]);
    
        if ($validator->fails()) {
            return responseError('validation_error', $validator->errors());
        }
    
        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();
        if (!$course) {
            return responseError('course_not_found', ['Course not found']);
        }

       
        
        $course->objects()->delete();
        
        $course->requirements()->delete();
        $course->contents()->delete();

        if(!blank($request->object)){
            foreach($request->object as $value){
                if($value){

                    $object  = new LearningObject();
                    $object->course_id = $course->id;
                    $object->object = $value;
                    $object->save();
                }
            }
        }
   

        if(!blank($request->requirement)){
            foreach($request->requirement as $value){
                if($value){
                    $requirement  = new CourseRequirement();
                    $requirement->course_id = $course->id;
                    $requirement->requirement = $value;
                    $requirement->save();
                }
            }
        }
  
  
        if($request->content){
            foreach($request->content as $value){
              if($value){
                  $content  = new CourseContent();
                  $content->course_id = $course->id;
                  $content->content = $value;
                  $content->save();
              }
            }
        }

        $notify[] ='Intended content saved successfully';
        return responseSuccess('intended_content', $notify, [
            'course' => $course
        ]);
      
    
    }



    public function courseSubmit($slug){
        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();
        if (!$course) {
            $notify[]  ='Course not found';
            return responseError('course_not_found', $notify);
        }
        if(count($course->sections)  <= 0){
            $notify[] = 'Course must have at least one section';
            return responseError('no_sections',$notify);
        }
        if ($course->lectures->isEmpty() || !$course->lectures->contains(fn($lecture) => !empty($lecture->file) || !empty($lecture->article))) {
            $notify[] = 'Course must have at least one lecture with a file or an article';
            return responseError('no_valid_lectures', $notify);
        }
        
        if(!$course->price){
            $notify="Course must have a price";
            return responseError('no_price',$notify );
        }


        $course->status = Status::PENDING;
        $course->save();
        $notify[] ='Course submitted successfully';
        return responseSuccess('course_submitted', $notify, [
            'course' => $course
        ]);
    }



    public function deleteCourse($slug){
        $course = Course::where('instructor_id', auth()->id())->where('slug', $slug)->first();
        if (!$course) {
            return responseError('course_not_found', ['Course not found']);
        }
        $enrolled = $course->purchases();
        if($enrolled->count() > 0){
            return responseError('course_in_enrollment', ['You Can\'t delete this course. Because the Course is in enrollment']);
        }

        $course->deleted_at = now();
        $course->save();
        $notify[] ='Course deleted successfully';
        return responseSuccess('course_deleted', $notify, [
            'course' => $course
        ]);
    }
       
    





}
