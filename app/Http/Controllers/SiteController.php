<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SiteController extends Controller
{
  public function getPhotographerPage(Request $request) {
    return view('photographer');
  }
}
