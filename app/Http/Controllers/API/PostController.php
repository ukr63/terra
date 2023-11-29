<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Requests\Api\PostRequest;
use App\Models\Post;
use App\Repositories\PostRepository;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Routing\Controller;

class PostController extends Controller
{
    /**
     * @param PostRepository $repository
     */
    public function __construct(private readonly PostRepository $repository)
    {
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function detail(Request $request, int $id): JsonResponse
    {
        try {
            $post = $this->repository->getById($id);

            return response()->json([
                'post' => $post
            ]);
        } catch (ModelNotFoundException $foundException) {
            return AuthController::respondWithError($foundException->getMessage(), Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * @param PostRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function save(PostRequest $request): JsonResponse
    {
        try {
            $data = $request->only('id', 'title', 'description');

            $post = null;

            if (!empty($data['id'])) {
                $post = $this->repository->getById($data['id']);
            } else {
                $post = new Post();
            }

            $post->title = $data['title'];
            $post->description = $data['description'];

            $this->repository->save($post);
        }
        catch (ValidationException $validationException) {
            throw $validationException;
        }
        catch (Exception $e) {
            return AuthController::respondWithError('Something went wrong.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => sprintf('Post with id: %s saved.', $post->id)
        ]);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     * @throws ValidationException
     */
    public function delete(Request $request, int $id): JsonResponse
    {
        try {
            $this->repository->deleteById($id);

            return response()->json([
                'message' => 'Post deleted.'
            ]);
        }
        catch (ModelNotFoundException $foundException) {
            return AuthController::respondWithError($foundException->getMessage(), Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'items' => $this->repository->getList()
        ]);
    }
}
