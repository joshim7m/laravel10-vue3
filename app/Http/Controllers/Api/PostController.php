<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
  public function index()
  {


    $posts = Post::with('category')->paginate(10);

    return PostResource::collection($posts);
  }

  public function store(PostRequest $request)
  {

    
    if($request->hasFile('thumbnail')){
      $filename = $request->file('thumbnail')->getClientOriginalName();
      info($filename);
    }

    $post = Post::create($request->validated());

    return new PostResource($post);
  }

  public function show(Post $post)
  {
    $this->authorize('posts.update');
    return new PostResource($post);
  }

  public function update(Post $post, PostRequest $request)
  {
    $this->authorize('posts.update');

    $post->update($request->validated());
    
    return new PostResource($post);
  }

  public function destroy(Post $post)
  {

    $this->authorize('posts.delete');

    $post->delete();

    return response()->noContent();
  }
}
