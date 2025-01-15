<?php
namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class UsersFilter extends ApiFilter
{
    protected $allowedParams = [
        'id' => ['eq', 'gt', 'lt', 'gte', 'lte', 'ne'],
        'email' => ['eq', 'ne'],
        'active' => ['eq', 'ne'],
    ];

    protected $operatorMap = [
        'eq' => '=',
        'ne' => '!=',
        'gt' => '>',
        'gte' => '>=',
        'lt' => '<',
        'lte' => '<=',
    ];
}