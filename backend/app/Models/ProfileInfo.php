<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileInfo extends Model
{
    protected $table = 'profile_infos';
    protected $guarded = [];

    protected $casts = [
        'stats' => 'array',
        'social_links' => 'array',
        'rating_score' => 'float',
        'skills_row1' => 'array',
        'skills_row2' => 'array',
        'about_paragraphs' => 'array',
    ];
}
