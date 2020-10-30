<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotographersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photographers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('author_slug');
          
            $table->string('author_name')->nullable();
            $table->string('author_phone')->nullable();
            $table->string('author_email')->nullable();
            $table->text('author_bio')->nullable();
            $table->text('author_profile_picture_url')->nullable();
          
            $table->string('author_sm_twitter')->nullable();
            $table->string('author_sm_instagram')->nullable();
            $table->string('author_sm_facebook')->nullable();
            $table->string('author_sm_behance')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('photographers');
    }
}
