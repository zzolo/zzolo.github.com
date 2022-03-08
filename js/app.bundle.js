/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./_js/app.js":
/*!********************!*\
  !*** ./_js/app.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./_js/utils.js\");\n/**\n * General JS for all pages\n */\n // Global space\n\nwindow.zzolo = window.zzolo || {};\n(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.documentReady)(function () {\n  // Zzolo font\n  zzoloFont(); // Print contact info (includes phone) at the top for printing CV\n\n  if (window.atob) {\n    document.querySelector('.contact-info').innerHTML = window.atob('QWxhbiBQYWxhenpvbG88YnIgLz5hbGFuLnBhbGF6em9sb0BnbWFpbC5jb208YnIgLz4oNzcwKSA1OTYtMTk1MQ==');\n  }\n}); // zzolo font\n\nfunction zzoloFont() {\n  var pattern = ['z', 'z', 'o', 'l', 'o'];\n  var current = 0;\n\n  var zzoloFontKeyHandler = function zzoloFontKeyHandler(event) {\n    // If the key isn't in the pattern, or isn't the current key in the pattern, reset\n    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {\n      current = 0;\n      return;\n    } // Update how much of the pattern is complete\n\n\n    current++; // If complete, alert and reset\n\n    if (pattern.length === current) {\n      current = 0;\n      document.querySelector('body').classList.add('zzolo-font');\n    }\n  }; // Listen for keydown events\n\n\n  document.addEventListener('keydown', zzoloFontKeyHandler, false);\n}\n\n//# sourceURL=webpack://zzolo/./_js/app.js?");

/***/ }),

/***/ "./_js/utils.js":
/*!**********************!*\
  !*** ./_js/utils.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"documentReady\": function() { return /* binding */ documentReady; }\n/* harmony export */ });\n/**\n * General utils\n */\nfunction documentReady(callback) {\n  if (document.readyState != \"loading\") {\n    callback();\n  } else {\n    document.addEventListener(\"DOMContentLoaded\", callback);\n  }\n} // Exports\n\n\n\n\n//# sourceURL=webpack://zzolo/./_js/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./_js/app.js");
/******/ 	
/******/ })()
;