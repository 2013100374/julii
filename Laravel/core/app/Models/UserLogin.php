<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLogin extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }
}
