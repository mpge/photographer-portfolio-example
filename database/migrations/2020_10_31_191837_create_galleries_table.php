<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE photographers ENGINE = InnoDB');
      
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
          
            $table->bigInteger('photographer_id')->unsigned();
          
            $table->string('gallery_title');
            $table->text('gallery_description')->nullable();
            $table->string('gallery_display_img');
            $table->date('gallery_date');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_enabled')->default(true);
        });
      
        DB::statement('ALTER TABLE galleries ENGINE = InnoDB');
      
        Schema::table('galleries', function(Blueprint $table) {
            $table->foreign('photographer_id')->references('id')->on('photographers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('galleries');
    }
}
