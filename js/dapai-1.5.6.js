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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/dapai.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/dapai.js":
/*!*************************!*\
  !*** ./src/js/dapai.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 *
 *`dapai.js
 *
 *  Copyright(C) 2019 Satoshi Kobayashi
 *  Released under the MIT license
 *  https://github.com/kobalab/Majiang/blob/master/LICENSE
 */



const { hide, fadeIn } = __webpack_require__(/*! ./majiang/view/fadein */ "./src/js/majiang/view/fadein.js");

let _row;

class Shan {
    constructor(baopai, fubaopai) {
        this._baopai   = baopai   || [];
        this._fubaopai = fubaopai || [];
    }
    baopai()   { return this._baopai   }
    fubaopai() { return this._fubaopai }
    paishu()   { return 0 }
}

function init_analyzer(paistr, zhuangfeng, menfeng, baopai, hongpai) {

    const analyzer = new Majiang.View.Analyzer(0, $('#dapai'));

    let kaiju = {
        player:  [],
        qijia:   0,
        hongpai: hongpai
    };
    analyzer.kaiju(kaiju);

    let qipai = {
        zhuangfeng: zhuangfeng,
        jushu:      (4 - menfeng) % 4,
        changbang:  0,
        lizhibang:  0,
        defen:      [ 25000, 25000, 25000, 25000 ],
        baopai:     baopai.length && Majiang.Shoupai.valid_pai(baopai[0])
                                                            ||'z2',
        shoupai:    [ '', '', '', '' ]
    };
    qipai.shoupai[menfeng] = paistr;
    analyzer.qipai(qipai);

    for (let i = 1; i < baopai.length; i++) {
        analyzer.kaigang({ baopai: baopai[i] });
    }

    return analyzer;
}

function submit() {

    let paistr     = $('input[name="paistr"]').val();
    if (! paistr) return false;

    let zhuangfeng = + $('select[name="zhuangfeng"]').val();
    let menfeng    = + $('select[name="menfeng"]').val();
    let baopai     = $.makeArray($('input[name="baopai"]'))
                                    .map(p=>$(p).val()).filter(p=>p);
    let hongpai    = $('input[name="hongpai"]').prop('checked');

    const analyzer = init_analyzer(paistr, zhuangfeng, menfeng, baopai, hongpai
                        ? { m: 1, p: 1, s: 1 }
                        : { m: 0, p: 0, s: 0 });

    new Majiang.View.Shan('.shan', new Shan(analyzer._baopai)).redraw();
    new Majiang.View.Shoupai('.shoupai', analyzer._shoupai).redraw(true);

    analyzer.action_zimo();

    fadeIn($('#dapai'));

    paistr = analyzer._shoupai.toString();
    $('input[name="paistr"]').val(paistr);
    baopai = analyzer._baopai;
    for (let i = 0; i < baopai.length; i++) {
        $('input[name="baopai"]').eq(i).val(baopai[i]);
    }

    let fragment = '#'
                 + [ paistr, zhuangfeng, menfeng, baopai.join(',')].join('/');
    if (! hongpai) fragment += '/1';
    history.replaceState('', '', fragment)

    return false;
}

$(function(){

    $('.version').text('ver. ' + Majiang.VERSION);

    $('form').on('submit', submit);

    $('form').on('reset', ()=>{
        $('input[name="paistr"]').focus();
        hide($('#dapai'));
    });

    _row = $('.report .row');
    $('.report').empty();

    let fragment = location.hash.replace(/^#/,'');
    if (fragment) {
        let [paistr, zhuangfeng, menfeng, baopai, hongpai]
                                            = fragment.match(/([^\/]+)/g);
        baopai  = (baopai || '').split(/,/);
        hongpai = ! hongpai;

        $('input[name="paistr"]').val(paistr);
        $('select[name="zhuangfeng"]').val(zhuangfeng);
        $('select[name="menfeng"]').val(menfeng);
        for (let i = 0; i < baopai.length; i++) {
            $('input[name="baopai"]').eq(i).val(baopai[i]);
        }
        $('input[name="hongpai"]').prop('checked', hongpai);

        submit();
    }
    else {
        $('input[name="paistr"]').val('m123p1234789s338s8').focus();
        $('input[name="baopai"]').eq(0).val('s3');
    }
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RhcGFpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWppYW5nL3ZpZXcvZmFkZWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixPQUFPLGVBQWUsR0FBRyxtQkFBTyxDQUFDLDhEQUF1Qjs7QUFFeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG1CQUFtQjtBQUN0QywwQkFBMEIsb0JBQW9CO0FBQzlDOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCLDJCQUEyQixtQkFBbUI7O0FBRTlDO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDaElEO0FBQ0E7QUFDQTtBQUNhOztBQUViOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZGFwYWktMS41LjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9kYXBhaS5qc1wiKTtcbiIsIi8qIVxyXG4gKlxyXG4gKmBkYXBhaS5qc1xyXG4gKlxyXG4gKiAgQ29weXJpZ2h0KEMpIDIwMTkgU2F0b3NoaSBLb2JheWFzaGlcclxuICogIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2tvYmFsYWIvTWFqaWFuZy9ibG9iL21hc3Rlci9MSUNFTlNFXHJcbiAqL1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5jb25zdCB7IGhpZGUsIGZhZGVJbiB9ID0gcmVxdWlyZSgnLi9tYWppYW5nL3ZpZXcvZmFkZWluJyk7XHJcblxyXG5sZXQgX3JvdztcclxuXHJcbmNsYXNzIFNoYW4ge1xyXG4gICAgY29uc3RydWN0b3IoYmFvcGFpLCBmdWJhb3BhaSkge1xyXG4gICAgICAgIHRoaXMuX2Jhb3BhaSAgID0gYmFvcGFpICAgfHwgW107XHJcbiAgICAgICAgdGhpcy5fZnViYW9wYWkgPSBmdWJhb3BhaSB8fCBbXTtcclxuICAgIH1cclxuICAgIGJhb3BhaSgpICAgeyByZXR1cm4gdGhpcy5fYmFvcGFpICAgfVxyXG4gICAgZnViYW9wYWkoKSB7IHJldHVybiB0aGlzLl9mdWJhb3BhaSB9XHJcbiAgICBwYWlzaHUoKSAgIHsgcmV0dXJuIDAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0X2FuYWx5emVyKHBhaXN0ciwgemh1YW5nZmVuZywgbWVuZmVuZywgYmFvcGFpLCBob25ncGFpKSB7XHJcblxyXG4gICAgY29uc3QgYW5hbHl6ZXIgPSBuZXcgTWFqaWFuZy5WaWV3LkFuYWx5emVyKDAsICQoJyNkYXBhaScpKTtcclxuXHJcbiAgICBsZXQga2FpanUgPSB7XHJcbiAgICAgICAgcGxheWVyOiAgW10sXHJcbiAgICAgICAgcWlqaWE6ICAgMCxcclxuICAgICAgICBob25ncGFpOiBob25ncGFpXHJcbiAgICB9O1xyXG4gICAgYW5hbHl6ZXIua2FpanUoa2FpanUpO1xyXG5cclxuICAgIGxldCBxaXBhaSA9IHtcclxuICAgICAgICB6aHVhbmdmZW5nOiB6aHVhbmdmZW5nLFxyXG4gICAgICAgIGp1c2h1OiAgICAgICg0IC0gbWVuZmVuZykgJSA0LFxyXG4gICAgICAgIGNoYW5nYmFuZzogIDAsXHJcbiAgICAgICAgbGl6aGliYW5nOiAgMCxcclxuICAgICAgICBkZWZlbjogICAgICBbIDI1MDAwLCAyNTAwMCwgMjUwMDAsIDI1MDAwIF0sXHJcbiAgICAgICAgYmFvcGFpOiAgICAgYmFvcGFpLmxlbmd0aCAmJiBNYWppYW5nLlNob3VwYWkudmFsaWRfcGFpKGJhb3BhaVswXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwnejInLFxyXG4gICAgICAgIHNob3VwYWk6ICAgIFsgJycsICcnLCAnJywgJycgXVxyXG4gICAgfTtcclxuICAgIHFpcGFpLnNob3VwYWlbbWVuZmVuZ10gPSBwYWlzdHI7XHJcbiAgICBhbmFseXplci5xaXBhaShxaXBhaSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBiYW9wYWkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBhbmFseXplci5rYWlnYW5nKHsgYmFvcGFpOiBiYW9wYWlbaV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFuYWx5emVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdWJtaXQoKSB7XHJcblxyXG4gICAgbGV0IHBhaXN0ciAgICAgPSAkKCdpbnB1dFtuYW1lPVwicGFpc3RyXCJdJykudmFsKCk7XHJcbiAgICBpZiAoISBwYWlzdHIpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBsZXQgemh1YW5nZmVuZyA9ICsgJCgnc2VsZWN0W25hbWU9XCJ6aHVhbmdmZW5nXCJdJykudmFsKCk7XHJcbiAgICBsZXQgbWVuZmVuZyAgICA9ICsgJCgnc2VsZWN0W25hbWU9XCJtZW5mZW5nXCJdJykudmFsKCk7XHJcbiAgICBsZXQgYmFvcGFpICAgICA9ICQubWFrZUFycmF5KCQoJ2lucHV0W25hbWU9XCJiYW9wYWlcIl0nKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChwPT4kKHApLnZhbCgpKS5maWx0ZXIocD0+cCk7XHJcbiAgICBsZXQgaG9uZ3BhaSAgICA9ICQoJ2lucHV0W25hbWU9XCJob25ncGFpXCJdJykucHJvcCgnY2hlY2tlZCcpO1xyXG5cclxuICAgIGNvbnN0IGFuYWx5emVyID0gaW5pdF9hbmFseXplcihwYWlzdHIsIHpodWFuZ2ZlbmcsIG1lbmZlbmcsIGJhb3BhaSwgaG9uZ3BhaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHsgbTogMSwgcDogMSwgczogMSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBtOiAwLCBwOiAwLCBzOiAwIH0pO1xyXG5cclxuICAgIG5ldyBNYWppYW5nLlZpZXcuU2hhbignLnNoYW4nLCBuZXcgU2hhbihhbmFseXplci5fYmFvcGFpKSkucmVkcmF3KCk7XHJcbiAgICBuZXcgTWFqaWFuZy5WaWV3LlNob3VwYWkoJy5zaG91cGFpJywgYW5hbHl6ZXIuX3Nob3VwYWkpLnJlZHJhdyh0cnVlKTtcclxuXHJcbiAgICBhbmFseXplci5hY3Rpb25femltbygpO1xyXG5cclxuICAgIGZhZGVJbigkKCcjZGFwYWknKSk7XHJcblxyXG4gICAgcGFpc3RyID0gYW5hbHl6ZXIuX3Nob3VwYWkudG9TdHJpbmcoKTtcclxuICAgICQoJ2lucHV0W25hbWU9XCJwYWlzdHJcIl0nKS52YWwocGFpc3RyKTtcclxuICAgIGJhb3BhaSA9IGFuYWx5emVyLl9iYW9wYWk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhb3BhaS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJiYW9wYWlcIl0nKS5lcShpKS52YWwoYmFvcGFpW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZnJhZ21lbnQgPSAnIydcclxuICAgICAgICAgICAgICAgICArIFsgcGFpc3RyLCB6aHVhbmdmZW5nLCBtZW5mZW5nLCBiYW9wYWkuam9pbignLCcpXS5qb2luKCcvJyk7XHJcbiAgICBpZiAoISBob25ncGFpKSBmcmFnbWVudCArPSAnLzEnO1xyXG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoJycsICcnLCBmcmFnbWVudClcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKCcudmVyc2lvbicpLnRleHQoJ3Zlci4gJyArIE1hamlhbmcuVkVSU0lPTik7XHJcblxyXG4gICAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBzdWJtaXQpO1xyXG5cclxuICAgICQoJ2Zvcm0nKS5vbigncmVzZXQnLCAoKT0+e1xyXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYWlzdHJcIl0nKS5mb2N1cygpO1xyXG4gICAgICAgIGhpZGUoJCgnI2RhcGFpJykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgX3JvdyA9ICQoJy5yZXBvcnQgLnJvdycpO1xyXG4gICAgJCgnLnJlcG9ydCcpLmVtcHR5KCk7XHJcblxyXG4gICAgbGV0IGZyYWdtZW50ID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlKC9eIy8sJycpO1xyXG4gICAgaWYgKGZyYWdtZW50KSB7XHJcbiAgICAgICAgbGV0IFtwYWlzdHIsIHpodWFuZ2ZlbmcsIG1lbmZlbmcsIGJhb3BhaSwgaG9uZ3BhaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGZyYWdtZW50Lm1hdGNoKC8oW15cXC9dKykvZyk7XHJcbiAgICAgICAgYmFvcGFpICA9IChiYW9wYWkgfHwgJycpLnNwbGl0KC8sLyk7XHJcbiAgICAgICAgaG9uZ3BhaSA9ICEgaG9uZ3BhaTtcclxuXHJcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBhaXN0clwiXScpLnZhbChwYWlzdHIpO1xyXG4gICAgICAgICQoJ3NlbGVjdFtuYW1lPVwiemh1YW5nZmVuZ1wiXScpLnZhbCh6aHVhbmdmZW5nKTtcclxuICAgICAgICAkKCdzZWxlY3RbbmFtZT1cIm1lbmZlbmdcIl0nKS52YWwobWVuZmVuZyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYW9wYWkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImJhb3BhaVwiXScpLmVxKGkpLnZhbChiYW9wYWlbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwiaG9uZ3BhaVwiXScpLnByb3AoJ2NoZWNrZWQnLCBob25ncGFpKTtcclxuXHJcbiAgICAgICAgc3VibWl0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGFpc3RyXCJdJykudmFsKCdtMTIzcDEyMzQ3ODlzMzM4czgnKS5mb2N1cygpO1xyXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJiYW9wYWlcIl0nKS5lcSgwKS52YWwoJ3MzJyk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCIvKlxyXG4gKiAgZmFkZWluLmpzXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIHNob3c6IG5vZGUgPT4gbm9kZS5yZW1vdmVDbGFzcygnaGlkZSBmYWRlb3V0JyksXHJcblxyXG4gICAgaGlkZTogbm9kZSA9PiBub2RlLmFkZENsYXNzKCdoaWRlIGZhZGVvdXQnKSxcclxuXHJcbiAgICBmYWRlSW46IG5vZGUgPT57XHJcbiAgICAgICAgbm9kZS5hZGRDbGFzcygnaGlkZSBmYWRlb3V0Jyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICBub2RlLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PlxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2ZmKCd0cmFuc2l0aW9uZW5kJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYWRlb3V0JyksIDApXHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgZmFkZU91dDogbm9kZSA9PlxyXG4gICAgICAgIG5vZGUub24oJ3RyYW5zaXRpb25lbmQnLCAoKT0+XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5vZmYoJ3RyYW5zaXRpb25lbmQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2hpZGUnKSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWRlb3V0JyksXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==