<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Photographer as SitePhotographer;

class SiteController extends Controller
{
  public function getPhotographerPage(Request $request) {
    return view('pages.photographer');
  }
}
