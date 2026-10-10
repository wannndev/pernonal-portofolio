<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectShowcase extends Model
{
    protected $table = 'projects_showcase';
    protected $guarded = [];

    protected $casts = [
        'features' => 'array',
        'tools' => 'array',
    ];
}
