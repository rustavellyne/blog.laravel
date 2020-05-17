<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bookable;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;

$suffix = [
    'Villa',
    'House',
    'Cottage',
    'Luxuary Villas',
    'Cheap House',
    'Rooms',
    'Cheap Rooms',
    'Luxuary Rooms',
    'Fancy rooms',
];

$factory->define(Bookable::class, function (Faker $faker) use ($suffix) {
    return [
        'title'       => $faker->name . ' ' . Arr::random($suffix),
        'description' => $faker->text,
    ];
});
