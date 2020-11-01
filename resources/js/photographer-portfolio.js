window.photographerPortfolio = {
  verbose: false,
  currentPhotographerSlug: false,
  logIfVerbose: function(message) {
    var controller = this;
    
    if(controller.verbose) console.log('Photographer Portfolio', message);
  },
  init: function() {
    var controller = this;
    
    $(function() {
      // on jquery load,
      if($('.photographerPortfolioPage').length > 0) {
        controller.defineCurrentPhotographerSlug();
        
        controller.onPhotographerPage();
        controller.setRandomBackgroundFromPhotoset();
      }
    });
  },
  defineCurrentPhotographerSlug: function() {
    var controller = this;
    controller.logIfVerbose("Finding photographer slug from in-dom elements");
    
    if($(".photographer-info").length > 0 && typeof $(".photographer-info").data('photographer-slug') !== 'undefined') {
      var dataPhotographerSlug = $(".photographer-info").data('photographer-slug');
      
      controller.currentPhotographerSlug = dataPhotographerSlug;
      
      return true;
    }
    
    return false; // fail
  },
  setRandomBackgroundFromPhotoset: function() {
    var controller = this;
    
    controller.logIfVerbose('Grabbing random background from API');
    
    if(typeof controller.currentPhotographerSlug != 'undefined' && controller.currentPhotographerSlug != false) {
      var dataPhotographerSlug = controller.currentPhotographerSlug;
    
      var randomBackgroundFromPhotosetEndpoint = '/api/photographer/' + dataPhotographerSlug + '/random-landscape';
      
      $.getJSON(randomBackgroundFromPhotosetEndpoint, function(responseJson) {
        if(typeof responseJson.status != 'undefined' && responseJson.status == 1) {
          // success.
          if(typeof responseJson.random_landscape_url != 'undefined') {
            var randomBackgroundContainer = $('.randomBackground');
            // Set randomBackground to the image url.
            randomBackgroundContainer.find('.innerRandomBackground').css({'background-image': 'url("' + responseJson.random_landscape_url + '")'});
          }
        }
      });
    }
  },
  populateDataOnPhotographerPage: function(photographerData) {
    var controller = this;
    
    if(typeof photographerData != 'undefined' && photographerData != false && photographerData != null) {
      controller.logIfVerbose('Populating photographer data on photographer landscapes page');
      
      var photographerContainer = $('.photographer-info');
      
      // handle the photographer photo
      if(typeof photographerData.photographer_info.profile_picture != 'undefined')
        photographerContainer.find('.photographer-bio-photo img').attr('src', photographerData.photographer_info.profile_picture);
      
      // handle photographer name
      if(typeof photographerData.photographer_info.name != 'undefined')
        photographerContainer.find('.photographer-bio-title-name').html(photographerData.photographer_info.name);
      
      if(typeof photographerData.photographer_info.bio != 'undefined')
        photographerContainer.find('.photographer-bio-description-content').html(photographerData.photographer_info.bio);
      
      if(typeof photographerData.photographer_info.email != 'undefined') {
        var photographerDataEmailLink = $('<a>').attr('href', 'mailto:' + photographerData.photographer_info.email).html(photographerData.photographer_info.email);
        photographerContainer.find('.photographer-bio-field.photographer-bio-field-email .photographer-bio-field-email-value').append(photographerDataEmailLink);
      }
        
      if(typeof photographerData.photographer_info.phone != 'undefined') {
        var photographerDataPhoneLink = $('<a>').attr('href', 'tel:' + photographerData.photographer_info.phone).html(photographerData.photographer_info.phone);
        photographerContainer.find('.photographer-bio-field.photographer-bio-field-phone .photographer-bio-field-phone-value').append(photographerDataPhoneLink);
      }
        
      // Load album
      if(typeof photographerData.photographer_info.album != 'undefined' && photographerData.photographer_info.album.length > 0) {
        var photographerAlbumRowsContainer = $('.photographer-album-section .photographer-album-rows');
        // Loop through, creating the rows.
        
        var galleryRowCounter=0;
        var currentGalleryRow=false;
        for(var galleryRow in photographerData.photographer_info.album) {
          if(photographerData.photographer_info.album.hasOwnProperty(galleryRow)) {
            galleryRowCounter++;
            
            if(galleryRowCounter == 1) {
              // On first, create the row.
              currentGalleryRow = $('<div>').addClass('pure-g');
            }
            
            // Create the u1-3
            var galleryRowHolder = $('<div>').addClass('pure-u-1-3');
            var galleryRowElement = $('<div>').addClass('gallery-album-element');
            var galleryRowPictureElement = $('<div>').addClass('gallery-album-element-picture').css({'background-image': 'url("' + photographerData.photographer_info.album[galleryRow].img + '")'});
            var galleryRowPictureElementTitle = $('<div>').addClass('gallery-album-element-picture-title').html(photographerData.photographer_info.album[galleryRow].title);
            
            galleryRowPictureElement.append(galleryRowPictureElementTitle);
            
            var galleryRowDescriptionBoxElement = $('<div>').addClass('gallery-album-element-description-box');
            var galleryRowDescriptionBoxDescription = $('<div>').addClass('gallery-album-element-description-box-description').html(photographerData.photographer_info.album[galleryRow].description);
            
            var galleryRowDescriptionSubbox = $('<div>').addClass('gallery-album-element-description-box-subinfo');
            var galleryRowDescriptionBoxLeftContainer = $('<div>').addClass('gallery-album-element-description-box-left-container');
            var galleryRowDescriptionBoxRightContainer = $('<div>').addClass('gallery-album-element-description-box-right-container');
            
            var galleryRowDescriptionBoxDate = $('<div>').addClass('gallery-album-element-description-box-date').html(photographerData.photographer_info.album[galleryRow].date);
            var galleryRowDescriptionBoxFeaturedHeart = $('<i>').addClass('fa').addClass('fa-heart').addClass('is-featured-heart');
            
            if(photographerData.photographer_info.album[galleryRow].featured == true) {
              galleryRowDescriptionBoxFeaturedHeart.addClass('heart-active');
            }
            
            galleryRowDescriptionBoxRightContainer.append(galleryRowDescriptionBoxDate);
            galleryRowDescriptionBoxLeftContainer.append(galleryRowDescriptionBoxFeaturedHeart);
            
            galleryRowDescriptionSubbox.append(galleryRowDescriptionBoxLeftContainer).append(galleryRowDescriptionBoxRightContainer);
            
            galleryRowDescriptionBoxElement.append(galleryRowDescriptionBoxDescription).append(galleryRowDescriptionSubbox);
            
            galleryRowElement.append(galleryRowPictureElement).append(galleryRowDescriptionBoxElement);
            
            galleryRowHolder.append(galleryRowElement);
            
            currentGalleryRow.append(galleryRowHolder);
            
            if(galleryRowCounter == 3) {
              // Add to dom.
              photographerAlbumRowsContainer.append(currentGalleryRow);
              // and reset.
              galleryRowCounter=0;
              currentGalleryRow=false;
            }
          }
        }
      }
    }
  },
  onPhotographerPage: function() {
    var controller = this;
    
    controller.logIfVerbose('on Photographer Page');
    
    // Get the photographer slug
    if(typeof controller.currentPhotographerSlug != 'undefined' && controller.currentPhotographerSlug != false) {
      var dataPhotographerSlug = controller.currentPhotographerSlug;
      
      var photographerLandscapeEndpoint = '/api/photographer/' + dataPhotographerSlug + '/landscapes';
      
      if(dataPhotographerSlug.length > 0) {
        $.getJSON(photographerLandscapeEndpoint, function(responseJson) {
          if(typeof responseJson.status != 'undefined' && responseJson.status == 1) {
            controller.logIfVerbose('Successfully received photographer landscape data from photographer landscape api endpoint...');
            
            // Start populating data.
            controller.populateDataOnPhotographerPage(responseJson);
          }
        });
      }
    }
  }
}