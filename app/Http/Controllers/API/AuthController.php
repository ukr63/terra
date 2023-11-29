<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use Exception;
use App\Models\User;
use App\Http\Requests\Api\RegisterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Routing\Controller;

class AuthController extends Controller
{
    const TOKEN_NAME = 'App';
    const TOKEN_TYPE = 'Bearer';

    /**
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = User::create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => $request->validated('password'),
        ]);

        $token = $user->createToken(self::TOKEN_NAME)->accessToken;

        return $this->respondWithToken($token);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function generateToken(Request $request): JsonResponse
    {
        try {
            $credentials = $request->only('email', 'password');

            /** @var User $user */
            $user = User::where('email', $credentials['email'])->first();

            if ($user && password_verify($credentials['password'], $user->password)) {
                $token = $user->createToken(self::TOKEN_NAME)->accessToken;

                return $this->respondWithToken($token);
            }

            return self::respondWithError('Invalid credentials', Response::HTTP_UNAUTHORIZED);
        }
        catch (Exception $e) {
            return self::respondWithError('Something went wrong.', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }

    /**
     * @param string $token
     * @return JsonResponse
     */
    private function respondWithToken(string $token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => self::TOKEN_TYPE,
        ]);
    }

    /**
     * @param string $message
     * @param int $statusCode
     * @return JsonResponse
     */
    public static function respondWithError(string $message, int $statusCode): JsonResponse
    {
        return response()->json(['message' => $message], $statusCode);
    }
}
