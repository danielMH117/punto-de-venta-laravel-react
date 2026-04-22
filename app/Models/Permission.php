<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = ['name'];
    
    public function roles(){
        return $this->belongsToMany(Role::class , 'roles_has_permissions', 'id_permission', 'id_role');
    }
}
