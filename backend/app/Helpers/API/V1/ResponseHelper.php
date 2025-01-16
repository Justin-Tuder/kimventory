<?php

namespace App\Helpers\API\V1;

class ResponseHelper
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Function : Common function to display success - JSON Response
     * @param mixed $status
     * @param mixed $message
     * @param mixed $data
     * @param mixed $statusCode
     * @return response
     */
    public static function success($status = 'success', $message = null, $data = [], $statusCode = 200, )
    {
        return response()->json(
            [
                "status" => $status,
                "message" => $message,
                "data" => $data
            ],
            $statusCode
        );
    }

    /**
     * Function : Common function to display error - JSON Response
     * @param mixed $status
     * @param mixed $message
     * @param mixed $statusCode
     * @return repsonse
     */
    public static function error($status = 'error', $message = null, $statusCode = 400)
    {
        return response()->json(
            [
                "status" => $status,
                "message" => $message,
            ],
            $statusCode
        );
    }
}
