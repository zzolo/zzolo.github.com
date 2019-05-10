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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./_js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./_js/app.js":
/*!********************!*\
  !*** ./_js/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Main JS\n */\n(function ($, _, chroma, Ractive) {\n  window.zzolo = window.zzolo || {};\n  $(document).ready(function () {\n    // Haikus\n    if ($('body').hasClass('haikus')) {\n      processHaikus();\n    }\n  }); // Process haikus\n\n  function processHaikus() {\n    var projectPath = '/projects/portrait_and_haiku/';\n    var ractive = new Ractive({\n      el: $('#haikus-container'),\n      template: $('#template-haikus').html(),\n      data: {}\n    }); // Get data first\n\n    $.getJSON(projectPath + 'data/haikus.json', function (haikus) {\n      haikus = _.map(haikus, function (h) {\n        h.date = moment(h.date);\n        h.portrait = projectPath + 'images/' + h.portrait;\n        h.haiku = h.haiku.replace(new RegExp('\\n', 'g'), '<br>');\n        return h;\n      });\n      haikus = _.sortBy(haikus, function (h) {\n        return h.date.unix();\n      });\n      ractive.set('haikus', haikus);\n    });\n  } // Print contact info\n\n\n  if (window.atob) {\n    $('.contact-info').html(window.atob('QWxhbiBQYWxhenpvbG88YnIgLz5hbGFuLnBhbGF6em9sb0BnbWFpbC5jb208YnIgLz4oNzcwKSA1OTYtMTk1MQ=='));\n  }\n})(jQuery, _, chroma, Ractive);\n\n//# sourceURL=webpack:///./_js/app.js?");

/***/ })

/******/ });