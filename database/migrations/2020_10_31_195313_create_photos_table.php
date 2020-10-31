<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
          
            $table->bigInteger('gallery_id')->unsigned();
          
            $table->string('photo_name');
            $table->string('photo_url');
            $table->boolean('is_gallery_display_img')->default(false);
        });
      
        DB::statement('ALTER TABLE photos ENGINE = InnoDB');
      
        Schema::table('photos', function(Blueprint $table) {
            $table->foreign('gallery_id')->references('id')->on('galleries');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('photos');
    }
}
