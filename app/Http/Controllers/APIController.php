<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Photographer as SitePhotographer;
use App\Models\Gallery as SiteGallery;
use App\Models\Photo as SitePhoto;

class APIController extends Controller
{
  public function getPhotographerLandscapes(Request $request) {
    // Default response:
    $responseJson = array(
      'status' => 0,
      'photographer_info' => array(
      ),
    );
    
    if($request->has('pslug')) {
      $photographerSlug = $request->input('pslug', '');
      
      // Find the photographer based off the slug.
      if($photographerSlug != '' && $photographerSlug != null && $photographerSlug != false) {
        $photographer = SitePhotographer::where('author_slug', $request->input('pslug'))->first();
        
        if($photographer != false) {
          // Bind the data in the JSON array.
          $responseJson['status'] = 1;
          $responseJson['photographer_info'] = array(
            'name' => (isset($photographer->author_name)) ? $photographer->author_name : '',
            'phone' => (isset($photographer->author_phone)) ? $photographer->author_phone : '',
            'email' => (isset($photographer->author_email)) ? $photographer->author_email : '',
            'bio' => (isset($photographer->author_bio)) ? $photographer->author_bio : '',
            'profile_picture' => (isset($photographer->author_profile_picture_url)) ? $photographer->author_profile_picture_url : '',
            'sm_twitter' => (isset($photographer->author_sm_twitter)) ? $photographer->author_sm_twitter : '',
            'sm_facebook' => (isset($photographer->author_sm_facebook)) ? $photographer->author_sm_facebook : '',
            'sm_instagram' => (isset($photographer->author_sm_instagram)) ? $photographer->author_sm_instagram : '',
            'sm_behance' => (isset($photographer->author_sm_behance)) ? $photographer->author_sm_behance : '',
            'album' => array(),
          );
          
          // @todo add rest of fields.
          // Get the galleries.
          $photographerGalleries = $photographer->galleries()->where('is_enabled', true)->get();
          
          foreach($photographerGalleries as $gallery) {
            $galleryJson = array(
              'id' => (isset($gallery->id)) ? $gallery->id : '',
              'title' => (isset($gallery->gallery_title)) ? $gallery->gallery_title : '',
              'description' => (isset($gallery->gallery_description)) ? $gallery->gallery_description : '',
              'date' => (isset($gallery->gallery_date)) ? $gallery->gallery_date : '',
              'featured' => (isset($gallery->is_featured) && $gallery->is_featured == true) ? true : false,
            );
            
            // Get the photo which is displayed as featured.
            $featuredPhoto = $gallery->photos()->where('is_gallery_display_img', true)->where('photo_url', '!=', null)->first();
            
            if($featuredPhoto != false && $featuredPhoto != null) {
              $galleryJson['img'] = (isset($featuredPhoto->photo_url)) ? $featuredPhoto->photo_url : '';
            }
            
            $responseJson['photographer_info']['album'][] = $galleryJson;
          }
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
