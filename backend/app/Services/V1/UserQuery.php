<?php
namespace App\Services\V1;

use Illuminate\Http\Request;

class UserQuery
{
    protected $allowedParams = [
        'id' => ['eq', 'gt', 'lt'],
        'email' => ['eq'],
        'active' => ['eq'],
    ];

    protected $operatorMap = [
        'eq' => '=',
        'gt' => '>',
        'gte' => '>=',
        'lt' => '<',
        'lte' => '<=',
    ];

    public function transform(Request $request): array
    {
        $data = [];

        foreach ($this->allowedParams as $param => $operators) {
            $query = $request->query($param);

            if (!isset($query)) {
                continue;
            }

            foreach ($operators as $operator) {
                if (isset($query[$operator])) {
                    $data[] = [$param, $this->operatorMap[$operator], $query[$operator]];
                }
            }
        }

        return $data;
    }
}