<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class PostRepository
{
    /**
     * @param int $id
     * @return Post
     */
    public function getById(int $id): Post
    {
        /** @var Post $post */
        $post = Post::find($id);

        if ($post === null) {
            throw new ModelNotFoundException(sprintf('Post with id: %s not found.', $id));
        }

        return $post;
    }

    /**
     * @param int $id
     * @return true
     * @throws ValidationException
     */
    public function deleteById(int $id): true
    {
        /** @var Post $post */
        $post = Post::find($id);

        if ($post === null) {
            throw new ModelNotFoundException(sprintf('Post with id: %s not found.', $id));
        }

        /** @var User $user */
        $user = auth()->user();

        if (!empty($post->user_id) && $post->user_id !== $user->id) {
            throw ValidationException::withMessages(['Only owner of this post can delete it.']);
        }

        $post->delete();

        return true;
    }

    /**
     * @param Post $post
     * @return bool
     * @throws ValidationException
     */
    public function save(Post $post): bool
    {
        $user = auth()->user();

        if (!empty($post->user_id) && $post->user_id !== $user->id) {
            throw ValidationException::withMessages(['Only owner of this post can change it.']);
        }

        $post->user_id = $user->id;

        return $post->save();
    }

    /**
     * @return Post[]
     */
    public function getList(): array
    {
        return (array)Post::query()->orderBy('id', 'DESC')->get()->getIterator();
    }
}
