window.photographerPortfolio = {
  verbose: false,
  logIfVerbose: function(message) {
    var controller = this;
    
    if(controller.verbose) console.log('Photographer Portfolio', message);
  },
  init: function() {
    var controller = this;
    
    $(function() {
      // on jquery load,
      if($('.photographerPortfolioPage').length > 0) {
        controller.onPhotographerPage();
      }
    });
  },
  populateDataOnPhotographerPage: function(photographerData) {
    var controller = this;
    
    if(typeof photographerData != 'undefined' && photographerData != false && photographerData != null) {
      controller.logIfVerbose('Populating photographer data on photographer landscapes page');
      
      var photographerContainer = $('.photographer-info');
      
      // handle the photographer photo
      if(typeof photographerData.photographer_info.profile_picture != 'undefined')
        photographerContainer.find('.photographer-bio-photo').attr('src', photographerData.photographer_info.profile_picture);
      
      // handle photographer name
      if(typeof photographerData.photographer_info.name != 'undefined')
        photographerContainer.find('.photographer-bio-title-name').html(photographerData.photographer_info.name);
      
      if(typeof photographerData.photographer_info.bio != 'undefined')
        photographerContainer.find('.photographer-bio-description-content').html(photographerData.photographer_info.bio);
    }
  },
  onPhotographerPage: function() {
    var controller = this;
    
    controller.logIfVerbose('on Photographer Page');
    
    // Get the photographer slug
    if($(".photographer-info").length > 0 && typeof $(".photographer-info").data('photographer-slug') !== 'undefined') {
      var dataPhotographerSlug = $(".photographer-info").data('photographer-slug');
      
      var photographerLandscapeEndpoint = '/api/photographer/landscapes/' + dataPhotographerSlug;
      
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