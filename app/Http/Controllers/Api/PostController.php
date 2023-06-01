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

    $orderColumn = request('order_column', 'created_at');
    if(!in_array($orderColumn, ['title', 'created_at'])){
      $orderColumn = 'created_at';
    }

    $orderDirection = request('order_direction', 'desc');
    if(!in_array($orderDirection, ['asc', 'desc'])){
      $orderDirection = 'desc';
    }

    $posts = Post::with('category')
            ->when(request('category'), function($query){
              $query->where('category_id', request('category'));
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(10);

    return PostResource::collection($posts);
  }

  public function store(PostRequest $request)
  {

    
    if($request->hasFile('thumbnail')){
      $filename = $request->file('thumbnail')->getClientOriginalName();
      info($filename);
    }

    $post = Post::create($request->validated());
    sleep(1);
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
