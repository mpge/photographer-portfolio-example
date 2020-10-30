<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Photographer as SitePhotographer;

class APIController extends Controller
{
  public function getPhotographerLandscapes(Request $request) {
    // Default response:
    $responseJson = array(
      'status' => 0,
      'photographer_info' => array(
      );
    );
    
    if($request->has('pslug')) {
      $photographerSlug = $request->input('pslug', '');
      
      // Find the photographer based off the slug.
      if($photographerSlug != '' && $photographerSlug != null && $photographerSlug != false) {
        $photographer = SitePhotographer::where('photographer_slug', $request->input('pslug'))->first();
        
        if($photographer != false) {
          // Bind the data in the JSON array.
          $responseJson['status'] = 1;
          $responseJson['name'] = (isset($photographer->photographer_name)) ? $photographer->photographer_name : '';
          $responseJson['phone'] = (isset($photographer->photographer_phone)) ? $photographer->photographer_name : '';
          
          // @todo add rest of fields.
        } else {
          $responseJson['error'] = 'PSLUG_YIELD_NO_RESULTS';
        }
      } else {
        $responseJson['error'] = 'INVALID_PSLUG_PROVIDED';
      }
    } else {
      $responseJson['error'] = 'NO_PSLUG_PROVIDED';
    }
    
    return response()->json($responseJson);
  }
}
