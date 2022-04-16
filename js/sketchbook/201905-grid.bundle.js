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

/***/ "./_js/sketchbook/201905-grid.js":
/*!***************************************!*\
  !*** ./_js/sketchbook/201905-grid.js ***!
  \***************************************/
/***/ (function() {

eval("/**\n * Grid sketch\n */\n// Global: d3\nvar minRadius = 3;\nvar maxRadius = 10;\nvar gridUnit = maxRadius * 2 * 1;\nvar offsetTop = -9;\nvar offsetLeft = -17;\nvar offsetBottom = 14;\nvar offsetRight = 14;\nvar el = document.getElementById('sketchbook-canvas');\nvar width = el.clientWidth;\nvar height = el.clientHeight; // Make a random radius\n\nvar makeRadius = function makeRadius() {\n  return Math.random() * (maxRadius - minRadius) + minRadius;\n}; // Create grid\n\n\nvar grid = [];\n\nfor (var x = 0 + offsetLeft; x < width + offsetRight; x += gridUnit) {\n  for (var y = 0 + offsetTop; y < height + offsetBottom; y += gridUnit) {\n    grid.push({\n      radius: makeRadius(),\n      color: Math.random(),\n      x: x,\n      y: y,\n      cx: x + gridUnit / 2,\n      cy: y + gridUnit / 2\n    });\n  }\n} // Draw svg\n\n\nvar svg = d3.select(\"#sketchbook-canvas\").append(\"svg\").attr(\"width\", width).attr(\"height\", height); // Color scale\n\nvar color = d3.scaleSequential(d3.interpolateSpectral); // Draw circle\n\nvar groups = svg.selectAll('g.cell').data(grid).enter().append('g').classed('cell', true).attr('transform', function (d) {\n  return \"translate(\".concat(d.x, \",\").concat(d.y, \")\");\n});\nvar circles = groups.append('circle').attr('cx', function (d) {\n  return d.cx;\n}).attr('cy', function (d) {\n  return d.cy;\n}).attr('r', function (d) {\n  return d.radius;\n}).attr('fill', function (d) {\n  return color(d.color);\n}); // Interval\n\nvar interval = 5000;\nsetInterval(function () {\n  var t = d3.transition().duration(interval).ease(d3.easeLinear);\n  circles.transition(t).attr('fill', function (d) {\n    return color(Math.random());\n  }).attr('r', makeRadius);\n}, interval);\n\n//# sourceURL=webpack://zzolo/./_js/sketchbook/201905-grid.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./_js/sketchbook/201905-grid.js"]();
/******/ 	
/******/ })()
;