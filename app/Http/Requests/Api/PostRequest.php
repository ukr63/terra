<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => ['required', 'string', 'max:5000'],
            'title' => ['required', 'string', 'max:255'],
            'id' => ['int']
        ];
    }
}
