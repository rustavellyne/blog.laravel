<?php

namespace App;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Booking extends Model
{

    protected $fillable = ['from', 'to'];

    public function bookable ()
    {
        return $this->belongsTo(Bookable::class);
    }

    public function booking ()
    {
        return $this->hasOne(Booking::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function scopeBetweenDates(Builder $query, $from, $to)
    {
        return $query->where('to', '>=', $from)
                     ->where('from', '<=', $to);
    }

    public static function findByReviewKey(string $reviewKey): ?Booking
    {
        return static::where('review_key', $reviewKey)->with('bookable')->get()->first();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            $booking->review_key = Str::uuid();
        });
    }
}
