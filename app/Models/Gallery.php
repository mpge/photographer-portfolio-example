<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model {
  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'galleries';
  
  /**
   * Get the photographer that owns the gallery.
   */
  public function photographer()
  {
      return $this->belongsTo('App\Models\Photographer');
  }
  
  /**
   * Get the photos for the gallery entity.
   */
  public function photos()
  {
      return $this->hasMany('App\Models\Photo');
  }
}