<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'skills' => 'array',
        'curriculum' => 'array',
        'highlights' => 'array',
    ];
}
