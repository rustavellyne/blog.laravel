<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public function bookable()
    {
        return $this->belongsTo(Bookable::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * id = uuid(char type) so no need autoincrement
     *
     * @return boolean
     */
    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}