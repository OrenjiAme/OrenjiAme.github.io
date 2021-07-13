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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/autoplay.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/autoplay.js":
/*!****************************!*\
  !*** ./src/js/autoplay.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 *
 *  autoplay.js
 *
 *  Copyright(C) 2017 Satoshi Kobayashi
 *  Released under the MIT license
 *  https://github.com/kobalab/Majiang/blob/master/LICENSE
 */



const { hide, show } = __webpack_require__(/*! ./majiang/view/fadein */ "./src/js/majiang/view/fadein.js");

let loaded, gamectl;

$(function(){
    let game;
    let speed = 3;
    let sound = true;
    let open_shoupai = false;
    let open_he      = false;

    function init() {
        $(window).on('keyup', function(event){
            if (event.key == ' ') {
                if (game._stop) gamectl.start();
                else            gamectl.stop();
                game._jieju_handler = ()=>{ gamectl.stop() };
            }
            else if (event.key == 's') gamectl.shoupai();
            else if (event.key == 'h') gamectl.he();
        });
        $('#game > .shoupai').on('mousedown', '.pai', ()=>gamectl.shoupai());
        $('#game > .he'     ).on('mousedown', '.pai', ()=>gamectl.he());

        start();
    }

    function start() {
        if (game) {
            speed        = game._speed;
            sound        = game._view.sound_on;
            open_shoupai = game._view.open_shoupai;
            open_he      = game._view.open_he;
        }
        game = new Majiang.Game();
        game._model.title
            = game._model.title.replace(/^.*?(?=\n)/, $('title').text());
        game._player = [
            new Majiang.Player(0),
            new Majiang.Player(1),
            new Majiang.Player(2),
            new Majiang.Player(3),
        ];
        game._callback = start;
        game._delay = 5000;
        gamectl = new Majiang.View.GameCtl($('#game'), game);
        game._speed = speed;
        game._view.sound_on = sound;
        game._view.open_shoupai = open_shoupai;
        game._view.open_he      = open_he;
        gamectl.update_controler();
        game.kaiju();
    }

    $('.version').text('ver. ' + Majiang.VERSION);

    $(window).on('load', function(){
        hide($('#title .loading'));
        $('#title .start').on('click', function(){
            $('body').attr('class','game');
            init();
        });
        show($('#title .start'));
    });
    if (loaded) $(window).trigger('load');
});

$(window).on('load', ()=>loaded = true);


/***/ }),

/***/ "./src/js/majiang/view/fadein.js":
/*!***************************************!*\
  !*** ./src/js/majiang/view/fadein.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 *  fadein.js
 */


module.exports = {

    show: node => node.removeClass('hide fadeout'),

    hide: node => node.addClass('hide fadeout'),

    fadeIn: node =>{
        node.addClass('hide fadeout');
        setTimeout(()=>{
            node.removeClass('hide');
            setTimeout(()=>
                    node.off('transitionend')
                        .removeClass('fadeout'), 0)
        }, 100);
        return node;
    },

    fadeOut: node =>
        node.on('transitionend', ()=>
                    node.off('transitionend')
                        .addClass('hide'))
            .addClass('fadeout'),
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2F1dG9wbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWppYW5nL3ZpZXcvZmFkZWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixPQUFPLGFBQWEsR0FBRyxtQkFBTyxDQUFDLDhEQUF1Qjs7QUFFdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNhOztBQUViOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXV0b3BsYXktMS41LjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9hdXRvcGxheS5qc1wiKTtcbiIsIi8qIVxyXG4gKlxyXG4gKiAgYXV0b3BsYXkuanNcclxuICpcclxuICogIENvcHlyaWdodChDKSAyMDE3IFNhdG9zaGkgS29iYXlhc2hpXHJcbiAqICBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcclxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9rb2JhbGFiL01hamlhbmcvYmxvYi9tYXN0ZXIvTElDRU5TRVxyXG4gKi9cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuY29uc3QgeyBoaWRlLCBzaG93IH0gPSByZXF1aXJlKCcuL21hamlhbmcvdmlldy9mYWRlaW4nKTtcclxuXHJcbmxldCBsb2FkZWQsIGdhbWVjdGw7XHJcblxyXG4kKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgZ2FtZTtcclxuICAgIGxldCBzcGVlZCA9IDM7XHJcbiAgICBsZXQgc291bmQgPSB0cnVlO1xyXG4gICAgbGV0IG9wZW5fc2hvdXBhaSA9IGZhbHNlO1xyXG4gICAgbGV0IG9wZW5faGUgICAgICA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PSAnICcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lLl9zdG9wKSBnYW1lY3RsLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlICAgICAgICAgICAgZ2FtZWN0bC5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLl9qaWVqdV9oYW5kbGVyID0gKCk9PnsgZ2FtZWN0bC5zdG9wKCkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT0gJ3MnKSBnYW1lY3RsLnNob3VwYWkoKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09ICdoJykgZ2FtZWN0bC5oZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNnYW1lID4gLnNob3VwYWknKS5vbignbW91c2Vkb3duJywgJy5wYWknLCAoKT0+Z2FtZWN0bC5zaG91cGFpKCkpO1xyXG4gICAgICAgICQoJyNnYW1lID4gLmhlJyAgICAgKS5vbignbW91c2Vkb3duJywgJy5wYWknLCAoKT0+Z2FtZWN0bC5oZSgpKTtcclxuXHJcbiAgICAgICAgc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcclxuICAgICAgICBpZiAoZ2FtZSkge1xyXG4gICAgICAgICAgICBzcGVlZCAgICAgICAgPSBnYW1lLl9zcGVlZDtcclxuICAgICAgICAgICAgc291bmQgICAgICAgID0gZ2FtZS5fdmlldy5zb3VuZF9vbjtcclxuICAgICAgICAgICAgb3Blbl9zaG91cGFpID0gZ2FtZS5fdmlldy5vcGVuX3Nob3VwYWk7XHJcbiAgICAgICAgICAgIG9wZW5faGUgICAgICA9IGdhbWUuX3ZpZXcub3Blbl9oZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2FtZSA9IG5ldyBNYWppYW5nLkdhbWUoKTtcclxuICAgICAgICBnYW1lLl9tb2RlbC50aXRsZVxyXG4gICAgICAgICAgICA9IGdhbWUuX21vZGVsLnRpdGxlLnJlcGxhY2UoL14uKj8oPz1cXG4pLywgJCgndGl0bGUnKS50ZXh0KCkpO1xyXG4gICAgICAgIGdhbWUuX3BsYXllciA9IFtcclxuICAgICAgICAgICAgbmV3IE1hamlhbmcuUGxheWVyKDApLFxyXG4gICAgICAgICAgICBuZXcgTWFqaWFuZy5QbGF5ZXIoMSksXHJcbiAgICAgICAgICAgIG5ldyBNYWppYW5nLlBsYXllcigyKSxcclxuICAgICAgICAgICAgbmV3IE1hamlhbmcuUGxheWVyKDMpLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZ2FtZS5fY2FsbGJhY2sgPSBzdGFydDtcclxuICAgICAgICBnYW1lLl9kZWxheSA9IDUwMDA7XHJcbiAgICAgICAgZ2FtZWN0bCA9IG5ldyBNYWppYW5nLlZpZXcuR2FtZUN0bCgkKCcjZ2FtZScpLCBnYW1lKTtcclxuICAgICAgICBnYW1lLl9zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIGdhbWUuX3ZpZXcuc291bmRfb24gPSBzb3VuZDtcclxuICAgICAgICBnYW1lLl92aWV3Lm9wZW5fc2hvdXBhaSA9IG9wZW5fc2hvdXBhaTtcclxuICAgICAgICBnYW1lLl92aWV3Lm9wZW5faGUgICAgICA9IG9wZW5faGU7XHJcbiAgICAgICAgZ2FtZWN0bC51cGRhdGVfY29udHJvbGVyKCk7XHJcbiAgICAgICAgZ2FtZS5rYWlqdSgpO1xyXG4gICAgfVxyXG5cclxuICAgICQoJy52ZXJzaW9uJykudGV4dCgndmVyLiAnICsgTWFqaWFuZy5WRVJTSU9OKTtcclxuXHJcbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGhpZGUoJCgnI3RpdGxlIC5sb2FkaW5nJykpO1xyXG4gICAgICAgICQoJyN0aXRsZSAuc3RhcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYXR0cignY2xhc3MnLCdnYW1lJyk7XHJcbiAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzaG93KCQoJyN0aXRsZSAuc3RhcnQnKSk7XHJcbiAgICB9KTtcclxuICAgIGlmIChsb2FkZWQpICQod2luZG93KS50cmlnZ2VyKCdsb2FkJyk7XHJcbn0pO1xyXG5cclxuJCh3aW5kb3cpLm9uKCdsb2FkJywgKCk9PmxvYWRlZCA9IHRydWUpO1xyXG4iLCIvKlxyXG4gKiAgZmFkZWluLmpzXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIHNob3c6IG5vZGUgPT4gbm9kZS5yZW1vdmVDbGFzcygnaGlkZSBmYWRlb3V0JyksXHJcblxyXG4gICAgaGlkZTogbm9kZSA9PiBub2RlLmFkZENsYXNzKCdoaWRlIGZhZGVvdXQnKSxcclxuXHJcbiAgICBmYWRlSW46IG5vZGUgPT57XHJcbiAgICAgICAgbm9kZS5hZGRDbGFzcygnaGlkZSBmYWRlb3V0Jyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICBub2RlLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PlxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKCd0cmFuc2l0aW9uZW5kJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWRlb3V0JyksIDApXHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgZmFkZU91dDogbm9kZSA9PlxyXG4gICAgICAgIG5vZGUub24oJ3RyYW5zaXRpb25lbmQnLCAoKT0+XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5vZmYoJ3RyYW5zaXRpb25lbmQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hpZGUnKSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWRlb3V0JyksXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==