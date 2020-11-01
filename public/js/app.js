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

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

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
  logIfVerbose: function logIfVerbose(message) {
    var controller = this;
    if (controller.verbose) console.log('Photographer Portfolio', message);
  },
  init: function init() {
    var controller = this;
    $(function () {
      // on jquery load,
      if ($('.photographerPortfolioPage').length > 0) {
        controller.onPhotographerPage();
      }
    });
  },
  populateDataOnPhotographerPage: function populateDataOnPhotographerPage(photographerData) {
    var controller = this;

    if (typeof photographerData != 'undefined' && photographerData != false && photographerData != null) {
      controller.logIfVerbose('Populating photographer data on photographer landscapes page');
      var photographerContainer = $('.photographer-info'); // handle the photographer photo

      if (typeof photographerData.photographer_info.profile_picture != 'undefined') photographerContainer.find('.photographer-bio-photo').attr('src', photographerData.photographer_info.profile_picture); // handle photographer name

      if (typeof photographerData.photographer_info.name != 'undefined') photographerContainer.find('.photographer-bio-title-name').html(photographerData.photographer_info.name);
      if (typeof photographerData.photographer_info.bio != 'undefined') photographerContainer.find('.photographer-bio-description-content').html(photographerData.photographer_info.bio);
    }
  },
  onPhotographerPage: function onPhotographerPage() {
    var controller = this;
    controller.logIfVerbose('on Photographer Page'); // Get the photographer slug

    if ($(".photographer-info").length > 0 && typeof $(".photographer-info").data('photographer-slug') !== 'undefined') {
      var dataPhotographerSlug = $(".photographer-info").data('photographer-slug');
      var photographerLandscapeEndpoint = '/api/photographer/landscapes/' + dataPhotographerSlug;

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

/***/ 0:
/*!***********************************************************!*\
  !*** multi ./resources/js/app.js ./resources/css/app.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/cabox/workspace/creative-guild-portfolio-test/site/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /home/cabox/workspace/creative-guild-portfolio-test/site/resources/css/app.css */"./resources/css/app.css");


/***/ })

/******/ });