<?php

namespace App\Http\Controllers\Api;

use App\Bookable;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookableShowResource;
use App\Http\Resources\BookableIndexResource;

class BookableController extends Controller
{
    /**
     * @return array
     */
    public function index()
    {
        return BookableIndexResource::collection(Bookable::all());
    }

    /**
     * Undocumented function
     *
     * @param integer $id
     * @return array
     */
    public function show($id)
    {
        return new BookableShowResource(Bookable::findOrFail($id));
    }
}
