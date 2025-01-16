<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Helpers\API\V1\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\API\V1\RegisterRequest;
use App\Http\Requests\API\V1\LoginRequest;

class AuthController extends Controller
{
    /**
     * Register a new user
     * @param \App\Http\Requests\API\V1\RegisterRequest $request
     */
    public function register(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            if (!$user) {
                return ResponseHelper::error(message: 'Unable to register user. Please try again.', statusCode: 400);
            }

            return ResponseHelper::success(message: 'User has been registered successfully!', data: $user, statusCode: 201);
        } catch (\Exception $e) {
            \Log::error('Unable to register user : ' . $e->getMessage() . ' - Line: ' . $e->getLine());
            return ResponseHelper::error($e->getMessage(), statusCode: 500);
        }
    }

    /**
     * Summary of login
     * @param \App\Http\Requests\API\V1\LoginRequest $request
     */
    public function login(LoginRequest $request)
    {
        try {
            if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                return ResponseHelper::error(message: 'Email or Password invalid. Please try again.', statusCode: 400);
            }

            $user = Auth::user();

            $token = $user->createToken('Login Token')->plainTextToken;

            $authToken = [
                'token' => $token,
            ];

            return ResponseHelper::success(message: 'Logged in successfully!', data: $authToken, statusCode: 200);
        } catch (\Exception $e) {
            \Log::error('Unable to login user : ' . $e->getMessage() . ' - Line: ' . $e->getLine());
            return ResponseHelper::error($e->getMessage(), statusCode: 500);
        }
    }

    public function authUserData()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return ResponseHelper::error(message: 'Unable to fetch user data due to invalid token. Please try again.', statusCode: 400);
            }

            return ResponseHelper::success(message: 'Authenticated user data fetched!', data: $user, statusCode: 200);
        } catch (\Exception $e) {
            \Log::error('Unable to fetch user data : ' . $e->getMessage() . ' - Line: ' . $e->getLine());
            return ResponseHelper::error($e->getMessage(), statusCode: 500);
        }
    }

    public function logout()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return ResponseHelper::error(message: 'Unable to fetch user data due to invalid token. Please try again.', statusCode: 400);
            }

            $user->currentAccessToken()->delete();
            return ResponseHelper::success(message: 'Logged out successfully!', statusCode: 200);
        } catch (\Exception $e) {
            \Log::error('Unable to log out : ' . $e->getMessage() . ' - Line: ' . $e->getLine());
            return ResponseHelper::error($e->getMessage(), statusCode: 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
