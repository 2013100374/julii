<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseLecture extends Model
{
    protected $appends =['video_path'];
    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function curriculum(){
        return $this->belongsTo(Curriculum::class);
    }

    public function resources(){
        return $this->hasMany(CourseResource::class, 'course_lecture_id');
    }

    public function getVideoPathAttribute(){
        return asset(getFilePath('video'));
    }
}
