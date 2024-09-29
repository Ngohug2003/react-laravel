<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function __construct()
    {
        // Bỏ middleware để kiểm tra xác thực JWT cho endpoint 'login'
//        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(AuthRequest $request)
    {
        // Lấy email và password từ yêu cầu
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];

        if (! $token = auth()->attempt($credentials)) {
//            \Log::info('Authentication failed for credentials:', $credentials);
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Email hoặc mật khẩu không đúng.'
            ], 401);
        }

//        \Log::info('Credentials:', $credentials);
        // Debug thông tin token
//        \Log::info('Generated Token:', ['token' => $token]);

        // Nếu xác thực thành công, trả về token
        $cookie = cookie('access_token', $token, auth('api')->factory()->getTTL(), '/', null, false, true);

        return $this->respondWithToken($token)->withCookie($cookie);

    }

    // Hàm này sẽ trả về token và các thông tin liên quan
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
//            'expires_in' => auth()->factory()->getTTL() * 60
            'expires_in' => auth('api')->factory()->getTTL() * 60 // Sử dụng guard 'api'


        ]);
    }
}
