<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
  public function index()
  {
    $categories = Category::all();

    return CategoryResource::collection($categories);
  }
}
