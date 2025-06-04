<?php

namespace App\Models;

use App\Traits\GlobalStatus;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use GlobalStatus;

    protected $appends =['image_path'];
    public function subCategories(){
        return $this->hasMany(SubCategory::class);   
    }

    public function courses(){
        return $this->hasMany(Course::class);    
    }

    public function getImagePathAttribute(){
        return asset(getFilePath('category'));
    }
}
