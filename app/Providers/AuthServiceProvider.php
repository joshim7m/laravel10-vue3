<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Models\Permission;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        //
    ];


    public function boot(): void
    {
      $this->registerPolicies();
      $user = Auth::user();

      foreach(Permission::pluck('name') as $permission){

        Gate::define($permission, function($user) use ($permission) {
          return $user->hasPermission($permission);
        });

      }
    }
}
