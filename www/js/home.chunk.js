(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home"],{

/***/ "./src/components/page/page.hbs":
/*!**************************************!*\
  !*** ./src/components/page/page.hbs ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"<div id=\\\"{{id}}\\\" class=\\\"page {{#secondary}}secondary{{/secondary}}\\\">\\n  {{#secondary}}\\n  <header>\\n    <span class=\\\"icon arrow_back\\\" action=\\\"back\\\"></span>\\n    <span class=\\\"title\\\">{{title}}</span>\\n  </header>\\n  {{/secondary}}\\n  <div class=\\\"page-body\\\"></div>\\n</div>\");\n\n//# sourceURL=webpack:///./src/components/page/page.hbs?");

/***/ }),

/***/ "./src/components/page/page.js":
/*!*************************************!*\
  !*** ./src/components/page/page.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Page; });\n/* harmony import */ var _page_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page.scss */ \"./src/components/page/page.scss\");\n/* harmony import */ var _page_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_page_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-tag-js */ \"./node_modules/html-tag-js/dist/tag.js\");\n/* harmony import */ var html_tag_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_tag_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mustache */ \"./node_modules/mustache/mustache.js\");\n/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mustache__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _page_hbs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page.hbs */ \"./src/components/page/page.hbs\");\n/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/helpers */ \"./src/utils/helpers.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config */ \"./src/config.js\");\n\n\n\n\n\n\n\n\n\n/**\n *\n * @param {String} title\n * @param {boolean|PageOption} [options] options or is secondary?\n * @returns {Page}\n */\nfunction Page(title, options) {\n  let id = _utils_helpers__WEBPACK_IMPORTED_MODULE_4__[\"default\"].uuid();\n  let secondary = false;\n\n  if (typeof options === 'boolean') {\n    secondary = options;\n  } else if (typeof options === 'object') {\n    id = options.id;\n    secondary = options.secondary;\n  } else {\n    options = {};\n  }\n\n  if (!secondary) id = 'main';\n\n  const content = mustache__WEBPACK_IMPORTED_MODULE_2___default.a.render(_page_hbs__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    id,\n    title,\n    secondary,\n  });\n  const $page = html_tag_js__WEBPACK_IMPORTED_MODULE_1___default.a.parse(content);\n\n  function render() {\n    if (secondary) {\n      actionStack.push({\n        id,\n        action: this.hide,\n      });\n    }\n\n    $page.addEventListener('click', (e) => {\n      const $target = e.target;\n      if ($target instanceof HTMLElement) {\n        const action = $target.getAttribute('action');\n        if (action === 'back') {\n          this.hide();\n          actionStack.remove(id);\n        }\n      }\n    });\n\n    app.append(this);\n  }\n\n  function hide() {\n    if (options.onhide) options.onhide();\n    $page.classList.add('hide');\n    setTimeout($page.remove.bind($page), _config__WEBPACK_IMPORTED_MODULE_5__[\"default\"].pageTransitionTimeout);\n  }\n\n  function setContent(HTMLtext) {\n    const $body = this.get('.page-body');\n    if (typeof HTMLtext === 'string') $body.innerHTML = HTMLtext;\n    if (HTMLtext instanceof HTMLElement) $body.append(HTMLtext);\n  }\n\n  function getContent() {\n    return this.get('page-body').innerHTML;\n  }\n\n  Object.defineProperty($page, 'id', {\n    value: id,\n  });\n  Object.defineProperty($page, 'render', {\n    value: render,\n  });\n  Object.defineProperty($page, 'hide', {\n    value: hide,\n  });\n  Object.defineProperty($page, 'content', {\n    set: setContent,\n    get: getContent,\n  });\n\n  return $page;\n}\n\n\n//# sourceURL=webpack:///./src/components/page/page.js?");

/***/ }),

/***/ "./src/components/page/page.scss":
/*!***************************************!*\
  !*** ./src/components/page/page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./src/components/page/page.scss?");

/***/ }),

/***/ "./src/pages/home/home.hbs":
/*!*********************************!*\
  !*** ./src/pages/home/home.hbs ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"<div id=\\\"home\\\">\\n  <div class=\\\"col center\\\">\\n    <h1>Dialogue box</h1>\\n    <button action=\\\"db-center\\\">Center</button>\\n    <button action=\\\"db-top\\\">Top</button>\\n    <button action=\\\"db-bottom\\\">Bottom</button>\\n\\n    <button action=\\\"page1\\\">Push page one</button>\\n  </div>\\n\\n  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid illum fugiat alias asperiores animi fugit autem\\n    tenetur, eveniet quibusdam rerum, voluptatibus accusantium quaerat quas maiores tempora labore optio enim, ipsa\\n    sapiente tempore minima ut officiis esse. Soluta quod ducimus impedit veritatis, amet vitae ipsam doloremque eum non\\n    distinctio ea, pariatur beatae deserunt corrupti blanditiis voluptas placeat necessitatibus magnam, magni quaerat\\n    facilis laborum dignissimos laudantium rem! Aperiam quidem dolorem eligendi, facere atque labore minus quam dicta\\n    soluta accusantium nesciunt architecto autem tempora ipsa. Eaque rem temporibus placeat expedita, eius consectetur\\n    mollitia recusandae vitae accusantium nobis! Similique quidem saepe dicta provident atque.</p>\\n</div>\");\n\n//# sourceURL=webpack:///./src/pages/home/home.hbs?");

/***/ }),

/***/ "./src/pages/home/home.include.js":
/*!****************************************!*\
  !*** ./src/pages/home/home.include.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HomeInclude; });\n/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.scss */ \"./src/pages/home/home.scss\");\n/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _home_hbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.hbs */ \"./src/pages/home/home.hbs\");\n/* harmony import */ var _components_page_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/page/page */ \"./src/components/page/page.js\");\n/* harmony import */ var _components_dialogs_box_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/dialogs/box/box */ \"./src/components/dialogs/box/box.js\");\n/* harmony import */ var _page1_page1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../page1/page1 */ \"./src/pages/page1/page1.js\");\n\n\n\n\n\n\nfunction HomeInclude() {\n  const $page = Object(_components_page_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n  $page.innerHTML = _home_hbs__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n  $page.addEventListener(\"click\", clickHandler);\n\n  $page.render();\n\n  /**\n   * \n   * @param {MouseEvent} e \n   */\n  function clickHandler(e) {\n    const $target = e.target;\n    const action = $target.getAttribute(\"action\");\n    let box;\n    switch (action) {\n      case 'db-center':\n        box = Object(_components_dialogs_box_box__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"Prompt box\", \"This is centered prompt box\", \"center\");\n        break;\n\n      case 'db-top':\n        box = Object(_components_dialogs_box_box__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"Prompt box\", \"This prompt box is positioned at top\", \"top\");\n        break;\n\n      case 'db-bottom':\n        box = Object(_components_dialogs_box_box__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\"Prompt box\", \"This prompt box is positioned at bottom\", \"bottom\");\n        break;\n\n      case 'page1':\n        Object(_page1_page1__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n        break;\n\n      default:\n        break;\n    }\n\n    if (box) {\n      box.render();\n      box.$mask.onclick = box.hide;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/pages/home/home.include.js?");

/***/ }),

/***/ "./src/pages/home/home.scss":
/*!**********************************!*\
  !*** ./src/pages/home/home.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./src/pages/home/home.scss?");

/***/ }),

/***/ "./src/pages/page1/page1.js":
/*!**********************************!*\
  !*** ./src/pages/page1/page1.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Page1; });\n// jshint ignore:start\r\n\r\nfunction Page1(args) {\r\n  __webpack_require__.e(/*! import() | page1 */ \"page1\").then(__webpack_require__.bind(null, /*! ./page1.include */ \"./src/pages/page1/page1.include.js\"))\r\n    .then(module => {\r\n      const page1 = module.default;\r\n      page1(args);\r\n    });\r\n}\n\n//# sourceURL=webpack:///./src/pages/page1/page1.js?");

/***/ })

}]);