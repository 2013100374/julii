<?php

namespace App\Models;

use App\Constants\Status;
use App\Traits\GlobalStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{

    use GlobalStatus,SoftDeletes;

    protected $appends = ['image_path', 'intro_path', 'discount_price', 'total_duration','progress', 'ratings', 'is_submit_review','is_complete', 'total_complete'];

    protected $casts = [
        'duration' => 'datetime'
    ];

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function sections()
    {
        return $this->hasMany(CourseSection::class);
    }

    public function lectures()
    {
        return $this->hasMany(CourseLecture::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    
    public function curriculums()
    {
        return $this->hasMany(Curriculum::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function subcategory(){
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }
    

  
    public function getImagePathAttribute()
    {

        return asset(getFilePath('courseImage'));
    }


    public function getIntroPathAttribute()
    {
        return asset(getFilePath('courseIntro'));
    }


    public function objects()
    {
        return $this->hasMany(LearningObject::class);
    }

    public function requirements()
    {
        return $this->hasMany(CourseRequirement::class);
    }

    public function contents()
    {
        return $this->hasMany(CourseContent::class);
    }

    public function purchases()
    {
        return $this->hasMany(CoursePurchased::class)->where('payment_status', Status::PAYMENT_SUCCESS);
    }

    public function courseComplate(){
        return $this->hasMany(CourseComplete::class);
    }




    public function getDiscountPriceAttribute()
    {


        if ($this->duration >= now()) {
            if ($this->discount_type == Status::PERCENT) {
                return ($this->price * $this->discount / 100);
            } else {
                return $this->discount;
            }
        }
        return 0;
    }

    


    public function getTotalDurationAttribute()
    {
        $totalSeconds = 0;
        foreach ($this->lectures as $lecture) {
            if ($lecture->content_type == Status::VIDEO) {
                list($hours, $minutes, $seconds) = explode(':', $lecture->video_duration);
                $totalSeconds += ($hours * 3600) + ($minutes * 60) + $seconds;
            }
        }

        // Convert total seconds to a readable format
        $hours = floor($totalSeconds / 3600);
        $minutes = floor(($totalSeconds % 3600) / 60);
        $seconds = $totalSeconds % 60;

        $totalDuration = "{$hours}h {$minutes}m {$seconds}s";

        return $totalDuration;
    }

    public function getProgressAttribute(){

        $totalCurriculum = $this->curriculums()->count();
       
        $completedCurriulum = UserProgress::where('user_id', auth()->id())->where('course_id', $this->id)->count();
        
        $percentage = $totalCurriculum > 0 ? ($completedCurriulum / $totalCurriculum) * 100 : 0;

        return round($percentage);
    }

    public function getRatingsAttribute(){
        $reviews = $this->reviews;

        $totalRating = $reviews->sum('rating');
        $avgRating = count($reviews) > 0 ?  $totalRating / $reviews->count() : 0;
        $ratings =[
            'total_reviews' => $reviews->count(),
            'avg_rating' => round($avgRating, 1) 
        ];
        
        return $ratings;
    }

    public function getIsSubmitReviewAttribute(){
        return Review::where('course_id', $this->id)->where('user_id', auth()->id())->exists();
    }

    public function completes(){
        return $this->hasMany(CourseComplete::class, 'course_id');
    }

    public function getIsCompleteAttribute(){
        $user_id = auth()->id();
        $complated = $this->completes()->where('user_id', $user_id)->exists();
        return $complated;

    }

    public function getTotalCompleteAttribute(){
        return $this->completes()->count();
    }

    public function statusBadge(): Attribute
    {
        return new Attribute(function(){
            $html = '';
            if($this->status == Status::PENDING){
                $html = '<span class="badge badge--warning">'.trans("Pending").'</span>';
            }
            elseif($this->status == Status::REJECT){
                $html = '<span class="badge badge--danger">'.trans("Rejected").'</span>';
            }
            elseif($this->status == Status::APPROVED){
                $html = '<span class="badge badge--success">'.trans("Approved").'</span>';
            }else{
                $html = '<span class="badge badge--dark">'.trans("Draft").'</span>';
            }
            return $html;
        });
    }


    public function levelBadge(): Attribute
    {
        return new Attribute(function(){
            $html = '';
            if($this->status == Status::BEGINNER){
                $html = '<span class="badge badge--warning">'.trans("Beginner").'</span>';
            }
            elseif($this->status == Status::INTERMEDIATE){
                $html = '<span class="badge badge--info">'.trans("Intermediate").'</span>';
            }
            elseif($this->status == Status::ADVANCED){
                $html = '<span class="badge badge--success">'.trans("Advanced").'</span>';
            }
            return $html;
        });
    }


    public function scopeApproved($query){
        return $query->where('status', Status::APPROVED);
    }
    public function scopeRejected($query){
        return $query->where('status', Status::REJECT);
    }

    public function scopePending($query){
        return $query->where('status', Status::PENDING);
    }


    public function scopePopular($query){
        return $query->where('is_populer', Status::YES);
    }

    
    



}
