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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./src/scripts/main.js\");\n\r\n\r\n(function () {\r\n    document.addEventListener(\"DOMContentLoaded\", () => new _main_js__WEBPACK_IMPORTED_MODULE_0__[\"Main\"](), false)\r\n})()\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Main\", function() { return Main; });\nclass Main {\r\n\r\n    constructor() {\r\n        /*IMPORTS Y TEMPLATES*/\r\n        this.vista = {\r\n            aBtnsMenu: document.querySelectorAll('nav ul a'),                 //botones\r\n            eMain: document.querySelector('main'),                     //seccion main\r\n            aImports: document.querySelectorAll('link[rel=\"import\"]'),  //array de imports\r\n            oImports: {}                                                //imports\r\n        }\r\n\r\n        this.vista.aBtnsMenu.forEach((item) => {\r\n            item.addEventListener('click', this.menuItems.bind(this), false);\r\n        })\r\n\r\n        this.vista.aImports.forEach((elem) => {\r\n            this.vista.oImports[elem.title] = elem.import;\r\n        })\r\n\r\n        this.cargarTemplate('home');\r\n\r\n        /*MENU REPLEGABLE */\r\n        document.addEventListener(\"click\", function menuReplegable() {\r\n            let opcionesRep = document.querySelector(\"#opRep\").classList.toggle(\"esconder\")\r\n        });\r\n    }\r\n\r\n    menuItems(oEv) {\r\n        oEv.preventDefault();\r\n        if (!this.vista.oImports[oEv.target.id]) {\r\n            // Si no existe template\r\n            this.vista.eMain.innerHTML = `\r\n            <article>\r\n                <h2>404 Not Found</h2>\r\n                <p>No hemos encontrado lo que estabas buscando</p>\r\n            </article>`\r\n        } else {\r\n            this.cargarTemplate(oEv.target.id)\r\n        }\r\n    }\r\n\r\n    cargarTemplate(id) {\r\n        const IMPORT = this.vista.oImports[id];\r\n        const ELEM = IMPORT.querySelector(`#${id}`);\r\n        this.highlightSelected(id)\r\n        this.vista.eMain.innerHTML = ELEM.innerHTML;\r\n    }\r\n\r\n    highlightSelected(id) {\r\n        this.vista.aBtnsMenu.forEach(element => {\r\n            element.classList.remove(\"active\")\r\n        });\r\n        document.getElementById(id).classList.add(\"active\")\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/scripts/main.js?");

/***/ })

/******/ });