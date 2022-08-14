"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcordova_app"] = self["webpackChunkcordova_app"] || []).push([["home"],{

/***/ "./src/components/page/page.js":
/*!*************************************!*\
  !*** ./src/components/page/page.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.scss */ \"./src/components/page/page.scss\");\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html-tag-js */ \"./node_modules/html-tag-js/dist/tag.js\");\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(html_tag_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils/helpers */ \"./src/utils/helpers.js\");\n\n\n\n\n/**\n *\n * @param {String} title\n * @param {boolean|PageOption} [options] options or is secondary?\n * @returns {import('../cordovaPage/cordovaPage').default}\n */\n\nfunction Page(title) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(title) === 'object') {\n    options = title;\n    title = undefined;\n  } else if (typeof title === 'boolean') {\n    options = {\n      secondary: title\n    };\n    title = undefined;\n  } else if (typeof title === 'string') {\n    options.secondary = true;\n  }\n\n  var _options = options,\n      _options$secondary = _options.secondary,\n      secondary = _options$secondary === void 0 ? false : _options$secondary,\n      _options$id = _options.id,\n      id = _options$id === void 0 ? utils_helpers__WEBPACK_IMPORTED_MODULE_3__[\"default\"].uuid() : _options$id;\n  var $page = html_tag_js__WEBPACK_IMPORTED_MODULE_2___default()('cordova-page', {\n    id: id,\n    attr: {\n      secondary: secondary\n    }\n  });\n  var $body = html_tag_js__WEBPACK_IMPORTED_MODULE_2___default()('div', {\n    className: 'body'\n  });\n\n  if (secondary) {\n    $page.append(html_tag_js__WEBPACK_IMPORTED_MODULE_2___default()('header', {\n      children: [html_tag_js__WEBPACK_IMPORTED_MODULE_2___default()('span', {\n        className: 'icon-arrow_back',\n        onclick: function onclick() {\n          $page.remove();\n        }\n      }), html_tag_js__WEBPACK_IMPORTED_MODULE_2___default()('span', {\n        className: 'title',\n        textContent: title\n      })]\n    }));\n    $page.on('show', function () {\n      actionStack.push({\n        id: id,\n        action: $page.hide\n      });\n    });\n    $page.on('hide', function () {\n      actionStack.remove(id);\n    });\n  }\n\n  $page.append($body);\n  return $page;\n}\n\n//# sourceURL=webpack://cordova-app/./src/components/page/page.js?");

/***/ }),

/***/ "./src/pages/home/home.include.js":
/*!****************************************!*\
  !*** ./src/pages/home/home.include.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ HomeInclude; }\n/* harmony export */ });\n/* harmony import */ var _home_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.view */ \"./src/pages/home/home.view.js\");\n/* harmony import */ var _components_page_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/page/page */ \"./src/components/page/page.js\");\n\n\nfunction HomeInclude() {\n  var count = 0;\n  var $page = (0,_components_page_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    id: 'home'\n  });\n  $page.content = (0,_home_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  app.append($page);\n  app.addEventListener('click', function (e) {\n    var action = e.target.dataset.action;\n\n    if (action === 'push-page') {\n      var $newPage = (0,_components_page_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"Page \".concat(++count));\n      $newPage.content = (0,_home_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n      app.append($newPage);\n      $newPage.on('hide', function () {\n        --count;\n      });\n    }\n  });\n}\n\n//# sourceURL=webpack://cordova-app/./src/pages/home/home.include.js?");

/***/ }),

/***/ "./src/pages/home/home.view.js":
/*!*************************************!*\
  !*** ./src/pages/home/home.view.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-tag-js */ \"./node_modules/html-tag-js/dist/tag.js\");\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html_tag_js__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return html_tag_js__WEBPACK_IMPORTED_MODULE_0___default()('div', {\n    children: [html_tag_js__WEBPACK_IMPORTED_MODULE_0___default()('h1', 'Corodva App'), html_tag_js__WEBPACK_IMPORTED_MODULE_0___default()('button', {\n      textContent: 'Push page',\n      dataset: {\n        action: 'push-page'\n      }\n    })],\n    style: {\n      display: 'flex',\n      flexDirection: 'column',\n      alignItems: 'center',\n      justifyContent: 'center',\n      height: '100%',\n      width: '100%'\n    }\n  });\n});\n\n//# sourceURL=webpack://cordova-app/./src/pages/home/home.view.js?");

/***/ }),

/***/ "./src/utils/helpers.js":
/*!******************************!*\
  !*** ./src/utils/helpers.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  /**\n   * Returns unique ID\n   * @returns {string}\n   */\n  uuid: function uuid() {\n    return (new Date().getTime() + parseInt(Math.random() * 100000000000, 10)).toString(36);\n  }\n});\n\n//# sourceURL=webpack://cordova-app/./src/utils/helpers.js?");

/***/ }),

/***/ "./src/components/page/page.scss":
/*!***************************************!*\
  !*** ./src/components/page/page.scss ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://cordova-app/./src/components/page/page.scss?");

/***/ })

}]);