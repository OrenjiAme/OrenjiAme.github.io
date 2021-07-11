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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/paili.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/paili.js":
/*!*************************!*\
  !*** ./src/js/paili.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 *
 *  paili.js
 *
 *  Copyright(C) 2017 Satoshi Kobayashi
 *  Released under the MIT license
 *  https://github.com/kobalab/Majiang/blob/master/LICENSE
 */



const model = {};
const view  = {};

function make_shan(shan, paistr) {
    for (let suitstr of paistr.match(/([mpsz][\d\+\=\-]+)/g)) {
        let s = suitstr[0];
        for (let n of suitstr.match(/\d/g)) {
            let i = shan._pai.indexOf(s+n);
            if (i < 0) continue;
            shan._pai.splice(i, 1);
        }
    }
}

function qipai(paistr) {

    if (paistr) history.replaceState('', '', `#${paistr}`);

    model.shan = new Majiang.Shan({m:1,p:1,s:1});

    if (paistr) {
        model.shoupai = Majiang.Shoupai.fromString(paistr);
        make_shan(model.shan, model.shoupai.toString());
    } else {
        let pai = [];
        while (pai.length < 13) { pai.push(model.shan.zimo()) }
        model.shoupai = new Majiang.Shoupai(pai);
    }

    view.shoupai  = new Majiang.View.Shoupai($('.shoupai'), model.shoupai);
    view.shoupai.redraw(true);

    while (model.shan.paishu() > 18) { model.shan.zimo() }

    model.he = new Majiang.He();
    view.he  = new Majiang.View.He($('.he'), model.he);
    view.he.redraw(true);

    $('.paili').empty();

    if (! model.shoupai._zimo) setTimeout(zimo, 0);
    else                       paili();

    $('form input[name="paistr"]').val(model.shoupai.toString());
}

function set_handler() {

    let timeStamp = null;

    for (let p of model.shoupai.get_dapai()) {
        let selector = `.shoupai .bingpai > .pai[data-pai="${p}"]`;
        $(selector).on('mouseover', function(event){
            timeStamp = event.timeStamp;
            $(this).addClass('selected')
                   .off('click')
                   .on('click', function(event){
                       if (event.timeStamp == timeStamp) return false;
                       $(this).addClass('dapai');
                       dapai(p);
                       return false;
                   });
            return false;
        }).on('mouseout', function(){
            $(this).removeClass('selected')
                   .off('click');
            return false;
        });
        selector = `.shoupai .bingpai .zimo .pai[data-pai="${p}"]`;
        $(selector).on('mouseover', function(event){
            timeStamp = event.timeStamp;
            $(this).addClass('selected')
                   .off('click')
                   .on('click', function(event){
                       if (event.timeStamp == timeStamp) return false;
                       $(this).addClass('dapai');
                       dapai(p+'_');
                       return false;
                   });
            return false;
        }).on('mouseout', function(){
            $(this).removeClass('selected')
                   .off('click');
            return false;
        });
    }
}

function zimo() {
    view.he.redraw();
    view.shoupai.redraw();
    if (model.shan.paishu() == 0) {
        $('.status').text('流局……');
        return;
    }
    model.shoupai.zimo(model.shan.zimo());
    view.shoupai.redraw();
    paili();
}

function dapai(p) {

    Majiang.View.audio('dapai').play();

    $('.shoupai .bingpai .pai').off('click')
                               .off('mouseover')
                               .off('mouseout');

    if (! model.shoupai.lizhi()
        && Majiang.Util.xiangting(model.shoupai) == 0) p = p +'*';

    model.shoupai.dapai(p);
    view.shoupai.dapai(p);

    model.he.dapai(p);
    view.he.dapai(p);

    $('.paili').empty();

    setTimeout(zimo, 500);
}

function paili() {

    let n_xiangting = Majiang.Util.xiangting(model.shoupai);
    if      (n_xiangting == -1) $('.status').text('和了！！');
    else if (n_xiangting ==  0) $('.status').text('聴牌！');
    else                        $('.status').text(`${n_xiangting}向聴`);

    if (n_xiangting == 0 && ! model.shoupai.lizhi()) {
        Majiang.View.audio('lizhi').play();
    }
    else if (n_xiangting == -1) {
        Majiang.View.audio('zimo').play();
        return;
    }

    let dapai = [];
    for (let p of model.shoupai.get_dapai()) {

        let new_shoupai = model.shoupai.clone().dapai(p);
        if (Majiang.Util.xiangting(new_shoupai) > n_xiangting) continue;

        p = p.replace(/0/,'5');
        if (dapai.length && dapai[dapai.length - 1].p == p) continue;

        let tingpai   = Majiang.Util.tingpai(new_shoupai);
        let n_tingpai = tingpai.length
                          ? tingpai.map(
                                p => 4 - model.shoupai._bingpai[p[0]][p[1]]
                            ).reduce((x,y)=>x+y)
                          : 0;

        dapai.push({ p: p, tingpai: tingpai, n_tingpai: n_tingpai });
    }

    const compare = (a, b) => {
        if (a.n_tingpai == b.n_tingpai) {
            if (a.tingpai.length == b.tingpai.length) {
                return (a.p >  b.p) ?  1
                     : (a.p <  b.p) ? -1
                     :                 0;
            }
            else return b.tingpai.length - a.tingpai.length;
        }
        else return b.n_tingpai - a.n_tingpai;
    };
    for (let dp of dapai.sort(compare)) {
        let html = '<div>打: '
                 + $('<span>').append(Majiang.View.pai(dp.p)).html()
                 + ' 摸: '
                 + dp.tingpai.map(
                     p => $('<span>').append(Majiang.View.pai(p)).html()
                 ).join('')
                 + ` (${dp.n_tingpai}枚)</div>`;
        $('.paili').append($(html));
    }

    set_handler();
}

$(function(){

    $('.version').text('ver. ' + Majiang.VERSION);

    $('form input[type="button"]').on('click', function(event){
        qipai();
        return false;
    });
    $('form').on('submit', function(){
        qipai($('form input[name="paistr"]').val());
        return false;
    })
    $('form').on('reset', function(){
        $('input[name="paistr"]').focus();
    });

    let paistr = location.hash.replace(/^#/,'');
    qipai(paistr);
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BhaWxpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlEQUFpRCxPQUFPOztBQUV4RCxtQ0FBbUMsWUFBWTs7QUFFL0M7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSw2REFBNkQsRUFBRTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDZEQUE2RCxFQUFFO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxZQUFZOztBQUVqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLCtDQUErQztBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsYUFBYTtBQUNyQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJwYWlsaS0xLjUuNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL3BhaWxpLmpzXCIpO1xuIiwiLyohXHJcbiAqXHJcbiAqICBwYWlsaS5qc1xyXG4gKlxyXG4gKiAgQ29weXJpZ2h0KEMpIDIwMTcgU2F0b3NoaSBLb2JheWFzaGlcclxuICogIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2tvYmFsYWIvTWFqaWFuZy9ibG9iL21hc3Rlci9MSUNFTlNFXHJcbiAqL1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5jb25zdCBtb2RlbCA9IHt9O1xyXG5jb25zdCB2aWV3ICA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWFrZV9zaGFuKHNoYW4sIHBhaXN0cikge1xyXG4gICAgZm9yIChsZXQgc3VpdHN0ciBvZiBwYWlzdHIubWF0Y2goLyhbbXBzel1bXFxkXFwrXFw9XFwtXSspL2cpKSB7XHJcbiAgICAgICAgbGV0IHMgPSBzdWl0c3RyWzBdO1xyXG4gICAgICAgIGZvciAobGV0IG4gb2Ygc3VpdHN0ci5tYXRjaCgvXFxkL2cpKSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gc2hhbi5fcGFpLmluZGV4T2YocytuKTtcclxuICAgICAgICAgICAgaWYgKGkgPCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgc2hhbi5fcGFpLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHFpcGFpKHBhaXN0cikge1xyXG5cclxuICAgIGlmIChwYWlzdHIpIGhpc3RvcnkucmVwbGFjZVN0YXRlKCcnLCAnJywgYCMke3BhaXN0cn1gKTtcclxuXHJcbiAgICBtb2RlbC5zaGFuID0gbmV3IE1hamlhbmcuU2hhbih7bToxLHA6MSxzOjF9KTtcclxuXHJcbiAgICBpZiAocGFpc3RyKSB7XHJcbiAgICAgICAgbW9kZWwuc2hvdXBhaSA9IE1hamlhbmcuU2hvdXBhaS5mcm9tU3RyaW5nKHBhaXN0cik7XHJcbiAgICAgICAgbWFrZV9zaGFuKG1vZGVsLnNoYW4sIG1vZGVsLnNob3VwYWkudG9TdHJpbmcoKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBwYWkgPSBbXTtcclxuICAgICAgICB3aGlsZSAocGFpLmxlbmd0aCA8IDEzKSB7IHBhaS5wdXNoKG1vZGVsLnNoYW4uemltbygpKSB9XHJcbiAgICAgICAgbW9kZWwuc2hvdXBhaSA9IG5ldyBNYWppYW5nLlNob3VwYWkocGFpKTtcclxuICAgIH1cclxuXHJcbiAgICB2aWV3LnNob3VwYWkgID0gbmV3IE1hamlhbmcuVmlldy5TaG91cGFpKCQoJy5zaG91cGFpJyksIG1vZGVsLnNob3VwYWkpO1xyXG4gICAgdmlldy5zaG91cGFpLnJlZHJhdyh0cnVlKTtcclxuXHJcbiAgICB3aGlsZSAobW9kZWwuc2hhbi5wYWlzaHUoKSA+IDE4KSB7IG1vZGVsLnNoYW4uemltbygpIH1cclxuXHJcbiAgICBtb2RlbC5oZSA9IG5ldyBNYWppYW5nLkhlKCk7XHJcbiAgICB2aWV3LmhlICA9IG5ldyBNYWppYW5nLlZpZXcuSGUoJCgnLmhlJyksIG1vZGVsLmhlKTtcclxuICAgIHZpZXcuaGUucmVkcmF3KHRydWUpO1xyXG5cclxuICAgICQoJy5wYWlsaScpLmVtcHR5KCk7XHJcblxyXG4gICAgaWYgKCEgbW9kZWwuc2hvdXBhaS5femltbykgc2V0VGltZW91dCh6aW1vLCAwKTtcclxuICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgIHBhaWxpKCk7XHJcblxyXG4gICAgJCgnZm9ybSBpbnB1dFtuYW1lPVwicGFpc3RyXCJdJykudmFsKG1vZGVsLnNob3VwYWkudG9TdHJpbmcoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldF9oYW5kbGVyKCkge1xyXG5cclxuICAgIGxldCB0aW1lU3RhbXAgPSBudWxsO1xyXG5cclxuICAgIGZvciAobGV0IHAgb2YgbW9kZWwuc2hvdXBhaS5nZXRfZGFwYWkoKSkge1xyXG4gICAgICAgIGxldCBzZWxlY3RvciA9IGAuc2hvdXBhaSAuYmluZ3BhaSA+IC5wYWlbZGF0YS1wYWk9XCIke3B9XCJdYDtcclxuICAgICAgICAkKHNlbGVjdG9yKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICB0aW1lU3RhbXAgPSBldmVudC50aW1lU3RhbXA7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRpbWVTdGFtcCA9PSB0aW1lU3RhbXApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkYXBhaScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGRhcGFpKHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSkub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgLm9mZignY2xpY2snKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGVjdG9yID0gYC5zaG91cGFpIC5iaW5ncGFpIC56aW1vIC5wYWlbZGF0YS1wYWk9XCIke3B9XCJdYDtcclxuICAgICAgICAkKHNlbGVjdG9yKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICB0aW1lU3RhbXAgPSBldmVudC50aW1lU3RhbXA7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrJylcclxuICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRpbWVTdGFtcCA9PSB0aW1lU3RhbXApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkYXBhaScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGRhcGFpKHArJ18nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gemltbygpIHtcclxuICAgIHZpZXcuaGUucmVkcmF3KCk7XHJcbiAgICB2aWV3LnNob3VwYWkucmVkcmF3KCk7XHJcbiAgICBpZiAobW9kZWwuc2hhbi5wYWlzaHUoKSA9PSAwKSB7XHJcbiAgICAgICAgJCgnLnN0YXR1cycpLnRleHQoJ+a1geWxgOKApuKApicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIG1vZGVsLnNob3VwYWkuemltbyhtb2RlbC5zaGFuLnppbW8oKSk7XHJcbiAgICB2aWV3LnNob3VwYWkucmVkcmF3KCk7XHJcbiAgICBwYWlsaSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkYXBhaShwKSB7XHJcblxyXG4gICAgTWFqaWFuZy5WaWV3LmF1ZGlvKCdkYXBhaScpLnBsYXkoKTtcclxuXHJcbiAgICAkKCcuc2hvdXBhaSAuYmluZ3BhaSAucGFpJykub2ZmKCdjbGljaycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2ZmKCdtb3VzZW92ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9mZignbW91c2VvdXQnKTtcclxuXHJcbiAgICBpZiAoISBtb2RlbC5zaG91cGFpLmxpemhpKClcclxuICAgICAgICAmJiBNYWppYW5nLlV0aWwueGlhbmd0aW5nKG1vZGVsLnNob3VwYWkpID09IDApIHAgPSBwICsnKic7XHJcblxyXG4gICAgbW9kZWwuc2hvdXBhaS5kYXBhaShwKTtcclxuICAgIHZpZXcuc2hvdXBhaS5kYXBhaShwKTtcclxuXHJcbiAgICBtb2RlbC5oZS5kYXBhaShwKTtcclxuICAgIHZpZXcuaGUuZGFwYWkocCk7XHJcblxyXG4gICAgJCgnLnBhaWxpJykuZW1wdHkoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KHppbW8sIDUwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhaWxpKCkge1xyXG5cclxuICAgIGxldCBuX3hpYW5ndGluZyA9IE1hamlhbmcuVXRpbC54aWFuZ3RpbmcobW9kZWwuc2hvdXBhaSk7XHJcbiAgICBpZiAgICAgIChuX3hpYW5ndGluZyA9PSAtMSkgJCgnLnN0YXR1cycpLnRleHQoJ+WSjOS6hu+8ge+8gScpO1xyXG4gICAgZWxzZSBpZiAobl94aWFuZ3RpbmcgPT0gIDApICQoJy5zdGF0dXMnKS50ZXh0KCfogbTniYzvvIEnKTtcclxuICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAkKCcuc3RhdHVzJykudGV4dChgJHtuX3hpYW5ndGluZ33lkJHogbRgKTtcclxuXHJcbiAgICBpZiAobl94aWFuZ3RpbmcgPT0gMCAmJiAhIG1vZGVsLnNob3VwYWkubGl6aGkoKSkge1xyXG4gICAgICAgIE1hamlhbmcuVmlldy5hdWRpbygnbGl6aGknKS5wbGF5KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChuX3hpYW5ndGluZyA9PSAtMSkge1xyXG4gICAgICAgIE1hamlhbmcuVmlldy5hdWRpbygnemltbycpLnBsYXkoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhcGFpID0gW107XHJcbiAgICBmb3IgKGxldCBwIG9mIG1vZGVsLnNob3VwYWkuZ2V0X2RhcGFpKCkpIHtcclxuXHJcbiAgICAgICAgbGV0IG5ld19zaG91cGFpID0gbW9kZWwuc2hvdXBhaS5jbG9uZSgpLmRhcGFpKHApO1xyXG4gICAgICAgIGlmIChNYWppYW5nLlV0aWwueGlhbmd0aW5nKG5ld19zaG91cGFpKSA+IG5feGlhbmd0aW5nKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgcCA9IHAucmVwbGFjZSgvMC8sJzUnKTtcclxuICAgICAgICBpZiAoZGFwYWkubGVuZ3RoICYmIGRhcGFpW2RhcGFpLmxlbmd0aCAtIDFdLnAgPT0gcCkgY29udGludWU7XHJcblxyXG4gICAgICAgIGxldCB0aW5ncGFpICAgPSBNYWppYW5nLlV0aWwudGluZ3BhaShuZXdfc2hvdXBhaSk7XHJcbiAgICAgICAgbGV0IG5fdGluZ3BhaSA9IHRpbmdwYWkubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aW5ncGFpLm1hcChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwID0+IDQgLSBtb2RlbC5zaG91cGFpLl9iaW5ncGFpW3BbMF1dW3BbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnJlZHVjZSgoeCx5KT0+eCt5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcclxuXHJcbiAgICAgICAgZGFwYWkucHVzaCh7IHA6IHAsIHRpbmdwYWk6IHRpbmdwYWksIG5fdGluZ3BhaTogbl90aW5ncGFpIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbXBhcmUgPSAoYSwgYikgPT4ge1xyXG4gICAgICAgIGlmIChhLm5fdGluZ3BhaSA9PSBiLm5fdGluZ3BhaSkge1xyXG4gICAgICAgICAgICBpZiAoYS50aW5ncGFpLmxlbmd0aCA9PSBiLnRpbmdwYWkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGEucCA+ICBiLnApID8gIDFcclxuICAgICAgICAgICAgICAgICAgICAgOiAoYS5wIDwgIGIucCkgPyAtMVxyXG4gICAgICAgICAgICAgICAgICAgICA6ICAgICAgICAgICAgICAgICAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIGIudGluZ3BhaS5sZW5ndGggLSBhLnRpbmdwYWkubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBiLm5fdGluZ3BhaSAtIGEubl90aW5ncGFpO1xyXG4gICAgfTtcclxuICAgIGZvciAobGV0IGRwIG9mIGRhcGFpLnNvcnQoY29tcGFyZSkpIHtcclxuICAgICAgICBsZXQgaHRtbCA9ICc8ZGl2PuaJkzogJ1xyXG4gICAgICAgICAgICAgICAgICsgJCgnPHNwYW4+JykuYXBwZW5kKE1hamlhbmcuVmlldy5wYWkoZHAucCkpLmh0bWwoKVxyXG4gICAgICAgICAgICAgICAgICsgJyDmkbg6ICdcclxuICAgICAgICAgICAgICAgICArIGRwLnRpbmdwYWkubWFwKFxyXG4gICAgICAgICAgICAgICAgICAgICBwID0+ICQoJzxzcGFuPicpLmFwcGVuZChNYWppYW5nLlZpZXcucGFpKHApKS5odG1sKClcclxuICAgICAgICAgICAgICAgICApLmpvaW4oJycpXHJcbiAgICAgICAgICAgICAgICAgKyBgICgke2RwLm5fdGluZ3BhaX3mnpopPC9kaXY+YDtcclxuICAgICAgICAkKCcucGFpbGknKS5hcHBlbmQoJChodG1sKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X2hhbmRsZXIoKTtcclxufVxyXG5cclxuJChmdW5jdGlvbigpe1xyXG5cclxuICAgICQoJy52ZXJzaW9uJykudGV4dCgndmVyLiAnICsgTWFqaWFuZy5WRVJTSU9OKTtcclxuXHJcbiAgICAkKCdmb3JtIGlucHV0W3R5cGU9XCJidXR0b25cIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgcWlwYWkoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICBxaXBhaSgkKCdmb3JtIGlucHV0W25hbWU9XCJwYWlzdHJcIl0nKS52YWwoKSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSlcclxuICAgICQoJ2Zvcm0nKS5vbigncmVzZXQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYWlzdHJcIl0nKS5mb2N1cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBhaXN0ciA9IGxvY2F0aW9uLmhhc2gucmVwbGFjZSgvXiMvLCcnKTtcclxuICAgIHFpcGFpKHBhaXN0cik7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9