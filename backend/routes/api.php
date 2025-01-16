<?php

use App\Http\Controllers\API\V1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1'], function () {
//     Route::apiResource('users', UsersController::class);
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('v1/users/register', 'register');
    Route::post('v1/users/login', 'login');
    Route::get('v1/users/auth-user-data', 'authUserData')->middleware('auth:sanctum');
    Route::get('v1/users/logout', 'logout')->middleware('auth:sanctum');
});
