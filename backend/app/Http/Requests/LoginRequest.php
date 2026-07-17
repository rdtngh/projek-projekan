<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation Rules
     */
    public function rules(): array
    {
        return [
            'employee_number' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Custom Messages
     */
    public function messages(): array
    {
        return [
            'employee_number.required' => 'Nomor karyawan wajib diisi.',
            'password.required' => 'Password wajib diisi.',
        ];
    }
}