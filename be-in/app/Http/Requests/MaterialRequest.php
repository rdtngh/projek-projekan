<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $trainingRule = $this->isMethod('post') ? 'required' : 'sometimes';

        return [
            'training_id' => [$trainingRule, 'integer', 'exists:trainings,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'speaker' => ['nullable', 'string', 'max:255'],
            'order_number' => ['nullable', 'integer'],
            'files' => ['nullable', 'array'],
            'files.*' => ['file', 'max:51200'], // max 50MB per file
        ];
    }
}
