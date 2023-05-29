<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;



Route::post('login', [AuthenticatedSessionController::class, 'store'])
                ->name('login');
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
                
Route::view('/{any?}', 'dashboard')
->name('dashboard')
->where('any', '.*');