/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./photographer-portfolio */ "./resources/js/photographer-portfolio.js");

/***/ }),

/***/ "./resources/js/photographer-portfolio.js":
/*!************************************************!*\
  !*** ./resources/js/photographer-portfolio.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.photographerPortfolio = {
  verbose: false,
  currentPhotographerSlug: false,
  logIfVerbose: function logIfVerbose(message) {
    var controller = this;
    if (controller.verbose) console.log('Photographer Portfolio', message);
  },
  init: function init() {
    var controller = this;
    $(function () {
      // on jquery load,
      if ($('.photographerPortfolioPage').length > 0) {
        controller.defineCurrentPhotographerSlug();
        controller.onPhotographerPage();
        controller.setRandomBackgroundFromPhotoset();
      }
    });
  },
  defineCurrentPhotographerSlug: function defineCurrentPhotographerSlug() {
    var controller = this;
    controller.logIfVerbose("Finding photographer slug from in-dom elements");

    if ($(".photographer-info").length > 0 && typeof $(".photographer-info").data('photographer-slug') !== 'undefined') {
      var dataPhotographerSlug = $(".photographer-info").data('photographer-slug');
      controller.currentPhotographerSlug = dataPhotographerSlug;
      return true;
    }

    return false; // fail
  },
  setRandomBackgroundFromPhotoset: function setRandomBackgroundFromPhotoset() {
    var controller = this;
    controller.logIfVerbose('Grabbing random background from API');

    if (typeof controller.currentPhotographerSlug != 'undefined' && controller.currentPhotographerSlug != false) {
      var dataPhotographerSlug = controller.currentPhotographerSlug;
      var randomBackgroundFromPhotosetEndpoint = '/api/photographer/' + dataPhotographerSlug + '/random-landscape';
      $.getJSON(randomBackgroundFromPhotosetEndpoint, function (responseJson) {
        if (typeof responseJson.status != 'undefined' && responseJson.status == 1) {
          // success.
          if (typeof responseJson.random_landscape_url != 'undefined') {
            var randomBackgroundContainer = $('.randomBackground'); // Set randomBackground to the image url.

            randomBackgroundContainer.find('.innerRandomBackground').css({
              'background-image': 'url("' + responseJson.random_landscape_url + '")'
            });
          }
        }
      });
    }
  },
  populateDataOnPhotographerPage: function populateDataOnPhotographerPage(photographerData) {
    var controller = this;

    if (typeof photographerData != 'undefined' && photographerData != false && photographerData != null) {
      controller.logIfVerbose('Populating photographer data on photographer landscapes page');
      var photographerContainer = $('.photographer-info'); // handle the photographer photo

      if (typeof photographerData.photographer_info.profile_picture != 'undefined') photographerContainer.find('.photographer-bio-photo img').attr('src', photographerData.photographer_info.profile_picture); // handle photographer name

      if (typeof photographerData.photographer_info.name != 'undefined') photographerContainer.find('.photographer-bio-title-name').html(photographerData.photographer_info.name);
      if (typeof photographerData.photographer_info.bio != 'undefined') photographerContainer.find('.photographer-bio-description-content').html(photographerData.photographer_info.bio);

      if (typeof photographerData.photographer_info.email != 'undefined') {
        var photographerDataEmailLink = $('<a>').attr('href', 'mailto:' + photographerData.photographer_info.email).html(photographerData.photographer_info.email);
        photographerContainer.find('.photographer-bio-field.photographer-bio-field-email .photographer-bio-field-email-value').append(photographerDataEmailLink);
      }

      if (typeof photographerData.photographer_info.phone != 'undefined') {
        var photographerDataPhoneLink = $('<a>').attr('href', 'tel:' + photographerData.photographer_info.phone).html(photographerData.photographer_info.phone);
        photographerContainer.find('.photographer-bio-field.photographer-bio-field-phone .photographer-bio-field-phone-value').append(photographerDataPhoneLink);
      } // Load album


      if (typeof photographerData.photographer_info.album != 'undefined' && photographerData.photographer_info.album.length > 0) {
        var photographerAlbumRowsContainer = $('.photographer-album-section .photographer-album-rows'); // Loop through, creating the rows.

        var galleryRowCounter = 0;
        var currentGalleryRow = false;

        for (var galleryRow in photographerData.photographer_info.album) {
          if (photographerData.photographer_info.album.hasOwnProperty(galleryRow)) {
            galleryRowCounter++;

            if (galleryRowCounter == 1) {
              // On first, create the row.
              currentGalleryRow = $('<div>').addClass('pure-g');
            } // Create the u1-3


            var galleryRowHolder = $('<div>').addClass('pure-u-1-3');
            var galleryRowElement = $('<div>').addClass('gallery-album-element');
            var galleryRowPictureElement = $('<div>').addClass('gallery-album-element-picture').css({
              'background-image': 'url("' + photographerData.photographer_info.album[galleryRow].img + '")'
            });
            var galleryRowPictureElementTitle = $('<div>').addClass('gallery-album-element-picture-title').html(photographerData.photographer_info.album[galleryRow].title);
            galleryRowPictureElement.append(galleryRowPictureElementTitle);
            var galleryRowDescriptionBoxElement = $('<div>').addClass('gallery-album-element-description-box');
            var galleryRowDescriptionBoxDescription = $('<div>').addClass('gallery-album-element-description-box-description').html(photographerData.photographer_info.album[galleryRow].description);
            var galleryRowDescriptionSubbox = $('<div>').addClass('gallery-album-element-description-box-subinfo');
            var galleryRowDescriptionBoxLeftContainer = $('<div>').addClass('gallery-album-element-description-box-left-container');
            var galleryRowDescriptionBoxRightContainer = $('<div>').addClass('gallery-album-element-description-box-right-container');
            var galleryRowDescriptionBoxDate = $('<div>').addClass('gallery-album-element-description-box-date').html(photographerData.photographer_info.album[galleryRow].date);
            var galleryRowDescriptionBoxFeaturedHeart = $('<i>').addClass('fa').addClass('fa-heart').addClass('is-featured-heart');

            if (photographerData.photographer_info.album[galleryRow].featured == true) {
              galleryRowDescriptionBoxFeaturedHeart.addClass('heart-active');
            }

            galleryRowDescriptionBoxRightContainer.append(galleryRowDescriptionBoxDate);
            galleryRowDescriptionBoxLeftContainer.append(galleryRowDescriptionBoxFeaturedHeart);
            galleryRowDescriptionSubbox.append(galleryRowDescriptionBoxLeftContainer).append(galleryRowDescriptionBoxRightContainer);
            galleryRowDescriptionBoxElement.append(galleryRowDescriptionBoxDescription).append(galleryRowDescriptionSubbox);
            galleryRowElement.append(galleryRowPictureElement).append(galleryRowDescriptionBoxElement);
            galleryRowHolder.append(galleryRowElement);
            currentGalleryRow.append(galleryRowHolder);

            if (galleryRowCounter == 3) {
              // Add to dom.
              photographerAlbumRowsContainer.append(currentGalleryRow); // and reset.

              galleryRowCounter = 0;
              currentGalleryRow = false;
            }
          }
        }
      }
    }
  },
  onPhotographerPage: function onPhotographerPage() {
    var controller = this;
    controller.logIfVerbose('on Photographer Page'); // Get the photographer slug

    if (typeof controller.currentPhotographerSlug != 'undefined' && controller.currentPhotographerSlug != false) {
      var dataPhotographerSlug = controller.currentPhotographerSlug;
      var photographerLandscapeEndpoint = '/api/photographer/' + dataPhotographerSlug + '/landscapes';

      if (dataPhotographerSlug.length > 0) {
        $.getJSON(photographerLandscapeEndpoint, function (responseJson) {
          if (typeof responseJson.status != 'undefined' && responseJson.status == 1) {
            controller.logIfVerbose('Successfully received photographer landscape data from photographer landscape api endpoint...'); // Start populating data.

            controller.populateDataOnPhotographerPage(responseJson);
          }
        });
      }
    }
  }
};

/***/ }),

/***/ "./resources/less/app.less":
/*!*********************************!*\
  !*** ./resources/less/app.less ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/less/app.less ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/cabox/workspace/creative-guild-portfolio-test/site/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /home/cabox/workspace/creative-guild-portfolio-test/site/resources/less/app.less */"./resources/less/app.less");


/***/ })

/******/ });