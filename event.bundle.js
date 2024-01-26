"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktodolist"] = self["webpackChunktodolist"] || []).push([["event"],{

/***/ "./src/event.js":
/*!**********************!*\
  !*** ./src/event.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Event)\n/* harmony export */ });\n// Builds an event with the input from the add event modal\nclass Event {\n    constructor(name, date, priority, notes, complete = false) {\n        this._name = name;\n        this._date = date;\n        this._priority = priority;\n        this._notes = notes;\n        this._complete = complete;\n    }\n\n    get name() {\n        return this._name;\n    }\n\n    get date() {\n        return this._date;\n    }\n\n    get priority() {\n        return this._priority;\n    }\n\n    get notes() {\n        return this._notes;\n    }\n\n    get complete() {\n        return this._complete;\n    }\n}\n\n\n//# sourceURL=webpack://todolist/./src/event.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/event.js"));
/******/ }
]);