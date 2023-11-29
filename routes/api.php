<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
});

Route::prefix('user')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/generate_token', [AuthController::class, 'generateToken']);
});

Route::middleware('auth:api')->prefix('post')->group(function () {
    Route::get('/detail/{id}', [PostController::class, 'detail']);
    Route::get('/list', [PostController::class, 'index']);
    Route::post('/save', [PostController::class, 'save']);
    Route::delete('/delete/{id}', [PostController::class, 'delete']);
});

Route::prefix('post')->group(function () {
    Route::get('/detail/{id}', [PostController::class, 'detail']);
    Route::get('/list', [PostController::class, 'index']);
});
