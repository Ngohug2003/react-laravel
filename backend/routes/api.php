<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;


//Route::prefix('v1')->group(function () {
//    Route::post('/login',[AuthController::class ,'login'] );
//});
Route::group([

    'middleware' => 'api',
    'prefix' => 'v1/auth'

], function ($router) {
    Route::post('/login',[AuthController::class ,'login'] );
});
