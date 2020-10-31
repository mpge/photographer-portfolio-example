<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model {
  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'photos';
  
  /**
   * Get the gallery that owns the photo.
   */
  public function gallery()
  {
      return $this->belongsTo('App\Models\Gallery');
  }
}