<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Photographer as SitePhotographer;

class SiteController extends Controller
{
  public function getPhotographerPage(Request $request, $photographerSlug) {
    // First, check to see if the photographer slug exists, otherwise 404.
    $photographerSlugCount = SitePhotographer::where('author_slug', $photographerSlug)->count();
    
    if(!($photographerSlugCount > 0) || $photographerSlugCount == false) abort(404);
    
    return view('pages.photographer')
      ->with('pageClass', 'photographerPortfolioPage')
      ->with('photographerSlug', $photographerSlug);
  }
}
