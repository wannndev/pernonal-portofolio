<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DesignTool extends Model
{
    protected $table = 'design_tools';
    protected $guarded = [];

    protected $casts = [
        'show_name' => 'boolean',
        'sort_order' => 'integer',
    ];
}
