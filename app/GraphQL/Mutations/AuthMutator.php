<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\JWT;

class AuthMutator
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */


    public function register($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $credentials = Arr::only($args, ['email', 'password', 'name', 'username']);

        if (
            !$credentials["name"] ||
            !$credentials["password"] ||
            !$credentials["email"] ||
            !$credentials["username"]
        ) {
            return [
                "errData" => [
                    "msg" => "Please fill all fields",
                ],
                "registered" => false,
            ];
        }


        // CHECK Check if Email exists or continue 

        $user = User::where('email', '=', $credentials['email'])->first();

        if ($user) {
            return [
                "errData" => [
                    "msg" => "Sorry Email Exists!!!",
                ],
                "registered" => false,
                "token" => null
            ];
        }

        try {

            //** Generate a Remember token */
            $remember_token = Str::random($length = 100);

            //** USER to store */
            $user = User::create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'username' => $credentials['username'],
                'password' => Hash::make($credentials["password"]),
                'remember_token' => $remember_token
            ]);

            return [
                "user" => [
                    "email" => $user->email,
                    "username" => $user->username,
                    "name" => $user->name,
                ],
                "registered" => true,
                "remember_token" => $remember_token,
            ];
        } catch (Exception $e) {
            return [
                "errData" => [
                    "msg" => $e->getMessage(),
                ],
                "registered" => false,
            ];
        }
    }

    //** LOGIN RESOLVER */
    public function login($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $credentials = Arr::only($args, ['email', 'password']);

        if (
            !$credentials["email"] || !$credentials["password"]
        ) {
            return [
                "errData" => [
                    "msg" => "Please fill all fields",
                ],
                "isAuthenticated" => false,
                "registered" => false,
            ];
        }

        /* Check if Email exists or continue */
        $user = User::where('email', $credentials['email'])->first();

        $checkLogin =  Hash::check($credentials['password'], $user->password);

        if (!($user && $checkLogin)) {
            return [
                "errData" => [
                    "msg" => "Email or Password Error!!!",
                ],
                "isAuthenticated" => false,
                "registered" => false,
                "token" => null
            ];
        }

        try {

            //** Generate a Remember token */
            $remember_token = Str::random($length = 100);

            //** Update the remember token */
            User::where('email', $credentials["email"])->update(['remember_token' => $remember_token]);

            return [
                "user" =>  [
                    "email" => $user->email,
                    "name" => $user->name,
                    "username" => $user->username,
                ],
                "remember_token" => $remember_token,
                "logged_in" => true,
            ];
        } catch (Exception $e) {
            return [
                "errData" => [
                    "msg" => $e->getMessage(),
                ],
                "registered" => false,
            ];
        }
    }

    //** LOAD USER RESOLVER */
    public function load_user($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $credentials = Arr::only($args, ["remember_token"]);

        if (!$credentials["remember_token"]) {
            return ["access" => false];
        } else {

            /* Check if REMEMBER_TOKEN is correct for a user */
            $userRecord = User::where(['remember_token' => $credentials["remember_token"]])->first();

            /* Return if the necessary arguments match with the one in the Database */
            return [
                "remember_token" => $userRecord["remember_token"],
                "access" => true,
                "email" => $userRecord["email"],
                "name" => $userRecord["name"]
            ];
        }
    }

    public function getAllUsers($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $credentials = Arr::only($args, ['myEmail']);

        /* Return all other users except current User */
        $otherUsers = User::where('email', '!=', $credentials['myEmail'])->get();

        return [
            'otherUsers' => $otherUsers
        ];
    }
}
