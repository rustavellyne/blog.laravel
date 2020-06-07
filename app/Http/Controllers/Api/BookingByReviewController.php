<?php

namespace App\Http\Controllers\Api;

use App\Booking;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingByReiewShowResource;

class BookingByReviewController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($reviewKey, Request $request)
    {
        return new BookingByReiewShowResource(Booking::findByReviewKey($reviewKey)) ?? abort(404);
    }
}
