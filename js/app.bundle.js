/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./_js/app.js":
/*!********************!*\
  !*** ./_js/app.js ***!
  \********************/
/***/ (function() {

eval("/**\n * Main JS\n */\n(function ($, _, chroma, Ractive) {\n  window.zzolo = window.zzolo || {};\n  $(document).ready(function () {\n    // Haikus\n    if ($('body').hasClass('haikus')) {\n      processHaikus();\n    } // Zzolo font\n\n\n    zzoloFont();\n  }); // Process haikus\n\n  function processHaikus() {\n    var projectPath = '/projects/portrait_and_haiku/';\n    var ractive = new Ractive({\n      el: $('#haikus-container'),\n      template: $('#template-haikus').html(),\n      data: {}\n    }); // Get data first\n\n    $.getJSON(projectPath + 'data/haikus.json', function (haikus) {\n      haikus = _.map(haikus, function (h) {\n        h.date = moment(h.date);\n        h.portrait = projectPath + 'images/' + h.portrait;\n        h.haiku = h.haiku.replace(new RegExp('\\n', 'g'), '<br>');\n        return h;\n      });\n      haikus = _.sortBy(haikus, function (h) {\n        return h.date.unix();\n      });\n      ractive.set('haikus', haikus);\n    });\n  } // zzolo font\n\n\n  function zzoloFont() {\n    var pattern = ['z', 'z', 'o', 'l', 'o'];\n    var current = 0;\n\n    var zzoloFontKeyHandler = function zzoloFontKeyHandler(event) {\n      // If the key isn't in the pattern, or isn't the current key in the pattern, reset\n      if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {\n        current = 0;\n        return;\n      } // Update how much of the pattern is complete\n\n\n      current++; // If complete, alert and reset\n\n      if (pattern.length === current) {\n        current = 0;\n        $('body').addClass('zzolo-font');\n      }\n    }; // Listen for keydown events\n\n\n    document.addEventListener('keydown', zzoloFontKeyHandler, false);\n  } // Print contact info\n\n\n  if (window.atob) {\n    $('.contact-info').html(window.atob('QWxhbiBQYWxhenpvbG88YnIgLz5hbGFuLnBhbGF6em9sb0BnbWFpbC5jb208YnIgLz4oNzcwKSA1OTYtMTk1MQ=='));\n  }\n})(jQuery, _, chroma, Ractive);\n\n//# sourceURL=webpack://zzolo/./_js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./_js/app.js"]();
/******/ 	
/******/ })()
;