<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required',
            'content' => 'required',
            'category_id' => ['required', 'exists:categories,id'],
        ];
    }

    public function attributes()
    {
      return [
        'category_id' => 'category'
      ];
    }
}
