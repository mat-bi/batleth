(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
/*!
 * Materialize v0.97.0 (http://materializecss.com)
 * Copyright 2014-2015 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */;    // Custom Easing
    jQuery.extend( jQuery.easing,
    {
      easeInOutMaterial: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return c/4*((t-=2)*t*t + 2) + b;
      }
    });

;/*! VelocityJS.org (1.2.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function(e){function t(e){var t=e.length,r=$.type(e);return"function"===r||$.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===r||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var $=function(e,t){return new $.fn.init(e,t)};$.isWindow=function(e){return null!=e&&e==e.window},$.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?a[o.call(e)]||"object":typeof e},$.isArray=Array.isArray||function(e){return"array"===$.type(e)},$.isPlainObject=function(e){var t;if(!e||"object"!==$.type(e)||e.nodeType||$.isWindow(e))return!1;try{if(e.constructor&&!n.call(e,"constructor")&&!n.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}for(t in e);return void 0===t||n.call(e,t)},$.each=function(e,r,a){var n,o=0,i=e.length,s=t(e);if(a){if(s)for(;i>o&&(n=r.apply(e[o],a),n!==!1);o++);else for(o in e)if(n=r.apply(e[o],a),n===!1)break}else if(s)for(;i>o&&(n=r.call(e[o],o,e[o]),n!==!1);o++);else for(o in e)if(n=r.call(e[o],o,e[o]),n===!1)break;return e},$.data=function(e,t,a){if(void 0===a){var n=e[$.expando],o=n&&r[n];if(void 0===t)return o;if(o&&t in o)return o[t]}else if(void 0!==t){var n=e[$.expando]||(e[$.expando]=++$.uuid);return r[n]=r[n]||{},r[n][t]=a,a}},$.removeData=function(e,t){var a=e[$.expando],n=a&&r[a];n&&$.each(t,function(e,t){delete n[t]})},$.extend=function(){var e,t,r,a,n,o,i=arguments[0]||{},s=1,l=arguments.length,u=!1;for("boolean"==typeof i&&(u=i,i=arguments[s]||{},s++),"object"!=typeof i&&"function"!==$.type(i)&&(i={}),s===l&&(i=this,s--);l>s;s++)if(null!=(n=arguments[s]))for(a in n)e=i[a],r=n[a],i!==r&&(u&&r&&($.isPlainObject(r)||(t=$.isArray(r)))?(t?(t=!1,o=e&&$.isArray(e)?e:[]):o=e&&$.isPlainObject(e)?e:{},i[a]=$.extend(u,o,r)):void 0!==r&&(i[a]=r));return i},$.queue=function(e,r,a){function n(e,r){var a=r||[];return null!=e&&(t(Object(e))?!function(e,t){for(var r=+t.length,a=0,n=e.length;r>a;)e[n++]=t[a++];if(r!==r)for(;void 0!==t[a];)e[n++]=t[a++];return e.length=n,e}(a,"string"==typeof e?[e]:e):[].push.call(a,e)),a}if(e){r=(r||"fx")+"queue";var o=$.data(e,r);return a?(!o||$.isArray(a)?o=$.data(e,r,n(a)):o.push(a),o):o||[]}},$.dequeue=function(e,t){$.each(e.nodeType?[e]:e,function(e,r){t=t||"fx";var a=$.queue(r,t),n=a.shift();"inprogress"===n&&(n=a.shift()),n&&("fx"===t&&a.unshift("inprogress"),n.call(r,function(){$.dequeue(r,t)}))})},$.fn=$.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),r=this.offset(),a=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:$(e).offset();return r.top-=parseFloat(t.style.marginTop)||0,r.left-=parseFloat(t.style.marginLeft)||0,e.style&&(a.top+=parseFloat(e.style.borderTopWidth)||0,a.left+=parseFloat(e.style.borderLeftWidth)||0),{top:r.top-a.top,left:r.left-a.left}}};var r={};$.expando="velocity"+(new Date).getTime(),$.uuid=0;for(var a={},n=a.hasOwnProperty,o=a.toString,i="Boolean Number String Function Array Date RegExp Object Error".split(" "),s=0;s<i.length;s++)a["[object "+i[s]+"]"]=i[s].toLowerCase();$.fn.init.prototype=$.fn,e.Velocity={Utilities:$}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):e()}(function(){return function(e,t,r,a){function n(e){for(var t=-1,r=e?e.length:0,a=[];++t<r;){var n=e[t];n&&a.push(n)}return a}function o(e){return g.isWrapped(e)?e=[].slice.call(e):g.isNode(e)&&(e=[e]),e}function i(e){var t=$.data(e,"velocity");return null===t?a:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,r,a,n){function o(e,t){return 1-3*t+3*e}function i(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,r){return((o(t,r)*e+i(t,r))*e+s(t))*e}function u(e,t,r){return 3*o(t,r)*e*e+2*i(t,r)*e+s(t)}function c(t,r){for(var n=0;m>n;++n){var o=u(r,e,a);if(0===o)return r;var i=l(r,e,a)-t;r-=i/o}return r}function p(){for(var t=0;b>t;++t)w[t]=l(t*x,e,a)}function f(t,r,n){var o,i,s=0;do i=r+(n-r)/2,o=l(i,e,a)-t,o>0?n=i:r=i;while(Math.abs(o)>h&&++s<v);return i}function d(t){for(var r=0,n=1,o=b-1;n!=o&&w[n]<=t;++n)r+=x;--n;var i=(t-w[n])/(w[n+1]-w[n]),s=r+i*x,l=u(s,e,a);return l>=y?c(t,s):0==l?s:f(t,r,r+x)}function g(){V=!0,(e!=r||a!=n)&&p()}var m=4,y=.001,h=1e-7,v=10,b=11,x=1/(b-1),S="Float32Array"in t;if(4!==arguments.length)return!1;for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1;e=Math.min(e,1),a=Math.min(a,1),e=Math.max(e,0),a=Math.max(a,0);var w=S?new Float32Array(b):new Array(b),V=!1,C=function(t){return V||g(),e===r&&a===n?t:0===t?0:1===t?1:l(d(t),r,n)};C.getControlPoints=function(){return[{x:e,y:r},{x:a,y:n}]};var T="generateBezier("+[e,r,a,n]+")";return C.toString=function(){return T},C}function u(e,t){var r=e;return g.isString(e)?v.Easings[e]||(r=!1):r=g.isArray(e)&&1===e.length?s.apply(null,e):g.isArray(e)&&2===e.length?b.apply(null,e.concat([t])):g.isArray(e)&&4===e.length?l.apply(null,e):!1,r===!1&&(r=v.Easings[v.defaults.easing]?v.defaults.easing:h),r}function c(e){if(e){var t=(new Date).getTime(),r=v.State.calls.length;r>1e4&&(v.State.calls=n(v.State.calls));for(var o=0;r>o;o++)if(v.State.calls[o]){var s=v.State.calls[o],l=s[0],u=s[2],f=s[3],d=!!f,m=null;f||(f=v.State.calls[o][3]=t-16);for(var y=Math.min((t-f)/u.duration,1),h=0,b=l.length;b>h;h++){var S=l[h],w=S.element;if(i(w)){var V=!1;if(u.display!==a&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var C=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];$.each(C,function(e,t){x.setPropertyValue(w,"display",t)})}x.setPropertyValue(w,"display",u.display)}u.visibility!==a&&"hidden"!==u.visibility&&x.setPropertyValue(w,"visibility",u.visibility);for(var T in S)if("element"!==T){var k=S[T],A,F=g.isString(k.easing)?v.Easings[k.easing]:k.easing;if(1===y)A=k.endValue;else{var E=k.endValue-k.startValue;if(A=k.startValue+E*F(y,u,E),!d&&A===k.currentValue)continue}if(k.currentValue=A,"tween"===T)m=A;else{if(x.Hooks.registered[T]){var j=x.Hooks.getRoot(T),H=i(w).rootPropertyValueCache[j];H&&(k.rootPropertyValue=H)}var N=x.setPropertyValue(w,T,k.currentValue+(0===parseFloat(A)?"":k.unitType),k.rootPropertyValue,k.scrollData);x.Hooks.registered[T]&&(i(w).rootPropertyValueCache[j]=x.Normalizations.registered[j]?x.Normalizations.registered[j]("extract",null,N[1]):N[1]),"transform"===N[0]&&(V=!0)}}u.mobileHA&&i(w).transformCache.translate3d===a&&(i(w).transformCache.translate3d="(0px, 0px, 0px)",V=!0),V&&x.flushTransformCache(w)}}u.display!==a&&"none"!==u.display&&(v.State.calls[o][2].display=!1),u.visibility!==a&&"hidden"!==u.visibility&&(v.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],y,Math.max(0,f+u.duration-t),f,m),1===y&&p(o)}}v.State.isTicking&&P(c)}function p(e,t){if(!v.State.calls[e])return!1;for(var r=v.State.calls[e][0],n=v.State.calls[e][1],o=v.State.calls[e][2],s=v.State.calls[e][4],l=!1,u=0,c=r.length;c>u;u++){var p=r[u].element;if(t||o.loop||("none"===o.display&&x.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&x.setPropertyValue(p,"visibility",o.visibility)),o.loop!==!0&&($.queue(p)[1]===a||!/\.velocityQueueEntryFlag/i.test($.queue(p)[1]))&&i(p)){i(p).isAnimating=!1,i(p).rootPropertyValueCache={};var f=!1;$.each(x.Lists.transforms3D,function(e,t){var r=/^scale/.test(t)?1:0,n=i(p).transformCache[t];i(p).transformCache[t]!==a&&new RegExp("^\\("+r+"[^.]").test(n)&&(f=!0,delete i(p).transformCache[t])}),o.mobileHA&&(f=!0,delete i(p).transformCache.translate3d),f&&x.flushTransformCache(p),x.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(n,n)}catch(d){setTimeout(function(){throw d},1)}s&&o.loop!==!0&&s(n),i(p)&&o.loop===!0&&!t&&($.each(i(p).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),v(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&$.dequeue(p,o.queue)}v.State.calls[e]=!1;for(var g=0,m=v.State.calls.length;m>g;g++)if(v.State.calls[g]!==!1){l=!0;break}l===!1&&(v.State.isTicking=!1,delete v.State.calls,v.State.calls=[])}var f=function(){if(r.documentMode)return r.documentMode;for(var e=7;e>4;e--){var t=r.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return a}(),d=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var r=(new Date).getTime(),a;return a=Math.max(0,16-(r-e)),e=r+a,setTimeout(function(){t(r+a)},a)}}(),g={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==a&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},$,m=!1;if(e.fn&&e.fn.jquery?($=e,m=!0):$=t.Velocity.Utilities,8>=f&&!m)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=f)return void(jQuery.fn.velocity=jQuery.fn.animate);var y=400,h="swing",v={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:r.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:$,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:y,easing:h,begin:a,complete:a,progress:a,display:a,visibility:a,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){$.data(e,"velocity",{isSVG:g.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==a?(v.State.scrollAnchor=t,v.State.scrollPropertyLeft="pageXOffset",v.State.scrollPropertyTop="pageYOffset"):(v.State.scrollAnchor=r.documentElement||r.body.parentNode||r.body,v.State.scrollPropertyLeft="scrollLeft",v.State.scrollPropertyTop="scrollTop");var b=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,a){var n={x:t.x+a.dx*r,v:t.v+a.dv*r,tension:t.tension,friction:t.friction};return{dx:n.v,dv:e(n)}}function r(r,a){var n={dx:r.v,dv:e(r)},o=t(r,.5*a,n),i=t(r,.5*a,o),s=t(r,a,i),l=1/6*(n.dx+2*(o.dx+i.dx)+s.dx),u=1/6*(n.dv+2*(o.dv+i.dv)+s.dv);return r.x=r.x+l*a,r.v=r.v+u*a,r}return function a(e,t,n){var o={x:-1,v:0,tension:null,friction:null},i=[0],s=0,l=1e-4,u=.016,c,p,f;for(e=parseFloat(e)||500,t=parseFloat(t)||20,n=n||null,o.tension=e,o.friction=t,c=null!==n,c?(s=a(e,t),p=s/n*u):p=u;;)if(f=r(f||o,p),i.push(1+f.x),s+=16,!(Math.abs(f.x)>l&&Math.abs(f.v)>l))break;return c?function(e){return i[e*(i.length-1)|0]}:s}}();v.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},$.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){v.Easings[t[0]]=l.apply(null,t[1])});var x=v.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<x.Lists.colors.length;e++){var t="color"===x.Lists.colors[e]?"0 0 0 1":"255 255 255 1";x.Hooks.templates[x.Lists.colors[e]]=["Red Green Blue Alpha",t]}var r,a,n;if(f)for(r in x.Hooks.templates){a=x.Hooks.templates[r],n=a[0].split(" ");var o=a[1].match(x.RegEx.valueSplit);"Color"===n[0]&&(n.push(n.shift()),o.push(o.shift()),x.Hooks.templates[r]=[n.join(" "),o.join(" ")])}for(r in x.Hooks.templates){a=x.Hooks.templates[r],n=a[0].split(" ");for(var e in n){var i=r+n[e],s=e;x.Hooks.registered[i]=[r,s]}}},getRoot:function(e){var t=x.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return x.RegEx.valueUnwrap.test(t)&&(t=t.match(x.RegEx.valueUnwrap)[1]),x.Values.isCSSNullValue(t)&&(t=x.Hooks.templates[e][1]),t},extractValue:function(e,t){var r=x.Hooks.registered[e];if(r){var a=r[0],n=r[1];return t=x.Hooks.cleanRootPropertyValue(a,t),t.toString().match(x.RegEx.valueSplit)[n]}return t},injectValue:function(e,t,r){var a=x.Hooks.registered[e];if(a){var n=a[0],o=a[1],i,s;return r=x.Hooks.cleanRootPropertyValue(n,r),i=r.toString().match(x.RegEx.valueSplit),i[o]=t,s=i.join(" ")}return r}},Normalizations:{registered:{clip:function(e,t,r){switch(e){case"name":return"clip";case"extract":var a;return x.RegEx.wrappedValueAlreadyExtracted.test(r)?a=r:(a=r.toString().match(x.RegEx.valueUnwrap),a=a?a[1].replace(/,(\s+)?/g," "):r),a;case"inject":return"rect("+r+")"}},blur:function(e,t,r){switch(e){case"name":return v.State.isFirefox?"filter":"-webkit-filter";case"extract":var a=parseFloat(r);if(!a&&0!==a){var n=r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a=n?n[1]:0}return a;case"inject":return parseFloat(r)?"blur("+r+")":"none"}},opacity:function(e,t,r){if(8>=f)switch(e){case"name":return"filter";case"extract":var a=r.toString().match(/alpha\(opacity=(.*)\)/i);return r=a?a[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(r)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(r),10)+")"}else switch(e){case"name":return"opacity";case"extract":return r;case"inject":return r}}},register:function(){9>=f||v.State.isGingerbread||(x.Lists.transformsBase=x.Lists.transformsBase.concat(x.Lists.transforms3D));for(var e=0;e<x.Lists.transformsBase.length;e++)!function(){var t=x.Lists.transformsBase[e];x.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return"transform";case"extract":return i(r)===a||i(r).transformCache[t]===a?/^scale/i.test(t)?1:0:i(r).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case"scal":case"scale":v.State.isAndroid&&i(r).transformCache[t]===a&&1>n&&(n=1),o=!/(\d)$/i.test(n);break;case"skew":o=!/(deg|\d)$/i.test(n);break;case"rotate":o=!/(deg|\d)$/i.test(n)}return o||(i(r).transformCache[t]="("+n+")"),i(r).transformCache[t]}}}();for(var e=0;e<x.Lists.colors.length;e++)!function(){var t=x.Lists.colors[e];x.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return t;case"extract":var o;if(x.RegEx.wrappedValueAlreadyExtracted.test(n))o=n;else{var i,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(n)?i=s[n]!==a?s[n]:s.black:x.RegEx.isHex.test(n)?i="rgb("+x.Values.hexToRgb(n).join(" ")+")":/^rgba?\(/i.test(n)||(i=s.black),o=(i||n).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=f||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=f?4===n.split(" ").length&&(n=n.split(/\s+/).slice(0,3).join(" ")):3===n.split(" ").length&&(n+=" 1"),(8>=f?"rgb":"rgba")+"("+n.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(f||v.State.isAndroid&&!v.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(v.State.prefixMatches[e])return[v.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],r=0,a=t.length;a>r;r++){var n;if(n=0===r?e:t[r]+e.replace(/^\w/,function(e){return e.toUpperCase()}),g.isString(v.State.prefixElement.style[n]))return v.State.prefixMatches[e]=n,[n,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,a;return e=e.replace(t,function(e,t,r,a){return t+t+r+r+a+a}),a=r.exec(e),a?[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,r,n,o){function s(e,r){function n(){u&&x.setPropertyValue(e,"display","none")}var l=0;if(8>=f)l=$.css(e,r);else{var u=!1;if(/^(width|height)$/.test(r)&&0===x.getPropertyValue(e,"display")&&(u=!0,x.setPropertyValue(e,"display",x.Values.getDisplayType(e))),!o){if("height"===r&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(x.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(x.getPropertyValue(e,"paddingBottom"))||0);return n(),c}if("width"===r&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(x.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(x.getPropertyValue(e,"paddingRight"))||0);return n(),p}}var d;d=i(e)===a?t.getComputedStyle(e,null):i(e).computedStyle?i(e).computedStyle:i(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===r&&(r="borderTopColor"),l=9===f&&"filter"===r?d.getPropertyValue(r):d[r],(""===l||null===l)&&(l=e.style[r]),n()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(r)){var g=s(e,"position");("fixed"===g||"absolute"===g&&/top|left/i.test(r))&&(l=$(e).position()[r]+"px")}return l}var l;if(x.Hooks.registered[r]){var u=r,c=x.Hooks.getRoot(u);n===a&&(n=x.getPropertyValue(e,x.Names.prefixCheck(c)[0])),x.Normalizations.registered[c]&&(n=x.Normalizations.registered[c]("extract",e,n)),l=x.Hooks.extractValue(u,n)}else if(x.Normalizations.registered[r]){var p,d;p=x.Normalizations.registered[r]("name",e),"transform"!==p&&(d=s(e,x.Names.prefixCheck(p)[0]),x.Values.isCSSNullValue(d)&&x.Hooks.templates[r]&&(d=x.Hooks.templates[r][1])),l=x.Normalizations.registered[r]("extract",e,d)}if(!/^[\d-]/.test(l))if(i(e)&&i(e).isSVG&&x.Names.SVGAttribute(r))if(/^(height|width)$/i.test(r))try{l=e.getBBox()[r]}catch(g){l=0}else l=e.getAttribute(r);else l=s(e,x.Names.prefixCheck(r)[0]);return x.Values.isCSSNullValue(l)&&(l=0),v.debug>=2&&console.log("Get "+r+": "+l),l},setPropertyValue:function(e,r,a,n,o){var s=r;if("scroll"===r)o.container?o.container["scroll"+o.direction]=a:"Left"===o.direction?t.scrollTo(a,o.alternateValue):t.scrollTo(o.alternateValue,a);else if(x.Normalizations.registered[r]&&"transform"===x.Normalizations.registered[r]("name",e))x.Normalizations.registered[r]("inject",e,a),s="transform",a=i(e).transformCache[r];else{if(x.Hooks.registered[r]){var l=r,u=x.Hooks.getRoot(r);n=n||x.getPropertyValue(e,u),a=x.Hooks.injectValue(l,a,n),r=u}if(x.Normalizations.registered[r]&&(a=x.Normalizations.registered[r]("inject",e,a),r=x.Normalizations.registered[r]("name",e)),s=x.Names.prefixCheck(r)[0],8>=f)try{e.style[s]=a}catch(c){v.debug&&console.log("Browser does not support ["+a+"] for ["+s+"]")}else i(e)&&i(e).isSVG&&x.Names.SVGAttribute(r)?e.setAttribute(r,a):e.style[s]=a;v.debug>=2&&console.log("Set "+r+" ("+s+"): "+a)}return[s,a]},flushTransformCache:function(e){function t(t){return parseFloat(x.getPropertyValue(e,t))}var r="";if((f||v.State.isAndroid&&!v.State.isChrome)&&i(e).isSVG){var a={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};$.each(i(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),a[e]&&(r+=e+"("+a[e].join(" ")+") ",delete a[e])})}else{var n,o;$.each(i(e).transformCache,function(t){return n=i(e).transformCache[t],"transformPerspective"===t?(o=n,!0):(9===f&&"rotateZ"===t&&(t="rotate"),void(r+=t+n+" "))}),o&&(r="perspective"+o+" "+r)}x.setPropertyValue(e,"transform",r)}};x.Hooks.register(),x.Normalizations.register(),v.hook=function(e,t,r){var n=a;return e=o(e),$.each(e,function(e,o){if(i(o)===a&&v.init(o),r===a)n===a&&(n=v.CSS.getPropertyValue(o,t));else{var s=v.CSS.setPropertyValue(o,t,r);"transform"===s[0]&&v.CSS.flushTransformCache(o),n=s}}),n};var S=function(){function e(){return l?T.promise||null:f}function n(){function e(e){function p(e,t){var r=a,i=a,s=a;return g.isArray(e)?(r=e[0],!g.isArray(e[1])&&/^[\d-]/.test(e[1])||g.isFunction(e[1])||x.RegEx.isHex.test(e[1])?s=e[1]:(g.isString(e[1])&&!x.RegEx.isHex.test(e[1])||g.isArray(e[1]))&&(i=t?e[1]:u(e[1],o.duration),e[2]!==a&&(s=e[2]))):r=e,t||(i=i||o.easing),g.isFunction(r)&&(r=r.call(n,w,P)),g.isFunction(s)&&(s=s.call(n,w,P)),[r||0,i,s]}function f(e,t){var r,a;return a=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return r=e,""}),r||(r=x.Values.getUnitType(e)),[a,r]}function d(){var e={myParent:n.parentNode||r.body,position:x.getPropertyValue(n,"position"),fontSize:x.getPropertyValue(n,"fontSize")},a=e.position===N.lastPosition&&e.myParent===N.lastParent,o=e.fontSize===N.lastFontSize;N.lastParent=e.myParent,N.lastPosition=e.position,N.lastFontSize=e.fontSize;var s=100,l={};if(o&&a)l.emToPx=N.lastEmToPx,l.percentToPxWidth=N.lastPercentToPxWidth,l.percentToPxHeight=N.lastPercentToPxHeight;else{var u=i(n).isSVG?r.createElementNS("http://www.w3.org/2000/svg","rect"):r.createElement("div");v.init(u),e.myParent.appendChild(u),$.each(["overflow","overflowX","overflowY"],function(e,t){v.CSS.setPropertyValue(u,t,"hidden")}),v.CSS.setPropertyValue(u,"position",e.position),v.CSS.setPropertyValue(u,"fontSize",e.fontSize),v.CSS.setPropertyValue(u,"boxSizing","content-box"),$.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){v.CSS.setPropertyValue(u,t,s+"%")}),v.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=N.lastPercentToPxWidth=(parseFloat(x.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=N.lastPercentToPxHeight=(parseFloat(x.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=N.lastEmToPx=(parseFloat(x.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===N.remToPx&&(N.remToPx=parseFloat(x.getPropertyValue(r.body,"fontSize"))||16),null===N.vwToPx&&(N.vwToPx=parseFloat(t.innerWidth)/100,N.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=N.remToPx,l.vwToPx=N.vwToPx,l.vhToPx=N.vhToPx,v.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),n),l}if(o.begin&&0===w)try{o.begin.call(m,m)}catch(y){setTimeout(function(){throw y},1)}if("scroll"===k){var S=/^x$/i.test(o.axis)?"Left":"Top",V=parseFloat(o.offset)||0,C,A,F;o.container?g.isWrapped(o.container)||g.isNode(o.container)?(o.container=o.container[0]||o.container,C=o.container["scroll"+S],F=C+$(n).position()[S.toLowerCase()]+V):o.container=null:(C=v.State.scrollAnchor[v.State["scrollProperty"+S]],A=v.State.scrollAnchor[v.State["scrollProperty"+("Left"===S?"Top":"Left")]],F=$(n).offset()[S.toLowerCase()]+V),s={scroll:{rootPropertyValue:!1,startValue:C,currentValue:C,endValue:F,unitType:"",easing:o.easing,scrollData:{container:o.container,direction:S,alternateValue:A}},element:n},v.debug&&console.log("tweensContainer (scroll): ",s.scroll,n)}else if("reverse"===k){if(!i(n).tweensContainer)return void $.dequeue(n,o.queue);"none"===i(n).opts.display&&(i(n).opts.display="auto"),"hidden"===i(n).opts.visibility&&(i(n).opts.visibility="visible"),i(n).opts.loop=!1,i(n).opts.begin=null,i(n).opts.complete=null,b.easing||delete o.easing,b.duration||delete o.duration,o=$.extend({},i(n).opts,o);var E=$.extend(!0,{},i(n).tweensContainer);for(var j in E)if("element"!==j){var H=E[j].startValue;E[j].startValue=E[j].currentValue=E[j].endValue,E[j].endValue=H,g.isEmptyObject(b)||(E[j].easing=o.easing),v.debug&&console.log("reverse tweensContainer ("+j+"): "+JSON.stringify(E[j]),n)}s=E}else if("start"===k){var E;i(n).tweensContainer&&i(n).isAnimating===!0&&(E=i(n).tweensContainer),$.each(h,function(e,t){if(RegExp("^"+x.Lists.colors.join("$|^")+"$").test(e)){var r=p(t,!0),n=r[0],o=r[1],i=r[2];if(x.RegEx.isHex.test(n)){for(var s=["Red","Green","Blue"],l=x.Values.hexToRgb(n),u=i?x.Values.hexToRgb(i):a,c=0;c<s.length;c++){var f=[l[c]];o&&f.push(o),u!==a&&f.push(u[c]),h[e+s[c]]=f}delete h[e]}}});for(var R in h){var O=p(h[R]),z=O[0],q=O[1],M=O[2];R=x.Names.camelCase(R);var I=x.Hooks.getRoot(R),B=!1;if(i(n).isSVG||"tween"===I||x.Names.prefixCheck(I)[1]!==!1||x.Normalizations.registered[I]!==a){(o.display!==a&&null!==o.display&&"none"!==o.display||o.visibility!==a&&"hidden"!==o.visibility)&&/opacity|filter/.test(R)&&!M&&0!==z&&(M=0),o._cacheValues&&E&&E[R]?(M===a&&(M=E[R].endValue+E[R].unitType),B=i(n).rootPropertyValueCache[I]):x.Hooks.registered[R]?M===a?(B=x.getPropertyValue(n,I),M=x.getPropertyValue(n,R,B)):B=x.Hooks.templates[I][1]:M===a&&(M=x.getPropertyValue(n,R));var W,G,D,X=!1;if(W=f(R,M),M=W[0],D=W[1],W=f(R,z),z=W[0].replace(/^([+-\/*])=/,function(e,t){return X=t,""}),G=W[1],M=parseFloat(M)||0,z=parseFloat(z)||0,"%"===G&&(/^(fontSize|lineHeight)$/.test(R)?(z/=100,G="em"):/^scale/.test(R)?(z/=100,G=""):/(Red|Green|Blue)$/i.test(R)&&(z=z/100*255,G="")),/[\/*]/.test(X))G=D;else if(D!==G&&0!==M)if(0===z)G=D;else{l=l||d();var Y=/margin|padding|left|right|width|text|word|letter/i.test(R)||/X$/.test(R)||"x"===R?"x":"y";switch(D){case"%":M*="x"===Y?l.percentToPxWidth:l.percentToPxHeight;break;case"px":break;default:M*=l[D+"ToPx"]}switch(G){case"%":M*=1/("x"===Y?l.percentToPxWidth:l.percentToPxHeight);break;case"px":break;default:M*=1/l[G+"ToPx"]}}switch(X){case"+":z=M+z;break;case"-":z=M-z;break;case"*":z=M*z;break;case"/":z=M/z}s[R]={rootPropertyValue:B,startValue:M,currentValue:M,endValue:z,unitType:G,easing:q},v.debug&&console.log("tweensContainer ("+R+"): "+JSON.stringify(s[R]),n)}else v.debug&&console.log("Skipping ["+I+"] due to a lack of browser support.")}s.element=n}s.element&&(x.Values.addClass(n,"velocity-animating"),L.push(s),""===o.queue&&(i(n).tweensContainer=s,i(n).opts=o),i(n).isAnimating=!0,w===P-1?(v.State.calls.push([L,m,o,null,T.resolver]),v.State.isTicking===!1&&(v.State.isTicking=!0,c())):w++)}var n=this,o=$.extend({},v.defaults,b),s={},l;switch(i(n)===a&&v.init(n),parseFloat(o.delay)&&o.queue!==!1&&$.queue(n,o.queue,function(e){v.velocityQueueEntryFlag=!0,i(n).delayTimer={setTimeout:setTimeout(e,parseFloat(o.delay)),next:e}}),o.duration.toString().toLowerCase()){case"fast":o.duration=200;break;case"normal":o.duration=y;break;case"slow":o.duration=600;break;default:o.duration=parseFloat(o.duration)||1}v.mock!==!1&&(v.mock===!0?o.duration=o.delay=1:(o.duration*=parseFloat(v.mock)||1,o.delay*=parseFloat(v.mock)||1)),o.easing=u(o.easing,o.duration),o.begin&&!g.isFunction(o.begin)&&(o.begin=null),o.progress&&!g.isFunction(o.progress)&&(o.progress=null),o.complete&&!g.isFunction(o.complete)&&(o.complete=null),o.display!==a&&null!==o.display&&(o.display=o.display.toString().toLowerCase(),"auto"===o.display&&(o.display=v.CSS.Values.getDisplayType(n))),o.visibility!==a&&null!==o.visibility&&(o.visibility=o.visibility.toString().toLowerCase()),o.mobileHA=o.mobileHA&&v.State.isMobile&&!v.State.isGingerbread,o.queue===!1?o.delay?setTimeout(e,o.delay):e():$.queue(n,o.queue,function(t,r){return r===!0?(T.promise&&T.resolver(m),!0):(v.velocityQueueEntryFlag=!0,void e(t))}),""!==o.queue&&"fx"!==o.queue||"inprogress"===$.queue(n)[0]||$.dequeue(n)}var s=arguments[0]&&(arguments[0].p||$.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||g.isString(arguments[0].properties)),l,f,d,m,h,b;if(g.isWrapped(this)?(l=!1,d=0,m=this,f=this):(l=!0,d=1,m=s?arguments[0].elements||arguments[0].e:arguments[0]),m=o(m)){s?(h=arguments[0].properties||arguments[0].p,b=arguments[0].options||arguments[0].o):(h=arguments[d],b=arguments[d+1]);var P=m.length,w=0;if(!/^(stop|finish)$/i.test(h)&&!$.isPlainObject(b)){var V=d+1;b={};for(var C=V;C<arguments.length;C++)g.isArray(arguments[C])||!/^(fast|normal|slow)$/i.test(arguments[C])&&!/^\d/.test(arguments[C])?g.isString(arguments[C])||g.isArray(arguments[C])?b.easing=arguments[C]:g.isFunction(arguments[C])&&(b.complete=arguments[C]):b.duration=arguments[C]}var T={promise:null,resolver:null,rejecter:null};l&&v.Promise&&(T.promise=new v.Promise(function(e,t){T.resolver=e,T.rejecter=t}));var k;switch(h){case"scroll":k="scroll";break;case"reverse":k="reverse";break;case"finish":case"stop":$.each(m,function(e,t){i(t)&&i(t).delayTimer&&(clearTimeout(i(t).delayTimer.setTimeout),i(t).delayTimer.next&&i(t).delayTimer.next(),delete i(t).delayTimer)});var A=[];return $.each(v.State.calls,function(e,t){t&&$.each(t[1],function(r,n){var o=b===a?"":b;return o===!0||t[2].queue===o||b===a&&t[2].queue===!1?void $.each(m,function(r,a){a===n&&((b===!0||g.isString(b))&&($.each($.queue(a,g.isString(b)?b:""),function(e,t){g.isFunction(t)&&t(null,!0)}),$.queue(a,g.isString(b)?b:"",[])),"stop"===h?(i(a)&&i(a).tweensContainer&&o!==!1&&$.each(i(a).tweensContainer,function(e,t){t.endValue=t.currentValue
}),A.push(e)):"finish"===h&&(t[2].duration=1))}):!0})}),"stop"===h&&($.each(A,function(e,t){p(t,!0)}),T.promise&&T.resolver(m)),e();default:if(!$.isPlainObject(h)||g.isEmptyObject(h)){if(g.isString(h)&&v.Redirects[h]){var F=$.extend({},b),E=F.duration,j=F.delay||0;return F.backwards===!0&&(m=$.extend(!0,[],m).reverse()),$.each(m,function(e,t){parseFloat(F.stagger)?F.delay=j+parseFloat(F.stagger)*e:g.isFunction(F.stagger)&&(F.delay=j+F.stagger.call(t,e,P)),F.drag&&(F.duration=parseFloat(E)||(/^(callout|transition)/.test(h)?1e3:y),F.duration=Math.max(F.duration*(F.backwards?1-e/P:(e+1)/P),.75*F.duration,200)),v.Redirects[h].call(t,t,F||{},e,P,m,T.promise?T:a)}),e()}var H="Velocity: First argument ("+h+") was not a property map, a known action, or a registered redirect. Aborting.";return T.promise?T.rejecter(new Error(H)):console.log(H),e()}k="start"}var N={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},L=[];$.each(m,function(e,t){g.isNode(t)&&n.call(t)});var F=$.extend({},v.defaults,b),R;if(F.loop=parseInt(F.loop),R=2*F.loop-1,F.loop)for(var O=0;R>O;O++){var z={delay:F.delay,progress:F.progress};O===R-1&&(z.display=F.display,z.visibility=F.visibility,z.complete=F.complete),S(m,"reverse",z)}return e()}};v=$.extend(S,v),v.animate=S;var P=t.requestAnimationFrame||d;return v.State.isMobile||r.hidden===a||r.addEventListener("visibilitychange",function(){r.hidden?(P=function(e){return setTimeout(function(){e(!0)},16)},c()):P=t.requestAnimationFrame||d}),e.Velocity=v,e!==t&&(e.fn.velocity=S,e.fn.velocity.defaults=v.defaults),$.each(["Down","Up"],function(e,t){v.Redirects["slide"+t]=function(e,r,n,o,i,s){var l=$.extend({},r),u=l.begin,c=l.complete,p={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},f={};l.display===a&&(l.display="Down"===t?"inline"===v.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(i,i);for(var r in p){f[r]=e.style[r];var a=v.CSS.getPropertyValue(e,r);p[r]="Down"===t?[a,0]:[0,a]}f.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in f)e.style[t]=f[t];c&&c.call(i,i),s&&s.resolver(i)},v(e,p,l)}}),$.each(["In","Out"],function(e,t){v.Redirects["fade"+t]=function(e,r,n,o,i,s){var l=$.extend({},r),u={opacity:"In"===t?1:0},c=l.complete;l.complete=n!==o-1?l.begin=null:function(){c&&c.call(i,i),s&&s.resolver(i)},l.display===a&&(l.display="In"===t?"auto":"none"),v(this,u,l)}}),v}(window.jQuery||window.Zepto||window,window,document)});;!function(a,b,c,d){"use strict";function k(a,b,c){return setTimeout(q(a,c),b)}function l(a,b,c){return Array.isArray(a)?(m(a,c[b],c),!0):!1}function m(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function n(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function o(a,b){return n(a,b,!0)}function p(a,b,c){var e,d=b.prototype;e=a.prototype=Object.create(d),e.constructor=a,e._super=d,c&&n(e,c)}function q(a,b){return function(){return a.apply(b,arguments)}}function r(a,b){return typeof a==g?a.apply(b?b[0]||d:d,b):a}function s(a,b){return a===d?b:a}function t(a,b,c){m(x(b),function(b){a.addEventListener(b,c,!1)})}function u(a,b,c){m(x(b),function(b){a.removeEventListener(b,c,!1)})}function v(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function w(a,b){return a.indexOf(b)>-1}function x(a){return a.trim().split(/\s+/g)}function y(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function z(a){return Array.prototype.slice.call(a,0)}function A(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];y(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function B(a,b){for(var c,f,g=b[0].toUpperCase()+b.slice(1),h=0;h<e.length;){if(c=e[h],f=c?c+g:b,f in a)return f;h++}return d}function D(){return C++}function E(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function ab(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){r(a.options.enable,[a])&&c.handler(b)},this.init()}function bb(a){var b,c=a.options.inputClass;return b=c?c:H?wb:I?Eb:G?Gb:rb,new b(a,cb)}function cb(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&O&&0===d-e,g=b&(Q|R)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,db(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function db(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=gb(b)),e>1&&!c.firstMultiple?c.firstMultiple=gb(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=hb(d);b.timeStamp=j(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=lb(h,i),b.distance=kb(h,i),eb(c,b),b.offsetDirection=jb(b.deltaX,b.deltaY),b.scale=g?nb(g.pointers,d):1,b.rotation=g?mb(g.pointers,d):0,fb(c,b);var k=a.element;v(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function eb(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===O||f.eventType===Q)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function fb(a,b){var f,g,h,j,c=a.lastInterval||b,e=b.timeStamp-c.timeStamp;if(b.eventType!=R&&(e>N||c.velocity===d)){var k=c.deltaX-b.deltaX,l=c.deltaY-b.deltaY,m=ib(e,k,l);g=m.x,h=m.y,f=i(m.x)>i(m.y)?m.x:m.y,j=jb(k,l),a.lastInterval=b}else f=c.velocity,g=c.velocityX,h=c.velocityY,j=c.direction;b.velocity=f,b.velocityX=g,b.velocityY=h,b.direction=j}function gb(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:h(a.pointers[c].clientX),clientY:h(a.pointers[c].clientY)},c++;return{timeStamp:j(),pointers:b,center:hb(b),deltaX:a.deltaX,deltaY:a.deltaY}}function hb(a){var b=a.length;if(1===b)return{x:h(a[0].clientX),y:h(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:h(c/b),y:h(d/b)}}function ib(a,b,c){return{x:b/a||0,y:c/a||0}}function jb(a,b){return a===b?S:i(a)>=i(b)?a>0?T:U:b>0?V:W}function kb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function lb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function mb(a,b){return lb(b[1],b[0],_)-lb(a[1],a[0],_)}function nb(a,b){return kb(b[0],b[1],_)/kb(a[0],a[1],_)}function rb(){this.evEl=pb,this.evWin=qb,this.allow=!0,this.pressed=!1,ab.apply(this,arguments)}function wb(){this.evEl=ub,this.evWin=vb,ab.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function Ab(){this.evTarget=yb,this.evWin=zb,this.started=!1,ab.apply(this,arguments)}function Bb(a,b){var c=z(a.touches),d=z(a.changedTouches);return b&(Q|R)&&(c=A(c.concat(d),"identifier",!0)),[c,d]}function Eb(){this.evTarget=Db,this.targetIds={},ab.apply(this,arguments)}function Fb(a,b){var c=z(a.touches),d=this.targetIds;if(b&(O|P)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=z(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return v(a.target,i)}),b===O)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Q|R)&&delete d[g[e].identifier],e++;return h.length?[A(f.concat(h),"identifier",!0),h]:void 0}function Gb(){ab.apply(this,arguments);var a=q(this.handler,this);this.touch=new Eb(this.manager,a),this.mouse=new rb(this.manager,a)}function Pb(a,b){this.manager=a,this.set(b)}function Qb(a){if(w(a,Mb))return Mb;var b=w(a,Nb),c=w(a,Ob);return b&&c?Nb+" "+Ob:b||c?b?Nb:Ob:w(a,Lb)?Lb:Kb}function Yb(a){this.id=D(),this.manager=null,this.options=o(a||{},this.defaults),this.options.enable=s(this.options.enable,!0),this.state=Rb,this.simultaneous={},this.requireFail=[]}function Zb(a){return a&Wb?"cancel":a&Ub?"end":a&Tb?"move":a&Sb?"start":""}function $b(a){return a==W?"down":a==V?"up":a==T?"left":a==U?"right":""}function _b(a,b){var c=b.manager;return c?c.get(a):a}function ac(){Yb.apply(this,arguments)}function bc(){ac.apply(this,arguments),this.pX=null,this.pY=null}function cc(){ac.apply(this,arguments)}function dc(){Yb.apply(this,arguments),this._timer=null,this._input=null}function ec(){ac.apply(this,arguments)}function fc(){ac.apply(this,arguments)}function gc(){Yb.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function hc(a,b){return b=b||{},b.recognizers=s(b.recognizers,hc.defaults.preset),new kc(a,b)}function kc(a,b){b=b||{},this.options=o(b,hc.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=bb(this),this.touchAction=new Pb(this,this.options.touchAction),lc(this,!0),m(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function lc(a,b){var c=a.element;m(a.options.cssProps,function(a,d){c.style[B(c.style,d)]=b?a:""})}function mc(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var e=["","webkit","moz","MS","ms","o"],f=b.createElement("div"),g="function",h=Math.round,i=Math.abs,j=Date.now,C=1,F=/mobile|tablet|ip(ad|hone|od)|android/i,G="ontouchstart"in a,H=B(a,"PointerEvent")!==d,I=G&&F.test(navigator.userAgent),J="touch",K="pen",L="mouse",M="kinect",N=25,O=1,P=2,Q=4,R=8,S=1,T=2,U=4,V=8,W=16,X=T|U,Y=V|W,Z=X|Y,$=["x","y"],_=["clientX","clientY"];ab.prototype={handler:function(){},init:function(){this.evEl&&t(this.element,this.evEl,this.domHandler),this.evTarget&&t(this.target,this.evTarget,this.domHandler),this.evWin&&t(E(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&u(this.element,this.evEl,this.domHandler),this.evTarget&&u(this.target,this.evTarget,this.domHandler),this.evWin&&u(E(this.element),this.evWin,this.domHandler)}};var ob={mousedown:O,mousemove:P,mouseup:Q},pb="mousedown",qb="mousemove mouseup";p(rb,ab,{handler:function(a){var b=ob[a.type];b&O&&0===a.button&&(this.pressed=!0),b&P&&1!==a.which&&(b=Q),this.pressed&&this.allow&&(b&Q&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:L,srcEvent:a}))}});var sb={pointerdown:O,pointermove:P,pointerup:Q,pointercancel:R,pointerout:R},tb={2:J,3:K,4:L,5:M},ub="pointerdown",vb="pointermove pointerup pointercancel";a.MSPointerEvent&&(ub="MSPointerDown",vb="MSPointerMove MSPointerUp MSPointerCancel"),p(wb,ab,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=sb[d],f=tb[a.pointerType]||a.pointerType,g=f==J,h=y(b,a.pointerId,"pointerId");e&O&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Q|R)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var xb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},yb="touchstart",zb="touchstart touchmove touchend touchcancel";p(Ab,ab,{handler:function(a){var b=xb[a.type];if(b===O&&(this.started=!0),this.started){var c=Bb.call(this,a,b);b&(Q|R)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}});var Cb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},Db="touchstart touchmove touchend touchcancel";p(Eb,ab,{handler:function(a){var b=Cb[a.type],c=Fb.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}),p(Gb,ab,{handler:function(a,b,c){var d=c.pointerType==J,e=c.pointerType==L;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Q|R)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Hb=B(f.style,"touchAction"),Ib=Hb!==d,Jb="compute",Kb="auto",Lb="manipulation",Mb="none",Nb="pan-x",Ob="pan-y";Pb.prototype={set:function(a){a==Jb&&(a=this.compute()),Ib&&(this.manager.element.style[Hb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return m(this.manager.recognizers,function(b){r(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),Qb(a.join(" "))},preventDefaults:function(a){if(!Ib){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return b.preventDefault(),void 0;var d=this.actions,e=w(d,Mb),f=w(d,Ob),g=w(d,Nb);return e||f&&c&X||g&&c&Y?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var Rb=1,Sb=2,Tb=4,Ub=8,Vb=Ub,Wb=16,Xb=32;Yb.prototype={defaults:{},set:function(a){return n(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(l(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_b(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return l(a,"dropRecognizeWith",this)?this:(a=_b(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(l(a,"requireFailure",this))return this;var b=this.requireFail;return a=_b(a,this),-1===y(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(l(a,"dropRequireFailure",this))return this;a=_b(a,this);var b=y(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function d(d){b.manager.emit(b.options.event+(d?Zb(c):""),a)}var b=this,c=this.state;Ub>c&&d(!0),d(),c>=Ub&&d(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):(this.state=Xb,void 0)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(Xb|Rb)))return!1;a++}return!0},recognize:function(a){var b=n({},a);return r(this.options.enable,[this,b])?(this.state&(Vb|Wb|Xb)&&(this.state=Rb),this.state=this.process(b),this.state&(Sb|Tb|Ub|Wb)&&this.tryEmit(b),void 0):(this.reset(),this.state=Xb,void 0)},process:function(){},getTouchAction:function(){},reset:function(){}},p(ac,Yb,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(Sb|Tb),e=this.attrTest(a);return d&&(c&R||!e)?b|Wb:d||e?c&Q?b|Ub:b&Sb?b|Tb:Sb:Xb}}),p(bc,ac,{defaults:{event:"pan",threshold:10,pointers:1,direction:Z},getTouchAction:function(){var a=this.options.direction,b=[];return a&X&&b.push(Ob),a&Y&&b.push(Nb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&X?(e=0===f?S:0>f?T:U,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?S:0>g?V:W,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return ac.prototype.attrTest.call(this,a)&&(this.state&Sb||!(this.state&Sb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),p(cc,ac,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&Sb)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),p(dc,Yb,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Kb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Q|R)&&!e)this.reset();else if(a.eventType&O)this.reset(),this._timer=k(function(){this.state=Vb,this.tryEmit()},b.time,this);else if(a.eventType&Q)return Vb;return Xb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===Vb&&(a&&a.eventType&Q?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=j(),this.manager.emit(this.options.event,this._input)))}}),p(ec,ac,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&Sb)}}),p(fc,ac,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:X|Y,pointers:1},getTouchAction:function(){return bc.prototype.getTouchAction.call(this)},attrTest:function(a){var c,b=this.options.direction;return b&(X|Y)?c=a.velocity:b&X?c=a.velocityX:b&Y&&(c=a.velocityY),this._super.attrTest.call(this,a)&&b&a.direction&&a.distance>this.options.threshold&&i(c)>this.options.velocity&&a.eventType&Q},emit:function(a){var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),p(gc,Yb,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Lb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime<b.time;if(this.reset(),a.eventType&O&&0===this.count)return this.failTimeout();if(d&&e&&c){if(a.eventType!=Q)return this.failTimeout();var f=this.pTime?a.timeStamp-this.pTime<b.interval:!0,g=!this.pCenter||kb(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,g&&f?this.count+=1:this.count=1,this._input=a;var h=this.count%b.taps;if(0===h)return this.hasRequireFailures()?(this._timer=k(function(){this.state=Vb,this.tryEmit()},b.interval,this),Sb):Vb}return Xb},failTimeout:function(){return this._timer=k(function(){this.state=Xb},this.options.interval,this),Xb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Vb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),hc.VERSION="2.0.4",hc.defaults={domEvents:!1,touchAction:Jb,enable:!0,inputTarget:null,inputClass:null,preset:[[ec,{enable:!1}],[cc,{enable:!1},["rotate"]],[fc,{direction:X}],[bc,{direction:X},["swipe"]],[gc],[gc,{event:"doubletap",taps:2},["tap"]],[dc]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ic=1,jc=2;kc.prototype={set:function(a){return n(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?jc:ic},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&Vb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===jc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(Sb|Tb|Ub)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Yb)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(l(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(l(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(y(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return m(x(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return m(x(a),function(a){b?c[a].splice(y(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&mc(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&lc(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},n(hc,{INPUT_START:O,INPUT_MOVE:P,INPUT_END:Q,INPUT_CANCEL:R,STATE_POSSIBLE:Rb,STATE_BEGAN:Sb,STATE_CHANGED:Tb,STATE_ENDED:Ub,STATE_RECOGNIZED:Vb,STATE_CANCELLED:Wb,STATE_FAILED:Xb,DIRECTION_NONE:S,DIRECTION_LEFT:T,DIRECTION_RIGHT:U,DIRECTION_UP:V,DIRECTION_DOWN:W,DIRECTION_HORIZONTAL:X,DIRECTION_VERTICAL:Y,DIRECTION_ALL:Z,Manager:kc,Input:ab,TouchAction:Pb,TouchInput:Eb,MouseInput:rb,PointerEventInput:wb,TouchMouseInput:Gb,SingleTouchInput:Ab,Recognizer:Yb,AttrRecognizer:ac,Tap:gc,Pan:bc,Swipe:fc,Pinch:cc,Rotate:ec,Press:dc,on:t,off:u,each:m,merge:o,extend:n,inherit:p,bindFn:q,prefixed:B}),typeof define==g&&define.amd?define(function(){return hc}):"undefined"!=typeof module&&module.exports?module.exports=hc:a[c]=hc}(window,document,"Hammer");;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
}(function($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
}));
;Materialize = {};

// Unique ID
Materialize.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

Materialize.elementOrParentIsFixed = function(element) {
    var $element = $(element);
    var $checkElements = $element.add($element.parents());
    var isFixed = false;
    $checkElements.each(function(){
        if ($(this).css("position") === "fixed") {
            isFixed = true;
            return false;
        }
    });
    return isFixed;
};

// Velocity has conflicts when loaded with jQuery, this will check for it
var Vel;
if ($) {
  Vel = $.Velocity;
}
else {
  Vel = Velocity;
}
;(function ($) {
  $.fn.collapsible = function(options) {
    var defaults = {
        accordion: undefined
    };

    options = $.extend(defaults, options);


    return this.each(function() {

      var $this = $(this);

      var $panel_headers = $(this).find('> li > .collapsible-header');

      var collapsible_type = $this.data("collapsible");

      // Turn off any existing event handlers
       $this.off('click.collapse', '.collapsible-header');
       $panel_headers.off('click.collapse');


       /****************
       Helper Functions
       ****************/

      // Accordion Open
      function accordionOpen(object) {
        $panel_headers = $this.find('> li > .collapsible-header');
        if (object.hasClass('active')) {
            object.parent().addClass('active');
        }
        else {
            object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')){
          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }
        else{
          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }

        $panel_headers.not(object).removeClass('active').parent().removeClass('active');
        $panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).slideUp(
          {
            duration: 350,
            easing: "easeOutQuart",
            queue: false,
            complete:
              function() {
                $(this).css('height', '');
              }
          });
      }

      // Expandable Open
      function expandableOpen(object) {
        if (object.hasClass('active')) {
            object.parent().addClass('active');
        }
        else {
            object.parent().removeClass('active');
        }
        if (object.parent().hasClass('active')){
          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }
        else{
          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        }
      }

      /**
       * Check if object is children of panel header
       * @param  {Object}  object Jquery object
       * @return {Boolean} true if it is children
       */
      function isChildrenOfPanelHeader(object) {

        var panelHeader = getPanelHeader(object);

        return panelHeader.length > 0;
      }

      /**
       * Get panel header from a children element
       * @param  {Object} object Jquery object
       * @return {Object} panel header object
       */
      function getPanelHeader(object) {

        return object.closest('li > .collapsible-header');
      }

      /*****  End Helper Functions  *****/



      if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
        // Add click handler to only direct collapsible header children
        $panel_headers = $this.find('> li > .collapsible-header');
        $panel_headers.on('click.collapse', function (e) {
          var element = $(e.target);

          if (isChildrenOfPanelHeader(element)) {
            element = getPanelHeader(element);
          }

          element.toggleClass('active');
          accordionOpen(element);
        });
        // Open first active
        accordionOpen($panel_headers.filter('.active').first());
      }
      else { // Handle Expandables
        $panel_headers.each(function () {
          // Add click handler to only direct collapsible header children
          $(this).on('click.collapse', function (e) {
            var element = $(e.target);
            if (isChildrenOfPanelHeader(element)) {
              element = getPanelHeader(element);
            }
            element.toggleClass('active');
            expandableOpen(element);
          });
          // Open any bodies that have the active class
          if ($(this).hasClass('active')) {
            expandableOpen($(this));
          }

        });
      }

    });
  };

  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
}( jQuery ));;(function ($) {

  // Add posibility to scroll to selected option
  // usefull for select for example
  $.fn.scrollTo = function(elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };

  $.fn.dropdown = function (option) {
    var defaults = {
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Constrains width of dropdown to the activator
      hover: false,
      gutter: 0, // Spacing from edge
      belowOrigin: false
    };

    this.each(function(){
    var origin = $(this);
    var options = $.extend({}, defaults, option);

    // Dropdown menu
    var activates = $("#"+ origin.attr('data-activates'));

    function updateOptions() {
      if (origin.data('induration') !== undefined)
        options.inDuration = origin.data('inDuration');
      if (origin.data('outduration') !== undefined)
        options.outDuration = origin.data('outDuration');
      if (origin.data('constrainwidth') !== undefined)
        options.constrain_width = origin.data('constrainwidth');
      if (origin.data('hover') !== undefined)
        options.hover = origin.data('hover');
      if (origin.data('gutter') !== undefined)
        options.gutter = origin.data('gutter');
      if (origin.data('beloworigin') !== undefined)
        options.belowOrigin = origin.data('beloworigin');
    }

    updateOptions();

    // Attach dropdown to its activator
    origin.after(activates);

    /*
      Helper function to position and resize dropdown.
      Used in hover and click handler.
    */
    function placeDropdown() {
      // Check html data attributes
      updateOptions();

      // Set Dropdown state
      activates.addClass('active');

      // Constrain width
      if (options.constrain_width === true) {
        activates.css('width', origin.outerWidth());
      }
      var offset = 0;
      if (options.belowOrigin === true) {
        offset = origin.height();
      }

      // Handle edge alignment
      var offsetLeft = origin.offset().left;
      var width_difference = 0;
      var gutter_spacing = options.gutter;


      if (offsetLeft + activates.innerWidth() > $(window).width()) {
        width_difference = origin.innerWidth() - activates.innerWidth();
        gutter_spacing = gutter_spacing * -1;
      }

      // Position dropdown
      activates.css({
        position: 'absolute',
        top: origin.position().top + offset,
        left: origin.position().left + width_difference + gutter_spacing
      });



      // Show dropdown
      activates.stop(true, true).css('opacity', 0)
        .slideDown({
        queue: false,
        duration: options.inDuration,
        easing: 'easeOutCubic',
        complete: function() {
          $(this).css('height', '');
        }
      })
        .animate( {opacity: 1}, {queue: false, duration: options.inDuration, easing: 'easeOutSine'});
    }

    function hideDropdown() {
      activates.fadeOut(options.outDuration);
      activates.removeClass('active');
    }

    // Hover
    if (options.hover) {
      var open = false;
      origin.unbind('click.' + origin.attr('id'));
      // Hover handler to show dropdown
      origin.on('mouseenter', function(e){ // Mouse over
        if (open === false) {
          placeDropdown();
          open = true;
        }
      });
      origin.on('mouseleave', function(e){
        // If hover on origin then to something other than dropdown content, then close
        var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
        if(!$(toEl).closest('.dropdown-content').is(activates)) {
          activates.stop(true, true);
          hideDropdown();
          open = false;
        }
      });

      activates.on('mouseleave', function(e){ // Mouse out
        var toEl = e.toElement || e.relatedTarget;
        if(!$(toEl).closest('.dropdown-button').is(origin)) {
          activates.stop(true, true);
          hideDropdown();
          open = false;
        }
      });

    // Click
    } else {

      // Click handler to show dropdown
      origin.unbind('click.' + origin.attr('id'));
      origin.bind('click.'+origin.attr('id'), function(e){

        if ( origin[0] == e.currentTarget && ($(e.target).closest('.dropdown-content').length === 0) ) {
          e.preventDefault(); // Prevents button click from moving window
          placeDropdown();

        }
        // If origin is clicked and menu is open, close menu
        else {
          if (origin.hasClass('active')) {
            hideDropdown();
            $(document).unbind('click.' + activates.attr('id'));
          }
        }
        // If menu open, add click close handler to document
        if (activates.hasClass('active')) {
          $(document).bind('click.'+ activates.attr('id'), function (e) {
            if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length > 0) ) {
              hideDropdown();
              $(document).unbind('click.' + activates.attr('id'));
            }
          });
        }
      });

    } // End else

    // Listen to open and close event - useful for select component
    origin.on('open', placeDropdown);
    origin.on('close', hideDropdown);


   });
  }; // End dropdown plugin

  $(document).ready(function(){
    $('.dropdown-button').dropdown();
  });
}( jQuery ));
;(function($) {
    var _stack = 0,
    _lastID = 0,
    _generateID = function() {
      _lastID++;
      return 'materialize-lean-overlay-' + _lastID;
    };

  $.fn.extend({
    openModal: function(options) {

      $('body').css('overflow', 'hidden');

      var defaults = {
        opacity: 0.5,
        in_duration: 350,
        out_duration: 250,
        ready: undefined,
        complete: undefined,
        dismissible: true,
        starting_top: '4%'
      },
      overlayID = _generateID(),
      $modal = $(this),
      $overlay = $('<div class="lean-overlay"></div>'),
      lStack = (++_stack);

      // Store a reference of the overlay
      $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
      $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);

      $("body").append($overlay);

      // Override defaults
      options = $.extend(defaults, options);

      if (options.dismissible) {
        $overlay.click(function() {
          $modal.closeModal(options);
        });
        // Return on ESC
        $(document).on('keyup.leanModal' + overlayID, function(e) {
          if (e.keyCode === 27) {   // ESC key
            $modal.closeModal(options);
          }
        });
      }

      $modal.find(".modal-close").on('click.close', function(e) {
        $modal.closeModal(options);
      });

      $overlay.css({ display : "block", opacity : 0 });

      $modal.css({
        display : "block",
        opacity: 0
      });

      $overlay.velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: "easeOutCubic"});
      $modal.data('associated-overlay', $overlay[0]);

      // Define Bottom Sheet animation
      if ($modal.hasClass('bottom-sheet')) {
        $modal.velocity({bottom: "0", opacity: 1}, {
          duration: options.in_duration,
          queue: false,
          ease: "easeOutCubic",
          // Handle modal ready callback
          complete: function() {
            if (typeof(options.ready) === "function") {
              options.ready();
            }
          }
        });
      }
      else {
        $.Velocity.hook($modal, "scaleX", 0.7);
        $modal.css({ top: options.starting_top });
        $modal.velocity({top: "10%", opacity: 1, scaleX: '1'}, {
          duration: options.in_duration,
          queue: false,
          ease: "easeOutCubic",
          // Handle modal ready callback
          complete: function() {
            if (typeof(options.ready) === "function") {
              options.ready();
            }
          }
        });
      }


    }
  });

  $.fn.extend({
    closeModal: function(options) {
      var defaults = {
        out_duration: 250,
        complete: undefined
      },
      $modal = $(this),
      overlayID = $modal.data('overlay-id'),
      $overlay = $('#' + overlayID);

      options = $.extend(defaults, options);

      // Disable scrolling
      $('body').css('overflow', '');

      $modal.find('.modal-close').off('click.close');
      $(document).off('keyup.leanModal' + overlayID);

      $overlay.velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});


      // Define Bottom Sheet animation
      if ($modal.hasClass('bottom-sheet')) {
        $modal.velocity({bottom: "-100%", opacity: 0}, {
          duration: options.out_duration,
          queue: false,
          ease: "easeOutCubic",
          // Handle modal ready callback
          complete: function() {
            $overlay.css({display:"none"});

            // Call complete callback
            if (typeof(options.complete) === "function") {
              options.complete();
            }
            $overlay.remove();
            _stack--;
          }
        });
      }
      else {
        $modal.velocity(
          { top: options.starting_top, opacity: 0, scaleX: 0.7}, {
          duration: options.out_duration,
          complete:
            function() {

              $(this).css('display', 'none');
              // Call complete callback
              if (typeof(options.complete) === "function") {
                options.complete();
              }
              $overlay.remove();
              _stack--;
            }
          }
        );
      }
    }
  });

  $.fn.extend({
    leanModal: function(option) {
      return this.each(function() {

        var defaults = {
          starting_top: '4%'
        },
        // Override defaults
        options = $.extend(defaults, option);

        // Close Handlers
        $(this).click(function(e) {
          options.starting_top = ($(this).offset().top - $(window).scrollTop()) /1.15;
          var modal_id = $(this).attr("href") || '#' + $(this).data('target');
          $(modal_id).openModal(options);
          e.preventDefault();
        }); // done set on click
      }); // done return
    }
  });
})(jQuery);
;(function ($) {

  $.fn.materialbox = function () {

    return this.each(function() {

      if ($(this).hasClass('initialized')) {
        return;
      }

      $(this).addClass('initialized');

      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 275;
      var outDuration = 200;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');
      var originalWidth = 0;
      var originalHeight = 0;
      origin.wrap(placeholder);


      origin.on('click', function(){
        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.width();
        var originalHeight = origin.height();


        // If already modal, return to original
        if (doneAnimating === false) {
          returnToOriginal();
          return false;
        }
        else if (overlayActive && doneAnimating===true) {
          returnToOriginal();
          return false;
        }


        // Set states
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;

        // Set positioning for placeholder

        placeholder.css({
          width: placeholder[0].getBoundingClientRect().width,
          height: placeholder[0].getBoundingClientRect().height,
          position: 'relative',
          top: 0,
          left: 0
        });



        // Set css on origin
        origin.css({position: 'absolute', 'z-index': 1000})
        .data('width', originalWidth)
        .data('height', originalHeight);

        // Add overlay
        var overlay = $('<div id="materialbox-overlay"></div>')
          .css({
            opacity: 0
          })
          .click(function(){
            if (doneAnimating === true)
            returnToOriginal();
          });
          // Animate Overlay
          $('body').append(overlay);
          overlay.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'}
            );


        // Add and animate caption if it exists
        if (origin.data('caption') !== "") {
          var $photo_caption = $('<div class="materialbox-caption"></div>');
          $photo_caption.text(origin.data('caption'));
          $('body').append($photo_caption);
          $photo_caption.css({ "display": "inline" });
          $photo_caption.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'});
        }



        // Resize Image
        var ratio = 0;
        var widthPercent = originalWidth / windowWidth;
        var heightPercent = originalHeight / windowHeight;
        var newWidth = 0;
        var newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = originalHeight / originalWidth;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        }
        else {
          ratio = originalWidth / originalHeight;
          newWidth = (windowHeight * 0.9) * ratio;
          newHeight = windowHeight * 0.9;
        }

        // Animate image + set z-index
        if(origin.hasClass('responsive-img')) {
          origin.velocity({'max-width': newWidth, 'width': originalWidth}, {duration: 0, queue: false,
            complete: function(){
              origin.css({left: 0, top: 0})
              .velocity(
                {
                  height: newHeight,
                  width: newWidth,
                  left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
                  top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
                },
                {
                  duration: inDuration,
                  queue: false,
                  easing: 'easeOutQuad',
                  complete: function(){doneAnimating = true;}
                }
              );
            } // End Complete
          }); // End Velocity
        }
        else {
          origin.css('left', 0)
          .css('top', 0)
          .velocity(
            {
              height: newHeight,
              width: newWidth,
              left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
              top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
            },
            {
              duration: inDuration,
              queue: false,
              easing: 'easeOutQuad',
              complete: function(){doneAnimating = true;}
            }
            ); // End Velocity
        }

    }); // End origin on click


      // Return on scroll
      $(window).scroll(function() {
        if (overlayActive ) {
          returnToOriginal();
        }
      });

      // Return on ESC
      $(document).keyup(function(e) {

        if (e.keyCode === 27 && doneAnimating === true) {   // ESC key
          if (overlayActive) {
            returnToOriginal();
          }
        }
      });


      // This function returns the modaled image to the original spot
      function returnToOriginal() {

          doneAnimating = false;

          var placeholder = origin.parent('.material-placeholder');
          var windowWidth = window.innerWidth;
          var windowHeight = window.innerHeight;
          var originalWidth = origin.data('width');
          var originalHeight = origin.data('height');

          origin.velocity("stop", true);
          $('#materialbox-overlay').velocity("stop", true);
          $('.materialbox-caption').velocity("stop", true);


          $('#materialbox-overlay').velocity({opacity: 0}, {
            duration: outDuration, // Delay prevents animation overlapping
            queue: false, easing: 'easeOutQuad',
            complete: function(){
              // Remove Overlay
              overlayActive = false;
              $(this).remove();
            }
          });

          // Resize Image
          origin.velocity(
            {
              width: originalWidth,
              height: originalHeight,
              left: 0,
              top: 0
            },
            {
              duration: outDuration,
              queue: false, easing: 'easeOutQuad'
            }
          );

          // Remove Caption + reset css settings on image
          $('.materialbox-caption').velocity({opacity: 0}, {
            duration: outDuration, // Delay prevents animation overlapping
            queue: false, easing: 'easeOutQuad',
            complete: function(){
              placeholder.css({
                height: '',
                width: '',
                position: '',
                top: '',
                left: ''
              });

              origin.css({
                height: '',
                top: '',
                left: '',
                width: '',
                'max-width': '',
                position: '',
                'z-index': ''
              });

              // Remove class
              origin.removeClass('active');
              doneAnimating = true;
              $(this).remove();
            }
          });

        }
        });
};

$(document).ready(function(){
  $('.materialboxed').materialbox();
});

}( jQuery ));
;(function ($) {

    $.fn.parallax = function () {
      var window_width = $(window).width();
      // Parallax Scripts
      return this.each(function(i) {
        var $this = $(this);
        $this.addClass('parallax');

        function updateParallax(initial) {
          var container_height;
          if (window_width < 601) {
            container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
          }
          else {
            container_height = ($this.height() > 0) ? $this.height() : 500;
          }
          var $img = $this.children("img").first();
          var img_height = $img.height();
          var parallax_dist = img_height - container_height;
          var bottom = $this.offset().top + container_height;
          var top = $this.offset().top;
          var scrollTop = $(window).scrollTop();
          var windowHeight = window.innerHeight;
          var windowBottom = scrollTop + windowHeight;
          var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
          var parallax = Math.round((parallax_dist * percentScrolled));

          if (initial) {
            $img.css('display', 'block');
          }
          if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
            $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
          }

        }

        // Wait for image load
        $this.children("img").one("load", function() {
          updateParallax(true);
        }).each(function() {
          if(this.complete) $(this).load();
        });

        $(window).scroll(function() {
          window_width = $(window).width();
          updateParallax(false);
        });

        $(window).resize(function() {
          window_width = $(window).width();
          updateParallax(false);
        });

      });

    };
}( jQuery ));;(function ($) {

  var methods = {
    init : function() {
      return this.each(function() {

      // For each set of tabs, we want to keep track of
      // which tab is active and its associated content
      var $this = $(this),
          window_width = $(window).width();

      $this.width('100%');
      // Set Tab Width for each tab
      var $num_tabs = $(this).children('li').length;
      $this.children('li').each(function() {
        $(this).width((100/$num_tabs)+'%');
      });
      var $active, $content, $links = $this.find('li.tab a'),
          $tabs_width = $this.width(),
          $tab_width = $this.find('li').first().outerWidth(),
          $index = 0;

      // If the location.hash matches one of the links, use that as the active tab.
      $active = $($links.filter('[href="'+location.hash+'"]'));

      // If no match is found, use the first link or any with class 'active' as the initial active tab.
      if ($active.length === 0) {
          $active = $(this).find('li.tab a.active').first();
      }
      if ($active.length === 0) {
        $active = $(this).find('li.tab a').first();
      }

      $active.addClass('active');
      $index = $links.index($active);
      if ($index < 0) {
        $index = 0;
      }

      $content = $($active[0].hash);

      // append indicator then set indicator width to tab width
      $this.append('<div class="indicator"></div>');
      var $indicator = $this.find('.indicator');
      if ($this.is(":visible")) {
        $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
        $indicator.css({"left": $index * $tab_width});
      }
      $(window).resize(function () {
        $tabs_width = $this.width();
        $tab_width = $this.find('li').first().outerWidth();
        if ($index < 0) {
          $index = 0;
        }
        if ($tab_width !== 0 && $tabs_width !== 0) {
          $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
          $indicator.css({"left": $index * $tab_width});
        }
      });

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).hide();
      });


      // Bind the click event handler
      $this.on('click', 'a', function(e){
        if ($(this).parent().hasClass('disabled')) {
          e.preventDefault();
          return;
        }

        $tabs_width = $this.width();
        $tab_width = $this.find('li').first().outerWidth();

        // Make the old tab inactive.
        $active.removeClass('active');
        $content.hide();

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);
        $links = $this.find('li.tab a');

        // Make the tab active.
        $active.addClass('active');
        var $prev_index = $index;
        $index = $links.index($(this));
        if ($index < 0) {
          $index = 0;
        }
        // Change url to current tab
        // window.location.hash = $active.attr('href');

        $content.show();

        // Update indicator
        if (($index - $prev_index) >= 0) {
          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, { duration: 300, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"left": $index * $tab_width}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});

        }
        else {
          $indicator.velocity({"left": $index * $tab_width}, { duration: 300, queue: false, easing: 'easeOutQuad'});
          $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
        }

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });

    },
    select_tab : function( id ) {
      this.find('a[href="#' + id + '"]').trigger('click');
    }
  };

  $.fn.tabs = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
    }
  };

  $(document).ready(function(){
    $('ul.tabs').tabs();
  });
}( jQuery ));
;(function ($) {
    $.fn.tooltip = function (options) {
        var timeout = null,
        counter = null,
        started = false,
        counterInterval = null,
        margin = 5;

      // Defaults
      var defaults = {
        delay: 350
      };
      options = $.extend(defaults, options);

      //Remove previously created html
      $('.material-tooltip').remove();

      return this.each(function(){
        var origin = $(this);

      // Create Text span
      var tooltip_text = $('<span></span>').text(origin.attr('data-tooltip'));

      // Create tooltip
      var newTooltip = $('<div></div>');
      newTooltip.addClass('material-tooltip').append(tooltip_text);
      newTooltip.appendTo($('body'));

      var backdrop = $('<div></div>').addClass('backdrop');
      backdrop.appendTo(newTooltip);
      backdrop.css({ top: 0, left:0 });


     //Destroy previously binded events
    $(this).off('mouseenter mouseleave');
      // Mouse In
    $(this).on({
      mouseenter: function(e) {
        var tooltip_delay = origin.data("delay");
        tooltip_delay = (tooltip_delay === undefined || tooltip_delay === '') ? options.delay : tooltip_delay;
        counter = 0;
        counterInterval = setInterval(function(){
          counter += 10;
          if (counter >= tooltip_delay && started === false) {
            started = true;
            newTooltip.css({ display: 'block', left: '0px', top: '0px' });

            // Set Tooltip text
            newTooltip.children('span').text(origin.attr('data-tooltip'));

            // Tooltip positioning
            var originWidth = origin.outerWidth();
            var originHeight = origin.outerHeight();
            var tooltipPosition =  origin.attr('data-position');
            var tooltipHeight = newTooltip.outerHeight();
            var tooltipWidth = newTooltip.outerWidth();
            var tooltipVerticalMovement = '0px';
            var tooltipHorizontalMovement = '0px';
            var scale_factor = 8;

            if (tooltipPosition === "top") {
            // Top Position
            newTooltip.css({
              top: origin.offset().top - tooltipHeight - margin,
              left: origin.offset().left + originWidth/2 - tooltipWidth/2
            });
            tooltipVerticalMovement = '-10px';
            backdrop.css({
              borderRadius: '14px 14px 0 0',
              transformOrigin: '50% 90%',
              marginTop: tooltipHeight,
              marginLeft: (tooltipWidth/2) - (backdrop.width()/2)

            });
            }
            // Left Position
            else if (tooltipPosition === "left") {
              newTooltip.css({
                top: origin.offset().top + originHeight/2 - tooltipHeight/2,
                left: origin.offset().left - tooltipWidth - margin
              });
              tooltipHorizontalMovement = '-10px';
              backdrop.css({
                width: '14px',
                height: '14px',
                borderRadius: '14px 0 0 14px',
                transformOrigin: '95% 50%',
                marginTop: tooltipHeight/2,
                marginLeft: tooltipWidth
              });
            }
            // Right Position
            else if (tooltipPosition === "right") {
              newTooltip.css({
                top: origin.offset().top + originHeight/2 - tooltipHeight/2,
                left: origin.offset().left + originWidth + margin
              });
              tooltipHorizontalMovement = '+10px';
              backdrop.css({
                width: '14px',
                height: '14px',
                borderRadius: '0 14px 14px 0',
                transformOrigin: '5% 50%',
                marginTop: tooltipHeight/2,
                marginLeft: '0px'
              });
            }
            else {
              // Bottom Position
              newTooltip.css({
                top: origin.offset().top + origin.outerHeight() + margin,
                left: origin.offset().left + originWidth/2 - tooltipWidth/2
              });
              tooltipVerticalMovement = '+10px';
              backdrop.css({
                marginLeft: (tooltipWidth/2) - (backdrop.width()/2)
              });
            }

            // Calculate Scale to fill
            scale_factor = tooltipWidth / 8;
            if (scale_factor < 8) {
              scale_factor = 8;
            }
            if (tooltipPosition === "right" || tooltipPosition === "left") {
              scale_factor = tooltipWidth / 10;
              if (scale_factor < 6)
                scale_factor = 6;
            }

            newTooltip.velocity({ opacity: 1, marginTop: tooltipVerticalMovement, marginLeft: tooltipHorizontalMovement}, { duration: 350, queue: false });
            backdrop.css({ display: 'block' })
            .velocity({opacity:1},{duration: 55, delay: 0, queue: false})
            .velocity({scale: scale_factor}, {duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'});

          }
        }, 10); // End Interval

      // Mouse Out
      },
      mouseleave: function(){
        // Reset State
        clearInterval(counterInterval);
        counter = 0;

        // Animate back
        newTooltip.velocity({
          opacity: 0, marginTop: 0, marginLeft: 0}, { duration: 225, queue: false, delay: 275 }
        );
        backdrop.velocity({opacity: 0, scale: 1}, {
          duration:225,
          delay: 275, queue: false,
          complete: function(){
            backdrop.css('display', 'none');
            newTooltip.css('display', 'none');
            started = false;}
        });
      }
      });
    });
  };

  $(document).ready(function(){
     $('.tooltipped').tooltip();
   });
}( jQuery ));
;/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect delay
        duration: 750,

        show: function(e, element) {

            // Disable right click
            if (e.button === 2) {
                return false;
            }

            var el = element || this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 100) * 10)+')';

            // Support for touch devices
            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px'
            };

            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function']    = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function']      = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function']         = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function(e) {
            TouchHandler.touchup(e);

            var el = this;
            var width = el.clientWidth * 1.4;

            // Get first ripple
            var ripple = null;
            var ripples = el.getElementsByClassName('waves-ripple');
            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');

            // Get delay beetween mousedown and mouse leave
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            // Fade out ripple after delay
            setTimeout(function() {
                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {
                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        // Little hack to make <input> can perform waves effect
        wrapInput: function(elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;

                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                        continue;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
        /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
        touches: 0,
        allowEvent: function(e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function() {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function(e) {
            TouchHandler.allowEvent(e);
        }
    };


    /**
     * Delegated click handler for .waves-effect element.
     * returns null when .waves-effect element not in "click tree"
     */
    function getWavesEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }

        var element = null;
        var target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('waves-effect')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }

        return element;
    }

    /**
     * Bubble the click and show effect if .waves-effect elem was found
     */
    function showEffect(e) {
        var element = getWavesEffectElement(e);

        if (element !== null) {
            Effect.show(e, element);

            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }

            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }

    Waves.displayEffect = function(options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.waves-effect'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Waves to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */
    Waves.attach = function(element) {
        //FUTURE: automatically add waves classes and allow users
        // to specify them with an options param? Eg. light/classic/button
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Waves = Waves;

    document.addEventListener('DOMContentLoaded', function() {
        Waves.displayEffect();
    }, false);

})(window);
;Materialize.toast = function (message, displayLength, className, completeCallback) {
    className = className || "";

    var container = document.getElementById('toast-container');

    // Create toast container if it does not exist
    if (container === null) {
        // create notification container
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Select and append toast
    var newToast = createToast(message);

    // only append toast if message is not undefined
    if(message){
        container.appendChild(newToast);
    }

    newToast.style.top = '35px';
    newToast.style.opacity = 0;

    // Animate toast in
    Vel(newToast, { "top" : "0px", opacity: 1 }, {duration: 300,
      easing: 'easeOutCubic',
      queue: false});

    // Allows timer to be pause while being panned
    var timeLeft = displayLength;
    var counterInterval = setInterval (function(){


      if (newToast.parentNode === null)
        window.clearInterval(counterInterval);

      // If toast is not being dragged, decrease its time remaining
      if (!newToast.classList.contains('panning')) {
        timeLeft -= 20;
      }

      if (timeLeft <= 0) {
        // Animate toast out
        Vel(newToast, {"opacity": 0, marginTop: '-40px'}, { duration: 375,
            easing: 'easeOutExpo',
            queue: false,
            complete: function(){
              // Call the optional callback
              if(typeof(completeCallback) === "function")
                completeCallback();
              // Remove toast after it times out
              this[0].parentNode.removeChild(this[0]);
            }
          });
        window.clearInterval(counterInterval);
      }
    }, 20);



    function createToast(html) {

        // Create toast
        var toast = document.createElement('div');
        toast.classList.add('toast');
        if (className) {
            var classes = className.split(' ');

            for (var i = 0, count = classes.length; i < count; i++) {
                toast.classList.add(classes[i]);
            }
        }
        toast.innerHTML = html;

        // Bind hammer
        var hammerHandler = new Hammer(toast, {prevent_default: false});
        hammerHandler.on('pan', function(e) {
          var deltaX = e.deltaX;
          var activationDistance = 80;

          // Change toast state
          if (!toast.classList.contains('panning')){
            toast.classList.add('panning');
          }

          var opacityPercent = 1-Math.abs(deltaX / activationDistance);
          if (opacityPercent < 0)
            opacityPercent = 0;

          Vel(toast, {left: deltaX, opacity: opacityPercent }, {duration: 50, queue: false, easing: 'easeOutQuad'});

        });

        hammerHandler.on('panend', function(e) {
          var deltaX = e.deltaX;
          var activationDistance = 80;

          // If toast dragged past activation point
          if (Math.abs(deltaX) > activationDistance) {
            Vel(toast, {marginTop: '-40px'}, { duration: 375,
                easing: 'easeOutExpo',
                queue: false,
                complete: function(){
                  if(typeof(completeCallback) === "function") {
                    completeCallback();
                  }
                  toast.parentNode.removeChild(toast);
                }
            });

          } else {
            toast.classList.remove('panning');
            // Put toast back into original position
            Vel(toast, { left: 0, opacity: 1 }, { duration: 300,
              easing: 'easeOutExpo',
              queue: false
            });

          }
        });

        return toast;
    }
};
;(function ($) {

  var methods = {
    init : function(options) {
      var defaults = {
        menuWidth: 240,
        edge: 'left',
        closeOnClick: false
      };
      options = $.extend(defaults, options);

      $(this).each(function(){
        var $this = $(this);
        var menu_id = $("#"+ $this.attr('data-activates'));

        // Set to width
        if (options.menuWidth != 240) {
          menu_id.css('width', options.menuWidth);
        }

        // Add Touch Area
        $('body').append($('<div class="drag-target"></div>'));

        if (options.edge == 'left') {
          menu_id.css('left', -1 * (options.menuWidth + 10));
          $('.drag-target').css({'left': 0}); // Add Touch Area
        }
        else {
          menu_id.addClass('right-aligned') // Change text-alignment to right
            .css('right', -1 * (options.menuWidth + 10))
            .css('left', '');
          $('.drag-target').css({'right': 0}); // Add Touch Area
        }

        // If fixed sidenav, bring menu out
        if (menu_id.hasClass('fixed')) {
            if (window.innerWidth > 992) {
              menu_id.css('left', 0);
            }
          }

        // Window resize to reset on large screens fixed
        if (menu_id.hasClass('fixed')) {
          $(window).resize( function() {
            if (window.innerWidth > 992) {
              // Close menu if window is resized bigger than 992 and user has fixed sidenav
              if ($('#sidenav-overlay').css('opacity') !== 0 && menuOut) {
                removeMenu(true);
              }
              else {
                menu_id.removeAttr('style');
                menu_id.css('width', options.menuWidth);
              }
            }
            else if (menuOut === false){
              if (options.edge === 'left')
                menu_id.css('left', -1 * (options.menuWidth + 10));
              else
                menu_id.css('right', -1 * (options.menuWidth + 10));
            }

          });
        }

        // if closeOnClick, then add close event for all a tags in side sideNav
        if (options.closeOnClick === true) {
          menu_id.on("click.itemclick", "a:not(.collapsible-header)", function(){
            removeMenu();
          });
        }

        function removeMenu(restoreNav) {
          panning = false;
          menuOut = false;

          // Reenable scrolling
          $('body').css('overflow', '');

          $('#sidenav-overlay').velocity({opacity: 0}, {duration: 200, queue: false, easing: 'easeOutQuad',
            complete: function() {
              $(this).remove();
            } });
          if (options.edge === 'left') {
            // Reset phantom div
            $('.drag-target').css({width: '', right: '', left: '0'});
            menu_id.velocity(
              {left: -1 * (options.menuWidth + 10)},
              { duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                  if (restoreNav === true) {
                    // Restore Fixed sidenav
                    menu_id.removeAttr('style');
                    menu_id.css('width', options.menuWidth);
                  }
                }

            });
          }
          else {
            // Reset phantom div
            $('.drag-target').css({width: '', right: '0', left: ''});
            menu_id.velocity(
              {right: -1 * (options.menuWidth + 10)},
              { duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                  if (restoreNav === true) {
                    // Restore Fixed sidenav
                    menu_id.removeAttr('style');
                    menu_id.css('width', options.menuWidth);
                  }
                }
              });
          }
        }



        // Touch Event
        var panning = false;
        var menuOut = false;

        $('.drag-target').on('click', function(){
          removeMenu();
        });

        $('.drag-target').hammer({
          prevent_default: false
        }).bind('pan', function(e) {

          if (e.gesture.pointerType == "touch") {

            var direction = e.gesture.direction;
            var x = e.gesture.center.x;
            var y = e.gesture.center.y;
            var velocityX = e.gesture.velocityX;

            // Disable Scrolling
            $('body').css('overflow', 'hidden');

            // If overlay does not exist, create one and if it is clicked, close menu
            if ($('#sidenav-overlay').length === 0) {
              var overlay = $('<div id="sidenav-overlay"></div>');
              overlay.css('opacity', 0).click( function(){
                removeMenu();
              });
              $('body').append(overlay);
            }

            // Keep within boundaries
            if (options.edge === 'left') {
              if (x > options.menuWidth) { x = options.menuWidth; }
              else if (x < 0) { x = 0; }
            }

            if (options.edge === 'left') {
              // Left Direction
              if (x < (options.menuWidth / 2)) { menuOut = false; }
              // Right Direction
              else if (x >= (options.menuWidth / 2)) { menuOut = true; }

              menu_id.css('left', (x - options.menuWidth));
            }
            else {
              // Left Direction
              if (x < (window.innerWidth - options.menuWidth / 2)) {
                menuOut = true;
              }
              // Right Direction
              else if (x >= (window.innerWidth - options.menuWidth / 2)) {
               menuOut = false;
             }
              var rightPos = -1 *(x - options.menuWidth / 2);
              if (rightPos > 0) {
                rightPos = 0;
              }

              menu_id.css('right', rightPos);
            }




            // Percentage overlay
            var overlayPerc;
            if (options.edge === 'left') {
              overlayPerc = x / options.menuWidth;
              $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
            }
            else {
              overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
              $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
            }
          }

        }).bind('panend', function(e) {

          if (e.gesture.pointerType == "touch") {
            var velocityX = e.gesture.velocityX;
            panning = false;
            if (options.edge === 'left') {
              // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
              if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
                menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
                $('.drag-target').css({width: '50%', right: 0, left: ''});
              }
              else if (!menuOut || velocityX > 0.3) {
                // Enable Scrolling
                $('body').css('overflow', '');
                // Slide menu closed
                menu_id.velocity({left: -1 * (options.menuWidth + 10)}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
                  complete: function () {
                    $(this).remove();
                  }});
                $('.drag-target').css({width: '10px', right: '', left: 0});
              }
            }
            else {
              if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
                menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
                $('.drag-target').css({width: '50%', right: '', left: 0});
              }
              else if (!menuOut || velocityX < -0.3) {
                // Enable Scrolling
                $('body').css('overflow', '');
                // Slide menu closed
                menu_id.velocity({right: -1 * (options.menuWidth + 10)}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
                  complete: function () {
                    $(this).remove();
                  }});
                $('.drag-target').css({width: '10px', right: 0, left: ''});
              }
            }

          }
        });

          $this.click(function() {
            if (menuOut === true) {
              menuOut = false;
              panning = false;
              removeMenu();
            }
            else {

              // Disable Scrolling
              $('body').css('overflow', 'hidden');

              if (options.edge === 'left') {
                $('.drag-target').css({width: '50%', right: 0, left: ''});
                menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
              }
              else {
                $('.drag-target').css({width: '50%', right: '', left: 0});
                menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                menu_id.css('left','');
              }

              var overlay = $('<div id="sidenav-overlay"></div>');
              overlay.css('opacity', 0)
              .click(function(){
                menuOut = false;
                panning = false;
                removeMenu();
                overlay.velocity({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
                  complete: function() {
                    $(this).remove();
                  } });

              });
              $('body').append(overlay);
              overlay.velocity({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  menuOut = true;
                  panning = false;
                }
              });
            }

            return false;
          });
      });


    },
    show : function() {
      this.trigger('click');
    },
    hide : function() {
      $('#sidenav-overlay').trigger('click');
    }
  };


    $.fn.sideNav = function(methodOrOptions) {
      if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        // Default to "init"
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.sideNav' );
      }
    }; // Plugin end
}( jQuery ));
;/**
 * Extend jquery with a scrollspy plugin.
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.1.2
 */
(function($) {

	var jWindow = $(window);
	var elements = [];
	var elementsInView = [];
	var isSpying = false;
	var ticks = 0;
	var unique_id = 1;
	var offset = {
		top : 0,
		right : 0,
		bottom : 0,
		left : 0,
	}

	/**
	 * Find elements that are within the boundary
	 * @param {number} top
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} left
	 * @return {jQuery}		A collection of elements
	 */
	function findElements(top, right, bottom, left) {
		var hits = $();
		$.each(elements, function(i, element) {
			if (element.height() > 0) {
				var elTop = element.offset().top,
					elLeft = element.offset().left,
					elRight = elLeft + element.width(),
					elBottom = elTop + element.height();

				var isIntersect = !(elLeft > right ||
					elRight < left ||
					elTop > bottom ||
					elBottom < top);

				if (isIntersect) {
					hits.push(element);
				}
			}
		});

		return hits;
	}


	/**
	 * Called when the user scrolls the window
	 */
	function onScroll() {
		// unique tick id
		++ticks;

		// viewport rectangle
		var top = jWindow.scrollTop(),
			left = jWindow.scrollLeft(),
			right = left + jWindow.width(),
			bottom = top + jWindow.height();

		// determine which elements are in view
//        + 60 accounts for fixed nav
		var intersections = findElements(top+offset.top + 200, right+offset.right, bottom+offset.bottom, left+offset.left);
		$.each(intersections, function(i, element) {

			var lastTick = element.data('scrollSpy:ticks');
			if (typeof lastTick != 'number') {
				// entered into view
				element.triggerHandler('scrollSpy:enter');
			}

			// update tick id
			element.data('scrollSpy:ticks', ticks);
		});

		// determine which elements are no longer in view
		$.each(elementsInView, function(i, element) {
			var lastTick = element.data('scrollSpy:ticks');
			if (typeof lastTick == 'number' && lastTick !== ticks) {
				// exited from view
				element.triggerHandler('scrollSpy:exit');
				element.data('scrollSpy:ticks', null);
			}
		});

		// remember elements in view for next tick
		elementsInView = intersections;
	}

	/**
	 * Called when window is resized
	*/
	function onWinSize() {
		jWindow.trigger('scrollSpy:winSize');
	}

	/**
	 * Get time in ms
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @type {function}
	 * @return {number}
	 */
	var getTime = (Date.now || function () {
		return new Date().getTime();
	});

	/**
	 * Returns a function, that, when invoked, will only be triggered at most once
	 * during a given window of time. Normally, the throttled function will run
	 * as much as it can, without ever going more than once per `wait` duration;
	 * but if you'd like to disable the execution on the leading edge, pass
	 * `{leading: false}`. To disable execution on the trailing edge, ditto.
	 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @param {function} func
	 * @param {number} wait
	 * @param {Object=} options
	 * @returns {Function}
	 */
	function throttle(func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		options || (options = {});
		var later = function () {
			previous = options.leading === false ? 0 : getTime();
			timeout = null;
			result = func.apply(context, args);
			context = args = null;
		};
		return function () {
			var now = getTime();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0) {
				clearTimeout(timeout);
				timeout = null;
				previous = now;
				result = func.apply(context, args);
				context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};

	/**
	 * Enables ScrollSpy using a selector
	 * @param {jQuery|string} selector  The elements collection, or a selector
	 * @param {Object=} options	Optional.
        throttle : number -> scrollspy throttling. Default: 100 ms
        offsetTop : number -> offset from top. Default: 0
        offsetRight : number -> offset from right. Default: 0
        offsetBottom : number -> offset from bottom. Default: 0
        offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
	$.scrollSpy = function(selector, options) {
		var visible = [];
		selector = $(selector);
		selector.each(function(i, element) {
			elements.push($(element));
			$(element).data("scrollSpy:id", i);
			// Smooth scroll to section
		  $('a[href=#' + $(element).attr('id') + ']').click(function(e) {
		    e.preventDefault();
		    var offset = $(this.hash).offset().top + 1;

//          offset - 200 allows elements near bottom of page to scroll
			
	    	$('html, body').animate({ scrollTop: offset - 200 }, {duration: 400, queue: false, easing: 'easeOutCubic'});
			
		  });
		});
		options = options || {
			throttle: 100
		};

		offset.top = options.offsetTop || 0;
		offset.right = options.offsetRight || 0;
		offset.bottom = options.offsetBottom || 0;
		offset.left = options.offsetLeft || 0;

		var throttledScroll = throttle(onScroll, options.throttle || 100);
		var readyScroll = function(){
			$(document).ready(throttledScroll);
		};

		if (!isSpying) {
			jWindow.on('scroll', readyScroll);
			jWindow.on('resize', readyScroll);
			isSpying = true;
		}

		// perform a scan once, after current execution context, and after dom is ready
		setTimeout(readyScroll, 0);


		selector.on('scrollSpy:enter', function() {
			visible = $.grep(visible, function(value) {
	      return value.height() != 0;
	    });

			var $this = $(this);

			if (visible[0]) {
				$('a[href=#' + visible[0].attr('id') + ']').removeClass('active');
				if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
					visible.unshift($(this));
				}
				else {
					visible.push($(this));
				}
			}
			else {
				visible.push($(this));
			}


			$('a[href=#' + visible[0].attr('id') + ']').addClass('active');
		});
		selector.on('scrollSpy:exit', function() {
			visible = $.grep(visible, function(value) {
	      return value.height() != 0;
	    });

			if (visible[0]) {
				$('a[href=#' + visible[0].attr('id') + ']').removeClass('active');
				var $this = $(this);
				visible = $.grep(visible, function(value) {
	        return value.attr('id') != $this.attr('id');
	      });
	      if (visible[0]) { // Check if empty
					$('a[href=#' + visible[0].attr('id') + ']').addClass('active');
	      }
			}
		});

		return selector;
	};

	/**
	 * Listen for window resize events
	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
	 * @returns {jQuery}		$(window)
	 */
	$.winSizeSpy = function(options) {
		$.winSizeSpy = function() { return jWindow; }; // lock from multiple calls
		options = options || {
			throttle: 100
		};
		return jWindow.on('resize', throttle(onWinSize, options.throttle || 100));
	};

	/**
	 * Enables ScrollSpy on a collection of elements
	 * e.g. $('.scrollSpy').scrollSpy()
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
	$.fn.scrollSpy = function(options) {
		return $.scrollSpy($(this), options);
	};

})(jQuery);;(function ($) {
  $(document).ready(function() {

    // Function to update labels of text fields
    Materialize.updateTextFields = function() {
      var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
      $(input_selector).each(function(index, element) {
        if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
          $(this).siblings('label, i').addClass('active');
        }
        else {
          $(this).siblings('label, i').removeClass('active');
        }
      });
    };

    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Handle HTML5 autofocus
    $('input[autofocus]').siblings('label, i').addClass('active');

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
        $(this).siblings('label, i').addClass('active');
      }
      validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function() {
      Materialize.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function(e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function () {
          if ($(this).attr('value') === '') {
            $(this).siblings('label, i').removeClass('active');
          }
        });

        // Reset select
        formReset.find('select.initialized').each(function () {
          var reset_text = formReset.find('option[selected]').text();
          formReset.siblings('input.select-dropdown').val(reset_text);
        });
      }
    });

    // Add active when element has focus
    $(document).on('focus', input_selector, function () {
      $(this).siblings('label, i').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      var $inputElement = $(this);
      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
        $inputElement.siblings('label, i').removeClass('active');
      }
      validate_field($inputElement);
    });

    validate_field = function(object) {
      var hasLength = object.attr('length') !== undefined;
      var lenAttr = parseInt(object.attr('length'));
      var len = object.val().length;

      if (object.val().length === 0 && object[0].validity.badInput === false) {
        if (object.hasClass('validate')) {
          object.removeClass('valid');
          object.removeClass('invalid');
        }
      }
      else {
        if (object.hasClass('validate')) {
          // Check for character counter attributes
          if ((object.is(':valid') && hasLength && (len < lenAttr)) || (object.is(':valid') && !hasLength)) {
            object.removeClass('invalid');
            object.addClass('valid');
          }
          else {
            object.removeClass('valid');
            object.addClass('invalid');
          }
        }
      }
    };


    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }
    var text_area_selector = '.materialize-textarea';

    function textareaAutoResize($textarea) {
      // Set font properties of hiddenDiv

      var fontFamily = $textarea.css('font-family');
      var fontSize = $textarea.css('font-size');

      if (fontSize) { hiddenDiv.css('font-size', fontSize); }
      if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }

      if ($textarea.attr('wrap') === "off") {
        hiddenDiv.css('overflow-wrap', "normal")
                 .css('white-space', "pre");
      }




      hiddenDiv.text($textarea.val() + '\n');
      var content = hiddenDiv.html().replace(/\n/g, '<br>');
      hiddenDiv.html(content);


      // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      if ($textarea.is(':visible')) {
        hiddenDiv.css('width', $textarea.width());
      }
      else {
        hiddenDiv.css('width', $(window).width()/2);
      }

      $textarea.css('height', hiddenDiv.height());
    }

    $(text_area_selector).each(function () {
      var $textarea = $(this);
      if ($textarea.val().length) {
        textareaAutoResize($textarea);
      }
    });

    $('body').on('keyup keydown', text_area_selector, function () {
      textareaAutoResize($(this));
    });


    // File Input Path
    $('.file-field').each(function() {
      var path_input = $(this).find('input.file-path');
      $(this).find('input[type="file"]').change(function () {
        path_input.val($(this)[0].files[0].name);
        path_input.trigger('change');
      });
    });



    /****************
    *  Range Input  *
    ****************/

    var range_type = 'input[type=range]';
    var range_mousedown = false;
    var left;

    $(range_type).each(function () {
      var thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).after(thumb);
    });

    var range_wrapper = '.range-field';
    $(document).on('change', range_type, function(e) {
      var thumb = $(this).siblings('.thumb');
      thumb.find('.value').html($(this).val());
    });

    $(document).on('mousedown touchstart', range_type, function(e) {
      var thumb = $(this).siblings('.thumb');

      // If thumb indicator does not exist yet, create it
      if (thumb.length <= 0) {
        thumb = $('<span class="thumb"><span class="value"></span></span>');
        $(this).append(thumb);
      }

      // Set indicator value
      thumb.find('.value').html($(this).val());

      range_mousedown = true;
      $(this).addClass('active');

      if (!thumb.hasClass('active')) {
        thumb.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px"}, { duration: 300, easing: 'easeOutExpo' });
      }

      if(e.pageX === undefined || e.pageX === null){//mobile
         left = e.originalEvent.touches[0].pageX - $(this).offset().left;
      }
      else{ // desktop
         left = e.pageX - $(this).offset().left;
      }
      var width = $(this).outerWidth();

      if (left < 0) {
        left = 0;
      }
      else if (left > width) {
        left = width;
      }
      thumb.addClass('active').css('left', left);
      thumb.find('.value').html($(this).val());


    });

    $(document).on('mouseup touchend', range_wrapper, function() {
      range_mousedown = false;
      $(this).removeClass('active');
    });

    $(document).on('mousemove touchmove', range_wrapper, function(e) {
      var thumb = $(this).children('.thumb');
      var left;
      if (range_mousedown) {
        if (!thumb.hasClass('active')) {
          thumb.velocity({ height: '30px', width: '30px', top: '-20px', marginLeft: '-15px'}, { duration: 300, easing: 'easeOutExpo' });
        }
        if (e.pageX === undefined || e.pageX === null) { //mobile
          left = e.originalEvent.touches[0].pageX - $(this).offset().left;
        }
        else{ // desktop
          left = e.pageX - $(this).offset().left;
        }
        var width = $(this).outerWidth();

        if (left < 0) {
          left = 0;
        }
        else if (left > width) {
          left = width;
        }
        thumb.addClass('active').css('left', left);

      }

    });

    $(document).on('mouseout touchleave', range_wrapper, function() {
      if (!range_mousedown) {

        var thumb = $(this).children('.thumb');

        if (thumb.hasClass('active')) {
          thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: '-6px'}, { duration: 100 });
        }
        thumb.removeClass('active');
      }
    });

  }); // End of $(document).ready




  // Select Plugin
  $.fn.material_select = function (callback) {
    $(this).each(function(){
      $select = $(this);

      if ( $select.hasClass('browser-default')) {
        return; // Continue to next (return false breaks out of entire loop)
      }

      // Tear down structure if Select needs to be rebuilt
      var lastID = $select.data('select-id');
      if (lastID) {
        $select.parent().find('i').remove();
        $select.parent().find('input').remove();

        $select.unwrap();
        $('ul#select-options-'+lastID).remove();
      }

      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
      if(callback === 'destroy') {
          $select.data('select-id', null).removeClass('initialized');
          return;
      }

      var uniqueID = Materialize.guid();
      $select.data('select-id', uniqueID);
      var wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      var options = $('<ul id="select-options-' + uniqueID+'" class="dropdown-content select-dropdown"></ul>');
      var selectOptions = $select.children('option');

      var label;
      if ($select.find('option:selected') !== undefined) {
        label = $select.find('option:selected');
      }
      else {
        label = options.first();
      }


      // Create Dropdown structure
      selectOptions.each(function () {
        // Add disabled attr if disabled
        options.append($('<li class="' + (($(this).is(':disabled')) ? 'disabled' : '') + '"><span>' + $(this).html() + '</span></li>'));
      });


      options.find('li').each(function (i) {
        var $curr_select = $select;
        $(this).click(function () {
          // Check if option element is disabled
          if (!$(this).hasClass('disabled')) {
            $curr_select.find('option').eq(i).prop('selected', true);
            // Trigger onchange() event
            $curr_select.trigger('change');
            $curr_select.siblings('input.select-dropdown').val($(this).text());
            if (typeof callback !== 'undefined') callback();
          }
        });

      });

      // Wrap Elements
      $select.wrap(wrapper);
      // Add Select Display Element
      var dropdownIcon = $('<span class="caret">&#9660;</span>');
      if ( $select.is(':disabled') )
        dropdownIcon.addClass('disabled');

      var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID +'" value="'+ label.html() +'"/>');
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);

      $('body').append(options);
      // Check if section element is disabled
      if (!$select.is(':disabled')) {
        $newSelect.dropdown({"hover": false});
      }

      // Copy tabindex
      if ($select.attr('tabindex')) {
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      }

      $select.addClass('initialized');

      $newSelect.on('focus', function(){
        $(this).trigger('open');
        label = $(this).val();
        selectedOption = options.find('li').filter(function() {
          return $(this).text().toLowerCase() === label.toLowerCase();
        })[0];
        activateOption(options, selectedOption);
      });

      $newSelect.on('blur', function(){
        $(this).trigger('close');
      });

      // Make option as selected and scroll to selected position
      activateOption = function(collection, newOption) {
        collection.find('li.active').removeClass('active');
        $(newOption).addClass('active');
        collection.scrollTo(newOption);
      };

      // Allow user to search by typing
      // this array is cleared after 1 second
      filterQuery = [];

      onKeyDown = function(event){
        // TAB - switch to another input
        if(event.which == 9){
          $newSelect.trigger('close');
          return;
        }

        // ARROW DOWN WHEN SELECT IS CLOSED - open select options
        if(event.which == 40 && !options.is(":visible")){
          $newSelect.trigger('open');
          return;
        }

        // ENTER WHEN SELECT IS CLOSED - submit form
        if(event.which == 13 && !options.is(":visible")){
          return;
        }

        event.preventDefault();

        // CASE WHEN USER TYPE LETTERS
        letter = String.fromCharCode(event.which).toLowerCase();
        var nonLetters = [9,13,27,38,40];
        if (letter && (nonLetters.indexOf(event.which) === -1)){
          filterQuery.push(letter);

          string = filterQuery.join("");

          newOption = options.find('li').filter(function() {
            return $(this).text().toLowerCase().indexOf(string) === 0;
          })[0];

          if(newOption){
            activateOption(options, newOption);
          }
        }

        // ENTER - select option and close when select options are opened
        if(event.which == 13){
          activeOption = options.find('li.active:not(.disabled)')[0];
          if(activeOption){
            $(activeOption).trigger('click');
            $newSelect.trigger('close');
          }
        }

        // ARROW DOWN - move to next not disabled option
        if(event.which == 40){
          newOption = options.find('li.active').next('li:not(.disabled)')[0];
          if(newOption){
            activateOption(options, newOption);
          }
        }

        // ESC - close options
        if(event.which == 27){
          $newSelect.trigger('close');
        }

        // ARROW UP - move to previous not disabled option
        if(event.which == 38){
          newOption = options.find('li.active').prev('li:not(.disabled)')[0];
          if(newOption){
            activateOption(options, newOption);
          }
        }

        // Automaticaly clean filter query so user can search again by starting letters
        setTimeout(function(){ filterQuery = []; }, 1000);
      };

      $newSelect.on('keydown', onKeyDown);
    });
  };

}( jQuery ));
;(function ($) {

  var methods = {

    init : function(options) {
      var defaults = {
        indicators: true,
        height: 400,
        transition: 500,
        interval: 6000
      };
      options = $.extend(defaults, options);

      return this.each(function() {

        // For each slider, we want to keep track of
        // which slide is active and its associated content
        var $this = $(this);
        var $slider = $this.find('ul.slides').first();
        var $slides = $slider.find('li');
        var $active_index = $slider.find('.active').index();
        var $active;
        if ($active_index != -1) { $active = $slides.eq($active_index); }

        // Transitions the caption depending on alignment
        function captionTransition(caption, duration) {
          if (caption.hasClass("center-align")) {
            caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
          }
          else if (caption.hasClass("right-align")) {
            caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
          }
          else if (caption.hasClass("left-align")) {
            caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
          }
        }

        // This function will transition the slide to any index of the next slide
        function moveToSlide(index) {
          if (index >= $slides.length) index = 0;
          else if (index < 0) index = $slides.length -1;

          $active_index = $slider.find('.active').index();

          // Only do if index changes
          if ($active_index != index) {
            $active = $slides.eq($active_index);
            $caption = $active.find('.caption');

            $active.removeClass('active');
            $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
                              complete: function() {
                                $slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
                              } });
            captionTransition($caption, options.transition);


            // Update indicators
            if (options.indicators) {
              $indicators.eq($active_index).removeClass('active');
            }

            $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
            $slides.eq(index).addClass('active');


            // Update indicators
            if (options.indicators) {
              $indicators.eq(index).addClass('active');
            }
          }
        }

        // Set height of slider
        // If fullscreen, do nothing
        if (!$this.hasClass('fullscreen')) {
          if (options.indicators) {
            // Add height if indicators are present
            $this.height(options.height + 40);
          }
          else {
            $this.height(options.height);
          }
          $slider.height(options.height);
        }


        // Set initial positions of captions
        $slides.find('.caption').each(function () {
          captionTransition($(this), 0);
        });

        // Move img src into background-image
        $slides.find('img').each(function () {
          $(this).css('background-image', 'url(' + $(this).attr('src') + ')' );
          $(this).attr('src', 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
        });

        // dynamically add indicators
        if (options.indicators) {
          var $indicators = $('<ul class="indicators"></ul>');
          $slides.each(function( index ) {
            var $indicator = $('<li class="indicator-item"></li>');

            // Handle clicks on indicators
            $indicator.click(function () {
              var $parent = $slider.parent();
              var curr_index = $parent.find($(this)).index();
              moveToSlide(curr_index);

              // reset interval
              clearInterval($interval);
              $interval = setInterval(
                function(){
                  $active_index = $slider.find('.active').index();
                  if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                  else $active_index += 1;

                  moveToSlide($active_index);

                }, options.transition + options.interval
              );
            });
            $indicators.append($indicator);
          });
          $this.append($indicators);
          $indicators = $this.find('ul.indicators').find('li.indicator-item');
        }

        if ($active) {
          $active.show();
        }
        else {
          $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});

          $active_index = 0;
          $active = $slides.eq($active_index);

          // Update indicators
          if (options.indicators) {
            $indicators.eq($active_index).addClass('active');
          }
        }

        // Adjust height to current slide
        $active.find('img').each(function() {
          $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
        });

        // auto scroll
        $interval = setInterval(
          function(){
            $active_index = $slider.find('.active').index();
            moveToSlide($active_index + 1);

          }, options.transition + options.interval
        );


        // HammerJS, Swipe navigation

        // Touch Event
        var panning = false;
        var swipeLeft = false;
        var swipeRight = false;

        $this.hammer({
            prevent_default: false
        }).bind('pan', function(e) {
          if (e.gesture.pointerType === "touch") {

            // reset interval
            clearInterval($interval);

            var direction = e.gesture.direction;
            var x = e.gesture.deltaX;
            var velocityX = e.gesture.velocityX;

            $curr_slide = $slider.find('.active');
            $curr_slide.velocity({ translateX: x
                }, {duration: 50, queue: false, easing: 'easeOutQuad'});

            // Swipe Left
            if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
              swipeRight = true;
            }
            // Swipe Right
            else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
              swipeLeft = true;
            }

            // Make Slide Behind active slide visible
            var next_slide;
            if (swipeLeft) {
              next_slide = $curr_slide.next();
              if (next_slide.length === 0) {
                next_slide = $slides.first();
              }
              next_slide.velocity({ opacity: 1
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            if (swipeRight) {
              next_slide = $curr_slide.prev();
              if (next_slide.length === 0) {
                next_slide = $slides.last();
              }
              next_slide.velocity({ opacity: 1
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }


          }

        }).bind('panend', function(e) {
          if (e.gesture.pointerType === "touch") {

            $curr_slide = $slider.find('.active');
            panning = false;
            curr_index = $slider.find('.active').index();

            if (!swipeRight && !swipeLeft) {
              // Return to original spot
              $curr_slide.velocity({ translateX: 0
                  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
            }
            else if (swipeLeft) {
              moveToSlide(curr_index + 1);
              $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });
            }
            else if (swipeRight) {
              moveToSlide(curr_index - 1);
              $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
                                    complete: function() {
                                      $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                    } });
            }
            swipeLeft = false;
            swipeRight = false;

            // Restart interval
            clearInterval($interval);
            $interval = setInterval(
              function(){
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                else $active_index += 1;

                moveToSlide($active_index);

              }, options.transition + options.interval
            );
          }
        });

        $this.on('sliderPause', function() {
          clearInterval($interval);
        });

        $this.on('sliderStart', function() {
          clearInterval($interval);
          $interval = setInterval(
            function(){
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;

              moveToSlide($active_index);

            }, options.transition + options.interval
          );
        });

      });



    },
    pause : function() {
      $(this).trigger('sliderPause');
    },
    start : function() {
      $(this).trigger('sliderStart');
    }
  };


    $.fn.slider = function(methodOrOptions) {
      if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        // Default to "init"
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
      }
    }; // Plugin end
}( jQuery ));;(function ($) {
  $(document).ready(function() {

    $(document).on('click.card', '.card', function (e) {
      if ($(this).find('.card-reveal').length) {
        if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
          // Make Reveal animate down and display none
          $(this).find('.card-reveal').velocity(
            {translateY: 0}, {
              duration: 225,
              queue: false,
              easing: 'easeInOutQuad',
              complete: function() { $(this).css({ display: 'none'}); }
            }
          );
        }
        else if ($(e.target).is($('.card .activator')) ||
                 $(e.target).is($('.card .activator i')) ) {
          $(this).find('.card-reveal').css({ display: 'block'}).velocity("stop", false).velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'});
        }
      }


    });

  });
}( jQuery ));;(function ($) {
  $(document).ready(function() {

    $.fn.pushpin = function (options) {

      var defaults = {
        top: 0,
        bottom: Infinity,
        offset: 0
      }
      options = $.extend(defaults, options);

      $index = 0;
      return this.each(function() {
        var $uniqueId = Materialize.guid(),
            $this = $(this),
            $original_offset = $(this).offset().top;

        function removePinClasses(object) {
          object.removeClass('pin-top');
          object.removeClass('pinned');
          object.removeClass('pin-bottom');
        }

        function updateElements(objects, scrolled) {
          objects.each(function () {
            // Add position fixed (because its between top and bottom)
            if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {
              removePinClasses($(this));
              $(this).css('top', options.offset);
              $(this).addClass('pinned');
            }

            // Add pin-top (when scrolled position is above top)
            if (scrolled < options.top && !$(this).hasClass('pin-top')) {
              removePinClasses($(this));
              $(this).css('top', 0);
              $(this).addClass('pin-top');
            }

            // Add pin-bottom (when scrolled position is below bottom)
            if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
              removePinClasses($(this));
              $(this).addClass('pin-bottom');
              $(this).css('top', options.bottom - $original_offset);
            }
          });
        }

        updateElements($this, $(window).scrollTop());
        $(window).on('scroll.' + $uniqueId, function () {
          var $scrolled = $(window).scrollTop() + options.offset;
          updateElements($this, $scrolled);
        });

      });

    };


  });
}( jQuery ));;(function ($) {
  $(document).ready(function() {

    // jQuery reverse
    $.fn.reverse = [].reverse;

    $(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn', function(e) {
      var $this = $(this);
      openFABMenu($this);

    });

    $(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn', function(e) {
      var $this = $(this);
      closeFABMenu($this);
    });

  });

  $.fn.extend({
    openFAB: function() {
      var $this = $(this);
      openFABMenu($this);
    },
    closeFAB: function() {
      closeFABMenu($this);
    }
  });


  var openFABMenu = function (btn) {
    $this = btn;
    if ($this.hasClass('active') === false) {
      $this.addClass('active');
      $this.find('ul .btn-floating').velocity(
        { scaleY: ".4", scaleX: ".4", translateY: "40px"},
        { duration: 0 });

      var time = 0;
      $this.find('ul .btn-floating').reverse().each(function () {
        $(this).velocity(
          { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0"},
          { duration: 80, delay: time });
        time += 40;
      });
    }
  };

  var closeFABMenu = function (btn) {
    $this = btn;
    $this.removeClass('active');
    var time = 0;
    $this.find('ul .btn-floating').velocity("stop", true);
    $this.find('ul .btn-floating').velocity(
      { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: "40px"},
      { duration: 80 }
    );
  };


}( jQuery ));
;(function ($) {
  // Image transition function
  Materialize.fadeInImage =  function(selector){
    var element = $(selector);
    element.css({opacity: 0});
    $(element).velocity({opacity: 1}, {
        duration: 650,
        queue: false,
        easing: 'easeOutSine'
      });
    $(element).velocity({opacity: 1}, {
          duration: 1300,
          queue: false,
          easing: 'swing',
          step: function(now, fx) {
              fx.start = 100;
              var grayscale_setting = now/100;
              var brightness_setting = 150 - (100 - now)/1.75;

              if (brightness_setting < 100) {
                brightness_setting = 100;
              }
              if (now >= 0) {
                $(this).css({
                    "-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",
                    "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"
                });
              }
          }
      });
  };

  // Horizontal staggered list
  Materialize.showStaggeredList = function(selector) {
    var time = 0;
    $(selector).find('li').velocity(
        { translateX: "-100px"},
        { duration: 0 });

    $(selector).find('li').each(function() {
      $(this).velocity(
        { opacity: "1", translateX: "0"},
        { duration: 800, delay: time, easing: [60, 10] });
      time += 120;
    });
  };


  $(document).ready(function() {
    // Hardcoded .staggered-list scrollFire
    // var staggeredListOptions = [];
    // $('ul.staggered-list').each(function (i) {

    //   var label = 'scrollFire-' + i;
    //   $(this).addClass(label);
    //   staggeredListOptions.push(
    //     {selector: 'ul.staggered-list.' + label,
    //      offset: 200,
    //      callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
    // });
    // scrollFire(staggeredListOptions);

    // HammerJS, Swipe navigation

    // Touch Event
    var swipeLeft = false;
    var swipeRight = false;


    // Dismissible Collections
    $('.dismissable').each(function() {
      $(this).hammer({
        prevent_default: false
      }).bind('pan', function(e) {
        if (e.gesture.pointerType === "touch") {
          var $this = $(this);
          var direction = e.gesture.direction;
          var x = e.gesture.deltaX;
          var velocityX = e.gesture.velocityX;

          $this.velocity({ translateX: x
              }, {duration: 50, queue: false, easing: 'easeOutQuad'});

          // Swipe Left
          if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {
            swipeLeft = true;
          }

          // Swipe Right
          if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {
            swipeRight = true;
          }
        }
      }).bind('panend', function(e) {
        // Reset if collection is moved back into original position
        if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
          swipeRight = false;
          swipeLeft = false;
        }

        if (e.gesture.pointerType === "touch") {
          var $this = $(this);
          if (swipeLeft || swipeRight) {
            var fullWidth;
            if (swipeLeft) { fullWidth = $this.innerWidth(); }
            else { fullWidth = -1 * $this.innerWidth(); }

            $this.velocity({ translateX: fullWidth,
              }, {duration: 100, queue: false, easing: 'easeOutQuad', complete:
              function() {
                $this.css('border', 'none');
                $this.velocity({ height: 0, padding: 0,
                  }, {duration: 200, queue: false, easing: 'easeOutQuad', complete:
                    function() { $this.remove(); }
                  });
              }
            });
          }
          else {
            $this.velocity({ translateX: 0,
              }, {duration: 100, queue: false, easing: 'easeOutQuad'});
          }
          swipeLeft = false;
          swipeRight = false;
        }
      });

    });


    // time = 0
    // // Vertical Staggered list
    // $('ul.staggered-list.vertical li').velocity(
    //     { translateY: "100px"},
    //     { duration: 0 });

    // $('ul.staggered-list.vertical li').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", translateY: "0"},
    //     { duration: 800, delay: time, easing: [60, 25] });
    //   time += 120;
    // });

    // // Fade in and Scale
    // $('.fade-in.scale').velocity(
    //     { scaleX: .4, scaleY: .4, translateX: -600},
    //     { duration: 0});
    // $('.fade-in').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
    //     { duration: 800, easing: [60, 10] });
    // });
  });
}( jQuery ));
;(function($) {

  // Input: Array of JSON objects {selector, offset, callback}

  Materialize.scrollFire = function(options) {

    var didScroll = false;

    window.addEventListener("scroll", function() {
      didScroll = true;
    });

    // Rate limit to 100ms
    setInterval(function() {
      if(didScroll) {
          didScroll = false;

          var windowScroll = window.pageYOffset + window.innerHeight;

          for (var i = 0 ; i < options.length; i++) {
            // Get options from each line
            var value = options[i];
            var selector = value.selector,
                offset = value.offset,
                callback = value.callback;

            var currentElement = document.querySelector(selector);
            if ( currentElement !== null) {
              var elementOffset = currentElement.getBoundingClientRect().top + document.body.scrollTop;

              if (windowScroll > (elementOffset + offset)) {
                if (value.done !== true) {
                  var callbackFunc = new Function(callback);
                  callbackFunc();
                  value.done = true;
                }
              }
            }
          }
      }
    }, 100);
  };

})(jQuery);;/*!
 * pickadate.js v3.5.0, 2014/04/13
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */

(function ( factory ) {

    // AMD.
    if ( typeof define == 'function' && define.amd )
        define( 'picker', ['jquery'], factory )

    // Node.js/browserify.
    else if ( typeof exports == 'object' )
        module.exports = factory( require('jquery') )

    // Browser globals.
    else this.Picker = factory( jQuery )

}(function( $ ) {

var $window = $( window )
var $document = $( document )
var $html = $( document.documentElement )


/**
 * The picker constructor that creates a blank picker.
 */
function PickerConstructor( ELEMENT, NAME, COMPONENT, OPTIONS ) {

    // If there’s no element, return the picker constructor.
    if ( !ELEMENT ) return PickerConstructor


    var
        IS_DEFAULT_THEME = false,


        // The state of the picker.
        STATE = {
            id: ELEMENT.id || 'P' + Math.abs( ~~(Math.random() * new Date()) )
        },


        // Merge the defaults and options passed.
        SETTINGS = COMPONENT ? $.extend( true, {}, COMPONENT.defaults, OPTIONS ) : OPTIONS || {},


        // Merge the default classes with the settings classes.
        CLASSES = $.extend( {}, PickerConstructor.klasses(), SETTINGS.klass ),


        // The element node wrapper into a jQuery object.
        $ELEMENT = $( ELEMENT ),


        // Pseudo picker constructor.
        PickerInstance = function() {
            return this.start()
        },


        // The picker prototype.
        P = PickerInstance.prototype = {

            constructor: PickerInstance,

            $node: $ELEMENT,


            /**
             * Initialize everything
             */
            start: function() {

                // If it’s already started, do nothing.
                if ( STATE && STATE.start ) return P


                // Update the picker states.
                STATE.methods = {}
                STATE.start = true
                STATE.open = false
                STATE.type = ELEMENT.type


                // Confirm focus state, convert into text input to remove UA stylings,
                // and set as readonly to prevent keyboard popup.
                ELEMENT.autofocus = ELEMENT == getActiveElement()
                ELEMENT.readOnly = !SETTINGS.editable
                ELEMENT.id = ELEMENT.id || STATE.id
                if ( ELEMENT.type != 'text' ) {
                    ELEMENT.type = 'text'
                }


                // Create a new picker component with the settings.
                P.component = new COMPONENT(P, SETTINGS)


                // Create the picker root with a holder and then prepare it.
                P.$root = $( PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"') )
                prepareElementRoot()


                // If there’s a format for the hidden input element, create the element.
                if ( SETTINGS.formatSubmit ) {
                    prepareElementHidden()
                }


                // Prepare the input element.
                prepareElement()


                // Insert the root as specified in the settings.
                if ( SETTINGS.container ) $( SETTINGS.container ).append( P.$root )
                else $ELEMENT.after( P.$root )


                // Bind the default component and settings events.
                P.on({
                    start: P.component.onStart,
                    render: P.component.onRender,
                    stop: P.component.onStop,
                    open: P.component.onOpen,
                    close: P.component.onClose,
                    set: P.component.onSet
                }).on({
                    start: SETTINGS.onStart,
                    render: SETTINGS.onRender,
                    stop: SETTINGS.onStop,
                    open: SETTINGS.onOpen,
                    close: SETTINGS.onClose,
                    set: SETTINGS.onSet
                })


                // Once we’re all set, check the theme in use.
                IS_DEFAULT_THEME = isUsingDefaultTheme( P.$root.children()[ 0 ] )


                // If the element has autofocus, open the picker.
                if ( ELEMENT.autofocus ) {
                    P.open()
                }


                // Trigger queued the “start” and “render” events.
                return P.trigger( 'start' ).trigger( 'render' )
            }, //start


            /**
             * Render a new picker
             */
            render: function( entireComponent ) {

                // Insert a new component holder in the root or box.
                if ( entireComponent ) P.$root.html( createWrappedComponent() )
                else P.$root.find( '.' + CLASSES.box ).html( P.component.nodes( STATE.open ) )

                // Trigger the queued “render” events.
                return P.trigger( 'render' )
            }, //render


            /**
             * Destroy everything
             */
            stop: function() {

                // If it’s already stopped, do nothing.
                if ( !STATE.start ) return P

                // Then close the picker.
                P.close()

                // Remove the hidden field.
                if ( P._hidden ) {
                    P._hidden.parentNode.removeChild( P._hidden )
                }

                // Remove the root.
                P.$root.remove()

                // Remove the input class, remove the stored data, and unbind
                // the events (after a tick for IE - see `P.close`).
                $ELEMENT.removeClass( CLASSES.input ).removeData( NAME )
                setTimeout( function() {
                    $ELEMENT.off( '.' + STATE.id )
                }, 0)

                // Restore the element state
                ELEMENT.type = STATE.type
                ELEMENT.readOnly = false

                // Trigger the queued “stop” events.
                P.trigger( 'stop' )

                // Reset the picker states.
                STATE.methods = {}
                STATE.start = false

                return P
            }, //stop


            /**
             * Open up the picker
             */
            open: function( dontGiveFocus ) {

                // If it’s already open, do nothing.
                if ( STATE.open ) return P

                // Add the “active” class.
                $ELEMENT.addClass( CLASSES.active )
                aria( ELEMENT, 'expanded', true )

                // * A Firefox bug, when `html` has `overflow:hidden`, results in
                //   killing transitions :(. So add the “opened” state on the next tick.
                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                setTimeout( function() {

                    // Add the “opened” class to the picker root.
                    P.$root.addClass( CLASSES.opened )
                    aria( P.$root[0], 'hidden', false )

                }, 0 )

                // If we have to give focus, bind the element and doc events.
                if ( dontGiveFocus !== false ) {

                    // Set it as open.
                    STATE.open = true

                    // Prevent the page from scrolling.
                    if ( IS_DEFAULT_THEME ) {
                        $html.
                            css( 'overflow', 'hidden' ).
                            css( 'padding-right', '+=' + getScrollbarWidth() )
                    }

                    // Pass focus to the root element’s jQuery object.
                    // * Workaround for iOS8 to bring the picker’s root into view.
                    P.$root[0].focus()

                    // Bind the document events.
                    $document.on( 'click.' + STATE.id + ' focusin.' + STATE.id, function( event ) {

                        var target = event.target

                        // If the target of the event is not the element, close the picker picker.
                        // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
                        //   Also, for Firefox, a click on an `option` element bubbles up directly
                        //   to the doc. So make sure the target wasn't the doc.
                        // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
                        //   which causes the picker to unexpectedly close when right-clicking it. So make
                        //   sure the event wasn’t a right-click.
                        if ( target != ELEMENT && target != document && event.which != 3 ) {

                            // If the target was the holder that covers the screen,
                            // keep the element focused to maintain tabindex.
                            P.close( target === P.$root.children()[0] )
                        }

                    }).on( 'keydown.' + STATE.id, function( event ) {

                        var
                            // Get the keycode.
                            keycode = event.keyCode,

                            // Translate that to a selection change.
                            keycodeToMove = P.component.key[ keycode ],

                            // Grab the target.
                            target = event.target


                        // On escape, close the picker and give focus.
                        if ( keycode == 27 ) {
                            P.close( true )
                        }


                        // Check if there is a key movement or “enter” keypress on the element.
                        else if ( target == P.$root[0] && ( keycodeToMove || keycode == 13 ) ) {

                            // Prevent the default action to stop page movement.
                            event.preventDefault()

                            // Trigger the key movement action.
                            if ( keycodeToMove ) {
                                PickerConstructor._.trigger( P.component.key.go, P, [ PickerConstructor._.trigger( keycodeToMove ) ] )
                            }

                            // On “enter”, if the highlighted item isn’t disabled, set the value and close.
                            else if ( !P.$root.find( '.' + CLASSES.highlighted ).hasClass( CLASSES.disabled ) ) {
                                P.set( 'select', P.component.item.highlight ).close()
                            }
                        }


                        // If the target is within the root and “enter” is pressed,
                        // prevent the default action and trigger a click on the target instead.
                        else if ( $.contains( P.$root[0], target ) && keycode == 13 ) {
                            event.preventDefault()
                            target.click()
                        }
                    })
                }

                // Trigger the queued “open” events.
                return P.trigger( 'open' )
            }, //open


            /**
             * Close the picker
             */
            close: function( giveFocus ) {

                // If we need to give focus, do it before changing states.
                if ( giveFocus ) {
                    // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
                    // The focus is triggered *after* the close has completed - causing it
                    // to open again. So unbind and rebind the event at the next tick.
                    P.$root.off( 'focus.toOpen' )[0].focus()
                    setTimeout( function() {
                        P.$root.on( 'focus.toOpen', handleFocusToOpenEvent )
                    }, 0 )
                }

                // Remove the “active” class.
                $ELEMENT.removeClass( CLASSES.active )
                aria( ELEMENT, 'expanded', false )

                // * A Firefox bug, when `html` has `overflow:hidden`, results in
                //   killing transitions :(. So remove the “opened” state on the next tick.
                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                setTimeout( function() {

                    // Remove the “opened” and “focused” class from the picker root.
                    P.$root.removeClass( CLASSES.opened + ' ' + CLASSES.focused )
                    aria( P.$root[0], 'hidden', true )

                }, 0 )

                // If it’s already closed, do nothing more.
                if ( !STATE.open ) return P

                // Set it as closed.
                STATE.open = false

                // Allow the page to scroll.
                if ( IS_DEFAULT_THEME ) {
                    $html.
                        css( 'overflow', '' ).
                        css( 'padding-right', '-=' + getScrollbarWidth() )
                }

                // Unbind the document events.
                $document.off( '.' + STATE.id )

                // Trigger the queued “close” events.
                return P.trigger( 'close' )
            }, //close


            /**
             * Clear the values
             */
            clear: function( options ) {
                return P.set( 'clear', null, options )
            }, //clear


            /**
             * Set something
             */
            set: function( thing, value, options ) {

                var thingItem, thingValue,
                    thingIsObject = $.isPlainObject( thing ),
                    thingObject = thingIsObject ? thing : {}

                // Make sure we have usable options.
                options = thingIsObject && $.isPlainObject( value ) ? value : options || {}

                if ( thing ) {

                    // If the thing isn’t an object, make it one.
                    if ( !thingIsObject ) {
                        thingObject[ thing ] = value
                    }

                    // Go through the things of items to set.
                    for ( thingItem in thingObject ) {

                        // Grab the value of the thing.
                        thingValue = thingObject[ thingItem ]

                        // First, if the item exists and there’s a value, set it.
                        if ( thingItem in P.component.item ) {
                            if ( thingValue === undefined ) thingValue = null
                            P.component.set( thingItem, thingValue, options )
                        }

                        // Then, check to update the element value and broadcast a change.
                        if ( thingItem == 'select' || thingItem == 'clear' ) {
                            $ELEMENT.
                                val( thingItem == 'clear' ? '' : P.get( thingItem, SETTINGS.format ) ).
                                trigger( 'change' )
                        }
                    }

                    // Render a new picker.
                    P.render()
                }

                // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
                return options.muted ? P : P.trigger( 'set', thingObject )
            }, //set


            /**
             * Get something
             */
            get: function( thing, format ) {

                // Make sure there’s something to get.
                thing = thing || 'value'

                // If a picker state exists, return that.
                if ( STATE[ thing ] != null ) {
                    return STATE[ thing ]
                }

                // Return the submission value, if that.
                if ( thing == 'valueSubmit' ) {
                    if ( P._hidden ) {
                        return P._hidden.value
                    }
                    thing = 'value'
                }

                // Return the value, if that.
                if ( thing == 'value' ) {
                    return ELEMENT.value
                }

                // Check if a component item exists, return that.
                if ( thing in P.component.item ) {
                    if ( typeof format == 'string' ) {
                        var thingValue = P.component.get( thing )
                        return thingValue ?
                            PickerConstructor._.trigger(
                                P.component.formats.toString,
                                P.component,
                                [ format, thingValue ]
                            ) : ''
                    }
                    return P.component.get( thing )
                }
            }, //get



            /**
             * Bind events on the things.
             */
            on: function( thing, method, internal ) {

                var thingName, thingMethod,
                    thingIsObject = $.isPlainObject( thing ),
                    thingObject = thingIsObject ? thing : {}

                if ( thing ) {

                    // If the thing isn’t an object, make it one.
                    if ( !thingIsObject ) {
                        thingObject[ thing ] = method
                    }

                    // Go through the things to bind to.
                    for ( thingName in thingObject ) {

                        // Grab the method of the thing.
                        thingMethod = thingObject[ thingName ]

                        // If it was an internal binding, prefix it.
                        if ( internal ) {
                            thingName = '_' + thingName
                        }

                        // Make sure the thing methods collection exists.
                        STATE.methods[ thingName ] = STATE.methods[ thingName ] || []

                        // Add the method to the relative method collection.
                        STATE.methods[ thingName ].push( thingMethod )
                    }
                }

                return P
            }, //on



            /**
             * Unbind events on the things.
             */
            off: function() {
                var i, thingName,
                    names = arguments;
                for ( i = 0, namesCount = names.length; i < namesCount; i += 1 ) {
                    thingName = names[i]
                    if ( thingName in STATE.methods ) {
                        delete STATE.methods[thingName]
                    }
                }
                return P
            },


            /**
             * Fire off method events.
             */
            trigger: function( name, data ) {
                var _trigger = function( name ) {
                    var methodList = STATE.methods[ name ]
                    if ( methodList ) {
                        methodList.map( function( method ) {
                            PickerConstructor._.trigger( method, P, [ data ] )
                        })
                    }
                }
                _trigger( '_' + name )
                _trigger( name )
                return P
            } //trigger
        } //PickerInstance.prototype


    /**
     * Wrap the picker holder components together.
     */
    function createWrappedComponent() {

        // Create a picker wrapper holder
        return PickerConstructor._.node( 'div',

            // Create a picker wrapper node
            PickerConstructor._.node( 'div',

                // Create a picker frame
                PickerConstructor._.node( 'div',

                    // Create a picker box node
                    PickerConstructor._.node( 'div',

                        // Create the components nodes.
                        P.component.nodes( STATE.open ),

                        // The picker box class
                        CLASSES.box
                    ),

                    // Picker wrap class
                    CLASSES.wrap
                ),

                // Picker frame class
                CLASSES.frame
            ),

            // Picker holder class
            CLASSES.holder
        ) //endreturn
    } //createWrappedComponent



    /**
     * Prepare the input element with all bindings.
     */
    function prepareElement() {

        $ELEMENT.

            // Store the picker data by component name.
            data(NAME, P).

            // Add the “input” class name.
            addClass(CLASSES.input).

            // Remove the tabindex.
            attr('tabindex', -1).

            // If there’s a `data-value`, update the value of the element.
            val( $ELEMENT.data('value') ?
                P.get('select', SETTINGS.format) :
                ELEMENT.value
            )


        // Only bind keydown events if the element isn’t editable.
        if ( !SETTINGS.editable ) {

            $ELEMENT.

                // On focus/click, focus onto the root to open it up.
                on( 'focus.' + STATE.id + ' click.' + STATE.id, function( event ) {
                    event.preventDefault()
                    P.$root[0].focus()
                }).

                // Handle keyboard event based on the picker being opened or not.
                on( 'keydown.' + STATE.id, handleKeydownEvent )
        }


        // Update the aria attributes.
        aria(ELEMENT, {
            haspopup: true,
            expanded: false,
            readonly: false,
            owns: ELEMENT.id + '_root'
        })
    }


    /**
     * Prepare the root picker element with all bindings.
     */
    function prepareElementRoot() {

        P.$root.

            on({

                // For iOS8.
                keydown: handleKeydownEvent,

                // When something within the root is focused, stop from bubbling
                // to the doc and remove the “focused” state from the root.
                focusin: function( event ) {
                    P.$root.removeClass( CLASSES.focused )
                    event.stopPropagation()
                },

                // When something within the root holder is clicked, stop it
                // from bubbling to the doc.
                'mousedown click': function( event ) {

                    var target = event.target

                    // Make sure the target isn’t the root holder so it can bubble up.
                    if ( target != P.$root.children()[ 0 ] ) {

                        event.stopPropagation()

                        // * For mousedown events, cancel the default action in order to
                        //   prevent cases where focus is shifted onto external elements
                        //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
                        //   Also, for Firefox, don’t prevent action on the `option` element.
                        if ( event.type == 'mousedown' && !$( target ).is( 'input, select, textarea, button, option' )) {

                            event.preventDefault()

                            // Re-focus onto the root so that users can click away
                            // from elements focused within the picker.
                            P.$root[0].focus()
                        }
                    }
                }
            }).

            // Add/remove the “target” class on focus and blur.
            on({
                focus: function() {
                    $ELEMENT.addClass( CLASSES.target )
                },
                blur: function() {
                    $ELEMENT.removeClass( CLASSES.target )
                }
            }).

            // Open the picker and adjust the root “focused” state
            on( 'focus.toOpen', handleFocusToOpenEvent ).

            // If there’s a click on an actionable element, carry out the actions.
            on( 'click', '[data-pick], [data-nav], [data-clear], [data-close]', function() {

                var $target = $( this ),
                    targetData = $target.data(),
                    targetDisabled = $target.hasClass( CLASSES.navDisabled ) || $target.hasClass( CLASSES.disabled ),

                    // * For IE, non-focusable elements can be active elements as well
                    //   (http://stackoverflow.com/a/2684561).
                    activeElement = getActiveElement()
                    activeElement = activeElement && ( activeElement.type || activeElement.href )

                // If it’s disabled or nothing inside is actively focused, re-focus the element.
                if ( targetDisabled || activeElement && !$.contains( P.$root[0], activeElement ) ) {
                    P.$root[0].focus()
                }

                // If something is superficially changed, update the `highlight` based on the `nav`.
                if ( !targetDisabled && targetData.nav ) {
                    P.set( 'highlight', P.component.item.highlight, { nav: targetData.nav } )
                }

                // If something is picked, set `select` then close with focus.
                else if ( !targetDisabled && 'pick' in targetData ) {
                    P.set( 'select', targetData.pick )
                }

                // If a “clear” button is pressed, empty the values and close with focus.
                else if ( targetData.clear ) {
                    P.clear().close( true )
                }

                else if ( targetData.close ) {
                    P.close( true )
                }

            }) //P.$root

        aria( P.$root[0], 'hidden', true )
    }


     /**
      * Prepare the hidden input element along with all bindings.
      */
    function prepareElementHidden() {

        var name

        if ( SETTINGS.hiddenName === true ) {
            name = ELEMENT.name
            ELEMENT.name = ''
        }
        else {
            name = [
                typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',
                typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'
            ]
            name = name[0] + ELEMENT.name + name[1]
        }

        P._hidden = $(
            '<input ' +
            'type=hidden ' +

            // Create the name using the original input’s with a prefix and suffix.
            'name="' + name + '"' +

            // If the element has a value, set the hidden value as well.
            (
                $ELEMENT.data('value') || ELEMENT.value ?
                    ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' :
                    ''
            ) +
            '>'
        )[0]

        $ELEMENT.

            // If the value changes, update the hidden input with the correct format.
            on('change.' + STATE.id, function() {
                P._hidden.value = ELEMENT.value ?
                    P.get('select', SETTINGS.formatSubmit) :
                    ''
            })


        // Insert the hidden input as specified in the settings.
        if ( SETTINGS.container ) $( SETTINGS.container ).append( P._hidden )
        else $ELEMENT.after( P._hidden )
    }


    // For iOS8.
    function handleKeydownEvent( event ) {

        var keycode = event.keyCode,

            // Check if one of the delete keys was pressed.
            isKeycodeDelete = /^(8|46)$/.test(keycode)

        // For some reason IE clears the input value on “escape”.
        if ( keycode == 27 ) {
            P.close()
            return false
        }

        // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
        if ( keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode] ) {

            // Prevent it from moving the page and bubbling to doc.
            event.preventDefault()
            event.stopPropagation()

            // If `delete` was pressed, clear the values and close the picker.
            // Otherwise open the picker.
            if ( isKeycodeDelete ) { P.clear().close() }
            else { P.open() }
        }
    }


    // Separated for IE
    function handleFocusToOpenEvent( event ) {

        // Stop the event from propagating to the doc.
        event.stopPropagation()

        // If it’s a focus event, add the “focused” class to the root.
        if ( event.type == 'focus' ) {
            P.$root.addClass( CLASSES.focused )
        }

        // And then finally open the picker.
        P.open()
    }


    // Return a new picker instance.
    return new PickerInstance()
} //PickerConstructor



/**
 * The default classes and prefix to use for the HTML classes.
 */
PickerConstructor.klasses = function( prefix ) {
    prefix = prefix || 'picker'
    return {

        picker: prefix,
        opened: prefix + '--opened',
        focused: prefix + '--focused',

        input: prefix + '__input',
        active: prefix + '__input--active',
        target: prefix + '__input--target',

        holder: prefix + '__holder',

        frame: prefix + '__frame',
        wrap: prefix + '__wrap',

        box: prefix + '__box'
    }
} //PickerConstructor.klasses



/**
 * Check if the default theme is being used.
 */
function isUsingDefaultTheme( element ) {

    var theme,
        prop = 'position'

    // For IE.
    if ( element.currentStyle ) {
        theme = element.currentStyle[prop]
    }

    // For normal browsers.
    else if ( window.getComputedStyle ) {
        theme = getComputedStyle( element )[prop]
    }

    return theme == 'fixed'
}



/**
 * Get the width of the browser’s scrollbar.
 * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
 */
function getScrollbarWidth() {

    if ( $html.height() <= $window.height() ) {
        return 0
    }

    var $outer = $( '<div style="visibility:hidden;width:100px" />' ).
        appendTo( 'body' )

    // Get the width without scrollbars.
    var widthWithoutScroll = $outer[0].offsetWidth

    // Force adding scrollbars.
    $outer.css( 'overflow', 'scroll' )

    // Add the inner div.
    var $inner = $( '<div style="width:100%" />' ).appendTo( $outer )

    // Get the width with scrollbars.
    var widthWithScroll = $inner[0].offsetWidth

    // Remove the divs.
    $outer.remove()

    // Return the difference between the widths.
    return widthWithoutScroll - widthWithScroll
}



/**
 * PickerConstructor helper methods.
 */
PickerConstructor._ = {

    /**
     * Create a group of nodes. Expects:
     * `
        {
            min:    {Integer},
            max:    {Integer},
            i:      {Integer},
            node:   {String},
            item:   {Function}
        }
     * `
     */
    group: function( groupObject ) {

        var
            // Scope for the looped object
            loopObjectScope,

            // Create the nodes list
            nodesList = '',

            // The counter starts from the `min`
            counter = PickerConstructor._.trigger( groupObject.min, groupObject )


        // Loop from the `min` to `max`, incrementing by `i`
        for ( ; counter <= PickerConstructor._.trigger( groupObject.max, groupObject, [ counter ] ); counter += groupObject.i ) {

            // Trigger the `item` function within scope of the object
            loopObjectScope = PickerConstructor._.trigger( groupObject.item, groupObject, [ counter ] )

            // Splice the subgroup and create nodes out of the sub nodes
            nodesList += PickerConstructor._.node(
                groupObject.node,
                loopObjectScope[ 0 ],   // the node
                loopObjectScope[ 1 ],   // the classes
                loopObjectScope[ 2 ]    // the attributes
            )
        }

        // Return the list of nodes
        return nodesList
    }, //group


    /**
     * Create a dom node string
     */
    node: function( wrapper, item, klass, attribute ) {

        // If the item is false-y, just return an empty string
        if ( !item ) return ''

        // If the item is an array, do a join
        item = $.isArray( item ) ? item.join( '' ) : item

        // Check for the class
        klass = klass ? ' class="' + klass + '"' : ''

        // Check for any attributes
        attribute = attribute ? ' ' + attribute : ''

        // Return the wrapped item
        return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'
    }, //node


    /**
     * Lead numbers below 10 with a zero.
     */
    lead: function( number ) {
        return ( number < 10 ? '0': '' ) + number
    },


    /**
     * Trigger a function otherwise return the value.
     */
    trigger: function( callback, scope, args ) {
        return typeof callback == 'function' ? callback.apply( scope, args || [] ) : callback
    },


    /**
     * If the second character is a digit, length is 2 otherwise 1.
     */
    digits: function( string ) {
        return ( /\d/ ).test( string[ 1 ] ) ? 2 : 1
    },


    /**
     * Tell if something is a date object.
     */
    isDate: function( value ) {
        return {}.toString.call( value ).indexOf( 'Date' ) > -1 && this.isInteger( value.getDate() )
    },


    /**
     * Tell if something is an integer.
     */
    isInteger: function( value ) {
        return {}.toString.call( value ).indexOf( 'Number' ) > -1 && value % 1 === 0
    },


    /**
     * Create ARIA attribute strings.
     */
    ariaAttr: ariaAttr
} //PickerConstructor._



/**
 * Extend the picker with a component and defaults.
 */
PickerConstructor.extend = function( name, Component ) {

    // Extend jQuery.
    $.fn[ name ] = function( options, action ) {

        // Grab the component data.
        var componentData = this.data( name )

        // If the picker is requested, return the data object.
        if ( options == 'picker' ) {
            return componentData
        }

        // If the component data exists and `options` is a string, carry out the action.
        if ( componentData && typeof options == 'string' ) {
            return PickerConstructor._.trigger( componentData[ options ], componentData, [ action ] )
        }

        // Otherwise go through each matched element and if the component
        // doesn’t exist, create a new picker using `this` element
        // and merging the defaults and options with a deep copy.
        return this.each( function() {
            var $this = $( this )
            if ( !$this.data( name ) ) {
                new PickerConstructor( this, name, Component, options )
            }
        })
    }

    // Set the defaults.
    $.fn[ name ].defaults = Component.defaults
} //PickerConstructor.extend



function aria(element, attribute, value) {
    if ( $.isPlainObject(attribute) ) {
        for ( var key in attribute ) {
            ariaSet(element, key, attribute[key])
        }
    }
    else {
        ariaSet(element, attribute, value)
    }
}
function ariaSet(element, attribute, value) {
    element.setAttribute(
        (attribute == 'role' ? '' : 'aria-') + attribute,
        value
    )
}
function ariaAttr(attribute, data) {
    if ( !$.isPlainObject(attribute) ) {
        attribute = { attribute: data }
    }
    data = ''
    for ( var key in attribute ) {
        var attr = (key == 'role' ? '' : 'aria-') + key,
            attrVal = attribute[key]
        data += attrVal == null ? '' : attr + '="' + attribute[key] + '"'
    }
    return data
}

// IE8 bug throws an error for activeElements within iframes.
function getActiveElement() {
    try {
        return document.activeElement
    } catch ( err ) { }
}



// Expose the picker constructor.
return PickerConstructor


}));


;/*!
 * Date picker for pickadate.js v3.5.0
 * http://amsul.github.io/pickadate.js/date.htm
 */

(function ( factory ) {

    // AMD.
    if ( typeof define == 'function' && define.amd )
        define( ['picker', 'jquery'], factory )

    // Node.js/browserify.
    else if ( typeof exports == 'object' )
        module.exports = factory( require('./picker.js'), require('jquery') )

    // Browser globals.
    else factory( Picker, jQuery )

}(function( Picker, $ ) {


/**
 * Globals and constants
 */
var DAYS_IN_WEEK = 7,
    WEEKS_IN_CALENDAR = 6,
    _ = Picker._



/**
 * The date picker constructor
 */
function DatePicker( picker, settings ) {

    var calendar = this,
        element = picker.$node[ 0 ],
        elementValue = element.value,
        elementDataValue = picker.$node.data( 'value' ),
        valueString = elementDataValue || elementValue,
        formatString = elementDataValue ? settings.formatSubmit : settings.format,
        isRTL = function() {

            return element.currentStyle ?

                // For IE.
                element.currentStyle.direction == 'rtl' :

                // For normal browsers.
                getComputedStyle( picker.$root[0] ).direction == 'rtl'
        }

    calendar.settings = settings
    calendar.$node = picker.$node

    // The queue of methods that will be used to build item objects.
    calendar.queue = {
        min: 'measure create',
        max: 'measure create',
        now: 'now create',
        select: 'parse create validate',
        highlight: 'parse navigate create validate',
        view: 'parse create validate viewset',
        disable: 'deactivate',
        enable: 'activate'
    }

    // The component's item object.
    calendar.item = {}

    calendar.item.clear = null
    calendar.item.disable = ( settings.disable || [] ).slice( 0 )
    calendar.item.enable = -(function( collectionDisabled ) {
        return collectionDisabled[ 0 ] === true ? collectionDisabled.shift() : -1
    })( calendar.item.disable )

    calendar.
        set( 'min', settings.min ).
        set( 'max', settings.max ).
        set( 'now' )

    // When there’s a value, set the `select`, which in turn
    // also sets the `highlight` and `view`.
    if ( valueString ) {
        calendar.set( 'select', valueString, { format: formatString })
    }

    // If there’s no value, default to highlighting “today”.
    else {
        calendar.
            set( 'select', null ).
            set( 'highlight', calendar.item.now )
    }


    // The keycode to movement mapping.
    calendar.key = {
        40: 7, // Down
        38: -7, // Up
        39: function() { return isRTL() ? -1 : 1 }, // Right
        37: function() { return isRTL() ? 1 : -1 }, // Left
        go: function( timeChange ) {
            var highlightedObject = calendar.item.highlight,
                targetDate = new Date( highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange )
            calendar.set(
                'highlight',
                targetDate,
                { interval: timeChange }
            )
            this.render()
        }
    }


    // Bind some picker events.
    picker.
        on( 'render', function() {
            picker.$root.find( '.' + settings.klass.selectMonth ).on( 'change', function() {
                var value = this.value
                if ( value ) {
                    picker.set( 'highlight', [ picker.get( 'view' ).year, value, picker.get( 'highlight' ).date ] )
                    picker.$root.find( '.' + settings.klass.selectMonth ).trigger( 'focus' )
                }
            })
            picker.$root.find( '.' + settings.klass.selectYear ).on( 'change', function() {
                var value = this.value
                if ( value ) {
                    picker.set( 'highlight', [ value, picker.get( 'view' ).month, picker.get( 'highlight' ).date ] )
                    picker.$root.find( '.' + settings.klass.selectYear ).trigger( 'focus' )
                }
            })
        }, 1 ).
        on( 'open', function() {
            var includeToday = ''
            if ( calendar.disabled( calendar.get('now') ) ) {
                includeToday = ':not(.' + settings.klass.buttonToday + ')'
            }
            picker.$root.find( 'button' + includeToday + ', select' ).attr( 'disabled', false )
        }, 1 ).
        on( 'close', function() {
            picker.$root.find( 'button, select' ).attr( 'disabled', true )
        }, 1 )

} //DatePicker


/**
 * Set a datepicker item object.
 */
DatePicker.prototype.set = function( type, value, options ) {

    var calendar = this,
        calendarItem = calendar.item

    // If the value is `null` just set it immediately.
    if ( value === null ) {
        if ( type == 'clear' ) type = 'select'
        calendarItem[ type ] = value
        return calendar
    }

    // Otherwise go through the queue of methods, and invoke the functions.
    // Update this as the time unit, and set the final value as this item.
    // * In the case of `enable`, keep the queue but set `disable` instead.
    //   And in the case of `flip`, keep the queue but set `enable` instead.
    calendarItem[ ( type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type ) ] = calendar.queue[ type ].split( ' ' ).map( function( method ) {
        value = calendar[ method ]( type, value, options )
        return value
    }).pop()

    // Check if we need to cascade through more updates.
    if ( type == 'select' ) {
        calendar.set( 'highlight', calendarItem.select, options )
    }
    else if ( type == 'highlight' ) {
        calendar.set( 'view', calendarItem.highlight, options )
    }
    else if ( type.match( /^(flip|min|max|disable|enable)$/ ) ) {
        if ( calendarItem.select && calendar.disabled( calendarItem.select ) ) {
            calendar.set( 'select', calendarItem.select, options )
        }
        if ( calendarItem.highlight && calendar.disabled( calendarItem.highlight ) ) {
            calendar.set( 'highlight', calendarItem.highlight, options )
        }
    }

    return calendar
} //DatePicker.prototype.set


/**
 * Get a datepicker item object.
 */
DatePicker.prototype.get = function( type ) {
    return this.item[ type ]
} //DatePicker.prototype.get


/**
 * Create a picker date object.
 */
DatePicker.prototype.create = function( type, value, options ) {

    var isInfiniteValue,
        calendar = this

    // If there’s no value, use the type as the value.
    value = value === undefined ? type : value


    // If it’s infinity, update the value.
    if ( value == -Infinity || value == Infinity ) {
        isInfiniteValue = value
    }

    // If it’s an object, use the native date object.
    else if ( $.isPlainObject( value ) && _.isInteger( value.pick ) ) {
        value = value.obj
    }

    // If it’s an array, convert it into a date and make sure
    // that it’s a valid date – otherwise default to today.
    else if ( $.isArray( value ) ) {
        value = new Date( value[ 0 ], value[ 1 ], value[ 2 ] )
        value = _.isDate( value ) ? value : calendar.create().obj
    }

    // If it’s a number or date object, make a normalized date.
    else if ( _.isInteger( value ) || _.isDate( value ) ) {
        value = calendar.normalize( new Date( value ), options )
    }

    // If it’s a literal true or any other case, set it to now.
    else /*if ( value === true )*/ {
        value = calendar.now( type, value, options )
    }

    // Return the compiled object.
    return {
        year: isInfiniteValue || value.getFullYear(),
        month: isInfiniteValue || value.getMonth(),
        date: isInfiniteValue || value.getDate(),
        day: isInfiniteValue || value.getDay(),
        obj: isInfiniteValue || value,
        pick: isInfiniteValue || value.getTime()
    }
} //DatePicker.prototype.create


/**
 * Create a range limit object using an array, date object,
 * literal “true”, or integer relative to another time.
 */
DatePicker.prototype.createRange = function( from, to ) {

    var calendar = this,
        createDate = function( date ) {
            if ( date === true || $.isArray( date ) || _.isDate( date ) ) {
                return calendar.create( date )
            }
            return date
        }

    // Create objects if possible.
    if ( !_.isInteger( from ) ) {
        from = createDate( from )
    }
    if ( !_.isInteger( to ) ) {
        to = createDate( to )
    }

    // Create relative dates.
    if ( _.isInteger( from ) && $.isPlainObject( to ) ) {
        from = [ to.year, to.month, to.date + from ];
    }
    else if ( _.isInteger( to ) && $.isPlainObject( from ) ) {
        to = [ from.year, from.month, from.date + to ];
    }

    return {
        from: createDate( from ),
        to: createDate( to )
    }
} //DatePicker.prototype.createRange


/**
 * Check if a date unit falls within a date range object.
 */
DatePicker.prototype.withinRange = function( range, dateUnit ) {
    range = this.createRange(range.from, range.to)
    return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick
}


/**
 * Check if two date range objects overlap.
 */
DatePicker.prototype.overlapRanges = function( one, two ) {

    var calendar = this

    // Convert the ranges into comparable dates.
    one = calendar.createRange( one.from, one.to )
    two = calendar.createRange( two.from, two.to )

    return calendar.withinRange( one, two.from ) || calendar.withinRange( one, two.to ) ||
        calendar.withinRange( two, one.from ) || calendar.withinRange( two, one.to )
}


/**
 * Get the date today.
 */
DatePicker.prototype.now = function( type, value, options ) {
    value = new Date()
    if ( options && options.rel ) {
        value.setDate( value.getDate() + options.rel )
    }
    return this.normalize( value, options )
}


/**
 * Navigate to next/prev month.
 */
DatePicker.prototype.navigate = function( type, value, options ) {

    var targetDateObject,
        targetYear,
        targetMonth,
        targetDate,
        isTargetArray = $.isArray( value ),
        isTargetObject = $.isPlainObject( value ),
        viewsetObject = this.item.view/*,
        safety = 100*/


    if ( isTargetArray || isTargetObject ) {

        if ( isTargetObject ) {
            targetYear = value.year
            targetMonth = value.month
            targetDate = value.date
        }
        else {
            targetYear = +value[0]
            targetMonth = +value[1]
            targetDate = +value[2]
        }

        // If we’re navigating months but the view is in a different
        // month, navigate to the view’s year and month.
        if ( options && options.nav && viewsetObject && viewsetObject.month !== targetMonth ) {
            targetYear = viewsetObject.year
            targetMonth = viewsetObject.month
        }

        // Figure out the expected target year and month.
        targetDateObject = new Date( targetYear, targetMonth + ( options && options.nav ? options.nav : 0 ), 1 )
        targetYear = targetDateObject.getFullYear()
        targetMonth = targetDateObject.getMonth()

        // If the month we’re going to doesn’t have enough days,
        // keep decreasing the date until we reach the month’s last date.
        while ( /*safety &&*/ new Date( targetYear, targetMonth, targetDate ).getMonth() !== targetMonth ) {
            targetDate -= 1
            /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
            }*/
        }

        value = [ targetYear, targetMonth, targetDate ]
    }

    return value
} //DatePicker.prototype.navigate


/**
 * Normalize a date by setting the hours to midnight.
 */
DatePicker.prototype.normalize = function( value/*, options*/ ) {
    value.setHours( 0, 0, 0, 0 )
    return value
}


/**
 * Measure the range of dates.
 */
DatePicker.prototype.measure = function( type, value/*, options*/ ) {

    var calendar = this

    // If it’s anything false-y, remove the limits.
    if ( !value ) {
        value = type == 'min' ? -Infinity : Infinity
    }

    // If it’s a string, parse it.
    else if ( typeof value == 'string' ) {
        value = calendar.parse( type, value )
    }

    // If it's an integer, get a date relative to today.
    else if ( _.isInteger( value ) ) {
        value = calendar.now( type, value, { rel: value } )
    }

    return value
} ///DatePicker.prototype.measure


/**
 * Create a viewset object based on navigation.
 */
DatePicker.prototype.viewset = function( type, dateObject/*, options*/ ) {
    return this.create([ dateObject.year, dateObject.month, 1 ])
}


/**
 * Validate a date as enabled and shift if needed.
 */
DatePicker.prototype.validate = function( type, dateObject, options ) {

    var calendar = this,

        // Keep a reference to the original date.
        originalDateObject = dateObject,

        // Make sure we have an interval.
        interval = options && options.interval ? options.interval : 1,

        // Check if the calendar enabled dates are inverted.
        isFlippedBase = calendar.item.enable === -1,

        // Check if we have any enabled dates after/before now.
        hasEnabledBeforeTarget, hasEnabledAfterTarget,

        // The min & max limits.
        minLimitObject = calendar.item.min,
        maxLimitObject = calendar.item.max,

        // Check if we’ve reached the limit during shifting.
        reachedMin, reachedMax,

        // Check if the calendar is inverted and at least one weekday is enabled.
        hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter( function( value ) {

            // If there’s a date, check where it is relative to the target.
            if ( $.isArray( value ) ) {
                var dateTime = calendar.create( value ).pick
                if ( dateTime < dateObject.pick ) hasEnabledBeforeTarget = true
                else if ( dateTime > dateObject.pick ) hasEnabledAfterTarget = true
            }

            // Return only integers for enabled weekdays.
            return _.isInteger( value )
        }).length/*,

        safety = 100*/



    // Cases to validate for:
    // [1] Not inverted and date disabled.
    // [2] Inverted and some dates enabled.
    // [3] Not inverted and out of range.
    //
    // Cases to **not** validate for:
    // • Navigating months.
    // • Not inverted and date enabled.
    // • Inverted and all dates disabled.
    // • ..and anything else.
    if ( !options || !options.nav ) if (
        /* 1 */ ( !isFlippedBase && calendar.disabled( dateObject ) ) ||
        /* 2 */ ( isFlippedBase && calendar.disabled( dateObject ) && ( hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget ) ) ||
        /* 3 */ ( !isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick) )
    ) {


        // When inverted, flip the direction if there aren’t any enabled weekdays
        // and there are no enabled dates in the direction of the interval.
        if ( isFlippedBase && !hasEnabledWeekdays && ( ( !hasEnabledAfterTarget && interval > 0 ) || ( !hasEnabledBeforeTarget && interval < 0 ) ) ) {
            interval *= -1
        }


        // Keep looping until we reach an enabled date.
        while ( /*safety &&*/ calendar.disabled( dateObject ) ) {

            /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
            }*/


            // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
            if ( Math.abs( interval ) > 1 && ( dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month ) ) {
                dateObject = originalDateObject
                interval = interval > 0 ? 1 : -1
            }


            // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
            if ( dateObject.pick <= minLimitObject.pick ) {
                reachedMin = true
                interval = 1
                dateObject = calendar.create([
                    minLimitObject.year,
                    minLimitObject.month,
                    minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)
                ])
            }
            else if ( dateObject.pick >= maxLimitObject.pick ) {
                reachedMax = true
                interval = -1
                dateObject = calendar.create([
                    maxLimitObject.year,
                    maxLimitObject.month,
                    maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)
                ])
            }


            // If we’ve reached both limits, just break out of the loop.
            if ( reachedMin && reachedMax ) {
                break
            }


            // Finally, create the shifted date using the interval and keep looping.
            dateObject = calendar.create([ dateObject.year, dateObject.month, dateObject.date + interval ])
        }

    } //endif


    // Return the date object settled on.
    return dateObject
} //DatePicker.prototype.validate


/**
 * Check if a date is disabled.
 */
DatePicker.prototype.disabled = function( dateToVerify ) {

    var
        calendar = this,

        // Filter through the disabled dates to check if this is one.
        isDisabledMatch = calendar.item.disable.filter( function( dateToDisable ) {

            // If the date is a number, match the weekday with 0index and `firstDay` check.
            if ( _.isInteger( dateToDisable ) ) {
                return dateToVerify.day === ( calendar.settings.firstDay ? dateToDisable : dateToDisable - 1 ) % 7
            }

            // If it’s an array or a native JS date, create and match the exact date.
            if ( $.isArray( dateToDisable ) || _.isDate( dateToDisable ) ) {
                return dateToVerify.pick === calendar.create( dateToDisable ).pick
            }

            // If it’s an object, match a date within the “from” and “to” range.
            if ( $.isPlainObject( dateToDisable ) ) {
                return calendar.withinRange( dateToDisable, dateToVerify )
            }
        })

    // If this date matches a disabled date, confirm it’s not inverted.
    isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function( dateToDisable ) {
        return $.isArray( dateToDisable ) && dateToDisable[3] == 'inverted' ||
            $.isPlainObject( dateToDisable ) && dateToDisable.inverted
    }).length

    // Check the calendar “enabled” flag and respectively flip the
    // disabled state. Then also check if it’s beyond the min/max limits.
    return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
        dateToVerify.pick < calendar.item.min.pick ||
        dateToVerify.pick > calendar.item.max.pick

} //DatePicker.prototype.disabled


/**
 * Parse a string into a usable type.
 */
DatePicker.prototype.parse = function( type, value, options ) {

    var calendar = this,
        parsingObject = {}

    // If it’s already parsed, we’re good.
    if ( !value || typeof value != 'string' ) {
        return value
    }

    // We need a `.format` to parse the value with.
    if ( !( options && options.format ) ) {
        options = options || {}
        options.format = calendar.settings.format
    }

    // Convert the format into an array and then map through it.
    calendar.formats.toArray( options.format ).map( function( label ) {

        var
            // Grab the formatting label.
            formattingLabel = calendar.formats[ label ],

            // The format length is from the formatting label function or the
            // label length without the escaping exclamation (!) mark.
            formatLength = formattingLabel ? _.trigger( formattingLabel, calendar, [ value, parsingObject ] ) : label.replace( /^!/, '' ).length

        // If there's a format label, split the value up to the format length.
        // Then add it to the parsing object with appropriate label.
        if ( formattingLabel ) {
            parsingObject[ label ] = value.substr( 0, formatLength )
        }

        // Update the value as the substring from format length to end.
        value = value.substr( formatLength )
    })

    // Compensate for month 0index.
    return [
        parsingObject.yyyy || parsingObject.yy,
        +( parsingObject.mm || parsingObject.m ) - 1,
        parsingObject.dd || parsingObject.d
    ]
} //DatePicker.prototype.parse


/**
 * Various formats to display the object in.
 */
DatePicker.prototype.formats = (function() {

    // Return the length of the first word in a collection.
    function getWordLengthFromCollection( string, collection, dateObject ) {

        // Grab the first word from the string.
        var word = string.match( /\w+/ )[ 0 ]

        // If there's no month index, add it to the date object
        if ( !dateObject.mm && !dateObject.m ) {
            dateObject.m = collection.indexOf( word ) + 1
        }

        // Return the length of the word.
        return word.length
    }

    // Get the length of the first word in a string.
    function getFirstWordLength( string ) {
        return string.match( /\w+/ )[ 0 ].length
    }

    return {

        d: function( string, dateObject ) {

            // If there's string, then get the digits length.
            // Otherwise return the selected date.
            return string ? _.digits( string ) : dateObject.date
        },
        dd: function( string, dateObject ) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected date with a leading zero.
            return string ? 2 : _.lead( dateObject.date )
        },
        ddd: function( string, dateObject ) {

            // If there's a string, then get the length of the first word.
            // Otherwise return the short selected weekday.
            return string ? getFirstWordLength( string ) : this.settings.weekdaysShort[ dateObject.day ]
        },
        dddd: function( string, dateObject ) {

            // If there's a string, then get the length of the first word.
            // Otherwise return the full selected weekday.
            return string ? getFirstWordLength( string ) : this.settings.weekdaysFull[ dateObject.day ]
        },
        m: function( string, dateObject ) {

            // If there's a string, then get the length of the digits
            // Otherwise return the selected month with 0index compensation.
            return string ? _.digits( string ) : dateObject.month + 1
        },
        mm: function( string, dateObject ) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected month with 0index and leading zero.
            return string ? 2 : _.lead( dateObject.month + 1 )
        },
        mmm: function( string, dateObject ) {

            var collection = this.settings.monthsShort

            // If there's a string, get length of the relevant month from the short
            // months collection. Otherwise return the selected month from that collection.
            return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
        },
        mmmm: function( string, dateObject ) {

            var collection = this.settings.monthsFull

            // If there's a string, get length of the relevant month from the full
            // months collection. Otherwise return the selected month from that collection.
            return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
        },
        yy: function( string, dateObject ) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected year by slicing out the first 2 digits.
            return string ? 2 : ( '' + dateObject.year ).slice( 2 )
        },
        yyyy: function( string, dateObject ) {

            // If there's a string, then the length is always 4.
            // Otherwise return the selected year.
            return string ? 4 : dateObject.year
        },

        // Create an array by splitting the formatting string passed.
        toArray: function( formatString ) { return formatString.split( /(d{1,4}|m{1,4}|y{4}|yy|!.)/g ) },

        // Format an object into a string using the formatting options.
        toString: function ( formatString, itemObject ) {
            var calendar = this
            return calendar.formats.toArray( formatString ).map( function( label ) {
                return _.trigger( calendar.formats[ label ], calendar, [ 0, itemObject ] ) || label.replace( /^!/, '' )
            }).join( '' )
        }
    }
})() //DatePicker.prototype.formats




/**
 * Check if two date units are the exact.
 */
DatePicker.prototype.isDateExact = function( one, two ) {

    var calendar = this

    // When we’re working with weekdays, do a direct comparison.
    if (
        ( _.isInteger( one ) && _.isInteger( two ) ) ||
        ( typeof one == 'boolean' && typeof two == 'boolean' )
     ) {
        return one === two
    }

    // When we’re working with date representations, compare the “pick” value.
    if (
        ( _.isDate( one ) || $.isArray( one ) ) &&
        ( _.isDate( two ) || $.isArray( two ) )
    ) {
        return calendar.create( one ).pick === calendar.create( two ).pick
    }

    // When we’re working with range objects, compare the “from” and “to”.
    if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
        return calendar.isDateExact( one.from, two.from ) && calendar.isDateExact( one.to, two.to )
    }

    return false
}


/**
 * Check if two date units overlap.
 */
DatePicker.prototype.isDateOverlap = function( one, two ) {

    var calendar = this,
        firstDay = calendar.settings.firstDay ? 1 : 0

    // When we’re working with a weekday index, compare the days.
    if ( _.isInteger( one ) && ( _.isDate( two ) || $.isArray( two ) ) ) {
        one = one % 7 + firstDay
        return one === calendar.create( two ).day + 1
    }
    if ( _.isInteger( two ) && ( _.isDate( one ) || $.isArray( one ) ) ) {
        two = two % 7 + firstDay
        return two === calendar.create( one ).day + 1
    }

    // When we’re working with range objects, check if the ranges overlap.
    if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
        return calendar.overlapRanges( one, two )
    }

    return false
}


/**
 * Flip the “enabled” state.
 */
DatePicker.prototype.flipEnable = function(val) {
    var itemObject = this.item
    itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)
}


/**
 * Mark a collection of dates as “disabled”.
 */
DatePicker.prototype.deactivate = function( type, datesToDisable ) {

    var calendar = this,
        disabledItems = calendar.item.disable.slice(0)


    // If we’re flipping, that’s all we need to do.
    if ( datesToDisable == 'flip' ) {
        calendar.flipEnable()
    }

    else if ( datesToDisable === false ) {
        calendar.flipEnable(1)
        disabledItems = []
    }

    else if ( datesToDisable === true ) {
        calendar.flipEnable(-1)
        disabledItems = []
    }

    // Otherwise go through the dates to disable.
    else {

        datesToDisable.map(function( unitToDisable ) {

            var matchFound

            // When we have disabled items, check for matches.
            // If something is matched, immediately break out.
            for ( var index = 0; index < disabledItems.length; index += 1 ) {
                if ( calendar.isDateExact( unitToDisable, disabledItems[index] ) ) {
                    matchFound = true
                    break
                }
            }

            // If nothing was found, add the validated unit to the collection.
            if ( !matchFound ) {
                if (
                    _.isInteger( unitToDisable ) ||
                    _.isDate( unitToDisable ) ||
                    $.isArray( unitToDisable ) ||
                    ( $.isPlainObject( unitToDisable ) && unitToDisable.from && unitToDisable.to )
                ) {
                    disabledItems.push( unitToDisable )
                }
            }
        })
    }

    // Return the updated collection.
    return disabledItems
} //DatePicker.prototype.deactivate


/**
 * Mark a collection of dates as “enabled”.
 */
DatePicker.prototype.activate = function( type, datesToEnable ) {

    var calendar = this,
        disabledItems = calendar.item.disable,
        disabledItemsCount = disabledItems.length

    // If we’re flipping, that’s all we need to do.
    if ( datesToEnable == 'flip' ) {
        calendar.flipEnable()
    }

    else if ( datesToEnable === true ) {
        calendar.flipEnable(1)
        disabledItems = []
    }

    else if ( datesToEnable === false ) {
        calendar.flipEnable(-1)
        disabledItems = []
    }

    // Otherwise go through the disabled dates.
    else {

        datesToEnable.map(function( unitToEnable ) {

            var matchFound,
                disabledUnit,
                index,
                isExactRange

            // Go through the disabled items and try to find a match.
            for ( index = 0; index < disabledItemsCount; index += 1 ) {

                disabledUnit = disabledItems[index]

                // When an exact match is found, remove it from the collection.
                if ( calendar.isDateExact( disabledUnit, unitToEnable ) ) {
                    matchFound = disabledItems[index] = null
                    isExactRange = true
                    break
                }

                // When an overlapped match is found, add the “inverted” state to it.
                else if ( calendar.isDateOverlap( disabledUnit, unitToEnable ) ) {
                    if ( $.isPlainObject( unitToEnable ) ) {
                        unitToEnable.inverted = true
                        matchFound = unitToEnable
                    }
                    else if ( $.isArray( unitToEnable ) ) {
                        matchFound = unitToEnable
                        if ( !matchFound[3] ) matchFound.push( 'inverted' )
                    }
                    else if ( _.isDate( unitToEnable ) ) {
                        matchFound = [ unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted' ]
                    }
                    break
                }
            }

            // If a match was found, remove a previous duplicate entry.
            if ( matchFound ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
                if ( calendar.isDateExact( disabledItems[index], unitToEnable ) ) {
                    disabledItems[index] = null
                    break
                }
            }

            // In the event that we’re dealing with an exact range of dates,
            // make sure there are no “inverted” dates because of it.
            if ( isExactRange ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
                if ( calendar.isDateOverlap( disabledItems[index], unitToEnable ) ) {
                    disabledItems[index] = null
                    break
                }
            }

            // If something is still matched, add it into the collection.
            if ( matchFound ) {
                disabledItems.push( matchFound )
            }
        })
    }

    // Return the updated collection.
    return disabledItems.filter(function( val ) { return val != null })
} //DatePicker.prototype.activate


/**
 * Create a string for the nodes in the picker.
 */
DatePicker.prototype.nodes = function( isOpen ) {

    var
        calendar = this,
        settings = calendar.settings,
        calendarItem = calendar.item,
        nowObject = calendarItem.now,
        selectedObject = calendarItem.select,
        highlightedObject = calendarItem.highlight,
        viewsetObject = calendarItem.view,
        disabledCollection = calendarItem.disable,
        minLimitObject = calendarItem.min,
        maxLimitObject = calendarItem.max,


        // Create the calendar table head using a copy of weekday labels collection.
        // * We do a copy so we don't mutate the original array.
        tableHead = (function( collection, fullCollection ) {

            // If the first day should be Monday, move Sunday to the end.
            if ( settings.firstDay ) {
                collection.push( collection.shift() )
                fullCollection.push( fullCollection.shift() )
            }

            // Create and return the table head group.
            return _.node(
                'thead',
                _.node(
                    'tr',
                    _.group({
                        min: 0,
                        max: DAYS_IN_WEEK - 1,
                        i: 1,
                        node: 'th',
                        item: function( counter ) {
                            return [
                                collection[ counter ],
                                settings.klass.weekdays,
                                'scope=col title="' + fullCollection[ counter ] + '"'
                            ]
                        }
                    })
                )
            ) //endreturn

        // Materialize modified
        })( ( settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter ).slice( 0 ), settings.weekdaysFull.slice( 0 ) ), //tableHead


        // Create the nav for next/prev month.
        createMonthNav = function( next ) {

            // Otherwise, return the created month tag.
            return _.node(
                'div',
                ' ',
                settings.klass[ 'nav' + ( next ? 'Next' : 'Prev' ) ] + (

                    // If the focused month is outside the range, disabled the button.
                    ( next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month ) ||
                    ( !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ) ?
                    ' ' + settings.klass.navDisabled : ''
                ),
                'data-nav=' + ( next || -1 ) + ' ' +
                _.ariaAttr({
                    role: 'button',
                    controls: calendar.$node[0].id + '_table'
                }) + ' ' +
                'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev ) + '"'
            ) //endreturn
        }, //createMonthNav


        // Create the month label.
        //Materialize modified
        createMonthLabel = function(override) {

            var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull

             // Materialize modified
            if (override == "short_months") {
              monthsCollection = settings.monthsShort;
            }

            // If there are months to select, add a dropdown menu.
            if ( settings.selectMonths  && override == undefined) {

                return _.node( 'select',
                    _.group({
                        min: 0,
                        max: 11,
                        i: 1,
                        node: 'option',
                        item: function( loopedMonth ) {

                            return [

                                // The looped month and no classes.
                                monthsCollection[ loopedMonth ], 0,

                                // Set the value and selected index.
                                'value=' + loopedMonth +
                                ( viewsetObject.month == loopedMonth ? ' selected' : '' ) +
                                (
                                    (
                                        ( viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month ) ||
                                        ( viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month )
                                    ) ?
                                    ' disabled' : ''
                                )
                            ]
                        }
                    }),
                    settings.klass.selectMonth + ' browser-default',
                    ( isOpen ? '' : 'disabled' ) + ' ' +
                    _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                    'title="' + settings.labelMonthSelect + '"'
                )
            }

            // Materialize modified
            if (override == "short_months")
                if (selectedObject != null)
                return _.node( 'div', monthsCollection[ selectedObject.month ] );
                else return _.node( 'div', monthsCollection[ viewsetObject.month ] );

            // If there's a need for a month selector
            return _.node( 'div', monthsCollection[ viewsetObject.month ], settings.klass.month )
        }, //createMonthLabel


        // Create the year label.
        // Materialize modified
        createYearLabel = function(override) {

            var focusedYear = viewsetObject.year,

            // If years selector is set to a literal "true", set it to 5. Otherwise
            // divide in half to get half before and half after focused year.
            numberYears = settings.selectYears === true ? 5 : ~~( settings.selectYears / 2 )

            // If there are years to select, add a dropdown menu.
            if ( numberYears ) {

                var
                    minYear = minLimitObject.year,
                    maxYear = maxLimitObject.year,
                    lowestYear = focusedYear - numberYears,
                    highestYear = focusedYear + numberYears

                // If the min year is greater than the lowest year, increase the highest year
                // by the difference and set the lowest year to the min year.
                if ( minYear > lowestYear ) {
                    highestYear += minYear - lowestYear
                    lowestYear = minYear
                }

                // If the max year is less than the highest year, decrease the lowest year
                // by the lower of the two: available and needed years. Then set the
                // highest year to the max year.
                if ( maxYear < highestYear ) {

                    var availableYears = lowestYear - minYear,
                        neededYears = highestYear - maxYear

                    lowestYear -= availableYears > neededYears ? neededYears : availableYears
                    highestYear = maxYear
                }

                if ( settings.selectYears  && override == undefined ) {
                    return _.node( 'select',
                        _.group({
                            min: lowestYear,
                            max: highestYear,
                            i: 1,
                            node: 'option',
                            item: function( loopedYear ) {
                                return [

                                    // The looped year and no classes.
                                    loopedYear, 0,

                                    // Set the value and selected index.
                                    'value=' + loopedYear + ( focusedYear == loopedYear ? ' selected' : '' )
                                ]
                            }
                        }),
                        settings.klass.selectYear + ' browser-default',
                        ( isOpen ? '' : 'disabled' ) + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
                        'title="' + settings.labelYearSelect + '"'
                    )
                }
            }

            // Materialize modified
            if (override == "raw")
                return _.node( 'div', focusedYear )

            // Otherwise just return the year focused
            return _.node( 'div', focusedYear, settings.klass.year )
        } //createYearLabel


        // Materialize modified
        createDayLabel = function() {
                if (selectedObject != null)
                    return _.node( 'div', selectedObject.date)
                else return _.node( 'div', nowObject.date)
            }
        createWeekdayLabel = function() {
            var display_day;

            if (selectedObject != null)
                display_day = selectedObject.day;
            else
                display_day = nowObject.day;
            var weekday = settings.weekdaysFull[ display_day ]
            return weekday
        }


    // Create and return the entire calendar.
return _.node(
        // Date presentation View
        'div',
            _.node(
                'div',
                createWeekdayLabel(),
                "picker__weekday-display"
            )+
            _.node(
                // Div for short Month
                'div',
                createMonthLabel("short_months"),
                settings.klass.month_display
            )+
            _.node(
                // Div for Day
                'div',
                createDayLabel() ,
                settings.klass.day_display
            )+
            _.node(
                // Div for Year
                'div',
                createYearLabel("raw") ,
                settings.klass.year_display
            ),
        settings.klass.date_display
    )+
    // Calendar container
    _.node('div',
        _.node('div',
        ( settings.selectYears ?  createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel() ) +
        createMonthNav() + createMonthNav( 1 ),
        settings.klass.header
    ) + _.node(
        'table',
        tableHead +
        _.node(
            'tbody',
            _.group({
                min: 0,
                max: WEEKS_IN_CALENDAR - 1,
                i: 1,
                node: 'tr',
                item: function( rowCounter ) {

                    // If Monday is the first day and the month starts on Sunday, shift the date back a week.
                    var shiftDateBy = settings.firstDay && calendar.create([ viewsetObject.year, viewsetObject.month, 1 ]).day === 0 ? -7 : 0

                    return [
                        _.group({
                            min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
                            max: function() {
                                return this.min + DAYS_IN_WEEK - 1
                            },
                            i: 1,
                            node: 'td',
                            item: function( targetDate ) {

                                // Convert the time date from a relative date to a target date.
                                targetDate = calendar.create([ viewsetObject.year, viewsetObject.month, targetDate + ( settings.firstDay ? 1 : 0 ) ])

                                var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
                                    isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
                                    isDisabled = disabledCollection && calendar.disabled( targetDate ) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
                                    formattedDate = _.trigger( calendar.formats.toString, calendar, [ settings.format, targetDate ] )

                                return [
                                    _.node(
                                        'div',
                                        targetDate.date,
                                        (function( klasses ) {

                                            // Add the `infocus` or `outfocus` classes based on month in view.
                                            klasses.push( viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus )

                                            // Add the `today` class if needed.
                                            if ( nowObject.pick == targetDate.pick ) {
                                                klasses.push( settings.klass.now )
                                            }

                                            // Add the `selected` class if something's selected and the time matches.
                                            if ( isSelected ) {
                                                klasses.push( settings.klass.selected )
                                            }

                                            // Add the `highlighted` class if something's highlighted and the time matches.
                                            if ( isHighlighted ) {
                                                klasses.push( settings.klass.highlighted )
                                            }

                                            // Add the `disabled` class if something's disabled and the object matches.
                                            if ( isDisabled ) {
                                                klasses.push( settings.klass.disabled )
                                            }

                                            return klasses.join( ' ' )
                                        })([ settings.klass.day ]),
                                        'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
                                            role: 'gridcell',
                                            label: formattedDate,
                                            selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
                                            activedescendant: isHighlighted ? true : null,
                                            disabled: isDisabled ? true : null
                                        })
                                    ),
                                    '',
                                    _.ariaAttr({ role: 'presentation' })
                                ] //endreturn
                            }
                        })
                    ] //endreturn
                }
            })
        ),
        settings.klass.table,
        'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
            role: 'grid',
            controls: calendar.$node[0].id,
            readonly: true
        })
    )
    , settings.klass.calendar_container) // end calendar

     +

    // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
    _.node(
        'div',
        _.node( 'button', settings.today, "btn-flat picker__today",
            'type=button data-pick=' + nowObject.pick +
            ( isOpen && !calendar.disabled(nowObject) ? '' : ' disabled' ) + ' ' +
            _.ariaAttr({ controls: calendar.$node[0].id }) ) +
        _.node( 'button', settings.clear, "btn-flat picker__clear",
            'type=button data-clear=1' +
            ( isOpen ? '' : ' disabled' ) + ' ' +
            _.ariaAttr({ controls: calendar.$node[0].id }) ) +
        _.node('button', settings.close, "btn-flat picker__close",
            'type=button data-close=true ' +
            ( isOpen ? '' : ' disabled' ) + ' ' +
            _.ariaAttr({ controls: calendar.$node[0].id }) ),
        settings.klass.footer
    ) //endreturn
} //DatePicker.prototype.nodes




/**
 * The date picker defaults.
 */
DatePicker.defaults = (function( prefix ) {

    return {

        // The title label to use for the month nav buttons
        labelMonthNext: 'Next month',
        labelMonthPrev: 'Previous month',

        // The title label to use for the dropdown selectors
        labelMonthSelect: 'Select a month',
        labelYearSelect: 'Select a year',

        // Months and weekdays
        monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],

        // Materialize modified
        weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],

        // Today and clear
        today: 'Today',
        clear: 'Clear',
        close: 'Close',

        // The format to show on the `input` element
        format: 'd mmmm, yyyy',

        // Classes
        klass: {

            table: prefix + 'table',

            header: prefix + 'header',


            // Materialize Added klasses
            date_display: prefix + 'date-display',
            day_display: prefix + 'day-display',
            month_display: prefix + 'month-display',
            year_display: prefix + 'year-display',
            calendar_container: prefix + 'calendar-container',
            // end



            navPrev: prefix + 'nav--prev',
            navNext: prefix + 'nav--next',
            navDisabled: prefix + 'nav--disabled',

            month: prefix + 'month',
            year: prefix + 'year',

            selectMonth: prefix + 'select--month',
            selectYear: prefix + 'select--year',

            weekdays: prefix + 'weekday',

            day: prefix + 'day',
            disabled: prefix + 'day--disabled',
            selected: prefix + 'day--selected',
            highlighted: prefix + 'day--highlighted',
            now: prefix + 'day--today',
            infocus: prefix + 'day--infocus',
            outfocus: prefix + 'day--outfocus',

            footer: prefix + 'footer',

            buttonClear: prefix + 'button--clear',
            buttonToday: prefix + 'button--today',
            buttonClose: prefix + 'button--close'
        }
    }
})( Picker.klasses().picker + '__' )





/**
 * Extend the picker to add the date picker.
 */
Picker.extend( 'pickadate', DatePicker )


}));


;(function ($) {

  $.fn.characterCounter = function(){
    return this.each(function(){

      var itHasLengthAttribute = $(this).attr('length') !== undefined;

      if(itHasLengthAttribute){
        $(this).on('input', updateCounter);
        $(this).on('focus', updateCounter);
        $(this).on('blur', removeCounterElement);

        addCounterElement($(this));
      }

    });
  };

  function updateCounter(){
    var maxLength     = +$(this).attr('length'),
    actualLength      = +$(this).val().length,
    isValidLength     = actualLength <= maxLength;

    $(this).parent().find('span[class="character-counter"]')
                    .html( actualLength + '/' + maxLength);

    addInputStyle(isValidLength, $(this));
  }

  function addCounterElement($input){
    var $counterElement = $('<span/>')
                        .addClass('character-counter')
                        .css('float','right')
                        .css('font-size','12px')
                        .css('height', 1);

    $input.parent().append($counterElement);
  }

  function removeCounterElement(){
    $(this).parent().find('span[class="character-counter"]').html('');
  }

  function addInputStyle(isValidLength, $input){
    var inputHasInvalidClass = $input.hasClass('invalid');
    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass('invalid');
    }
    else if(!isValidLength && !inputHasInvalidClass){
      $input.removeClass('valid');
      $input.addClass('invalid');
    }
  }

  $(document).ready(function(){
    $('input, textarea').characterCounter();
  });

}( jQuery ));

(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.define({'phoenix': function(exports, require, module){ "use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

// Phoenix Channels JavaScript client
//
// ## Socket Connection
//
// A single connection is established to the server and
// channels are mulitplexed over the connection.
// Connect to the server using the `Socket` class:
//
//     let socket = new Socket("/ws")
//     socket.connect()
//
// The `Socket` constructor takes the mount point of the socket
// as well as options that can be found in the Socket docs,
// such as configuring the `LongPoll` transport, and heartbeat.
// Socket params can also be passed as an option for default, but
// overridable channel params to apply to all channels.
//
//
// ## Channels
//
// Channels are isolated, concurrent processes on the server that
// subscribe to topics and broker events between the client and server.
// To join a channel, you must provide the topic, and channel params for
// authorization. Here's an example chat room example where `"new_msg"`
// events are listened for, messages are pushed to the server, and
// the channel is joined with ok/error matches, and `after` hook:
//
//     let chan = socket.chan("rooms:123", {token: roomToken})
//     chan.on("new_msg", msg => console.log("Got message", msg) )
//     $input.onEnter( e => {
//       chan.push("new_msg", {body: e.target.val})
//           .receive("ok", (message) => console.log("created message", message) )
//           .receive("error", (reasons) => console.log("create failed", reasons) )
//           .after(10000, () => console.log("Networking issue. Still waiting...") )
//     })
//     chan.join()
//         .receive("ok", ({messages}) => console.log("catching up", messages) )
//         .receive("error", ({reason}) => console.log("failed join", reason) )
//         .after(10000, () => console.log("Networking issue. Still waiting...") )
//
//
// ## Joining
//
// Joining a channel with `chan.join(topic, params)`, binds the params to
// `chan.params`. Subsequent rejoins will send up the modified params for
// updating authorization params, or passing up last_message_id information.
// Successful joins receive an "ok" status, while unsuccessful joins
// receive "error".
//
//
// ## Pushing Messages
//
// From the previous example, we can see that pushing messages to the server
// can be done with `chan.push(eventName, payload)` and we can optionally
// receive responses from the push. Additionally, we can use
// `after(millsec, callback)` to abort waiting for our `receive` hooks and
// take action after some period of waiting.
//
//
// ## Socket Hooks
//
// Lifecycle events of the multiplexed connection can be hooked into via
// `socket.onError()` and `socket.onClose()` events, ie:
//
//     socket.onError( () => console.log("there was an error with the connection!") )
//     socket.onClose( () => console.log("the connection dropped") )
//
//
// ## Channel Hooks
//
// For each joined channel, you can bind to `onError` and `onClose` events
// to monitor the channel lifecycle, ie:
//
//     chan.onError( () => console.log("there was an error!") )
//     chan.onClose( () => console.log("the channel has gone away gracefully") )
//
// ### onError hooks
//
// `onError` hooks are invoked if the socket connection drops, or the channel
// crashes on the server. In either case, a channel rejoin is attemtped
// automatically in an exponential backoff manner.
//
// ### onClose hooks
//
// `onClose` hooks are invoked only in two cases. 1) the channel explicitly
// closed on the server, or 2). The client explicitly closed, by calling
// `chan.leave()`
//

var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
var CHAN_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining" };
var CHAN_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
};
var TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
};

var Push = (function () {

  // Initializes the Push
  //
  // chan - The Channel
  // event - The event, ie `"phx_join"`
  // payload - The payload, ie `{user_id: 123}`
  //

  function Push(chan, event, payload) {
    _classCallCheck(this, Push);

    this.chan = chan;
    this.event = event;
    this.payload = payload || {};
    this.receivedResp = null;
    this.afterHook = null;
    this.recHooks = [];
    this.sent = false;
  }

  _prototypeProperties(Push, null, {
    send: {
      value: function send() {
        var _this = this;

        var ref = this.chan.socket.makeRef();
        this.refEvent = this.chan.replyEventName(ref);
        this.receivedResp = null;
        this.sent = false;

        this.chan.on(this.refEvent, function (payload) {
          _this.receivedResp = payload;
          _this.matchReceive(payload);
          _this.cancelRefEvent();
          _this.cancelAfter();
        });

        this.startAfter();
        this.sent = true;
        this.chan.socket.push({
          topic: this.chan.topic,
          event: this.event,
          payload: this.payload,
          ref: ref
        });
      },
      writable: true,
      configurable: true
    },
    receive: {
      value: function receive(status, callback) {
        if (this.receivedResp && this.receivedResp.status === status) {
          callback(this.receivedResp.response);
        }

        this.recHooks.push({ status: status, callback: callback });
        return this;
      },
      writable: true,
      configurable: true
    },
    after: {
      value: function after(ms, callback) {
        if (this.afterHook) {
          throw "only a single after hook can be applied to a push";
        }
        var timer = null;
        if (this.sent) {
          timer = setTimeout(callback, ms);
        }
        this.afterHook = { ms: ms, callback: callback, timer: timer };
        return this;
      },
      writable: true,
      configurable: true
    },
    matchReceive: {

      // private

      value: function matchReceive(_ref) {
        var status = _ref.status;
        var response = _ref.response;
        var ref = _ref.ref;

        this.recHooks.filter(function (h) {
          return h.status === status;
        }).forEach(function (h) {
          return h.callback(response);
        });
      },
      writable: true,
      configurable: true
    },
    cancelRefEvent: {
      value: function cancelRefEvent() {
        this.chan.off(this.refEvent);
      },
      writable: true,
      configurable: true
    },
    cancelAfter: {
      value: function cancelAfter() {
        if (!this.afterHook) {
          return;
        }
        clearTimeout(this.afterHook.timer);
        this.afterHook.timer = null;
      },
      writable: true,
      configurable: true
    },
    startAfter: {
      value: function startAfter() {
        var _this = this;

        if (!this.afterHook) {
          return;
        }
        var callback = function () {
          _this.cancelRefEvent();
          _this.afterHook.callback();
        };
        this.afterHook.timer = setTimeout(callback, this.afterHook.ms);
      },
      writable: true,
      configurable: true
    }
  });

  return Push;
})();

var Channel = exports.Channel = (function () {
  function Channel(topic, params, socket) {
    var _this = this;

    _classCallCheck(this, Channel);

    this.state = CHAN_STATES.closed;
    this.topic = topic;
    this.params = params || {};
    this.socket = socket;
    this.bindings = [];
    this.joinedOnce = false;
    this.joinPush = new Push(this, CHAN_EVENTS.join, this.params);
    this.pushBuffer = [];
    this.rejoinTimer = new Timer(function () {
      return _this.rejoinUntilConnected();
    }, this.socket.reconnectAfterMs);
    this.joinPush.receive("ok", function () {
      _this.state = CHAN_STATES.joined;
      _this.rejoinTimer.reset();
    });
    this.onClose(function () {
      _this.socket.log("channel", "close " + _this.topic);
      _this.state = CHAN_STATES.closed;
      _this.socket.remove(_this);
    });
    this.onError(function (reason) {
      _this.socket.log("channel", "error " + _this.topic, reason);
      _this.state = CHAN_STATES.errored;
      _this.rejoinTimer.setTimeout();
    });
    this.on(CHAN_EVENTS.reply, function (payload, ref) {
      _this.trigger(_this.replyEventName(ref), payload);
    });
  }

  _prototypeProperties(Channel, null, {
    rejoinUntilConnected: {
      value: function rejoinUntilConnected() {
        this.rejoinTimer.setTimeout();
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      },
      writable: true,
      configurable: true
    },
    join: {
      value: function join() {
        if (this.joinedOnce) {
          throw "tried to join multiple times. 'join' can only be called a single time per channel instance";
        } else {
          this.joinedOnce = true;
        }
        this.sendJoin();
        return this.joinPush;
      },
      writable: true,
      configurable: true
    },
    onClose: {
      value: function onClose(callback) {
        this.on(CHAN_EVENTS.close, callback);
      },
      writable: true,
      configurable: true
    },
    onError: {
      value: function onError(callback) {
        this.on(CHAN_EVENTS.error, function (reason) {
          return callback(reason);
        });
      },
      writable: true,
      configurable: true
    },
    on: {
      value: function on(event, callback) {
        this.bindings.push({ event: event, callback: callback });
      },
      writable: true,
      configurable: true
    },
    off: {
      value: function off(event) {
        this.bindings = this.bindings.filter(function (bind) {
          return bind.event !== event;
        });
      },
      writable: true,
      configurable: true
    },
    canPush: {
      value: function canPush() {
        return this.socket.isConnected() && this.state === CHAN_STATES.joined;
      },
      writable: true,
      configurable: true
    },
    push: {
      value: function push(event, payload) {
        if (!this.joinedOnce) {
          throw "tried to push '" + event + "' to '" + this.topic + "' before joining. Use chan.join() before pushing events";
        }
        var pushEvent = new Push(this, event, payload);
        if (this.canPush()) {
          pushEvent.send();
        } else {
          this.pushBuffer.push(pushEvent);
        }

        return pushEvent;
      },
      writable: true,
      configurable: true
    },
    leave: {

      // Leaves the channel
      //
      // Unsubscribes from server events, and
      // instructs channel to terminate on server
      //
      // Triggers onClose() hooks
      //
      // To receive leave acknowledgements, use the a `receive`
      // hook to bind to the server ack, ie:
      //
      //     chan.leave().receive("ok", () => alert("left!") )
      //

      value: function leave() {
        var _this = this;

        return this.push(CHAN_EVENTS.leave).receive("ok", function () {
          _this.log("channel", "leave " + _this.topic);
          _this.trigger(CHAN_EVENTS.close, "leave");
        });
      },
      writable: true,
      configurable: true
    },
    onMessage: {

      // Overridable message hook
      //
      // Receives all events for specialized message handling

      value: function onMessage(event, payload, ref) {},
      writable: true,
      configurable: true
    },
    isMember: {

      // private

      value: function isMember(topic) {
        return this.topic === topic;
      },
      writable: true,
      configurable: true
    },
    sendJoin: {
      value: function sendJoin() {
        this.state = CHAN_STATES.joining;
        this.joinPush.send();
      },
      writable: true,
      configurable: true
    },
    rejoin: {
      value: function rejoin() {
        this.sendJoin();
        this.pushBuffer.forEach(function (pushEvent) {
          return pushEvent.send();
        });
        this.pushBuffer = [];
      },
      writable: true,
      configurable: true
    },
    trigger: {
      value: function trigger(triggerEvent, payload, ref) {
        this.onMessage(triggerEvent, payload, ref);
        this.bindings.filter(function (bind) {
          return bind.event === triggerEvent;
        }).map(function (bind) {
          return bind.callback(payload, ref);
        });
      },
      writable: true,
      configurable: true
    },
    replyEventName: {
      value: function replyEventName(ref) {
        return "chan_reply_" + ref;
      },
      writable: true,
      configurable: true
    }
  });

  return Channel;
})();

var Socket = exports.Socket = (function () {

  // Initializes the Socket
  //
  // endPoint - The string WebSocket endpoint, ie, "ws://example.com/ws",
  //                                               "wss://example.com"
  //                                               "/ws" (inherited host & protocol)
  // opts - Optional configuration
  //   transport - The Websocket Transport, ie WebSocket, Phoenix.LongPoll.
  //               Defaults to WebSocket with automatic LongPoll fallback.
  //   params - The defaults for all channel params, ie `{user_id: userToken}`
  //   heartbeatIntervalMs - The millisec interval to send a heartbeat message
  //   reconnectAfterMs - The optional function that returns the millsec
  //                      reconnect interval. Defaults to stepped backoff of:
  //
  //     function(tries){
  //       return [1000, 5000, 10000][tries - 1] || 10000
  //     }
  //
  //   logger - The optional function for specialized logging, ie:
  //     `logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
  //
  //   longpollerTimeout - The maximum timeout of a long poll AJAX request.
  //                        Defaults to 20s (double the server long poll timer).
  //
  // For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
  //

  function Socket(endPoint) {
    var _this = this;

    var opts = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Socket);

    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
    this.channels = [];
    this.sendBuffer = [];
    this.ref = 0;
    this.transport = opts.transport || window.WebSocket || LongPoll;
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 30000;
    this.reconnectAfterMs = opts.reconnectAfterMs || function (tries) {
      return [1000, 5000, 10000][tries - 1] || 10000;
    };
    this.reconnectTimer = new Timer(function () {
      return _this.connect();
    }, this.reconnectAfterMs);
    this.logger = opts.logger || function () {}; // noop
    this.longpollerTimeout = opts.longpollerTimeout || 20000;
    this.params = opts.params || {};
    this.endPoint = "" + endPoint + "/" + TRANSPORTS.websocket;
  }

  _prototypeProperties(Socket, null, {
    protocol: {
      value: function protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws";
      },
      writable: true,
      configurable: true
    },
    endPointURL: {
      value: function endPointURL() {
        var uri = Ajax.appendParams(this.endPoint, this.params);
        if (uri.charAt(0) !== "/") {
          return uri;
        }
        if (uri.charAt(1) === "/") {
          return "" + this.protocol() + ":" + uri;
        }

        return "" + this.protocol() + "://" + location.host + "" + uri;
      },
      writable: true,
      configurable: true
    },
    disconnect: {
      value: function disconnect(callback, code, reason) {
        if (this.conn) {
          this.conn.onclose = function () {}; // noop
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
          this.conn = null;
        }
        callback && callback();
      },
      writable: true,
      configurable: true
    },
    connect: {
      value: function connect() {
        var _this = this;

        this.disconnect(function () {
          _this.conn = new _this.transport(_this.endPointURL());
          _this.conn.timeout = _this.longpollerTimeout;
          _this.conn.onopen = function () {
            return _this.onConnOpen();
          };
          _this.conn.onerror = function (error) {
            return _this.onConnError(error);
          };
          _this.conn.onmessage = function (event) {
            return _this.onConnMessage(event);
          };
          _this.conn.onclose = function (event) {
            return _this.onConnClose(event);
          };
        });
      },
      writable: true,
      configurable: true
    },
    log: {

      // Logs the message. Override `this.logger` for specialized logging. noops by default

      value: function log(kind, msg, data) {
        this.logger(kind, msg, data);
      },
      writable: true,
      configurable: true
    },
    onOpen: {

      // Registers callbacks for connection state change events
      //
      // Examples
      //
      //    socket.onError(function(error){ alert("An error occurred") })
      //

      value: function onOpen(callback) {
        this.stateChangeCallbacks.open.push(callback);
      },
      writable: true,
      configurable: true
    },
    onClose: {
      value: function onClose(callback) {
        this.stateChangeCallbacks.close.push(callback);
      },
      writable: true,
      configurable: true
    },
    onError: {
      value: function onError(callback) {
        this.stateChangeCallbacks.error.push(callback);
      },
      writable: true,
      configurable: true
    },
    onMessage: {
      value: function onMessage(callback) {
        this.stateChangeCallbacks.message.push(callback);
      },
      writable: true,
      configurable: true
    },
    onConnOpen: {
      value: function onConnOpen() {
        var _this = this;

        this.log("transport", "connected to " + this.endPointURL(), this.transport.prototype);
        this.flushSendBuffer();
        this.reconnectTimer.reset();
        if (!this.conn.skipHeartbeat) {
          clearInterval(this.heartbeatTimer);
          this.heartbeatTimer = setInterval(function () {
            return _this.sendHeartbeat();
          }, this.heartbeatIntervalMs);
        }
        this.stateChangeCallbacks.open.forEach(function (callback) {
          return callback();
        });
      },
      writable: true,
      configurable: true
    },
    onConnClose: {
      value: function onConnClose(event) {
        this.log("transport", "close", event);
        this.triggerChanError();
        clearInterval(this.heartbeatTimer);
        this.reconnectTimer.setTimeout();
        this.stateChangeCallbacks.close.forEach(function (callback) {
          return callback(event);
        });
      },
      writable: true,
      configurable: true
    },
    onConnError: {
      value: function onConnError(error) {
        this.log("transport", error);
        this.triggerChanError();
        this.stateChangeCallbacks.error.forEach(function (callback) {
          return callback(error);
        });
      },
      writable: true,
      configurable: true
    },
    triggerChanError: {
      value: function triggerChanError() {
        this.channels.forEach(function (chan) {
          return chan.trigger(CHAN_EVENTS.error);
        });
      },
      writable: true,
      configurable: true
    },
    connectionState: {
      value: function connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return "connecting";
          case SOCKET_STATES.open:
            return "open";
          case SOCKET_STATES.closing:
            return "closing";
          default:
            return "closed";
        }
      },
      writable: true,
      configurable: true
    },
    isConnected: {
      value: function isConnected() {
        return this.connectionState() === "open";
      },
      writable: true,
      configurable: true
    },
    remove: {
      value: function remove(chan) {
        this.channels = this.channels.filter(function (c) {
          return !c.isMember(chan.topic);
        });
      },
      writable: true,
      configurable: true
    },
    chan: {
      value: function chan(topic) {
        var chanParams = arguments[1] === undefined ? {} : arguments[1];

        var mergedParams = {};
        for (var key in this.params) {
          mergedParams[key] = this.params[key];
        }
        for (var key in chanParams) {
          mergedParams[key] = chanParams[key];
        }

        var chan = new Channel(topic, mergedParams, this);
        this.channels.push(chan);
        return chan;
      },
      writable: true,
      configurable: true
    },
    push: {
      value: function push(data) {
        var _this = this;

        var topic = data.topic;
        var event = data.event;
        var payload = data.payload;
        var ref = data.ref;

        var callback = function () {
          return _this.conn.send(JSON.stringify(data));
        };
        this.log("push", "" + topic + " " + event + " (" + ref + ")", payload);
        if (this.isConnected()) {
          callback();
        } else {
          this.sendBuffer.push(callback);
        }
      },
      writable: true,
      configurable: true
    },
    makeRef: {

      // Return the next message ref, accounting for overflows

      value: function makeRef() {
        var newRef = this.ref + 1;
        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }

        return this.ref.toString();
      },
      writable: true,
      configurable: true
    },
    sendHeartbeat: {
      value: function sendHeartbeat() {
        this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.makeRef() });
      },
      writable: true,
      configurable: true
    },
    flushSendBuffer: {
      value: function flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach(function (callback) {
            return callback();
          });
          this.sendBuffer = [];
        }
      },
      writable: true,
      configurable: true
    },
    onConnMessage: {
      value: function onConnMessage(rawMessage) {
        var msg = JSON.parse(rawMessage.data);
        var topic = msg.topic;
        var event = msg.event;
        var payload = msg.payload;
        var ref = msg.ref;

        this.log("receive", "" + (payload.status || "") + " " + topic + " " + event + " " + (ref && "(" + ref + ")" || ""), payload);
        this.channels.filter(function (chan) {
          return chan.isMember(topic);
        }).forEach(function (chan) {
          return chan.trigger(event, payload, ref);
        });
        this.stateChangeCallbacks.message.forEach(function (callback) {
          return callback(msg);
        });
      },
      writable: true,
      configurable: true
    }
  });

  return Socket;
})();

var LongPoll = exports.LongPoll = (function () {
  function LongPoll(endPoint) {
    _classCallCheck(this, LongPoll);

    this.endPoint = null;
    this.token = null;
    this.sig = null;
    this.skipHeartbeat = true;
    this.onopen = function () {}; // noop
    this.onerror = function () {}; // noop
    this.onmessage = function () {}; // noop
    this.onclose = function () {}; // noop
    this.pollEndpoint = this.normalizeEndpoint(endPoint);
    this.readyState = SOCKET_STATES.connecting;

    this.poll();
  }

  _prototypeProperties(LongPoll, null, {
    normalizeEndpoint: {
      value: function normalizeEndpoint(endPoint) {
        return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
      },
      writable: true,
      configurable: true
    },
    endpointURL: {
      value: function endpointURL() {
        return Ajax.appendParams(this.pollEndpoint, {
          token: this.token,
          sig: this.sig,
          format: "json"
        });
      },
      writable: true,
      configurable: true
    },
    closeAndRetry: {
      value: function closeAndRetry() {
        this.close();
        this.readyState = SOCKET_STATES.connecting;
      },
      writable: true,
      configurable: true
    },
    ontimeout: {
      value: function ontimeout() {
        this.onerror("timeout");
        this.closeAndRetry();
      },
      writable: true,
      configurable: true
    },
    poll: {
      value: function poll() {
        var _this = this;

        if (!(this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting)) {
          return;
        }

        Ajax.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), function (resp) {
          if (resp) {
            var status = resp.status;
            var token = resp.token;
            var sig = resp.sig;
            var messages = resp.messages;

            _this.token = token;
            _this.sig = sig;
          } else {
            var status = 0;
          }

          switch (status) {
            case 200:
              messages.forEach(function (msg) {
                return _this.onmessage({ data: JSON.stringify(msg) });
              });
              _this.poll();
              break;
            case 204:
              _this.poll();
              break;
            case 410:
              _this.readyState = SOCKET_STATES.open;
              _this.onopen();
              _this.poll();
              break;
            case 0:
            case 500:
              _this.onerror();
              _this.closeAndRetry();
              break;
            default:
              throw "unhandled poll status " + status;
          }
        });
      },
      writable: true,
      configurable: true
    },
    send: {
      value: function send(body) {
        var _this = this;

        Ajax.request("POST", this.endpointURL(), "application/json", body, this.timeout, this.onerror.bind(this, "timeout"), function (resp) {
          if (!resp || resp.status !== 200) {
            _this.onerror(status);
            _this.closeAndRetry();
          }
        });
      },
      writable: true,
      configurable: true
    },
    close: {
      value: function close(code, reason) {
        this.readyState = SOCKET_STATES.closed;
        this.onclose();
      },
      writable: true,
      configurable: true
    }
  });

  return LongPoll;
})();

var Ajax = exports.Ajax = (function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _prototypeProperties(Ajax, {
    request: {
      value: function request(method, endPoint, accept, body, timeout, ontimeout, callback) {
        if (window.XDomainRequest) {
          var req = new XDomainRequest(); // IE8, IE9
          this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
        } else {
          var req = window.XMLHttpRequest ? new XMLHttpRequest() : // IE7+, Firefox, Chrome, Opera, Safari
          new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
          this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
        }
      },
      writable: true,
      configurable: true
    },
    xdomainRequest: {
      value: function xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
        var _this = this;

        req.timeout = timeout;
        req.open(method, endPoint);
        req.onload = function () {
          var response = _this.parseJSON(req.responseText);
          callback && callback(response);
        };
        if (ontimeout) {
          req.ontimeout = ontimeout;
        }

        // Work around bug in IE9 that requires an attached onprogress handler
        req.onprogress = function () {};

        req.send(body);
      },
      writable: true,
      configurable: true
    },
    xhrRequest: {
      value: function xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
        var _this = this;

        req.timeout = timeout;
        req.open(method, endPoint, true);
        req.setRequestHeader("Content-Type", accept);
        req.onerror = function () {
          callback && callback(null);
        };
        req.onreadystatechange = function () {
          if (req.readyState === _this.states.complete && callback) {
            var response = _this.parseJSON(req.responseText);
            callback(response);
          }
        };
        if (ontimeout) {
          req.ontimeout = ontimeout;
        }

        req.send(body);
      },
      writable: true,
      configurable: true
    },
    parseJSON: {
      value: function parseJSON(resp) {
        return resp && resp !== "" ? JSON.parse(resp) : null;
      },
      writable: true,
      configurable: true
    },
    serialize: {
      value: function serialize(obj, parentKey) {
        var queryStr = [];
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {
            continue;
          }
          var paramKey = parentKey ? "" + parentKey + "[" + key + "]" : key;
          var paramVal = obj[key];
          if (typeof paramVal === "object") {
            queryStr.push(this.serialize(paramVal, paramKey));
          } else {
            queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
          }
        }
        return queryStr.join("&");
      },
      writable: true,
      configurable: true
    },
    appendParams: {
      value: function appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }

        var prefix = url.match(/\?/) ? "&" : "?";
        return "" + url + "" + prefix + "" + this.serialize(params);
      },
      writable: true,
      configurable: true
    }
  });

  return Ajax;
})();

Ajax.states = { complete: 4 };

// Creates a timer that accepts a `timerCalc` function to perform
// calculated timeout retries, such as exponential backoff.
//
// ## Examples
//
//    let reconnectTimer = new Timer(() => this.connect(), function(tries){
//      return [1000, 5000, 10000][tries - 1] || 10000
//    })
//    reconnectTimer.setTimeout() // fires after 1000
//    reconnectTimer.setTimeout() // fires after 5000
//    reconnectTimer.reset()
//    reconnectTimer.setTimeout() // fires after 1000
//

var Timer = (function () {
  function Timer(callback, timerCalc) {
    _classCallCheck(this, Timer);

    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = null;
    this.tries = 0;
  }

  _prototypeProperties(Timer, null, {
    reset: {
      value: function reset() {
        this.tries = 0;
        clearTimeout(this.timer);
      },
      writable: true,
      configurable: true
    },
    setTimeout: {

      // Cancels any previous setTimeout and schedules callback

      value: (function (_setTimeout) {
        var _setTimeoutWrapper = function setTimeout() {
          return _setTimeout.apply(this, arguments);
        };

        _setTimeoutWrapper.toString = function () {
          return _setTimeout.toString();
        };

        return _setTimeoutWrapper;
      })(function () {
        var _this = this;

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {
          _this.tries = _this.tries + 1;
          _this.callback();
        }, this.timerCalc(this.tries + 1));
      }),
      writable: true,
      configurable: true
    }
  });

  return Timer;
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
 }});
if(typeof(window) === 'object' && !window.Phoenix){ window.Phoenix = require('phoenix') };
require.register("web/static/js/ajax", function(exports, require, module) {
"use strict";

function getPercentage() {
   $.getJSON("/show/battery/percentage", function (data) {
      $('#battery-level').html(data.pr + " %");
   });
}
});

;require.register("web/static/js/app", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phoenix = require("phoenix");

var App = {};

exports["default"] = App;
module.exports = exports["default"];
});

;require.register("web/static/js/chart", function(exports, require, module) {
'use strict';

google.load('visualization', '1.0', { 'packages': ['corechart'] });
google.setOnLoadCallback(init);

window.chart_page = 1;
window.chart_days = 1;
window.from = 0;
window.to = 0;
window.prediction = 0;
window.l = 0;
window.window.data = "";
function init() {
  ch(0);
}

function ch(l) {
  window.l = l;
  var tmp = Math.floor(new Date().getTime() / 1000);
  window.from = tmp - (window.chart_page + l) * window.chart_days * 24 * 60 * 60;
  window.to = tmp - (window.chart_page + l - 1) * window.chart_days * 24 * 60 * 60;

  $.get("/chart/show/" + from + "/" + to, function (d) {
    var js = d.records;

    window.data = new google.visualization.DataTable();
    window.data.addColumn('datetime', 'Time');
    window.data.addColumn('number', 'Percent');
    window.data.addColumn('number', 'Estimate');
    var z = new moment(from * 1000).utc();
    window.data.addRow([new Date(z.year(), z.month(), z.date(), z.hour(), z.minute(), 0), null, null]);
    var z = new moment(to * 1000).utc();
    window.data.addRow([new Date(z.year(), z.month(), z.date(), z.hour(), z.minute(), 0), null, null]);
    for (var i = 0; i < js.length; ++i) {
      var zm = new moment(js[i].timestamp * 1000).utc();
      if (i + 1 < js.length && js[i + 1].timestamp - js[i].timestamp > 70) {
        var zm1 = new moment((js[i].timestamp + 1) * 1000).utc();
        window.data.addRow([new Date(zm1.year(), zm1.month(), zm1.date(), zm1.hour(), zm1.minute()), null, null]);
      }
      if (i - 1 >= 0 && js[i].timestamp - js[i - 1].timestamp > 70) {
        var zm1 = new moment((js[i + 1].timestamp - 1) * 1000).utc();
        window.data.addRow([new Date(zm1.year(), zm1.month(), zm1.date(), zm1.hour(), zm1.minute()), null, null]);
      }
      window.data.addRow([new Date(zm.year(), zm.month(), zm.date(), zm.hour(), zm.minute(), 0), js[i].pr, null]);
    }
    var options = {
      vAxis: { titleTextStyle: { fontSize: 20, bold: true }, title: 'Battery level (%)', minValue: 0, maxValue: 100 },
      seriesType: 'area', series: { 0: { labelInLegend: 'Real battery level', color: '#03a9f4', areaOpacity: 0.6, curveType: 'function' }, 1: { type: 'line', color: 'black', labelInLegend: 'Estimated battery level' } },
      interpolateNulls: false, height: 500,
      animation: {
        duration: 1000,
        easing: 'out'
      }
    };
    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    var btnback = document.getElementById('btn-back');
    var btnforward = document.getElementById('btn-forward');
    function drawChart() {
      chart.draw(window.data, options);
    }

    btnback.onclick = function () {
      //tutaj bierzemy starsze qwerty, wywalamy backwindow.data
      //backwindow.data(window.data);
      ch(1);
    };
    if (window.chart_page + l == 1) {
      btnforward.onclick = function () {
        ch(0);
      };
    } else {
      btnforward.onclick = function () {
        ch(-1);
      };
    }
    if (window.chart_page + window.l === 1 && (d.prediction.status == "Discharging" || d.prediction.status == "Charging") && d.prediction.time !== "Unknown") {
      /*alert(d.prediction.time);
      var n = new moment((js[js.length-1].time+2)*1000).utc();
      window.data.addRow([new Date(n.year(), n.month(), n.date(), n.hour(), n.minute(), n.second()), js[js.length-1].pr, js[js.length-1].pr]);*/
      var n = new moment(d.prediction * 1000 + new Date().getTime()).utc();
      var pr = 0;
      if (d.prediction.status == "Charging") pr = 100;
      window.data.addRow([new Date(n.year(), n.month(), n.date(), n.hour(), n.minute(), n.second()), pr, pr]);
    }
    drawChart();
    window.chart_page += l;
  }).error(function () {
    alert("error");
  });
}

/*
//przykładowe, do wywalenia
function addwindow.data(window.data)
{

  window.data.addColumn('datetime', 'Time');
  window.data.addColumn('number', 'Percent');
  window.data.addColumn('number', 'Estimate');
  var tmp = Math.floor(new Date().getTime()/1000);
  
  	//console.log(window.qwerty);

  	for(var i = 0; i < window.qwerty.length; ++i)
  		{
  			console.log(window.qwerty[i]);
  			var zm = new Date(window.qwerty[i].timestamp*1000);
  			console.log(zm.getUTCMinutes());
  			window.data.addRow([new Date(zm.getUTCFullYear(), zm.getUTCMonth(), zm.getUTCDay(), zm.getUTCHours(), zm.getUTCMinutes(), 0), 5, 5]);
  		}
  		
  		
*/

/*
	alert(js[0].pr);
	for(var i = 0; i < js.length; ++i)
	{
		console.log(js[i]);
		var zm = new Date(js[i].timestamp*1000);
		console.log(zm.getUTCMinutes());
		window.data.addRow([new Date(zm.getUTCFullYear(), zm.getUTCMonth(), zm.getUTCDay(), zm.getUTCHours(), zm.getUTCMinutes(), 0), 5, 5]);
	}});*/
//.error(function() { alert("Error");});

/*var charge = 8;

for(var j = 11; j<13; j++)
{
  for(var i = 0; i<59; i++)
  {
    charge += Math.trunc((i%3)/2);
    window.data.addRow([new Date(2015, 7, 20, j, i, 0), charge, charge]);
  }
}

window.data.addRow([new Date(2015, 7, 20, 13), null, null]);

for(var j = 14; j < 16; j++)
{
  for(var i = 0; i < 59; i+=5)
  {
    charge -= Math.trunc((i%3)/2);
    window.data.addRow([new Date(2015,7, 20, j, i), charge, charge]);
  }
}

for(var j = 16; j < 17; j++)
{
  for(var i = 0; i < 59; i+=5)
  {
    charge -= Math.trunc((i%3)/2);
    window.data.addRow([new Date(2015, 7, 20, j, i), null, charge]);
  }
}*/

//alert(new Date().getTime());
//}

/*function backwindow.data(window.data)
{
 	for(var i = 0; i < window.data.getNumberOfRows(); i++)
 	{
   		window.data.setValue(i,2,window.data.getValue(i,2)+30);
 	}
}*/
});

;require.register("web/static/js/init", function(exports, require, module) {
"use strict";

function getBattery() {
  $.getJSON("/battery/show/percentage", function (data) {
    $('#battery-level').html(data.pr + " %");
  });

  $.getJSON("/battery/show/prediction", function (data) {
    var zm = "";
    switch (data.status) {
      case "Charging":
      case "Discharging":
        zm = "Full " + data.status + " in";
        break;

      default:
        zm = data.status;

    }
    $('#bat-status').html(zm);
    var zm1 = data.time;
    if (typeof data.time === 'number') {
      zm1 = timestamp_to_time(zm1);
    }

    $('#bat-prediction').html(zm1);
  });
}

function timestamp_to_time(time) {
  var m = time;
  var h = Math.floor(m / 3600);
  var zm1 = '';
  if (h > 0) {
    var m = m - h * 3600;
    var zm1 = h.toString() + 'h';
  }
  var m = Math.floor(m / 60);
  var zm1 = zm1 + ' ' + m.toString() + 'm';
  return zm1;
}

function history_pagination(index) {
  var p = 10;
  var json = { from: $('#filter_from').val(), to: $('#filter_to').val(), _csrf_token: document.getElementsByName("_csrf_token")[0].value };
  $.post("/history/show/" + p, json).done(function (data) {
    var mes = "Showing results from " + ((index - 1) * p + 1) + " to ";
    if (index * p > data.no_categories) mes += data.no_categories;else mes += index * p;

    mes += " of " + data.no_categories + "<br/>";
    //mes += "Average charging in "+timestamp_to_time(data.charge);
    $("#average_discharging").html(timestamp_to_time(data.discharge));
    $("#average_charging").html(timestamp_to_time(data.charge));
    $("#results").html(mes);
    document.getElementById("average_table").style.visibility = "visible";
    $('#paginator').twbsPagination({
      totalPages: data.no_pages,
      startPage: index,
      visiblePages: 8,
      onPageClick: function onPageClick(event, page) {
        history_pagination(page);
      }
    });
  });
  $.post("/history/show/page/" + index + "/" + p, json).done(function (data) {
    if (data.length == 0) alert("Haven't found any");
    var t = "";
    for (var i = 0; i < data.length; ++i) {

      t += "<tr class=\"record\"><td>" + data[i].from_date;
      if (data[i].from_date !== data[i].to_date) t += " - " + data[i].to_date;
      t += "</td><td>" + data[i].from_hour;
      if (data[i].from_hour !== data[i].to_hour) t += " - " + data[i].to_hour;
      t += "</td><td>" + data[i].status + "</td><td>" + data[i].from_pr;
      if (data[i].from_pr !== data[i].to_pr) t += " - " + data[i].to_pr;
      t += "</td>";
    }
    $("#table_records").html(t);
  }).fail(function () {
    alert("H");
  });
}

(function ($) {
  $(function () {
    $('.datepicker').pickadate({
      selectMonths: true
    });
    getBattery();
    var run = setInterval(getBattery, 60000);

    $("#history_button").click(function () {
      history_pagination(1);
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
});

;require.register("web/static/js/jquery-ui", function(exports, require, module) {
/*! jQuery UI - v1.11.4 - 2015-09-06
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, menu.js, progressbar.js, selectmenu.js, slider.js, spinner.js, tabs.js, tooltip.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */"use strict";(function(factory){if(typeof define === "function" && define.amd){ // AMD. Register as an anonymous module.
define(["jquery"],factory);}else { // Browser globals
factory(jQuery);}})(function($){ /*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */ // $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};$.extend($.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}); // plugins
$.fn.extend({scrollParent:function scrollParent(includeHidden){var position=this.css("position"),excludeStaticParent=position === "absolute",overflowRegex=includeHidden?/(auto|scroll|hidden)/:/(auto|scroll)/,scrollParent=this.parents().filter(function(){var parent=$(this);if(excludeStaticParent && parent.css("position") === "static"){return false;}return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));}).eq(0);return position === "fixed" || !scrollParent.length?$(this[0].ownerDocument || document):scrollParent;},uniqueId:(function(){var uuid=0;return function(){return this.each(function(){if(!this.id){this.id = "ui-id-" + ++uuid;}});};})(),removeUniqueId:function removeUniqueId(){return this.each(function(){if(/^ui-id-\d+$/.test(this.id)){$(this).removeAttr("id");}});}}); // selectors
function _focusable(element,isTabIndexNotNaN){var map,mapName,img,nodeName=element.nodeName.toLowerCase();if("area" === nodeName){map = element.parentNode;mapName = map.name;if(!element.href || !mapName || map.nodeName.toLowerCase() !== "map"){return false;}img = $("img[usemap='#" + mapName + "']")[0];return !!img && visible(img);}return (/^(input|select|textarea|button|object)$/.test(nodeName)?!element.disabled:"a" === nodeName?element.href || isTabIndexNotNaN:isTabIndexNotNaN) &&  // the element and all of its ancestors must be visible
visible(element);}function visible(element){return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function(){return $.css(this,"visibility") === "hidden";}).length;}$.extend($.expr[":"],{data:$.expr.createPseudo?$.expr.createPseudo(function(dataName){return function(elem){return !!$.data(elem,dataName);};}): // support: jQuery <1.8
function(elem,i,match){return !!$.data(elem,match[3]);},focusable:function focusable(element){return _focusable(element,!isNaN($.attr(element,"tabindex")));},tabbable:function tabbable(element){var tabIndex=$.attr(element,"tabindex"),isTabIndexNaN=isNaN(tabIndex);return (isTabIndexNaN || tabIndex >= 0) && _focusable(element,!isTabIndexNaN);}}); // support: jQuery <1.8
if(!$("<a>").outerWidth(1).jquery){$.each(["Width","Height"],function(i,name){var side=name === "Width"?["Left","Right"]:["Top","Bottom"],type=name.toLowerCase(),orig={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};function reduce(elem,size,border,margin){$.each(side,function(){size -= parseFloat($.css(elem,"padding" + this)) || 0;if(border){size -= parseFloat($.css(elem,"border" + this + "Width")) || 0;}if(margin){size -= parseFloat($.css(elem,"margin" + this)) || 0;}});return size;}$.fn["inner" + name] = function(size){if(size === undefined){return orig["inner" + name].call(this);}return this.each(function(){$(this).css(type,reduce(this,size) + "px");});};$.fn["outer" + name] = function(size,margin){if(typeof size !== "number"){return orig["outer" + name].call(this,size);}return this.each(function(){$(this).css(type,reduce(this,size,true,margin) + "px");});};});} // support: jQuery <1.8
if(!$.fn.addBack){$.fn.addBack = function(selector){return this.add(selector == null?this.prevObject:this.prevObject.filter(selector));};} // support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if($("<a>").data("a-b","a").removeData("a-b").data("a-b")){$.fn.removeData = (function(removeData){return function(key){if(arguments.length){return removeData.call(this,$.camelCase(key));}else {return removeData.call(this);}};})($.fn.removeData);} // deprecated
$.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());$.fn.extend({focus:(function(orig){return function(delay,fn){return typeof delay === "number"?this.each(function(){var elem=this;setTimeout(function(){$(elem).focus();if(fn){fn.call(elem);}},delay);}):orig.apply(this,arguments);};})($.fn.focus),disableSelection:(function(){var eventType="onselectstart" in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(eventType + ".ui-disableSelection",function(event){event.preventDefault();});};})(),enableSelection:function enableSelection(){return this.unbind(".ui-disableSelection");},zIndex:function zIndex(_zIndex){if(_zIndex !== undefined){return this.css("zIndex",_zIndex);}if(this.length){var elem=$(this[0]),position,value;while(elem.length && elem[0] !== document) { // Ignore z-index if position is set to a value where z-index is ignored by the browser
// This makes behavior of this function consistent across browsers
// WebKit always returns auto if the element is positioned
position = elem.css("position");if(position === "absolute" || position === "relative" || position === "fixed"){ // IE returns 0 when zIndex is not specified
// other browsers return a string
// we ignore the case of nested elements with an explicit value of 0
// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
value = parseInt(elem.css("zIndex"),10);if(!isNaN(value) && value !== 0){return value;}}elem = elem.parent();}}return 0;}}); // $.ui.plugin is deprecated. Use $.widget() extensions instead.
$.ui.plugin = {add:function add(module,option,set){var i,proto=$.ui[module].prototype;for(i in set) {proto.plugins[i] = proto.plugins[i] || [];proto.plugins[i].push([option,set[i]]);}},call:function call(instance,name,args,allowDisconnected){var i,set=instance.plugins[name];if(!set){return;}if(!allowDisconnected && (!instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11)){return;}for(i = 0;i < set.length;i++) {if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args);}}}}; /*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */var widget_uuid=0,widget_slice=Array.prototype.slice;$.cleanData = (function(orig){return function(elems){var events,elem,i;for(i = 0;(elem = elems[i]) != null;i++) {try{ // Only trigger remove when necessary to save time
events = $._data(elem,"events");if(events && events.remove){$(elem).triggerHandler("remove");} // http://bugs.jquery.com/ticket/8235
}catch(e) {}}orig(elems);};})($.cleanData);$.widget = function(name,base,prototype){var fullName,existingConstructor,constructor,basePrototype, // proxiedPrototype allows the provided prototype to remain unmodified
// so that it can be used as a mixin for multiple widgets (#8876)
proxiedPrototype={},namespace=name.split(".")[0];name = name.split(".")[1];fullName = namespace + "-" + name;if(!prototype){prototype = base;base = $.Widget;} // create selector for plugin
$.expr[":"][fullName.toLowerCase()] = function(elem){return !!$.data(elem,fullName);};$[namespace] = $[namespace] || {};existingConstructor = $[namespace][name];constructor = $[namespace][name] = function(options,element){ // allow instantiation without "new" keyword
if(!this._createWidget){return new constructor(options,element);} // allow instantiation without initializing for simple inheritance
// must use "new" keyword (the code above always passes args)
if(arguments.length){this._createWidget(options,element);}}; // extend with the existing constructor to carry over any static properties
$.extend(constructor,existingConstructor,{version:prototype.version, // copy the object used to create the prototype in case we need to
// redefine the widget later
_proto:$.extend({},prototype), // track widgets that inherit from this widget in case this widget is
// redefined after a widget inherits from it
_childConstructors:[]});basePrototype = new base(); // we need to make the options hash a property directly on the new instance
// otherwise we'll modify the options hash on the prototype that we're
// inheriting from
basePrototype.options = $.widget.extend({},basePrototype.options);$.each(prototype,function(prop,value){if(!$.isFunction(value)){proxiedPrototype[prop] = value;return;}proxiedPrototype[prop] = (function(){var _super=function _super(){return base.prototype[prop].apply(this,arguments);},_superApply=function _superApply(args){return base.prototype[prop].apply(this,args);};return function(){var __super=this._super,__superApply=this._superApply,returnValue;this._super = _super;this._superApply = _superApply;returnValue = value.apply(this,arguments);this._super = __super;this._superApply = __superApply;return returnValue;};})();});constructor.prototype = $.widget.extend(basePrototype,{ // TODO: remove support for widgetEventPrefix
// always use the name + a colon as the prefix, e.g., draggable:start
// don't prefix for widgets that aren't DOM-based
widgetEventPrefix:existingConstructor?basePrototype.widgetEventPrefix || name:name},proxiedPrototype,{constructor:constructor,namespace:namespace,widgetName:name,widgetFullName:fullName}); // If this widget is being redefined then we need to find all widgets that
// are inheriting from it and redefine all of them so that they inherit from
// the new version of this widget. We're essentially trying to replace one
// level in the prototype chain.
if(existingConstructor){$.each(existingConstructor._childConstructors,function(i,child){var childPrototype=child.prototype; // redefine the child widget using the same prototype that was
// originally used, but inherit from the new version of the base
$.widget(childPrototype.namespace + "." + childPrototype.widgetName,constructor,child._proto);}); // remove the list of existing child constructors from the old constructor
// so the old child constructors can be garbage collected
delete existingConstructor._childConstructors;}else {base._childConstructors.push(constructor);}$.widget.bridge(name,constructor);return constructor;};$.widget.extend = function(target){var input=widget_slice.call(arguments,1),inputIndex=0,inputLength=input.length,key,value;for(;inputIndex < inputLength;inputIndex++) {for(key in input[inputIndex]) {value = input[inputIndex][key];if(input[inputIndex].hasOwnProperty(key) && value !== undefined){ // Clone objects
if($.isPlainObject(value)){target[key] = $.isPlainObject(target[key])?$.widget.extend({},target[key],value): // Don't extend strings, arrays, etc. with objects
$.widget.extend({},value); // Copy everything else by reference
}else {target[key] = value;}}}}return target;};$.widget.bridge = function(name,object){var fullName=object.prototype.widgetFullName || name;$.fn[name] = function(options){var isMethodCall=typeof options === "string",args=widget_slice.call(arguments,1),returnValue=this;if(isMethodCall){this.each(function(){var methodValue,instance=$.data(this,fullName);if(options === "instance"){returnValue = instance;return false;}if(!instance){return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");}if(!$.isFunction(instance[options]) || options.charAt(0) === "_"){return $.error("no such method '" + options + "' for " + name + " widget instance");}methodValue = instance[options].apply(instance,args);if(methodValue !== instance && methodValue !== undefined){returnValue = methodValue && methodValue.jquery?returnValue.pushStack(methodValue.get()):methodValue;return false;}});}else { // Allow multiple hashes to be passed on init
if(args.length){options = $.widget.extend.apply(null,[options].concat(args));}this.each(function(){var instance=$.data(this,fullName);if(instance){instance.option(options || {});if(instance._init){instance._init();}}else {$.data(this,fullName,new object(options,this));}});}return returnValue;};};$.Widget = function() /* options, element */{};$.Widget._childConstructors = [];$.Widget.prototype = {widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false, // callbacks
create:null},_createWidget:function _createWidget(options,element){element = $(element || this.defaultElement || this)[0];this.element = $(element);this.uuid = widget_uuid++;this.eventNamespace = "." + this.widgetName + this.uuid;this.bindings = $();this.hoverable = $();this.focusable = $();if(element !== this){$.data(element,this.widgetFullName,this);this._on(true,this.element,{remove:function remove(event){if(event.target === element){this.destroy();}}});this.document = $(element.style? // element within the document
element.ownerDocument: // element is window or document
element.document || element);this.window = $(this.document[0].defaultView || this.document[0].parentWindow);}this.options = $.widget.extend({},this.options,this._getCreateOptions(),options);this._create();this._trigger("create",null,this._getCreateEventData());this._init();},_getCreateOptions:$.noop,_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function destroy(){this._destroy(); // we can probably remove the unbind calls in 2.0
// all event bindings should go through this._on()
this.element.unbind(this.eventNamespace).removeData(this.widgetFullName) // support: jquery <1.6.3
// http://bugs.jquery.com/ticket/9413
.removeData($.camelCase(this.widgetFullName));this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"); // clean up events and states
this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus");},_destroy:$.noop,widget:function widget(){return this.element;},option:function option(key,value){var options=key,parts,curOption,i;if(arguments.length === 0){ // don't return a reference to the internal hash
return $.widget.extend({},this.options);}if(typeof key === "string"){ // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
options = {};parts = key.split(".");key = parts.shift();if(parts.length){curOption = options[key] = $.widget.extend({},this.options[key]);for(i = 0;i < parts.length - 1;i++) {curOption[parts[i]] = curOption[parts[i]] || {};curOption = curOption[parts[i]];}key = parts.pop();if(arguments.length === 1){return curOption[key] === undefined?null:curOption[key];}curOption[key] = value;}else {if(arguments.length === 1){return this.options[key] === undefined?null:this.options[key];}options[key] = value;}}this._setOptions(options);return this;},_setOptions:function _setOptions(options){var key;for(key in options) {this._setOption(key,options[key]);}return this;},_setOption:function _setOption(key,value){this.options[key] = value;if(key === "disabled"){this.widget().toggleClass(this.widgetFullName + "-disabled",!!value); // If the widget is becoming disabled, then nothing is interactive
if(value){this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus");}}return this;},enable:function enable(){return this._setOptions({disabled:false});},disable:function disable(){return this._setOptions({disabled:true});},_on:function _on(suppressDisabledCheck,element,handlers){var delegateElement,instance=this; // no suppressDisabledCheck flag, shuffle arguments
if(typeof suppressDisabledCheck !== "boolean"){handlers = element;element = suppressDisabledCheck;suppressDisabledCheck = false;} // no element argument, shuffle and use this.element
if(!handlers){handlers = element;element = this.element;delegateElement = this.widget();}else {element = delegateElement = $(element);this.bindings = this.bindings.add(element);}$.each(handlers,function(event,handler){function handlerProxy(){ // allow widgets to customize the disabled handling
// - disabled as an array instead of boolean
// - disabled class as method for disabling individual parts
if(!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))){return;}return (typeof handler === "string"?instance[handler]:handler).apply(instance,arguments);} // copy the guid so direct unbinding works
if(typeof handler !== "string"){handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;}var match=event.match(/^([\w:-]*)\s*(.*)$/),eventName=match[1] + instance.eventNamespace,selector=match[2];if(selector){delegateElement.delegate(selector,eventName,handlerProxy);}else {element.bind(eventName,handlerProxy);}});},_off:function _off(element,eventName){eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;element.unbind(eventName).undelegate(eventName); // Clear the stack to avoid memory leaks (#10056)
this.bindings = $(this.bindings.not(element).get());this.focusable = $(this.focusable.not(element).get());this.hoverable = $(this.hoverable.not(element).get());},_delay:function _delay(handler,delay){function handlerProxy(){return (typeof handler === "string"?instance[handler]:handler).apply(instance,arguments);}var instance=this;return setTimeout(handlerProxy,delay || 0);},_hoverable:function _hoverable(element){this.hoverable = this.hoverable.add(element);this._on(element,{mouseenter:function mouseenter(event){$(event.currentTarget).addClass("ui-state-hover");},mouseleave:function mouseleave(event){$(event.currentTarget).removeClass("ui-state-hover");}});},_focusable:function _focusable(element){this.focusable = this.focusable.add(element);this._on(element,{focusin:function focusin(event){$(event.currentTarget).addClass("ui-state-focus");},focusout:function focusout(event){$(event.currentTarget).removeClass("ui-state-focus");}});},_trigger:function _trigger(type,event,data){var prop,orig,callback=this.options[type];data = data || {};event = $.Event(event);event.type = (type === this.widgetEventPrefix?type:this.widgetEventPrefix + type).toLowerCase(); // the original event may come from any element
// so we need to reset the target on the new event
event.target = this.element[0]; // copy original event properties over to the new event
orig = event.originalEvent;if(orig){for(prop in orig) {if(!(prop in event)){event[prop] = orig[prop];}}}this.element.trigger(event,data);return !($.isFunction(callback) && callback.apply(this.element[0],[event].concat(data)) === false || event.isDefaultPrevented());}};$.each({show:"fadeIn",hide:"fadeOut"},function(method,defaultEffect){$.Widget.prototype["_" + method] = function(element,options,callback){if(typeof options === "string"){options = {effect:options};}var hasOptions,effectName=!options?method:options === true || typeof options === "number"?defaultEffect:options.effect || defaultEffect;options = options || {};if(typeof options === "number"){options = {duration:options};}hasOptions = !$.isEmptyObject(options);options.complete = callback;if(options.delay){element.delay(options.delay);}if(hasOptions && $.effects && $.effects.effect[effectName]){element[method](options);}else if(effectName !== method && element[effectName]){element[effectName](options.duration,options.easing,callback);}else {element.queue(function(next){$(this)[method]();if(callback){callback.call(element[0]);}next();});}};});var widget=$.widget; /*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */var mouseHandled=false;$(document).mouseup(function(){mouseHandled = false;});var mouse=$.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function _mouseInit(){var that=this;this.element.bind("mousedown." + this.widgetName,function(event){return that._mouseDown(event);}).bind("click." + this.widgetName,function(event){if(true === $.data(event.target,that.widgetName + ".preventClickEvent")){$.removeData(event.target,that.widgetName + ".preventClickEvent");event.stopImmediatePropagation();return false;}});this.started = false;}, // TODO: make sure destroying one instance of mouse doesn't mess with
// other instances of mouse
_mouseDestroy:function _mouseDestroy(){this.element.unbind("." + this.widgetName);if(this._mouseMoveDelegate){this.document.unbind("mousemove." + this.widgetName,this._mouseMoveDelegate).unbind("mouseup." + this.widgetName,this._mouseUpDelegate);}},_mouseDown:function _mouseDown(event){ // don't let more than one widget handle mouseStart
if(mouseHandled){return;}this._mouseMoved = false; // we may have missed mouseup (out of window)
this._mouseStarted && this._mouseUp(event);this._mouseDownEvent = event;var that=this,btnIsLeft=event.which === 1, // event.target.nodeName works around a bug in IE 8 with
// disabled inputs (#7620)
elIsCancel=typeof this.options.cancel === "string" && event.target.nodeName?$(event.target).closest(this.options.cancel).length:false;if(!btnIsLeft || elIsCancel || !this._mouseCapture(event)){return true;}this.mouseDelayMet = !this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer = setTimeout(function(){that.mouseDelayMet = true;},this.options.delay);}if(this._mouseDistanceMet(event) && this._mouseDelayMet(event)){this._mouseStarted = this._mouseStart(event) !== false;if(!this._mouseStarted){event.preventDefault();return true;}} // Click event may never have fired (Gecko & Opera)
if(true === $.data(event.target,this.widgetName + ".preventClickEvent")){$.removeData(event.target,this.widgetName + ".preventClickEvent");} // these delegates are required to keep context
this._mouseMoveDelegate = function(event){return that._mouseMove(event);};this._mouseUpDelegate = function(event){return that._mouseUp(event);};this.document.bind("mousemove." + this.widgetName,this._mouseMoveDelegate).bind("mouseup." + this.widgetName,this._mouseUpDelegate);event.preventDefault();mouseHandled = true;return true;},_mouseMove:function _mouseMove(event){ // Only check for mouseups outside the document if you've moved inside the document
// at least once. This prevents the firing of mouseup in the case of IE<9, which will
// fire a mousemove event if content is placed under the cursor. See #7778
// Support: IE <9
if(this._mouseMoved){ // IE mouseup check - mouseup happened when mouse was out of window
if($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button){return this._mouseUp(event); // Iframe mouseup check - mouseup occurred in another document
}else if(!event.which){return this._mouseUp(event);}}if(event.which || event.button){this._mouseMoved = true;}if(this._mouseStarted){this._mouseDrag(event);return event.preventDefault();}if(this._mouseDistanceMet(event) && this._mouseDelayMet(event)){this._mouseStarted = this._mouseStart(this._mouseDownEvent,event) !== false;this._mouseStarted?this._mouseDrag(event):this._mouseUp(event);}return !this._mouseStarted;},_mouseUp:function _mouseUp(event){this.document.unbind("mousemove." + this.widgetName,this._mouseMoveDelegate).unbind("mouseup." + this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted = false;if(event.target === this._mouseDownEvent.target){$.data(event.target,this.widgetName + ".preventClickEvent",true);}this._mouseStop(event);}mouseHandled = false;return false;},_mouseDistanceMet:function _mouseDistanceMet(event){return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX),Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;},_mouseDelayMet:function _mouseDelayMet() /* event */{return this.mouseDelayMet;}, // These are placeholder methods, to be overriden by extending plugin
_mouseStart:function _mouseStart() /* event */{},_mouseDrag:function _mouseDrag() /* event */{},_mouseStop:function _mouseStop() /* event */{},_mouseCapture:function _mouseCapture() /* event */{return true;}}); /*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */(function(){$.ui = $.ui || {};var cachedScrollbarWidth,supportsOffsetFractions,max=Math.max,abs=Math.abs,round=Math.round,rhorizontal=/left|center|right/,rvertical=/top|center|bottom/,roffset=/[\+\-]\d+(\.[\d]+)?%?/,rposition=/^\w+/,rpercent=/%$/,_position=$.fn.position;function getOffsets(offsets,width,height){return [parseFloat(offsets[0]) * (rpercent.test(offsets[0])?width / 100:1),parseFloat(offsets[1]) * (rpercent.test(offsets[1])?height / 100:1)];}function parseCss(element,property){return parseInt($.css(element,property),10) || 0;}function getDimensions(elem){var raw=elem[0];if(raw.nodeType === 9){return {width:elem.width(),height:elem.height(),offset:{top:0,left:0}};}if($.isWindow(raw)){return {width:elem.width(),height:elem.height(),offset:{top:elem.scrollTop(),left:elem.scrollLeft()}};}if(raw.preventDefault){return {width:0,height:0,offset:{top:raw.pageY,left:raw.pageX}};}return {width:elem.outerWidth(),height:elem.outerHeight(),offset:elem.offset()};}$.position = {scrollbarWidth:function scrollbarWidth(){if(cachedScrollbarWidth !== undefined){return cachedScrollbarWidth;}var w1,w2,div=$("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),innerDiv=div.children()[0];$("body").append(div);w1 = innerDiv.offsetWidth;div.css("overflow","scroll");w2 = innerDiv.offsetWidth;if(w1 === w2){w2 = div[0].clientWidth;}div.remove();return cachedScrollbarWidth = w1 - w2;},getScrollInfo:function getScrollInfo(within){var overflowX=within.isWindow || within.isDocument?"":within.element.css("overflow-x"),overflowY=within.isWindow || within.isDocument?"":within.element.css("overflow-y"),hasOverflowX=overflowX === "scroll" || overflowX === "auto" && within.width < within.element[0].scrollWidth,hasOverflowY=overflowY === "scroll" || overflowY === "auto" && within.height < within.element[0].scrollHeight;return {width:hasOverflowY?$.position.scrollbarWidth():0,height:hasOverflowX?$.position.scrollbarWidth():0};},getWithinInfo:function getWithinInfo(element){var withinElement=$(element || window),isWindow=$.isWindow(withinElement[0]),isDocument=!!withinElement[0] && withinElement[0].nodeType === 9;return {element:withinElement,isWindow:isWindow,isDocument:isDocument,offset:withinElement.offset() || {left:0,top:0},scrollLeft:withinElement.scrollLeft(),scrollTop:withinElement.scrollTop(), // support: jQuery 1.6.x
// jQuery 1.6 doesn't support .outerWidth/Height() on documents or windows
width:isWindow || isDocument?withinElement.width():withinElement.outerWidth(),height:isWindow || isDocument?withinElement.height():withinElement.outerHeight()};}};$.fn.position = function(options){if(!options || !options.of){return _position.apply(this,arguments);} // make a copy, we don't want to modify arguments
options = $.extend({},options);var atOffset,targetWidth,targetHeight,targetOffset,basePosition,dimensions,target=$(options.of),within=$.position.getWithinInfo(options.within),scrollInfo=$.position.getScrollInfo(within),collision=(options.collision || "flip").split(" "),offsets={};dimensions = getDimensions(target);if(target[0].preventDefault){ // force left top to allow flipping
options.at = "left top";}targetWidth = dimensions.width;targetHeight = dimensions.height;targetOffset = dimensions.offset; // clone to reuse original targetOffset later
basePosition = $.extend({},targetOffset); // force my and at to have valid horizontal and vertical positions
// if a value is missing or invalid, it will be converted to center
$.each(["my","at"],function(){var pos=(options[this] || "").split(" "),horizontalOffset,verticalOffset;if(pos.length === 1){pos = rhorizontal.test(pos[0])?pos.concat(["center"]):rvertical.test(pos[0])?["center"].concat(pos):["center","center"];}pos[0] = rhorizontal.test(pos[0])?pos[0]:"center";pos[1] = rvertical.test(pos[1])?pos[1]:"center"; // calculate offsets
horizontalOffset = roffset.exec(pos[0]);verticalOffset = roffset.exec(pos[1]);offsets[this] = [horizontalOffset?horizontalOffset[0]:0,verticalOffset?verticalOffset[0]:0]; // reduce to just the positions without the offsets
options[this] = [rposition.exec(pos[0])[0],rposition.exec(pos[1])[0]];}); // normalize collision option
if(collision.length === 1){collision[1] = collision[0];}if(options.at[0] === "right"){basePosition.left += targetWidth;}else if(options.at[0] === "center"){basePosition.left += targetWidth / 2;}if(options.at[1] === "bottom"){basePosition.top += targetHeight;}else if(options.at[1] === "center"){basePosition.top += targetHeight / 2;}atOffset = getOffsets(offsets.at,targetWidth,targetHeight);basePosition.left += atOffset[0];basePosition.top += atOffset[1];return this.each(function(){var collisionPosition,using,elem=$(this),elemWidth=elem.outerWidth(),elemHeight=elem.outerHeight(),marginLeft=parseCss(this,"marginLeft"),marginTop=parseCss(this,"marginTop"),collisionWidth=elemWidth + marginLeft + parseCss(this,"marginRight") + scrollInfo.width,collisionHeight=elemHeight + marginTop + parseCss(this,"marginBottom") + scrollInfo.height,position=$.extend({},basePosition),myOffset=getOffsets(offsets.my,elem.outerWidth(),elem.outerHeight());if(options.my[0] === "right"){position.left -= elemWidth;}else if(options.my[0] === "center"){position.left -= elemWidth / 2;}if(options.my[1] === "bottom"){position.top -= elemHeight;}else if(options.my[1] === "center"){position.top -= elemHeight / 2;}position.left += myOffset[0];position.top += myOffset[1]; // if the browser doesn't support fractions, then round for consistent results
if(!supportsOffsetFractions){position.left = round(position.left);position.top = round(position.top);}collisionPosition = {marginLeft:marginLeft,marginTop:marginTop};$.each(["left","top"],function(i,dir){if($.ui.position[collision[i]]){$.ui.position[collision[i]][dir](position,{targetWidth:targetWidth,targetHeight:targetHeight,elemWidth:elemWidth,elemHeight:elemHeight,collisionPosition:collisionPosition,collisionWidth:collisionWidth,collisionHeight:collisionHeight,offset:[atOffset[0] + myOffset[0],atOffset[1] + myOffset[1]],my:options.my,at:options.at,within:within,elem:elem});}});if(options.using){ // adds feedback as second argument to using callback, if present
using = function(props){var left=targetOffset.left - position.left,right=left + targetWidth - elemWidth,top=targetOffset.top - position.top,bottom=top + targetHeight - elemHeight,feedback={target:{element:target,left:targetOffset.left,top:targetOffset.top,width:targetWidth,height:targetHeight},element:{element:elem,left:position.left,top:position.top,width:elemWidth,height:elemHeight},horizontal:right < 0?"left":left > 0?"right":"center",vertical:bottom < 0?"top":top > 0?"bottom":"middle"};if(targetWidth < elemWidth && abs(left + right) < targetWidth){feedback.horizontal = "center";}if(targetHeight < elemHeight && abs(top + bottom) < targetHeight){feedback.vertical = "middle";}if(max(abs(left),abs(right)) > max(abs(top),abs(bottom))){feedback.important = "horizontal";}else {feedback.important = "vertical";}options.using.call(this,props,feedback);};}elem.offset($.extend(position,{using:using}));});};$.ui.position = {fit:{left:function left(position,data){var within=data.within,withinOffset=within.isWindow?within.scrollLeft:within.offset.left,outerWidth=within.width,collisionPosLeft=position.left - data.collisionPosition.marginLeft,overLeft=withinOffset - collisionPosLeft,overRight=collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,newOverRight; // element is wider than within
if(data.collisionWidth > outerWidth){ // element is initially over the left side of within
if(overLeft > 0 && overRight <= 0){newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;position.left += overLeft - newOverRight; // element is initially over right side of within
}else if(overRight > 0 && overLeft <= 0){position.left = withinOffset; // element is initially over both left and right sides of within
}else {if(overLeft > overRight){position.left = withinOffset + outerWidth - data.collisionWidth;}else {position.left = withinOffset;}} // too far left -> align with left edge
}else if(overLeft > 0){position.left += overLeft; // too far right -> align with right edge
}else if(overRight > 0){position.left -= overRight; // adjust based on position and margin
}else {position.left = max(position.left - collisionPosLeft,position.left);}},top:function top(position,data){var within=data.within,withinOffset=within.isWindow?within.scrollTop:within.offset.top,outerHeight=data.within.height,collisionPosTop=position.top - data.collisionPosition.marginTop,overTop=withinOffset - collisionPosTop,overBottom=collisionPosTop + data.collisionHeight - outerHeight - withinOffset,newOverBottom; // element is taller than within
if(data.collisionHeight > outerHeight){ // element is initially over the top of within
if(overTop > 0 && overBottom <= 0){newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;position.top += overTop - newOverBottom; // element is initially over bottom of within
}else if(overBottom > 0 && overTop <= 0){position.top = withinOffset; // element is initially over both top and bottom of within
}else {if(overTop > overBottom){position.top = withinOffset + outerHeight - data.collisionHeight;}else {position.top = withinOffset;}} // too far up -> align with top
}else if(overTop > 0){position.top += overTop; // too far down -> align with bottom edge
}else if(overBottom > 0){position.top -= overBottom; // adjust based on position and margin
}else {position.top = max(position.top - collisionPosTop,position.top);}}},flip:{left:function left(position,data){var within=data.within,withinOffset=within.offset.left + within.scrollLeft,outerWidth=within.width,offsetLeft=within.isWindow?within.scrollLeft:within.offset.left,collisionPosLeft=position.left - data.collisionPosition.marginLeft,overLeft=collisionPosLeft - offsetLeft,overRight=collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,myOffset=data.my[0] === "left"?-data.elemWidth:data.my[0] === "right"?data.elemWidth:0,atOffset=data.at[0] === "left"?data.targetWidth:data.at[0] === "right"?-data.targetWidth:0,offset=-2 * data.offset[0],newOverRight,newOverLeft;if(overLeft < 0){newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;if(newOverRight < 0 || newOverRight < abs(overLeft)){position.left += myOffset + atOffset + offset;}}else if(overRight > 0){newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;if(newOverLeft > 0 || abs(newOverLeft) < overRight){position.left += myOffset + atOffset + offset;}}},top:function top(position,data){var within=data.within,withinOffset=within.offset.top + within.scrollTop,outerHeight=within.height,offsetTop=within.isWindow?within.scrollTop:within.offset.top,collisionPosTop=position.top - data.collisionPosition.marginTop,overTop=collisionPosTop - offsetTop,overBottom=collisionPosTop + data.collisionHeight - outerHeight - offsetTop,top=data.my[1] === "top",myOffset=top?-data.elemHeight:data.my[1] === "bottom"?data.elemHeight:0,atOffset=data.at[1] === "top"?data.targetHeight:data.at[1] === "bottom"?-data.targetHeight:0,offset=-2 * data.offset[1],newOverTop,newOverBottom;if(overTop < 0){newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;if(newOverBottom < 0 || newOverBottom < abs(overTop)){position.top += myOffset + atOffset + offset;}}else if(overBottom > 0){newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;if(newOverTop > 0 || abs(newOverTop) < overBottom){position.top += myOffset + atOffset + offset;}}}},flipfit:{left:function left(){$.ui.position.flip.left.apply(this,arguments);$.ui.position.fit.left.apply(this,arguments);},top:function top(){$.ui.position.flip.top.apply(this,arguments);$.ui.position.fit.top.apply(this,arguments);}}}; // fraction support test
(function(){var testElement,testElementParent,testElementStyle,offsetLeft,i,body=document.getElementsByTagName("body")[0],div=document.createElement("div"); //Create a "fake body" for testing based on method used in jQuery.support
testElement = document.createElement(body?"div":"body");testElementStyle = {visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(body){$.extend(testElementStyle,{position:"absolute",left:"-1000px",top:"-1000px"});}for(i in testElementStyle) {testElement.style[i] = testElementStyle[i];}testElement.appendChild(div);testElementParent = body || document.documentElement;testElementParent.insertBefore(testElement,testElementParent.firstChild);div.style.cssText = "position: absolute; left: 10.7432222px;";offsetLeft = $(div).offset().left;supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11;testElement.innerHTML = "";testElementParent.removeChild(testElement);})();})();var position=$.ui.position; /*!
 * jQuery UI Draggable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */$.widget("ui.draggable",$.ui.mouse,{version:"1.11.4",widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false, // callbacks
drag:null,start:null,stop:null},_create:function _create(){if(this.options.helper === "original"){this._setPositionRelative();}if(this.options.addClasses){this.element.addClass("ui-draggable");}if(this.options.disabled){this.element.addClass("ui-draggable-disabled");}this._setHandleClassName();this._mouseInit();},_setOption:function _setOption(key,value){this._super(key,value);if(key === "handle"){this._removeHandleClassName();this._setHandleClassName();}},_destroy:function _destroy(){if((this.helper || this.element).is(".ui-draggable-dragging")){this.destroyOnClear = true;return;}this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._removeHandleClassName();this._mouseDestroy();},_mouseCapture:function _mouseCapture(event){var o=this.options;this._blurActiveElement(event); // among others, prevent a drag on a resizable-handle
if(this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0){return false;} //Quit if we're not on a valid handle
this.handle = this._getHandle(event);if(!this.handle){return false;}this._blockFrames(o.iframeFix === true?"iframe":o.iframeFix);return true;},_blockFrames:function _blockFrames(selector){this.iframeBlocks = this.document.find(selector).map(function(){var iframe=$(this);return $("<div>").css("position","absolute").appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];});},_unblockFrames:function _unblockFrames(){if(this.iframeBlocks){this.iframeBlocks.remove();delete this.iframeBlocks;}},_blurActiveElement:function _blurActiveElement(event){var document=this.document[0]; // Only need to blur if the event occurred on the draggable itself, see #10527
if(!this.handleElement.is(event.target)){return;} // support: IE9
// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
try{ // Support: IE9, IE10
// If the <body> is blurred, IE will switch windows, see #9520
if(document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body"){ // Blur any element that currently has focus, see #4261
$(document.activeElement).blur();}}catch(error) {}},_mouseStart:function _mouseStart(event){var o=this.options; //Create and append the visible helper
this.helper = this._createHelper(event);this.helper.addClass("ui-draggable-dragging"); //Cache the helper size
this._cacheHelperProportions(); //If ddmanager is used for droppables, set the global draggable
if($.ui.ddmanager){$.ui.ddmanager.current = this;} /*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */ //Cache the margins of the original element
this._cacheMargins(); //Store the helper's css position
this.cssPosition = this.helper.css("position");this.scrollParent = this.helper.scrollParent(true);this.offsetParent = this.helper.offsetParent();this.hasFixedAncestor = this.helper.parents().filter(function(){return $(this).css("position") === "fixed";}).length > 0; //The element's absolute position on the page minus margins
this.positionAbs = this.element.offset();this._refreshOffsets(event); //Generate the original position
this.originalPosition = this.position = this._generatePosition(event,false);this.originalPageX = event.pageX;this.originalPageY = event.pageY; //Adjust the mouse offset relative to the helper if "cursorAt" is supplied
o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt); //Set a containment if given in the options
this._setContainment(); //Trigger event + callbacks
if(this._trigger("start",event) === false){this._clear();return false;} //Recache the helper size
this._cacheHelperProportions(); //Prepare the droppable offsets
if($.ui.ddmanager && !o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,event);} // Reset helper's right/bottom css if they're set and set explicit width/height instead
// as this prevents resizing of elements with right/bottom set (see #7772)
this._normalizeRightBottom();this._mouseDrag(event,true); //Execute the drag once - this causes the helper not to be visible before getting its correct position
//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
if($.ui.ddmanager){$.ui.ddmanager.dragStart(this,event);}return true;},_refreshOffsets:function _refreshOffsets(event){this.offset = {top:this.positionAbs.top - this.margins.top,left:this.positionAbs.left - this.margins.left,scroll:false,parent:this._getParentOffset(),relative:this._getRelativeOffset()};this.offset.click = {left:event.pageX - this.offset.left,top:event.pageY - this.offset.top};},_mouseDrag:function _mouseDrag(event,noPropagation){ // reset any necessary cached properties (see #5009)
if(this.hasFixedAncestor){this.offset.parent = this._getParentOffset();} //Compute the helpers position
this.position = this._generatePosition(event,true);this.positionAbs = this._convertPositionTo("absolute"); //Call plugins and callbacks and use the resulting position if something is returned
if(!noPropagation){var ui=this._uiHash();if(this._trigger("drag",event,ui) === false){this._mouseUp({});return false;}this.position = ui.position;}this.helper[0].style.left = this.position.left + "px";this.helper[0].style.top = this.position.top + "px";if($.ui.ddmanager){$.ui.ddmanager.drag(this,event);}return false;},_mouseStop:function _mouseStop(event){ //If we are using droppables, inform the manager about the drop
var that=this,dropped=false;if($.ui.ddmanager && !this.options.dropBehaviour){dropped = $.ui.ddmanager.drop(this,event);} //if a drop comes from outside (a sortable)
if(this.dropped){dropped = this.dropped;this.dropped = false;}if(this.options.revert === "invalid" && !dropped || this.options.revert === "valid" && dropped || this.options.revert === true || $.isFunction(this.options.revert) && this.options.revert.call(this.element,dropped)){$(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(that._trigger("stop",event) !== false){that._clear();}});}else {if(this._trigger("stop",event) !== false){this._clear();}}return false;},_mouseUp:function _mouseUp(event){this._unblockFrames(); //If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
if($.ui.ddmanager){$.ui.ddmanager.dragStop(this,event);} // Only need to focus if the event occurred on the draggable itself, see #10527
if(this.handleElement.is(event.target)){ // The interaction is over; whether or not the click resulted in a drag, focus the element
this.element.focus();}return $.ui.mouse.prototype._mouseUp.call(this,event);},cancel:function cancel(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp({});}else {this._clear();}return this;},_getHandle:function _getHandle(event){return this.options.handle?!!$(event.target).closest(this.element.find(this.options.handle)).length:true;},_setHandleClassName:function _setHandleClassName(){this.handleElement = this.options.handle?this.element.find(this.options.handle):this.element;this.handleElement.addClass("ui-draggable-handle");},_removeHandleClassName:function _removeHandleClassName(){this.handleElement.removeClass("ui-draggable-handle");},_createHelper:function _createHelper(event){var o=this.options,helperIsFunction=$.isFunction(o.helper),helper=helperIsFunction?$(o.helper.apply(this.element[0],[event])):o.helper === "clone"?this.element.clone().removeAttr("id"):this.element;if(!helper.parents("body").length){helper.appendTo(o.appendTo === "parent"?this.element[0].parentNode:o.appendTo);} // http://bugs.jqueryui.com/ticket/9446
// a helper function can return the original element
// which wouldn't have been set to relative in _create
if(helperIsFunction && helper[0] === this.element[0]){this._setPositionRelative();}if(helper[0] !== this.element[0] && !/(fixed|absolute)/.test(helper.css("position"))){helper.css("position","absolute");}return helper;},_setPositionRelative:function _setPositionRelative(){if(!/^(?:r|a|f)/.test(this.element.css("position"))){this.element[0].style.position = "relative";}},_adjustOffsetFromHelper:function _adjustOffsetFromHelper(obj){if(typeof obj === "string"){obj = obj.split(" ");}if($.isArray(obj)){obj = {left:+obj[0],top:+obj[1] || 0};}if("left" in obj){this.offset.click.left = obj.left + this.margins.left;}if("right" in obj){this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;}if("top" in obj){this.offset.click.top = obj.top + this.margins.top;}if("bottom" in obj){this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;}},_isRootNode:function _isRootNode(element){return (/(html|body)/i.test(element.tagName) || element === this.document[0]);},_getParentOffset:function _getParentOffset(){ //Get the offsetParent and cache its position
var po=this.offsetParent.offset(),document=this.document[0]; // This is a special case where we need to modify a offset calculated on start, since the following happened:
// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
if(this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0],this.offsetParent[0])){po.left += this.scrollParent.scrollLeft();po.top += this.scrollParent.scrollTop();}if(this._isRootNode(this.offsetParent[0])){po = {top:0,left:0};}return {top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)};},_getRelativeOffset:function _getRelativeOffset(){if(this.cssPosition !== "relative"){return {top:0,left:0};}var p=this.element.position(),scrollIsRootNode=this._isRootNode(this.scrollParent[0]);return {top:p.top - (parseInt(this.helper.css("top"),10) || 0) + (!scrollIsRootNode?this.scrollParent.scrollTop():0),left:p.left - (parseInt(this.helper.css("left"),10) || 0) + (!scrollIsRootNode?this.scrollParent.scrollLeft():0)};},_cacheMargins:function _cacheMargins(){this.margins = {left:parseInt(this.element.css("marginLeft"),10) || 0,top:parseInt(this.element.css("marginTop"),10) || 0,right:parseInt(this.element.css("marginRight"),10) || 0,bottom:parseInt(this.element.css("marginBottom"),10) || 0};},_cacheHelperProportions:function _cacheHelperProportions(){this.helperProportions = {width:this.helper.outerWidth(),height:this.helper.outerHeight()};},_setContainment:function _setContainment(){var isUserScrollable,c,ce,o=this.options,document=this.document[0];this.relativeContainer = null;if(!o.containment){this.containment = null;return;}if(o.containment === "window"){this.containment = [$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,$(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,$(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left,$(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];return;}if(o.containment === "document"){this.containment = [0,0,$(document).width() - this.helperProportions.width - this.margins.left,($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];return;}if(o.containment.constructor === Array){this.containment = o.containment;return;}if(o.containment === "parent"){o.containment = this.helper[0].parentNode;}c = $(o.containment);ce = c[0];if(!ce){return;}isUserScrollable = /(scroll|auto)/.test(c.css("overflow"));this.containment = [(parseInt(c.css("borderLeftWidth"),10) || 0) + (parseInt(c.css("paddingLeft"),10) || 0),(parseInt(c.css("borderTopWidth"),10) || 0) + (parseInt(c.css("paddingTop"),10) || 0),(isUserScrollable?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth) - (parseInt(c.css("borderRightWidth"),10) || 0) - (parseInt(c.css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,(isUserScrollable?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"),10) || 0) - (parseInt(c.css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];this.relativeContainer = c;},_convertPositionTo:function _convertPositionTo(d,pos){if(!pos){pos = this.position;}var mod=d === "absolute"?1:-1,scrollIsRootNode=this._isRootNode(this.scrollParent[0]);return {top:pos.top +  // The absolute mouse position
this.offset.relative.top * mod +  // Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.parent.top * mod -  // The offsetParent's offset without borders (offset + border)
(this.cssPosition === "fixed"?-this.offset.scroll.top:scrollIsRootNode?0:this.offset.scroll.top) * mod,left:pos.left +  // The absolute mouse position
this.offset.relative.left * mod +  // Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.parent.left * mod -  // The offsetParent's offset without borders (offset + border)
(this.cssPosition === "fixed"?-this.offset.scroll.left:scrollIsRootNode?0:this.offset.scroll.left) * mod};},_generatePosition:function _generatePosition(event,constrainPosition){var containment,co,top,left,o=this.options,scrollIsRootNode=this._isRootNode(this.scrollParent[0]),pageX=event.pageX,pageY=event.pageY; // Cache the scroll
if(!scrollIsRootNode || !this.offset.scroll){this.offset.scroll = {top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()};} /*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */ // If we are not dragging yet, we won't check for options
if(constrainPosition){if(this.containment){if(this.relativeContainer){co = this.relativeContainer.offset();containment = [this.containment[0] + co.left,this.containment[1] + co.top,this.containment[2] + co.left,this.containment[3] + co.top];}else {containment = this.containment;}if(event.pageX - this.offset.click.left < containment[0]){pageX = containment[0] + this.offset.click.left;}if(event.pageY - this.offset.click.top < containment[1]){pageY = containment[1] + this.offset.click.top;}if(event.pageX - this.offset.click.left > containment[2]){pageX = containment[2] + this.offset.click.left;}if(event.pageY - this.offset.click.top > containment[3]){pageY = containment[3] + this.offset.click.top;}}if(o.grid){ //Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
top = o.grid[1]?this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1]:this.originalPageY;pageY = containment?top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]?top:top - this.offset.click.top >= containment[1]?top - o.grid[1]:top + o.grid[1]:top;left = o.grid[0]?this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0]:this.originalPageX;pageX = containment?left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]?left:left - this.offset.click.left >= containment[0]?left - o.grid[0]:left + o.grid[0]:left;}if(o.axis === "y"){pageX = this.originalPageX;}if(o.axis === "x"){pageY = this.originalPageY;}}return {top:pageY -  // The absolute mouse position
this.offset.click.top -  // Click offset (relative to the element)
this.offset.relative.top -  // Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.parent.top + ( // The offsetParent's offset without borders (offset + border)
this.cssPosition === "fixed"?-this.offset.scroll.top:scrollIsRootNode?0:this.offset.scroll.top),left:pageX -  // The absolute mouse position
this.offset.click.left -  // Click offset (relative to the element)
this.offset.relative.left -  // Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.parent.left + ( // The offsetParent's offset without borders (offset + border)
this.cssPosition === "fixed"?-this.offset.scroll.left:scrollIsRootNode?0:this.offset.scroll.left)};},_clear:function _clear(){this.helper.removeClass("ui-draggable-dragging");if(this.helper[0] !== this.element[0] && !this.cancelHelperRemoval){this.helper.remove();}this.helper = null;this.cancelHelperRemoval = false;if(this.destroyOnClear){this.destroy();}},_normalizeRightBottom:function _normalizeRightBottom(){if(this.options.axis !== "y" && this.helper.css("right") !== "auto"){this.helper.width(this.helper.width());this.helper.css("right","auto");}if(this.options.axis !== "x" && this.helper.css("bottom") !== "auto"){this.helper.height(this.helper.height());this.helper.css("bottom","auto");}}, // From now on bulk stuff - mainly helpers
_trigger:function _trigger(type,event,ui){ui = ui || this._uiHash();$.ui.plugin.call(this,type,[event,ui,this],true); // Absolute position and offset (see #6884 ) have to be recalculated after plugins
if(/^(drag|start|stop)/.test(type)){this.positionAbs = this._convertPositionTo("absolute");ui.offset = this.positionAbs;}return $.Widget.prototype._trigger.call(this,type,event,ui);},plugins:{},_uiHash:function _uiHash(){return {helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs};}});$.ui.plugin.add("draggable","connectToSortable",{start:function start(event,ui,draggable){var uiSortable=$.extend({},ui,{item:draggable.element});draggable.sortables = [];$(draggable.options.connectToSortable).each(function(){var sortable=$(this).sortable("instance");if(sortable && !sortable.options.disabled){draggable.sortables.push(sortable); // refreshPositions is called at drag start to refresh the containerCache
// which is used in drag. This ensures it's initialized and synchronized
// with any changes that might have happened on the page since initialization.
sortable.refreshPositions();sortable._trigger("activate",event,uiSortable);}});},stop:function stop(event,ui,draggable){var uiSortable=$.extend({},ui,{item:draggable.element});draggable.cancelHelperRemoval = false;$.each(draggable.sortables,function(){var sortable=this;if(sortable.isOver){sortable.isOver = 0; // Allow this sortable to handle removing the helper
draggable.cancelHelperRemoval = true;sortable.cancelHelperRemoval = false; // Use _storedCSS To restore properties in the sortable,
// as this also handles revert (#9675) since the draggable
// may have modified them in unexpected ways (#8809)
sortable._storedCSS = {position:sortable.placeholder.css("position"),top:sortable.placeholder.css("top"),left:sortable.placeholder.css("left")};sortable._mouseStop(event); // Once drag has ended, the sortable should return to using
// its original helper, not the shared helper from draggable
sortable.options.helper = sortable.options._helper;}else { // Prevent this Sortable from removing the helper.
// However, don't set the draggable to remove the helper
// either as another connected Sortable may yet handle the removal.
sortable.cancelHelperRemoval = true;sortable._trigger("deactivate",event,uiSortable);}});},drag:function drag(event,ui,draggable){$.each(draggable.sortables,function(){var innermostIntersecting=false,sortable=this; // Copy over variables that sortable's _intersectsWith uses
sortable.positionAbs = draggable.positionAbs;sortable.helperProportions = draggable.helperProportions;sortable.offset.click = draggable.offset.click;if(sortable._intersectsWith(sortable.containerCache)){innermostIntersecting = true;$.each(draggable.sortables,function(){ // Copy over variables that sortable's _intersectsWith uses
this.positionAbs = draggable.positionAbs;this.helperProportions = draggable.helperProportions;this.offset.click = draggable.offset.click;if(this !== sortable && this._intersectsWith(this.containerCache) && $.contains(sortable.element[0],this.element[0])){innermostIntersecting = false;}return innermostIntersecting;});}if(innermostIntersecting){ // If it intersects, we use a little isOver variable and set it once,
// so that the move-in stuff gets fired only once.
if(!sortable.isOver){sortable.isOver = 1; // Store draggable's parent in case we need to reappend to it later.
draggable._parent = ui.helper.parent();sortable.currentItem = ui.helper.appendTo(sortable.element).data("ui-sortable-item",true); // Store helper option to later restore it
sortable.options._helper = sortable.options.helper;sortable.options.helper = function(){return ui.helper[0];}; // Fire the start events of the sortable with our passed browser event,
// and our own helper (so it doesn't create a new one)
event.target = sortable.currentItem[0];sortable._mouseCapture(event,true);sortable._mouseStart(event,true,true); // Because the browser event is way off the new appended portlet,
// modify necessary variables to reflect the changes
sortable.offset.click.top = draggable.offset.click.top;sortable.offset.click.left = draggable.offset.click.left;sortable.offset.parent.left -= draggable.offset.parent.left - sortable.offset.parent.left;sortable.offset.parent.top -= draggable.offset.parent.top - sortable.offset.parent.top;draggable._trigger("toSortable",event); // Inform draggable that the helper is in a valid drop zone,
// used solely in the revert option to handle "valid/invalid".
draggable.dropped = sortable.element; // Need to refreshPositions of all sortables in the case that
// adding to one sortable changes the location of the other sortables (#9675)
$.each(draggable.sortables,function(){this.refreshPositions();}); // hack so receive/update callbacks work (mostly)
draggable.currentItem = draggable.element;sortable.fromOutside = draggable;}if(sortable.currentItem){sortable._mouseDrag(event); // Copy the sortable's position because the draggable's can potentially reflect
// a relative position, while sortable is always absolute, which the dragged
// element has now become. (#8809)
ui.position = sortable.position;}}else { // If it doesn't intersect with the sortable, and it intersected before,
// we fake the drag stop of the sortable, but make sure it doesn't remove
// the helper by using cancelHelperRemoval.
if(sortable.isOver){sortable.isOver = 0;sortable.cancelHelperRemoval = true; // Calling sortable's mouseStop would trigger a revert,
// so revert must be temporarily false until after mouseStop is called.
sortable.options._revert = sortable.options.revert;sortable.options.revert = false;sortable._trigger("out",event,sortable._uiHash(sortable));sortable._mouseStop(event,true); // restore sortable behaviors that were modfied
// when the draggable entered the sortable area (#9481)
sortable.options.revert = sortable.options._revert;sortable.options.helper = sortable.options._helper;if(sortable.placeholder){sortable.placeholder.remove();} // Restore and recalculate the draggable's offset considering the sortable
// may have modified them in unexpected ways. (#8809, #10669)
ui.helper.appendTo(draggable._parent);draggable._refreshOffsets(event);ui.position = draggable._generatePosition(event,true);draggable._trigger("fromSortable",event); // Inform draggable that the helper is no longer in a valid drop zone
draggable.dropped = false; // Need to refreshPositions of all sortables just in case removing
// from one sortable changes the location of other sortables (#9675)
$.each(draggable.sortables,function(){this.refreshPositions();});}}});}});$.ui.plugin.add("draggable","cursor",{start:function start(event,ui,instance){var t=$("body"),o=instance.options;if(t.css("cursor")){o._cursor = t.css("cursor");}t.css("cursor",o.cursor);},stop:function stop(event,ui,instance){var o=instance.options;if(o._cursor){$("body").css("cursor",o._cursor);}}});$.ui.plugin.add("draggable","opacity",{start:function start(event,ui,instance){var t=$(ui.helper),o=instance.options;if(t.css("opacity")){o._opacity = t.css("opacity");}t.css("opacity",o.opacity);},stop:function stop(event,ui,instance){var o=instance.options;if(o._opacity){$(ui.helper).css("opacity",o._opacity);}}});$.ui.plugin.add("draggable","scroll",{start:function start(event,ui,i){if(!i.scrollParentNotHidden){i.scrollParentNotHidden = i.helper.scrollParent(false);}if(i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== "HTML"){i.overflowOffset = i.scrollParentNotHidden.offset();}},drag:function drag(event,ui,i){var o=i.options,scrolled=false,scrollParent=i.scrollParentNotHidden[0],document=i.document[0];if(scrollParent !== document && scrollParent.tagName !== "HTML"){if(!o.axis || o.axis !== "x"){if(i.overflowOffset.top + scrollParent.offsetHeight - event.pageY < o.scrollSensitivity){scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;}else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity){scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;}}if(!o.axis || o.axis !== "y"){if(i.overflowOffset.left + scrollParent.offsetWidth - event.pageX < o.scrollSensitivity){scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;}else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity){scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;}}}else {if(!o.axis || o.axis !== "x"){if(event.pageY - $(document).scrollTop() < o.scrollSensitivity){scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);}else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity){scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);}}if(!o.axis || o.axis !== "y"){if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity){scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);}else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity){scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);}}}if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour){$.ui.ddmanager.prepareOffsets(i,event);}}});$.ui.plugin.add("draggable","snap",{start:function start(event,ui,i){var o=i.options;i.snapElements = [];$(o.snap.constructor !== String?o.snap.items || ":data(ui-draggable)":o.snap).each(function(){var $t=$(this),$o=$t.offset();if(this !== i.element[0]){i.snapElements.push({item:this,width:$t.outerWidth(),height:$t.outerHeight(),top:$o.top,left:$o.left});}});},drag:function drag(event,ui,inst){var ts,bs,ls,rs,l,r,t,b,i,first,o=inst.options,d=o.snapTolerance,x1=ui.offset.left,x2=x1 + inst.helperProportions.width,y1=ui.offset.top,y2=y1 + inst.helperProportions.height;for(i = inst.snapElements.length - 1;i >= 0;i--) {l = inst.snapElements[i].left - inst.margins.left;r = l + inst.snapElements[i].width;t = inst.snapElements[i].top - inst.margins.top;b = t + inst.snapElements[i].height;if(x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument,inst.snapElements[i].item)){if(inst.snapElements[i].snapping){inst.options.snap.release && inst.options.snap.release.call(inst.element,event,$.extend(inst._uiHash(),{snapItem:inst.snapElements[i].item}));}inst.snapElements[i].snapping = false;continue;}if(o.snapMode !== "inner"){ts = Math.abs(t - y2) <= d;bs = Math.abs(b - y1) <= d;ls = Math.abs(l - x2) <= d;rs = Math.abs(r - x1) <= d;if(ts){ui.position.top = inst._convertPositionTo("relative",{top:t - inst.helperProportions.height,left:0}).top;}if(bs){ui.position.top = inst._convertPositionTo("relative",{top:b,left:0}).top;}if(ls){ui.position.left = inst._convertPositionTo("relative",{top:0,left:l - inst.helperProportions.width}).left;}if(rs){ui.position.left = inst._convertPositionTo("relative",{top:0,left:r}).left;}}first = ts || bs || ls || rs;if(o.snapMode !== "outer"){ts = Math.abs(t - y1) <= d;bs = Math.abs(b - y2) <= d;ls = Math.abs(l - x1) <= d;rs = Math.abs(r - x2) <= d;if(ts){ui.position.top = inst._convertPositionTo("relative",{top:t,left:0}).top;}if(bs){ui.position.top = inst._convertPositionTo("relative",{top:b - inst.helperProportions.height,left:0}).top;}if(ls){ui.position.left = inst._convertPositionTo("relative",{top:0,left:l}).left;}if(rs){ui.position.left = inst._convertPositionTo("relative",{top:0,left:r - inst.helperProportions.width}).left;}}if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)){inst.options.snap.snap && inst.options.snap.snap.call(inst.element,event,$.extend(inst._uiHash(),{snapItem:inst.snapElements[i].item}));}inst.snapElements[i].snapping = ts || bs || ls || rs || first;}}});$.ui.plugin.add("draggable","stack",{start:function start(event,ui,instance){var min,o=instance.options,group=$.makeArray($(o.stack)).sort(function(a,b){return (parseInt($(a).css("zIndex"),10) || 0) - (parseInt($(b).css("zIndex"),10) || 0);});if(!group.length){return;}min = parseInt($(group[0]).css("zIndex"),10) || 0;$(group).each(function(i){$(this).css("zIndex",min + i);});this.css("zIndex",min + group.length);}});$.ui.plugin.add("draggable","zIndex",{start:function start(event,ui,instance){var t=$(ui.helper),o=instance.options;if(t.css("zIndex")){o._zIndex = t.css("zIndex");}t.css("zIndex",o.zIndex);},stop:function stop(event,ui,instance){var o=instance.options;if(o._zIndex){$(ui.helper).css("zIndex",o._zIndex);}}});var draggable=$.ui.draggable; /*!
 * jQuery UI Droppable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */$.widget("ui.droppable",{version:"1.11.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect", // callbacks
activate:null,deactivate:null,drop:null,out:null,over:null},_create:function _create(){var proportions,o=this.options,accept=o.accept;this.isover = false;this.isout = true;this.accept = $.isFunction(accept)?accept:function(d){return d.is(accept);};this.proportions = function() /* valueToWrite */{if(arguments.length){ // Store the droppable's proportions
proportions = arguments[0];}else { // Retrieve or derive the droppable's proportions
return proportions?proportions:proportions = {width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};}};this._addToManager(o.scope);o.addClasses && this.element.addClass("ui-droppable");},_addToManager:function _addToManager(scope){ // Add the reference and positions to the manager
$.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [];$.ui.ddmanager.droppables[scope].push(this);},_splice:function _splice(drop){var i=0;for(;i < drop.length;i++) {if(drop[i] === this){drop.splice(i,1);}}},_destroy:function _destroy(){var drop=$.ui.ddmanager.droppables[this.options.scope];this._splice(drop);this.element.removeClass("ui-droppable ui-droppable-disabled");},_setOption:function _setOption(key,value){if(key === "accept"){this.accept = $.isFunction(value)?value:function(d){return d.is(value);};}else if(key === "scope"){var drop=$.ui.ddmanager.droppables[this.options.scope];this._splice(drop);this._addToManager(value);}this._super(key,value);},_activate:function _activate(event){var draggable=$.ui.ddmanager.current;if(this.options.activeClass){this.element.addClass(this.options.activeClass);}if(draggable){this._trigger("activate",event,this.ui(draggable));}},_deactivate:function _deactivate(event){var draggable=$.ui.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass);}if(draggable){this._trigger("deactivate",event,this.ui(draggable));}},_over:function _over(event){var draggable=$.ui.ddmanager.current; // Bail if draggable and droppable are same element
if(!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]){return;}if(this.accept.call(this.element[0],draggable.currentItem || draggable.element)){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass);}this._trigger("over",event,this.ui(draggable));}},_out:function _out(event){var draggable=$.ui.ddmanager.current; // Bail if draggable and droppable are same element
if(!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]){return;}if(this.accept.call(this.element[0],draggable.currentItem || draggable.element)){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass);}this._trigger("out",event,this.ui(draggable));}},_drop:function _drop(event,custom){var draggable=custom || $.ui.ddmanager.current,childrenIntersection=false; // Bail if draggable and droppable are same element
if(!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]){return false;}this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var inst=$(this).droppable("instance");if(inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable.options.scope && inst.accept.call(inst.element[0],draggable.currentItem || draggable.element) && $.ui.intersect(draggable,$.extend(inst,{offset:inst.element.offset()}),inst.options.tolerance,event)){childrenIntersection = true;return false;}});if(childrenIntersection){return false;}if(this.accept.call(this.element[0],draggable.currentItem || draggable.element)){if(this.options.activeClass){this.element.removeClass(this.options.activeClass);}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass);}this._trigger("drop",event,this.ui(draggable));return this.element;}return false;},ui:function ui(c){return {draggable:c.currentItem || c.element,helper:c.helper,position:c.position,offset:c.positionAbs};}});$.ui.intersect = (function(){function isOverAxis(x,reference,size){return x >= reference && x < reference + size;}return function(draggable,droppable,toleranceMode,event){if(!droppable.offset){return false;}var x1=(draggable.positionAbs || draggable.position.absolute).left + draggable.margins.left,y1=(draggable.positionAbs || draggable.position.absolute).top + draggable.margins.top,x2=x1 + draggable.helperProportions.width,y2=y1 + draggable.helperProportions.height,l=droppable.offset.left,t=droppable.offset.top,r=l + droppable.proportions().width,b=t + droppable.proportions().height;switch(toleranceMode){case "fit":return l <= x1 && x2 <= r && t <= y1 && y2 <= b;case "intersect":return l < x1 + draggable.helperProportions.width / 2 &&  // Right Half
x2 - draggable.helperProportions.width / 2 < r &&  // Left Half
t < y1 + draggable.helperProportions.height / 2 &&  // Bottom Half
y2 - draggable.helperProportions.height / 2 < b; // Top Half
case "pointer":return isOverAxis(event.pageY,t,droppable.proportions().height) && isOverAxis(event.pageX,l,droppable.proportions().width);case "touch":return (y1 >= t && y1 <= b ||  // Top edge touching
y2 >= t && y2 <= b ||  // Bottom edge touching
y1 < t && y2 > b) // Surrounded vertically
 && (x1 >= l && x1 <= r ||  // Left edge touching
x2 >= l && x2 <= r ||  // Right edge touching
x1 < l && x2 > r) // Surrounded horizontally
;default:return false;}};})(); /*
	This manager tracks offsets of draggables and droppables
*/$.ui.ddmanager = {current:null,droppables:{"default":[]},prepareOffsets:function prepareOffsets(t,event){var i,j,m=$.ui.ddmanager.droppables[t.options.scope] || [],type=event?event.type:null, // workaround for #2317
list=(t.currentItem || t.element).find(":data(ui-droppable)").addBack();droppablesLoop: for(i = 0;i < m.length;i++) { // No disabled and non-accepted
if(m[i].options.disabled || t && !m[i].accept.call(m[i].element[0],t.currentItem || t.element)){continue;} // Filter out elements in the current dragged item
for(j = 0;j < list.length;j++) {if(list[j] === m[i].element[0]){m[i].proportions().height = 0;continue droppablesLoop;}}m[i].visible = m[i].element.css("display") !== "none";if(!m[i].visible){continue;} // Activate the droppable if used directly from draggables
if(type === "mousedown"){m[i]._activate.call(m[i],event);}m[i].offset = m[i].element.offset();m[i].proportions({width:m[i].element[0].offsetWidth,height:m[i].element[0].offsetHeight});}},drop:function drop(draggable,event){var dropped=false; // Create a copy of the droppables in case the list changes during the drop (#9116)
$.each(($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(),function(){if(!this.options){return;}if(!this.options.disabled && this.visible && $.ui.intersect(draggable,this,this.options.tolerance,event)){dropped = this._drop.call(this,event) || dropped;}if(!this.options.disabled && this.visible && this.accept.call(this.element[0],draggable.currentItem || draggable.element)){this.isout = true;this.isover = false;this._deactivate.call(this,event);}});return dropped;},dragStart:function dragStart(draggable,event){ // Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
draggable.element.parentsUntil("body").bind("scroll.droppable",function(){if(!draggable.options.refreshPositions){$.ui.ddmanager.prepareOffsets(draggable,event);}});},drag:function drag(draggable,event){ // If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
if(draggable.options.refreshPositions){$.ui.ddmanager.prepareOffsets(draggable,event);} // Run through all droppables and check their positions based on specific tolerance options
$.each($.ui.ddmanager.droppables[draggable.options.scope] || [],function(){if(this.options.disabled || this.greedyChild || !this.visible){return;}var parentInstance,scope,parent,intersects=$.ui.intersect(draggable,this,this.options.tolerance,event),c=!intersects && this.isover?"isout":intersects && !this.isover?"isover":null;if(!c){return;}if(this.options.greedy){ // find droppable parents with same scope
scope = this.options.scope;parent = this.element.parents(":data(ui-droppable)").filter(function(){return $(this).droppable("instance").options.scope === scope;});if(parent.length){parentInstance = $(parent[0]).droppable("instance");parentInstance.greedyChild = c === "isover";}} // we just moved into a greedy child
if(parentInstance && c === "isover"){parentInstance.isover = false;parentInstance.isout = true;parentInstance._out.call(parentInstance,event);}this[c] = true;this[c === "isout"?"isover":"isout"] = false;this[c === "isover"?"_over":"_out"].call(this,event); // we just moved out of a greedy child
if(parentInstance && c === "isout"){parentInstance.isout = false;parentInstance.isover = true;parentInstance._over.call(parentInstance,event);}});},dragStop:function dragStop(draggable,event){draggable.element.parentsUntil("body").unbind("scroll.droppable"); // Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
if(!draggable.options.refreshPositions){$.ui.ddmanager.prepareOffsets(draggable,event);}}};var droppable=$.ui.droppable; /*!
 * jQuery UI Resizable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/resizable/
 */$.widget("ui.resizable",$.ui.mouse,{version:"1.11.4",widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10, // See #7960
zIndex:90, // callbacks
resize:null,start:null,stop:null},_num:function _num(value){return parseInt(value,10) || 0;},_isNumber:function _isNumber(value){return !isNaN(parseInt(value,10));},_hasScroll:function _hasScroll(el,a){if($(el).css("overflow") === "hidden"){return false;}var scroll=a && a === "left"?"scrollLeft":"scrollTop",has=false;if(el[scroll] > 0){return true;} // TODO: determine which cases actually cause this to happen
// if the element doesn't have the scroll set, see if it's possible to
// set the scroll
el[scroll] = 1;has = el[scroll] > 0;el[scroll] = 0;return has;},_create:function _create(){var n,i,handle,axis,hname,that=this,o=this.options;this.element.addClass("ui-resizable");$.extend(this,{_aspectRatio:!!o.aspectRatio,aspectRatio:o.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:o.helper || o.ghost || o.animate?o.helper || "ui-resizable-helper":null}); // Wrap the element if it cannot hold child nodes
if(this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)){this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));this.element = this.element.parent().data("ui-resizable",this.element.resizable("instance"));this.elementIsWrapper = true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}); // support: Safari
// Prevent Safari textarea resize
this.originalResizeStyle = this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})); // support: IE9
// avoid IE jump (hard set the margin)
this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize();}this.handles = o.handles || (!$(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});this._handles = $();if(this.handles.constructor === String){if(this.handles === "all"){this.handles = "n,e,s,w,se,sw,ne,nw";}n = this.handles.split(",");this.handles = {};for(i = 0;i < n.length;i++) {handle = $.trim(n[i]);hname = "ui-resizable-" + handle;axis = $("<div class='ui-resizable-handle " + hname + "'></div>");axis.css({zIndex:o.zIndex}); // TODO : What's going on here?
if("se" === handle){axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");}this.handles[handle] = ".ui-resizable-" + handle;this.element.append(axis);}}this._renderAxis = function(target){var i,axis,padPos,padWrapper;target = target || this.element;for(i in this.handles) {if(this.handles[i].constructor === String){this.handles[i] = this.element.children(this.handles[i]).first().show();}else if(this.handles[i].jquery || this.handles[i].nodeType){this.handles[i] = $(this.handles[i]);this._on(this.handles[i],{"mousedown":that._mouseDown});}if(this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)){axis = $(this.handles[i],this.element);padWrapper = /sw|ne|nw|se|n|s/.test(i)?axis.outerHeight():axis.outerWidth();padPos = ["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");target.css(padPos,padWrapper);this._proportionallyResize();}this._handles = this._handles.add(this.handles[i]);}}; // TODO: make renderAxis a prototype function
this._renderAxis(this.element);this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));this._handles.disableSelection();this._handles.mouseover(function(){if(!that.resizing){if(this.className){axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);}that.axis = axis && axis[1]?axis[1]:"se";}});if(o.autoHide){this._handles.hide();$(this.element).addClass("ui-resizable-autohide").mouseenter(function(){if(o.disabled){return;}$(this).removeClass("ui-resizable-autohide");that._handles.show();}).mouseleave(function(){if(o.disabled){return;}if(!that.resizing){$(this).addClass("ui-resizable-autohide");that._handles.hide();}});}this._mouseInit();},_destroy:function _destroy(){this._mouseDestroy();var wrapper,_destroy=function _destroy(exp){$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();}; // TODO: Unwrap at same DOM position
if(this.elementIsWrapper){_destroy(this.element);wrapper = this.element;this.originalElement.css({position:wrapper.css("position"),width:wrapper.outerWidth(),height:wrapper.outerHeight(),top:wrapper.css("top"),left:wrapper.css("left")}).insertAfter(wrapper);wrapper.remove();}this.originalElement.css("resize",this.originalResizeStyle);_destroy(this.originalElement);return this;},_mouseCapture:function _mouseCapture(event){var i,handle,capture=false;for(i in this.handles) {handle = $(this.handles[i])[0];if(handle === event.target || $.contains(handle,event.target)){capture = true;}}return !this.options.disabled && capture;},_mouseStart:function _mouseStart(event){var curleft,curtop,cursor,o=this.options,el=this.element;this.resizing = true;this._renderProxy();curleft = this._num(this.helper.css("left"));curtop = this._num(this.helper.css("top"));if(o.containment){curleft += $(o.containment).scrollLeft() || 0;curtop += $(o.containment).scrollTop() || 0;}this.offset = this.helper.offset();this.position = {left:curleft,top:curtop};this.size = this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:el.width(),height:el.height()};this.originalSize = this._helper?{width:el.outerWidth(),height:el.outerHeight()}:{width:el.width(),height:el.height()};this.sizeDiff = {width:el.outerWidth() - el.width(),height:el.outerHeight() - el.height()};this.originalPosition = {left:curleft,top:curtop};this.originalMousePosition = {left:event.pageX,top:event.pageY};this.aspectRatio = typeof o.aspectRatio === "number"?o.aspectRatio:this.originalSize.width / this.originalSize.height || 1;cursor = $(".ui-resizable-" + this.axis).css("cursor");$("body").css("cursor",cursor === "auto"?this.axis + "-resize":cursor);el.addClass("ui-resizable-resizing");this._propagate("start",event);return true;},_mouseDrag:function _mouseDrag(event){var data,props,smp=this.originalMousePosition,a=this.axis,dx=event.pageX - smp.left || 0,dy=event.pageY - smp.top || 0,trigger=this._change[a];this._updatePrevProperties();if(!trigger){return false;}data = trigger.apply(this,[event,dx,dy]);this._updateVirtualBoundaries(event.shiftKey);if(this._aspectRatio || event.shiftKey){data = this._updateRatio(data,event);}data = this._respectSize(data,event);this._updateCache(data);this._propagate("resize",event);props = this._applyChanges();if(!this._helper && this._proportionallyResizeElements.length){this._proportionallyResize();}if(!$.isEmptyObject(props)){this._updatePrevProperties();this._trigger("resize",event,this.ui());this._applyChanges();}return false;},_mouseStop:function _mouseStop(event){this.resizing = false;var pr,ista,soffseth,soffsetw,s,left,top,o=this.options,that=this;if(this._helper){pr = this._proportionallyResizeElements;ista = pr.length && /textarea/i.test(pr[0].nodeName);soffseth = ista && this._hasScroll(pr[0],"left")?0:that.sizeDiff.height;soffsetw = ista?0:that.sizeDiff.width;s = {width:that.helper.width() - soffsetw,height:that.helper.height() - soffseth};left = parseInt(that.element.css("left"),10) + (that.position.left - that.originalPosition.left) || null;top = parseInt(that.element.css("top"),10) + (that.position.top - that.originalPosition.top) || null;if(!o.animate){this.element.css($.extend(s,{top:top,left:left}));}that.helper.height(that.size.height);that.helper.width(that.size.width);if(this._helper && !o.animate){this._proportionallyResize();}}$("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",event);if(this._helper){this.helper.remove();}return false;},_updatePrevProperties:function _updatePrevProperties(){this.prevPosition = {top:this.position.top,left:this.position.left};this.prevSize = {width:this.size.width,height:this.size.height};},_applyChanges:function _applyChanges(){var props={};if(this.position.top !== this.prevPosition.top){props.top = this.position.top + "px";}if(this.position.left !== this.prevPosition.left){props.left = this.position.left + "px";}if(this.size.width !== this.prevSize.width){props.width = this.size.width + "px";}if(this.size.height !== this.prevSize.height){props.height = this.size.height + "px";}this.helper.css(props);return props;},_updateVirtualBoundaries:function _updateVirtualBoundaries(forceAspectRatio){var pMinWidth,pMaxWidth,pMinHeight,pMaxHeight,b,o=this.options;b = {minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:Infinity,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:Infinity};if(this._aspectRatio || forceAspectRatio){pMinWidth = b.minHeight * this.aspectRatio;pMinHeight = b.minWidth / this.aspectRatio;pMaxWidth = b.maxHeight * this.aspectRatio;pMaxHeight = b.maxWidth / this.aspectRatio;if(pMinWidth > b.minWidth){b.minWidth = pMinWidth;}if(pMinHeight > b.minHeight){b.minHeight = pMinHeight;}if(pMaxWidth < b.maxWidth){b.maxWidth = pMaxWidth;}if(pMaxHeight < b.maxHeight){b.maxHeight = pMaxHeight;}}this._vBoundaries = b;},_updateCache:function _updateCache(data){this.offset = this.helper.offset();if(this._isNumber(data.left)){this.position.left = data.left;}if(this._isNumber(data.top)){this.position.top = data.top;}if(this._isNumber(data.height)){this.size.height = data.height;}if(this._isNumber(data.width)){this.size.width = data.width;}},_updateRatio:function _updateRatio(data){var cpos=this.position,csize=this.size,a=this.axis;if(this._isNumber(data.height)){data.width = data.height * this.aspectRatio;}else if(this._isNumber(data.width)){data.height = data.width / this.aspectRatio;}if(a === "sw"){data.left = cpos.left + (csize.width - data.width);data.top = null;}if(a === "nw"){data.top = cpos.top + (csize.height - data.height);data.left = cpos.left + (csize.width - data.width);}return data;},_respectSize:function _respectSize(data){var o=this._vBoundaries,a=this.axis,ismaxw=this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,ismaxh=this._isNumber(data.height) && o.maxHeight && o.maxHeight < data.height,isminw=this._isNumber(data.width) && o.minWidth && o.minWidth > data.width,isminh=this._isNumber(data.height) && o.minHeight && o.minHeight > data.height,dw=this.originalPosition.left + this.originalSize.width,dh=this.position.top + this.size.height,cw=/sw|nw|w/.test(a),ch=/nw|ne|n/.test(a);if(isminw){data.width = o.minWidth;}if(isminh){data.height = o.minHeight;}if(ismaxw){data.width = o.maxWidth;}if(ismaxh){data.height = o.maxHeight;}if(isminw && cw){data.left = dw - o.minWidth;}if(ismaxw && cw){data.left = dw - o.maxWidth;}if(isminh && ch){data.top = dh - o.minHeight;}if(ismaxh && ch){data.top = dh - o.maxHeight;} // Fixing jump error on top/left - bug #2330
if(!data.width && !data.height && !data.left && data.top){data.top = null;}else if(!data.width && !data.height && !data.top && data.left){data.left = null;}return data;},_getPaddingPlusBorderDimensions:function _getPaddingPlusBorderDimensions(element){var i=0,widths=[],borders=[element.css("borderTopWidth"),element.css("borderRightWidth"),element.css("borderBottomWidth"),element.css("borderLeftWidth")],paddings=[element.css("paddingTop"),element.css("paddingRight"),element.css("paddingBottom"),element.css("paddingLeft")];for(;i < 4;i++) {widths[i] = parseInt(borders[i],10) || 0;widths[i] += parseInt(paddings[i],10) || 0;}return {height:widths[0] + widths[2],width:widths[1] + widths[3]};},_proportionallyResize:function _proportionallyResize(){if(!this._proportionallyResizeElements.length){return;}var prel,i=0,element=this.helper || this.element;for(;i < this._proportionallyResizeElements.length;i++) {prel = this._proportionallyResizeElements[i]; // TODO: Seems like a bug to cache this.outerDimensions
// considering that we are in a loop.
if(!this.outerDimensions){this.outerDimensions = this._getPaddingPlusBorderDimensions(prel);}prel.css({height:element.height() - this.outerDimensions.height || 0,width:element.width() - this.outerDimensions.width || 0});}},_renderProxy:function _renderProxy(){var el=this.element,o=this.options;this.elementOffset = el.offset();if(this._helper){this.helper = this.helper || $("<div style='overflow:hidden;'></div>");this.helper.addClass(this._helper).css({width:this.element.outerWidth() - 1,height:this.element.outerHeight() - 1,position:"absolute",left:this.elementOffset.left + "px",top:this.elementOffset.top + "px",zIndex:++o.zIndex //TODO: Don't modify option
});this.helper.appendTo("body").disableSelection();}else {this.helper = this.element;}},_change:{e:function e(event,dx){return {width:this.originalSize.width + dx};},w:function w(event,dx){var cs=this.originalSize,sp=this.originalPosition;return {left:sp.left + dx,width:cs.width - dx};},n:function n(event,dx,dy){var cs=this.originalSize,sp=this.originalPosition;return {top:sp.top + dy,height:cs.height - dy};},s:function s(event,dx,dy){return {height:this.originalSize.height + dy};},se:function se(event,dx,dy){return $.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[event,dx,dy]));},sw:function sw(event,dx,dy){return $.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[event,dx,dy]));},ne:function ne(event,dx,dy){return $.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[event,dx,dy]));},nw:function nw(event,dx,dy){return $.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[event,dx,dy]));}},_propagate:function _propagate(n,event){$.ui.plugin.call(this,n,[event,this.ui()]);n !== "resize" && this._trigger(n,event,this.ui());},plugins:{},ui:function ui(){return {originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition};}}); /*
 * Resizable Extensions
 */$.ui.plugin.add("resizable","animate",{stop:function stop(event){var that=$(this).resizable("instance"),o=that.options,pr=that._proportionallyResizeElements,ista=pr.length && /textarea/i.test(pr[0].nodeName),soffseth=ista && that._hasScroll(pr[0],"left")?0:that.sizeDiff.height,soffsetw=ista?0:that.sizeDiff.width,style={width:that.size.width - soffsetw,height:that.size.height - soffseth},left=parseInt(that.element.css("left"),10) + (that.position.left - that.originalPosition.left) || null,top=parseInt(that.element.css("top"),10) + (that.position.top - that.originalPosition.top) || null;that.element.animate($.extend(style,top && left?{top:top,left:left}:{}),{duration:o.animateDuration,easing:o.animateEasing,step:function step(){var data={width:parseInt(that.element.css("width"),10),height:parseInt(that.element.css("height"),10),top:parseInt(that.element.css("top"),10),left:parseInt(that.element.css("left"),10)};if(pr && pr.length){$(pr[0]).css({width:data.width,height:data.height});} // propagating resize, and updating values for each animation step
that._updateCache(data);that._propagate("resize",event);}});}});$.ui.plugin.add("resizable","containment",{start:function start(){var element,p,co,ch,cw,width,height,that=$(this).resizable("instance"),o=that.options,el=that.element,oc=o.containment,ce=oc instanceof $?oc.get(0):/parent/.test(oc)?el.parent().get(0):oc;if(!ce){return;}that.containerElement = $(ce);if(/document/.test(oc) || oc === document){that.containerOffset = {left:0,top:0};that.containerPosition = {left:0,top:0};that.parentData = {element:$(document),left:0,top:0,width:$(document).width(),height:$(document).height() || document.body.parentNode.scrollHeight};}else {element = $(ce);p = [];$(["Top","Right","Left","Bottom"]).each(function(i,name){p[i] = that._num(element.css("padding" + name));});that.containerOffset = element.offset();that.containerPosition = element.position();that.containerSize = {height:element.innerHeight() - p[3],width:element.innerWidth() - p[1]};co = that.containerOffset;ch = that.containerSize.height;cw = that.containerSize.width;width = that._hasScroll(ce,"left")?ce.scrollWidth:cw;height = that._hasScroll(ce)?ce.scrollHeight:ch;that.parentData = {element:ce,left:co.left,top:co.top,width:width,height:height};}},resize:function resize(event){var woset,hoset,isParent,isOffsetRelative,that=$(this).resizable("instance"),o=that.options,co=that.containerOffset,cp=that.position,pRatio=that._aspectRatio || event.shiftKey,cop={top:0,left:0},ce=that.containerElement,continueResize=true;if(ce[0] !== document && /static/.test(ce.css("position"))){cop = co;}if(cp.left < (that._helper?co.left:0)){that.size.width = that.size.width + (that._helper?that.position.left - co.left:that.position.left - cop.left);if(pRatio){that.size.height = that.size.width / that.aspectRatio;continueResize = false;}that.position.left = o.helper?co.left:0;}if(cp.top < (that._helper?co.top:0)){that.size.height = that.size.height + (that._helper?that.position.top - co.top:that.position.top);if(pRatio){that.size.width = that.size.height * that.aspectRatio;continueResize = false;}that.position.top = that._helper?co.top:0;}isParent = that.containerElement.get(0) === that.element.parent().get(0);isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position"));if(isParent && isOffsetRelative){that.offset.left = that.parentData.left + that.position.left;that.offset.top = that.parentData.top + that.position.top;}else {that.offset.left = that.element.offset().left;that.offset.top = that.element.offset().top;}woset = Math.abs(that.sizeDiff.width + (that._helper?that.offset.left - cop.left:that.offset.left - co.left));hoset = Math.abs(that.sizeDiff.height + (that._helper?that.offset.top - cop.top:that.offset.top - co.top));if(woset + that.size.width >= that.parentData.width){that.size.width = that.parentData.width - woset;if(pRatio){that.size.height = that.size.width / that.aspectRatio;continueResize = false;}}if(hoset + that.size.height >= that.parentData.height){that.size.height = that.parentData.height - hoset;if(pRatio){that.size.width = that.size.height * that.aspectRatio;continueResize = false;}}if(!continueResize){that.position.left = that.prevPosition.left;that.position.top = that.prevPosition.top;that.size.width = that.prevSize.width;that.size.height = that.prevSize.height;}},stop:function stop(){var that=$(this).resizable("instance"),o=that.options,co=that.containerOffset,cop=that.containerPosition,ce=that.containerElement,helper=$(that.helper),ho=helper.offset(),w=helper.outerWidth() - that.sizeDiff.width,h=helper.outerHeight() - that.sizeDiff.height;if(that._helper && !o.animate && /relative/.test(ce.css("position"))){$(this).css({left:ho.left - cop.left - co.left,width:w,height:h});}if(that._helper && !o.animate && /static/.test(ce.css("position"))){$(this).css({left:ho.left - cop.left - co.left,width:w,height:h});}}});$.ui.plugin.add("resizable","alsoResize",{start:function start(){var that=$(this).resizable("instance"),o=that.options;$(o.alsoResize).each(function(){var el=$(this);el.data("ui-resizable-alsoresize",{width:parseInt(el.width(),10),height:parseInt(el.height(),10),left:parseInt(el.css("left"),10),top:parseInt(el.css("top"),10)});});},resize:function resize(event,ui){var that=$(this).resizable("instance"),o=that.options,os=that.originalSize,op=that.originalPosition,delta={height:that.size.height - os.height || 0,width:that.size.width - os.width || 0,top:that.position.top - op.top || 0,left:that.position.left - op.left || 0};$(o.alsoResize).each(function(){var el=$(this),start=$(this).data("ui-resizable-alsoresize"),style={},css=el.parents(ui.originalElement[0]).length?["width","height"]:["width","height","top","left"];$.each(css,function(i,prop){var sum=(start[prop] || 0) + (delta[prop] || 0);if(sum && sum >= 0){style[prop] = sum || null;}});el.css(style);});},stop:function stop(){$(this).removeData("resizable-alsoresize");}});$.ui.plugin.add("resizable","ghost",{start:function start(){var that=$(this).resizable("instance"),o=that.options,cs=that.size;that.ghost = that.originalElement.clone();that.ghost.css({opacity:0.25,display:"block",position:"relative",height:cs.height,width:cs.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof o.ghost === "string"?o.ghost:"");that.ghost.appendTo(that.helper);},resize:function resize(){var that=$(this).resizable("instance");if(that.ghost){that.ghost.css({position:"relative",height:that.size.height,width:that.size.width});}},stop:function stop(){var that=$(this).resizable("instance");if(that.ghost && that.helper){that.helper.get(0).removeChild(that.ghost.get(0));}}});$.ui.plugin.add("resizable","grid",{resize:function resize(){var outerDimensions,that=$(this).resizable("instance"),o=that.options,cs=that.size,os=that.originalSize,op=that.originalPosition,a=that.axis,grid=typeof o.grid === "number"?[o.grid,o.grid]:o.grid,gridX=grid[0] || 1,gridY=grid[1] || 1,ox=Math.round((cs.width - os.width) / gridX) * gridX,oy=Math.round((cs.height - os.height) / gridY) * gridY,newWidth=os.width + ox,newHeight=os.height + oy,isMaxWidth=o.maxWidth && o.maxWidth < newWidth,isMaxHeight=o.maxHeight && o.maxHeight < newHeight,isMinWidth=o.minWidth && o.minWidth > newWidth,isMinHeight=o.minHeight && o.minHeight > newHeight;o.grid = grid;if(isMinWidth){newWidth += gridX;}if(isMinHeight){newHeight += gridY;}if(isMaxWidth){newWidth -= gridX;}if(isMaxHeight){newHeight -= gridY;}if(/^(se|s|e)$/.test(a)){that.size.width = newWidth;that.size.height = newHeight;}else if(/^(ne)$/.test(a)){that.size.width = newWidth;that.size.height = newHeight;that.position.top = op.top - oy;}else if(/^(sw)$/.test(a)){that.size.width = newWidth;that.size.height = newHeight;that.position.left = op.left - ox;}else {if(newHeight - gridY <= 0 || newWidth - gridX <= 0){outerDimensions = that._getPaddingPlusBorderDimensions(this);}if(newHeight - gridY > 0){that.size.height = newHeight;that.position.top = op.top - oy;}else {newHeight = gridY - outerDimensions.height;that.size.height = newHeight;that.position.top = op.top + os.height - newHeight;}if(newWidth - gridX > 0){that.size.width = newWidth;that.position.left = op.left - ox;}else {newWidth = gridX - outerDimensions.width;that.size.width = newWidth;that.position.left = op.left + os.width - newWidth;}}}});var resizable=$.ui.resizable; /*!
 * jQuery UI Selectable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectable/
 */var selectable=$.widget("ui.selectable",$.ui.mouse,{version:"1.11.4",options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch", // callbacks
selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function _create(){var selectees,that=this;this.element.addClass("ui-selectable");this.dragged = false; // cache selectee children based on filter
this.refresh = function(){selectees = $(that.options.filter,that.element[0]);selectees.addClass("ui-selectee");selectees.each(function(){var $this=$(this),pos=$this.offset();$.data(this,"selectable-item",{element:this,$element:$this,left:pos.left,top:pos.top,right:pos.left + $this.outerWidth(),bottom:pos.top + $this.outerHeight(),startselected:false,selected:$this.hasClass("ui-selected"),selecting:$this.hasClass("ui-selecting"),unselecting:$this.hasClass("ui-unselecting")});});};this.refresh();this.selectees = selectees.addClass("ui-selectee");this._mouseInit();this.helper = $("<div class='ui-selectable-helper'></div>");},_destroy:function _destroy(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled");this._mouseDestroy();},_mouseStart:function _mouseStart(event){var that=this,options=this.options;this.opos = [event.pageX,event.pageY];if(this.options.disabled){return;}this.selectees = $(options.filter,this.element[0]);this._trigger("start",event);$(options.appendTo).append(this.helper); // position helper (lasso)
this.helper.css({"left":event.pageX,"top":event.pageY,"width":0,"height":0});if(options.autoRefresh){this.refresh();}this.selectees.filter(".ui-selected").each(function(){var selectee=$.data(this,"selectable-item");selectee.startselected = true;if(!event.metaKey && !event.ctrlKey){selectee.$element.removeClass("ui-selected");selectee.selected = false;selectee.$element.addClass("ui-unselecting");selectee.unselecting = true; // selectable UNSELECTING callback
that._trigger("unselecting",event,{unselecting:selectee.element});}});$(event.target).parents().addBack().each(function(){var doSelect,selectee=$.data(this,"selectable-item");if(selectee){doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected");selectee.$element.removeClass(doSelect?"ui-unselecting":"ui-selected").addClass(doSelect?"ui-selecting":"ui-unselecting");selectee.unselecting = !doSelect;selectee.selecting = doSelect;selectee.selected = doSelect; // selectable (UN)SELECTING callback
if(doSelect){that._trigger("selecting",event,{selecting:selectee.element});}else {that._trigger("unselecting",event,{unselecting:selectee.element});}return false;}});},_mouseDrag:function _mouseDrag(event){this.dragged = true;if(this.options.disabled){return;}var tmp,that=this,options=this.options,x1=this.opos[0],y1=this.opos[1],x2=event.pageX,y2=event.pageY;if(x1 > x2){tmp = x2;x2 = x1;x1 = tmp;}if(y1 > y2){tmp = y2;y2 = y1;y1 = tmp;}this.helper.css({left:x1,top:y1,width:x2 - x1,height:y2 - y1});this.selectees.each(function(){var selectee=$.data(this,"selectable-item"),hit=false; //prevent helper from being selected if appendTo: selectable
if(!selectee || selectee.element === that.element[0]){return;}if(options.tolerance === "touch"){hit = !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1);}else if(options.tolerance === "fit"){hit = selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2;}if(hit){ // SELECT
if(selectee.selected){selectee.$element.removeClass("ui-selected");selectee.selected = false;}if(selectee.unselecting){selectee.$element.removeClass("ui-unselecting");selectee.unselecting = false;}if(!selectee.selecting){selectee.$element.addClass("ui-selecting");selectee.selecting = true; // selectable SELECTING callback
that._trigger("selecting",event,{selecting:selectee.element});}}else { // UNSELECT
if(selectee.selecting){if((event.metaKey || event.ctrlKey) && selectee.startselected){selectee.$element.removeClass("ui-selecting");selectee.selecting = false;selectee.$element.addClass("ui-selected");selectee.selected = true;}else {selectee.$element.removeClass("ui-selecting");selectee.selecting = false;if(selectee.startselected){selectee.$element.addClass("ui-unselecting");selectee.unselecting = true;} // selectable UNSELECTING callback
that._trigger("unselecting",event,{unselecting:selectee.element});}}if(selectee.selected){if(!event.metaKey && !event.ctrlKey && !selectee.startselected){selectee.$element.removeClass("ui-selected");selectee.selected = false;selectee.$element.addClass("ui-unselecting");selectee.unselecting = true; // selectable UNSELECTING callback
that._trigger("unselecting",event,{unselecting:selectee.element});}}}});return false;},_mouseStop:function _mouseStop(event){var that=this;this.dragged = false;$(".ui-unselecting",this.element[0]).each(function(){var selectee=$.data(this,"selectable-item");selectee.$element.removeClass("ui-unselecting");selectee.unselecting = false;selectee.startselected = false;that._trigger("unselected",event,{unselected:selectee.element});});$(".ui-selecting",this.element[0]).each(function(){var selectee=$.data(this,"selectable-item");selectee.$element.removeClass("ui-selecting").addClass("ui-selected");selectee.selecting = false;selectee.selected = true;selectee.startselected = true;that._trigger("selected",event,{selected:selectee.element});});this._trigger("stop",event);this.helper.remove();return false;}}); /*!
 * jQuery UI Sortable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */var sortable=$.widget("ui.sortable",$.ui.mouse,{version:"1.11.4",widgetEventPrefix:"sort",ready:false,options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000, // callbacks
activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function _isOverAxis(x,reference,size){return x >= reference && x < reference + size;},_isFloating:function _isFloating(item){return (/left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display")));},_create:function _create(){this.containerCache = {};this.element.addClass("ui-sortable"); //Get the items
this.refresh(); //Let's determine the parent's offset
this.offset = this.element.offset(); //Initialize mouse events for interaction
this._mouseInit();this._setHandleClassName(); //We're ready to go
this.ready = true;},_setOption:function _setOption(key,value){this._super(key,value);if(key === "handle"){this._setHandleClassName();}},_setHandleClassName:function _setHandleClassName(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");$.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle");});},_destroy:function _destroy(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle");this._mouseDestroy();for(var i=this.items.length - 1;i >= 0;i--) {this.items[i].item.removeData(this.widgetName + "-item");}return this;},_mouseCapture:function _mouseCapture(event,overrideHandle){var currentItem=null,validHandle=false,that=this;if(this.reverting){return false;}if(this.options.disabled || this.options.type === "static"){return false;} //We have to refresh the items data once first
this._refreshItems(event); //Find out if the clicked node (or one of its parents) is a actual item in this.items
$(event.target).parents().each(function(){if($.data(this,that.widgetName + "-item") === that){currentItem = $(this);return false;}});if($.data(event.target,that.widgetName + "-item") === that){currentItem = $(event.target);}if(!currentItem){return false;}if(this.options.handle && !overrideHandle){$(this.options.handle,currentItem).find("*").addBack().each(function(){if(this === event.target){validHandle = true;}});if(!validHandle){return false;}}this.currentItem = currentItem;this._removeCurrentsFromItems();return true;},_mouseStart:function _mouseStart(event,overrideHandle,noActivation){var i,body,o=this.options;this.currentContainer = this; //We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
this.refreshPositions(); //Create and append the visible helper
this.helper = this._createHelper(event); //Cache the helper size
this._cacheHelperProportions(); /*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */ //Cache the margins of the original element
this._cacheMargins(); //Get the next scrolling parent
this.scrollParent = this.helper.scrollParent(); //The element's absolute position on the page minus margins
this.offset = this.currentItem.offset();this.offset = {top:this.offset.top - this.margins.top,left:this.offset.left - this.margins.left};$.extend(this.offset,{click:{ //Where the click happened, relative to the element
left:event.pageX - this.offset.left,top:event.pageY - this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
}); // Only after we got the offset, we can change the helper's position to absolute
// TODO: Still need to figure out a way to make relative sorting possible
this.helper.css("position","absolute");this.cssPosition = this.helper.css("position"); //Generate the original position
this.originalPosition = this._generatePosition(event);this.originalPageX = event.pageX;this.originalPageY = event.pageY; //Adjust the mouse offset relative to the helper if "cursorAt" is supplied
o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt); //Cache the former DOM position
this.domPosition = {prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]}; //If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
if(this.helper[0] !== this.currentItem[0]){this.currentItem.hide();} //Create the placeholder
this._createPlaceholder(); //Set a containment if given in the options
if(o.containment){this._setContainment();}if(o.cursor && o.cursor !== "auto"){ // cursor option
body = this.document.find("body"); // support: IE
this.storedCursor = body.css("cursor");body.css("cursor",o.cursor);this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body);}if(o.opacity){ // opacity option
if(this.helper.css("opacity")){this._storedOpacity = this.helper.css("opacity");}this.helper.css("opacity",o.opacity);}if(o.zIndex){ // zIndex option
if(this.helper.css("zIndex")){this._storedZIndex = this.helper.css("zIndex");}this.helper.css("zIndex",o.zIndex);} //Prepare scrolling
if(this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML"){this.overflowOffset = this.scrollParent.offset();} //Call callbacks
this._trigger("start",event,this._uiHash()); //Recache the helper size
if(!this._preserveHelperProportions){this._cacheHelperProportions();} //Post "activate" events to possible containers
if(!noActivation){for(i = this.containers.length - 1;i >= 0;i--) {this.containers[i]._trigger("activate",event,this._uiHash(this));}} //Prepare possible droppables
if($.ui.ddmanager){$.ui.ddmanager.current = this;}if($.ui.ddmanager && !o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,event);}this.dragging = true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
return true;},_mouseDrag:function _mouseDrag(event){var i,item,itemElement,intersection,o=this.options,scrolled=false; //Compute the helpers position
this.position = this._generatePosition(event);this.positionAbs = this._convertPositionTo("absolute");if(!this.lastPositionAbs){this.lastPositionAbs = this.positionAbs;} //Do scrolling
if(this.options.scroll){if(this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML"){if(this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity){this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;}else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity){this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;}if(this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity){this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;}else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity){this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;}}else {if(event.pageY - this.document.scrollTop() < o.scrollSensitivity){scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);}else if(this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity){scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);}if(event.pageX - this.document.scrollLeft() < o.scrollSensitivity){scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed);}else if(this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity){scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed);}}if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour){$.ui.ddmanager.prepareOffsets(this,event);}} //Regenerate the absolute position used for position checks
this.positionAbs = this._convertPositionTo("absolute"); //Set the helper position
if(!this.options.axis || this.options.axis !== "y"){this.helper[0].style.left = this.position.left + "px";}if(!this.options.axis || this.options.axis !== "x"){this.helper[0].style.top = this.position.top + "px";} //Rearrange
for(i = this.items.length - 1;i >= 0;i--) { //Cache variables and intersection, continue if no intersection
item = this.items[i];itemElement = item.item[0];intersection = this._intersectsWithPointer(item);if(!intersection){continue;} // Only put the placeholder inside the current Container, skip all
// items from other containers. This works because when moving
// an item from one container to another the
// currentContainer is switched before the placeholder is moved.
//
// Without this, moving items in "sub-sortables" can cause
// the placeholder to jitter between the outer and inner container.
if(item.instance !== this.currentContainer){continue;} // cannot intersect with itself
// no useless actions that have been done before
// no action if the item moved is the parent of the item checked
if(itemElement !== this.currentItem[0] && this.placeholder[intersection === 1?"next":"prev"]()[0] !== itemElement && !$.contains(this.placeholder[0],itemElement) && (this.options.type === "semi-dynamic"?!$.contains(this.element[0],itemElement):true)){this.direction = intersection === 1?"down":"up";if(this.options.tolerance === "pointer" || this._intersectsWithSides(item)){this._rearrange(event,item);}else {break;}this._trigger("change",event,this._uiHash());break;}} //Post events to containers
this._contactContainers(event); //Interconnect with droppables
if($.ui.ddmanager){$.ui.ddmanager.drag(this,event);} //Call callbacks
this._trigger("sort",event,this._uiHash());this.lastPositionAbs = this.positionAbs;return false;},_mouseStop:function _mouseStop(event,noPropagation){if(!event){return;} //If we are using droppables, inform the manager about the drop
if($.ui.ddmanager && !this.options.dropBehaviour){$.ui.ddmanager.drop(this,event);}if(this.options.revert){var that=this,cur=this.placeholder.offset(),axis=this.options.axis,animation={};if(!axis || axis === "x"){animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body?0:this.offsetParent[0].scrollLeft);}if(!axis || axis === "y"){animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body?0:this.offsetParent[0].scrollTop);}this.reverting = true;$(this.helper).animate(animation,parseInt(this.options.revert,10) || 500,function(){that._clear(event);});}else {this._clear(event,noPropagation);}return false;},cancel:function cancel(){if(this.dragging){this._mouseUp({target:null});if(this.options.helper === "original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");}else {this.currentItem.show();} //Post deactivating events to containers
for(var i=this.containers.length - 1;i >= 0;i--) {this.containers[i]._trigger("deactivate",null,this._uiHash(this));if(this.containers[i].containerCache.over){this.containers[i]._trigger("out",null,this._uiHash(this));this.containers[i].containerCache.over = 0;}}}if(this.placeholder){ //$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0]);}if(this.options.helper !== "original" && this.helper && this.helper[0].parentNode){this.helper.remove();}$.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});if(this.domPosition.prev){$(this.domPosition.prev).after(this.currentItem);}else {$(this.domPosition.parent).prepend(this.currentItem);}}return this;},serialize:function serialize(o){var items=this._getItemsAsjQuery(o && o.connected),str=[];o = o || {};$(items).each(function(){var res=($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);if(res){str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression?res[1]:res[2]));}});if(!str.length && o.key){str.push(o.key + "=");}return str.join("&");},toArray:function toArray(o){var items=this._getItemsAsjQuery(o && o.connected),ret=[];o = o || {};items.each(function(){ret.push($(o.item || this).attr(o.attribute || "id") || "");});return ret;}, /* Be careful with the following core functions */_intersectsWith:function _intersectsWith(item){var x1=this.positionAbs.left,x2=x1 + this.helperProportions.width,y1=this.positionAbs.top,y2=y1 + this.helperProportions.height,l=item.left,r=l + item.width,t=item.top,b=t + item.height,dyClick=this.offset.click.top,dxClick=this.offset.click.left,isOverElementHeight=this.options.axis === "x" || y1 + dyClick > t && y1 + dyClick < b,isOverElementWidth=this.options.axis === "y" || x1 + dxClick > l && x1 + dxClick < r,isOverElement=isOverElementHeight && isOverElementWidth;if(this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating?"width":"height"] > item[this.floating?"width":"height"]){return isOverElement;}else {return l < x1 + this.helperProportions.width / 2 &&  // Right Half
x2 - this.helperProportions.width / 2 < r &&  // Left Half
t < y1 + this.helperProportions.height / 2 &&  // Bottom Half
y2 - this.helperProportions.height / 2 < b; // Top Half
}},_intersectsWithPointer:function _intersectsWithPointer(item){var isOverElementHeight=this.options.axis === "x" || this._isOverAxis(this.positionAbs.top + this.offset.click.top,item.top,item.height),isOverElementWidth=this.options.axis === "y" || this._isOverAxis(this.positionAbs.left + this.offset.click.left,item.left,item.width),isOverElement=isOverElementHeight && isOverElementWidth,verticalDirection=this._getDragVerticalDirection(),horizontalDirection=this._getDragHorizontalDirection();if(!isOverElement){return false;}return this.floating?horizontalDirection && horizontalDirection === "right" || verticalDirection === "down"?2:1:verticalDirection && (verticalDirection === "down"?2:1);},_intersectsWithSides:function _intersectsWithSides(item){var isOverBottomHalf=this._isOverAxis(this.positionAbs.top + this.offset.click.top,item.top + item.height / 2,item.height),isOverRightHalf=this._isOverAxis(this.positionAbs.left + this.offset.click.left,item.left + item.width / 2,item.width),verticalDirection=this._getDragVerticalDirection(),horizontalDirection=this._getDragHorizontalDirection();if(this.floating && horizontalDirection){return horizontalDirection === "right" && isOverRightHalf || horizontalDirection === "left" && !isOverRightHalf;}else {return verticalDirection && (verticalDirection === "down" && isOverBottomHalf || verticalDirection === "up" && !isOverBottomHalf);}},_getDragVerticalDirection:function _getDragVerticalDirection(){var delta=this.positionAbs.top - this.lastPositionAbs.top;return delta !== 0 && (delta > 0?"down":"up");},_getDragHorizontalDirection:function _getDragHorizontalDirection(){var delta=this.positionAbs.left - this.lastPositionAbs.left;return delta !== 0 && (delta > 0?"right":"left");},refresh:function refresh(event){this._refreshItems(event);this._setHandleClassName();this.refreshPositions();return this;},_connectWith:function _connectWith(){var options=this.options;return options.connectWith.constructor === String?[options.connectWith]:options.connectWith;},_getItemsAsjQuery:function _getItemsAsjQuery(connected){var i,j,cur,inst,items=[],queries=[],connectWith=this._connectWith();if(connectWith && connected){for(i = connectWith.length - 1;i >= 0;i--) {cur = $(connectWith[i],this.document[0]);for(j = cur.length - 1;j >= 0;j--) {inst = $.data(cur[j],this.widgetFullName);if(inst && inst !== this && !inst.options.disabled){queries.push([$.isFunction(inst.options.items)?inst.options.items.call(inst.element):$(inst.options.items,inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),inst]);}}}}queries.push([$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);function addItems(){items.push(this);}for(i = queries.length - 1;i >= 0;i--) {queries[i][0].each(addItems);}return $(items);},_removeCurrentsFromItems:function _removeCurrentsFromItems(){var list=this.currentItem.find(":data(" + this.widgetName + "-item)");this.items = $.grep(this.items,function(item){for(var j=0;j < list.length;j++) {if(list[j] === item.item[0]){return false;}}return true;});},_refreshItems:function _refreshItems(event){this.items = [];this.containers = [this];var i,j,cur,inst,targetData,_queries,item,queriesLength,items=this.items,queries=[[$.isFunction(this.options.items)?this.options.items.call(this.element[0],event,{item:this.currentItem}):$(this.options.items,this.element),this]],connectWith=this._connectWith();if(connectWith && this.ready){ //Shouldn't be run the first time through due to massive slow-down
for(i = connectWith.length - 1;i >= 0;i--) {cur = $(connectWith[i],this.document[0]);for(j = cur.length - 1;j >= 0;j--) {inst = $.data(cur[j],this.widgetFullName);if(inst && inst !== this && !inst.options.disabled){queries.push([$.isFunction(inst.options.items)?inst.options.items.call(inst.element[0],event,{item:this.currentItem}):$(inst.options.items,inst.element),inst]);this.containers.push(inst);}}}}for(i = queries.length - 1;i >= 0;i--) {targetData = queries[i][1];_queries = queries[i][0];for(j = 0,queriesLength = _queries.length;j < queriesLength;j++) {item = $(_queries[j]);item.data(this.widgetName + "-item",targetData); // Data for target checking (mouse manager)
items.push({item:item,instance:targetData,width:0,height:0,left:0,top:0});}}},refreshPositions:function refreshPositions(fast){ // Determine whether items are being displayed horizontally
this.floating = this.items.length?this.options.axis === "x" || this._isFloating(this.items[0].item):false; //This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
if(this.offsetParent && this.helper){this.offset.parent = this._getParentOffset();}var i,item,t,p;for(i = this.items.length - 1;i >= 0;i--) {item = this.items[i]; //We ignore calculating positions of all connected containers when we're not over them
if(item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]){continue;}t = this.options.toleranceElement?$(this.options.toleranceElement,item.item):item.item;if(!fast){item.width = t.outerWidth();item.height = t.outerHeight();}p = t.offset();item.left = p.left;item.top = p.top;}if(this.options.custom && this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this);}else {for(i = this.containers.length - 1;i >= 0;i--) {p = this.containers[i].element.offset();this.containers[i].containerCache.left = p.left;this.containers[i].containerCache.top = p.top;this.containers[i].containerCache.width = this.containers[i].element.outerWidth();this.containers[i].containerCache.height = this.containers[i].element.outerHeight();}}return this;},_createPlaceholder:function _createPlaceholder(that){that = that || this;var className,o=that.options;if(!o.placeholder || o.placeholder.constructor === String){className = o.placeholder;o.placeholder = {element:function element(){var nodeName=that.currentItem[0].nodeName.toLowerCase(),element=$("<" + nodeName + ">",that.document[0]).addClass(className || that.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");if(nodeName === "tbody"){that._createTrPlaceholder(that.currentItem.find("tr").eq(0),$("<tr>",that.document[0]).appendTo(element));}else if(nodeName === "tr"){that._createTrPlaceholder(that.currentItem,element);}else if(nodeName === "img"){element.attr("src",that.currentItem.attr("src"));}if(!className){element.css("visibility","hidden");}return element;},update:function update(container,p){ // 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
if(className && !o.forcePlaceholderSize){return;} //If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
if(!p.height()){p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0,10) - parseInt(that.currentItem.css("paddingBottom") || 0,10));}if(!p.width()){p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0,10) - parseInt(that.currentItem.css("paddingRight") || 0,10));}}};} //Create the placeholder
that.placeholder = $(o.placeholder.element.call(that.element,that.currentItem)); //Append it after the actual current item
that.currentItem.after(that.placeholder); //Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
o.placeholder.update(that,that.placeholder);},_createTrPlaceholder:function _createTrPlaceholder(sourceTr,targetTr){var that=this;sourceTr.children().each(function(){$("<td>&#160;</td>",that.document[0]).attr("colspan",$(this).attr("colspan") || 1).appendTo(targetTr);});},_contactContainers:function _contactContainers(event){var i,j,dist,itemWithLeastDistance,posProperty,sizeProperty,cur,nearBottom,floating,axis,innermostContainer=null,innermostIndex=null; // get innermost container that intersects with item
for(i = this.containers.length - 1;i >= 0;i--) { // never consider a container that's located within the item itself
if($.contains(this.currentItem[0],this.containers[i].element[0])){continue;}if(this._intersectsWith(this.containers[i].containerCache)){ // if we've already found a container and it's more "inner" than this, then continue
if(innermostContainer && $.contains(this.containers[i].element[0],innermostContainer.element[0])){continue;}innermostContainer = this.containers[i];innermostIndex = i;}else { // container doesn't intersect. trigger "out" event if necessary
if(this.containers[i].containerCache.over){this.containers[i]._trigger("out",event,this._uiHash(this));this.containers[i].containerCache.over = 0;}}} // if no intersecting containers found, return
if(!innermostContainer){return;} // move the item into the container if it's not there already
if(this.containers.length === 1){if(!this.containers[innermostIndex].containerCache.over){this.containers[innermostIndex]._trigger("over",event,this._uiHash(this));this.containers[innermostIndex].containerCache.over = 1;}}else { //When entering a new container, we will find the item with the least distance and append our item near it
dist = 10000;itemWithLeastDistance = null;floating = innermostContainer.floating || this._isFloating(this.currentItem);posProperty = floating?"left":"top";sizeProperty = floating?"width":"height";axis = floating?"clientX":"clientY";for(j = this.items.length - 1;j >= 0;j--) {if(!$.contains(this.containers[innermostIndex].element[0],this.items[j].item[0])){continue;}if(this.items[j].item[0] === this.currentItem[0]){continue;}cur = this.items[j].item.offset()[posProperty];nearBottom = false;if(event[axis] - cur > this.items[j][sizeProperty] / 2){nearBottom = true;}if(Math.abs(event[axis] - cur) < dist){dist = Math.abs(event[axis] - cur);itemWithLeastDistance = this.items[j];this.direction = nearBottom?"up":"down";}} //Check if dropOnEmpty is enabled
if(!itemWithLeastDistance && !this.options.dropOnEmpty){return;}if(this.currentContainer === this.containers[innermostIndex]){if(!this.currentContainer.containerCache.over){this.containers[innermostIndex]._trigger("over",event,this._uiHash());this.currentContainer.containerCache.over = 1;}return;}itemWithLeastDistance?this._rearrange(event,itemWithLeastDistance,null,true):this._rearrange(event,null,this.containers[innermostIndex].element,true);this._trigger("change",event,this._uiHash());this.containers[innermostIndex]._trigger("change",event,this._uiHash(this));this.currentContainer = this.containers[innermostIndex]; //Update the placeholder
this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[innermostIndex]._trigger("over",event,this._uiHash(this));this.containers[innermostIndex].containerCache.over = 1;}},_createHelper:function _createHelper(event){var o=this.options,helper=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[event,this.currentItem])):o.helper === "clone"?this.currentItem.clone():this.currentItem; //Add the helper to the DOM if that didn't happen already
if(!helper.parents("body").length){$(o.appendTo !== "parent"?o.appendTo:this.currentItem[0].parentNode)[0].appendChild(helper[0]);}if(helper[0] === this.currentItem[0]){this._storedCSS = {width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};}if(!helper[0].style.width || o.forceHelperSize){helper.width(this.currentItem.width());}if(!helper[0].style.height || o.forceHelperSize){helper.height(this.currentItem.height());}return helper;},_adjustOffsetFromHelper:function _adjustOffsetFromHelper(obj){if(typeof obj === "string"){obj = obj.split(" ");}if($.isArray(obj)){obj = {left:+obj[0],top:+obj[1] || 0};}if("left" in obj){this.offset.click.left = obj.left + this.margins.left;}if("right" in obj){this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;}if("top" in obj){this.offset.click.top = obj.top + this.margins.top;}if("bottom" in obj){this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;}},_getParentOffset:function _getParentOffset(){ //Get the offsetParent and cache its position
this.offsetParent = this.helper.offsetParent();var po=this.offsetParent.offset(); // This is a special case where we need to modify a offset calculated on start, since the following happened:
// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
if(this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0],this.offsetParent[0])){po.left += this.scrollParent.scrollLeft();po.top += this.scrollParent.scrollTop();} // This needs to be actually done for all browsers, since pageX/pageY includes this information
// with an ugly IE fix
if(this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie){po = {top:0,left:0};}return {top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)};},_getRelativeOffset:function _getRelativeOffset(){if(this.cssPosition === "relative"){var p=this.currentItem.position();return {top:p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),left:p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()};}else {return {top:0,left:0};}},_cacheMargins:function _cacheMargins(){this.margins = {left:parseInt(this.currentItem.css("marginLeft"),10) || 0,top:parseInt(this.currentItem.css("marginTop"),10) || 0};},_cacheHelperProportions:function _cacheHelperProportions(){this.helperProportions = {width:this.helper.outerWidth(),height:this.helper.outerHeight()};},_setContainment:function _setContainment(){var ce,co,over,o=this.options;if(o.containment === "parent"){o.containment = this.helper[0].parentNode;}if(o.containment === "document" || o.containment === "window"){this.containment = [0 - this.offset.relative.left - this.offset.parent.left,0 - this.offset.relative.top - this.offset.parent.top,o.containment === "document"?this.document.width():this.window.width() - this.helperProportions.width - this.margins.left,(o.containment === "document"?this.document.width():this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];}if(!/^(document|window|parent)$/.test(o.containment)){ce = $(o.containment)[0];co = $(o.containment).offset();over = $(ce).css("overflow") !== "hidden";this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,co.left + (over?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,co.top + (over?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top];}},_convertPositionTo:function _convertPositionTo(d,pos){if(!pos){pos = this.position;}var mod=d === "absolute"?1:-1,scroll=this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,scrollIsRootNode=/(html|body)/i.test(scroll[0].tagName);return {top:pos.top +  // The absolute mouse position
this.offset.relative.top * mod +  // Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.parent.top * mod -  // The offsetParent's offset without borders (offset + border)
(this.cssPosition === "fixed"?-this.scrollParent.scrollTop():scrollIsRootNode?0:scroll.scrollTop()) * mod,left:pos.left +  // The absolute mouse position
this.offset.relative.left * mod +  // Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.parent.left * mod -  // The offsetParent's offset without borders (offset + border)
(this.cssPosition === "fixed"?-this.scrollParent.scrollLeft():scrollIsRootNode?0:scroll.scrollLeft()) * mod};},_generatePosition:function _generatePosition(event){var top,left,o=this.options,pageX=event.pageX,pageY=event.pageY,scroll=this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,scrollIsRootNode=/(html|body)/i.test(scroll[0].tagName); // This is another very weird special case that only happens for relative elements:
// 1. If the css position is relative
// 2. and the scroll parent is the document or similar to the offset parent
// we have to refresh the relative offset during the scroll so there are no jumps
if(this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])){this.offset.relative = this._getRelativeOffset();} /*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */if(this.originalPosition){ //If we are not dragging yet, we won't check for options
if(this.containment){if(event.pageX - this.offset.click.left < this.containment[0]){pageX = this.containment[0] + this.offset.click.left;}if(event.pageY - this.offset.click.top < this.containment[1]){pageY = this.containment[1] + this.offset.click.top;}if(event.pageX - this.offset.click.left > this.containment[2]){pageX = this.containment[2] + this.offset.click.left;}if(event.pageY - this.offset.click.top > this.containment[3]){pageY = this.containment[3] + this.offset.click.top;}}if(o.grid){top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];pageY = this.containment?top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]?top:top - this.offset.click.top >= this.containment[1]?top - o.grid[1]:top + o.grid[1]:top;left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];pageX = this.containment?left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]?left:left - this.offset.click.left >= this.containment[0]?left - o.grid[0]:left + o.grid[0]:left;}}return {top:pageY -  // The absolute mouse position
this.offset.click.top -  // Click offset (relative to the element)
this.offset.relative.top -  // Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.parent.top + ( // The offsetParent's offset without borders (offset + border)
this.cssPosition === "fixed"?-this.scrollParent.scrollTop():scrollIsRootNode?0:scroll.scrollTop()),left:pageX -  // The absolute mouse position
this.offset.click.left -  // Click offset (relative to the element)
this.offset.relative.left -  // Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.parent.left + ( // The offsetParent's offset without borders (offset + border)
this.cssPosition === "fixed"?-this.scrollParent.scrollLeft():scrollIsRootNode?0:scroll.scrollLeft())};},_rearrange:function _rearrange(event,i,a,hardRefresh){a?a[0].appendChild(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],this.direction === "down"?i.item[0]:i.item[0].nextSibling); //Various things done here to improve the performance:
// 1. we create a setTimeout, that calls refreshPositions
// 2. on the instance, we have a counter variable, that get's higher after every append
// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
// 4. this lets only the last addition to the timeout stack through
this.counter = this.counter?++this.counter:1;var counter=this.counter;this._delay(function(){if(counter === this.counter){this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
}});},_clear:function _clear(event,noPropagation){this.reverting = false; // We delay all events that have to be triggered to after the point where the placeholder has been removed and
// everything else normalized again
var i,delayedTriggers=[]; // We first have to update the dom position of the actual currentItem
// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
if(!this._noFinalSort && this.currentItem.parent().length){this.placeholder.before(this.currentItem);}this._noFinalSort = null;if(this.helper[0] === this.currentItem[0]){for(i in this._storedCSS) {if(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static"){this._storedCSS[i] = "";}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");}else {this.currentItem.show();}if(this.fromOutside && !noPropagation){delayedTriggers.push(function(event){this._trigger("receive",event,this._uiHash(this.fromOutside));});}if((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation){delayedTriggers.push(function(event){this._trigger("update",event,this._uiHash());}); //Trigger update callback if the DOM position has changed
} // Check if the items Container has Changed and trigger appropriate
// events.
if(this !== this.currentContainer){if(!noPropagation){delayedTriggers.push(function(event){this._trigger("remove",event,this._uiHash());});delayedTriggers.push((function(c){return function(event){c._trigger("receive",event,this._uiHash(this));};}).call(this,this.currentContainer));delayedTriggers.push((function(c){return function(event){c._trigger("update",event,this._uiHash(this));};}).call(this,this.currentContainer));}} //Post events to containers
function delayEvent(type,instance,container){return function(event){container._trigger(type,event,instance._uiHash(instance));};}for(i = this.containers.length - 1;i >= 0;i--) {if(!noPropagation){delayedTriggers.push(delayEvent("deactivate",this,this.containers[i]));}if(this.containers[i].containerCache.over){delayedTriggers.push(delayEvent("out",this,this.containers[i]));this.containers[i].containerCache.over = 0;}} //Do what was originally in plugins
if(this.storedCursor){this.document.find("body").css("cursor",this.storedCursor);this.storedStylesheet.remove();}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity);}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex === "auto"?"":this._storedZIndex);}this.dragging = false;if(!noPropagation){this._trigger("beforeStop",event,this._uiHash());} //$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(!this.cancelHelperRemoval){if(this.helper[0] !== this.currentItem[0]){this.helper.remove();}this.helper = null;}if(!noPropagation){for(i = 0;i < delayedTriggers.length;i++) {delayedTriggers[i].call(this,event);} //Trigger all delayed events
this._trigger("stop",event,this._uiHash());}this.fromOutside = false;return !this.cancelHelperRemoval;},_trigger:function _trigger(){if($.Widget.prototype._trigger.apply(this,arguments) === false){this.cancel();}},_uiHash:function _uiHash(_inst){var inst=_inst || this;return {helper:inst.helper,placeholder:inst.placeholder || $([]),position:inst.position,originalPosition:inst.originalPosition,offset:inst.positionAbs,item:inst.currentItem,sender:_inst?_inst.element:null};}}); /*!
 * jQuery UI Accordion 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/accordion/
 */var accordion=$.widget("ui.accordion",{version:"1.11.4",options:{active:0,animate:{},collapsible:false,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"}, // callbacks
activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function _create(){var options=this.options;this.prevShow = this.prevHide = $();this.element.addClass("ui-accordion ui-widget ui-helper-reset") // ARIA
.attr("role","tablist"); // don't allow collapsible: false and active: false / null
if(!options.collapsible && (options.active === false || options.active == null)){options.active = 0;}this._processPanels(); // handle negative values
if(options.active < 0){options.active += this.headers.length;}this._refresh();},_getCreateEventData:function _getCreateEventData(){return {header:this.active,panel:!this.active.length?$():this.active.next()};},_createIcons:function _createIcons(){var icons=this.options.icons;if(icons){$("<span>").addClass("ui-accordion-header-icon ui-icon " + icons.header).prependTo(this.headers);this.active.children(".ui-accordion-header-icon").removeClass(icons.header).addClass(icons.activeHeader);this.headers.addClass("ui-accordion-icons");}},_destroyIcons:function _destroyIcons(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove();},_destroy:function _destroy(){var contents; // clean up main element
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"); // clean up headers
this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default " + "ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId();this._destroyIcons(); // clean up content panels
contents = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom " + "ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId();if(this.options.heightStyle !== "content"){contents.css("height","");}},_setOption:function _setOption(key,value){if(key === "active"){ // _activate() will handle invalid values and update this.options
this._activate(value);return;}if(key === "event"){if(this.options.event){this._off(this.headers,this.options.event);}this._setupEvents(value);}this._super(key,value); // setting collapsible: false while collapsed; open first panel
if(key === "collapsible" && !value && this.options.active === false){this._activate(0);}if(key === "icons"){this._destroyIcons();if(value){this._createIcons();}} // #5332 - opacity doesn't cascade to positioned elements in IE
// so we need to add the disabled class to the headers and panels
if(key === "disabled"){this.element.toggleClass("ui-state-disabled",!!value).attr("aria-disabled",value);this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!value);}},_keydown:function _keydown(event){if(event.altKey || event.ctrlKey){return;}var keyCode=$.ui.keyCode,length=this.headers.length,currentIndex=this.headers.index(event.target),toFocus=false;switch(event.keyCode){case keyCode.RIGHT:case keyCode.DOWN:toFocus = this.headers[(currentIndex + 1) % length];break;case keyCode.LEFT:case keyCode.UP:toFocus = this.headers[(currentIndex - 1 + length) % length];break;case keyCode.SPACE:case keyCode.ENTER:this._eventHandler(event);break;case keyCode.HOME:toFocus = this.headers[0];break;case keyCode.END:toFocus = this.headers[length - 1];break;}if(toFocus){$(event.target).attr("tabIndex",-1);$(toFocus).attr("tabIndex",0);toFocus.focus();event.preventDefault();}},_panelKeyDown:function _panelKeyDown(event){if(event.keyCode === $.ui.keyCode.UP && event.ctrlKey){$(event.currentTarget).prev().focus();}},refresh:function refresh(){var options=this.options;this._processPanels(); // was collapsed or no panel
if(options.active === false && options.collapsible === true || !this.headers.length){options.active = false;this.active = $(); // active false only when collapsible is true
}else if(options.active === false){this._activate(0); // was active, but active panel is gone
}else if(this.active.length && !$.contains(this.element[0],this.active[0])){ // all remaining panel are disabled
if(this.headers.length === this.headers.find(".ui-state-disabled").length){options.active = false;this.active = $(); // activate previous panel
}else {this._activate(Math.max(0,options.active - 1));} // was active, active panel still exists
}else { // make sure active index is correct
options.active = this.headers.index(this.active);}this._destroyIcons();this._refresh();},_processPanels:function _processPanels(){var prevHeaders=this.headers,prevPanels=this.panels;this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all");this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(); // Avoid memory leaks (#10056)
if(prevPanels){this._off(prevHeaders.not(this.headers));this._off(prevPanels.not(this.panels));}},_refresh:function _refresh(){var maxHeight,options=this.options,heightStyle=options.heightStyle,parent=this.element.parent();this.active = this._findActive(options.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all");this.active.next().addClass("ui-accordion-content-active").show();this.headers.attr("role","tab").each(function(){var header=$(this),headerId=header.uniqueId().attr("id"),panel=header.next(),panelId=panel.uniqueId().attr("id");header.attr("aria-controls",panelId);panel.attr("aria-labelledby",headerId);}).next().attr("role","tabpanel");this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(); // make sure at least one header is in the tab order
if(!this.active.length){this.headers.eq(0).attr("tabIndex",0);}else {this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"});}this._createIcons();this._setupEvents(options.event);if(heightStyle === "fill"){maxHeight = parent.height();this.element.siblings(":visible").each(function(){var elem=$(this),position=elem.css("position");if(position === "absolute" || position === "fixed"){return;}maxHeight -= elem.outerHeight(true);});this.headers.each(function(){maxHeight -= $(this).outerHeight(true);});this.headers.next().each(function(){$(this).height(Math.max(0,maxHeight - $(this).innerHeight() + $(this).height()));}).css("overflow","auto");}else if(heightStyle === "auto"){maxHeight = 0;this.headers.next().each(function(){maxHeight = Math.max(maxHeight,$(this).css("height","").height());}).height(maxHeight);}},_activate:function _activate(index){var active=this._findActive(index)[0]; // trying to activate the already active panel
if(active === this.active[0]){return;} // trying to collapse, simulate a click on the currently active header
active = active || this.active[0];this._eventHandler({target:active,currentTarget:active,preventDefault:$.noop});},_findActive:function _findActive(selector){return typeof selector === "number"?this.headers.eq(selector):$();},_setupEvents:function _setupEvents(event){var events={keydown:"_keydown"};if(event){$.each(event.split(" "),function(index,eventName){events[eventName] = "_eventHandler";});}this._off(this.headers.add(this.headers.next()));this._on(this.headers,events);this._on(this.headers.next(),{keydown:"_panelKeyDown"});this._hoverable(this.headers);this._focusable(this.headers);},_eventHandler:function _eventHandler(event){var options=this.options,active=this.active,clicked=$(event.currentTarget),clickedIsActive=clicked[0] === active[0],collapsing=clickedIsActive && options.collapsible,toShow=collapsing?$():clicked.next(),toHide=active.next(),eventData={oldHeader:active,oldPanel:toHide,newHeader:collapsing?$():clicked,newPanel:toShow};event.preventDefault();if( // click on active header, but not collapsible
clickedIsActive && !options.collapsible ||  // allow canceling activation
this._trigger("beforeActivate",event,eventData) === false){return;}options.active = collapsing?false:this.headers.index(clicked); // when the call to ._toggle() comes after the class changes
// it causes a very odd bug in IE 8 (see #6720)
this.active = clickedIsActive?$():clicked;this._toggle(eventData); // switch classes
// corner classes on the previously active header stay after the animation
active.removeClass("ui-accordion-header-active ui-state-active");if(options.icons){active.children(".ui-accordion-header-icon").removeClass(options.icons.activeHeader).addClass(options.icons.header);}if(!clickedIsActive){clicked.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top");if(options.icons){clicked.children(".ui-accordion-header-icon").removeClass(options.icons.header).addClass(options.icons.activeHeader);}clicked.next().addClass("ui-accordion-content-active");}},_toggle:function _toggle(data){var toShow=data.newPanel,toHide=this.prevShow.length?this.prevShow:data.oldPanel; // handle activating a panel during the animation for another activation
this.prevShow.add(this.prevHide).stop(true,true);this.prevShow = toShow;this.prevHide = toHide;if(this.options.animate){this._animate(toShow,toHide,data);}else {toHide.hide();toShow.show();this._toggleComplete(data);}toHide.attr({"aria-hidden":"true"});toHide.prev().attr({"aria-selected":"false","aria-expanded":"false"}); // if we're switching panels, remove the old header from the tab order
// if we're opening from collapsed state, remove the previous header from the tab order
// if we're collapsing, then keep the collapsing header in the tab order
if(toShow.length && toHide.length){toHide.prev().attr({"tabIndex":-1,"aria-expanded":"false"});}else if(toShow.length){this.headers.filter(function(){return parseInt($(this).attr("tabIndex"),10) === 0;}).attr("tabIndex",-1);}toShow.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0});},_animate:function _animate(toShow,toHide,data){var total,easing,duration,that=this,adjust=0,boxSizing=toShow.css("box-sizing"),down=toShow.length && (!toHide.length || toShow.index() < toHide.index()),animate=this.options.animate || {},options=down && animate.down || animate,complete=function complete(){that._toggleComplete(data);};if(typeof options === "number"){duration = options;}if(typeof options === "string"){easing = options;} // fall back from options to animation in case of partial down settings
easing = easing || options.easing || animate.easing;duration = duration || options.duration || animate.duration;if(!toHide.length){return toShow.animate(this.showProps,duration,easing,complete);}if(!toShow.length){return toHide.animate(this.hideProps,duration,easing,complete);}total = toShow.show().outerHeight();toHide.animate(this.hideProps,{duration:duration,easing:easing,step:function step(now,fx){fx.now = Math.round(now);}});toShow.hide().animate(this.showProps,{duration:duration,easing:easing,complete:complete,step:function step(now,fx){fx.now = Math.round(now);if(fx.prop !== "height"){if(boxSizing === "content-box"){adjust += fx.now;}}else if(that.options.heightStyle !== "content"){fx.now = Math.round(total - toHide.outerHeight() - adjust);adjust = 0;}}});},_toggleComplete:function _toggleComplete(data){var toHide=data.oldPanel;toHide.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"); // Work around for rendering bug in IE (#5421)
if(toHide.length){toHide.parent()[0].className = toHide.parent()[0].className;}this._trigger("activate",null,data);}}); /*!
 * jQuery UI Menu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 */var menu=$.widget("ui.menu",{version:"1.11.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu", // callbacks
blur:null,focus:null,select:null},_create:function _create(){this.activeMenu = this.element; // Flag used to prevent firing of the click handler
// as the event bubbles up through nested menus
this.mouseHandled = false;this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0});if(this.options.disabled){this.element.addClass("ui-state-disabled").attr("aria-disabled","true");}this._on({ // Prevent focus from sticking to links inside menu after clicking
// them (focus should always stay on UL during navigation).
"mousedown .ui-menu-item":function mousedownUiMenuItem(event){event.preventDefault();},"click .ui-menu-item":function clickUiMenuItem(event){var target=$(event.target);if(!this.mouseHandled && target.not(".ui-state-disabled").length){this.select(event); // Only set the mouseHandled flag if the event will bubble, see #9469.
if(!event.isPropagationStopped()){this.mouseHandled = true;} // Open submenu on click
if(target.has(".ui-menu").length){this.expand(event);}else if(!this.element.is(":focus") && $(this.document[0].activeElement).closest(".ui-menu").length){ // Redirect focus to the menu
this.element.trigger("focus",[true]); // If the active item is on the top level, let it stay active.
// Otherwise, blur the active item since it is no longer visible.
if(this.active && this.active.parents(".ui-menu").length === 1){clearTimeout(this.timer);}}}},"mouseenter .ui-menu-item":function mouseenterUiMenuItem(event){ // Ignore mouse events while typeahead is active, see #10458.
// Prevents focusing the wrong item when typeahead causes a scroll while the mouse
// is over an item in the menu
if(this.previousFilter){return;}var target=$(event.currentTarget); // Remove ui-state-active class from siblings of the newly focused menu item
// to avoid a jump caused by adjacent elements both having a class with a border
target.siblings(".ui-state-active").removeClass("ui-state-active");this.focus(event,target);},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function focus(event,keepActiveItem){ // If there's already an active item, keep it active
// If not, activate the first item
var item=this.active || this.element.find(this.options.items).eq(0);if(!keepActiveItem){this.focus(event,item);}},blur:function blur(event){this._delay(function(){if(!$.contains(this.element[0],this.document[0].activeElement)){this.collapseAll(event);}});},keydown:"_keydown"});this.refresh(); // Clicks outside of a menu collapse any open menus
this._on(this.document,{click:function click(event){if(this._closeOnDocumentClick(event)){this.collapseAll(event);} // Reset the mouseHandled flag
this.mouseHandled = false;}});},_destroy:function _destroy(){ // Destroy (sub)menus
this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(); // Destroy menu items
this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var elem=$(this);if(elem.data("ui-menu-submenu-carat")){elem.remove();}}); // Destroy menu dividers
this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");},_keydown:function _keydown(event){var match,prev,character,skip,preventDefault=true;switch(event.keyCode){case $.ui.keyCode.PAGE_UP:this.previousPage(event);break;case $.ui.keyCode.PAGE_DOWN:this.nextPage(event);break;case $.ui.keyCode.HOME:this._move("first","first",event);break;case $.ui.keyCode.END:this._move("last","last",event);break;case $.ui.keyCode.UP:this.previous(event);break;case $.ui.keyCode.DOWN:this.next(event);break;case $.ui.keyCode.LEFT:this.collapse(event);break;case $.ui.keyCode.RIGHT:if(this.active && !this.active.is(".ui-state-disabled")){this.expand(event);}break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:this._activate(event);break;case $.ui.keyCode.ESCAPE:this.collapse(event);break;default:preventDefault = false;prev = this.previousFilter || "";character = String.fromCharCode(event.keyCode);skip = false;clearTimeout(this.filterTimer);if(character === prev){skip = true;}else {character = prev + character;}match = this._filterMenuItems(character);match = skip && match.index(this.active.next()) !== -1?this.active.nextAll(".ui-menu-item"):match; // If no matches on the current filter, reset to the last character pressed
// to move down the menu to the first item that starts with that character
if(!match.length){character = String.fromCharCode(event.keyCode);match = this._filterMenuItems(character);}if(match.length){this.focus(event,match);this.previousFilter = character;this.filterTimer = this._delay(function(){delete this.previousFilter;},1000);}else {delete this.previousFilter;}}if(preventDefault){event.preventDefault();}},_activate:function _activate(event){if(!this.active.is(".ui-state-disabled")){if(this.active.is("[aria-haspopup='true']")){this.expand(event);}else {this.select(event);}}},refresh:function refresh(){var menus,items,that=this,icon=this.options.icons.submenu,submenus=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length); // Initialize nested menus
submenus.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var menu=$(this),item=menu.parent(),submenuCarat=$("<span>").addClass("ui-menu-icon ui-icon " + icon).data("ui-menu-submenu-carat",true);item.attr("aria-haspopup","true").prepend(submenuCarat);menu.attr("aria-labelledby",item.attr("id"));});menus = submenus.add(this.element);items = menus.find(this.options.items); // Initialize menu-items containing spaces and/or dashes only as dividers
items.not(".ui-menu-item").each(function(){var item=$(this);if(that._isDivider(item)){item.addClass("ui-widget-content ui-menu-divider");}}); // Don't refresh list items that are already adapted
items.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}); // Add aria-disabled attribute to any disabled menu item
items.filter(".ui-state-disabled").attr("aria-disabled","true"); // If the active item has been removed, blur the menu
if(this.active && !$.contains(this.element[0],this.active[0])){this.blur();}},_itemRole:function _itemRole(){return ({menu:"menuitem",listbox:"option"})[this.options.role];},_setOption:function _setOption(key,value){if(key === "icons"){this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(value.submenu);}if(key === "disabled"){this.element.toggleClass("ui-state-disabled",!!value).attr("aria-disabled",value);}this._super(key,value);},focus:function focus(event,item){var nested,focused;this.blur(event,event && event.type === "focus");this._scrollIntoView(item);this.active = item.first();focused = this.active.addClass("ui-state-focus").removeClass("ui-state-active"); // Only update aria-activedescendant if there's a role
// otherwise we assume focus is managed elsewhere
if(this.options.role){this.element.attr("aria-activedescendant",focused.attr("id"));} // Highlight active parent menu item, if any
this.active.parent().closest(".ui-menu-item").addClass("ui-state-active");if(event && event.type === "keydown"){this._close();}else {this.timer = this._delay(function(){this._close();},this.delay);}nested = item.children(".ui-menu");if(nested.length && event && /^mouse/.test(event.type)){this._startOpening(nested);}this.activeMenu = item.parent();this._trigger("focus",event,{item:item});},_scrollIntoView:function _scrollIntoView(item){var borderTop,paddingTop,offset,scroll,elementHeight,itemHeight;if(this._hasScroll()){borderTop = parseFloat($.css(this.activeMenu[0],"borderTopWidth")) || 0;paddingTop = parseFloat($.css(this.activeMenu[0],"paddingTop")) || 0;offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;scroll = this.activeMenu.scrollTop();elementHeight = this.activeMenu.height();itemHeight = item.outerHeight();if(offset < 0){this.activeMenu.scrollTop(scroll + offset);}else if(offset + itemHeight > elementHeight){this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight);}}},blur:function blur(event,fromFocus){if(!fromFocus){clearTimeout(this.timer);}if(!this.active){return;}this.active.removeClass("ui-state-focus");this.active = null;this._trigger("blur",event,{item:this.active});},_startOpening:function _startOpening(submenu){clearTimeout(this.timer); // Don't open if already open fixes a Firefox bug that caused a .5 pixel
// shift in the submenu position when mousing over the carat icon
if(submenu.attr("aria-hidden") !== "true"){return;}this.timer = this._delay(function(){this._close();this._open(submenu);},this.delay);},_open:function _open(submenu){var position=$.extend({of:this.active},this.options.position);clearTimeout(this.timer);this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden","true");submenu.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(position);},collapseAll:function collapseAll(event,all){clearTimeout(this.timer);this.timer = this._delay(function(){ // If we were passed an event, look for the submenu that contains the event
var currentMenu=all?this.element:$(event && event.target).closest(this.element.find(".ui-menu")); // If we found no valid submenu ancestor, use the main menu to close all sub menus anyway
if(!currentMenu.length){currentMenu = this.element;}this._close(currentMenu);this.blur(event);this.activeMenu = currentMenu;},this.delay);}, // With no arguments, closes the currently active menu - if nothing is active
// it closes all menus.  If passed an argument, it will search for menus BELOW
_close:function _close(startMenu){if(!startMenu){startMenu = this.active?this.active.parent():this.element;}startMenu.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active");},_closeOnDocumentClick:function _closeOnDocumentClick(event){return !$(event.target).closest(".ui-menu").length;},_isDivider:function _isDivider(item){ // Match hyphen, em dash, en dash
return !/[^\-\u2014\u2013\s]/.test(item.text());},collapse:function collapse(event){var newItem=this.active && this.active.parent().closest(".ui-menu-item",this.element);if(newItem && newItem.length){this._close();this.focus(event,newItem);}},expand:function expand(event){var newItem=this.active && this.active.children(".ui-menu ").find(this.options.items).first();if(newItem && newItem.length){this._open(newItem.parent()); // Delay so Firefox will not hide activedescendant change in expanding submenu from AT
this._delay(function(){this.focus(event,newItem);});}},next:function next(event){this._move("next","first",event);},previous:function previous(event){this._move("prev","last",event);},isFirstItem:function isFirstItem(){return this.active && !this.active.prevAll(".ui-menu-item").length;},isLastItem:function isLastItem(){return this.active && !this.active.nextAll(".ui-menu-item").length;},_move:function _move(direction,filter,event){var next;if(this.active){if(direction === "first" || direction === "last"){next = this.active[direction === "first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1);}else {next = this.active[direction + "All"](".ui-menu-item").eq(0);}}if(!next || !next.length || !this.active){next = this.activeMenu.find(this.options.items)[filter]();}this.focus(event,next);},nextPage:function nextPage(event){var item,base,height;if(!this.active){this.next(event);return;}if(this.isLastItem()){return;}if(this._hasScroll()){base = this.active.offset().top;height = this.element.height();this.active.nextAll(".ui-menu-item").each(function(){item = $(this);return item.offset().top - base - height < 0;});this.focus(event,item);}else {this.focus(event,this.activeMenu.find(this.options.items)[!this.active?"first":"last"]());}},previousPage:function previousPage(event){var item,base,height;if(!this.active){this.next(event);return;}if(this.isFirstItem()){return;}if(this._hasScroll()){base = this.active.offset().top;height = this.element.height();this.active.prevAll(".ui-menu-item").each(function(){item = $(this);return item.offset().top - base + height > 0;});this.focus(event,item);}else {this.focus(event,this.activeMenu.find(this.options.items).first());}},_hasScroll:function _hasScroll(){return this.element.outerHeight() < this.element.prop("scrollHeight");},select:function select(event){ // TODO: It should never be possible to not have an active item at this
// point, but the tests don't trigger mouseenter before click.
this.active = this.active || $(event.target).closest(".ui-menu-item");var ui={item:this.active};if(!this.active.has(".ui-menu").length){this.collapseAll(event,true);}this._trigger("select",event,ui);},_filterMenuItems:function _filterMenuItems(character){var escapedCharacter=character.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),regex=new RegExp("^" + escapedCharacter,"i");return this.activeMenu.find(this.options.items) // Only match on items, not dividers or other content (#10571)
.filter(".ui-menu-item").filter(function(){return regex.test($.trim($(this).text()));});}}); /*!
 * jQuery UI Autocomplete 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 */$.widget("ui.autocomplete",{version:"1.11.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null, // callbacks
change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function _create(){ // Some browsers only repeat keydown events, not keypress events,
// so we use the suppressKeyPress flag to determine if we've already
// handled the keydown event. #7269
// Unfortunately the code for & in keypress is the same as the up arrow,
// so we use the suppressKeyPressRepeat flag to avoid handling keypress
// events when we know the keydown event was used to modify the
// search term. #7799
var suppressKeyPress,suppressKeyPressRepeat,suppressInput,nodeName=this.element[0].nodeName.toLowerCase(),isTextarea=nodeName === "textarea",isInput=nodeName === "input";this.isMultiLine =  // Textareas are always multi-line
isTextarea?true: // Inputs are always single-line, even if inside a contentEditable element
// IE also treats inputs as contentEditable
isInput?false: // All other element types are determined by whether or not they're contentEditable
this.element.prop("isContentEditable");this.valueMethod = this.element[isTextarea || isInput?"val":"text"];this.isNewMenu = true;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off");this._on(this.element,{keydown:function keydown(event){if(this.element.prop("readOnly")){suppressKeyPress = true;suppressInput = true;suppressKeyPressRepeat = true;return;}suppressKeyPress = false;suppressInput = false;suppressKeyPressRepeat = false;var keyCode=$.ui.keyCode;switch(event.keyCode){case keyCode.PAGE_UP:suppressKeyPress = true;this._move("previousPage",event);break;case keyCode.PAGE_DOWN:suppressKeyPress = true;this._move("nextPage",event);break;case keyCode.UP:suppressKeyPress = true;this._keyEvent("previous",event);break;case keyCode.DOWN:suppressKeyPress = true;this._keyEvent("next",event);break;case keyCode.ENTER: // when menu is open and has focus
if(this.menu.active){ // #6055 - Opera still allows the keypress to occur
// which causes forms to submit
suppressKeyPress = true;event.preventDefault();this.menu.select(event);}break;case keyCode.TAB:if(this.menu.active){this.menu.select(event);}break;case keyCode.ESCAPE:if(this.menu.element.is(":visible")){if(!this.isMultiLine){this._value(this.term);}this.close(event); // Different browsers have different default behavior for escape
// Single press can mean undo or clear
// Double press in IE means clear the whole form
event.preventDefault();}break;default:suppressKeyPressRepeat = true; // search timeout should be triggered before the input value is changed
this._searchTimeout(event);break;}},keypress:function keypress(event){if(suppressKeyPress){suppressKeyPress = false;if(!this.isMultiLine || this.menu.element.is(":visible")){event.preventDefault();}return;}if(suppressKeyPressRepeat){return;} // replicate some key handlers to allow them to repeat in Firefox and Opera
var keyCode=$.ui.keyCode;switch(event.keyCode){case keyCode.PAGE_UP:this._move("previousPage",event);break;case keyCode.PAGE_DOWN:this._move("nextPage",event);break;case keyCode.UP:this._keyEvent("previous",event);break;case keyCode.DOWN:this._keyEvent("next",event);break;}},input:function input(event){if(suppressInput){suppressInput = false;event.preventDefault();return;}this._searchTimeout(event);},focus:function focus(){this.selectedItem = null;this.previous = this._value();},blur:function blur(event){if(this.cancelBlur){delete this.cancelBlur;return;}clearTimeout(this.searching);this.close(event);this._change(event);}});this._initSource();this.menu = $("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({ // disable ARIA support, the live region takes care of that
role:null}).hide().menu("instance");this._on(this.menu.element,{mousedown:function mousedown(event){ // prevent moving focus out of the text field
event.preventDefault(); // IE doesn't prevent moving focus even with event.preventDefault()
// so we set a flag to know when we should ignore the blur event
this.cancelBlur = true;this._delay(function(){delete this.cancelBlur;}); // clicking on the scrollbar causes focus to shift to the body
// but we can't detect a mouseup or a click immediately afterward
// so we have to track the next mousedown and close the menu if
// the user clicks somewhere outside of the autocomplete
var menuElement=this.menu.element[0];if(!$(event.target).closest(".ui-menu-item").length){this._delay(function(){var that=this;this.document.one("mousedown",function(event){if(event.target !== that.element[0] && event.target !== menuElement && !$.contains(menuElement,event.target)){that.close();}});});}},menufocus:function menufocus(event,ui){var label,item; // support: Firefox
// Prevent accidental activation of menu items in Firefox (#7024 #9118)
if(this.isNewMenu){this.isNewMenu = false;if(event.originalEvent && /^mouse/.test(event.originalEvent.type)){this.menu.blur();this.document.one("mousemove",function(){$(event.target).trigger(event.originalEvent);});return;}}item = ui.item.data("ui-autocomplete-item");if(false !== this._trigger("focus",event,{item:item})){ // use value to match what will end up in the input, if it was a key event
if(event.originalEvent && /^key/.test(event.originalEvent.type)){this._value(item.value);}} // Announce the value in the liveRegion
label = ui.item.attr("aria-label") || item.value;if(label && $.trim(label).length){this.liveRegion.children().hide();$("<div>").text(label).appendTo(this.liveRegion);}},menuselect:function menuselect(event,ui){var item=ui.item.data("ui-autocomplete-item"),previous=this.previous; // only trigger when focus was lost (click on menu)
if(this.element[0] !== this.document[0].activeElement){this.element.focus();this.previous = previous; // #6109 - IE triggers two focus events and the second
// is asynchronous, so we need to reset the previous
// term synchronously and asynchronously :-(
this._delay(function(){this.previous = previous;this.selectedItem = item;});}if(false !== this._trigger("select",event,{item:item})){this._value(item.value);} // reset the term after the select event
// this allows custom select handling to work properly
this.term = this._value();this.close(event);this.selectedItem = item;}});this.liveRegion = $("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body); // turning off autocomplete prevents the browser from remembering the
// value when navigating through history, so we re-enable autocomplete
// if the page is unloaded before the widget is destroyed. #7790
this._on(this.window,{beforeunload:function beforeunload(){this.element.removeAttr("autocomplete");}});},_destroy:function _destroy(){clearTimeout(this.searching);this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");this.menu.element.remove();this.liveRegion.remove();},_setOption:function _setOption(key,value){this._super(key,value);if(key === "source"){this._initSource();}if(key === "appendTo"){this.menu.element.appendTo(this._appendTo());}if(key === "disabled" && value && this.xhr){this.xhr.abort();}},_appendTo:function _appendTo(){var element=this.options.appendTo;if(element){element = element.jquery || element.nodeType?$(element):this.document.find(element).eq(0);}if(!element || !element[0]){element = this.element.closest(".ui-front");}if(!element.length){element = this.document[0].body;}return element;},_initSource:function _initSource(){var array,url,that=this;if($.isArray(this.options.source)){array = this.options.source;this.source = function(request,response){response($.ui.autocomplete.filter(array,request.term));};}else if(typeof this.options.source === "string"){url = this.options.source;this.source = function(request,response){if(that.xhr){that.xhr.abort();}that.xhr = $.ajax({url:url,data:request,dataType:"json",success:function success(data){response(data);},error:function error(){response([]);}});};}else {this.source = this.options.source;}},_searchTimeout:function _searchTimeout(event){clearTimeout(this.searching);this.searching = this._delay(function(){ // Search if the value has changed, or if the user retypes the same value (see #7434)
var equalValues=this.term === this._value(),menuVisible=this.menu.element.is(":visible"),modifierKey=event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;if(!equalValues || equalValues && !menuVisible && !modifierKey){this.selectedItem = null;this.search(null,event);}},this.options.delay);},search:function search(value,event){value = value != null?value:this._value(); // always save the actual value, not the one passed as an argument
this.term = this._value();if(value.length < this.options.minLength){return this.close(event);}if(this._trigger("search",event) === false){return;}return this._search(value);},_search:function _search(value){this.pending++;this.element.addClass("ui-autocomplete-loading");this.cancelSearch = false;this.source({term:value},this._response());},_response:function _response(){var index=++this.requestIndex;return $.proxy(function(content){if(index === this.requestIndex){this.__response(content);}this.pending--;if(!this.pending){this.element.removeClass("ui-autocomplete-loading");}},this);},__response:function __response(content){if(content){content = this._normalize(content);}this._trigger("response",null,{content:content});if(!this.options.disabled && content && content.length && !this.cancelSearch){this._suggest(content);this._trigger("open");}else { // use ._close() instead of .close() so we don't cancel future searches
this._close();}},close:function close(event){this.cancelSearch = true;this._close(event);},_close:function _close(event){if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.blur();this.isNewMenu = true;this._trigger("close",event);}},_change:function _change(event){if(this.previous !== this._value()){this._trigger("change",event,{item:this.selectedItem});}},_normalize:function _normalize(items){ // assume all items have the right format when the first item is complete
if(items.length && items[0].label && items[0].value){return items;}return $.map(items,function(item){if(typeof item === "string"){return {label:item,value:item};}return $.extend({},item,{label:item.label || item.value,value:item.value || item.label});});},_suggest:function _suggest(items){var ul=this.menu.element.empty();this._renderMenu(ul,items);this.isNewMenu = true;this.menu.refresh(); // size and position menu
ul.show();this._resizeMenu();ul.position($.extend({of:this.element},this.options.position));if(this.options.autoFocus){this.menu.next();}},_resizeMenu:function _resizeMenu(){var ul=this.menu.element;ul.outerWidth(Math.max( // Firefox wraps long text (possibly a rounding bug)
// so we add 1px to avoid the wrapping (#7513)
ul.width("").outerWidth() + 1,this.element.outerWidth()));},_renderMenu:function _renderMenu(ul,items){var that=this;$.each(items,function(index,item){that._renderItemData(ul,item);});},_renderItemData:function _renderItemData(ul,item){return this._renderItem(ul,item).data("ui-autocomplete-item",item);},_renderItem:function _renderItem(ul,item){return $("<li>").text(item.label).appendTo(ul);},_move:function _move(direction,event){if(!this.menu.element.is(":visible")){this.search(null,event);return;}if(this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction)){if(!this.isMultiLine){this._value(this.term);}this.menu.blur();return;}this.menu[direction](event);},widget:function widget(){return this.menu.element;},_value:function _value(){return this.valueMethod.apply(this.element,arguments);},_keyEvent:function _keyEvent(keyEvent,event){if(!this.isMultiLine || this.menu.element.is(":visible")){this._move(keyEvent,event); // prevents moving cursor to beginning/end of the text field in some browsers
event.preventDefault();}}});$.extend($.ui.autocomplete,{escapeRegex:function escapeRegex(value){return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");},filter:function filter(array,term){var matcher=new RegExp($.ui.autocomplete.escapeRegex(term),"i");return $.grep(array,function(value){return matcher.test(value.label || value.value || value);});}}); // live region extension, adding a `messages` option
// NOTE: This is an experimental API. We are still investigating
// a full solution for string manipulation and internationalization.
$.widget("ui.autocomplete",$.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function results(amount){return amount + (amount > 1?" results are":" result is") + " available, use up and down arrow keys to navigate.";}}},__response:function __response(content){var message;this._superApply(arguments);if(this.options.disabled || this.cancelSearch){return;}if(content && content.length){message = this.options.messages.results(content.length);}else {message = this.options.messages.noResults;}this.liveRegion.children().hide();$("<div>").text(message).appendTo(this.liveRegion);}});var autocomplete=$.ui.autocomplete; /*!
 * jQuery UI Button 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/button/
 */var lastActive,baseClasses="ui-button ui-widget ui-state-default ui-corner-all",typeClasses="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",formResetHandler=function formResetHandler(){var form=$(this);setTimeout(function(){form.find(":ui-button").button("refresh");},1);},radioGroup=function radioGroup(radio){var name=radio.name,form=radio.form,radios=$([]);if(name){name = name.replace(/'/g,"\\'");if(form){radios = $(form).find("[name='" + name + "'][type=radio]");}else {radios = $("[name='" + name + "'][type=radio]",radio.ownerDocument).filter(function(){return !this.form;});}}return radios;};$.widget("ui.button",{version:"1.11.4",defaultElement:"<button>",options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function _create(){this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace,formResetHandler);if(typeof this.options.disabled !== "boolean"){this.options.disabled = !!this.element.prop("disabled");}else {this.element.prop("disabled",this.options.disabled);}this._determineButtonType();this.hasTitle = !!this.buttonElement.attr("title");var that=this,options=this.options,toggleButton=this.type === "checkbox" || this.type === "radio",activeClass=!toggleButton?"ui-state-active":"";if(options.label === null){options.label = this.type === "input"?this.buttonElement.val():this.buttonElement.html();}this._hoverable(this.buttonElement);this.buttonElement.addClass(baseClasses).attr("role","button").bind("mouseenter" + this.eventNamespace,function(){if(options.disabled){return;}if(this === lastActive){$(this).addClass("ui-state-active");}}).bind("mouseleave" + this.eventNamespace,function(){if(options.disabled){return;}$(this).removeClass(activeClass);}).bind("click" + this.eventNamespace,function(event){if(options.disabled){event.preventDefault();event.stopImmediatePropagation();}}); // Can't use _focusable() because the element that receives focus
// and the element that gets the ui-state-focus class are different
this._on({focus:function focus(){this.buttonElement.addClass("ui-state-focus");},blur:function blur(){this.buttonElement.removeClass("ui-state-focus");}});if(toggleButton){this.element.bind("change" + this.eventNamespace,function(){that.refresh();});}if(this.type === "checkbox"){this.buttonElement.bind("click" + this.eventNamespace,function(){if(options.disabled){return false;}});}else if(this.type === "radio"){this.buttonElement.bind("click" + this.eventNamespace,function(){if(options.disabled){return false;}$(this).addClass("ui-state-active");that.buttonElement.attr("aria-pressed","true");var radio=that.element[0];radioGroup(radio).not(radio).map(function(){return $(this).button("widget")[0];}).removeClass("ui-state-active").attr("aria-pressed","false");});}else {this.buttonElement.bind("mousedown" + this.eventNamespace,function(){if(options.disabled){return false;}$(this).addClass("ui-state-active");lastActive = this;that.document.one("mouseup",function(){lastActive = null;});}).bind("mouseup" + this.eventNamespace,function(){if(options.disabled){return false;}$(this).removeClass("ui-state-active");}).bind("keydown" + this.eventNamespace,function(event){if(options.disabled){return false;}if(event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER){$(this).addClass("ui-state-active");}}) // see #8559, we bind to blur here in case the button element loses
// focus between keydown and keyup, it would be left in an "active" state
.bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace,function(){$(this).removeClass("ui-state-active");});if(this.buttonElement.is("a")){this.buttonElement.keyup(function(event){if(event.keyCode === $.ui.keyCode.SPACE){ // TODO pass through original event correctly (just as 2nd argument doesn't work)
$(this).click();}});}}this._setOption("disabled",options.disabled);this._resetButton();},_determineButtonType:function _determineButtonType(){var ancestor,labelSelector,checked;if(this.element.is("[type=checkbox]")){this.type = "checkbox";}else if(this.element.is("[type=radio]")){this.type = "radio";}else if(this.element.is("input")){this.type = "input";}else {this.type = "button";}if(this.type === "checkbox" || this.type === "radio"){ // we don't search against the document in case the element
// is disconnected from the DOM
ancestor = this.element.parents().last();labelSelector = "label[for='" + this.element.attr("id") + "']";this.buttonElement = ancestor.find(labelSelector);if(!this.buttonElement.length){ancestor = ancestor.length?ancestor.siblings():this.element.siblings();this.buttonElement = ancestor.filter(labelSelector);if(!this.buttonElement.length){this.buttonElement = ancestor.find(labelSelector);}}this.element.addClass("ui-helper-hidden-accessible");checked = this.element.is(":checked");if(checked){this.buttonElement.addClass("ui-state-active");}this.buttonElement.prop("aria-pressed",checked);}else {this.buttonElement = this.element;}},widget:function widget(){return this.buttonElement;},_destroy:function _destroy(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass(baseClasses + " ui-state-active " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());if(!this.hasTitle){this.buttonElement.removeAttr("title");}},_setOption:function _setOption(key,value){this._super(key,value);if(key === "disabled"){this.widget().toggleClass("ui-state-disabled",!!value);this.element.prop("disabled",!!value);if(value){if(this.type === "checkbox" || this.type === "radio"){this.buttonElement.removeClass("ui-state-focus");}else {this.buttonElement.removeClass("ui-state-focus ui-state-active");}}return;}this._resetButton();},refresh:function refresh(){ //See #8237 & #8828
var isDisabled=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");if(isDisabled !== this.options.disabled){this._setOption("disabled",isDisabled);}if(this.type === "radio"){radioGroup(this.element[0]).each(function(){if($(this).is(":checked")){$(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true");}else {$(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false");}});}else if(this.type === "checkbox"){if(this.element.is(":checked")){this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true");}else {this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false");}}},_resetButton:function _resetButton(){if(this.type === "input"){if(this.options.label){this.element.val(this.options.label);}return;}var buttonElement=this.buttonElement.removeClass(typeClasses),buttonText=$("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(),icons=this.options.icons,multipleIcons=icons.primary && icons.secondary,buttonClasses=[];if(icons.primary || icons.secondary){if(this.options.text){buttonClasses.push("ui-button-text-icon" + (multipleIcons?"s":icons.primary?"-primary":"-secondary"));}if(icons.primary){buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>");}if(icons.secondary){buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>");}if(!this.options.text){buttonClasses.push(multipleIcons?"ui-button-icons-only":"ui-button-icon-only");if(!this.hasTitle){buttonElement.attr("title",$.trim(buttonText));}}}else {buttonClasses.push("ui-button-text-only");}buttonElement.addClass(buttonClasses.join(" "));}});$.widget("ui.buttonset",{version:"1.11.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function _create(){this.element.addClass("ui-buttonset");},_init:function _init(){this.refresh();},_setOption:function _setOption(key,value){if(key === "disabled"){this.buttons.button("option",key,value);}this._super(key,value);},refresh:function refresh(){var rtl=this.element.css("direction") === "rtl",allButtons=this.element.find(this.options.items),existingButtons=allButtons.filter(":ui-button"); // Initialize new buttons
allButtons.not(":ui-button").button(); // Refresh existing buttons
existingButtons.button("refresh");this.buttons = allButtons.map(function(){return $(this).button("widget")[0];}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(rtl?"ui-corner-left":"ui-corner-right").end().end();},_destroy:function _destroy(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return $(this).button("widget")[0];}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");}});var button=$.ui.button; /*!
 * jQuery UI Datepicker 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */$.extend($.ui,{datepicker:{version:"1.11.4"}});var datepicker_instActive;function datepicker_getZindex(elem){var position,value;while(elem.length && elem[0] !== document) { // Ignore z-index if position is set to a value where z-index is ignored by the browser
// This makes behavior of this function consistent across browsers
// WebKit always returns auto if the element is positioned
position = elem.css("position");if(position === "absolute" || position === "relative" || position === "fixed"){ // IE returns 0 when zIndex is not specified
// other browsers return a string
// we ignore the case of nested elements with an explicit value of 0
// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
value = parseInt(elem.css("zIndex"),10);if(!isNaN(value) && value !== 0){return value;}}elem = elem.parent();}return 0;} /* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */function Datepicker(){this._curInst = null; // The current instance in use
this._keyEvent = false; // If the last event was a key event
this._disabledInputs = []; // List of date picker inputs that have been disabled
this._datepickerShowing = false; // True if the popup picker is showing , false if not
this._inDialog = false; // True if showing within a "dialog", false if not
this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
this._appendClass = "ui-datepicker-append"; // The name of the append marker class
this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
this.regional = []; // Available regional settings, indexed by language code
this.regional[""] = { // Default regional settings
closeText:"Done", // Display text for close link
prevText:"Prev", // Display text for previous month link
nextText:"Next", // Display text for next month link
currentText:"Today", // Display text for current month link
monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"], // Names of months for drop-down and formatting
monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], // For formatting
dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], // For formatting
dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], // For formatting
dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
weekHeader:"Wk", // Column header for week of the year
dateFormat:"mm/dd/yy", // See format options on parseDate
firstDay:0, // The first day of the week, Sun = 0, Mon = 1, ...
isRTL:false, // True if right-to-left language, false if left-to-right
showMonthAfterYear:false, // True if the year select precedes month, false for month then year
yearSuffix:"" // Additional text to append to the year in the month headers
};this._defaults = { // Global defaults for all the date picker instances
showOn:"focus", // "focus" for popup on focus,
// "button" for trigger button, or "both" for either
showAnim:"fadeIn", // Name of jQuery animation for popup
showOptions:{}, // Options for enhanced animations
defaultDate:null, // Used when field is blank: actual date,
// +/-number for offset from today, null for today
appendText:"", // Display text following the input box, e.g. showing the format
buttonText:"...", // Text for trigger button
buttonImage:"", // URL for trigger button image
buttonImageOnly:false, // True if the image appears alone, false if it appears on a button
hideIfNoPrevNext:false, // True to hide next/previous month links
// if not applicable, false to just disable them
navigationAsDateFormat:false, // True if date formatting applied to prev/today/next links
gotoCurrent:false, // True if today link goes back to current selection instead
changeMonth:false, // True if month can be selected directly, false if only prev/next
changeYear:false, // True if year can be selected directly, false if only prev/next
yearRange:"c-10:c+10", // Range of years to display in drop-down,
// either relative to today's year (-nn:+nn), relative to currently displayed year
// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
showOtherMonths:false, // True to show dates in other months, false to leave blank
selectOtherMonths:false, // True to allow selection of dates in other months, false for unselectable
showWeek:false, // True to show week of the year, false to not show it
calculateWeek:this.iso8601Week, // How to calculate the week of the year,
// takes a Date and returns the number of the week for it
shortYearCutoff:"+10", // Short year values < this are in the current century,
// > this are in the previous century,
// string value starting with "+" for current year + value
minDate:null, // The earliest selectable date, or null for no limit
maxDate:null, // The latest selectable date, or null for no limit
duration:"fast", // Duration of display/closure
beforeShowDay:null, // Function that takes a date and returns an array with
// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
// [2] = cell title (optional), e.g. $.datepicker.noWeekends
beforeShow:null, // Function that takes an input field and
// returns a set of custom settings for the date picker
onSelect:null, // Define a callback function when a date is selected
onChangeMonthYear:null, // Define a callback function when the month or year is changed
onClose:null, // Define a callback function when the datepicker is closed
numberOfMonths:1, // Number of months to show at a time
showCurrentAtPos:0, // The position in multipe months at which to show the current month (starting at 0)
stepMonths:1, // Number of months to step back/forward
stepBigMonths:12, // Number of months to step back/forward for the big links
altField:"", // Selector for an alternate field to store selected dates into
altFormat:"", // The date format to use for the alternate field
constrainInput:true, // The input is constrained by the current date format
showButtonPanel:false, // True to show button panel, false to not show it
autoSize:false, // True to size the input for the date format, false to leave as is
disabled:false // The initial disabled state
};$.extend(this._defaults,this.regional[""]);this.regional.en = $.extend(true,{},this.regional[""]);this.regional["en-US"] = $.extend(true,{},this.regional.en);this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));}$.extend(Datepicker.prototype,{ /* Class name added to elements to indicate already configured with a date picker. */markerClassName:"hasDatepicker", //Keep track of the maximum number of rows displayed (see #7043)
maxRows:4, // TODO rename to "widget" when switching to widget factory
_widgetDatepicker:function _widgetDatepicker(){return this.dpDiv;}, /* Override the default settings for all instances of the date picker.
	 * @param  settings  object - the new settings to use as defaults (anonymous object)
	 * @return the manager object
	 */setDefaults:function setDefaults(settings){datepicker_extendRemove(this._defaults,settings || {});return this;}, /* Attach the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
	 */_attachDatepicker:function _attachDatepicker(target,settings){var nodeName,inline,inst;nodeName = target.nodeName.toLowerCase();inline = nodeName === "div" || nodeName === "span";if(!target.id){this.uuid += 1;target.id = "dp" + this.uuid;}inst = this._newInst($(target),inline);inst.settings = $.extend({},settings || {});if(nodeName === "input"){this._connectDatepicker(target,inst);}else if(inline){this._inlineDatepicker(target,inst);}}, /* Create a new instance object. */_newInst:function _newInst(target,inline){var id=target[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1"); // escape jQuery meta chars
return {id:id,input:target, // associated target
selectedDay:0,selectedMonth:0,selectedYear:0, // current selection
drawMonth:0,drawYear:0, // month being drawn
inline:inline, // is datepicker inline or not
dpDiv:!inline?this.dpDiv: // presentation div
datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))};}, /* Attach the date picker to an input field. */_connectDatepicker:function _connectDatepicker(target,inst){var input=$(target);inst.append = $([]);inst.trigger = $([]);if(input.hasClass(this.markerClassName)){return;}this._attachments(input,inst);input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);this._autoSize(inst);$.data(target,"datepicker",inst); //If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
if(inst.settings.disabled){this._disableDatepicker(target);}}, /* Make attachments based on settings. */_attachments:function _attachments(input,inst){var showOn,buttonText,buttonImage,appendText=this._get(inst,"appendText"),isRTL=this._get(inst,"isRTL");if(inst.append){inst.append.remove();}if(appendText){inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");input[isRTL?"before":"after"](inst.append);}input.unbind("focus",this._showDatepicker);if(inst.trigger){inst.trigger.remove();}showOn = this._get(inst,"showOn");if(showOn === "focus" || showOn === "both"){ // pop-up date picker when in the marked field
input.focus(this._showDatepicker);}if(showOn === "button" || showOn === "both"){ // pop-up date picker when button clicked
buttonText = this._get(inst,"buttonText");buttonImage = this._get(inst,"buttonImage");inst.trigger = $(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$("<button type='button'></button>").addClass(this._triggerClass).html(!buttonImage?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));input[isRTL?"before":"after"](inst.trigger);inst.trigger.click(function(){if($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]){$.datepicker._hideDatepicker();}else if($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]){$.datepicker._hideDatepicker();$.datepicker._showDatepicker(input[0]);}else {$.datepicker._showDatepicker(input[0]);}return false;});}}, /* Apply the maximum length for the date format. */_autoSize:function _autoSize(inst){if(this._get(inst,"autoSize") && !inst.inline){var findMax,max,maxI,i,date=new Date(2009,12 - 1,20), // Ensure double digits
dateFormat=this._get(inst,"dateFormat");if(dateFormat.match(/[DM]/)){findMax = function(names){max = 0;maxI = 0;for(i = 0;i < names.length;i++) {if(names[i].length > max){max = names[i].length;maxI = i;}}return maxI;};date.setMonth(findMax(this._get(inst,dateFormat.match(/MM/)?"monthNames":"monthNamesShort")));date.setDate(findMax(this._get(inst,dateFormat.match(/DD/)?"dayNames":"dayNamesShort")) + 20 - date.getDay());}inst.input.attr("size",this._formatDate(inst,date).length);}}, /* Attach an inline date picker to a div. */_inlineDatepicker:function _inlineDatepicker(target,inst){var divSpan=$(target);if(divSpan.hasClass(this.markerClassName)){return;}divSpan.addClass(this.markerClassName).append(inst.dpDiv);$.data(target,"datepicker",inst);this._setDate(inst,this._getDefaultDate(inst),true);this._updateDatepicker(inst);this._updateAlternate(inst); //If disabled option is true, disable the datepicker before showing it (see ticket #5665)
if(inst.settings.disabled){this._disableDatepicker(target);} // Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
inst.dpDiv.css("display","block");}, /* Pop-up the date picker in a "dialog" box.
	 * @param  input element - ignored
	 * @param  date	string or Date - the initial date to display
	 * @param  onSelect  function - the function to call when a date is selected
	 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	 * @param  pos int[2] - coordinates for the dialog's position within the screen or
	 *					event - with x/y coordinates or
	 *					leave empty for default (screen centre)
	 * @return the manager object
	 */_dialogDatepicker:function _dialogDatepicker(input,date,onSelect,settings,pos){var id,browserWidth,browserHeight,scrollX,scrollY,inst=this._dialogInst; // internal instance
if(!inst){this.uuid += 1;id = "dp" + this.uuid;this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>");this._dialogInput.keydown(this._doKeyDown);$("body").append(this._dialogInput);inst = this._dialogInst = this._newInst(this._dialogInput,false);inst.settings = {};$.data(this._dialogInput[0],"datepicker",inst);}datepicker_extendRemove(inst.settings,settings || {});date = date && date.constructor === Date?this._formatDate(inst,date):date;this._dialogInput.val(date);this._pos = pos?pos.length?pos:[pos.pageX,pos.pageY]:null;if(!this._pos){browserWidth = document.documentElement.clientWidth;browserHeight = document.documentElement.clientHeight;scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;scrollY = document.documentElement.scrollTop || document.body.scrollTop;this._pos =  // should use actual width/height below
[browserWidth / 2 - 100 + scrollX,browserHeight / 2 - 150 + scrollY];} // move input on screen for focus, but hidden behind dialog
this._dialogInput.css("left",this._pos[0] + 20 + "px").css("top",this._pos[1] + "px");inst.settings.onSelect = onSelect;this._inDialog = true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);if($.blockUI){$.blockUI(this.dpDiv);}$.data(this._dialogInput[0],"datepicker",inst);return this;}, /* Detach a datepicker from its control.
	 * @param  target	element - the target input field or division or span
	 */_destroyDatepicker:function _destroyDatepicker(target){var nodeName,$target=$(target),inst=$.data(target,"datepicker");if(!$target.hasClass(this.markerClassName)){return;}nodeName = target.nodeName.toLowerCase();$.removeData(target,"datepicker");if(nodeName === "input"){inst.append.remove();inst.trigger.remove();$target.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp);}else if(nodeName === "div" || nodeName === "span"){$target.removeClass(this.markerClassName).empty();}if(datepicker_instActive === inst){datepicker_instActive = null;}}, /* Enable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */_enableDatepicker:function _enableDatepicker(target){var nodeName,inline,$target=$(target),inst=$.data(target,"datepicker");if(!$target.hasClass(this.markerClassName)){return;}nodeName = target.nodeName.toLowerCase();if(nodeName === "input"){target.disabled = false;inst.trigger.filter("button").each(function(){this.disabled = false;}).end().filter("img").css({opacity:"1.0",cursor:""});}else if(nodeName === "div" || nodeName === "span"){inline = $target.children("." + this._inlineClass);inline.children().removeClass("ui-state-disabled");inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",false);}this._disabledInputs = $.map(this._disabledInputs,function(value){return value === target?null:value;}); // delete entry
}, /* Disable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */_disableDatepicker:function _disableDatepicker(target){var nodeName,inline,$target=$(target),inst=$.data(target,"datepicker");if(!$target.hasClass(this.markerClassName)){return;}nodeName = target.nodeName.toLowerCase();if(nodeName === "input"){target.disabled = true;inst.trigger.filter("button").each(function(){this.disabled = true;}).end().filter("img").css({opacity:"0.5",cursor:"default"});}else if(nodeName === "div" || nodeName === "span"){inline = $target.children("." + this._inlineClass);inline.children().addClass("ui-state-disabled");inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",true);}this._disabledInputs = $.map(this._disabledInputs,function(value){return value === target?null:value;}); // delete entry
this._disabledInputs[this._disabledInputs.length] = target;}, /* Is the first field in a jQuery collection disabled as a datepicker?
	 * @param  target	element - the target input field or division or span
	 * @return boolean - true if disabled, false if enabled
	 */_isDisabledDatepicker:function _isDisabledDatepicker(target){if(!target){return false;}for(var i=0;i < this._disabledInputs.length;i++) {if(this._disabledInputs[i] === target){return true;}}return false;}, /* Retrieve the instance data for the target control.
	 * @param  target  element - the target input field or division or span
	 * @return  object - the associated instance data
	 * @throws  error if a jQuery problem getting data
	 */_getInst:function _getInst(target){try{return $.data(target,"datepicker");}catch(err) {throw "Missing instance data for this datepicker";}}, /* Update or retrieve the settings for a date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 * @param  name	object - the new settings to update or
	 *				string - the name of the setting to change or retrieve,
	 *				when retrieving also "all" for all instance settings or
	 *				"defaults" for all global defaults
	 * @param  value   any - the new value for the setting
	 *				(omit if above is an object or to retrieve a value)
	 */_optionDatepicker:function _optionDatepicker(target,name,value){var settings,date,minDate,maxDate,inst=this._getInst(target);if(arguments.length === 2 && typeof name === "string"){return name === "defaults"?$.extend({},$.datepicker._defaults):inst?name === "all"?$.extend({},inst.settings):this._get(inst,name):null;}settings = name || {};if(typeof name === "string"){settings = {};settings[name] = value;}if(inst){if(this._curInst === inst){this._hideDatepicker();}date = this._getDateDatepicker(target,true);minDate = this._getMinMaxDate(inst,"min");maxDate = this._getMinMaxDate(inst,"max");datepicker_extendRemove(inst.settings,settings); // reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
if(minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined){inst.settings.minDate = this._formatDate(inst,minDate);}if(maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined){inst.settings.maxDate = this._formatDate(inst,maxDate);}if("disabled" in settings){if(settings.disabled){this._disableDatepicker(target);}else {this._enableDatepicker(target);}}this._attachments($(target),inst);this._autoSize(inst);this._setDate(inst,date);this._updateAlternate(inst);this._updateDatepicker(inst);}}, // change method deprecated
_changeDatepicker:function _changeDatepicker(target,name,value){this._optionDatepicker(target,name,value);}, /* Redraw the date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 */_refreshDatepicker:function _refreshDatepicker(target){var inst=this._getInst(target);if(inst){this._updateDatepicker(inst);}}, /* Set the dates for a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  date	Date - the new date
	 */_setDateDatepicker:function _setDateDatepicker(target,date){var inst=this._getInst(target);if(inst){this._setDate(inst,date);this._updateDatepicker(inst);this._updateAlternate(inst);}}, /* Get the date(s) for the first entry in a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  noDefault boolean - true if no default date is to be used
	 * @return Date - the current date
	 */_getDateDatepicker:function _getDateDatepicker(target,noDefault){var inst=this._getInst(target);if(inst && !inst.inline){this._setDateFromField(inst,noDefault);}return inst?this._getDate(inst):null;}, /* Handle keystrokes. */_doKeyDown:function _doKeyDown(event){var onSelect,dateStr,sel,inst=$.datepicker._getInst(event.target),handled=true,isRTL=inst.dpDiv.is(".ui-datepicker-rtl");inst._keyEvent = true;if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker();handled = false;break; // hide on tab out
case 13:sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")",inst.dpDiv);if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0]);}onSelect = $.datepicker._get(inst,"onSelect");if(onSelect){dateStr = $.datepicker._formatDate(inst); // trigger custom callback
onSelect.apply(inst.input?inst.input[0]:null,[dateStr,inst]);}else {$.datepicker._hideDatepicker();}return false; // don't submit the form
case 27:$.datepicker._hideDatepicker();break; // hide on escape
case 33:$.datepicker._adjustDate(event.target,event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths"),"M");break; // previous month/year on page up/+ ctrl
case 34:$.datepicker._adjustDate(event.target,event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths"),"M");break; // next month/year on page down/+ ctrl
case 35:if(event.ctrlKey || event.metaKey){$.datepicker._clearDate(event.target);}handled = event.ctrlKey || event.metaKey;break; // clear on ctrl or command +end
case 36:if(event.ctrlKey || event.metaKey){$.datepicker._gotoToday(event.target);}handled = event.ctrlKey || event.metaKey;break; // current on ctrl or command +home
case 37:if(event.ctrlKey || event.metaKey){$.datepicker._adjustDate(event.target,isRTL?+1:-1,"D");}handled = event.ctrlKey || event.metaKey; // -1 day on ctrl or command +left
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths"),"M");} // next month/year on alt +left on Mac
break;case 38:if(event.ctrlKey || event.metaKey){$.datepicker._adjustDate(event.target,-7,"D");}handled = event.ctrlKey || event.metaKey;break; // -1 week on ctrl or command +up
case 39:if(event.ctrlKey || event.metaKey){$.datepicker._adjustDate(event.target,isRTL?-1:+1,"D");}handled = event.ctrlKey || event.metaKey; // +1 day on ctrl or command +right
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths"),"M");} // next month/year on alt +right
break;case 40:if(event.ctrlKey || event.metaKey){$.datepicker._adjustDate(event.target,+7,"D");}handled = event.ctrlKey || event.metaKey;break; // +1 week on ctrl or command +down
default:handled = false;}}else if(event.keyCode === 36 && event.ctrlKey){ // display the date picker on ctrl+home
$.datepicker._showDatepicker(this);}else {handled = false;}if(handled){event.preventDefault();event.stopPropagation();}}, /* Filter entered characters - based on date format. */_doKeyPress:function _doKeyPress(event){var chars,chr,inst=$.datepicker._getInst(event.target);if($.datepicker._get(inst,"constrainInput")){chars = $.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));chr = String.fromCharCode(event.charCode == null?event.keyCode:event.charCode);return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);}}, /* Synchronise manual entry and field/alternate field. */_doKeyUp:function _doKeyUp(event){var date,inst=$.datepicker._getInst(event.target);if(inst.input.val() !== inst.lastVal){try{date = $.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),inst.input?inst.input.val():null,$.datepicker._getFormatConfig(inst));if(date){ // only if valid
$.datepicker._setDateFromField(inst);$.datepicker._updateAlternate(inst);$.datepicker._updateDatepicker(inst);}}catch(err) {}}return true;}, /* Pop-up the date picker for a given input field.
	 * If false returned from beforeShow event handler do not show.
	 * @param  input  element - the input field attached to the date picker or
	 *					event - if triggered by focus
	 */_showDatepicker:function _showDatepicker(input){input = input.target || input;if(input.nodeName.toLowerCase() !== "input"){ // find from button/image trigger
input = $("input",input.parentNode)[0];}if($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input){ // already here
return;}var inst,beforeShow,beforeShowSettings,isFixed,offset,showAnim,duration;inst = $.datepicker._getInst(input);if($.datepicker._curInst && $.datepicker._curInst !== inst){$.datepicker._curInst.dpDiv.stop(true,true);if(inst && $.datepicker._datepickerShowing){$.datepicker._hideDatepicker($.datepicker._curInst.input[0]);}}beforeShow = $.datepicker._get(inst,"beforeShow");beforeShowSettings = beforeShow?beforeShow.apply(input,[input,inst]):{};if(beforeShowSettings === false){return;}datepicker_extendRemove(inst.settings,beforeShowSettings);inst.lastVal = null;$.datepicker._lastInput = input;$.datepicker._setDateFromField(inst);if($.datepicker._inDialog){ // hide cursor
input.value = "";}if(!$.datepicker._pos){ // position below input
$.datepicker._pos = $.datepicker._findPos(input);$.datepicker._pos[1] += input.offsetHeight; // add the height
}isFixed = false;$(input).parents().each(function(){isFixed |= $(this).css("position") === "fixed";return !isFixed;});offset = {left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos = null; //to avoid flashes on Firefox
inst.dpDiv.empty(); // determine sizing offscreen
inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});$.datepicker._updateDatepicker(inst); // fix width for dynamic number of date pickers
// and adjust position before showing
offset = $.datepicker._checkOffset(inst,offset,isFixed);inst.dpDiv.css({position:$.datepicker._inDialog && $.blockUI?"static":isFixed?"fixed":"absolute",display:"none",left:offset.left + "px",top:offset.top + "px"});if(!inst.inline){showAnim = $.datepicker._get(inst,"showAnim");duration = $.datepicker._get(inst,"duration");inst.dpDiv.css("z-index",datepicker_getZindex($(input)) + 1);$.datepicker._datepickerShowing = true;if($.effects && $.effects.effect[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration);}else {inst.dpDiv[showAnim || "show"](showAnim?duration:null);}if($.datepicker._shouldFocusInput(inst)){inst.input.focus();}$.datepicker._curInst = inst;}}, /* Generate the date picker content. */_updateDatepicker:function _updateDatepicker(inst){this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
datepicker_instActive = inst; // for delegate hover events
inst.dpDiv.empty().append(this._generateHTML(inst));this._attachHandlers(inst);var origyearshtml,numMonths=this._getNumberOfMonths(inst),cols=numMonths[1],width=17,activeCell=inst.dpDiv.find("." + this._dayOverClass + " a");if(activeCell.length > 0){datepicker_handleMouseover.apply(activeCell.get(0));}inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");if(cols > 1){inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width",width * cols + "em");}inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1?"add":"remove") + "Class"]("ui-datepicker-multi");inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove") + "Class"]("ui-datepicker-rtl");if(inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)){inst.input.focus();} // deffered render of the years select (to avoid flashes on Firefox)
if(inst.yearshtml){origyearshtml = inst.yearshtml;setTimeout(function(){ //assure that inst.yearshtml didn't change.
if(origyearshtml === inst.yearshtml && inst.yearshtml){inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);}origyearshtml = inst.yearshtml = null;},0);}}, // #6694 - don't focus the input if it's already focused
// this breaks the change event in IE
// Support: IE and jQuery <1.9
_shouldFocusInput:function _shouldFocusInput(inst){return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");}, /* Check positioning to remain on screen. */_checkOffset:function _checkOffset(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth(),dpHeight=inst.dpDiv.outerHeight(),inputWidth=inst.input?inst.input.outerWidth():0,inputHeight=inst.input?inst.input.outerHeight():0,viewWidth=document.documentElement.clientWidth + (isFixed?0:$(document).scrollLeft()),viewHeight=document.documentElement.clientHeight + (isFixed?0:$(document).scrollTop());offset.left -= this._get(inst,"isRTL")?dpWidth - inputWidth:0;offset.left -= isFixed && offset.left === inst.input.offset().left?$(document).scrollLeft():0;offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight?$(document).scrollTop():0; // now check if datepicker is showing outside window viewport - move to a better place if so.
offset.left -= Math.min(offset.left,offset.left + dpWidth > viewWidth && viewWidth > dpWidth?Math.abs(offset.left + dpWidth - viewWidth):0);offset.top -= Math.min(offset.top,offset.top + dpHeight > viewHeight && viewHeight > dpHeight?Math.abs(dpHeight + inputHeight):0);return offset;}, /* Find an object's position on the screen. */_findPos:function _findPos(obj){var position,inst=this._getInst(obj),isRTL=this._get(inst,"isRTL");while(obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {obj = obj[isRTL?"previousSibling":"nextSibling"];}position = $(obj).offset();return [position.left,position.top];}, /* Hide the date picker from view.
	 * @param  input  element - the input field attached to the date picker
	 */_hideDatepicker:function _hideDatepicker(input){var showAnim,duration,postProcess,onClose,inst=this._curInst;if(!inst || input && inst !== $.data(input,"datepicker")){return;}if(this._datepickerShowing){showAnim = this._get(inst,"showAnim");duration = this._get(inst,"duration");postProcess = function(){$.datepicker._tidyDialog(inst);}; // DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
if($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess);}else {inst.dpDiv[showAnim === "slideDown"?"slideUp":showAnim === "fadeIn"?"fadeOut":"hide"](showAnim?duration:null,postProcess);}if(!showAnim){postProcess();}this._datepickerShowing = false;onClose = this._get(inst,"onClose");if(onClose){onClose.apply(inst.input?inst.input[0]:null,[inst.input?inst.input.val():"",inst]);}this._lastInput = null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if($.blockUI){$.unblockUI();$("body").append(this.dpDiv);}}this._inDialog = false;}}, /* Tidy up after a dialog display. */_tidyDialog:function _tidyDialog(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");}, /* Close date picker if clicked elsewhere. */_checkExternalClick:function _checkExternalClick(event){if(!$.datepicker._curInst){return;}var $target=$(event.target),inst=$.datepicker._getInst($target[0]);if($target[0].id !== $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length === 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst){$.datepicker._hideDatepicker();}}, /* Adjust one of the date sub-fields. */_adjustDate:function _adjustDate(id,offset,period){var target=$(id),inst=this._getInst(target[0]);if(this._isDisabledDatepicker(target[0])){return;}this._adjustInstDate(inst,offset + (period === "M"?this._get(inst,"showCurrentAtPos"):0), // undo positioning
period);this._updateDatepicker(inst);}, /* Action for current link. */_gotoToday:function _gotoToday(id){var date,target=$(id),inst=this._getInst(target[0]);if(this._get(inst,"gotoCurrent") && inst.currentDay){inst.selectedDay = inst.currentDay;inst.drawMonth = inst.selectedMonth = inst.currentMonth;inst.drawYear = inst.selectedYear = inst.currentYear;}else {date = new Date();inst.selectedDay = date.getDate();inst.drawMonth = inst.selectedMonth = date.getMonth();inst.drawYear = inst.selectedYear = date.getFullYear();}this._notifyChange(inst);this._adjustDate(target);}, /* Action for selecting a new month/year. */_selectMonthYear:function _selectMonthYear(id,select,period){var target=$(id),inst=this._getInst(target[0]);inst["selected" + (period === "M"?"Month":"Year")] = inst["draw" + (period === "M"?"Month":"Year")] = parseInt(select.options[select.selectedIndex].value,10);this._notifyChange(inst);this._adjustDate(target);}, /* Action for selecting a day. */_selectDay:function _selectDay(id,month,year,td){var inst,target=$(id);if($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])){return;}inst = this._getInst(target[0]);inst.selectedDay = inst.currentDay = $("a",td).html();inst.selectedMonth = inst.currentMonth = month;inst.selectedYear = inst.currentYear = year;this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear));}, /* Erase the input field and hide the date picker. */_clearDate:function _clearDate(id){var target=$(id);this._selectDate(target,"");}, /* Update the input field with the selected date. */_selectDate:function _selectDate(id,dateStr){var onSelect,target=$(id),inst=this._getInst(target[0]);dateStr = dateStr != null?dateStr:this._formatDate(inst);if(inst.input){inst.input.val(dateStr);}this._updateAlternate(inst);onSelect = this._get(inst,"onSelect");if(onSelect){onSelect.apply(inst.input?inst.input[0]:null,[dateStr,inst]); // trigger custom callback
}else if(inst.input){inst.input.trigger("change"); // fire the change event
}if(inst.inline){this._updateDatepicker(inst);}else {this._hideDatepicker();this._lastInput = inst.input[0];if(typeof inst.input[0] !== "object"){inst.input.focus(); // restore focus
}this._lastInput = null;}}, /* Update any alternate field to synchronise with the main field. */_updateAlternate:function _updateAlternate(inst){var altFormat,date,dateStr,altField=this._get(inst,"altField");if(altField){ // update alternate field too
altFormat = this._get(inst,"altFormat") || this._get(inst,"dateFormat");date = this._getDate(inst);dateStr = this.formatDate(altFormat,date,this._getFormatConfig(inst));$(altField).each(function(){$(this).val(dateStr);});}}, /* Set as beforeShowDay function to prevent selection of weekends.
	 * @param  date  Date - the date to customise
	 * @return [boolean, string] - is this date selectable?, what is its CSS class?
	 */noWeekends:function noWeekends(date){var day=date.getDay();return [day > 0 && day < 6,""];}, /* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	 * @param  date  Date - the date to get the week for
	 * @return  number - the number of the week within the year that contains this date
	 */iso8601Week:function iso8601Week(date){var time,checkDate=new Date(date.getTime()); // Find Thursday of this week starting on Monday
checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));time = checkDate.getTime();checkDate.setMonth(0); // Compare with Jan 1
checkDate.setDate(1);return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;}, /* Parse a string value into a date object.
	 * See formatDate below for the possible formats.
	 *
	 * @param  format string - the expected format of the date
	 * @param  value string - the date in the above format
	 * @param  settings Object - attributes include:
	 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  Date - the extracted date value or null if value is blank
	 */parseDate:function parseDate(format,value,settings){if(format == null || value == null){throw "Invalid arguments";}value = typeof value === "object"?value.toString():value + "";if(value === ""){return null;}var iFormat,dim,extra,iValue=0,shortYearCutoffTemp=(settings?settings.shortYearCutoff:null) || this._defaults.shortYearCutoff,shortYearCutoff=typeof shortYearCutoffTemp !== "string"?shortYearCutoffTemp:new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp,10),dayNamesShort=(settings?settings.dayNamesShort:null) || this._defaults.dayNamesShort,dayNames=(settings?settings.dayNames:null) || this._defaults.dayNames,monthNamesShort=(settings?settings.monthNamesShort:null) || this._defaults.monthNamesShort,monthNames=(settings?settings.monthNames:null) || this._defaults.monthNames,year=-1,month=-1,day=-1,doy=-1,literal=false,date, // Check whether a format character is doubled
lookAhead=function lookAhead(match){var matches=iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;if(matches){iFormat++;}return matches;}, // Extract a number from the string value
getNumber=function getNumber(match){var isDoubled=lookAhead(match),size=match === "@"?14:match === "!"?20:match === "y" && isDoubled?4:match === "o"?3:2,minSize=match === "y"?size:1,digits=new RegExp("^\\d{" + minSize + "," + size + "}"),num=value.substring(iValue).match(digits);if(!num){throw "Missing number at position " + iValue;}iValue += num[0].length;return parseInt(num[0],10);}, // Extract a name from the string value and convert to an index
getName=function getName(match,shortNames,longNames){var index=-1,names=$.map(lookAhead(match)?longNames:shortNames,function(v,k){return [[k,v]];}).sort(function(a,b){return -(a[1].length - b[1].length);});$.each(names,function(i,pair){var name=pair[1];if(value.substr(iValue,name.length).toLowerCase() === name.toLowerCase()){index = pair[0];iValue += name.length;return false;}});if(index !== -1){return index + 1;}else {throw "Unknown name at position " + iValue;}}, // Confirm that a literal character matches the string value
checkLiteral=function checkLiteral(){if(value.charAt(iValue) !== format.charAt(iFormat)){throw "Unexpected literal at position " + iValue;}iValue++;};for(iFormat = 0;iFormat < format.length;iFormat++) {if(literal){if(format.charAt(iFormat) === "'" && !lookAhead("'")){literal = false;}else {checkLiteral();}}else {switch(format.charAt(iFormat)){case "d":day = getNumber("d");break;case "D":getName("D",dayNamesShort,dayNames);break;case "o":doy = getNumber("o");break;case "m":month = getNumber("m");break;case "M":month = getName("M",monthNamesShort,monthNames);break;case "y":year = getNumber("y");break;case "@":date = new Date(getNumber("@"));year = date.getFullYear();month = date.getMonth() + 1;day = date.getDate();break;case "!":date = new Date((getNumber("!") - this._ticksTo1970) / 10000);year = date.getFullYear();month = date.getMonth() + 1;day = date.getDate();break;case "'":if(lookAhead("'")){checkLiteral();}else {literal = true;}break;default:checkLiteral();}}}if(iValue < value.length){extra = value.substr(iValue);if(!/^\s+/.test(extra)){throw "Extra/unparsed characters found in date: " + extra;}}if(year === -1){year = new Date().getFullYear();}else if(year < 100){year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff?0:-100);}if(doy > -1){month = 1;day = doy;do {dim = this._getDaysInMonth(year,month - 1);if(day <= dim){break;}month++;day -= dim;}while(true);}date = this._daylightSavingAdjust(new Date(year,month - 1,day));if(date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day){throw "Invalid date"; // E.g. 31/02/00
}return date;}, /* Standard date formats. */ATOM:"yy-mm-dd", // RFC 3339 (ISO 8601)
COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y", // RFC 822
TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd", // ISO 8601
_ticksTo1970:((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000, /* Format a date object into a string value.
	 * The format can be combinations of the following:
	 * d  - day of month (no leading zero)
	 * dd - day of month (two digit)
	 * o  - day of year (no leading zeros)
	 * oo - day of year (three digit)
	 * D  - day name short
	 * DD - day name long
	 * m  - month of year (no leading zero)
	 * mm - month of year (two digit)
	 * M  - month name short
	 * MM - month name long
	 * y  - year (two digit)
	 * yy - year (four digit)
	 * @ - Unix timestamp (ms since 01/01/1970)
	 * ! - Windows ticks (100ns since 01/01/0001)
	 * "..." - literal text
	 * '' - single quote
	 *
	 * @param  format string - the desired format of the date
	 * @param  date Date - the date value to format
	 * @param  settings Object - attributes include:
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  string - the date in the above format
	 */formatDate:function formatDate(format,date,settings){if(!date){return "";}var iFormat,dayNamesShort=(settings?settings.dayNamesShort:null) || this._defaults.dayNamesShort,dayNames=(settings?settings.dayNames:null) || this._defaults.dayNames,monthNamesShort=(settings?settings.monthNamesShort:null) || this._defaults.monthNamesShort,monthNames=(settings?settings.monthNames:null) || this._defaults.monthNames, // Check whether a format character is doubled
lookAhead=function lookAhead(match){var matches=iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;if(matches){iFormat++;}return matches;}, // Format a number, with leading zero if necessary
formatNumber=function formatNumber(match,value,len){var num="" + value;if(lookAhead(match)){while(num.length < len) {num = "0" + num;}}return num;}, // Format a name, short or long as requested
formatName=function formatName(match,value,shortNames,longNames){return lookAhead(match)?longNames[value]:shortNames[value];},output="",literal=false;if(date){for(iFormat = 0;iFormat < format.length;iFormat++) {if(literal){if(format.charAt(iFormat) === "'" && !lookAhead("'")){literal = false;}else {output += format.charAt(iFormat);}}else {switch(format.charAt(iFormat)){case "d":output += formatNumber("d",date.getDate(),2);break;case "D":output += formatName("D",date.getDay(),dayNamesShort,dayNames);break;case "o":output += formatNumber("o",Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime() - new Date(date.getFullYear(),0,0).getTime()) / 86400000),3);break;case "m":output += formatNumber("m",date.getMonth() + 1,2);break;case "M":output += formatName("M",date.getMonth(),monthNamesShort,monthNames);break;case "y":output += lookAhead("y")?date.getFullYear():(date.getYear() % 100 < 10?"0":"") + date.getYear() % 100;break;case "@":output += date.getTime();break;case "!":output += date.getTime() * 10000 + this._ticksTo1970;break;case "'":if(lookAhead("'")){output += "'";}else {literal = true;}break;default:output += format.charAt(iFormat);}}}}return output;}, /* Extract all possible characters from the date format. */_possibleChars:function _possibleChars(format){var iFormat,chars="",literal=false, // Check whether a format character is doubled
lookAhead=function lookAhead(match){var matches=iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;if(matches){iFormat++;}return matches;};for(iFormat = 0;iFormat < format.length;iFormat++) {if(literal){if(format.charAt(iFormat) === "'" && !lookAhead("'")){literal = false;}else {chars += format.charAt(iFormat);}}else {switch(format.charAt(iFormat)){case "d":case "m":case "y":case "@":chars += "0123456789";break;case "D":case "M":return null; // Accept anything
case "'":if(lookAhead("'")){chars += "'";}else {literal = true;}break;default:chars += format.charAt(iFormat);}}}return chars;}, /* Get a setting value, defaulting if necessary. */_get:function _get(inst,name){return inst.settings[name] !== undefined?inst.settings[name]:this._defaults[name];}, /* Parse existing date and initialise date picker. */_setDateFromField:function _setDateFromField(inst,noDefault){if(inst.input.val() === inst.lastVal){return;}var dateFormat=this._get(inst,"dateFormat"),dates=inst.lastVal = inst.input?inst.input.val():null,defaultDate=this._getDefaultDate(inst),date=defaultDate,settings=this._getFormatConfig(inst);try{date = this.parseDate(dateFormat,dates,settings) || defaultDate;}catch(event) {dates = noDefault?"":dates;}inst.selectedDay = date.getDate();inst.drawMonth = inst.selectedMonth = date.getMonth();inst.drawYear = inst.selectedYear = date.getFullYear();inst.currentDay = dates?date.getDate():0;inst.currentMonth = dates?date.getMonth():0;inst.currentYear = dates?date.getFullYear():0;this._adjustInstDate(inst);}, /* Retrieve the default date shown on opening. */_getDefaultDate:function _getDefaultDate(inst){return this._restrictMinMax(inst,this._determineDate(inst,this._get(inst,"defaultDate"),new Date()));}, /* A date may be specified as an exact value or a relative one. */_determineDate:function _determineDate(inst,date,defaultDate){var offsetNumeric=function offsetNumeric(offset){var date=new Date();date.setDate(date.getDate() + offset);return date;},offsetString=function offsetString(offset){try{return $.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),offset,$.datepicker._getFormatConfig(inst));}catch(e) { // Ignore
}var date=(offset.toLowerCase().match(/^c/)?$.datepicker._getDate(inst):null) || new Date(),year=date.getFullYear(),month=date.getMonth(),day=date.getDate(),pattern=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,matches=pattern.exec(offset);while(matches) {switch(matches[2] || "d"){case "d":case "D":day += parseInt(matches[1],10);break;case "w":case "W":day += parseInt(matches[1],10) * 7;break;case "m":case "M":month += parseInt(matches[1],10);day = Math.min(day,$.datepicker._getDaysInMonth(year,month));break;case "y":case "Y":year += parseInt(matches[1],10);day = Math.min(day,$.datepicker._getDaysInMonth(year,month));break;}matches = pattern.exec(offset);}return new Date(year,month,day);},newDate=date == null || date === ""?defaultDate:typeof date === "string"?offsetString(date):typeof date === "number"?isNaN(date)?defaultDate:offsetNumeric(date):new Date(date.getTime());newDate = newDate && newDate.toString() === "Invalid Date"?defaultDate:newDate;if(newDate){newDate.setHours(0);newDate.setMinutes(0);newDate.setSeconds(0);newDate.setMilliseconds(0);}return this._daylightSavingAdjust(newDate);}, /* Handle switch to/from daylight saving.
	 * Hours may be non-zero on daylight saving cut-over:
	 * > 12 when midnight changeover, but then cannot generate
	 * midnight datetime, so jump to 1AM, otherwise reset.
	 * @param  date  (Date) the date to check
	 * @return  (Date) the corrected date
	 */_daylightSavingAdjust:function _daylightSavingAdjust(date){if(!date){return null;}date.setHours(date.getHours() > 12?date.getHours() + 2:0);return date;}, /* Set the date(s) directly. */_setDate:function _setDate(inst,date,noChange){var clear=!date,origMonth=inst.selectedMonth,origYear=inst.selectedYear,newDate=this._restrictMinMax(inst,this._determineDate(inst,date,new Date()));inst.selectedDay = inst.currentDay = newDate.getDate();inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();if((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange){this._notifyChange(inst);}this._adjustInstDate(inst);if(inst.input){inst.input.val(clear?"":this._formatDate(inst));}}, /* Retrieve the date(s) directly. */_getDate:function _getDate(inst){var startDate=!inst.currentYear || inst.input && inst.input.val() === ""?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));return startDate;}, /* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */_attachHandlers:function _attachHandlers(inst){var stepMonths=this._get(inst,"stepMonths"),id="#" + inst.id.replace(/\\\\/g,"\\");inst.dpDiv.find("[data-handler]").map(function(){var handler={prev:function prev(){$.datepicker._adjustDate(id,-stepMonths,"M");},next:function next(){$.datepicker._adjustDate(id,+stepMonths,"M");},hide:function hide(){$.datepicker._hideDatepicker();},today:function today(){$.datepicker._gotoToday(id);},selectDay:function selectDay(){$.datepicker._selectDay(id,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this);return false;},selectMonth:function selectMonth(){$.datepicker._selectMonthYear(id,this,"M");return false;},selectYear:function selectYear(){$.datepicker._selectMonthYear(id,this,"Y");return false;}};$(this).bind(this.getAttribute("data-event"),handler[this.getAttribute("data-handler")]);});}, /* Generate the HTML for the current state of the date picker. */_generateHTML:function _generateHTML(inst){var maxDraw,prevText,prev,nextText,next,currentText,gotoDate,controls,buttonPanel,firstDay,showWeek,dayNames,dayNamesMin,monthNames,monthNamesShort,beforeShowDay,showOtherMonths,selectOtherMonths,defaultDate,html,dow,row,group,col,selectedDate,cornerClass,calender,thead,day,daysInMonth,leadDays,curRows,numRows,printDate,dRow,tbody,daySettings,otherMonth,unselectable,tempDate=new Date(),today=this._daylightSavingAdjust(new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate())), // clear time
isRTL=this._get(inst,"isRTL"),showButtonPanel=this._get(inst,"showButtonPanel"),hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext"),navigationAsDateFormat=this._get(inst,"navigationAsDateFormat"),numMonths=this._getNumberOfMonths(inst),showCurrentAtPos=this._get(inst,"showCurrentAtPos"),stepMonths=this._get(inst,"stepMonths"),isMultiMonth=numMonths[0] !== 1 || numMonths[1] !== 1,currentDate=this._daylightSavingAdjust(!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)),minDate=this._getMinMaxDate(inst,"min"),maxDate=this._getMinMaxDate(inst,"max"),drawMonth=inst.drawMonth - showCurrentAtPos,drawYear=inst.drawYear;if(drawMonth < 0){drawMonth += 12;drawYear--;}if(maxDate){maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth() - numMonths[0] * numMonths[1] + 1,maxDate.getDate()));maxDraw = minDate && maxDraw < minDate?minDate:maxDraw;while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1)) > maxDraw) {drawMonth--;if(drawMonth < 0){drawMonth = 11;drawYear--;}}}inst.drawMonth = drawMonth;inst.drawYear = drawYear;prevText = this._get(inst,"prevText");prevText = !navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth - stepMonths,1)),this._getFormatConfig(inst));prev = this._canAdjustMonth(inst,-1,drawYear,drawMonth)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" + " title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL?"e":"w") + "'>" + prevText + "</span></a>":hideIfNoPrevNext?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL?"e":"w") + "'>" + prevText + "</span></a>";nextText = this._get(inst,"nextText");nextText = !navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth + stepMonths,1)),this._getFormatConfig(inst));next = this._canAdjustMonth(inst,+1,drawYear,drawMonth)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" + " title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL?"w":"e") + "'>" + nextText + "</span></a>":hideIfNoPrevNext?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL?"w":"e") + "'>" + nextText + "</span></a>";currentText = this._get(inst,"currentText");gotoDate = this._get(inst,"gotoCurrent") && inst.currentDay?currentDate:today;currentText = !navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst));controls = !inst.inline?"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst,"closeText") + "</button>":"";buttonPanel = showButtonPanel?"<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL?controls:"") + (this._isInRange(inst,gotoDate)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" + ">" + currentText + "</button>":"") + (isRTL?"":controls) + "</div>":"";firstDay = parseInt(this._get(inst,"firstDay"),10);firstDay = isNaN(firstDay)?0:firstDay;showWeek = this._get(inst,"showWeek");dayNames = this._get(inst,"dayNames");dayNamesMin = this._get(inst,"dayNamesMin");monthNames = this._get(inst,"monthNames");monthNamesShort = this._get(inst,"monthNamesShort");beforeShowDay = this._get(inst,"beforeShowDay");showOtherMonths = this._get(inst,"showOtherMonths");selectOtherMonths = this._get(inst,"selectOtherMonths");defaultDate = this._getDefaultDate(inst);html = "";dow;for(row = 0;row < numMonths[0];row++) {group = "";this.maxRows = 4;for(col = 0;col < numMonths[1];col++) {selectedDate = this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));cornerClass = " ui-corner-all";calender = "";if(isMultiMonth){calender += "<div class='ui-datepicker-group";if(numMonths[1] > 1){switch(col){case 0:calender += " ui-datepicker-group-first";cornerClass = " ui-corner-" + (isRTL?"right":"left");break;case numMonths[1] - 1:calender += " ui-datepicker-group-last";cornerClass = " ui-corner-" + (isRTL?"left":"right");break;default:calender += " ui-datepicker-group-middle";cornerClass = "";break;}}calender += "'>";}calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && row === 0?isRTL?next:prev:"") + (/all|right/.test(cornerClass) && row === 0?isRTL?prev:next:"") + this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,row > 0 || col > 0,monthNames,monthNamesShort) +  // draw month headers
"</div><table class='ui-datepicker-calendar'><thead>" + "<tr>";thead = showWeek?"<th class='ui-datepicker-week-col'>" + this._get(inst,"weekHeader") + "</th>":"";for(dow = 0;dow < 7;dow++) { // days of the week
day = (dow + firstDay) % 7;thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5?" class='ui-datepicker-week-end'":"") + ">" + "<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";}calender += thead + "</tr></thead><tbody>";daysInMonth = this._getDaysInMonth(drawYear,drawMonth);if(drawYear === inst.selectedYear && drawMonth === inst.selectedMonth){inst.selectedDay = Math.min(inst.selectedDay,daysInMonth);}leadDays = (this._getFirstDayOfMonth(drawYear,drawMonth) - firstDay + 7) % 7;curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
numRows = isMultiMonth?this.maxRows > curRows?this.maxRows:curRows:curRows; //If multiple months, use the higher number of rows (see #7043)
this.maxRows = numRows;printDate = this._daylightSavingAdjust(new Date(drawYear,drawMonth,1 - leadDays));for(dRow = 0;dRow < numRows;dRow++) { // create date picker rows
calender += "<tr>";tbody = !showWeek?"":"<td class='ui-datepicker-week-col'>" + this._get(inst,"calculateWeek")(printDate) + "</td>";for(dow = 0;dow < 7;dow++) { // create date picker days
daySettings = beforeShowDay?beforeShowDay.apply(inst.input?inst.input[0]:null,[printDate]):[true,""];otherMonth = printDate.getMonth() !== drawMonth;unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5?" ui-datepicker-week-end":"") + ( // highlight weekends
otherMonth?" ui-datepicker-other-month":"") + ( // highlight days from other months
printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent ||  // user pressed key
defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()? // or defaultDate is current printedDate and defaultDate is selectedDate
" " + this._dayOverClass:"") + ( // highlight selected day
unselectable?" " + this._unselectableClass + " ui-state-disabled":"") + ( // highlight unselectable days
otherMonth && !showOtherMonths?"":" " + daySettings[1] + ( // highlight custom dates
printDate.getTime() === currentDate.getTime()?" " + this._currentClass:"") + ( // highlight selected day
printDate.getTime() === today.getTime()?" ui-datepicker-today":"")) + "'" + ( // highlight today (if different)
(!otherMonth || showOtherMonths) && daySettings[2]?" title='" + daySettings[2].replace(/'/g,"&#39;") + "'":"") + ( // cell title
unselectable?"":" data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + ( // actions
otherMonth && !showOtherMonths?"&#xa0;": // display for other months
unselectable?"<span class='ui-state-default'>" + printDate.getDate() + "</span>":"<a class='ui-state-default" + (printDate.getTime() === today.getTime()?" ui-state-highlight":"") + (printDate.getTime() === currentDate.getTime()?" ui-state-active":"") + ( // highlight selected day
otherMonth?" ui-priority-secondary":"") +  // distinguish dates from other months
"' href='#'>" + printDate.getDate() + "</a>") + "</td>"; // display selectable date
printDate.setDate(printDate.getDate() + 1);printDate = this._daylightSavingAdjust(printDate);}calender += tbody + "</tr>";}drawMonth++;if(drawMonth > 11){drawMonth = 0;drawYear++;}calender += "</tbody></table>" + (isMultiMonth?"</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1?"<div class='ui-datepicker-row-break'></div>":""):"");group += calender;}html += group;}html += buttonPanel;inst._keyEvent = false;return html;}, /* Generate the month and year header. */_generateMonthYearHeader:function _generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,secondary,monthNames,monthNamesShort){var inMinYear,inMaxYear,month,years,thisYear,determineYear,year,endYear,changeMonth=this._get(inst,"changeMonth"),changeYear=this._get(inst,"changeYear"),showMonthAfterYear=this._get(inst,"showMonthAfterYear"),html="<div class='ui-datepicker-title'>",monthHtml=""; // month selection
if(secondary || !changeMonth){monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";}else {inMinYear = minDate && minDate.getFullYear() === drawYear;inMaxYear = maxDate && maxDate.getFullYear() === drawYear;monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";for(month = 0;month < 12;month++) {if((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())){monthHtml += "<option value='" + month + "'" + (month === drawMonth?" selected='selected'":"") + ">" + monthNamesShort[month] + "</option>";}}monthHtml += "</select>";}if(!showMonthAfterYear){html += monthHtml + (secondary || !(changeMonth && changeYear)?"&#xa0;":"");} // year selection
if(!inst.yearshtml){inst.yearshtml = "";if(secondary || !changeYear){html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";}else { // determine range of years to display
years = this._get(inst,"yearRange").split(":");thisYear = new Date().getFullYear();determineYear = function(value){var year=value.match(/c[+\-].*/)?drawYear + parseInt(value.substring(1),10):value.match(/[+\-].*/)?thisYear + parseInt(value,10):parseInt(value,10);return isNaN(year)?thisYear:year;};year = determineYear(years[0]);endYear = Math.max(year,determineYear(years[1] || ""));year = minDate?Math.max(year,minDate.getFullYear()):year;endYear = maxDate?Math.min(endYear,maxDate.getFullYear()):endYear;inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";for(;year <= endYear;year++) {inst.yearshtml += "<option value='" + year + "'" + (year === drawYear?" selected='selected'":"") + ">" + year + "</option>";}inst.yearshtml += "</select>";html += inst.yearshtml;inst.yearshtml = null;}}html += this._get(inst,"yearSuffix");if(showMonthAfterYear){html += (secondary || !(changeMonth && changeYear)?"&#xa0;":"") + monthHtml;}html += "</div>"; // Close datepicker_header
return html;}, /* Adjust one of the date sub-fields. */_adjustInstDate:function _adjustInstDate(inst,offset,period){var year=inst.drawYear + (period === "Y"?offset:0),month=inst.drawMonth + (period === "M"?offset:0),day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month)) + (period === "D"?offset:0),date=this._restrictMinMax(inst,this._daylightSavingAdjust(new Date(year,month,day)));inst.selectedDay = date.getDate();inst.drawMonth = inst.selectedMonth = date.getMonth();inst.drawYear = inst.selectedYear = date.getFullYear();if(period === "M" || period === "Y"){this._notifyChange(inst);}}, /* Ensure a date is within any min/max bounds. */_restrictMinMax:function _restrictMinMax(inst,date){var minDate=this._getMinMaxDate(inst,"min"),maxDate=this._getMinMaxDate(inst,"max"),newDate=minDate && date < minDate?minDate:date;return maxDate && newDate > maxDate?maxDate:newDate;}, /* Notify change of month/year. */_notifyChange:function _notifyChange(inst){var onChange=this._get(inst,"onChangeMonthYear");if(onChange){onChange.apply(inst.input?inst.input[0]:null,[inst.selectedYear,inst.selectedMonth + 1,inst]);}}, /* Determine the number of months to show. */_getNumberOfMonths:function _getNumberOfMonths(inst){var numMonths=this._get(inst,"numberOfMonths");return numMonths == null?[1,1]:typeof numMonths === "number"?[1,numMonths]:numMonths;}, /* Determine the current maximum date - ensure no time components are set. */_getMinMaxDate:function _getMinMaxDate(inst,minMax){return this._determineDate(inst,this._get(inst,minMax + "Date"),null);}, /* Find the number of days in a given month. */_getDaysInMonth:function _getDaysInMonth(year,month){return 32 - this._daylightSavingAdjust(new Date(year,month,32)).getDate();}, /* Find the day of the week of the first of a month. */_getFirstDayOfMonth:function _getFirstDayOfMonth(year,month){return new Date(year,month,1).getDay();}, /* Determines if we should allow a "next/prev" month display change. */_canAdjustMonth:function _canAdjustMonth(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst),date=this._daylightSavingAdjust(new Date(curYear,curMonth + (offset < 0?offset:numMonths[0] * numMonths[1]),1));if(offset < 0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()));}return this._isInRange(inst,date);}, /* Is the given date in the accepted range? */_isInRange:function _isInRange(inst,date){var yearSplit,currentYear,minDate=this._getMinMaxDate(inst,"min"),maxDate=this._getMinMaxDate(inst,"max"),minYear=null,maxYear=null,years=this._get(inst,"yearRange");if(years){yearSplit = years.split(":");currentYear = new Date().getFullYear();minYear = parseInt(yearSplit[0],10);maxYear = parseInt(yearSplit[1],10);if(yearSplit[0].match(/[+\-].*/)){minYear += currentYear;}if(yearSplit[1].match(/[+\-].*/)){maxYear += currentYear;}}return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);}, /* Provide the configuration settings for formatting/parsing. */_getFormatConfig:function _getFormatConfig(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");shortYearCutoff = typeof shortYearCutoff !== "string"?shortYearCutoff:new Date().getFullYear() % 100 + parseInt(shortYearCutoff,10);return {shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")};}, /* Format the given date for display. */_formatDate:function _formatDate(inst,day,month,year){if(!day){inst.currentDay = inst.selectedDay;inst.currentMonth = inst.selectedMonth;inst.currentYear = inst.selectedYear;}var date=day?typeof day === "object"?day:this._daylightSavingAdjust(new Date(year,month,day)):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst));}}); /*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */function datepicker_bindHover(dpDiv){var selector="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return dpDiv.delegate(selector,"mouseout",function(){$(this).removeClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev") !== -1){$(this).removeClass("ui-datepicker-prev-hover");}if(this.className.indexOf("ui-datepicker-next") !== -1){$(this).removeClass("ui-datepicker-next-hover");}}).delegate(selector,"mouseover",datepicker_handleMouseover);}function datepicker_handleMouseover(){if(!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline?datepicker_instActive.dpDiv.parent()[0]:datepicker_instActive.input[0])){$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");$(this).addClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev") !== -1){$(this).addClass("ui-datepicker-prev-hover");}if(this.className.indexOf("ui-datepicker-next") !== -1){$(this).addClass("ui-datepicker-next-hover");}}} /* jQuery extend now ignores nulls! */function datepicker_extendRemove(target,props){$.extend(target,props);for(var name in props) {if(props[name] == null){target[name] = props[name];}}return target;} /* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */$.fn.datepicker = function(options){ /* Verify an empty collection wasn't passed - Fixes #6976 */if(!this.length){return this;} /* Initialise the date picker. */if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick);$.datepicker.initialized = true;} /* Append datepicker main container to body if not exist. */if($("#" + $.datepicker._mainDivId).length === 0){$("body").append($.datepicker.dpDiv);}var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")){return $.datepicker["_" + options + "Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs));}if(options === "option" && arguments.length === 2 && typeof arguments[1] === "string"){return $.datepicker["_" + options + "Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs));}return this.each(function(){typeof options === "string"?$.datepicker["_" + options + "Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options);});};$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;$.datepicker.uuid = new Date().getTime();$.datepicker.version = "1.11.4";var datepicker=$.datepicker; /*!
 * jQuery UI Dialog 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/dialog/
 */var dialog=$.widget("ui.dialog",{version:"1.11.4",options:{appendTo:"body",autoOpen:true,buttons:[],closeOnEscape:true,closeText:"Close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",of:window,collision:"fit", // Ensure the titlebar is always visible
using:function using(pos){var topOffset=$(this).css(pos).offset().top;if(topOffset < 0){$(this).css("top",pos.top - topOffset);}}},resizable:true,show:null,title:null,width:300, // callbacks
beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},resizableRelatedOptions:{maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},_create:function _create(){this.originalCss = {display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height};this.originalPosition = {parent:this.element.parent(),index:this.element.parent().children().index(this.element)};this.originalTitle = this.element.attr("title");this.options.title = this.options.title || this.originalTitle;this._createWrapper();this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);this._createTitlebar();this._createButtonPane();if(this.options.draggable && $.fn.draggable){this._makeDraggable();}if(this.options.resizable && $.fn.resizable){this._makeResizable();}this._isOpen = false;this._trackFocus();},_init:function _init(){if(this.options.autoOpen){this.open();}},_appendTo:function _appendTo(){var element=this.options.appendTo;if(element && (element.jquery || element.nodeType)){return $(element);}return this.document.find(element || "body").eq(0);},_destroy:function _destroy(){var next,originalPosition=this.originalPosition;this._untrackInstance();this._destroyOverlay();this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss) // Without detaching first, the following becomes really slow
.detach();this.uiDialog.stop(true,true).remove();if(this.originalTitle){this.element.attr("title",this.originalTitle);}next = originalPosition.parent.children().eq(originalPosition.index); // Don't try to place the dialog next to itself (#8613)
if(next.length && next[0] !== this.element[0]){next.before(this.element);}else {originalPosition.parent.append(this.element);}},widget:function widget(){return this.uiDialog;},disable:$.noop,enable:$.noop,close:function close(event){var activeElement,that=this;if(!this._isOpen || this._trigger("beforeClose",event) === false){return;}this._isOpen = false;this._focusedElement = null;this._destroyOverlay();this._untrackInstance();if(!this.opener.filter(":focusable").focus().length){ // support: IE9
// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
try{activeElement = this.document[0].activeElement; // Support: IE9, IE10
// If the <body> is blurred, IE will switch windows, see #4520
if(activeElement && activeElement.nodeName.toLowerCase() !== "body"){ // Hiding a focused element doesn't trigger blur in WebKit
// so in case we have nothing to focus on, explicitly blur the active element
// https://bugs.webkit.org/show_bug.cgi?id=47182
$(activeElement).blur();}}catch(error) {}}this._hide(this.uiDialog,this.options.hide,function(){that._trigger("close",event);});},isOpen:function isOpen(){return this._isOpen;},moveToTop:function moveToTop(){this._moveToTop();},_moveToTop:function _moveToTop(event,silent){var moved=false,zIndices=this.uiDialog.siblings(".ui-front:visible").map(function(){return +$(this).css("z-index");}).get(),zIndexMax=Math.max.apply(null,zIndices);if(zIndexMax >= +this.uiDialog.css("z-index")){this.uiDialog.css("z-index",zIndexMax + 1);moved = true;}if(moved && !silent){this._trigger("focus",event);}return moved;},open:function open(){var that=this;if(this._isOpen){if(this._moveToTop()){this._focusTabbable();}return;}this._isOpen = true;this.opener = $(this.document[0].activeElement);this._size();this._position();this._createOverlay();this._moveToTop(null,true); // Ensure the overlay is moved to the top with the dialog, but only when
// opening. The overlay shouldn't move after the dialog is open so that
// modeless dialogs opened after the modal dialog stack properly.
if(this.overlay){this.overlay.css("z-index",this.uiDialog.css("z-index") - 1);}this._show(this.uiDialog,this.options.show,function(){that._focusTabbable();that._trigger("focus");}); // Track the dialog immediately upon openening in case a focus event
// somehow occurs outside of the dialog before an element inside the
// dialog is focused (#10152)
this._makeFocusTarget();this._trigger("open");},_focusTabbable:function _focusTabbable(){ // Set focus to the first match:
// 1. An element that was focused previously
// 2. First element inside the dialog matching [autofocus]
// 3. Tabbable element inside the content element
// 4. Tabbable element inside the buttonpane
// 5. The close button
// 6. The dialog itself
var hasFocus=this._focusedElement;if(!hasFocus){hasFocus = this.element.find("[autofocus]");}if(!hasFocus.length){hasFocus = this.element.find(":tabbable");}if(!hasFocus.length){hasFocus = this.uiDialogButtonPane.find(":tabbable");}if(!hasFocus.length){hasFocus = this.uiDialogTitlebarClose.filter(":tabbable");}if(!hasFocus.length){hasFocus = this.uiDialog;}hasFocus.eq(0).focus();},_keepFocus:function _keepFocus(event){function checkFocus(){var activeElement=this.document[0].activeElement,isActive=this.uiDialog[0] === activeElement || $.contains(this.uiDialog[0],activeElement);if(!isActive){this._focusTabbable();}}event.preventDefault();checkFocus.call(this); // support: IE
// IE <= 8 doesn't prevent moving focus even with event.preventDefault()
// so we check again later
this._delay(checkFocus);},_createWrapper:function _createWrapper(){this.uiDialog = $("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({ // Setting tabIndex makes the div focusable
tabIndex:-1,role:"dialog"}).appendTo(this._appendTo());this._on(this.uiDialog,{keydown:function keydown(event){if(this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE){event.preventDefault();this.close(event);return;} // prevent tabbing out of dialogs
if(event.keyCode !== $.ui.keyCode.TAB || event.isDefaultPrevented()){return;}var tabbables=this.uiDialog.find(":tabbable"),first=tabbables.filter(":first"),last=tabbables.filter(":last");if((event.target === last[0] || event.target === this.uiDialog[0]) && !event.shiftKey){this._delay(function(){first.focus();});event.preventDefault();}else if((event.target === first[0] || event.target === this.uiDialog[0]) && event.shiftKey){this._delay(function(){last.focus();});event.preventDefault();}},mousedown:function mousedown(event){if(this._moveToTop(event)){this._focusTabbable();}}}); // We assume that any existing aria-describedby attribute means
// that the dialog content is marked up properly
// otherwise we brute force the content as the description
if(!this.element.find("[aria-describedby]").length){this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")});}},_createTitlebar:function _createTitlebar(){var uiDialogTitle;this.uiDialogTitlebar = $("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);this._on(this.uiDialogTitlebar,{mousedown:function mousedown(event){ // Don't prevent click on close button (#8838)
// Focusing a dialog that is partially scrolled out of view
// causes the browser to scroll it into view, preventing the click event
if(!$(event.target).closest(".ui-dialog-titlebar-close")){ // Dialog isn't getting focus when dragging (#8063)
this.uiDialog.focus();}}}); // support: IE
// Use type="button" to prevent enter keypresses in textboxes from closing the
// dialog in IE (#9312)
this.uiDialogTitlebarClose = $("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:false}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);this._on(this.uiDialogTitlebarClose,{click:function click(event){event.preventDefault();this.close(event);}});uiDialogTitle = $("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);this._title(uiDialogTitle);this.uiDialog.attr({"aria-labelledby":uiDialogTitle.attr("id")});},_title:function _title(title){if(!this.options.title){title.html("&#160;");}title.text(this.options.title);},_createButtonPane:function _createButtonPane(){this.uiDialogButtonPane = $("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");this.uiButtonSet = $("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);this._createButtons();},_createButtons:function _createButtons(){var that=this,buttons=this.options.buttons; // if we already have a button pane, remove it
this.uiDialogButtonPane.remove();this.uiButtonSet.empty();if($.isEmptyObject(buttons) || $.isArray(buttons) && !buttons.length){this.uiDialog.removeClass("ui-dialog-buttons");return;}$.each(buttons,function(name,props){var click,buttonOptions;props = $.isFunction(props)?{click:props,text:name}:props; // Default to a non-submitting button
props = $.extend({type:"button"},props); // Change the context for the click callback to be the main element
click = props.click;props.click = function(){click.apply(that.element[0],arguments);};buttonOptions = {icons:props.icons,text:props.showText};delete props.icons;delete props.showText;$("<button></button>",props).button(buttonOptions).appendTo(that.uiButtonSet);});this.uiDialog.addClass("ui-dialog-buttons");this.uiDialogButtonPane.appendTo(this.uiDialog);},_makeDraggable:function _makeDraggable(){var that=this,options=this.options;function filteredUi(ui){return {position:ui.position,offset:ui.offset};}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function start(event,ui){$(this).addClass("ui-dialog-dragging");that._blockFrames();that._trigger("dragStart",event,filteredUi(ui));},drag:function drag(event,ui){that._trigger("drag",event,filteredUi(ui));},stop:function stop(event,ui){var left=ui.offset.left - that.document.scrollLeft(),top=ui.offset.top - that.document.scrollTop();options.position = {my:"left top",at:"left" + (left >= 0?"+":"") + left + " " + "top" + (top >= 0?"+":"") + top,of:that.window};$(this).removeClass("ui-dialog-dragging");that._unblockFrames();that._trigger("dragStop",event,filteredUi(ui));}});},_makeResizable:function _makeResizable(){var that=this,options=this.options,handles=options.resizable, // .ui-resizable has position: relative defined in the stylesheet
// but dialogs have to use absolute or fixed positioning
position=this.uiDialog.css("position"),resizeHandles=typeof handles === "string"?handles:"n,e,s,w,se,sw,ne,nw";function filteredUi(ui){return {originalPosition:ui.originalPosition,originalSize:ui.originalSize,position:ui.position,size:ui.size};}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:options.maxWidth,maxHeight:options.maxHeight,minWidth:options.minWidth,minHeight:this._minHeight(),handles:resizeHandles,start:function start(event,ui){$(this).addClass("ui-dialog-resizing");that._blockFrames();that._trigger("resizeStart",event,filteredUi(ui));},resize:function resize(event,ui){that._trigger("resize",event,filteredUi(ui));},stop:function stop(event,ui){var offset=that.uiDialog.offset(),left=offset.left - that.document.scrollLeft(),top=offset.top - that.document.scrollTop();options.height = that.uiDialog.height();options.width = that.uiDialog.width();options.position = {my:"left top",at:"left" + (left >= 0?"+":"") + left + " " + "top" + (top >= 0?"+":"") + top,of:that.window};$(this).removeClass("ui-dialog-resizing");that._unblockFrames();that._trigger("resizeStop",event,filteredUi(ui));}}).css("position",position);},_trackFocus:function _trackFocus(){this._on(this.widget(),{focusin:function focusin(event){this._makeFocusTarget();this._focusedElement = $(event.target);}});},_makeFocusTarget:function _makeFocusTarget(){this._untrackInstance();this._trackingInstances().unshift(this);},_untrackInstance:function _untrackInstance(){var instances=this._trackingInstances(),exists=$.inArray(this,instances);if(exists !== -1){instances.splice(exists,1);}},_trackingInstances:function _trackingInstances(){var instances=this.document.data("ui-dialog-instances");if(!instances){instances = [];this.document.data("ui-dialog-instances",instances);}return instances;},_minHeight:function _minHeight(){var options=this.options;return options.height === "auto"?options.minHeight:Math.min(options.minHeight,options.height);},_position:function _position(){ // Need to show the dialog to get the actual offset in the position plugin
var isVisible=this.uiDialog.is(":visible");if(!isVisible){this.uiDialog.show();}this.uiDialog.position(this.options.position);if(!isVisible){this.uiDialog.hide();}},_setOptions:function _setOptions(options){var that=this,resize=false,resizableOptions={};$.each(options,function(key,value){that._setOption(key,value);if(key in that.sizeRelatedOptions){resize = true;}if(key in that.resizableRelatedOptions){resizableOptions[key] = value;}});if(resize){this._size();this._position();}if(this.uiDialog.is(":data(ui-resizable)")){this.uiDialog.resizable("option",resizableOptions);}},_setOption:function _setOption(key,value){var isDraggable,isResizable,uiDialog=this.uiDialog;if(key === "dialogClass"){uiDialog.removeClass(this.options.dialogClass).addClass(value);}if(key === "disabled"){return;}this._super(key,value);if(key === "appendTo"){this.uiDialog.appendTo(this._appendTo());}if(key === "buttons"){this._createButtons();}if(key === "closeText"){this.uiDialogTitlebarClose.button({ // Ensure that we always pass a string
label:"" + value});}if(key === "draggable"){isDraggable = uiDialog.is(":data(ui-draggable)");if(isDraggable && !value){uiDialog.draggable("destroy");}if(!isDraggable && value){this._makeDraggable();}}if(key === "position"){this._position();}if(key === "resizable"){ // currently resizable, becoming non-resizable
isResizable = uiDialog.is(":data(ui-resizable)");if(isResizable && !value){uiDialog.resizable("destroy");} // currently resizable, changing handles
if(isResizable && typeof value === "string"){uiDialog.resizable("option","handles",value);} // currently non-resizable, becoming resizable
if(!isResizable && value !== false){this._makeResizable();}}if(key === "title"){this._title(this.uiDialogTitlebar.find(".ui-dialog-title"));}},_size:function _size(){ // If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
// divs will both have width and height set, so we need to reset them
var nonContentHeight,minContentHeight,maxContentHeight,options=this.options; // Reset content sizing
this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0});if(options.minWidth > options.width){options.width = options.minWidth;} // reset wrapper sizing
// determine the height of all the non-content elements
nonContentHeight = this.uiDialog.css({height:"auto",width:options.width}).outerHeight();minContentHeight = Math.max(0,options.minHeight - nonContentHeight);maxContentHeight = typeof options.maxHeight === "number"?Math.max(0,options.maxHeight - nonContentHeight):"none";if(options.height === "auto"){this.element.css({minHeight:minContentHeight,maxHeight:maxContentHeight,height:"auto"});}else {this.element.height(Math.max(0,options.height - nonContentHeight));}if(this.uiDialog.is(":data(ui-resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight());}},_blockFrames:function _blockFrames(){this.iframeBlocks = this.document.find("iframe").map(function(){var iframe=$(this);return $("<div>").css({position:"absolute",width:iframe.outerWidth(),height:iframe.outerHeight()}).appendTo(iframe.parent()).offset(iframe.offset())[0];});},_unblockFrames:function _unblockFrames(){if(this.iframeBlocks){this.iframeBlocks.remove();delete this.iframeBlocks;}},_allowInteraction:function _allowInteraction(event){if($(event.target).closest(".ui-dialog").length){return true;} // TODO: Remove hack when datepicker implements
// the .ui-front logic (#8989)
return !!$(event.target).closest(".ui-datepicker").length;},_createOverlay:function _createOverlay(){if(!this.options.modal){return;} // We use a delay in case the overlay is created from an
// event that we're going to be cancelling (#2804)
var isOpening=true;this._delay(function(){isOpening = false;});if(!this.document.data("ui-dialog-overlays")){ // Prevent use of anchors and inputs
// Using _on() for an event handler shared across many instances is
// safe because the dialogs stack and must be closed in reverse order
this._on(this.document,{focusin:function focusin(event){if(isOpening){return;}if(!this._allowInteraction(event)){event.preventDefault();this._trackingInstances()[0]._focusTabbable();}}});}this.overlay = $("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());this._on(this.overlay,{mousedown:"_keepFocus"});this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays") || 0) + 1);},_destroyOverlay:function _destroyOverlay(){if(!this.options.modal){return;}if(this.overlay){var overlays=this.document.data("ui-dialog-overlays") - 1;if(!overlays){this.document.unbind("focusin").removeData("ui-dialog-overlays");}else {this.document.data("ui-dialog-overlays",overlays);}this.overlay.remove();this.overlay = null;}}}); /*!
 * jQuery UI Progressbar 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/progressbar/
 */var progressbar=$.widget("ui.progressbar",{version:"1.11.4",options:{max:100,value:0,change:null,complete:null},min:0,_create:function _create(){ // Constrain initial value
this.oldValue = this.options.value = this._constrainedValue();this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({ // Only set static values, aria-valuenow and aria-valuemax are
// set inside _refreshValue()
role:"progressbar","aria-valuemin":this.min});this.valueDiv = $("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);this._refreshValue();},_destroy:function _destroy(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");this.valueDiv.remove();},value:function value(newValue){if(newValue === undefined){return this.options.value;}this.options.value = this._constrainedValue(newValue);this._refreshValue();},_constrainedValue:function _constrainedValue(newValue){if(newValue === undefined){newValue = this.options.value;}this.indeterminate = newValue === false; // sanitize value
if(typeof newValue !== "number"){newValue = 0;}return this.indeterminate?false:Math.min(this.options.max,Math.max(this.min,newValue));},_setOptions:function _setOptions(options){ // Ensure "value" option is set after other values (like max)
var value=options.value;delete options.value;this._super(options);this.options.value = this._constrainedValue(value);this._refreshValue();},_setOption:function _setOption(key,value){if(key === "max"){ // Don't allow a max less than min
value = Math.max(this.min,value);}if(key === "disabled"){this.element.toggleClass("ui-state-disabled",!!value).attr("aria-disabled",value);}this._super(key,value);},_percentage:function _percentage(){return this.indeterminate?100:100 * (this.options.value - this.min) / (this.options.max - this.min);},_refreshValue:function _refreshValue(){var value=this.options.value,percentage=this._percentage();this.valueDiv.toggle(this.indeterminate || value > this.min).toggleClass("ui-corner-right",value === this.options.max).width(percentage.toFixed(0) + "%");this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate);if(this.indeterminate){this.element.removeAttr("aria-valuenow");if(!this.overlayDiv){this.overlayDiv = $("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv);}}else {this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":value});if(this.overlayDiv){this.overlayDiv.remove();this.overlayDiv = null;}}if(this.oldValue !== value){this.oldValue = value;this._trigger("change");}if(value === this.options.max){this._trigger("complete");}}}); /*!
 * jQuery UI Selectmenu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectmenu
 */var selectmenu=$.widget("ui.selectmenu",{version:"1.11.4",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null, // callbacks
change:null,close:null,focus:null,open:null,select:null},_create:function _create(){var selectmenuId=this.element.uniqueId().attr("id");this.ids = {element:selectmenuId,button:selectmenuId + "-button",menu:selectmenuId + "-menu"};this._drawButton();this._drawMenu();if(this.options.disabled){this.disable();}},_drawButton:function _drawButton(){var that=this; // Associate existing label with the new button
this.label = $("label[for='" + this.ids.element + "']").attr("for",this.ids.button);this._on(this.label,{click:function click(event){this.button.focus();event.preventDefault();}}); // Hide original select element
this.element.hide(); // Create button
this.button = $("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element);$("<span>",{"class":"ui-icon " + this.options.icons.button}).prependTo(this.button);this.buttonText = $("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button);this._setText(this.buttonText,this.element.find("option:selected").text());this._resizeButton();this._on(this.button,this._buttonEvents);this.button.one("focusin",function(){ // Delay rendering the menu items until the button receives focus.
// The menu may have already been rendered via a programmatic open.
if(!that.menuItems){that._refreshMenu();}});this._hoverable(this.button);this._focusable(this.button);},_drawMenu:function _drawMenu(){var that=this; // Create menu
this.menu = $("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}); // Wrap menu
this.menuWrap = $("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()); // Initialize menu widget
this.menuInstance = this.menu.menu({role:"listbox",select:function select(event,ui){event.preventDefault(); // support: IE8
// If the item was selected via a click, the text selection
// will be destroyed in IE
that._setSelection();that._select(ui.item.data("ui-selectmenu-item"),event);},focus:function focus(event,ui){var item=ui.item.data("ui-selectmenu-item"); // Prevent inital focus from firing and check if its a newly focused item
if(that.focusIndex != null && item.index !== that.focusIndex){that._trigger("focus",event,{item:item});if(!that.isOpen){that._select(item,event);}}that.focusIndex = item.index;that.button.attr("aria-activedescendant",that.menuItems.eq(item.index).attr("id"));}}).menu("instance"); // Adjust menu styles to dropdown
this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"); // Don't close the menu on mouseleave
this.menuInstance._off(this.menu,"mouseleave"); // Cancel the menu's collapseAll on document click
this.menuInstance._closeOnDocumentClick = function(){return false;}; // Selects often contain empty items, but never contain dividers
this.menuInstance._isDivider = function(){return false;};},refresh:function refresh(){this._refreshMenu();this._setText(this.buttonText,this._getSelectedItem().text());if(!this.options.width){this._resizeButton();}},_refreshMenu:function _refreshMenu(){this.menu.empty();var item,options=this.element.find("option");if(!options.length){return;}this._parseOptions(options);this._renderMenu(this.menu,this.items);this.menuInstance.refresh();this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup");item = this._getSelectedItem(); // Update the menu to have the correct item focused
this.menuInstance.focus(null,item);this._setAria(item.data("ui-selectmenu-item")); // Set disabled state
this._setOption("disabled",this.element.prop("disabled"));},open:function open(event){if(this.options.disabled){return;} // If this is the first time the menu is being opened, render the items
if(!this.menuItems){this._refreshMenu();}else { // Menu clears focus on close, reset focus to selected item
this.menu.find(".ui-state-focus").removeClass("ui-state-focus");this.menuInstance.focus(null,this._getSelectedItem());}this.isOpen = true;this._toggleAttr();this._resizeMenu();this._position();this._on(this.document,this._documentClick);this._trigger("open",event);},_position:function _position(){this.menuWrap.position($.extend({of:this.button},this.options.position));},close:function close(event){if(!this.isOpen){return;}this.isOpen = false;this._toggleAttr();this.range = null;this._off(this.document);this._trigger("close",event);},widget:function widget(){return this.button;},menuWidget:function menuWidget(){return this.menu;},_renderMenu:function _renderMenu(ul,items){var that=this,currentOptgroup="";$.each(items,function(index,item){if(item.optgroup !== currentOptgroup){$("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider" + (item.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:item.optgroup}).appendTo(ul);currentOptgroup = item.optgroup;}that._renderItemData(ul,item);});},_renderItemData:function _renderItemData(ul,item){return this._renderItem(ul,item).data("ui-selectmenu-item",item);},_renderItem:function _renderItem(ul,item){var li=$("<li>");if(item.disabled){li.addClass("ui-state-disabled");}this._setText(li,item.label);return li.appendTo(ul);},_setText:function _setText(element,value){if(value){element.text(value);}else {element.html("&#160;");}},_move:function _move(direction,event){var item,next,filter=".ui-menu-item";if(this.isOpen){item = this.menuItems.eq(this.focusIndex);}else {item = this.menuItems.eq(this.element[0].selectedIndex);filter += ":not(.ui-state-disabled)";}if(direction === "first" || direction === "last"){next = item[direction === "first"?"prevAll":"nextAll"](filter).eq(-1);}else {next = item[direction + "All"](filter).eq(0);}if(next.length){this.menuInstance.focus(event,next);}},_getSelectedItem:function _getSelectedItem(){return this.menuItems.eq(this.element[0].selectedIndex);},_toggle:function _toggle(event){this[this.isOpen?"close":"open"](event);},_setSelection:function _setSelection(){var selection;if(!this.range){return;}if(window.getSelection){selection = window.getSelection();selection.removeAllRanges();selection.addRange(this.range); // support: IE8
}else {this.range.select();} // support: IE
// Setting the text selection kills the button focus in IE, but
// restoring the focus doesn't kill the selection.
this.button.focus();},_documentClick:{mousedown:function mousedown(event){if(!this.isOpen){return;}if(!$(event.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length){this.close(event);}}},_buttonEvents:{ // Prevent text selection from being reset when interacting with the selectmenu (#10144)
mousedown:function mousedown(){var selection;if(window.getSelection){selection = window.getSelection();if(selection.rangeCount){this.range = selection.getRangeAt(0);} // support: IE8
}else {this.range = document.selection.createRange();}},click:function click(event){this._setSelection();this._toggle(event);},keydown:function keydown(event){var preventDefault=true;switch(event.keyCode){case $.ui.keyCode.TAB:case $.ui.keyCode.ESCAPE:this.close(event);preventDefault = false;break;case $.ui.keyCode.ENTER:if(this.isOpen){this._selectFocusedItem(event);}break;case $.ui.keyCode.UP:if(event.altKey){this._toggle(event);}else {this._move("prev",event);}break;case $.ui.keyCode.DOWN:if(event.altKey){this._toggle(event);}else {this._move("next",event);}break;case $.ui.keyCode.SPACE:if(this.isOpen){this._selectFocusedItem(event);}else {this._toggle(event);}break;case $.ui.keyCode.LEFT:this._move("prev",event);break;case $.ui.keyCode.RIGHT:this._move("next",event);break;case $.ui.keyCode.HOME:case $.ui.keyCode.PAGE_UP:this._move("first",event);break;case $.ui.keyCode.END:case $.ui.keyCode.PAGE_DOWN:this._move("last",event);break;default:this.menu.trigger(event);preventDefault = false;}if(preventDefault){event.preventDefault();}}},_selectFocusedItem:function _selectFocusedItem(event){var item=this.menuItems.eq(this.focusIndex);if(!item.hasClass("ui-state-disabled")){this._select(item.data("ui-selectmenu-item"),event);}},_select:function _select(item,event){var oldIndex=this.element[0].selectedIndex; // Change native select element
this.element[0].selectedIndex = item.index;this._setText(this.buttonText,item.label);this._setAria(item);this._trigger("select",event,{item:item});if(item.index !== oldIndex){this._trigger("change",event,{item:item});}this.close(event);},_setAria:function _setAria(item){var id=this.menuItems.eq(item.index).attr("id");this.button.attr({"aria-labelledby":id,"aria-activedescendant":id});this.menu.attr("aria-activedescendant",id);},_setOption:function _setOption(key,value){if(key === "icons"){this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(value.button);}this._super(key,value);if(key === "appendTo"){this.menuWrap.appendTo(this._appendTo());}if(key === "disabled"){this.menuInstance.option("disabled",value);this.button.toggleClass("ui-state-disabled",value).attr("aria-disabled",value);this.element.prop("disabled",value);if(value){this.button.attr("tabindex",-1);this.close();}else {this.button.attr("tabindex",0);}}if(key === "width"){this._resizeButton();}},_appendTo:function _appendTo(){var element=this.options.appendTo;if(element){element = element.jquery || element.nodeType?$(element):this.document.find(element).eq(0);}if(!element || !element[0]){element = this.element.closest(".ui-front");}if(!element.length){element = this.document[0].body;}return element;},_toggleAttr:function _toggleAttr(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen);this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen);this.menu.attr("aria-hidden",!this.isOpen);},_resizeButton:function _resizeButton(){var width=this.options.width;if(!width){width = this.element.show().outerWidth();this.element.hide();}this.button.outerWidth(width);},_resizeMenu:function _resizeMenu(){this.menu.outerWidth(Math.max(this.button.outerWidth(), // support: IE10
// IE10 wraps long text (possibly a rounding bug)
// so we add 1px to avoid the wrapping
this.menu.width("").outerWidth() + 1));},_getCreateOptions:function _getCreateOptions(){return {disabled:this.element.prop("disabled")};},_parseOptions:function _parseOptions(options){var data=[];options.each(function(index,item){var option=$(item),optgroup=option.parent("optgroup");data.push({element:option,index:index,value:option.val(),label:option.text(),optgroup:optgroup.attr("label") || "",disabled:optgroup.prop("disabled") || option.prop("disabled")});});this.items = data;},_destroy:function _destroy(){this.menuWrap.remove();this.button.remove();this.element.show();this.element.removeUniqueId();this.label.attr("for",this.ids.element);}}); /*!
 * jQuery UI Slider 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 */var slider=$.widget("ui.slider",$.ui.mouse,{version:"1.11.4",widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null, // callbacks
change:null,slide:null,start:null,stop:null}, // number of pages in a slider
// (how many times can you page up/down to go through the whole range)
numPages:5,_create:function _create(){this._keySliding = false;this._mouseSliding = false;this._animateOff = true;this._handleIndex = null;this._detectOrientation();this._mouseInit();this._calculateNewMax();this.element.addClass("ui-slider" + " ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all");this._refresh();this._setOption("disabled",this.options.disabled);this._animateOff = false;},_refresh:function _refresh(){this._createRange();this._createHandles();this._setupEvents();this._refreshValue();},_createHandles:function _createHandles(){var i,handleCount,options=this.options,existingHandles=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),handle="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",handles=[];handleCount = options.values && options.values.length || 1;if(existingHandles.length > handleCount){existingHandles.slice(handleCount).remove();existingHandles = existingHandles.slice(0,handleCount);}for(i = existingHandles.length;i < handleCount;i++) {handles.push(handle);}this.handles = existingHandles.add($(handles.join("")).appendTo(this.element));this.handle = this.handles.eq(0);this.handles.each(function(i){$(this).data("ui-slider-handle-index",i);});},_createRange:function _createRange(){var options=this.options,classes="";if(options.range){if(options.range === true){if(!options.values){options.values = [this._valueMin(),this._valueMin()];}else if(options.values.length && options.values.length !== 2){options.values = [options.values[0],options.values[0]];}else if($.isArray(options.values)){options.values = options.values.slice(0);}}if(!this.range || !this.range.length){this.range = $("<div></div>").appendTo(this.element);classes = "ui-slider-range" +  // note: this isn't the most fittingly semantic framework class for this element,
// but worked best visually with a variety of themes
" ui-widget-header ui-corner-all";}else {this.range.removeClass("ui-slider-range-min ui-slider-range-max") // Handle range switching from true to min/max
.css({"left":"","bottom":""});}this.range.addClass(classes + (options.range === "min" || options.range === "max"?" ui-slider-range-" + options.range:""));}else {if(this.range){this.range.remove();}this.range = null;}},_setupEvents:function _setupEvents(){this._off(this.handles);this._on(this.handles,this._handleEvents);this._hoverable(this.handles);this._focusable(this.handles);},_destroy:function _destroy(){this.handles.remove();if(this.range){this.range.remove();}this.element.removeClass("ui-slider" + " ui-slider-horizontal" + " ui-slider-vertical" + " ui-widget" + " ui-widget-content" + " ui-corner-all");this._mouseDestroy();},_mouseCapture:function _mouseCapture(event){var position,normValue,distance,closestHandle,index,allowed,offset,mouseOverHandle,that=this,o=this.options;if(o.disabled){return false;}this.elementSize = {width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset = this.element.offset();position = {x:event.pageX,y:event.pageY};normValue = this._normValueFromMouse(position);distance = this._valueMax() - this._valueMin() + 1;this.handles.each(function(i){var thisDistance=Math.abs(normValue - that.values(i));if(distance > thisDistance || distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min)){distance = thisDistance;closestHandle = $(this);index = i;}});allowed = this._start(event,index);if(allowed === false){return false;}this._mouseSliding = true;this._handleIndex = index;closestHandle.addClass("ui-state-active").focus();offset = closestHandle.offset();mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle");this._clickOffset = mouseOverHandle?{left:0,top:0}:{left:event.pageX - offset.left - closestHandle.width() / 2,top:event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"),10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"),10) || 0) + (parseInt(closestHandle.css("marginTop"),10) || 0)};if(!this.handles.hasClass("ui-state-hover")){this._slide(event,index,normValue);}this._animateOff = true;return true;},_mouseStart:function _mouseStart(){return true;},_mouseDrag:function _mouseDrag(event){var position={x:event.pageX,y:event.pageY},normValue=this._normValueFromMouse(position);this._slide(event,this._handleIndex,normValue);return false;},_mouseStop:function _mouseStop(event){this.handles.removeClass("ui-state-active");this._mouseSliding = false;this._stop(event,this._handleIndex);this._change(event,this._handleIndex);this._handleIndex = null;this._clickOffset = null;this._animateOff = false;return false;},_detectOrientation:function _detectOrientation(){this.orientation = this.options.orientation === "vertical"?"vertical":"horizontal";},_normValueFromMouse:function _normValueFromMouse(position){var pixelTotal,pixelMouse,percentMouse,valueTotal,valueMouse;if(this.orientation === "horizontal"){pixelTotal = this.elementSize.width;pixelMouse = position.x - this.elementOffset.left - (this._clickOffset?this._clickOffset.left:0);}else {pixelTotal = this.elementSize.height;pixelMouse = position.y - this.elementOffset.top - (this._clickOffset?this._clickOffset.top:0);}percentMouse = pixelMouse / pixelTotal;if(percentMouse > 1){percentMouse = 1;}if(percentMouse < 0){percentMouse = 0;}if(this.orientation === "vertical"){percentMouse = 1 - percentMouse;}valueTotal = this._valueMax() - this._valueMin();valueMouse = this._valueMin() + percentMouse * valueTotal;return this._trimAlignValue(valueMouse);},_start:function _start(event,index){var uiHash={handle:this.handles[index],value:this.value()};if(this.options.values && this.options.values.length){uiHash.value = this.values(index);uiHash.values = this.values();}return this._trigger("start",event,uiHash);},_slide:function _slide(event,index,newVal){var otherVal,newValues,allowed;if(this.options.values && this.options.values.length){otherVal = this.values(index?0:1);if(this.options.values.length === 2 && this.options.range === true && (index === 0 && newVal > otherVal || index === 1 && newVal < otherVal)){newVal = otherVal;}if(newVal !== this.values(index)){newValues = this.values();newValues[index] = newVal; // A slide can be canceled by returning false from the slide callback
allowed = this._trigger("slide",event,{handle:this.handles[index],value:newVal,values:newValues});otherVal = this.values(index?0:1);if(allowed !== false){this.values(index,newVal);}}}else {if(newVal !== this.value()){ // A slide can be canceled by returning false from the slide callback
allowed = this._trigger("slide",event,{handle:this.handles[index],value:newVal});if(allowed !== false){this.value(newVal);}}}},_stop:function _stop(event,index){var uiHash={handle:this.handles[index],value:this.value()};if(this.options.values && this.options.values.length){uiHash.value = this.values(index);uiHash.values = this.values();}this._trigger("stop",event,uiHash);},_change:function _change(event,index){if(!this._keySliding && !this._mouseSliding){var uiHash={handle:this.handles[index],value:this.value()};if(this.options.values && this.options.values.length){uiHash.value = this.values(index);uiHash.values = this.values();} //store the last changed value index for reference when handles overlap
this._lastChangedValue = index;this._trigger("change",event,uiHash);}},value:function value(newValue){if(arguments.length){this.options.value = this._trimAlignValue(newValue);this._refreshValue();this._change(null,0);return;}return this._value();},values:function values(index,newValue){var vals,newValues,i;if(arguments.length > 1){this.options.values[index] = this._trimAlignValue(newValue);this._refreshValue();this._change(null,index);return;}if(arguments.length){if($.isArray(arguments[0])){vals = this.options.values;newValues = arguments[0];for(i = 0;i < vals.length;i += 1) {vals[i] = this._trimAlignValue(newValues[i]);this._change(null,i);}this._refreshValue();}else {if(this.options.values && this.options.values.length){return this._values(index);}else {return this.value();}}}else {return this._values();}},_setOption:function _setOption(key,value){var i,valsLength=0;if(key === "range" && this.options.range === true){if(value === "min"){this.options.value = this._values(0);this.options.values = null;}else if(value === "max"){this.options.value = this._values(this.options.values.length - 1);this.options.values = null;}}if($.isArray(this.options.values)){valsLength = this.options.values.length;}if(key === "disabled"){this.element.toggleClass("ui-state-disabled",!!value);}this._super(key,value);switch(key){case "orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);this._refreshValue(); // Reset positioning from previous orientation
this.handles.css(value === "horizontal"?"bottom":"left","");break;case "value":this._animateOff = true;this._refreshValue();this._change(null,0);this._animateOff = false;break;case "values":this._animateOff = true;this._refreshValue();for(i = 0;i < valsLength;i += 1) {this._change(null,i);}this._animateOff = false;break;case "step":case "min":case "max":this._animateOff = true;this._calculateNewMax();this._refreshValue();this._animateOff = false;break;case "range":this._animateOff = true;this._refresh();this._animateOff = false;break;}}, //internal value getter
// _value() returns value trimmed by min and max, aligned by step
_value:function _value(){var val=this.options.value;val = this._trimAlignValue(val);return val;}, //internal values getter
// _values() returns array of values trimmed by min and max, aligned by step
// _values( index ) returns single value trimmed by min and max, aligned by step
_values:function _values(index){var val,vals,i;if(arguments.length){val = this.options.values[index];val = this._trimAlignValue(val);return val;}else if(this.options.values && this.options.values.length){ // .slice() creates a copy of the array
// this copy gets trimmed by min and max and then returned
vals = this.options.values.slice();for(i = 0;i < vals.length;i += 1) {vals[i] = this._trimAlignValue(vals[i]);}return vals;}else {return [];}}, // returns the step-aligned value that val is closest to, between (inclusive) min and max
_trimAlignValue:function _trimAlignValue(val){if(val <= this._valueMin()){return this._valueMin();}if(val >= this._valueMax()){return this._valueMax();}var step=this.options.step > 0?this.options.step:1,valModStep=(val - this._valueMin()) % step,alignValue=val - valModStep;if(Math.abs(valModStep) * 2 >= step){alignValue += valModStep > 0?step:-step;} // Since JavaScript has problems with large floats, round
// the final value to 5 digits after the decimal point (see #4124)
return parseFloat(alignValue.toFixed(5));},_calculateNewMax:function _calculateNewMax(){var max=this.options.max,min=this._valueMin(),step=this.options.step,aboveMin=Math.floor(+(max - min).toFixed(this._precision()) / step) * step;max = aboveMin + min;this.max = parseFloat(max.toFixed(this._precision()));},_precision:function _precision(){var precision=this._precisionOf(this.options.step);if(this.options.min !== null){precision = Math.max(precision,this._precisionOf(this.options.min));}return precision;},_precisionOf:function _precisionOf(num){var str=num.toString(),decimal=str.indexOf(".");return decimal === -1?0:str.length - decimal - 1;},_valueMin:function _valueMin(){return this.options.min;},_valueMax:function _valueMax(){return this.max;},_refreshValue:function _refreshValue(){var lastValPercent,valPercent,value,valueMin,valueMax,oRange=this.options.range,o=this.options,that=this,animate=!this._animateOff?o.animate:false,_set={};if(this.options.values && this.options.values.length){this.handles.each(function(i){valPercent = (that.values(i) - that._valueMin()) / (that._valueMax() - that._valueMin()) * 100;_set[that.orientation === "horizontal"?"left":"bottom"] = valPercent + "%";$(this).stop(1,1)[animate?"animate":"css"](_set,o.animate);if(that.options.range === true){if(that.orientation === "horizontal"){if(i === 0){that.range.stop(1,1)[animate?"animate":"css"]({left:valPercent + "%"},o.animate);}if(i === 1){that.range[animate?"animate":"css"]({width:valPercent - lastValPercent + "%"},{queue:false,duration:o.animate});}}else {if(i === 0){that.range.stop(1,1)[animate?"animate":"css"]({bottom:valPercent + "%"},o.animate);}if(i === 1){that.range[animate?"animate":"css"]({height:valPercent - lastValPercent + "%"},{queue:false,duration:o.animate});}}}lastValPercent = valPercent;});}else {value = this.value();valueMin = this._valueMin();valueMax = this._valueMax();valPercent = valueMax !== valueMin?(value - valueMin) / (valueMax - valueMin) * 100:0;_set[this.orientation === "horizontal"?"left":"bottom"] = valPercent + "%";this.handle.stop(1,1)[animate?"animate":"css"](_set,o.animate);if(oRange === "min" && this.orientation === "horizontal"){this.range.stop(1,1)[animate?"animate":"css"]({width:valPercent + "%"},o.animate);}if(oRange === "max" && this.orientation === "horizontal"){this.range[animate?"animate":"css"]({width:100 - valPercent + "%"},{queue:false,duration:o.animate});}if(oRange === "min" && this.orientation === "vertical"){this.range.stop(1,1)[animate?"animate":"css"]({height:valPercent + "%"},o.animate);}if(oRange === "max" && this.orientation === "vertical"){this.range[animate?"animate":"css"]({height:100 - valPercent + "%"},{queue:false,duration:o.animate});}}},_handleEvents:{keydown:function keydown(event){var allowed,curVal,newVal,step,index=$(event.target).data("ui-slider-handle-index");switch(event.keyCode){case $.ui.keyCode.HOME:case $.ui.keyCode.END:case $.ui.keyCode.PAGE_UP:case $.ui.keyCode.PAGE_DOWN:case $.ui.keyCode.UP:case $.ui.keyCode.RIGHT:case $.ui.keyCode.DOWN:case $.ui.keyCode.LEFT:event.preventDefault();if(!this._keySliding){this._keySliding = true;$(event.target).addClass("ui-state-active");allowed = this._start(event,index);if(allowed === false){return;}}break;}step = this.options.step;if(this.options.values && this.options.values.length){curVal = newVal = this.values(index);}else {curVal = newVal = this.value();}switch(event.keyCode){case $.ui.keyCode.HOME:newVal = this._valueMin();break;case $.ui.keyCode.END:newVal = this._valueMax();break;case $.ui.keyCode.PAGE_UP:newVal = this._trimAlignValue(curVal + (this._valueMax() - this._valueMin()) / this.numPages);break;case $.ui.keyCode.PAGE_DOWN:newVal = this._trimAlignValue(curVal - (this._valueMax() - this._valueMin()) / this.numPages);break;case $.ui.keyCode.UP:case $.ui.keyCode.RIGHT:if(curVal === this._valueMax()){return;}newVal = this._trimAlignValue(curVal + step);break;case $.ui.keyCode.DOWN:case $.ui.keyCode.LEFT:if(curVal === this._valueMin()){return;}newVal = this._trimAlignValue(curVal - step);break;}this._slide(event,index,newVal);},keyup:function keyup(event){var index=$(event.target).data("ui-slider-handle-index");if(this._keySliding){this._keySliding = false;this._stop(event,index);this._change(event,index);$(event.target).removeClass("ui-state-active");}}}}); /*!
 * jQuery UI Spinner 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/spinner/
 */function spinner_modifier(fn){return function(){var previous=this.element.val();fn.apply(this,arguments);this._refresh();if(previous !== this.element.val()){this._trigger("change");}};}var spinner=$.widget("ui.spinner",{version:"1.11.4",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:true,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function _create(){ // handle string values that need to be parsed
this._setOption("max",this.options.max);this._setOption("min",this.options.min);this._setOption("step",this.options.step); // Only format if there is a value, prevents the field from being marked
// as invalid in Firefox, see #9573.
if(this.value() !== ""){ // Format the value, but don't constrain.
this._value(this.element.val(),true);}this._draw();this._on(this._events);this._refresh(); // turning off autocomplete prevents the browser from remembering the
// value when navigating through history, so we re-enable autocomplete
// if the page is unloaded before the widget is destroyed. #7790
this._on(this.window,{beforeunload:function beforeunload(){this.element.removeAttr("autocomplete");}});},_getCreateOptions:function _getCreateOptions(){var options={},element=this.element;$.each(["min","max","step"],function(i,option){var value=element.attr(option);if(value !== undefined && value.length){options[option] = value;}});return options;},_events:{keydown:function keydown(event){if(this._start(event) && this._keydown(event)){event.preventDefault();}},keyup:"_stop",focus:function focus(){this.previous = this.element.val();},blur:function blur(event){if(this.cancelBlur){delete this.cancelBlur;return;}this._stop();this._refresh();if(this.previous !== this.element.val()){this._trigger("change",event);}},mousewheel:function mousewheel(event,delta){if(!delta){return;}if(!this.spinning && !this._start(event)){return false;}this._spin((delta > 0?1:-1) * this.options.step,event);clearTimeout(this.mousewheelTimer);this.mousewheelTimer = this._delay(function(){if(this.spinning){this._stop(event);}},100);event.preventDefault();},"mousedown .ui-spinner-button":function mousedownUiSpinnerButton(event){var previous; // We never want the buttons to have focus; whenever the user is
// interacting with the spinner, the focus should be on the input.
// If the input is focused then this.previous is properly set from
// when the input first received focus. If the input is not focused
// then we need to set this.previous based on the value before spinning.
previous = this.element[0] === this.document[0].activeElement?this.previous:this.element.val();function checkFocus(){var isActive=this.element[0] === this.document[0].activeElement;if(!isActive){this.element.focus();this.previous = previous; // support: IE
// IE sets focus asynchronously, so we need to check if focus
// moved off of the input because the user clicked on the button.
this._delay(function(){this.previous = previous;});}} // ensure focus is on (or stays on) the text field
event.preventDefault();checkFocus.call(this); // support: IE
// IE doesn't prevent moving focus even with event.preventDefault()
// so we set a flag to know when we should ignore the blur event
// and check (again) if focus moved off of the input.
this.cancelBlur = true;this._delay(function(){delete this.cancelBlur;checkFocus.call(this);});if(this._start(event) === false){return;}this._repeat(null,$(event.currentTarget).hasClass("ui-spinner-up")?1:-1,event);},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function mouseenterUiSpinnerButton(event){ // button will add ui-state-active if mouse was down while mouseleave and kept down
if(!$(event.currentTarget).hasClass("ui-state-active")){return;}if(this._start(event) === false){return false;}this._repeat(null,$(event.currentTarget).hasClass("ui-spinner-up")?1:-1,event);}, // TODO: do we really want to consider this a stop?
// shouldn't we just stop the repeater and wait until mouseup before
// we trigger the stop event?
"mouseleave .ui-spinner-button":"_stop"},_draw:function _draw(){var uiSpinner=this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent() // add buttons
.append(this._buttonHtml());this.element.attr("role","spinbutton"); // button bindings
this.buttons = uiSpinner.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"); // IE 6 doesn't understand height: 50% for the buttons
// unless the wrapper has an explicit height
if(this.buttons.height() > Math.ceil(uiSpinner.height() * 0.5) && uiSpinner.height() > 0){uiSpinner.height(uiSpinner.height());} // disable spinner if element was already disabled
if(this.options.disabled){this.disable();}},_keydown:function _keydown(event){var options=this.options,keyCode=$.ui.keyCode;switch(event.keyCode){case keyCode.UP:this._repeat(null,1,event);return true;case keyCode.DOWN:this._repeat(null,-1,event);return true;case keyCode.PAGE_UP:this._repeat(null,options.page,event);return true;case keyCode.PAGE_DOWN:this._repeat(null,-options.page,event);return true;}return false;},_uiSpinnerHtml:function _uiSpinnerHtml(){return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";},_buttonHtml:function _buttonHtml(){return "" + "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>" + "<span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>";},_start:function _start(event){if(!this.spinning && this._trigger("start",event) === false){return false;}if(!this.counter){this.counter = 1;}this.spinning = true;return true;},_repeat:function _repeat(i,steps,event){i = i || 500;clearTimeout(this.timer);this.timer = this._delay(function(){this._repeat(40,steps,event);},i);this._spin(steps * this.options.step,event);},_spin:function _spin(step,event){var value=this.value() || 0;if(!this.counter){this.counter = 1;}value = this._adjustValue(value + step * this._increment(this.counter));if(!this.spinning || this._trigger("spin",event,{value:value}) !== false){this._value(value);this.counter++;}},_increment:function _increment(i){var incremental=this.options.incremental;if(incremental){return $.isFunction(incremental)?incremental(i):Math.floor(i * i * i / 50000 - i * i / 500 + 17 * i / 200 + 1);}return 1;},_precision:function _precision(){var precision=this._precisionOf(this.options.step);if(this.options.min !== null){precision = Math.max(precision,this._precisionOf(this.options.min));}return precision;},_precisionOf:function _precisionOf(num){var str=num.toString(),decimal=str.indexOf(".");return decimal === -1?0:str.length - decimal - 1;},_adjustValue:function _adjustValue(value){var base,aboveMin,options=this.options; // make sure we're at a valid step
// - find out where we are relative to the base (min or 0)
base = options.min !== null?options.min:0;aboveMin = value - base; // - round to the nearest step
aboveMin = Math.round(aboveMin / options.step) * options.step; // - rounding is based on 0, so adjust back to our base
value = base + aboveMin; // fix precision from bad JS floating point math
value = parseFloat(value.toFixed(this._precision())); // clamp the value
if(options.max !== null && value > options.max){return options.max;}if(options.min !== null && value < options.min){return options.min;}return value;},_stop:function _stop(event){if(!this.spinning){return;}clearTimeout(this.timer);clearTimeout(this.mousewheelTimer);this.counter = 0;this.spinning = false;this._trigger("stop",event);},_setOption:function _setOption(key,value){if(key === "culture" || key === "numberFormat"){var prevValue=this._parse(this.element.val());this.options[key] = value;this.element.val(this._format(prevValue));return;}if(key === "max" || key === "min" || key === "step"){if(typeof value === "string"){value = this._parse(value);}}if(key === "icons"){this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(value.up);this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(value.down);}this._super(key,value);if(key === "disabled"){this.widget().toggleClass("ui-state-disabled",!!value);this.element.prop("disabled",!!value);this.buttons.button(value?"disable":"enable");}},_setOptions:spinner_modifier(function(options){this._super(options);}),_parse:function _parse(val){if(typeof val === "string" && val !== ""){val = window.Globalize && this.options.numberFormat?Globalize.parseFloat(val,10,this.options.culture):+val;}return val === "" || isNaN(val)?null:val;},_format:function _format(value){if(value === ""){return "";}return window.Globalize && this.options.numberFormat?Globalize.format(value,this.options.numberFormat,this.options.culture):value;},_refresh:function _refresh(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max, // TODO: what should we do with values that can't be parsed?
"aria-valuenow":this._parse(this.element.val())});},isValid:function isValid(){var value=this.value(); // null is invalid
if(value === null){return false;} // if value gets adjusted, it's invalid
return value === this._adjustValue(value);}, // update the value without triggering change
_value:function _value(value,allowAny){var parsed;if(value !== ""){parsed = this._parse(value);if(parsed !== null){if(!allowAny){parsed = this._adjustValue(parsed);}value = this._format(parsed);}}this.element.val(value);this._refresh();},_destroy:function _destroy(){this.element.removeClass("ui-spinner-input").prop("disabled",false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");this.uiSpinner.replaceWith(this.element);},stepUp:spinner_modifier(function(steps){this._stepUp(steps);}),_stepUp:function _stepUp(steps){if(this._start()){this._spin((steps || 1) * this.options.step);this._stop();}},stepDown:spinner_modifier(function(steps){this._stepDown(steps);}),_stepDown:function _stepDown(steps){if(this._start()){this._spin((steps || 1) * -this.options.step);this._stop();}},pageUp:spinner_modifier(function(pages){this._stepUp((pages || 1) * this.options.page);}),pageDown:spinner_modifier(function(pages){this._stepDown((pages || 1) * this.options.page);}),value:function value(newVal){if(!arguments.length){return this._parse(this.element.val());}spinner_modifier(this._value).call(this,newVal);},widget:function widget(){return this.uiSpinner;}}); /*!
 * jQuery UI Tabs 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 */var tabs=$.widget("ui.tabs",{version:"1.11.4",delay:300,options:{active:null,collapsible:false,event:"click",heightStyle:"content",hide:null,show:null, // callbacks
activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:(function(){var rhash=/#.*$/;return function(anchor){var anchorUrl,locationUrl; // support: IE7
// IE7 doesn't normalize the href property when set via script (#9317)
anchor = anchor.cloneNode(false);anchorUrl = anchor.href.replace(rhash,"");locationUrl = location.href.replace(rhash,""); // decoding may throw an error if the URL isn't UTF-8 (#9518)
try{anchorUrl = decodeURIComponent(anchorUrl);}catch(error) {}try{locationUrl = decodeURIComponent(locationUrl);}catch(error) {}return anchor.hash.length > 1 && anchorUrl === locationUrl;};})(),_create:function _create(){var that=this,options=this.options;this.running = false;this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",options.collapsible);this._processTabs();options.active = this._initialActive(); // Take disabling tabs via class attribute from HTML
// into account and update option properly.
if($.isArray(options.disabled)){options.disabled = $.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"),function(li){return that.tabs.index(li);}))).sort();} // check for length avoids error when initializing empty list
if(this.options.active !== false && this.anchors.length){this.active = this._findActive(options.active);}else {this.active = $();}this._refresh();if(this.active.length){this.load(options.active);}},_initialActive:function _initialActive(){var active=this.options.active,collapsible=this.options.collapsible,locationHash=location.hash.substring(1);if(active === null){ // check the fragment identifier in the URL
if(locationHash){this.tabs.each(function(i,tab){if($(tab).attr("aria-controls") === locationHash){active = i;return false;}});} // check for a tab marked active via a class
if(active === null){active = this.tabs.index(this.tabs.filter(".ui-tabs-active"));} // no active tab, set to false
if(active === null || active === -1){active = this.tabs.length?0:false;}} // handle numbers: negative, out of range
if(active !== false){active = this.tabs.index(this.tabs.eq(active));if(active === -1){active = collapsible?false:0;}} // don't allow collapsible: false and active: false
if(!collapsible && active === false && this.anchors.length){active = 0;}return active;},_getCreateEventData:function _getCreateEventData(){return {tab:this.active,panel:!this.active.length?$():this._getPanelForTab(this.active)};},_tabKeydown:function _tabKeydown(event){var focusedTab=$(this.document[0].activeElement).closest("li"),selectedIndex=this.tabs.index(focusedTab),goingForward=true;if(this._handlePageNav(event)){return;}switch(event.keyCode){case $.ui.keyCode.RIGHT:case $.ui.keyCode.DOWN:selectedIndex++;break;case $.ui.keyCode.UP:case $.ui.keyCode.LEFT:goingForward = false;selectedIndex--;break;case $.ui.keyCode.END:selectedIndex = this.anchors.length - 1;break;case $.ui.keyCode.HOME:selectedIndex = 0;break;case $.ui.keyCode.SPACE: // Activate only, no collapsing
event.preventDefault();clearTimeout(this.activating);this._activate(selectedIndex);return;case $.ui.keyCode.ENTER: // Toggle (cancel delayed activation, allow collapsing)
event.preventDefault();clearTimeout(this.activating); // Determine if we should collapse or activate
this._activate(selectedIndex === this.options.active?false:selectedIndex);return;default:return;} // Focus the appropriate tab, based on which key was pressed
event.preventDefault();clearTimeout(this.activating);selectedIndex = this._focusNextTab(selectedIndex,goingForward); // Navigating with control/command key will prevent automatic activation
if(!event.ctrlKey && !event.metaKey){ // Update aria-selected immediately so that AT think the tab is already selected.
// Otherwise AT may confuse the user by stating that they need to activate the tab,
// but the tab will already be activated by the time the announcement finishes.
focusedTab.attr("aria-selected","false");this.tabs.eq(selectedIndex).attr("aria-selected","true");this.activating = this._delay(function(){this.option("active",selectedIndex);},this.delay);}},_panelKeydown:function _panelKeydown(event){if(this._handlePageNav(event)){return;} // Ctrl+up moves focus to the current tab
if(event.ctrlKey && event.keyCode === $.ui.keyCode.UP){event.preventDefault();this.active.focus();}}, // Alt+page up/down moves focus to the previous/next tab (and activates)
_handlePageNav:function _handlePageNav(event){if(event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP){this._activate(this._focusNextTab(this.options.active - 1,false));return true;}if(event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN){this._activate(this._focusNextTab(this.options.active + 1,true));return true;}},_findNextTab:function _findNextTab(index,goingForward){var lastTabIndex=this.tabs.length - 1;function constrain(){if(index > lastTabIndex){index = 0;}if(index < 0){index = lastTabIndex;}return index;}while($.inArray(constrain(),this.options.disabled) !== -1) {index = goingForward?index + 1:index - 1;}return index;},_focusNextTab:function _focusNextTab(index,goingForward){index = this._findNextTab(index,goingForward);this.tabs.eq(index).focus();return index;},_setOption:function _setOption(key,value){if(key === "active"){ // _activate() will handle invalid values and update this.options
this._activate(value);return;}if(key === "disabled"){ // don't use the widget factory's disabled handling
this._setupDisabled(value);return;}this._super(key,value);if(key === "collapsible"){this.element.toggleClass("ui-tabs-collapsible",value); // Setting collapsible: false while collapsed; open first panel
if(!value && this.options.active === false){this._activate(0);}}if(key === "event"){this._setupEvents(value);}if(key === "heightStyle"){this._setupHeightStyle(value);}},_sanitizeSelector:function _sanitizeSelector(hash){return hash?hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):"";},refresh:function refresh(){var options=this.options,lis=this.tablist.children(":has(a[href])"); // get disabled tabs from class attribute from HTML
// this will get converted to a boolean if needed in _refresh()
options.disabled = $.map(lis.filter(".ui-state-disabled"),function(tab){return lis.index(tab);});this._processTabs(); // was collapsed or no tabs
if(options.active === false || !this.anchors.length){options.active = false;this.active = $(); // was active, but active tab is gone
}else if(this.active.length && !$.contains(this.tablist[0],this.active[0])){ // all remaining tabs are disabled
if(this.tabs.length === options.disabled.length){options.active = false;this.active = $(); // activate previous tab
}else {this._activate(this._findNextTab(Math.max(0,options.active - 1),false));} // was active, active tab still exists
}else { // make sure active index is correct
options.active = this.tabs.index(this.active);}this._refresh();},_refresh:function _refresh(){this._setupDisabled(this.options.disabled);this._setupEvents(this.options.event);this._setupHeightStyle(this.options.heightStyle);this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1});this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}); // Make sure one tab is in the tab order
if(!this.active.length){this.tabs.eq(0).attr("tabIndex",0);}else {this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0});this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"});}},_processTabs:function _processTabs(){var that=this,prevTabs=this.tabs,prevAnchors=this.anchors,prevPanels=this.panels;this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist") // Prevent users from focusing disabled tabs via click
.delegate("> li","mousedown" + this.eventNamespace,function(event){if($(this).is(".ui-state-disabled")){event.preventDefault();}}) // support: IE <9
// Preventing the default action in mousedown doesn't prevent IE
// from focusing the element, so if the anchor gets focused, blur.
// We don't have to worry about focusing the previously focused
// element since clicking on a non-focusable element should focus
// the body anyway.
.delegate(".ui-tabs-anchor","focus" + this.eventNamespace,function(){if($(this).closest("li").is(".ui-state-disabled")){this.blur();}});this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1});this.anchors = this.tabs.map(function(){return $("a",this)[0];}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1});this.panels = $();this.anchors.each(function(i,anchor){var selector,panel,panelId,anchorId=$(anchor).uniqueId().attr("id"),tab=$(anchor).closest("li"),originalAriaControls=tab.attr("aria-controls"); // inline tab
if(that._isLocal(anchor)){selector = anchor.hash;panelId = selector.substring(1);panel = that.element.find(that._sanitizeSelector(selector)); // remote tab
}else { // If the tab doesn't already have aria-controls,
// generate an id by using a throw-away element
panelId = tab.attr("aria-controls") || $({}).uniqueId()[0].id;selector = "#" + panelId;panel = that.element.find(selector);if(!panel.length){panel = that._createPanel(panelId);panel.insertAfter(that.panels[i - 1] || that.tablist);}panel.attr("aria-live","polite");}if(panel.length){that.panels = that.panels.add(panel);}if(originalAriaControls){tab.data("ui-tabs-aria-controls",originalAriaControls);}tab.attr({"aria-controls":panelId,"aria-labelledby":anchorId});panel.attr("aria-labelledby",anchorId);});this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"); // Avoid memory leaks (#10056)
if(prevTabs){this._off(prevTabs.not(this.tabs));this._off(prevAnchors.not(this.anchors));this._off(prevPanels.not(this.panels));}}, // allow overriding how to find the list for rare usage scenarios (#7715)
_getList:function _getList(){return this.tablist || this.element.find("ol,ul").eq(0);},_createPanel:function _createPanel(id){return $("<div>").attr("id",id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",true);},_setupDisabled:function _setupDisabled(disabled){if($.isArray(disabled)){if(!disabled.length){disabled = false;}else if(disabled.length === this.anchors.length){disabled = true;}} // disable tabs
for(var i=0,li;li = this.tabs[i];i++) {if(disabled === true || $.inArray(i,disabled) !== -1){$(li).addClass("ui-state-disabled").attr("aria-disabled","true");}else {$(li).removeClass("ui-state-disabled").removeAttr("aria-disabled");}}this.options.disabled = disabled;},_setupEvents:function _setupEvents(event){var events={};if(event){$.each(event.split(" "),function(index,eventName){events[eventName] = "_eventHandler";});}this._off(this.anchors.add(this.tabs).add(this.panels)); // Always prevent the default action, even when disabled
this._on(true,this.anchors,{click:function click(event){event.preventDefault();}});this._on(this.anchors,events);this._on(this.tabs,{keydown:"_tabKeydown"});this._on(this.panels,{keydown:"_panelKeydown"});this._focusable(this.tabs);this._hoverable(this.tabs);},_setupHeightStyle:function _setupHeightStyle(heightStyle){var maxHeight,parent=this.element.parent();if(heightStyle === "fill"){maxHeight = parent.height();maxHeight -= this.element.outerHeight() - this.element.height();this.element.siblings(":visible").each(function(){var elem=$(this),position=elem.css("position");if(position === "absolute" || position === "fixed"){return;}maxHeight -= elem.outerHeight(true);});this.element.children().not(this.panels).each(function(){maxHeight -= $(this).outerHeight(true);});this.panels.each(function(){$(this).height(Math.max(0,maxHeight - $(this).innerHeight() + $(this).height()));}).css("overflow","auto");}else if(heightStyle === "auto"){maxHeight = 0;this.panels.each(function(){maxHeight = Math.max(maxHeight,$(this).height("").height());}).height(maxHeight);}},_eventHandler:function _eventHandler(event){var options=this.options,active=this.active,anchor=$(event.currentTarget),tab=anchor.closest("li"),clickedIsActive=tab[0] === active[0],collapsing=clickedIsActive && options.collapsible,toShow=collapsing?$():this._getPanelForTab(tab),toHide=!active.length?$():this._getPanelForTab(active),eventData={oldTab:active,oldPanel:toHide,newTab:collapsing?$():tab,newPanel:toShow};event.preventDefault();if(tab.hasClass("ui-state-disabled") ||  // tab is already loading
tab.hasClass("ui-tabs-loading") ||  // can't switch durning an animation
this.running ||  // click on active header, but not collapsible
clickedIsActive && !options.collapsible ||  // allow canceling activation
this._trigger("beforeActivate",event,eventData) === false){return;}options.active = collapsing?false:this.tabs.index(tab);this.active = clickedIsActive?$():tab;if(this.xhr){this.xhr.abort();}if(!toHide.length && !toShow.length){$.error("jQuery UI Tabs: Mismatching fragment identifier.");}if(toShow.length){this.load(this.tabs.index(tab),event);}this._toggle(event,eventData);}, // handles show/hide for selecting tabs
_toggle:function _toggle(event,eventData){var that=this,toShow=eventData.newPanel,toHide=eventData.oldPanel;this.running = true;function complete(){that.running = false;that._trigger("activate",event,eventData);}function show(){eventData.newTab.closest("li").addClass("ui-tabs-active ui-state-active");if(toShow.length && that.options.show){that._show(toShow,that.options.show,complete);}else {toShow.show();complete();}} // start out by hiding, then showing, then completing
if(toHide.length && this.options.hide){this._hide(toHide,this.options.hide,function(){eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");show();});}else {eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");toHide.hide();show();}toHide.attr("aria-hidden","true");eventData.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}); // If we're switching tabs, remove the old tab from the tab order.
// If we're opening from collapsed state, remove the previous tab from the tab order.
// If we're collapsing, then keep the collapsing tab in the tab order.
if(toShow.length && toHide.length){eventData.oldTab.attr("tabIndex",-1);}else if(toShow.length){this.tabs.filter(function(){return $(this).attr("tabIndex") === 0;}).attr("tabIndex",-1);}toShow.attr("aria-hidden","false");eventData.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0});},_activate:function _activate(index){var anchor,active=this._findActive(index); // trying to activate the already active panel
if(active[0] === this.active[0]){return;} // trying to collapse, simulate a click on the current active header
if(!active.length){active = this.active;}anchor = active.find(".ui-tabs-anchor")[0];this._eventHandler({target:anchor,currentTarget:anchor,preventDefault:$.noop});},_findActive:function _findActive(index){return index === false?$():this.tabs.eq(index);},_getIndex:function _getIndex(index){ // meta-function to give users option to provide a href string instead of a numerical index.
if(typeof index === "string"){index = this.anchors.index(this.anchors.filter("[href$='" + index + "']"));}return index;},_destroy:function _destroy(){if(this.xhr){this.xhr.abort();}this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();this.tablist.unbind(this.eventNamespace);this.tabs.add(this.panels).each(function(){if($.data(this,"ui-tabs-destroy")){$(this).remove();}else {$(this).removeClass("ui-state-default ui-state-active ui-state-disabled " + "ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");}});this.tabs.each(function(){var li=$(this),prev=li.data("ui-tabs-aria-controls");if(prev){li.attr("aria-controls",prev).removeData("ui-tabs-aria-controls");}else {li.removeAttr("aria-controls");}});this.panels.show();if(this.options.heightStyle !== "content"){this.panels.css("height","");}},enable:function enable(index){var disabled=this.options.disabled;if(disabled === false){return;}if(index === undefined){disabled = false;}else {index = this._getIndex(index);if($.isArray(disabled)){disabled = $.map(disabled,function(num){return num !== index?num:null;});}else {disabled = $.map(this.tabs,function(li,num){return num !== index?num:null;});}}this._setupDisabled(disabled);},disable:function disable(index){var disabled=this.options.disabled;if(disabled === true){return;}if(index === undefined){disabled = true;}else {index = this._getIndex(index);if($.inArray(index,disabled) !== -1){return;}if($.isArray(disabled)){disabled = $.merge([index],disabled).sort();}else {disabled = [index];}}this._setupDisabled(disabled);},load:function load(index,event){index = this._getIndex(index);var that=this,tab=this.tabs.eq(index),anchor=tab.find(".ui-tabs-anchor"),panel=this._getPanelForTab(tab),eventData={tab:tab,panel:panel},complete=function complete(jqXHR,status){if(status === "abort"){that.panels.stop(false,true);}tab.removeClass("ui-tabs-loading");panel.removeAttr("aria-busy");if(jqXHR === that.xhr){delete that.xhr;}}; // not remote
if(this._isLocal(anchor[0])){return;}this.xhr = $.ajax(this._ajaxSettings(anchor,event,eventData)); // support: jQuery <1.8
// jQuery <1.8 returns false if the request is canceled in beforeSend,
// but as of 1.8, $.ajax() always returns a jqXHR object.
if(this.xhr && this.xhr.statusText !== "canceled"){tab.addClass("ui-tabs-loading");panel.attr("aria-busy","true");this.xhr.done(function(response,status,jqXHR){ // support: jQuery <1.8
// http://bugs.jquery.com/ticket/11778
setTimeout(function(){panel.html(response);that._trigger("load",event,eventData);complete(jqXHR,status);},1);}).fail(function(jqXHR,status){ // support: jQuery <1.8
// http://bugs.jquery.com/ticket/11778
setTimeout(function(){complete(jqXHR,status);},1);});}},_ajaxSettings:function _ajaxSettings(anchor,event,eventData){var that=this;return {url:anchor.attr("href"),beforeSend:function beforeSend(jqXHR,settings){return that._trigger("beforeLoad",event,$.extend({jqXHR:jqXHR,ajaxSettings:settings},eventData));}};},_getPanelForTab:function _getPanelForTab(tab){var id=$(tab).attr("aria-controls");return this.element.find(this._sanitizeSelector("#" + id));}}); /*!
 * jQuery UI Tooltip 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tooltip/
 */var tooltip=$.widget("ui.tooltip",{version:"1.11.4",options:{content:function content(){ // support: IE<9, Opera in jQuery <1.7
// .text() can't accept undefined, so coerce to a string
var title=$(this).attr("title") || ""; // Escape title, since we're going from an attribute to raw HTML
return $("<a>").text(title).html();},hide:true, // Disabled elements have inconsistent behavior across browsers (#8661)
items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:true,tooltipClass:null,track:false, // callbacks
close:null,open:null},_addDescribedBy:function _addDescribedBy(elem,id){var describedby=(elem.attr("aria-describedby") || "").split(/\s+/);describedby.push(id);elem.data("ui-tooltip-id",id).attr("aria-describedby",$.trim(describedby.join(" ")));},_removeDescribedBy:function _removeDescribedBy(elem){var id=elem.data("ui-tooltip-id"),describedby=(elem.attr("aria-describedby") || "").split(/\s+/),index=$.inArray(id,describedby);if(index !== -1){describedby.splice(index,1);}elem.removeData("ui-tooltip-id");describedby = $.trim(describedby.join(" "));if(describedby){elem.attr("aria-describedby",describedby);}else {elem.removeAttr("aria-describedby");}},_create:function _create(){this._on({mouseover:"open",focusin:"open"}); // IDs of generated tooltips, needed for destroy
this.tooltips = {}; // IDs of parent tooltips where we removed the title attribute
this.parents = {};if(this.options.disabled){this._disable();} // Append the aria-live region so tooltips announce correctly
this.liveRegion = $("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body);},_setOption:function _setOption(key,value){var that=this;if(key === "disabled"){this[value?"_disable":"_enable"]();this.options[key] = value; // disable element style changes
return;}this._super(key,value);if(key === "content"){$.each(this.tooltips,function(id,tooltipData){that._updateContent(tooltipData.element);});}},_disable:function _disable(){var that=this; // close open tooltips
$.each(this.tooltips,function(id,tooltipData){var event=$.Event("blur");event.target = event.currentTarget = tooltipData.element[0];that.close(event,true);}); // remove title attributes to prevent native tooltips
this.element.find(this.options.items).addBack().each(function(){var element=$(this);if(element.is("[title]")){element.data("ui-tooltip-title",element.attr("title")).removeAttr("title");}});},_enable:function _enable(){ // restore title attributes
this.element.find(this.options.items).addBack().each(function(){var element=$(this);if(element.data("ui-tooltip-title")){element.attr("title",element.data("ui-tooltip-title"));}});},open:function open(event){var that=this,target=$(event?event.target:this.element) // we need closest here due to mouseover bubbling,
// but always pointing at the same event target
.closest(this.options.items); // No element to show a tooltip for or the tooltip is already open
if(!target.length || target.data("ui-tooltip-id")){return;}if(target.attr("title")){target.data("ui-tooltip-title",target.attr("title"));}target.data("ui-tooltip-open",true); // kill parent tooltips, custom or native, for hover
if(event && event.type === "mouseover"){target.parents().each(function(){var parent=$(this),blurEvent;if(parent.data("ui-tooltip-open")){blurEvent = $.Event("blur");blurEvent.target = blurEvent.currentTarget = this;that.close(blurEvent,true);}if(parent.attr("title")){parent.uniqueId();that.parents[this.id] = {element:this,title:parent.attr("title")};parent.attr("title","");}});}this._registerCloseHandlers(event,target);this._updateContent(target,event);},_updateContent:function _updateContent(target,event){var content,contentOption=this.options.content,that=this,eventType=event?event.type:null;if(typeof contentOption === "string"){return this._open(event,target,contentOption);}content = contentOption.call(target[0],function(response){ // IE may instantly serve a cached response for ajax requests
// delay this call to _open so the other call to _open runs first
that._delay(function(){ // Ignore async response if tooltip was closed already
if(!target.data("ui-tooltip-open")){return;} // jQuery creates a special event for focusin when it doesn't
// exist natively. To improve performance, the native event
// object is reused and the type is changed. Therefore, we can't
// rely on the type being correct after the event finished
// bubbling, so we set it back to the previous value. (#8740)
if(event){event.type = eventType;}this._open(event,target,response);});});if(content){this._open(event,target,content);}},_open:function _open(event,target,content){var tooltipData,tooltip,delayedShow,a11yContent,positionOption=$.extend({},this.options.position);if(!content){return;} // Content can be updated multiple times. If the tooltip already
// exists, then just update the content and bail.
tooltipData = this._find(target);if(tooltipData){tooltipData.tooltip.find(".ui-tooltip-content").html(content);return;} // if we have a title, clear it to prevent the native tooltip
// we have to check first to avoid defining a title if none exists
// (we don't want to cause an element to start matching [title])
//
// We use removeAttr only for key events, to allow IE to export the correct
// accessible attributes. For mouse events, set to empty string to avoid
// native tooltip showing up (happens only when removing inside mouseover).
if(target.is("[title]")){if(event && event.type === "mouseover"){target.attr("title","");}else {target.removeAttr("title");}}tooltipData = this._tooltip(target);tooltip = tooltipData.tooltip;this._addDescribedBy(target,tooltip.attr("id"));tooltip.find(".ui-tooltip-content").html(content); // Support: Voiceover on OS X, JAWS on IE <= 9
// JAWS announces deletions even when aria-relevant="additions"
// Voiceover will sometimes re-read the entire log region's contents from the beginning
this.liveRegion.children().hide();if(content.clone){a11yContent = content.clone();a11yContent.removeAttr("id").find("[id]").removeAttr("id");}else {a11yContent = content;}$("<div>").html(a11yContent).appendTo(this.liveRegion);function position(event){positionOption.of = event;if(tooltip.is(":hidden")){return;}tooltip.position(positionOption);}if(this.options.track && event && /^mouse/.test(event.type)){this._on(this.document,{mousemove:position}); // trigger once to override element-relative positioning
position(event);}else {tooltip.position($.extend({of:target},this.options.position));}tooltip.hide();this._show(tooltip,this.options.show); // Handle tracking tooltips that are shown with a delay (#8644). As soon
// as the tooltip is visible, position the tooltip using the most recent
// event.
if(this.options.show && this.options.show.delay){delayedShow = this.delayedShow = setInterval(function(){if(tooltip.is(":visible")){position(positionOption.of);clearInterval(delayedShow);}},$.fx.interval);}this._trigger("open",event,{tooltip:tooltip});},_registerCloseHandlers:function _registerCloseHandlers(event,target){var events={keyup:function keyup(event){if(event.keyCode === $.ui.keyCode.ESCAPE){var fakeEvent=$.Event(event);fakeEvent.currentTarget = target[0];this.close(fakeEvent,true);}}}; // Only bind remove handler for delegated targets. Non-delegated
// tooltips will handle this in destroy.
if(target[0] !== this.element[0]){events.remove = function(){this._removeTooltip(this._find(target).tooltip);};}if(!event || event.type === "mouseover"){events.mouseleave = "close";}if(!event || event.type === "focusin"){events.focusout = "close";}this._on(true,target,events);},close:function close(event){var tooltip,that=this,target=$(event?event.currentTarget:this.element),tooltipData=this._find(target); // The tooltip may already be closed
if(!tooltipData){ // We set ui-tooltip-open immediately upon open (in open()), but only set the
// additional data once there's actually content to show (in _open()). So even if the
// tooltip doesn't have full data, we always remove ui-tooltip-open in case we're in
// the period between open() and _open().
target.removeData("ui-tooltip-open");return;}tooltip = tooltipData.tooltip; // disabling closes the tooltip, so we need to track when we're closing
// to avoid an infinite loop in case the tooltip becomes disabled on close
if(tooltipData.closing){return;} // Clear the interval for delayed tracking tooltips
clearInterval(this.delayedShow); // only set title if we had one before (see comment in _open())
// If the title attribute has changed since open(), don't restore
if(target.data("ui-tooltip-title") && !target.attr("title")){target.attr("title",target.data("ui-tooltip-title"));}this._removeDescribedBy(target);tooltipData.hiding = true;tooltip.stop(true);this._hide(tooltip,this.options.hide,function(){that._removeTooltip($(this));});target.removeData("ui-tooltip-open");this._off(target,"mouseleave focusout keyup"); // Remove 'remove' binding only on delegated targets
if(target[0] !== this.element[0]){this._off(target,"remove");}this._off(this.document,"mousemove");if(event && event.type === "mouseleave"){$.each(this.parents,function(id,parent){$(parent.element).attr("title",parent.title);delete that.parents[id];});}tooltipData.closing = true;this._trigger("close",event,{tooltip:tooltip});if(!tooltipData.hiding){tooltipData.closing = false;}},_tooltip:function _tooltip(element){var tooltip=$("<div>").attr("role","tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),id=tooltip.uniqueId().attr("id");$("<div>").addClass("ui-tooltip-content").appendTo(tooltip);tooltip.appendTo(this.document[0].body);return this.tooltips[id] = {element:element,tooltip:tooltip};},_find:function _find(target){var id=target.data("ui-tooltip-id");return id?this.tooltips[id]:null;},_removeTooltip:function _removeTooltip(tooltip){tooltip.remove();delete this.tooltips[tooltip.attr("id")];},_destroy:function _destroy(){var that=this; // close open tooltips
$.each(this.tooltips,function(id,tooltipData){ // Delegate to close method to handle common cleanup
var event=$.Event("blur"),element=tooltipData.element;event.target = event.currentTarget = element[0];that.close(event,true); // Remove immediately; destroying an open tooltip doesn't use the
// hide animation
$("#" + id).remove(); // Restore the title
if(element.data("ui-tooltip-title")){ // If the title attribute has changed since open(), don't restore
if(!element.attr("title")){element.attr("title",element.data("ui-tooltip-title"));}element.removeData("ui-tooltip-title");}});this.liveRegion.remove();}}); /*!
 * jQuery UI Effects 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */var dataSpace="ui-effects-", // Create a local jQuery because jQuery Color relies on it and the
// global may not exist with AMD and a custom build (#10199)
jQuery=$;$.effects = {effect:{}}; /*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */(function(jQuery,undefined){var stepHooks="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", // plusequals test for += 100 -= 100
rplusequals=/^([\-+])=\s*(\d+\.?\d*)/, // a set of RE's that can match strings and generate color tuples.
stringParsers=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function parse(execResult){return [execResult[1],execResult[2],execResult[3],execResult[4]];}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function parse(execResult){return [execResult[1] * 2.55,execResult[2] * 2.55,execResult[3] * 2.55,execResult[4]];}},{ // this regex ignores A-F because it's compared against an already lowercased string
re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function parse(execResult){return [parseInt(execResult[1],16),parseInt(execResult[2],16),parseInt(execResult[3],16)];}},{ // this regex ignores A-F because it's compared against an already lowercased string
re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function parse(execResult){return [parseInt(execResult[1] + execResult[1],16),parseInt(execResult[2] + execResult[2],16),parseInt(execResult[3] + execResult[3],16)];}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function parse(execResult){return [execResult[1],execResult[2] / 100,execResult[3] / 100,execResult[4]];}}], // jQuery.Color( )
color=jQuery.Color = function(color,green,blue,alpha){return new jQuery.Color.fn.parse(color,green,blue,alpha);},spaces={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},propTypes={"byte":{floor:true,max:255},"percent":{max:1},"degrees":{mod:360,floor:true}},support=color.support = {}, // element for support tests
supportElem=jQuery("<p>")[0], // colors = jQuery.Color.names
colors, // local aliases of functions called often
each=jQuery.each; // determine rgba support immediately
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";support.rgba = supportElem.style.backgroundColor.indexOf("rgba") > -1; // define cache name and alpha properties
// for rgba and hsla spaces
each(spaces,function(spaceName,space){space.cache = "_" + spaceName;space.props.alpha = {idx:3,type:"percent",def:1};});function clamp(value,prop,allowEmpty){var type=propTypes[prop.type] || {};if(value == null){return allowEmpty || !prop.def?null:prop.def;} // ~~ is an short way of doing floor for positive numbers
value = type.floor?~ ~value:parseFloat(value); // IE will pass in empty strings as value for alpha,
// which will hit this case
if(isNaN(value)){return prop.def;}if(type.mod){ // we add mod before modding to make sure that negatives values
// get converted properly: -10 -> 350
return (value + type.mod) % type.mod;} // for now all property types without mod have min and max
return 0 > value?0:type.max < value?type.max:value;}function stringParse(string){var inst=color(),rgba=inst._rgba = [];string = string.toLowerCase();each(stringParsers,function(i,parser){var parsed,match=parser.re.exec(string),values=match && parser.parse(match),spaceName=parser.space || "rgba";if(values){parsed = inst[spaceName](values); // if this was an rgba parse the assignment might happen twice
// oh well....
inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];rgba = inst._rgba = parsed._rgba; // exit each( stringParsers ) here because we matched
return false;}}); // Found a stringParser that handled it
if(rgba.length){ // if this came from a parsed string, force "transparent" when alpha is 0
// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
if(rgba.join() === "0,0,0,0"){jQuery.extend(rgba,colors.transparent);}return inst;} // named colors
return colors[string];}color.fn = jQuery.extend(color.prototype,{parse:function parse(red,green,blue,alpha){if(red === undefined){this._rgba = [null,null,null,null];return this;}if(red.jquery || red.nodeType){red = jQuery(red).css(green);green = undefined;}var inst=this,type=jQuery.type(red),rgba=this._rgba = []; // more than 1 argument specified - assume ( red, green, blue, alpha )
if(green !== undefined){red = [red,green,blue,alpha];type = "array";}if(type === "string"){return this.parse(stringParse(red) || colors._default);}if(type === "array"){each(spaces.rgba.props,function(key,prop){rgba[prop.idx] = clamp(red[prop.idx],prop);});return this;}if(type === "object"){if(red instanceof color){each(spaces,function(spaceName,space){if(red[space.cache]){inst[space.cache] = red[space.cache].slice();}});}else {each(spaces,function(spaceName,space){var cache=space.cache;each(space.props,function(key,prop){ // if the cache doesn't exist, and we know how to convert
if(!inst[cache] && space.to){ // if the value was null, we don't need to copy it
// if the key was alpha, we don't need to copy it either
if(key === "alpha" || red[key] == null){return;}inst[cache] = space.to(inst._rgba);} // this is the only case where we allow nulls for ALL properties.
// call clamp with alwaysAllowEmpty
inst[cache][prop.idx] = clamp(red[key],prop,true);}); // everything defined but alpha?
if(inst[cache] && jQuery.inArray(null,inst[cache].slice(0,3)) < 0){ // use the default of 1
inst[cache][3] = 1;if(space.from){inst._rgba = space.from(inst[cache]);}}});}return this;}},is:function is(compare){var is=color(compare),same=true,inst=this;each(spaces,function(_,space){var localCache,isCache=is[space.cache];if(isCache){localCache = inst[space.cache] || space.to && space.to(inst._rgba) || [];each(space.props,function(_,prop){if(isCache[prop.idx] != null){same = isCache[prop.idx] === localCache[prop.idx];return same;}});}return same;});return same;},_space:function _space(){var used=[],inst=this;each(spaces,function(spaceName,space){if(inst[space.cache]){used.push(spaceName);}});return used.pop();},transition:function transition(other,distance){var end=color(other),spaceName=end._space(),space=spaces[spaceName],startColor=this.alpha() === 0?color("transparent"):this,start=startColor[space.cache] || space.to(startColor._rgba),result=start.slice();end = end[space.cache];each(space.props,function(key,prop){var index=prop.idx,startValue=start[index],endValue=end[index],type=propTypes[prop.type] || {}; // if null, don't override start value
if(endValue === null){return;} // if null - use end
if(startValue === null){result[index] = endValue;}else {if(type.mod){if(endValue - startValue > type.mod / 2){startValue += type.mod;}else if(startValue - endValue > type.mod / 2){startValue -= type.mod;}}result[index] = clamp((endValue - startValue) * distance + startValue,prop);}});return this[spaceName](result);},blend:function blend(opaque){ // if we are already opaque - return ourself
if(this._rgba[3] === 1){return this;}var rgb=this._rgba.slice(),a=rgb.pop(),blend=color(opaque)._rgba;return color(jQuery.map(rgb,function(v,i){return (1 - a) * blend[i] + a * v;}));},toRgbaString:function toRgbaString(){var prefix="rgba(",rgba=jQuery.map(this._rgba,function(v,i){return v == null?i > 2?1:0:v;});if(rgba[3] === 1){rgba.pop();prefix = "rgb(";}return prefix + rgba.join() + ")";},toHslaString:function toHslaString(){var prefix="hsla(",hsla=jQuery.map(this.hsla(),function(v,i){if(v == null){v = i > 2?1:0;} // catch 1 and 2
if(i && i < 3){v = Math.round(v * 100) + "%";}return v;});if(hsla[3] === 1){hsla.pop();prefix = "hsl(";}return prefix + hsla.join() + ")";},toHexString:function toHexString(includeAlpha){var rgba=this._rgba.slice(),alpha=rgba.pop();if(includeAlpha){rgba.push(~ ~(alpha * 255));}return "#" + jQuery.map(rgba,function(v){ // default to 0 when nulls exist
v = (v || 0).toString(16);return v.length === 1?"0" + v:v;}).join("");},toString:function toString(){return this._rgba[3] === 0?"transparent":this.toRgbaString();}});color.fn.parse.prototype = color.fn; // hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021
function hue2rgb(p,q,h){h = (h + 1) % 1;if(h * 6 < 1){return p + (q - p) * h * 6;}if(h * 2 < 1){return q;}if(h * 3 < 2){return p + (q - p) * (2 / 3 - h) * 6;}return p;}spaces.hsla.to = function(rgba){if(rgba[0] == null || rgba[1] == null || rgba[2] == null){return [null,null,null,rgba[3]];}var r=rgba[0] / 255,g=rgba[1] / 255,b=rgba[2] / 255,a=rgba[3],max=Math.max(r,g,b),min=Math.min(r,g,b),diff=max - min,add=max + min,l=add * 0.5,h,s;if(min === max){h = 0;}else if(r === max){h = 60 * (g - b) / diff + 360;}else if(g === max){h = 60 * (b - r) / diff + 120;}else {h = 60 * (r - g) / diff + 240;} // chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
if(diff === 0){s = 0;}else if(l <= 0.5){s = diff / add;}else {s = diff / (2 - add);}return [Math.round(h) % 360,s,l,a == null?1:a];};spaces.hsla.from = function(hsla){if(hsla[0] == null || hsla[1] == null || hsla[2] == null){return [null,null,null,hsla[3]];}var h=hsla[0] / 360,s=hsla[1],l=hsla[2],a=hsla[3],q=l <= 0.5?l * (1 + s):l + s - l * s,p=2 * l - q;return [Math.round(hue2rgb(p,q,h + 1 / 3) * 255),Math.round(hue2rgb(p,q,h) * 255),Math.round(hue2rgb(p,q,h - 1 / 3) * 255),a];};each(spaces,function(spaceName,space){var props=space.props,cache=space.cache,to=space.to,from=space.from; // makes rgba() and hsla()
color.fn[spaceName] = function(value){ // generate a cache for this space if it doesn't exist
if(to && !this[cache]){this[cache] = to(this._rgba);}if(value === undefined){return this[cache].slice();}var ret,type=jQuery.type(value),arr=type === "array" || type === "object"?value:arguments,local=this[cache].slice();each(props,function(key,prop){var val=arr[type === "object"?key:prop.idx];if(val == null){val = local[prop.idx];}local[prop.idx] = clamp(val,prop);});if(from){ret = color(from(local));ret[cache] = local;return ret;}else {return color(local);}}; // makes red() green() blue() alpha() hue() saturation() lightness()
each(props,function(key,prop){ // alpha is included in more than one space
if(color.fn[key]){return;}color.fn[key] = function(value){var vtype=jQuery.type(value),fn=key === "alpha"?this._hsla?"hsla":"rgba":spaceName,local=this[fn](),cur=local[prop.idx],match;if(vtype === "undefined"){return cur;}if(vtype === "function"){value = value.call(this,cur);vtype = jQuery.type(value);}if(value == null && prop.empty){return this;}if(vtype === "string"){match = rplusequals.exec(value);if(match){value = cur + parseFloat(match[2]) * (match[1] === "+"?1:-1);}}local[prop.idx] = value;return this[fn](local);};});}); // add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
color.hook = function(hook){var hooks=hook.split(" ");each(hooks,function(i,hook){jQuery.cssHooks[hook] = {set:function set(elem,value){var parsed,curElem,backgroundColor="";if(value !== "transparent" && (jQuery.type(value) !== "string" || (parsed = stringParse(value)))){value = color(parsed || value);if(!support.rgba && value._rgba[3] !== 1){curElem = hook === "backgroundColor"?elem.parentNode:elem;while((backgroundColor === "" || backgroundColor === "transparent") && curElem && curElem.style) {try{backgroundColor = jQuery.css(curElem,"backgroundColor");curElem = curElem.parentNode;}catch(e) {}}value = value.blend(backgroundColor && backgroundColor !== "transparent"?backgroundColor:"_default");}value = value.toRgbaString();}try{elem.style[hook] = value;}catch(e) { // wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
}}};jQuery.fx.step[hook] = function(fx){if(!fx.colorInit){fx.start = color(fx.elem,hook);fx.end = color(fx.end);fx.colorInit = true;}jQuery.cssHooks[hook].set(fx.elem,fx.start.transition(fx.end,fx.pos));};});};color.hook(stepHooks);jQuery.cssHooks.borderColor = {expand:function expand(value){var expanded={};each(["Top","Right","Bottom","Left"],function(i,part){expanded["border" + part + "Color"] = value;});return expanded;}}; // Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
colors = jQuery.Color.names = { // 4.1. Basic color keywords
aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00", // 4.2.3. "transparent" color keyword
transparent:[null,null,null,0],_default:"#ffffff"};})(jQuery); /******************************************************************************/ /****************************** CLASS ANIMATIONS ******************************/ /******************************************************************************/(function(){var classAnimationActions=["add","remove","toggle"],shorthandStyles={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};$.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(_,prop){$.fx.step[prop] = function(fx){if(fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr){jQuery.style(fx.elem,prop,fx.end);fx.setAttr = true;}};});function getElementStyles(elem){var key,len,style=elem.ownerDocument.defaultView?elem.ownerDocument.defaultView.getComputedStyle(elem,null):elem.currentStyle,styles={};if(style && style.length && style[0] && style[style[0]]){len = style.length;while(len--) {key = style[len];if(typeof style[key] === "string"){styles[$.camelCase(key)] = style[key];}} // support: Opera, IE <9
}else {for(key in style) {if(typeof style[key] === "string"){styles[key] = style[key];}}}return styles;}function styleDifference(oldStyle,newStyle){var diff={},name,value;for(name in newStyle) {value = newStyle[name];if(oldStyle[name] !== value){if(!shorthandStyles[name]){if($.fx.step[name] || !isNaN(parseFloat(value))){diff[name] = value;}}}}return diff;} // support: jQuery <1.8
if(!$.fn.addBack){$.fn.addBack = function(selector){return this.add(selector == null?this.prevObject:this.prevObject.filter(selector));};}$.effects.animateClass = function(value,duration,easing,callback){var o=$.speed(duration,easing,callback);return this.queue(function(){var animated=$(this),baseClass=animated.attr("class") || "",applyClassChange,allAnimations=o.children?animated.find("*").addBack():animated; // map the animated objects to store the original styles.
allAnimations = allAnimations.map(function(){var el=$(this);return {el:el,start:getElementStyles(this)};}); // apply class change
applyClassChange = function(){$.each(classAnimationActions,function(i,action){if(value[action]){animated[action + "Class"](value[action]);}});};applyClassChange(); // map all animated objects again - calculate new styles and diff
allAnimations = allAnimations.map(function(){this.end = getElementStyles(this.el[0]);this.diff = styleDifference(this.start,this.end);return this;}); // apply original class
animated.attr("class",baseClass); // map all animated objects again - this time collecting a promise
allAnimations = allAnimations.map(function(){var styleInfo=this,dfd=$.Deferred(),opts=$.extend({},o,{queue:false,complete:function complete(){dfd.resolve(styleInfo);}});this.el.animate(this.diff,opts);return dfd.promise();}); // once all animations have completed:
$.when.apply($,allAnimations.get()).done(function(){ // set the final class
applyClassChange(); // for each animated element,
// clear all css properties that were animated
$.each(arguments,function(){var el=this.el;$.each(this.diff,function(key){el.css(key,"");});}); // this is guarnteed to be there if you use jQuery.speed()
// it also handles dequeuing the next anim...
o.complete.call(animated[0]);});});};$.fn.extend({addClass:(function(orig){return function(classNames,speed,easing,callback){return speed?$.effects.animateClass.call(this,{add:classNames},speed,easing,callback):orig.apply(this,arguments);};})($.fn.addClass),removeClass:(function(orig){return function(classNames,speed,easing,callback){return arguments.length > 1?$.effects.animateClass.call(this,{remove:classNames},speed,easing,callback):orig.apply(this,arguments);};})($.fn.removeClass),toggleClass:(function(orig){return function(classNames,force,speed,easing,callback){if(typeof force === "boolean" || force === undefined){if(!speed){ // without speed parameter
return orig.apply(this,arguments);}else {return $.effects.animateClass.call(this,force?{add:classNames}:{remove:classNames},speed,easing,callback);}}else { // without force parameter
return $.effects.animateClass.call(this,{toggle:classNames},force,speed,easing);}};})($.fn.toggleClass),switchClass:function switchClass(remove,add,speed,easing,callback){return $.effects.animateClass.call(this,{add:add,remove:remove},speed,easing,callback);}});})(); /******************************************************************************/ /*********************************** EFFECTS **********************************/ /******************************************************************************/(function(){$.extend($.effects,{version:"1.11.4", // Saves a set of properties in a data storage
save:function save(element,set){for(var i=0;i < set.length;i++) {if(set[i] !== null){element.data(dataSpace + set[i],element[0].style[set[i]]);}}}, // Restores a set of previously saved properties from a data storage
restore:function restore(element,set){var val,i;for(i = 0;i < set.length;i++) {if(set[i] !== null){val = element.data(dataSpace + set[i]); // support: jQuery 1.6.2
// http://bugs.jquery.com/ticket/9917
// jQuery 1.6.2 incorrectly returns undefined for any falsy value.
// We can't differentiate between "" and 0 here, so we just assume
// empty string since it's likely to be a more common value...
if(val === undefined){val = "";}element.css(set[i],val);}}},setMode:function setMode(el,mode){if(mode === "toggle"){mode = el.is(":hidden")?"show":"hide";}return mode;}, // Translates a [top,left] array into a baseline value
// this should be a little more flexible in the future to handle a string & hash
getBaseline:function getBaseline(origin,original){var y,x;switch(origin[0]){case "top":y = 0;break;case "middle":y = 0.5;break;case "bottom":y = 1;break;default:y = origin[0] / original.height;}switch(origin[1]){case "left":x = 0;break;case "center":x = 0.5;break;case "right":x = 1;break;default:x = origin[1] / original.width;}return {x:x,y:y};}, // Wraps the element around a wrapper that copies position properties
createWrapper:function createWrapper(element){ // if the element is already wrapped, return it
if(element.parent().is(".ui-effects-wrapper")){return element.parent();} // wrap the element
var props={width:element.outerWidth(true),height:element.outerHeight(true),"float":element.css("float")},wrapper=$("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}), // Store the size in case width/height are defined in % - Fixes #5245
size={width:element.width(),height:element.height()},active=document.activeElement; // support: Firefox
// Firefox incorrectly exposes anonymous content
// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
try{active.id;}catch(e) {active = document.body;}element.wrap(wrapper); // Fixes #7595 - Elements lose focus when wrapped.
if(element[0] === active || $.contains(element[0],active)){$(active).focus();}wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually lose the reference to the wrapped element
// transfer positioning properties to the wrapper
if(element.css("position") === "static"){wrapper.css({position:"relative"});element.css({position:"relative"});}else {$.extend(props,{position:element.css("position"),zIndex:element.css("z-index")});$.each(["top","left","bottom","right"],function(i,pos){props[pos] = element.css(pos);if(isNaN(parseInt(props[pos],10))){props[pos] = "auto";}});element.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"});}element.css(size);return wrapper.css(props).show();},removeWrapper:function removeWrapper(element){var active=document.activeElement;if(element.parent().is(".ui-effects-wrapper")){element.parent().replaceWith(element); // Fixes #7595 - Elements lose focus when wrapped.
if(element[0] === active || $.contains(element[0],active)){$(active).focus();}}return element;},setTransition:function setTransition(element,list,factor,value){value = value || {};$.each(list,function(i,x){var unit=element.cssUnit(x);if(unit[0] > 0){value[x] = unit[0] * factor + unit[1];}});return value;}}); // return an effect options object for the given parameters:
function _normalizeArguments(effect,options,speed,callback){ // allow passing all options as the first parameter
if($.isPlainObject(effect)){options = effect;effect = effect.effect;} // convert to an object
effect = {effect:effect}; // catch (effect, null, ...)
if(options == null){options = {};} // catch (effect, callback)
if($.isFunction(options)){callback = options;speed = null;options = {};} // catch (effect, speed, ?)
if(typeof options === "number" || $.fx.speeds[options]){callback = speed;speed = options;options = {};} // catch (effect, options, callback)
if($.isFunction(speed)){callback = speed;speed = null;} // add options to effect
if(options){$.extend(effect,options);}speed = speed || options.duration;effect.duration = $.fx.off?0:typeof speed === "number"?speed:speed in $.fx.speeds?$.fx.speeds[speed]:$.fx.speeds._default;effect.complete = callback || options.complete;return effect;}function standardAnimationOption(option){ // Valid standard speeds (nothing, number, named speed)
if(!option || typeof option === "number" || $.fx.speeds[option]){return true;} // Invalid strings - treat as "normal" speed
if(typeof option === "string" && !$.effects.effect[option]){return true;} // Complete callback
if($.isFunction(option)){return true;} // Options hash (but not naming an effect)
if(typeof option === "object" && !option.effect){return true;} // Didn't match any standard API
return false;}$.fn.extend({effect:function effect() /* effect, options, speed, callback */{var args=_normalizeArguments.apply(this,arguments),mode=args.mode,queue=args.queue,effectMethod=$.effects.effect[args.effect];if($.fx.off || !effectMethod){ // delegate to the original method (e.g., .show()) if possible
if(mode){return this[mode](args.duration,args.complete);}else {return this.each(function(){if(args.complete){args.complete.call(this);}});}}function run(next){var elem=$(this),complete=args.complete,mode=args.mode;function done(){if($.isFunction(complete)){complete.call(elem[0]);}if($.isFunction(next)){next();}} // If the element already has the correct final state, delegate to
// the core methods so the internal tracking of "olddisplay" works.
if(elem.is(":hidden")?mode === "hide":mode === "show"){elem[mode]();done();}else {effectMethod.call(elem[0],args,done);}}return queue === false?this.each(run):this.queue(queue || "fx",run);},show:(function(orig){return function(option){if(standardAnimationOption(option)){return orig.apply(this,arguments);}else {var args=_normalizeArguments.apply(this,arguments);args.mode = "show";return this.effect.call(this,args);}};})($.fn.show),hide:(function(orig){return function(option){if(standardAnimationOption(option)){return orig.apply(this,arguments);}else {var args=_normalizeArguments.apply(this,arguments);args.mode = "hide";return this.effect.call(this,args);}};})($.fn.hide),toggle:(function(orig){return function(option){if(standardAnimationOption(option) || typeof option === "boolean"){return orig.apply(this,arguments);}else {var args=_normalizeArguments.apply(this,arguments);args.mode = "toggle";return this.effect.call(this,args);}};})($.fn.toggle), // helper functions
cssUnit:function cssUnit(key){var style=this.css(key),val=[];$.each(["em","px","%","pt"],function(i,unit){if(style.indexOf(unit) > 0){val = [parseFloat(style),unit];}});return val;}});})(); /******************************************************************************/ /*********************************** EASING ***********************************/ /******************************************************************************/(function(){ // based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
var baseEasings={};$.each(["Quad","Cubic","Quart","Quint","Expo"],function(i,name){baseEasings[name] = function(p){return Math.pow(p,i + 2);};});$.extend(baseEasings,{Sine:function Sine(p){return 1 - Math.cos(p * Math.PI / 2);},Circ:function Circ(p){return 1 - Math.sqrt(1 - p * p);},Elastic:function Elastic(p){return p === 0 || p === 1?p:-Math.pow(2,8 * (p - 1)) * Math.sin(((p - 1) * 80 - 7.5) * Math.PI / 15);},Back:function Back(p){return p * p * (3 * p - 2);},Bounce:function Bounce(p){var pow2,bounce=4;while(p < ((pow2 = Math.pow(2,--bounce)) - 1) / 11) {}return 1 / Math.pow(4,3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p,2);}});$.each(baseEasings,function(name,easeIn){$.easing["easeIn" + name] = easeIn;$.easing["easeOut" + name] = function(p){return 1 - easeIn(1 - p);};$.easing["easeInOut" + name] = function(p){return p < 0.5?easeIn(p * 2) / 2:1 - easeIn(p * -2 + 2) / 2;};});})();var effect=$.effects; /*!
 * jQuery UI Effects Blind 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/blind-effect/
 */var effectBlind=$.effects.effect.blind = function(o,done){ // Create element
var el=$(this),rvertical=/up|down|vertical/,rpositivemotion=/up|left|vertical|horizontal/,props=["position","top","bottom","left","right","height","width"],mode=$.effects.setMode(el,o.mode || "hide"),direction=o.direction || "up",vertical=rvertical.test(direction),ref=vertical?"height":"width",ref2=vertical?"top":"left",motion=rpositivemotion.test(direction),animation={},show=mode === "show",wrapper,distance,margin; // if already wrapped, the wrapper's properties are my property. #6245
if(el.parent().is(".ui-effects-wrapper")){$.effects.save(el.parent(),props);}else {$.effects.save(el,props);}el.show();wrapper = $.effects.createWrapper(el).css({overflow:"hidden"});distance = wrapper[ref]();margin = parseFloat(wrapper.css(ref2)) || 0;animation[ref] = show?distance:0;if(!motion){el.css(vertical?"bottom":"right",0).css(vertical?"top":"left","auto").css({position:"absolute"});animation[ref2] = show?margin:distance + margin;} // start at 0 if we are showing
if(show){wrapper.css(ref,0);if(!motion){wrapper.css(ref2,margin + distance);}} // Animate
wrapper.animate(animation,{duration:o.duration,easing:o.easing,queue:false,complete:function complete(){if(mode === "hide"){el.hide();}$.effects.restore(el,props);$.effects.removeWrapper(el);done();}});}; /*!
 * jQuery UI Effects Bounce 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/bounce-effect/
 */var effectBounce=$.effects.effect.bounce = function(o,done){var el=$(this),props=["position","top","bottom","left","right","height","width"], // defaults:
mode=$.effects.setMode(el,o.mode || "effect"),hide=mode === "hide",show=mode === "show",direction=o.direction || "up",distance=o.distance,times=o.times || 5, // number of internal animations
anims=times * 2 + (show || hide?1:0),speed=o.duration / anims,easing=o.easing, // utility:
ref=direction === "up" || direction === "down"?"top":"left",motion=direction === "up" || direction === "left",i,upAnim,downAnim, // we will need to re-assemble the queue to stack our animations in place
queue=el.queue(),queuelen=queue.length; // Avoid touching opacity to prevent clearType and PNG issues in IE
if(show || hide){props.push("opacity");}$.effects.save(el,props);el.show();$.effects.createWrapper(el); // Create Wrapper
// default distance for the BIGGEST bounce is the outer Distance / 3
if(!distance){distance = el[ref === "top"?"outerHeight":"outerWidth"]() / 3;}if(show){downAnim = {opacity:1};downAnim[ref] = 0; // if we are showing, force opacity 0 and set the initial position
// then do the "first" animation
el.css("opacity",0).css(ref,motion?-distance * 2:distance * 2).animate(downAnim,speed,easing);} // start at the smallest distance if we are hiding
if(hide){distance = distance / Math.pow(2,times - 1);}downAnim = {};downAnim[ref] = 0; // Bounces up/down/left/right then back to 0 -- times * 2 animations happen here
for(i = 0;i < times;i++) {upAnim = {};upAnim[ref] = (motion?"-=":"+=") + distance;el.animate(upAnim,speed,easing).animate(downAnim,speed,easing);distance = hide?distance * 2:distance / 2;} // Last Bounce when Hiding
if(hide){upAnim = {opacity:0};upAnim[ref] = (motion?"-=":"+=") + distance;el.animate(upAnim,speed,easing);}el.queue(function(){if(hide){el.hide();}$.effects.restore(el,props);$.effects.removeWrapper(el);done();}); // inject all the animations we just queued to be first in line (after "inprogress")
if(queuelen > 1){queue.splice.apply(queue,[1,0].concat(queue.splice(queuelen,anims + 1)));}el.dequeue();}; /*!
 * jQuery UI Effects Clip 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/clip-effect/
 */var effectClip=$.effects.effect.clip = function(o,done){ // Create element
var el=$(this),props=["position","top","bottom","left","right","height","width"],mode=$.effects.setMode(el,o.mode || "hide"),show=mode === "show",direction=o.direction || "vertical",vert=direction === "vertical",size=vert?"height":"width",position=vert?"top":"left",animation={},wrapper,animate,distance; // Save & Show
$.effects.save(el,props);el.show(); // Create Wrapper
wrapper = $.effects.createWrapper(el).css({overflow:"hidden"});animate = el[0].tagName === "IMG"?wrapper:el;distance = animate[size](); // Shift
if(show){animate.css(size,0);animate.css(position,distance / 2);} // Create Animation Object:
animation[size] = show?distance:0;animation[position] = show?0:distance / 2; // Animate
animate.animate(animation,{queue:false,duration:o.duration,easing:o.easing,complete:function complete(){if(!show){el.hide();}$.effects.restore(el,props);$.effects.removeWrapper(el);done();}});}; /*!
 * jQuery UI Effects Drop 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/drop-effect/
 */var effectDrop=$.effects.effect.drop = function(o,done){var el=$(this),props=["position","top","bottom","left","right","opacity","height","width"],mode=$.effects.setMode(el,o.mode || "hide"),show=mode === "show",direction=o.direction || "left",ref=direction === "up" || direction === "down"?"top":"left",motion=direction === "up" || direction === "left"?"pos":"neg",animation={opacity:show?1:0},distance; // Adjust
$.effects.save(el,props);el.show();$.effects.createWrapper(el);distance = o.distance || el[ref === "top"?"outerHeight":"outerWidth"](true) / 2;if(show){el.css("opacity",0).css(ref,motion === "pos"?-distance:distance);} // Animation
animation[ref] = (show?motion === "pos"?"+=":"-=":motion === "pos"?"-=":"+=") + distance; // Animate
el.animate(animation,{queue:false,duration:o.duration,easing:o.easing,complete:function complete(){if(mode === "hide"){el.hide();}$.effects.restore(el,props);$.effects.removeWrapper(el);done();}});}; /*!
 * jQuery UI Effects Explode 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/explode-effect/
 */var effectExplode=$.effects.effect.explode = function(o,done){var rows=o.pieces?Math.round(Math.sqrt(o.pieces)):3,cells=rows,el=$(this),mode=$.effects.setMode(el,o.mode || "hide"),show=mode === "show", // show and then visibility:hidden the element before calculating offset
offset=el.show().css("visibility","hidden").offset(), // width and height of a piece
width=Math.ceil(el.outerWidth() / cells),height=Math.ceil(el.outerHeight() / rows),pieces=[], // loop
i,j,left,top,mx,my; // children animate complete:
function childComplete(){pieces.push(this);if(pieces.length === rows * cells){animComplete();}} // clone the element for each row and cell.
for(i = 0;i < rows;i++) { // ===>
top = offset.top + i * height;my = i - (rows - 1) / 2;for(j = 0;j < cells;j++) { // |||
left = offset.left + j * width;mx = j - (cells - 1) / 2; // Create a clone of the now hidden main element that will be absolute positioned
// within a wrapper div off the -left and -top equal to size of our pieces
el.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j * width,top:-i * height}) // select the wrapper - make it overflow: hidden and absolute positioned based on
// where the original was located +left and +top equal to the size of pieces
.parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:width,height:height,left:left + (show?mx * width:0),top:top + (show?my * height:0),opacity:show?0:1}).animate({left:left + (show?0:mx * width),top:top + (show?0:my * height),opacity:show?1:0},o.duration || 500,o.easing,childComplete);}}function animComplete(){el.css({visibility:"visible"});$(pieces).remove();if(!show){el.hide();}done();}}; /*!
 * jQuery UI Effects Fade 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 */var effectFade=$.effects.effect.fade = function(o,done){var el=$(this),mode=$.effects.setMode(el,o.mode || "toggle");el.animate({opacity:mode},{queue:false,duration:o.duration,easing:o.easing,complete:done});}; /*!
 * jQuery UI Effects Fold 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fold-effect/
 */var effectFold=$.effects.effect.fold = function(o,done){ // Create element
var el=$(this),props=["position","top","bottom","left","right","height","width"],mode=$.effects.setMode(el,o.mode || "hide"),show=mode === "show",hide=mode === "hide",size=o.size || 15,percent=/([0-9]+)%/.exec(size),horizFirst=!!o.horizFirst,widthFirst=show !== horizFirst,ref=widthFirst?["width","height"]:["height","width"],duration=o.duration / 2,wrapper,distance,animation1={},animation2={};$.effects.save(el,props);el.show(); // Create Wrapper
wrapper = $.effects.createWrapper(el).css({overflow:"hidden"});distance = widthFirst?[wrapper.width(),wrapper.height()]:[wrapper.height(),wrapper.width()];if(percent){size = parseInt(percent[1],10) / 100 * distance[hide?0:1];}if(show){wrapper.css(horizFirst?{height:0,width:size}:{height:size,width:0});} // Animation
animation1[ref[0]] = show?distance[0]:size;animation2[ref[1]] = show?distance[1]:0; // Animate
wrapper.animate(animation1,duration,o.easing).animate(animation2,duration,o.easing,function(){if(hide){el.hide();}$.effects.restore(el,props);$.effects.removeWrapper(el);done();});}; /*!
 * jQuery UI Effects Highlight 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/highlight-effect/
 */var effectHighlight=$.effects.effect.highlight = function(o,done){var elem=$(this),props=["backgroundImage","backgroundColor","opacity"],mode=$.effects.setMode(elem,o.mode || "show"),animation={backgroundColor:elem.css("backgroundColor")};if(mode === "hide"){animation.opacity = 0;}$.effects.save(elem,props);elem.show().css({backgroundImage:"none",backgroundColor:o.color || "#ffff99"}).animate(animation,{queue:false,duration:o.duration,easing:o.easing,complete:function complete(){if(mode === "hide"){elem.hide();}$.effects.restore(elem,props);done();}});}; /*!
 * jQuery UI Effects Size 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/size-effect/
 */var effectSize=$.effects.effect.size = function(o,done){ // Create element
var original,baseline,factor,el=$(this),props0=["position","top","bottom","left","right","width","height","overflow","opacity"], // Always restore
props1=["position","top","bottom","left","right","overflow","opacity"], // Copy for children
props2=["width","height","overflow"],cProps=["fontSize"],vProps=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],hProps=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"], // Set options
mode=$.effects.setMode(el,o.mode || "effect"),restore=o.restore || mode !== "effect",scale=o.scale || "both",origin=o.origin || ["middle","center"],position=el.css("position"),props=restore?props0:props1,zero={height:0,width:0,outerHeight:0,outerWidth:0};if(mode === "show"){el.show();}original = {height:el.height(),width:el.width(),outerHeight:el.outerHeight(),outerWidth:el.outerWidth()};if(o.mode === "toggle" && mode === "show"){el.from = o.to || zero;el.to = o.from || original;}else {el.from = o.from || (mode === "show"?zero:original);el.to = o.to || (mode === "hide"?zero:original);} // Set scaling factor
factor = {from:{y:el.from.height / original.height,x:el.from.width / original.width},to:{y:el.to.height / original.height,x:el.to.width / original.width}}; // Scale the css box
if(scale === "box" || scale === "both"){ // Vertical props scaling
if(factor.from.y !== factor.to.y){props = props.concat(vProps);el.from = $.effects.setTransition(el,vProps,factor.from.y,el.from);el.to = $.effects.setTransition(el,vProps,factor.to.y,el.to);} // Horizontal props scaling
if(factor.from.x !== factor.to.x){props = props.concat(hProps);el.from = $.effects.setTransition(el,hProps,factor.from.x,el.from);el.to = $.effects.setTransition(el,hProps,factor.to.x,el.to);}} // Scale the content
if(scale === "content" || scale === "both"){ // Vertical props scaling
if(factor.from.y !== factor.to.y){props = props.concat(cProps).concat(props2);el.from = $.effects.setTransition(el,cProps,factor.from.y,el.from);el.to = $.effects.setTransition(el,cProps,factor.to.y,el.to);}}$.effects.save(el,props);el.show();$.effects.createWrapper(el);el.css("overflow","hidden").css(el.from); // Adjust
if(origin){ // Calculate baseline shifts
baseline = $.effects.getBaseline(origin,original);el.from.top = (original.outerHeight - el.outerHeight()) * baseline.y;el.from.left = (original.outerWidth - el.outerWidth()) * baseline.x;el.to.top = (original.outerHeight - el.to.outerHeight) * baseline.y;el.to.left = (original.outerWidth - el.to.outerWidth) * baseline.x;}el.css(el.from); // set top & left
// Animate
if(scale === "content" || scale === "both"){ // Scale the children
// Add margins/font-size
vProps = vProps.concat(["marginTop","marginBottom"]).concat(cProps);hProps = hProps.concat(["marginLeft","marginRight"]);props2 = props0.concat(vProps).concat(hProps);el.find("*[width]").each(function(){var child=$(this),c_original={height:child.height(),width:child.width(),outerHeight:child.outerHeight(),outerWidth:child.outerWidth()};if(restore){$.effects.save(child,props2);}child.from = {height:c_original.height * factor.from.y,width:c_original.width * factor.from.x,outerHeight:c_original.outerHeight * factor.from.y,outerWidth:c_original.outerWidth * factor.from.x};child.to = {height:c_original.height * factor.to.y,width:c_original.width * factor.to.x,outerHeight:c_original.height * factor.to.y,outerWidth:c_original.width * factor.to.x}; // Vertical props scaling
if(factor.from.y !== factor.to.y){child.from = $.effects.setTransition(child,vProps,factor.from.y,child.from);child.to = $.effects.setTransition(child,vProps,factor.to.y,child.to);} // Horizontal props scaling
if(factor.from.x !== factor.to.x){child.from = $.effects.setTransition(child,hProps,factor.from.x,child.from);child.to = $.effects.setTransition(child,hProps,factor.to.x,child.to);} // Animate children
child.css(child.from);child.animate(child.to,o.duration,o.easing,function(){ // Restore children
if(restore){$.effects.restore(child,props2);}});});} // Animate
el.animate(el.to,{queue:false,duration:o.duration,easing:o.easing,complete:function complete(){if(el.to.opacity === 0){el.css("opacity",el.from.opacity);}if(mode === "hide"){el.hide();}$.effects.restore(el,props);if(!restore){ // we need to calculate our new positioning based on the scaling
if(position === "static"){el.css({position:"relative",top:el.to.top,left:el.to.left});}else {$.each(["top","left"],function(idx,pos){el.css(pos,function(_,str){var val=parseInt(str,10),toRef=idx?el.to.left:el.to.top; // if original was "auto", recalculate the new value from wrapper
if(str === "auto"){return toRef + "px";}return val + toRef + "px";});});}}$.effects.removeWrapper(el);done();}});}; /*!
 * jQuery UI Effects Scale 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/scale-effect/
 */var effectScale=$.effects.effect.scale = function(o,done){ // Create element
var el=$(this),options=$.extend(true,{},o),mode=$.effects.setMode(el,o.mode || "effect"),percent=parseInt(o.percent,10) || (parseInt(o.percent,10) === 0?0:mode === "hide"?0:100),direction=o.direction || "both",origin=o.origin,original={height:el.height(),width:el.width(),outerHeight:el.outerHeight(),outerWidth:el.outerWidth()},factor={y:direction !== "horizontal"?percent / 100:1,x:direction !== "vertical"?percent / 100:1}; // We are going to pass this effect to the size effect:
options.effect = "size";options.queue = false;options.complete = done; // Set default origin and restore for show/hide
if(mode !== "effect"){options.origin = origin || ["middle","center"];options.restore = true;}options.from = o.from || (mode === "show"?{height:0,width:0,outerHeight:0,outerWidth:0}:original);options.to = {height:original.height * factor.y,width:original.width * factor.x,outerHeight:original.outerHeight * factor.y,outerWidth:original.outerWidth * factor.x}; // Fade option to support puff
if(options.fade){if(mode === "show"){options.from.opacity = 0;options.to.opacity = 1;}if(mode === "hide"){options.from.opacity = 1;options.to.opacity = 0;}} // Animate
el.effect(options);}; /*!
 * jQuery UI Effects Puff 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/puff-effect/
 */var effectPuff=$.effects.effect.puff = function(o,done){var elem=$(this),mode=$.effects.setMode(elem,o.mode || "hide"),hide=mode === "hide",percent=parseInt(o.percent,10) || 150,factor=percent / 100,original={height:elem.height(),width:elem.width(),outerHeight:elem.outerHeight(),outerWidth:elem.outerWidth()};$.extend(o,{effect:"scale",queue:false,fade:true,mode:mode,complete:done,percent:hide?percent:100,from:hide?original:{height:original.height * factor,width:original.width * factor,outerHeight:original.outerHeight * factor,outerWidth:original.outerWidth * factor}});elem.effect(o);}; /*!
 * jQuery UI Effects Pulsate 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/pulsate-effect/
 */var effectPulsate=$.effects.effect.pulsate = function(o,done){var elem=$(this),mode=$.effects.setMode(elem,o.mode || "show"),show=mode === "show",hide=mode === "hide",showhide=show || mode === "hide", // showing or hiding leaves of the "last" animation
anims=(o.times || 5) * 2 + (showhide?1:0),duration=o.duration / anims,animateTo=0,queue=elem.queue(),queuelen=queue.length,i;if(show || !elem.is(":visible")){elem.css("opacity",0).show();animateTo = 1;} // anims - 1 opacity "toggles"
for(i = 1;i < anims;i++) {elem.animate({opacity:animateTo},duration,o.easing);animateTo = 1 - animateTo;}elem.animate({opacity:animateTo},duration,o.easing);elem.queue(function(){if(hide){elem.hide();}done();}); // We just queued up "anims" animations, we need to put them next in the queue
if(queuelen > 1){queue.splice.apply(queue,[1,0].concat(queue.splice(queuelen,anims + 1)));}elem.dequeue();}; /*!
 * jQuery UI Effects Shake 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/shake-effect/
 */var effectShake=$.effects.effect.shake = function(o,done){var el=$(this),props=["position","top","bottom","left","right","height","width"],mode=$.effects.setMode(el,o.mode || "effect"),direction=o.direction || "left",distance=o.distance || 20,times=o.times || 3,anims=times * 2 + 1,speed=Math.round(o.duration / anims),ref=direction === "up" || direction === "down"?"top":"left",positiveMotion=direction === "up" || direction === "left",animation={},animation1={},animation2={},i, // we will need to re-assemble the queue to stack our animations in place
queue=el.queue(),queuelen=queue.length;$.effects.save(el,props);el.show();$.effects.createWrapper(el); // Animation
animation[ref] = (positiveMotion?"-=":"+=") + distance;animation1[ref] = (positiveMotion?"+=":"-=") + distance * 2;animation2[ref] = (positiveMotion?"-=":"+=") + distance * 2; // Animate
el.animate(animation,speed,o.easing); // Shakes
for(i = 1;i < times;i++) {el.animate(animation1,speed,o.easing).animate(animation2,speed,o.easing);}el.animate(animation1,speed,o.easing).animate(animation,speed / 2,o.easing).queue(function(){if(mode === "hide"){el.hide();}$.effects.restore(el,props);$.effects.removeWrapper(el);done();}); // inject all the animations we just queued to be first in line (after "inprogress")
if(queuelen > 1){queue.splice.apply(queue,[1,0].concat(queue.splice(queuelen,anims + 1)));}el.dequeue();}; /*!
 * jQuery UI Effects Slide 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slide-effect/
 */var effectSlide=$.effects.effect.slide = function(o,done){ // Create element
var el=$(this),props=["position","top","bottom","left","right","width","height"],mode=$.effects.setMode(el,o.mode || "show"),show=mode === "show",direction=o.direction || "left",ref=direction === "up" || direction === "down"?"top":"left",positiveMotion=direction === "up" || direction === "left",distance,animation={}; // Adjust
$.effects.save(el,props);el.show();distance = o.distance || el[ref === "top"?"outerHeight":"outerWidth"](true);$.effects.createWrapper(el).css({overflow:"hidden"});if(show){el.css(ref,positiveMotion?isNaN(distance)?"-" + distance:-distance:distance);} // Animation
animation[ref] = (show?positiveMotion?"+=":"-=":positiveMotion?"-=":"+=") + distance; // Animate
el.animate(animation,{queue:false,duration:o.duration,easing:o.easing,complete:function complete(){if(mode === "hide"){el.hide();}$.effects.restore(el,props);$.effects.removeWrapper(el);done();}});}; /*!
 * jQuery UI Effects Transfer 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/transfer-effect/
 */var effectTransfer=$.effects.effect.transfer = function(o,done){var elem=$(this),target=$(o.to),targetFixed=target.css("position") === "fixed",body=$("body"),fixTop=targetFixed?body.scrollTop():0,fixLeft=targetFixed?body.scrollLeft():0,endPosition=target.offset(),animation={top:endPosition.top - fixTop,left:endPosition.left - fixLeft,height:target.innerHeight(),width:target.innerWidth()},startPosition=elem.offset(),transfer=$("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(o.className).css({top:startPosition.top - fixTop,left:startPosition.left - fixLeft,height:elem.innerHeight(),width:elem.innerWidth(),position:targetFixed?"fixed":"absolute"}).animate(animation,o.duration,o.easing,function(){transfer.remove();done();});};});
});

require.register("web/static/js/jquery.paginate", function(exports, require, module) {
'use strict';

(function ($) {
	$.fn.paginate = function (options) {
		var opts = $.extend({}, $.fn.paginate.defaults, options);
		return this.each(function () {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var selectedpage = o.start;
			$.fn.draw(o, $this, selectedpage);
		});
	};
	var outsidewidth_tmp = 0;
	var insidewidth = 0;
	var bName = navigator.appName;
	var bVer = navigator.appVersion;
	if (bVer.indexOf('MSIE 7.0') > 0) var ver = "ie7";
	$.fn.paginate.defaults = {
		count: 5,
		start: 12,
		display: 5,
		border: true,
		border_color: '#fff',
		text_color: '#8cc59d',
		background_color: 'black',
		border_hover_color: '#fff',
		text_hover_color: '#fff',
		background_hover_color: '#fff',
		rotate: true,
		images: true,
		mouse: 'slide',
		onChange: function onChange() {
			return false;
		}
	};
	$.fn.draw = function (o, obj, selectedpage) {
		if (o.display > o.count) o.display = o.count;
		$this.empty();
		if (o.images) {
			var spreviousclass = 'jPag-sprevious-img';
			var previousclass = 'jPag-previous-img';
			var snextclass = 'jPag-snext-img';
			var nextclass = 'jPag-next-img';
		} else {
			var spreviousclass = 'jPag-sprevious';
			var previousclass = 'jPag-previous';
			var snextclass = 'jPag-snext';
			var nextclass = 'jPag-next';
		}
		var _first = $(document.createElement('a')).addClass('jPag-first').html('First');

		if (o.rotate) {
			if (o.images) var _rotleft = $(document.createElement('span')).addClass(spreviousclass);else var _rotleft = $(document.createElement('span')).addClass(spreviousclass).html('&laquo;');
		}

		var _divwrapleft = $(document.createElement('div')).addClass('jPag-control-back');
		_divwrapleft.append(_first).append(_rotleft);

		var _ulwrapdiv = $(document.createElement('div')).css('overflow', 'hidden');
		var _ul = $(document.createElement('ul')).addClass('jPag-pages');
		var c = (o.display - 1) / 2;
		var first = selectedpage - c;
		var selobj;
		for (var i = 0; i < o.count; i++) {
			var val = i + 1;
			if (val == selectedpage) {
				var _obj = $(document.createElement('li')).html('<span class="jPag-current">' + val + '</span>');
				selobj = _obj;
				_ul.append(_obj);
			} else {
				var _obj = $(document.createElement('li')).html('<a>' + val + '</a>');
				_ul.append(_obj);
			}
		}
		_ulwrapdiv.append(_ul);

		if (o.rotate) {
			if (o.images) var _rotright = $(document.createElement('span')).addClass(snextclass);else var _rotright = $(document.createElement('span')).addClass(snextclass).html('&raquo;');
		}

		var _last = $(document.createElement('a')).addClass('jPag-last').html('Last');
		var _divwrapright = $(document.createElement('div')).addClass('jPag-control-front');
		_divwrapright.append(_rotright).append(_last);

		//append all:
		$this.addClass('jPaginate').append(_divwrapleft).append(_ulwrapdiv).append(_divwrapright);

		if (!o.border) {
			if (o.background_color == 'none') var a_css = { 'color': o.text_color };else var a_css = { 'color': o.text_color, 'background-color': o.background_color };
			if (o.background_hover_color == 'none') var hover_css = { 'color': o.text_hover_color };else var hover_css = { 'color': o.text_hover_color, 'background-color': o.background_hover_color };
		} else {
			if (o.background_color == 'none') var a_css = { 'color': o.text_color, 'border': '1px solid ' + o.border_color };else var a_css = { 'color': o.text_color, 'background-color': o.background_color, 'border': '1px solid ' + o.border_color };
			if (o.background_hover_color == 'none') var hover_css = { 'color': o.text_hover_color, 'border': '1px solid ' + o.border_hover_color };else var hover_css = { 'color': o.text_hover_color, 'background-color': o.background_hover_color, 'border': '1px solid ' + o.border_hover_color };
		}

		$.fn.applystyle(o, $this, a_css, hover_css, _first, _ul, _ulwrapdiv, _divwrapright);
		//calculate width of the ones displayed:
		var outsidewidth = outsidewidth_tmp - _first.parent().width() - 3;
		if (ver == 'ie7') {
			_ulwrapdiv.css('width', outsidewidth + 72 + 'px');
			_divwrapright.css('left', outsidewidth_tmp + 6 + 72 + 'px');
		} else {
			_ulwrapdiv.css('width', outsidewidth + 'px');
			_divwrapright.css('left', outsidewidth_tmp + 6 + 'px');
		}

		if (o.rotate) {
			_rotright.hover(function () {
				thumbs_scroll_interval = setInterval(function () {
					var left = _ulwrapdiv.scrollLeft() + 1;
					_ulwrapdiv.scrollLeft(left);
				}, 20);
			}, function () {
				clearInterval(thumbs_scroll_interval);
			});
			_rotleft.hover(function () {
				thumbs_scroll_interval = setInterval(function () {
					var left = _ulwrapdiv.scrollLeft() - 1;
					_ulwrapdiv.scrollLeft(left);
				}, 20);
			}, function () {
				clearInterval(thumbs_scroll_interval);
			});
			if (o.mouse == 'press') {
				_rotright.mousedown(function () {
					thumbs_mouse_interval = setInterval(function () {
						var left = _ulwrapdiv.scrollLeft() + 5;
						_ulwrapdiv.scrollLeft(left);
					}, 20);
				}).mouseup(function () {
					clearInterval(thumbs_mouse_interval);
				});
				_rotleft.mousedown(function () {
					thumbs_mouse_interval = setInterval(function () {
						var left = _ulwrapdiv.scrollLeft() - 5;
						_ulwrapdiv.scrollLeft(left);
					}, 20);
				}).mouseup(function () {
					clearInterval(thumbs_mouse_interval);
				});
			} else {
				_rotleft.click(function (e) {
					var width = outsidewidth - 10;
					var left = _ulwrapdiv.scrollLeft() - width;
					_ulwrapdiv.animate({ scrollLeft: left + 'px' });
				});

				_rotright.click(function (e) {
					var width = outsidewidth - 10;
					var left = _ulwrapdiv.scrollLeft() + width;
					_ulwrapdiv.animate({ scrollLeft: left + 'px' });
				});
			}
		}

		//first and last:
		_first.click(function (e) {
			_ulwrapdiv.animate({ scrollLeft: '0px' });
			_ulwrapdiv.find('li').eq(0).click();
		});
		_last.click(function (e) {
			_ulwrapdiv.animate({ scrollLeft: insidewidth + 'px' });
			_ulwrapdiv.find('li').eq(o.count - 1).click();
		});

		//click a page
		_ulwrapdiv.find('li').click(function (e) {
			selobj.html('<a>' + selobj.find('.jPag-current').html() + '</a>');
			var currval = $(this).find('a').html();
			$(this).html('<span class="jPag-current">' + currval + '</span>');
			selobj = $(this);
			$.fn.applystyle(o, $(this).parent().parent().parent(), a_css, hover_css, _first, _ul, _ulwrapdiv, _divwrapright);
			var left = this.offsetLeft / 2;
			var left2 = _ulwrapdiv.scrollLeft() + left;
			var tmp = left - outsidewidth / 2;
			if (ver == 'ie7') _ulwrapdiv.animate({ scrollLeft: left + tmp - _first.parent().width() + 52 + 'px' });else _ulwrapdiv.animate({ scrollLeft: left + tmp - _first.parent().width() + 'px' });
			o.onChange(currval);
		});

		var last = _ulwrapdiv.find('li').eq(o.start - 1);
		last.attr('id', 'tmp');
		var left = document.getElementById('tmp').offsetLeft / 2;
		last.removeAttr('id');
		var tmp = left - outsidewidth / 2;
		if (ver == 'ie7') _ulwrapdiv.animate({ scrollLeft: left + tmp - _first.parent().width() + 52 + 'px' });else _ulwrapdiv.animate({ scrollLeft: left + tmp - _first.parent().width() + 'px' });
	};

	$.fn.applystyle = function (o, obj, a_css, hover_css, _first, _ul, _ulwrapdiv, _divwrapright) {
		obj.find('a').css(a_css);
		obj.find('span.jPag-current').css(hover_css);
		obj.find('a').hover(function () {
			$(this).css(hover_css);
		}, function () {
			$(this).css(a_css);
		});
		obj.css('padding-left', _first.parent().width() + 5 + 'px');
		insidewidth = 0;

		obj.find('li').each(function (i, n) {
			if (i == o.display - 1) {
				outsidewidth_tmp = this.offsetLeft + this.offsetWidth;
			}
			insidewidth += this.offsetWidth;
		});
		_ul.css('width', insidewidth + 'px');
	};
})(jQuery);
});


//# sourceMappingURL=app.js.map