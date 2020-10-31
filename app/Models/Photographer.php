<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photographer extends Model {
  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'photographers';
  
  /**
   * Get the galleries for the photographer entity.
   */
  public function galleries()
  {
      return $this->hasMany('App\Models\Gallery');
  }
}