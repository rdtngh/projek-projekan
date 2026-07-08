<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Material extends Model
{
    protected $fillable = [
        'training_id',
        'title',
        'description',
        'speaker',
        'order_number',
    ];

    public function training(): BelongsTo
    {
        return $this->belongsTo(Training::class);
    }

    public function files(): HasMany
    {
        return $this->hasMany(MaterialFile::class);
    }

    public function userMaterials(): HasMany
    {
        return $this->hasMany(UserMaterial::class);
    }
}