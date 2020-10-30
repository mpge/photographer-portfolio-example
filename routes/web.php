<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', function() {
  $soloMode = true;
  
  if($soloMode) {
    return redirect('/me');
  } else {
    // @todo show a page allowing the user to type in the name of the author into a search form, displaying results and allowing the user to click to the users profile.
  }
});

Route::get('/{photographerSlug}', 'SiteController@getPhotographer');