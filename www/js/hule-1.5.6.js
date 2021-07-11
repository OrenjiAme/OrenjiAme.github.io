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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/hule.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/hule.js":
/*!************************!*\
  !*** ./src/js/hule.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 *
 *  hule.js
 *
 *  Copyright(C) 2017 Satoshi Kobayashi
 *  Released under the MIT license
 *  https://github.com/kobalab/Majiang/blob/master/LICENSE
 */


$(function(){

    $('.version').text('ver. ' + Majiang.VERSION);

    $('form').on('submit', function(){

        let paistr = $('form input[name="paistr"]').val();
        if (! paistr) {
            $('.huledialog').addClass('hide').addClass('fadeout');
            return false;
        }
        let shoupai = Majiang.Shoupai.fromString(paistr);
        $('input[name="paistr"]').val(shoupai.toString());

        let rongpai;
        if ($('input[name="zimo"]:checked').val() == 0) {
            if (shoupai._zimo && Majiang.Shoupai.valid_pai(shoupai._zimo))
                    rongpai = shoupai._zimo + '=';
        }

        if (! shoupai.menqian()) {
            $('input[name="lizhi"]').prop('checked', false);
            $('input[name="fubaopai"]').parent().addClass('hide');
            $('input[name="yifa"]').prop('checked', false)
                                   .prop('disabled', true);
            $('input[name="tianhu"]').prop('checked', false);
        }
        if (! shoupai._fulou
                .find(m=>m.replace(/0/g,'5').match(/^[mpsz](\d)\1\1.*\1.*$/)))
        {
            $('input[name="lingshang"]').prop('checked', false);
        }

        let baopai   = $.makeArray($('input[name="baopai"]'))
                            .map(p=>$(p).val()).filter(p=>p);
        let fubaopai = $.makeArray($('input[name="fubaopai"]'))
                            .map(p=>$(p).val()).filter(p=>p);

        let lizhi = + $('input[name="lizhi"]:checked').val() || 0;
        let param = {
            zhuangfeng: + $('select[name="zhuangfeng"] option:selected').val(),
            menfeng:    + $('select[name="menfeng"] option:selected').val(),
            hupai: {
                lizhi:      lizhi,
                yifa:       $('input[name="yifa"]').prop('checked'),
                qianggang:  $('input[name="qianggang"]').prop('checked'),
                lingshang:  $('input[name="lingshang"]').prop('checked'),
                haidi:      ! $('input[name="haidi"]').prop('checked') ? 0
                                : ! rongpai                            ? 1
                                :                                        2,
                tianhu:     + $('input[name="tianhu"]:checked').val() || 0,
            },
            baopai:     baopai,
            fubaopai:   lizhi ? fubaopai : null,
            jicun:      { changbang: 0, lizhibang: 0 }
        };

        let hule = Majiang.Util.hule(shoupai, rongpai, param);
        let info = {
            shoupai:  shoupai,
            hule:     hule,
            menfeng:  param.menfeng,
            baopai:   param.baopai,
            fubaopai: param.fubaopai,
        };

        let chang = {
            player:     ['私','下家','対面','上家'],
            qijia:      0,
            zhuangfeng: param.zhuangfeng,
            jushu:      (4 - param.menfeng) % 4,
            changbang:  param.jicun.changbang,
            lizhibang:  param.jicun.lizhibang,
            defen:      [ 25000, 25000, 25000, 25000 ]
        };

        new Majiang.View.HuleDialog($('.huledialog'), chang).hule(info);

        let fragment = '#' + [
                        shoupai.toString(),
                        baopai.join(','),
                        fubaopai.join(','),
                        $('input[name="zimo"]:checked').val(),
                        $('select[name="zhuangfeng"]').val(),
                        $('select[name="menfeng"]').val(),
                        $('input[name="lizhi"]:checked').val(),
                        + $('input[name="yifa"]').prop('checked'),
                        + $('input[name="haidi"]').prop('checked'),
                        + $('input[name="lingshang"]').prop('checked'),
                        + $('input[name="qianggang"]').prop('checked'),
                        + $('input[name="tianhu"]:checked').val() || 0
                     ].join('/');
        history.replaceState('', '', fragment);

        return false;
    });
    $('form').on('reset', function(){
        $('input[name="fubaopai"]').parent().addClass('hide');
        $('form input[name="paistr"]').focus();
        $('.huledialog').addClass('hide').addClass('fadeout');
    });

    $('input[name="zimo"]').on('change', function(){
        if ($(this, ':checked').val() == 1) {
            $('input[name="qianggang"]').prop('checked', false);
        }
        else {
            $('input[name="lingshang"]').prop('checked', false);
            $('input[name="tianhu"]').prop('checked', false);
        }
    });

    $('select[name="menfeng"]').on('change', function(){
        if ($(this, ':selected').val() == 0) {
            $('input[name="tianhu"]').next().text('天和');
            $('input[name="tianhu"]').val(1);
        }
        else {
            $('input[name="tianhu"]').next().text('地和');
            $('input[name="tianhu"]').val(2);
        }
    });

    $('input[name="lizhi"]').on('change', function(){
        if ($(this).prop('checked')) {
            let tggle = $(this).val() == 1 ? 2 : 1;
            $(`input[name="lizhi"][value="${tggle}"]`).prop('checked', false);
            $('input[name="fubaopai"]').parent().removeClass('hide');
            $('input[name="yifa"]').prop('disabled', false);
            $('input[name="tianhu"]').prop('checked', false);
        }
        else {
            $('input[name="fubaopai"]').parent().addClass('hide');
            $('input[name="yifa"]').prop('checked', false)
                                   .prop('disabled', true);
        }
    });
    $('input[name="yifa"]').on('change', function(){
        if ($(this).prop('checked'))
            $('input[name="lingshang"]').prop('checked', false);
    });

    $('input[name="haidi"]').on('change', function(){
        if ($(this).prop('checked')) {
            $('input[name="lingshang"]').prop('checked', false);
            $('input[name="qianggang"]').prop('checked', false);
            $('input[name="tianhu"]').prop('checked', false);
        }
    });
    $('input[name="lingshang"]').on('change', function(){
        if ($(this).prop('checked')) {
            $('input[name="yifa"]').prop('checked', false);
            $('input[name="haidi"]').prop('checked', false);
            $('input[name="qianggang"]').prop('checked', false);
            $('input[name="tianhu"]').prop('checked', false);
            $('input[name="zimo"][value="1"]').click();
        }
    });
    $('input[name="qianggang"]').on('change', function(){
        if ($(this).prop('checked')) {
            $('input[name="haidi"]').prop('checked', false);
            $('input[name="lingshang"]').prop('checked', false);
            $('input[name="tianhu"]').prop('checked', false);
            $('input[name="zimo"][value="0"]').click();
        }
    });

    $('input[name="tianhu"]').on('change', function(){
        if ($(this).prop('checked')) {
            $('input[name="lizhi"]').prop('checked', false);
            $('input[name="fubaopai"]').parent().addClass('hide');
            $('input[name="yifa"]').prop('checked', false)
                                   .prop('disabled', true);
            $('input[name="haidi"]').prop('checked', false);
            $('input[name="lingshang"]').prop('checked', false);
            $('input[name="qianggang"]').prop('checked', false);
            $('input[name="zimo"][value="1"]').click();
        }
    });

    let fragment = location.hash.replace(/^#/,'');
    if (fragment) {

        let [paistr, baopai, fubaopai, zimo, zhuangfeng, menfeng,
             lizhi, yifa, haidi, lingshang, qianggang, tianhu]
                = fragment.split(/\//);
        baopai   = (baopai   || '').split(/,/);
        fubaopai = (fubaopai || '').split(/,/);

        $('form input[name="paistr"]').val(paistr);
        for (let i = 0; i < baopai.length; i++) {
            $('input[name="baopai"]').eq(i).val(baopai[i]);
        }
        for (let i = 0; i < fubaopai.length; i++) {
            $('input[name="fubaopai"]').eq(i).val(fubaopai[i]);
        }
        $(`input[name="zimo"][value="${zimo}"]`).click();
        $('select[name="zhuangfeng"]').val(zhuangfeng || 0);
        $('select[name="menfeng"]').val(menfeng || 0);
        $(`input[name="lizhi"][value="${lizhi}"]`).click();
        if (+yifa)      $('input[name="yifa"]').click();
        if (+haidi)     $('input[name="haidi"]').click();
        if (+lingshang) $('input[name="lingshang"]').click();
        if (+qianggang) $('input[name="qianggang"]').click();
        if (+tianhu)    $('input[name="tianhu"]').click();

        $('form').submit();
    }
    else {
        $('form input[name="paistr"]').focus();
        $('form input[name="paistr"]').val('m123p123z1z1,s1-23,z222=');
        $('form input[name="baopai"]').eq(0).val('z1');
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2h1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7O0FBRWI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE1BQU07QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7QUFDQSx3Q0FBd0MsTUFBTTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJodWxlLTEuNS42LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvaHVsZS5qc1wiKTtcbiIsIi8qIVxyXG4gKlxyXG4gKiAgaHVsZS5qc1xyXG4gKlxyXG4gKiAgQ29weXJpZ2h0KEMpIDIwMTcgU2F0b3NoaSBLb2JheWFzaGlcclxuICogIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2tvYmFsYWIvTWFqaWFuZy9ibG9iL21hc3Rlci9MSUNFTlNFXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAkKCcudmVyc2lvbicpLnRleHQoJ3Zlci4gJyArIE1hamlhbmcuVkVSU0lPTik7XHJcblxyXG4gICAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBsZXQgcGFpc3RyID0gJCgnZm9ybSBpbnB1dFtuYW1lPVwicGFpc3RyXCJdJykudmFsKCk7XHJcbiAgICAgICAgaWYgKCEgcGFpc3RyKSB7XHJcbiAgICAgICAgICAgICQoJy5odWxlZGlhbG9nJykuYWRkQ2xhc3MoJ2hpZGUnKS5hZGRDbGFzcygnZmFkZW91dCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzaG91cGFpID0gTWFqaWFuZy5TaG91cGFpLmZyb21TdHJpbmcocGFpc3RyKTtcclxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGFpc3RyXCJdJykudmFsKHNob3VwYWkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgIGxldCByb25ncGFpO1xyXG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiemltb1wiXTpjaGVja2VkJykudmFsKCkgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoc2hvdXBhaS5femltbyAmJiBNYWppYW5nLlNob3VwYWkudmFsaWRfcGFpKHNob3VwYWkuX3ppbW8pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJvbmdwYWkgPSBzaG91cGFpLl96aW1vICsgJz0nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCEgc2hvdXBhaS5tZW5xaWFuKCkpIHtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImxpemhpXCJdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImZ1YmFvcGFpXCJdJykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInlpZmFcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ0aWFuaHVcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISBzaG91cGFpLl9mdWxvdVxyXG4gICAgICAgICAgICAgICAgLmZpbmQobT0+bS5yZXBsYWNlKC8wL2csJzUnKS5tYXRjaCgvXlttcHN6XShcXGQpXFwxXFwxLipcXDEuKiQvKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwibGluZ3NoYW5nXCJdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBiYW9wYWkgICA9ICQubWFrZUFycmF5KCQoJ2lucHV0W25hbWU9XCJiYW9wYWlcIl0nKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAocD0+JChwKS52YWwoKSkuZmlsdGVyKHA9PnApO1xyXG4gICAgICAgIGxldCBmdWJhb3BhaSA9ICQubWFrZUFycmF5KCQoJ2lucHV0W25hbWU9XCJmdWJhb3BhaVwiXScpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChwPT4kKHApLnZhbCgpKS5maWx0ZXIocD0+cCk7XHJcblxyXG4gICAgICAgIGxldCBsaXpoaSA9ICsgJCgnaW5wdXRbbmFtZT1cImxpemhpXCJdOmNoZWNrZWQnKS52YWwoKSB8fCAwO1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgemh1YW5nZmVuZzogKyAkKCdzZWxlY3RbbmFtZT1cInpodWFuZ2ZlbmdcIl0gb3B0aW9uOnNlbGVjdGVkJykudmFsKCksXHJcbiAgICAgICAgICAgIG1lbmZlbmc6ICAgICsgJCgnc2VsZWN0W25hbWU9XCJtZW5mZW5nXCJdIG9wdGlvbjpzZWxlY3RlZCcpLnZhbCgpLFxyXG4gICAgICAgICAgICBodXBhaToge1xyXG4gICAgICAgICAgICAgICAgbGl6aGk6ICAgICAgbGl6aGksXHJcbiAgICAgICAgICAgICAgICB5aWZhOiAgICAgICAkKCdpbnB1dFtuYW1lPVwieWlmYVwiXScpLnByb3AoJ2NoZWNrZWQnKSxcclxuICAgICAgICAgICAgICAgIHFpYW5nZ2FuZzogICQoJ2lucHV0W25hbWU9XCJxaWFuZ2dhbmdcIl0nKS5wcm9wKCdjaGVja2VkJyksXHJcbiAgICAgICAgICAgICAgICBsaW5nc2hhbmc6ICAkKCdpbnB1dFtuYW1lPVwibGluZ3NoYW5nXCJdJykucHJvcCgnY2hlY2tlZCcpLFxyXG4gICAgICAgICAgICAgICAgaGFpZGk6ICAgICAgISAkKCdpbnB1dFtuYW1lPVwiaGFpZGlcIl0nKS5wcm9wKCdjaGVja2VkJykgPyAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAhIHJvbmdwYWkgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyLFxyXG4gICAgICAgICAgICAgICAgdGlhbmh1OiAgICAgKyAkKCdpbnB1dFtuYW1lPVwidGlhbmh1XCJdOmNoZWNrZWQnKS52YWwoKSB8fCAwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiYW9wYWk6ICAgICBiYW9wYWksXHJcbiAgICAgICAgICAgIGZ1YmFvcGFpOiAgIGxpemhpID8gZnViYW9wYWkgOiBudWxsLFxyXG4gICAgICAgICAgICBqaWN1bjogICAgICB7IGNoYW5nYmFuZzogMCwgbGl6aGliYW5nOiAwIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgaHVsZSA9IE1hamlhbmcuVXRpbC5odWxlKHNob3VwYWksIHJvbmdwYWksIHBhcmFtKTtcclxuICAgICAgICBsZXQgaW5mbyA9IHtcclxuICAgICAgICAgICAgc2hvdXBhaTogIHNob3VwYWksXHJcbiAgICAgICAgICAgIGh1bGU6ICAgICBodWxlLFxyXG4gICAgICAgICAgICBtZW5mZW5nOiAgcGFyYW0ubWVuZmVuZyxcclxuICAgICAgICAgICAgYmFvcGFpOiAgIHBhcmFtLmJhb3BhaSxcclxuICAgICAgICAgICAgZnViYW9wYWk6IHBhcmFtLmZ1YmFvcGFpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBjaGFuZyA9IHtcclxuICAgICAgICAgICAgcGxheWVyOiAgICAgWyfnp4EnLCfkuIvlrrYnLCflr77pnaInLCfkuIrlrrYnXSxcclxuICAgICAgICAgICAgcWlqaWE6ICAgICAgMCxcclxuICAgICAgICAgICAgemh1YW5nZmVuZzogcGFyYW0uemh1YW5nZmVuZyxcclxuICAgICAgICAgICAganVzaHU6ICAgICAgKDQgLSBwYXJhbS5tZW5mZW5nKSAlIDQsXHJcbiAgICAgICAgICAgIGNoYW5nYmFuZzogIHBhcmFtLmppY3VuLmNoYW5nYmFuZyxcclxuICAgICAgICAgICAgbGl6aGliYW5nOiAgcGFyYW0uamljdW4ubGl6aGliYW5nLFxyXG4gICAgICAgICAgICBkZWZlbjogICAgICBbIDI1MDAwLCAyNTAwMCwgMjUwMDAsIDI1MDAwIF1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBuZXcgTWFqaWFuZy5WaWV3Lkh1bGVEaWFsb2coJCgnLmh1bGVkaWFsb2cnKSwgY2hhbmcpLmh1bGUoaW5mbyk7XHJcblxyXG4gICAgICAgIGxldCBmcmFnbWVudCA9ICcjJyArIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdXBhaS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYW9wYWkuam9pbignLCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWJhb3BhaS5qb2luKCcsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ6aW1vXCJdOmNoZWNrZWQnKS52YWwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnc2VsZWN0W25hbWU9XCJ6aHVhbmdmZW5nXCJdJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ3NlbGVjdFtuYW1lPVwibWVuZmVuZ1wiXScpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwibGl6aGlcIl06Y2hlY2tlZCcpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICQoJ2lucHV0W25hbWU9XCJ5aWZhXCJdJykucHJvcCgnY2hlY2tlZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICQoJ2lucHV0W25hbWU9XCJoYWlkaVwiXScpLnByb3AoJ2NoZWNrZWQnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAkKCdpbnB1dFtuYW1lPVwibGluZ3NoYW5nXCJdJykucHJvcCgnY2hlY2tlZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICArICQoJ2lucHV0W25hbWU9XCJxaWFuZ2dhbmdcIl0nKS5wcm9wKCdjaGVja2VkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJCgnaW5wdXRbbmFtZT1cInRpYW5odVwiXTpjaGVja2VkJykudmFsKCkgfHwgMFxyXG4gICAgICAgICAgICAgICAgICAgICBdLmpvaW4oJy8nKTtcclxuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSgnJywgJycsIGZyYWdtZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAkKCdmb3JtJykub24oJ3Jlc2V0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwiZnViYW9wYWlcIl0nKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICQoJ2Zvcm0gaW5wdXRbbmFtZT1cInBhaXN0clwiXScpLmZvY3VzKCk7XHJcbiAgICAgICAgJCgnLmh1bGVkaWFsb2cnKS5hZGRDbGFzcygnaGlkZScpLmFkZENsYXNzKCdmYWRlb3V0Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPVwiemltb1wiXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmICgkKHRoaXMsICc6Y2hlY2tlZCcpLnZhbCgpID09IDEpIHtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInFpYW5nZ2FuZ1wiXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwibGluZ3NoYW5nXCJdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInRpYW5odVwiXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnc2VsZWN0W25hbWU9XCJtZW5mZW5nXCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYgKCQodGhpcywgJzpzZWxlY3RlZCcpLnZhbCgpID09IDApIHtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInRpYW5odVwiXScpLm5leHQoKS50ZXh0KCflpKnlkownKTtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInRpYW5odVwiXScpLnZhbCgxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ0aWFuaHVcIl0nKS5uZXh0KCkudGV4dCgn5Zyw5ZKMJyk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ0aWFuaHVcIl0nKS52YWwoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1cImxpemhpXCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgIGxldCB0Z2dsZSA9ICQodGhpcykudmFsKCkgPT0gMSA/IDIgOiAxO1xyXG4gICAgICAgICAgICAkKGBpbnB1dFtuYW1lPVwibGl6aGlcIl1bdmFsdWU9XCIke3RnZ2xlfVwiXWApLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJmdWJhb3BhaVwiXScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ5aWZhXCJdJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ0aWFuaHVcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImZ1YmFvcGFpXCJdJykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInlpZmFcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCdpbnB1dFtuYW1lPVwieWlmYVwiXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSlcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImxpbmdzaGFuZ1wiXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPVwiaGFpZGlcIl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImxpbmdzaGFuZ1wiXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJxaWFuZ2dhbmdcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwidGlhbmh1XCJdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoJ2lucHV0W25hbWU9XCJsaW5nc2hhbmdcIl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInlpZmFcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwiaGFpZGlcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicWlhbmdnYW5nXCJdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInRpYW5odVwiXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ6aW1vXCJdW3ZhbHVlPVwiMVwiXScpLmNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCdpbnB1dFtuYW1lPVwicWlhbmdnYW5nXCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJoYWlkaVwiXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJsaW5nc2hhbmdcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwidGlhbmh1XCJdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInppbW9cIl1bdmFsdWU9XCIwXCJdJykuY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPVwidGlhbmh1XCJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKSB7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJsaXpoaVwiXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJmdWJhb3BhaVwiXScpLnBhcmVudCgpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ5aWZhXCJdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwiaGFpZGlcIl0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwibGluZ3NoYW5nXCJdJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInFpYW5nZ2FuZ1wiXScpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJ6aW1vXCJdW3ZhbHVlPVwiMVwiXScpLmNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGZyYWdtZW50ID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlKC9eIy8sJycpO1xyXG4gICAgaWYgKGZyYWdtZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBbcGFpc3RyLCBiYW9wYWksIGZ1YmFvcGFpLCB6aW1vLCB6aHVhbmdmZW5nLCBtZW5mZW5nLFxyXG4gICAgICAgICAgICAgbGl6aGksIHlpZmEsIGhhaWRpLCBsaW5nc2hhbmcsIHFpYW5nZ2FuZywgdGlhbmh1XVxyXG4gICAgICAgICAgICAgICAgPSBmcmFnbWVudC5zcGxpdCgvXFwvLyk7XHJcbiAgICAgICAgYmFvcGFpICAgPSAoYmFvcGFpICAgfHwgJycpLnNwbGl0KC8sLyk7XHJcbiAgICAgICAgZnViYW9wYWkgPSAoZnViYW9wYWkgfHwgJycpLnNwbGl0KC8sLyk7XHJcblxyXG4gICAgICAgICQoJ2Zvcm0gaW5wdXRbbmFtZT1cInBhaXN0clwiXScpLnZhbChwYWlzdHIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFvcGFpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJiYW9wYWlcIl0nKS5lcShpKS52YWwoYmFvcGFpW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdWJhb3BhaS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwiZnViYW9wYWlcIl0nKS5lcShpKS52YWwoZnViYW9wYWlbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKGBpbnB1dFtuYW1lPVwiemltb1wiXVt2YWx1ZT1cIiR7emltb31cIl1gKS5jbGljaygpO1xyXG4gICAgICAgICQoJ3NlbGVjdFtuYW1lPVwiemh1YW5nZmVuZ1wiXScpLnZhbCh6aHVhbmdmZW5nIHx8IDApO1xyXG4gICAgICAgICQoJ3NlbGVjdFtuYW1lPVwibWVuZmVuZ1wiXScpLnZhbChtZW5mZW5nIHx8IDApO1xyXG4gICAgICAgICQoYGlucHV0W25hbWU9XCJsaXpoaVwiXVt2YWx1ZT1cIiR7bGl6aGl9XCJdYCkuY2xpY2soKTtcclxuICAgICAgICBpZiAoK3lpZmEpICAgICAgJCgnaW5wdXRbbmFtZT1cInlpZmFcIl0nKS5jbGljaygpO1xyXG4gICAgICAgIGlmICgraGFpZGkpICAgICAkKCdpbnB1dFtuYW1lPVwiaGFpZGlcIl0nKS5jbGljaygpO1xyXG4gICAgICAgIGlmICgrbGluZ3NoYW5nKSAkKCdpbnB1dFtuYW1lPVwibGluZ3NoYW5nXCJdJykuY2xpY2soKTtcclxuICAgICAgICBpZiAoK3FpYW5nZ2FuZykgJCgnaW5wdXRbbmFtZT1cInFpYW5nZ2FuZ1wiXScpLmNsaWNrKCk7XHJcbiAgICAgICAgaWYgKCt0aWFuaHUpICAgICQoJ2lucHV0W25hbWU9XCJ0aWFuaHVcIl0nKS5jbGljaygpO1xyXG5cclxuICAgICAgICAkKCdmb3JtJykuc3VibWl0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCdmb3JtIGlucHV0W25hbWU9XCJwYWlzdHJcIl0nKS5mb2N1cygpO1xyXG4gICAgICAgICQoJ2Zvcm0gaW5wdXRbbmFtZT1cInBhaXN0clwiXScpLnZhbCgnbTEyM3AxMjN6MXoxLHMxLTIzLHoyMjI9Jyk7XHJcbiAgICAgICAgJCgnZm9ybSBpbnB1dFtuYW1lPVwiYmFvcGFpXCJdJykuZXEoMCkudmFsKCd6MScpO1xyXG4gICAgfVxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==