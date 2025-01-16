<?php

namespace App\Http\Requests\API\V1;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:5|max:150',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:5|max:50',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name.',
            'name.min' => 'Your name must be at least 5 characters long.',
            'name.max' => 'Your name cannot exceed 150 characters.',
            'email.required' => 'Please enter your email address',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'That email address has already been used.',
            'passowrd.required' => 'Please enter your password.',
            'password.min' => 'Password must be at least 5 characters long.',
            'password.max' => 'Password cannot exceed 50 characters.',
        ];
    }
}
