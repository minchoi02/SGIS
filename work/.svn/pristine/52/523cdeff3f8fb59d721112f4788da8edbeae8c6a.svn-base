//보고서 익스와 크롬을 분기처리하였음. 20190306 leekh
var agent = navigator.userAgent.toLowerCase();
if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	/*
	  html2canvas 0.5.0-alpha1 <http://html2canvas.hertzen.com>
	  Copyright (c) 2015 Niklas von Hertzen

	  Released under MIT License
	*/

	(function(window, document, exports, global, define, undefined){

	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.1
	 */

	(function(){function r(a,b){n[l]=a;n[l+1]=b;l+=2;2===l&&A()}function s(a){return"function"===typeof a}function F(){return function(){process.nextTick(t)}}function G(){var a=0,b=new B(t),c=document.createTextNode("");b.observe(c,{characterData:!0});return function(){c.data=a=++a%2}}function H(){var a=new MessageChannel;a.port1.onmessage=t;return function(){a.port2.postMessage(0)}}function I(){return function(){setTimeout(t,1)}}function t(){for(var a=0;a<l;a+=2)(0,n[a])(n[a+1]),n[a]=void 0,n[a+1]=void 0;
	l=0}function p(){}function J(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function K(a,b,c){r(function(a){var e=!1,f=J(c,b,function(c){e||(e=!0,b!==c?q(a,c):m(a,c))},function(b){e||(e=!0,g(a,b))});!e&&f&&(e=!0,g(a,f))},a)}function L(a,b){1===b.a?m(a,b.b):2===a.a?g(a,b.b):u(b,void 0,function(b){q(a,b)},function(b){g(a,b)})}function q(a,b){if(a===b)g(a,new TypeError("You cannot resolve a promise with itself"));else if("function"===typeof b||"object"===typeof b&&null!==b)if(b.constructor===a.constructor)L(a,
	b);else{var c;try{c=b.then}catch(d){v.error=d,c=v}c===v?g(a,v.error):void 0===c?m(a,b):s(c)?K(a,b,c):m(a,b)}else m(a,b)}function M(a){a.f&&a.f(a.b);x(a)}function m(a,b){void 0===a.a&&(a.b=b,a.a=1,0!==a.e.length&&r(x,a))}function g(a,b){void 0===a.a&&(a.a=2,a.b=b,r(M,a))}function u(a,b,c,d){var e=a.e,f=e.length;a.f=null;e[f]=b;e[f+1]=c;e[f+2]=d;0===f&&a.a&&r(x,a)}function x(a){var b=a.e,c=a.a;if(0!==b.length){for(var d,e,f=a.b,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?C(c,d,e,f):e(f);a.e.length=0}}function D(){this.error=
	null}function C(a,b,c,d){var e=s(c),f,k,h,l;if(e){try{f=c(d)}catch(n){y.error=n,f=y}f===y?(l=!0,k=f.error,f=null):h=!0;if(b===f){g(b,new TypeError("A promises callback cannot return that same promise."));return}}else f=d,h=!0;void 0===b.a&&(e&&h?q(b,f):l?g(b,k):1===a?m(b,f):2===a&&g(b,f))}function N(a,b){try{b(function(b){q(a,b)},function(b){g(a,b)})}catch(c){g(a,c)}}function k(a,b,c,d){this.n=a;this.c=new a(p,d);this.i=c;this.o(b)?(this.m=b,this.d=this.length=b.length,this.l(),0===this.length?m(this.c,
	this.b):(this.length=this.length||0,this.k(),0===this.d&&m(this.c,this.b))):g(this.c,this.p())}function h(a){O++;this.b=this.a=void 0;this.e=[];if(p!==a){if(!s(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof h))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");N(this,a)}}var E=Array.isArray?Array.isArray:function(a){return"[object Array]"===
	Object.prototype.toString.call(a)},l=0,w="undefined"!==typeof window?window:{},B=w.MutationObserver||w.WebKitMutationObserver,w="undefined"!==typeof Uint8ClampedArray&&"undefined"!==typeof importScripts&&"undefined"!==typeof MessageChannel,n=Array(1E3),A;A="undefined"!==typeof process&&"[object process]"==={}.toString.call(process)?F():B?G():w?H():I();var v=new D,y=new D;k.prototype.o=function(a){return E(a)};k.prototype.p=function(){return Error("Array Methods must be provided an Array")};k.prototype.l=
	function(){this.b=Array(this.length)};k.prototype.k=function(){for(var a=this.length,b=this.c,c=this.m,d=0;void 0===b.a&&d<a;d++)this.j(c[d],d)};k.prototype.j=function(a,b){var c=this.n;"object"===typeof a&&null!==a?a.constructor===c&&void 0!==a.a?(a.f=null,this.g(a.a,b,a.b)):this.q(c.resolve(a),b):(this.d--,this.b[b]=this.h(a))};k.prototype.g=function(a,b,c){var d=this.c;void 0===d.a&&(this.d--,this.i&&2===a?g(d,c):this.b[b]=this.h(c));0===this.d&&m(d,this.b)};k.prototype.h=function(a){return a};
	k.prototype.q=function(a,b){var c=this;u(a,void 0,function(a){c.g(1,b,a)},function(a){c.g(2,b,a)})};var O=0;h.all=function(a,b){return(new k(this,a,!0,b)).c};h.race=function(a,b){function c(a){q(e,a)}function d(a){g(e,a)}var e=new this(p,b);if(!E(a))return (g(e,new TypeError("You must pass an array to race.")), e);for(var f=a.length,h=0;void 0===e.a&&h<f;h++)u(this.resolve(a[h]),void 0,c,d);return e};h.resolve=function(a,b){if(a&&"object"===typeof a&&a.constructor===this)return a;var c=new this(p,b);
	q(c,a);return c};h.reject=function(a,b){var c=new this(p,b);g(c,a);return c};h.prototype={constructor:h,then:function(a,b){var c=this.a;if(1===c&&!a||2===c&&!b)return this;var d=new this.constructor(p),e=this.b;if(c){var f=arguments[c-1];r(function(){C(c,d,f,e)})}else u(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}};var z={Promise:h,polyfill:function(){var a;a="undefined"!==typeof global?global:"undefined"!==typeof window&&window.document?window:self;"Promise"in a&&"resolve"in
	a.Promise&&"reject"in a.Promise&&"all"in a.Promise&&"race"in a.Promise&&function(){var b;new a.Promise(function(a){b=a});return s(b)}()||(a.Promise=h)}};"function"===typeof define&&define.amd?define(function(){return z}):"undefined"!==typeof module&&module.exports?module.exports=z:"undefined"!==typeof this&&(this.ES6Promise=z);}).call(window);
	if (window) {
	    window.ES6Promise.polyfill();
	}


	if (typeof(document) === "undefined" || typeof(Object.create) !== "function" || typeof(document.createElement("canvas").getContext) !== "function") {
	    (window || module.exports).html2canvas = function() {
		return Promise.reject("No canvas support");
	    };
	    return;
	}

	/*! https://mths.be/punycode v1.3.1 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			var labels = string.split(regexSeparators);
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.1',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			typeof define == 'function' &&
			typeof define.amd == 'object' &&
			define.amd
		) {
			define('punycode', function() {
				return punycode;
			});
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	var html2canvasNodeAttribute = "data-html2canvas-node";
	var html2canvasCanvasCloneAttribute = "data-html2canvas-canvas-clone";
	var html2canvasCanvasCloneIndex = 0;
	var html2canvasCloneIndex = 0;

	window.html2canvas = function(nodeList, options) {
	    var index = html2canvasCloneIndex++;
	    options = options || {};
	    if (options.logging) {
		window.html2canvas.logging = true;
		window.html2canvas.start = Date.now();
	    }

	    options.async = typeof(options.async) === "undefined" ? true : options.async;
	    options.allowTaint = typeof(options.allowTaint) === "undefined" ? false : options.allowTaint;
	    options.removeContainer = typeof(options.removeContainer) === "undefined" ? true : options.removeContainer;
	    options.javascriptEnabled = typeof(options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
	    options.imageTimeout = typeof(options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
	    options.renderer = typeof(options.renderer) === "function" ? options.renderer : CanvasRenderer;
	    options.strict = !!options.strict;

	    if (typeof(nodeList) === "string") {
		if (typeof(options.proxy) !== "string") {
		    return Promise.reject("Proxy must be used when rendering url");
		}
		var width = options.width != null ? options.width : window.innerWidth;
		var height = options.height != null ? options.height : window.innerHeight;
		return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function(container) {
		    return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
		});
	    }

	    var node = ((nodeList === undefined) ? [document.documentElement] : ((nodeList.length) ? nodeList : [nodeList]))[0];
	    node.setAttribute(html2canvasNodeAttribute + index, index);
	    return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
		if (typeof(options.onrendered) === "function") {
		    log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
		    // 2017. 03. 10 개발팀 수정요청
		    options.onrendered(canvas, nodeList);
		}
		return canvas;
	    });
	};

	window.html2canvas.punycode = this.punycode;
	window.html2canvas.proxy = {};

	function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
	    return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function(container) {
		log("Document cloned");
		var attributeName = html2canvasNodeAttribute + html2canvasIndex;
		var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
		document.querySelector(selector).removeAttribute(attributeName);
		var clonedWindow = container.contentWindow;
		var node = clonedWindow.document.querySelector(selector);
		var oncloneHandler = (typeof(options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
		return oncloneHandler.then(function() {
		    return renderWindow(node, container, options, windowWidth, windowHeight);
		});
	    });
	}

	function renderWindow(node, container, options, windowWidth, windowHeight) {
	    var clonedWindow = container.contentWindow;
	    var support = new Support(clonedWindow.document);
	    var imageLoader = new ImageLoader(options, support);
	    var bounds = getBounds(node);
	    var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
	    var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
	    var renderer = new options.renderer(width, height, imageLoader, options, document);
	    var parser = new NodeParser(node, renderer, support, imageLoader, options);
	    return parser.ready.then(function() {
		log("Finished rendering");
		var canvas;

		if (options.type === "view") {
		    canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
		} else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
		    canvas = renderer.canvas;
		} else {
		    canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: clonedWindow.pageXOffset, y: clonedWindow.pageYOffset});
		}

		cleanupContainer(container, options);
		return canvas;
	    });
	}

	function cleanupContainer(container, options) {
	    if (options.removeContainer) {
		container.parentNode.removeChild(container);
		log("Cleaned up container");
	    }
	}

	function crop(canvas, bounds) {
	    var croppedCanvas = document.createElement("canvas");
	    var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
	    var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
	    var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
	    var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
	    croppedCanvas.width = bounds.width;
	    croppedCanvas.height =  bounds.height;
	    log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", (x2-x1), "height:", (y2-y1));
	    log("Resulting crop with width", bounds.width, "and height", bounds.height, " with x", x1, "and y", y1);
	    croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, x2-x1, y2-y1, bounds.x, bounds.y, x2-x1, y2-y1);
	    return croppedCanvas;
	}

	function documentWidth (doc) {
	    return Math.max(
		Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
		Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
		Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
	    );
	}

	function documentHeight (doc) {
	    return Math.max(
		Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
		Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
		Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
	    );
	}

	function smallImage() {
	    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	}

	function isIE9() {
	    return document.documentMode && document.documentMode <= 9;
	}

	// https://github.com/niklasvh/html2canvas/issues/503
	function cloneNodeIE9(node, javascriptEnabled) {
	    var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

	    var child = node.firstChild;
	    while(child) {
		if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
		    clone.appendChild(cloneNodeIE9(child, javascriptEnabled));
		}
		child = child.nextSibling;
	    }

	    return clone;
	}

	function createWindowClone(ownerDocument, containerDocument, width, height, options, x ,y) {
	    labelCanvasElements(ownerDocument);
	    var documentElement = isIE9() ? cloneNodeIE9(ownerDocument.documentElement, options.javascriptEnabled) : ownerDocument.documentElement.cloneNode(true);
	    var container = containerDocument.createElement("iframe");

	    container.className = "html2canvas-container";
	    container.style.visibility = "hidden";
	    container.style.position = "fixed";
	    container.style.left = "-10000px";
	    container.style.top = "0px";
	    container.style.border = "0";
	    container.width = width;
	    container.height = height;
	    container.scrolling = "no"; // ios won't scroll without it
	    containerDocument.body.appendChild(container);

	    return new Promise(function(resolve) {
		var documentClone = container.contentWindow.document;

		cloneNodeValues(ownerDocument.documentElement, documentElement, "textarea");
		cloneNodeValues(ownerDocument.documentElement, documentElement, "select");

		/* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
		 if window url is about:blank, we can assign the url to current by writing onto the document
		 */
		container.contentWindow.onload = container.onload = function() {
		    var interval = setInterval(function() {
			if (documentClone.body.childNodes.length > 0) {
			    cloneCanvasContents(ownerDocument, documentClone);
			    clearInterval(interval);
			    if (options.type === "view") {
				container.contentWindow.scrollTo(x, y);
			    }
			    resolve(container);
			}
		    }, 50);
		};

		documentClone.open();
		documentClone.write("<!DOCTYPE html><html></html>");
		// Chrome scrolls the parent document for some reason after the write to the cloned window???
		restoreOwnerScroll(ownerDocument, x, y);
		documentClone.replaceChild(options.javascriptEnabled === true ? documentClone.adoptNode(documentElement) : removeScriptNodes(documentClone.adoptNode(documentElement)), documentClone.documentElement);
		documentClone.close();
	    });
	}

	function cloneNodeValues(document, clone, nodeName) {
	    var originalNodes = document.getElementsByTagName(nodeName);
	    var clonedNodes = clone.getElementsByTagName(nodeName);
	    var count = originalNodes.length;
	    for (var i = 0; i < count; i++) {
		clonedNodes[i].value = originalNodes[i].value;
	    }
	}

	function restoreOwnerScroll(ownerDocument, x, y) {
	    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
		ownerDocument.defaultView.scrollTo(x, y);
	    }
	}

	function loadUrlDocument(src, proxy, document, width, height, options) {
	    return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function(doc) {
		return createWindowClone(doc, document, width, height, options, 0, 0);
	    });
	}

	function documentFromHTML(src) {
	    return function(html) {
		var parser = new DOMParser(), doc;
		try {
		    doc = parser.parseFromString(html, "text/html");
		} catch(e) {
		    log("DOMParser not supported, falling back to createHTMLDocument");
		    doc = document.implementation.createHTMLDocument("");
		    try {
			doc.open();
			doc.write(html);
			doc.close();
		    } catch(ee) {
			log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
			doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
		    }
		}

		var b = doc.querySelector("base");
		if (!b || !b.href.host) {
		    var base = doc.createElement("base");
		    base.href = src;
		    doc.head.insertBefore(base, doc.head.firstChild);
		}

		return doc;
	    };
	}


	function labelCanvasElements(ownerDocument) {
	    [].slice.call(ownerDocument.querySelectorAll("canvas"), 0).forEach(function(canvas) {
		canvas.setAttribute(html2canvasCanvasCloneAttribute, "canvas-" + html2canvasCanvasCloneIndex++);
	    });
	}

	function cloneCanvasContents(ownerDocument, documentClone) {
	    [].slice.call(ownerDocument.querySelectorAll("[" + html2canvasCanvasCloneAttribute + "]"), 0).forEach(function(canvas) {
		try {
		    var clonedCanvas = documentClone.querySelector('[' + html2canvasCanvasCloneAttribute + '="' + canvas.getAttribute(html2canvasCanvasCloneAttribute) + '"]');
		    if (clonedCanvas) {
			clonedCanvas.width = canvas.width;
			clonedCanvas.height = canvas.height;
			clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
		    }
		} catch(e) {
		    log("Unable to copy canvas content from", canvas, e);
		}
		canvas.removeAttribute(html2canvasCanvasCloneAttribute);
	    });
	}

	function removeScriptNodes(parent) {
	    [].slice.call(parent.childNodes, 0).filter(isElementNode).forEach(function(node) {
		if (node.tagName === "SCRIPT") {
		    parent.removeChild(node);
		} else {
		    removeScriptNodes(node);
		}
	    });
	    return parent;
	}

	function isElementNode(node) {
	    return node.nodeType === Node.ELEMENT_NODE;
	}

	function absoluteUrl(url) {
	    var link = document.createElement("a");
	    link.href = url;
	    link.href = link.href;
	    return link;
	}

	// http://dev.w3.org/csswg/css-color/

	function Color(value) {
	    this.r = 0;
	    this.g = 0;
	    this.b = 0;
	    this.a = null;
	    var result = this.fromArray(value) ||
		this.namedColor(value) ||
		this.rgb(value) ||
		this.rgba(value) ||
		this.hex6(value) ||
		this.hex3(value);
	}

	Color.prototype.darken = function(amount) {
	    var a = 1 - amount;
	    return  new Color([
		Math.round(this.r * a),
		Math.round(this.g * a),
		Math.round(this.b * a),
		this.a
	    ]);
	};

	Color.prototype.isTransparent = function() {
	    return this.a === 0;
	};

	Color.prototype.isBlack = function() {
	    return this.r === 0 && this.g === 0 && this.b === 0;
	};

	Color.prototype.fromArray = function(array) {
	    if (Array.isArray(array)) {
		this.r = Math.min(array[0], 255);
		this.g = Math.min(array[1], 255);
		this.b = Math.min(array[2], 255);
		if (array.length > 3) {
		    this.a = array[3];
		}
	    }

	    return (Array.isArray(array));
	};

	var _hex3 = /^#([a-f0-9]{3})$/i;

	Color.prototype.hex3 = function(value) {
	    var match = null;
	    if ((match = value.match(_hex3)) !== null) {
		this.r = parseInt(match[1][0] + match[1][0], 16);
		this.g = parseInt(match[1][1] + match[1][1], 16);
		this.b = parseInt(match[1][2] + match[1][2], 16);
	    }
	    return match !== null;
	};

	var _hex6 = /^#([a-f0-9]{6})$/i;

	Color.prototype.hex6 = function(value) {
	    var match = null;
	    if ((match = value.match(_hex6)) !== null) {
		this.r = parseInt(match[1].substring(0, 2), 16);
		this.g = parseInt(match[1].substring(2, 4), 16);
		this.b = parseInt(match[1].substring(4, 6), 16);
	    }
	    return match !== null;
	};


	var _rgb = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;

	Color.prototype.rgb = function(value) {
	    var match = null;
	    if ((match = value.match(_rgb)) !== null) {
		this.r = Number(match[1]);
		this.g = Number(match[2]);
		this.b = Number(match[3]);
	    }
	    return match !== null;
	};

	var _rgba = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;

	Color.prototype.rgba = function(value) {
	    var match = null;
	    if ((match = value.match(_rgba)) !== null) {
		this.r = Number(match[1]);
		this.g = Number(match[2]);
		this.b = Number(match[3]);
		this.a = Number(match[4]);
	    }
	    return match !== null;
	};

	Color.prototype.toString = function() {
	    return this.a !== null && this.a !== 1 ?
	    "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
	    "rgb(" + [this.r, this.g, this.b].join(",") + ")";
	};

	Color.prototype.namedColor = function(value) {
	    var color = colors[value.toLowerCase()];
	    if (color) {
		this.r = color[0];
		this.g = color[1];
		this.b = color[2];
	    } else if (value.toLowerCase() === "transparent") {
		this.r = this.g = this.b = this.a = 0;
		return true;
	    }

	    return !!color;
	};

	Color.prototype.isColor = true;

	// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
	var colors = {
	    "aliceblue": [240, 248, 255],
	    "antiquewhite": [250, 235, 215],
	    "aqua": [0, 255, 255],
	    "aquamarine": [127, 255, 212],
	    "azure": [240, 255, 255],
	    "beige": [245, 245, 220],
	    "bisque": [255, 228, 196],
	    "black": [0, 0, 0],
	    "blanchedalmond": [255, 235, 205],
	    "blue": [0, 0, 255],
	    "blueviolet": [138, 43, 226],
	    "brown": [165, 42, 42],
	    "burlywood": [222, 184, 135],
	    "cadetblue": [95, 158, 160],
	    "chartreuse": [127, 255, 0],
	    "chocolate": [210, 105, 30],
	    "coral": [255, 127, 80],
	    "cornflowerblue": [100, 149, 237],
	    "cornsilk": [255, 248, 220],
	    "crimson": [220, 20, 60],
	    "cyan": [0, 255, 255],
	    "darkblue": [0, 0, 139],
	    "darkcyan": [0, 139, 139],
	    "darkgoldenrod": [184, 134, 11],
	    "darkgray": [169, 169, 169],
	    "darkgreen": [0, 100, 0],
	    "darkgrey": [169, 169, 169],
	    "darkkhaki": [189, 183, 107],
	    "darkmagenta": [139, 0, 139],
	    "darkolivegreen": [85, 107, 47],
	    "darkorange": [255, 140, 0],
	    "darkorchid": [153, 50, 204],
	    "darkred": [139, 0, 0],
	    "darksalmon": [233, 150, 122],
	    "darkseagreen": [143, 188, 143],
	    "darkslateblue": [72, 61, 139],
	    "darkslategray": [47, 79, 79],
	    "darkslategrey": [47, 79, 79],
	    "darkturquoise": [0, 206, 209],
	    "darkviolet": [148, 0, 211],
	    "deeppink": [255, 20, 147],
	    "deepskyblue": [0, 191, 255],
	    "dimgray": [105, 105, 105],
	    "dimgrey": [105, 105, 105],
	    "dodgerblue": [30, 144, 255],
	    "firebrick": [178, 34, 34],
	    "floralwhite": [255, 250, 240],
	    "forestgreen": [34, 139, 34],
	    "fuchsia": [255, 0, 255],
	    "gainsboro": [220, 220, 220],
	    "ghostwhite": [248, 248, 255],
	    "gold": [255, 215, 0],
	    "goldenrod": [218, 165, 32],
	    "gray": [128, 128, 128],
	    "green": [0, 128, 0],
	    "greenyellow": [173, 255, 47],
	    "grey": [128, 128, 128],
	    "honeydew": [240, 255, 240],
	    "hotpink": [255, 105, 180],
	    "indianred": [205, 92, 92],
	    "indigo": [75, 0, 130],
	    "ivory": [255, 255, 240],
	    "khaki": [240, 230, 140],
	    "lavender": [230, 230, 250],
	    "lavenderblush": [255, 240, 245],
	    "lawngreen": [124, 252, 0],
	    "lemonchiffon": [255, 250, 205],
	    "lightblue": [173, 216, 230],
	    "lightcoral": [240, 128, 128],
	    "lightcyan": [224, 255, 255],
	    "lightgoldenrodyellow": [250, 250, 210],
	    "lightgray": [211, 211, 211],
	    "lightgreen": [144, 238, 144],
	    "lightgrey": [211, 211, 211],
	    "lightpink": [255, 182, 193],
	    "lightsalmon": [255, 160, 122],
	    "lightseagreen": [32, 178, 170],
	    "lightskyblue": [135, 206, 250],
	    "lightslategray": [119, 136, 153],
	    "lightslategrey": [119, 136, 153],
	    "lightsteelblue": [176, 196, 222],
	    "lightyellow": [255, 255, 224],
	    "lime": [0, 255, 0],
	    "limegreen": [50, 205, 50],
	    "linen": [250, 240, 230],
	    "magenta": [255, 0, 255],
	    "maroon": [128, 0, 0],
	    "mediumaquamarine": [102, 205, 170],
	    "mediumblue": [0, 0, 205],
	    "mediumorchid": [186, 85, 211],
	    "mediumpurple": [147, 112, 219],
	    "mediumseagreen": [60, 179, 113],
	    "mediumslateblue": [123, 104, 238],
	    "mediumspringgreen": [0, 250, 154],
	    "mediumturquoise": [72, 209, 204],
	    "mediumvioletred": [199, 21, 133],
	    "midnightblue": [25, 25, 112],
	    "mintcream": [245, 255, 250],
	    "mistyrose": [255, 228, 225],
	    "moccasin": [255, 228, 181],
	    "navajowhite": [255, 222, 173],
	    "navy": [0, 0, 128],
	    "oldlace": [253, 245, 230],
	    "olive": [128, 128, 0],
	    "olivedrab": [107, 142, 35],
	    "orange": [255, 165, 0],
	    "orangered": [255, 69, 0],
	    "orchid": [218, 112, 214],
	    "palegoldenrod": [238, 232, 170],
	    "palegreen": [152, 251, 152],
	    "paleturquoise": [175, 238, 238],
	    "palevioletred": [219, 112, 147],
	    "papayawhip": [255, 239, 213],
	    "peachpuff": [255, 218, 185],
	    "peru": [205, 133, 63],
	    "pink": [255, 192, 203],
	    "plum": [221, 160, 221],
	    "powderblue": [176, 224, 230],
	    "purple": [128, 0, 128],
	    "rebeccapurple": [102, 51, 153],
	    "red": [255, 0, 0],
	    "rosybrown": [188, 143, 143],
	    "royalblue": [65, 105, 225],
	    "saddlebrown": [139, 69, 19],
	    "salmon": [250, 128, 114],
	    "sandybrown": [244, 164, 96],
	    "seagreen": [46, 139, 87],
	    "seashell": [255, 245, 238],
	    "sienna": [160, 82, 45],
	    "silver": [192, 192, 192],
	    "skyblue": [135, 206, 235],
	    "slateblue": [106, 90, 205],
	    "slategray": [112, 128, 144],
	    "slategrey": [112, 128, 144],
	    "snow": [255, 250, 250],
	    "springgreen": [0, 255, 127],
	    "steelblue": [70, 130, 180],
	    "tan": [210, 180, 140],
	    "teal": [0, 128, 128],
	    "thistle": [216, 191, 216],
	    "tomato": [255, 99, 71],
	    "turquoise": [64, 224, 208],
	    "violet": [238, 130, 238],
	    "wheat": [245, 222, 179],
	    "white": [255, 255, 255],
	    "whitesmoke": [245, 245, 245],
	    "yellow": [255, 255, 0],
	    "yellowgreen": [154, 205, 50]
	};


	function DummyImageContainer(src) {
	    this.src = src;
	    log("DummyImageContainer for", src);
	    if (!this.promise || !this.image) {
		log("Initiating DummyImageContainer");
		DummyImageContainer.prototype.image = new Image();
		var image = this.image;
		DummyImageContainer.prototype.promise = new Promise(function(resolve, reject) {
		    image.onload = resolve;
		    image.onerror = reject;
		    image.src = smallImage();
		    if (image.complete === true) {
			resolve(image);
		    }
		});
	    }
	}

	function Font(family, size) {
	    var container = document.createElement('div'),
		img = document.createElement('img'),
		span = document.createElement('span'),
		sampleText = 'Hidden Text',
		baseline,
		middle;

	    container.style.visibility = "hidden";
	    container.style.fontFamily = family;
	    container.style.fontSize = size;
	    container.style.margin = 0;
	    container.style.padding = 0;

	    document.body.appendChild(container);

	    img.src = smallImage();
	    img.width = 1;
	    img.height = 1;

	    img.style.margin = 0;
	    img.style.padding = 0;
	    img.style.verticalAlign = "baseline";

	    span.style.fontFamily = family;
	    span.style.fontSize = size;
	    span.style.margin = 0;
	    span.style.padding = 0;

	    span.appendChild(document.createTextNode(sampleText));
	    container.appendChild(span);
	    container.appendChild(img);
	    baseline = (img.offsetTop - span.offsetTop) + 1;

	    container.removeChild(span);
	    container.appendChild(document.createTextNode(sampleText));

	    container.style.lineHeight = "normal";
	    img.style.verticalAlign = "super";

	    middle = (img.offsetTop-container.offsetTop) + 1;

	    document.body.removeChild(container);

	    this.baseline = baseline;
	    this.lineWidth = 1;
	    this.middle = middle;
	}

	function FontMetrics() {
	    this.data = {};
	}

	FontMetrics.prototype.getMetrics = function(family, size) {
	    if (this.data[family + "-" + size] === undefined) {
		this.data[family + "-" + size] = new Font(family, size);
	    }
	    return this.data[family + "-" + size];
	};

	function FrameContainer(container, sameOrigin, options) {
	    this.image = null;
	    this.src = container;
	    var self = this;
	    var bounds = getBounds(container);
	    this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function(resolve) {
		if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
		    container.contentWindow.onload = container.onload = function() {
			resolve(container);
		    };
		} else {
		    resolve(container);
		}
	    })).then(function(container) {
		return html2canvas(container.contentWindow.document.documentElement, {type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2});
	    }).then(function(canvas) {
			console.log("self.image : " + self.image);
		return self.image = canvas;
	    });
	}

	FrameContainer.prototype.proxyLoad = function(proxy, bounds, options) {
	    var container = this.src;
	    return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
	};

	function GradientContainer(imageData) {
	    this.src = imageData.value;
	    this.colorStops = [];
	    this.type = null;
	    this.x0 = 0.5;
	    this.y0 = 0.5;
	    this.x1 = 0.5;
	    this.y1 = 0.5;
	    this.promise = Promise.resolve(true);
	}

	GradientContainer.prototype.TYPES = {
	    LINEAR: 1,
	    RADIAL: 2
	};

	function ImageContainer(src, cors) {
	    this.src = src;
	    this.image = new Image();
	    var self = this;
	    this.tainted = null;
	    this.promise = new Promise(function(resolve, reject) {
		self.image.onload = resolve;
		self.image.onerror = reject;
		if (cors) {
		    self.image.crossOrigin = "anonymous";
		}
		self.image.src = src;
		if (self.image.complete === true) {
		    resolve(self.image);
		}
	    });
	}

	function ImageLoader(options, support) {
	    this.link = null;
	    this.options = options;
	    this.support = support;
	    this.origin = this.getOrigin(window.location.href);
	}

	ImageLoader.prototype.findImages = function(nodes) {
	    var images = [];
	    nodes.reduce(function(imageNodes, container) {
		switch(container.node.nodeName) {
		case "IMG":
		    return imageNodes.concat([{
			args: [container.node.src],
			method: "url"
		    }]);
		case "svg":
		case "IFRAME":
		    return imageNodes.concat([{
			args: [container.node],
			method: container.node.nodeName
		    }]);
		}
		return imageNodes;
	    }, []).forEach(this.addImage(images, this.loadImage), this);
	    return images;
	};

	ImageLoader.prototype.findBackgroundImage = function(images, container) {
	    container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
	    return images;
	};

	ImageLoader.prototype.addImage = function(images, callback) {
	    return function(newImage) {
		newImage.args.forEach(function(image) {
		    if (!this.imageExists(images, image)) {
			images.splice(0, 0, callback.call(this, newImage));
			log('Added image #' + (images.length), typeof(image) === "string" ? image.substring(0, 100) : image);
		    }
		}, this);
	    };
	};

	ImageLoader.prototype.hasImageBackground = function(imageData) {
	    return imageData.method !== "none";
	};

	ImageLoader.prototype.loadImage = function(imageData) {
	    if (imageData.method === "url") {
		var src = imageData.args[0];
		if (this.isSVG(src) && !this.support.svg /*&& !this.options.allowTaint*/) {
		    return new SVGContainer(src);
		} else if (src.match(/data:image\/.*;base64,/i)) {
		    return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
		} else if (this.isSameOrigin(src)/* || this.options.allowTaint === true*/ || this.isSVG(src)) {
		    return new ImageContainer(src, false);
		} else if (this.support.cors /*&& !this.options.allowTaint*/ && this.options.useCORS) {
		    return new ImageContainer(src, true);
		} else if (this.options.proxy) {
		    return new ProxyImageContainer(src, this.options.proxy);
		} else {
		    return new DummyImageContainer(src);
		}
	    } else if (imageData.method === "linear-gradient") {
		return new LinearGradientContainer(imageData);
	    } else if (imageData.method === "gradient") {
		return new WebkitGradientContainer(imageData);
	    } else if (imageData.method === "svg") {
		return new SVGNodeContainer(imageData.args[0], this.support.svg);
	    } else if (imageData.method === "IFRAME") {
		return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
	    } else {
		return new DummyImageContainer(imageData);
	    }
	};

	ImageLoader.prototype.isSVG = function(src) {
	    return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
	};

	ImageLoader.prototype.imageExists = function(images, src) {
	    return images.some(function(image) {
		return image.src === src;
	    });
	};

	ImageLoader.prototype.isSameOrigin = function(url) {
	    return (this.getOrigin(url) === this.origin);
	};

	ImageLoader.prototype.getOrigin = function(url) {
	    var link = this.link || (this.link = document.createElement("a"));
	    link.href = url;
	    link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
	    return link.protocol + link.hostname + link.port;
	};

	ImageLoader.prototype.getPromise = function(container) {
	    return this.timeout(container, this.options.imageTimeout)['catch'](function() {
		var dummy = new DummyImageContainer(container.src);
		return dummy.promise.then(function(image) {
		    container.image = image;
		});
	    });
	};

	ImageLoader.prototype.get = function(src) {
	    var found = null;
	    return this.images.some(function(img) {
		return (found = img).src === src;
	    }) ? found : null;
	};

	ImageLoader.prototype.fetch = function(nodes) {
	    this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
	    this.images.forEach(function(image, index) {
		image.promise.then(function() {
		    log("Succesfully loaded image #"+ (index+1), image);
		}, function(e) {
		    log("Failed loading image #"+ (index+1), image, e);
		});
	    });
	    this.ready = Promise.all(this.images.map(this.getPromise, this));
	    log("Finished searching images");
	    return this;
	};

	ImageLoader.prototype.timeout = function(container, timeout) {
	    var timer;
	    var promise = Promise.race([container.promise, new Promise(function(res, reject) {
		timer = setTimeout(function() {
		    log("Timed out loading image", container);
		    reject(container);
		}, timeout);
	    })]).then(function(container) {
		clearTimeout(timer);
		return container;
	    });
	    promise['catch'](function() {
		clearTimeout(timer);
	    });
	    return promise;
	};

	function LinearGradientContainer(imageData) {
	    GradientContainer.apply(this, arguments);
	    this.type = this.TYPES.LINEAR;

	    var hasDirection = imageData.args[0].match(this.stepRegExp) === null;

	    if (hasDirection) {
		imageData.args[0].split(" ").reverse().forEach(function(position) {
		    switch(position) {
		    case "left":
			this.x0 = 0;
			this.x1 = 1;
			break;
		    case "top":
			this.y0 = 0;
			this.y1 = 1;
			break;
		    case "right":
			this.x0 = 1;
			this.x1 = 0;
			break;
		    case "bottom":
			this.y0 = 1;
			this.y1 = 0;
			break;
		    case "to":
			var y0 = this.y0;
			var x0 = this.x0;
			this.y0 = this.y1;
			this.x0 = this.x1;
			this.x1 = x0;
			this.y1 = y0;
			break;
		    }
		}, this);
	    } else {
		this.y0 = 0;
		this.y1 = 1;
	    }

	    this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
		var colorStopMatch = colorStop.match(this.stepRegExp);
		return {
		    color: new Color(colorStopMatch[1]),
		    stop: colorStopMatch[3] === "%" ? colorStopMatch[2] / 100 : null
		};
	    }, this);

	    if (this.colorStops[0].stop === null) {
		this.colorStops[0].stop = 0;
	    }

	    if (this.colorStops[this.colorStops.length - 1].stop === null) {
		this.colorStops[this.colorStops.length - 1].stop = 1;
	    }

	    this.colorStops.forEach(function(colorStop, index) {
		if (colorStop.stop === null) {
		    this.colorStops.slice(index).some(function(find, count) {
			if (find.stop !== null) {
			    colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
			    return true;
			} else {
			    return false;
			}
		    }, this);
		}
	    }, this);
	}

	LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

	LinearGradientContainer.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/;

	function log() {
	    if (window.html2canvas.logging && window.console && window.console.log) {
		Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - window.html2canvas.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
	    }
	}

	function NodeContainer(node, parent) {
	    this.node = node;
	    this.parent = parent;
	    this.stack = null;
	    this.bounds = null;
	    this.borders = null;
	    this.clip = [];
	    this.backgroundClip = [];
	    this.offsetBounds = null;
	    this.visible = null;
	    this.computedStyles = null;
	    this.colors = {};
	    this.styles = {};
	    this.backgroundImages = null;
	    this.transformData = null;
	    this.transformMatrix = null;
	    this.isPseudoElement = false;
	    this.opacity = null;
	}

	NodeContainer.prototype.cloneTo = function(stack) {
	    stack.visible = this.visible;
	    stack.borders = this.borders;
	    stack.bounds = this.bounds;
	    stack.clip = this.clip;
	    stack.backgroundClip = this.backgroundClip;
	    stack.computedStyles = this.computedStyles;
	    stack.styles = this.styles;
	    stack.backgroundImages = this.backgroundImages;
	    stack.opacity = this.opacity;
	};

	NodeContainer.prototype.getOpacity = function() {
	    return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
	};

	NodeContainer.prototype.assignStack = function(stack) {
	    this.stack = stack;
	    stack.children.push(this);
	};

	NodeContainer.prototype.isElementVisible = function() {
	    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
		this.css('display') !== "none" &&
		this.css('visibility') !== "hidden" &&
		!this.node.hasAttribute("data-html2canvas-ignore") &&
		(this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
	    );
	};

	NodeContainer.prototype.css = function(attribute) {
	    if (!this.computedStyles) {
		this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
	    }

	    return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
	};

	NodeContainer.prototype.prefixedCss = function(attribute) {
	    var prefixes = ["webkit", "moz", "ms", "o"];
	    var value = this.css(attribute);
	    if (value === undefined) {
		prefixes.some(function(prefix) {
		    value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
		    return value !== undefined;
		}, this);
	    }
	    return value === undefined ? null : value;
	};

	NodeContainer.prototype.computedStyle = function(type) {
	    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
	};

	NodeContainer.prototype.cssInt = function(attribute) {
	    var value = parseInt(this.css(attribute), 10);
	    return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
	};

	NodeContainer.prototype.color = function(attribute) {
	    return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
	};

	NodeContainer.prototype.cssFloat = function(attribute) {
	    var value = parseFloat(this.css(attribute));
	    return (isNaN(value)) ? 0 : value;
	};

	NodeContainer.prototype.fontWeight = function() {
	    var weight = this.css("fontWeight");
	    switch(parseInt(weight, 10)){
	    case 401:
		weight = "bold";
		break;
	    case 400:
		weight = "normal";
		break;
	    }
	    return weight;
	};

	NodeContainer.prototype.parseClip = function() {
	    var matches = this.css('clip').match(this.CLIP);
	    if (matches) {
		return {
		    top: parseInt(matches[1], 10),
		    right: parseInt(matches[2], 10),
		    bottom: parseInt(matches[3], 10),
		    left: parseInt(matches[4], 10)
		};
	    }
	    return null;
	};

	NodeContainer.prototype.parseBackgroundImages = function() {
	    return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
	};

	NodeContainer.prototype.cssList = function(property, index) {
	    var value = (this.css(property) || '').split(',');
	    value = value[index || 0] || value[0] || 'auto';
	    value = value.trim().split(' ');
	    if (value.length === 1) {
		value = [value[0], value[0]];
	    }
	    return value;
	};

	NodeContainer.prototype.parseBackgroundSize = function(bounds, image, index) {
	    var size = this.cssList("backgroundSize", index);
	    var width, height;

	    if (isPercentage(size[0])) {
		width = bounds.width * parseFloat(size[0]) / 100;
	    } else if (/contain|cover/.test(size[0])) {
		var targetRatio = bounds.width / bounds.height, currentRatio = image.width / image.height;
		return (targetRatio < currentRatio ^ size[0] === 'contain') ?  {width: bounds.height * currentRatio, height: bounds.height} : {width: bounds.width, height: bounds.width / currentRatio};
	    } else {
		width = parseInt(size[0], 10);
	    }

	    if (size[0] === 'auto' && size[1] === 'auto') {
		height = image.height;
	    } else if (size[1] === 'auto') {
		height = width / image.width * image.height;
	    } else if (isPercentage(size[1])) {
		height =  bounds.height * parseFloat(size[1]) / 100;
	    } else {
		height = parseInt(size[1], 10);
	    }

	    if (size[0] === 'auto') {
		width = height / image.height * image.width;
	    }

	    return {width: width, height: height};
	};

	NodeContainer.prototype.parseBackgroundPosition = function(bounds, image, index, backgroundSize) {
	    var position = this.cssList('backgroundPosition', index);
	    var left, top;

	    if (isPercentage(position[0])){
		left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
	    } else {
		left = parseInt(position[0], 10);
	    }

	    if (position[1] === 'auto') {
		top = left / image.width * image.height;
	    } else if (isPercentage(position[1])){
		top =  (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
	    } else {
		top = parseInt(position[1], 10);
	    }

	    if (position[0] === 'auto') {
		left = top / image.height * image.width;
	    }

	    return {left: left, top: top};
	};

	NodeContainer.prototype.parseBackgroundRepeat = function(index) {
	    return this.cssList("backgroundRepeat", index)[0];
	};

	NodeContainer.prototype.parseTextShadows = function() {
	    var textShadow = this.css("textShadow");
	    var results = [];

	    if (textShadow && textShadow !== 'none') {
		var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
		for (var i = 0; shadows && (i < shadows.length); i++) {
		    var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
		    results.push({
			color: new Color(s[0]),
			offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
			offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
			blur: s[3] ? s[3].replace('px', '') : 0
		    });
		}
	    }
	    return results;
	};

	NodeContainer.prototype.parseTransform = function() {
	    if (!this.transformData) {
		if (this.hasTransform()) {
		    var offset = this.parseBounds();
		    var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
		    origin[0] += offset.left;
		    origin[1] += offset.top;
		    this.transformData = {
			origin: origin,
			matrix: this.parseTransformMatrix()
		    };
		} else {
		    this.transformData = {
			origin: [0, 0],
			matrix: [1, 0, 0, 1, 0, 0]
		    };
		}
	    }
	    return this.transformData;
	};

	NodeContainer.prototype.parseTransformMatrix = function() {
	    if (!this.transformMatrix) {
		var transform = this.prefixedCss("transform");
		var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
		this.transformMatrix = /*matrix ? matrix :*/ [1, 0, 0, 1, 0, 0];
	    }
	    return this.transformMatrix;
	};

	NodeContainer.prototype.parseBounds = function() {
		/*console.log("=============");
		console.log(this.bounds);
		console.log("===offset===");
		console.log(offsetBounds(this.node));
		console.log("===bound===");
		console.log(getBounds(this.node));*/
		
		if (this.hasTransform() != null) {
			this.bounds = offsetBounds(this.node);
			if (isNaN(this.bounds.left)) {
				this.bounds = getBounds(this.node);
			}
		}else {
			this.bounds = getBounds(this.node);
			if (isNaN(this.bounds.left)) {
				this.bounds = offsetBounds(this.node);
			}
		}
		return this.bounds;
		
		/*var bound = this.bounds || (this.bounds = this.hasTransform() != null ? offsetBounds(this.node) : getBounds(this.node));
		
	    return bound; */
	};

	NodeContainer.prototype.hasTransform = function() {
	    return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
	};

	NodeContainer.prototype.getValue = function() {
	    var value = this.node.value || "";
	    if (this.node.tagName === "SELECT") {
		value = selectionValue(this.node);
	    } else if (this.node.type === "password") {
		value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
	    }
	    return value.length === 0 ? (this.node.placeholder || "") : value;
	};

	NodeContainer.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/;
	NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
	NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
	NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

	function selectionValue(node) {
	    var option = node.options[node.selectedIndex || 0];
	    return option ? (option.text || "") : "";
	}

	function parseMatrix(match) {
	    if (match && match[1] === "matrix") {
		return match[2].split(",").map(function(s) {
		    return parseFloat(s.trim());
		});
	    }
	}

	function isPercentage(value) {
	    return value.toString().indexOf("%") !== -1;
	}

	function parseBackgrounds(backgroundImage) {
	    var whitespace = ' \r\n\t',
		method, definition, prefix, prefix_i, block, results = [],
		mode = 0, numParen = 0, quote, args;
	    var appendResult = function() {
		if(method) {
		    if (definition.substr(0, 1) === '"') {
			definition = definition.substr(1, definition.length - 2);
		    }
		    if (definition) {
			args.push(definition);
		    }
		    if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1 ) + 1) > 0) {
			prefix = method.substr(0, prefix_i);
			method = method.substr(prefix_i);
		    }
		    results.push({
			prefix: prefix,
			method: method.toLowerCase(),
			value: block,
			args: args,
			image: null
		    });
		}
		args = [];
		method = prefix = definition = block = '';
	    };
	    args = [];
	    method = prefix = definition = block = '';
	    backgroundImage.split("").forEach(function(c) {
		if (mode === 0 && whitespace.indexOf(c) > -1) {
		    return;
		}
		switch(c) {
		case '"':
		    if(!quote) {
			quote = c;
		    } else if(quote === c) {
			quote = null;
		    }
		    break;
		case '(':
		    if(quote) {
			break;
		    } else if(mode === 0) {
			mode = 1;
			block += c;
			return;
		    } else {
			numParen++;
		    }
		    break;
		case ')':
		    if (quote) {
			break;
		    } else if(mode === 1) {
			if(numParen === 0) {
			    mode = 0;
			    block += c;
			    appendResult();
			    return;
			} else {
			    numParen--;
			}
		    }
		    break;

		case ',':
		    if (quote) {
			break;
		    } else if(mode === 0) {
			appendResult();
			return;
		    } else if (mode === 1) {
			if (numParen === 0 && !method.match(/^url$/i)) {
			    args.push(definition);
			    definition = '';
			    block += c;
			    return;
			}
		    }
		    break;
		}

		block += c;
		if (mode === 0) {
		    method += c;
		} else {
		    definition += c;
		}
	    });

	    appendResult();
	    return results;
	}

	function removePx(str) {
	    return str.replace("px", "");
	}

	function asFloat(str) {
	    return parseFloat(str);
	}

	function getBounds(node) {
	    if (node.getBoundingClientRect) {
		var clientRect = node.getBoundingClientRect();
		var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
		return {
		    top: clientRect.top,
		    bottom: clientRect.bottom || (clientRect.top + clientRect.height),
		    right: clientRect.left + width,
		    left: clientRect.left,
		    width:  width,
		    height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
		};
	    }
	    return {};
	}

	function offsetBounds(node) {
	    var parent = node.offsetParent ? offsetBounds(node.offsetParent) : {top: 0, left: 0};

	    return {
		top: node.offsetTop + parent.top,
		bottom: node.offsetTop + node.offsetHeight + parent.top,
		right: node.offsetLeft + parent.left + node.offsetWidth,
		left: node.offsetLeft + parent.left,
		width: node.offsetWidth,
		height: node.offsetHeight
	    };
	}

	function NodeParser(element, renderer, support, imageLoader, options) {
	    log("Starting NodeParser");
	    this.renderer = renderer;
	    this.options = options;
	    this.range = null;
	    this.support = support;
	    this.renderQueue = [];
	    this.stack = new StackingContext(true, 1, element.ownerDocument, null);
	    var parent = new NodeContainer(element, null);
	    if (options.background) {
		renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
	    }
	    if (element === element.ownerDocument.documentElement) {
		// http://www.w3.org/TR/css3-background/#special-backgrounds
		var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
		renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
	    }
	    parent.visibile = parent.isElementVisible();
	    this.createPseudoHideStyles(element.ownerDocument);
	    this.disableAnimations(element.ownerDocument);
	    this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function(container) {
		return container.visible = container.isElementVisible();
	    }).map(this.getPseudoElements, this));
	    this.fontMetrics = new FontMetrics();
	    log("Fetched nodes, total:", this.nodes.length);
	    log("Calculate overflow clips");
	    this.calculateOverflowClips();
	    log("Start fetching images");
	    this.images = imageLoader.fetch(this.nodes.filter(isElement));
	    this.ready = this.images.ready.then(bind(function() {
		log("Images loaded, starting parsing");
		log("Creating stacking contexts");
		this.createStackingContexts();
		log("Sorting stacking contexts");
		this.sortStackingContexts(this.stack);
		this.parse(this.stack);
		log("Render queue created with " + this.renderQueue.length + " items");
		return new Promise(bind(function(resolve) {
		    if (!options.async) {
			this.renderQueue.forEach(this.paint, this);
			resolve();
		    } else if (typeof(options.async) === "function") {
			options.async.call(this, this.renderQueue, resolve);
		    } else if (this.renderQueue.length > 0){
			this.renderIndex = 0;
			this.asyncRenderer(this.renderQueue, resolve);
		    } else {
			resolve();
		    }
		}, this));
	    }, this));
	}

	NodeParser.prototype.calculateOverflowClips = function() {
	    this.nodes.forEach(function(container) {
		if (isElement(container)) {
		    if (isPseudoElement(container)) {
			container.appendToDOM();
		    }
		    container.borders = this.parseBorders(container);
		    var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
		    var cssClip = container.parseClip();
		    if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
			clip.push([["rect",
				container.bounds.left + cssClip.left,
				container.bounds.top + cssClip.top,
				cssClip.right - cssClip.left,
				cssClip.bottom - cssClip.top
			]]);
		    }
		    container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
		    container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
		    if (isPseudoElement(container)) {
			container.cleanDOM();
		    }
		} else if (isTextNode(container)) {
		    container.clip = hasParentClip(container) ? container.parent.clip : [];
		}
		if (!isPseudoElement(container)) {
		    container.bounds = null;
		}
	    }, this);
	};

	function hasParentClip(container) {
	    return container.parent && container.parent.clip.length;
	}

	NodeParser.prototype.asyncRenderer = function(queue, resolve, asyncTimer) {
	    asyncTimer = asyncTimer || Date.now();
	    this.paint(queue[this.renderIndex++]);
	    if (queue.length === this.renderIndex) {
		resolve();
	    } else if (asyncTimer + 20 > Date.now()) {
		this.asyncRenderer(queue, resolve, asyncTimer);
	    } else {
		setTimeout(bind(function() {
		    this.asyncRenderer(queue, resolve);
		}, this), 0);
	    }
	};

	NodeParser.prototype.createPseudoHideStyles = function(document) {
	    this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
		'.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
	};

	NodeParser.prototype.disableAnimations = function(document) {
	    this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
		'-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
	};

	NodeParser.prototype.createStyles = function(document, styles) {
	    var hidePseudoElements = document.createElement('style');
	    hidePseudoElements.innerHTML = styles;
	    document.body.appendChild(hidePseudoElements);
	};

	NodeParser.prototype.getPseudoElements = function(container) {
	    var nodes = [[container]];
	    if (container.node.nodeType === Node.ELEMENT_NODE) {
		var before = this.getPseudoElement(container, ":before");
		var after = this.getPseudoElement(container, ":after");

		if (before) {
		    nodes.push(before);
		}

		if (after) {
		    nodes.push(after);
		}
	    }
	    return flatten(nodes);
	};

	function toCamelCase(str) {
	    return str.replace(/(\-[a-z])/g, function(match){
		return match.toUpperCase().replace('-','');
	    });
	}

	NodeParser.prototype.getPseudoElement = function(container, type) {
	    var style = container.computedStyle(type);
	    if(!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
		return null;
	    }

	    var content = stripQuotes(style.content);
	    var isImage = content.substr(0, 3) === 'url';
	    var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
	    var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

	    for (var i = style.length-1; i >= 0; i--) {
		var property = toCamelCase(style.item(i));
		pseudoNode.style[property] = style[property];
	    }

	    pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

	    if (isImage) {
		pseudoNode.src = parseBackgrounds(content)[0].args[0];
		return [pseudoContainer];
	    } else {
		var text = document.createTextNode(content);
		pseudoNode.appendChild(text);
		return [pseudoContainer, new TextContainer(text, pseudoContainer)];
	    }
	};


	NodeParser.prototype.getChildren = function(parentContainer) {
	    return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function(node) {
		var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
		return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
	    }, this));
	};

	NodeParser.prototype.newStackingContext = function(container, hasOwnStacking) {
	    var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
	    container.cloneTo(stack);
	    var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
	    parentStack.contexts.push(stack);
	    container.stack = stack;
	};

	NodeParser.prototype.createStackingContexts = function() {
	    this.nodes.forEach(function(container) {
		if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
		    this.newStackingContext(container, true);
		} else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
		    this.newStackingContext(container, false);
		} else {
		    container.assignStack(container.parent.stack);
		}
	    }, this);
	};

	NodeParser.prototype.isBodyWithTransparentRoot = function(container) {
	    return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
	};

	NodeParser.prototype.isRootElement = function(container) {
	    return container.parent === null;
	};

	NodeParser.prototype.sortStackingContexts = function(stack) {
	    stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
	    stack.contexts.forEach(this.sortStackingContexts, this);
	};

	NodeParser.prototype.parseTextBounds = function(container) {
	    return function(text, index, textList) {
		if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
		    if (this.support.rangeBounds && !container.parent.hasTransform()) {
			var offset = textList.slice(0, index).join("").length;
			return this.getRangeBounds(container.node, offset, text.length);
		    } else if (container.node && typeof(container.node.data) === "string") {
			var replacementNode = container.node.splitText(text.length);
			var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
			container.node = replacementNode;
			return bounds;
		    }
		} else if(!this.support.rangeBounds || container.parent.hasTransform()){
		    container.node = container.node.splitText(text.length);
		}
		return {};
	    };
	};

	NodeParser.prototype.getWrapperBounds = function(node, transform) {
	    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
	    var parent = node.parentNode,
		backupText = node.cloneNode(true);

	    wrapper.appendChild(node.cloneNode(true));
	    parent.replaceChild(wrapper, node);
	    var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
	    parent.replaceChild(backupText, wrapper);
	    return bounds;
	};

	NodeParser.prototype.getRangeBounds = function(node, offset, length) {
	    var range = this.range || (this.range = node.ownerDocument.createRange());
	    range.setStart(node, offset);
	    range.setEnd(node, offset + length);
	    return range.getBoundingClientRect();
	};

	function ClearTransform() {}

	NodeParser.prototype.parse = function(stack) {
	    // http://www.w3.org/TR/CSS21/visuren.html#z-index
	    var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
	    var descendantElements = stack.children.filter(isElement);
	    var descendantNonFloats = descendantElements.filter(not(isFloating));
	    var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
	    var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
	    var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
	    var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
	    var text = stack.children.filter(isTextNode).filter(hasText);
	    var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
	    negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
		.concat(inFlow).concat(text).concat(positiveZindex).concat(stackLevel0).forEach(function(container) {
		    this.renderQueue.push(container);
		    if (isStackingContext(container)) {
			this.parse(container);
			this.renderQueue.push(new ClearTransform());
		    }
		}, this);
	};

	NodeParser.prototype.paint = function(container) {
	    try {
		if (container instanceof ClearTransform) {
		    this.renderer.ctx.restore();
		} else if (isTextNode(container)) {
		    if (isPseudoElement(container.parent)) {
			container.parent.appendToDOM();
		    }
		    this.paintText(container);
		    if (isPseudoElement(container.parent)) {
			container.parent.cleanDOM();
		    }
		} else {
		    this.paintNode(container);
		}
	    } catch(e) {
		log(e);
		if (this.options.strict) {
		    throw e;
		}
	    }
	};

	NodeParser.prototype.paintNode = function(container) {
	    if (isStackingContext(container)) {
		this.renderer.setOpacity(container.opacity);
		this.renderer.ctx.save();
		if (container.hasTransform()) {
		    this.renderer.setTransform(container.parseTransform());
		}
	    }

	    if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
		this.paintCheckbox(container);
	    } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
		this.paintRadio(container);
	    } else {
		this.paintElement(container);
	    }
	};

	NodeParser.prototype.paintElement = function(container) {
	    var bounds = container.parseBounds();
	    this.renderer.clip(container.backgroundClip, function() {
		this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
	    }, this);

	    this.renderer.clip(container.clip, function() {
		this.renderer.renderBorders(container.borders.borders);
	    }, this);

	    this.renderer.clip(container.backgroundClip, function() {
		switch (container.node.nodeName) {
		case "svg":
		case "IFRAME":
		    var imgContainer = this.images.get(container.node);
		    if (imgContainer) {
			this.renderer.renderImage(container, bounds, container.borders, imgContainer);
		    } else {
			log("Error loading <" + container.node.nodeName + ">", container.node);
		    }
		    break;
		case "IMG":
		    var imageContainer = this.images.get(container.node.src);
		    if (imageContainer) {
			this.renderer.renderImage(container, bounds, container.borders, imageContainer);
		    } else {
			log("Error loading <img>", container.node.src);
		    }
		    break;
		case "CANVAS":
		    this.renderer.renderImage(container, bounds, container.borders, {image: container.node});
		    break;
		case "SELECT":
		case "INPUT":
		case "TEXTAREA":
		    this.paintFormValue(container);
		    break;
		}
	    }, this);
	};

	NodeParser.prototype.paintCheckbox = function(container) {
	    var b = container.parseBounds();

	    var size = Math.min(b.width, b.height);
	    var bounds = {width: size - 1, height: size - 1, top: b.top, left: b.left};
	    var r = [3, 3];
	    var radius = [r, r, r, r];
	    var borders = [1,1,1,1].map(function(w) {
		return {color: new Color('#A5A5A5'), width: w};
	    });

	    var borderPoints = calculateCurvePoints(bounds, radius, borders);

	    this.renderer.clip(container.backgroundClip, function() {
		this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
		this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
		if (container.node.checked) {
		    this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
		    this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
		}
	    }, this);
	};

	NodeParser.prototype.paintRadio = function(container) {
	    var bounds = container.parseBounds();

	    var size = Math.min(bounds.width, bounds.height) - 2;

	    this.renderer.clip(container.backgroundClip, function() {
		this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
		if (container.node.checked) {
		    this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
		}
	    }, this);
	};

	NodeParser.prototype.paintFormValue = function(container) {
	    var value = container.getValue();
	    if (value.length > 0) {
		var document = container.node.ownerDocument;
		var wrapper = document.createElement('html2canvaswrapper');
		var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
		    'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
		    'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
		    'boxSizing', 'whiteSpace', 'wordWrap'];

		properties.forEach(function(property) {
		    try {
			wrapper.style[property] = container.css(property);
		    } catch(e) {
			// Older IE has issues with "border"
			log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
		    }
		});
		var bounds = container.parseBounds();
		wrapper.style.position = "fixed";
		wrapper.style.left = bounds.left + "px";
		wrapper.style.top = bounds.top + "px";
		wrapper.textContent = value;
		document.body.appendChild(wrapper);
		this.paintText(new TextContainer(wrapper.firstChild, container));
		document.body.removeChild(wrapper);
	    }
	};

	NodeParser.prototype.paintText = function(container) {
	    container.applyTextTransform();
	    var characters = window.html2canvas.punycode.ucs2.decode(container.node.data);
	    var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function(character) {
		return window.html2canvas.punycode.ucs2.encode([character]);
	    });

	    var weight = container.parent.fontWeight();
	    var size = container.parent.css('fontSize');
	    var family = container.parent.css('fontFamily');
	    var shadows = container.parent.parseTextShadows();

	    this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
	    if (shadows.length) {
		// TODO: support multiple text shadows
		this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
	    } else {
		this.renderer.clearShadow();
	    }

	    this.renderer.clip(container.parent.clip, function() {
		textList.map(this.parseTextBounds(container), this).forEach(function(bounds, index) {
		    if (bounds) {
			this.renderer.text(textList[index], bounds.left, bounds.bottom);
			this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
		    }
		}, this);
	    }, this);
	};

	NodeParser.prototype.renderTextDecoration = function(container, bounds, metrics) {
	    switch(container.css("textDecoration").split(" ")[0]) {
	    case "underline":
		// Draws a line at the baseline of the font
		// TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
		this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
		break;
	    case "overline":
		this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
		break;
	    case "line-through":
		// TODO try and find exact position for line-through
		this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
		break;
	    }
	};

	var borderColorTransforms = {
	    inset: [
		["darken", 0.60],
		["darken", 0.10],
		["darken", 0.10],
		["darken", 0.60]
	    ]
	};

	NodeParser.prototype.parseBorders = function(container) {
	    var nodeBounds = container.parseBounds();
	    var radius = getBorderRadiusData(container);
	    var borders = ["Top", "Right", "Bottom", "Left"].map(function(side, index) {
		var style = container.css('border' + side + 'Style');
		var color = container.color('border' + side + 'Color');
		if (style === "inset" && color.isBlack()) {
		    color = new Color([255, 255, 255, color.a]); // this is wrong, but
		}
		var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
		return {
		    width: container.cssInt('border' + side + 'Width'),
		    color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
		    args: null
		};
	    });
	    var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

	    return {
		clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
		borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
	    };
	};

	function calculateBorders(borders, nodeBounds, borderPoints, radius) {
	    return borders.map(function(border, borderSide) {
		if (border.width > 0) {
		    var bx = nodeBounds.left;
		    var by = nodeBounds.top;
		    var bw = nodeBounds.width;
		    var bh = nodeBounds.height - (borders[2].width);

		    switch(borderSide) {
		    case 0:
			// top border
			bh = borders[0].width;
			border.args = drawSide({
				c1: [bx, by],
				c2: [bx + bw, by],
				c3: [bx + bw - borders[1].width, by + bh],
				c4: [bx + borders[3].width, by + bh]
			    }, radius[0], radius[1],
			    borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
			break;
		    case 1:
			// right border
			bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
			bw = borders[1].width;

			border.args = drawSide({
				c1: [bx + bw, by],
				c2: [bx + bw, by + bh + borders[2].width],
				c3: [bx, by + bh],
				c4: [bx, by + borders[0].width]
			    }, radius[1], radius[2],
			    borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
			break;
		    case 2:
			// bottom border
			by = (by + nodeBounds.height) - (borders[2].width);
			bh = borders[2].width;
			border.args = drawSide({
				c1: [bx + bw, by + bh],
				c2: [bx, by + bh],
				c3: [bx + borders[3].width, by],
				c4: [bx + bw - borders[3].width, by]
			    }, radius[2], radius[3],
			    borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
			break;
		    case 3:
			// left border
			bw = borders[3].width;
			border.args = drawSide({
				c1: [bx, by + bh + borders[2].width],
				c2: [bx, by],
				c3: [bx + bw, by + borders[0].width],
				c4: [bx + bw, by + bh]
			    }, radius[3], radius[0],
			    borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
			break;
		    }
		}
		return border;
	    });
	}

	NodeParser.prototype.parseBackgroundClip = function(container, borderPoints, borders, radius, bounds) {
	    var backgroundClip = container.css('backgroundClip'),
		borderArgs = [];

	    switch(backgroundClip) {
	    case "content-box":
	    case "padding-box":
		parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
		parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
		parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
		parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
		break;

	    default:
		parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
		parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
		parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
		parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
		break;
	    }

	    return borderArgs;
	};

	function getCurvePoints(x, y, r1, r2) {
	    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
	    var ox = (r1) * kappa, // control point offset horizontal
		oy = (r2) * kappa, // control point offset vertical
		xm = x + r1, // x-middle
		ym = y + r2; // y-middle
	    return {
		topLeft: bezierCurve({x: x, y: ym}, {x: x, y: ym - oy}, {x: xm - ox, y: y}, {x: xm, y: y}),
		topRight: bezierCurve({x: x, y: y}, {x: x + ox,y: y}, {x: xm, y: ym - oy}, {x: xm, y: ym}),
		bottomRight: bezierCurve({x: xm, y: y}, {x: xm, y: y + oy}, {x: x + ox, y: ym}, {x: x, y: ym}),
		bottomLeft: bezierCurve({x: xm, y: ym}, {x: xm - ox, y: ym}, {x: x, y: y + oy}, {x: x, y:y})
	    };
	}

	function calculateCurvePoints(bounds, borderRadius, borders) {
	    var x = bounds.left,
		y = bounds.top,
		width = bounds.width,
		height = bounds.height,

		tlh = borderRadius[0][0],
		tlv = borderRadius[0][1],
		trh = borderRadius[1][0],
		trv = borderRadius[1][1],
		brh = borderRadius[2][0],
		brv = borderRadius[2][1],
		blh = borderRadius[3][0],
		blv = borderRadius[3][1];

	    var topWidth = width - trh,
		rightHeight = height - brv,
		bottomWidth = width - brh,
		leftHeight = height - blv;

	    return {
		topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
		topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
		topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
		topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
		bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
		bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width),  brv - borders[2].width).bottomRight.subdivide(0.5),
		bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
		bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
	    };
	}

	function bezierCurve(start, startControl, endControl, end) {
	    var lerp = function (a, b, t) {
		return {
		    x: a.x + (b.x - a.x) * t,
		    y: a.y + (b.y - a.y) * t
		};
	    };

	    return {
		start: start,
		startControl: startControl,
		endControl: endControl,
		end: end,
		subdivide: function(t) {
		    var ab = lerp(start, startControl, t),
			bc = lerp(startControl, endControl, t),
			cd = lerp(endControl, end, t),
			abbc = lerp(ab, bc, t),
			bccd = lerp(bc, cd, t),
			dest = lerp(abbc, bccd, t);
		    return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
		},
		curveTo: function(borderArgs) {
		    borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
		},
		curveToReversed: function(borderArgs) {
		    borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
		}
	    };
	}

	function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
	    var borderArgs = [];

	    if (radius1[0] > 0 || radius1[1] > 0) {
		borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
		outer1[1].curveTo(borderArgs);
	    } else {
		borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
	    }

	    if (radius2[0] > 0 || radius2[1] > 0) {
		borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
		outer2[0].curveTo(borderArgs);
		borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
		inner2[0].curveToReversed(borderArgs);
	    } else {
		borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
		borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
	    }

	    if (radius1[0] > 0 || radius1[1] > 0) {
		borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
		inner1[1].curveToReversed(borderArgs);
	    } else {
		borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
	    }

	    return borderArgs;
	}

	function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
	    if (radius1[0] > 0 || radius1[1] > 0) {
		borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
		corner1[0].curveTo(borderArgs);
		corner1[1].curveTo(borderArgs);
	    } else {
		borderArgs.push(["line", x, y]);
	    }

	    if (radius2[0] > 0 || radius2[1] > 0) {
		borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
	    }
	}

	function negativeZIndex(container) {
	    return container.cssInt("zIndex") < 0;
	}

	function positiveZIndex(container) {
	    return container.cssInt("zIndex") > 0;
	}

	function zIndex0(container) {
	    return container.cssInt("zIndex") === 0;
	}

	function inlineLevel(container) {
	    return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
	}

	function isStackingContext(container) {
	    return (container instanceof StackingContext);
	}

	function hasText(container) {
	    return container.node.data.trim().length > 0;
	}

	function noLetterSpacing(container) {
	    return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
	}

	function getBorderRadiusData(container) {
	    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
		var value = container.css('border' + side + 'Radius');
		var arr = value.split(" ");
		if (arr.length <= 1) {
		    arr[1] = arr[0];
		}
		return arr.map(asInt);
	    });
	}

	function renderableNode(node) {
	    return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
	}

	function isPositionedForStacking(container) {
	    var position = container.css("position");
	    var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
	    return zIndex !== "auto";
	}

	function isPositioned(container) {
	    return container.css("position") !== "static";
	}

	function isFloating(container) {
	    return container.css("float") !== "none";
	}

	function isInlineBlock(container) {
	    return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
	}

	function not(callback) {
	    var context = this;
	    return function() {
		return !callback.apply(context, arguments);
	    };
	}

	function isElement(container) {
	    return container.node.nodeType === Node.ELEMENT_NODE;
	}

	function isPseudoElement(container) {
	    return container.isPseudoElement === true;
	}

	function isTextNode(container) {
	    return container.node.nodeType === Node.TEXT_NODE;
	}

	function zIndexSort(contexts) {
	    return function(a, b) {
		return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
	    };
	}

	function hasOpacity(container) {
	    return container.getOpacity() < 1;
	}

	function bind(callback, context) {
	    return function() {
		return callback.apply(context, arguments);
	    };
	}

	function asInt(value) {
	    return parseInt(value, 10);
	}

	function getWidth(border) {
	    return border.width;
	}

	function nonIgnoredElement(nodeContainer) {
	    return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
	}

	function flatten(arrays) {
	    return [].concat.apply([], arrays);
	}

	function stripQuotes(content) {
	    var first = content.substr(0, 1);
	    return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
	}

	function getWords(characters) {
	    var words = [], i = 0, onWordBoundary = false, word;
	    while(characters.length) {
		if (isWordBoundary(characters[i]) === onWordBoundary) {
		    word = characters.splice(0, i);
		    if (word.length) {
			words.push(window.html2canvas.punycode.ucs2.encode(word));
		    }
		    onWordBoundary =! onWordBoundary;
		    i = 0;
		} else {
		    i++;
		}

		if (i >= characters.length) {
		    word = characters.splice(0, i);
		    if (word.length) {
			words.push(window.html2canvas.punycode.ucs2.encode(word));
		    }
		}
	    }
	    return words;
	}

	function isWordBoundary(characterCode) {
	    return [
		32, // <space>
		13, // \r
		10, // \n
		9, // \t
		45 // -
	    ].indexOf(characterCode) !== -1;
	}

	function hasUnicode(string) {
	    return (/[^\u0000-\u00ff]/).test(string);
	}

	function Proxy(src, proxyUrl, document) {
	    if (!proxyUrl) {
		return Promise.reject("No proxy configured");
	    }
	    var callback = createCallback(supportsCORS);
	    var url = createProxyUrl(proxyUrl, src, callback);

	    return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function(response) {
		return decode64(response.content);
	    }));
	}
	var proxyCount = 0;

	var supportsCORS = ('withCredentials' in new XMLHttpRequest());
	var supportsCORSImage = ('crossOrigin' in new Image());

	function ProxyURL(src, proxyUrl, document) {
	    var callback = createCallback(supportsCORSImage);
	    var url = createProxyUrl(proxyUrl, src, callback);
	    return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function(response) {
		return "data:" + response.type + ";base64," + response.content;
	    }));
	}

	function jsonp(document, url, callback) {
	    return new Promise(function(resolve, reject) {
		var s = document.createElement("script");
		var cleanup = function() {
		    delete window.html2canvas.proxy[callback];
		    document.body.removeChild(s);
		};
		window.html2canvas.proxy[callback] = function(response) {
		    cleanup();
		    resolve(response);
		};
		s.src = url;
		s.onerror = function(e) {
		    cleanup();
		    reject(e);
		};
		document.body.appendChild(s);
	    });
	}

	function createCallback(useCORS) {
	    return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
	}

	function createProxyUrl(proxyUrl, src, callback) {
	    return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
	}

	function ProxyImageContainer(src, proxy) {
	    var script = document.createElement("script");
	    var link = document.createElement("a");
	    link.href = src;
	    src = link.href;
	    this.src = src;
	    this.image = new Image();
	    var self = this;
	    this.promise = new Promise(function(resolve, reject) {
		self.image.crossOrigin = "Anonymous";
		self.image.onload = resolve;
		self.image.onerror = reject;

		new ProxyURL(src, proxy, document).then(function(url) {
		    self.image.src = url;
		})['catch'](reject);
	    });
	}

	function PseudoElementContainer(node, parent, type) {
	    NodeContainer.call(this, node, parent);
	    this.isPseudoElement = true;
	    this.before = type === ":before";
	}

	PseudoElementContainer.prototype.cloneTo = function(stack) {
	    PseudoElementContainer.prototype.cloneTo.call(this, stack);
	    stack.isPseudoElement = true;
	    stack.before = this.before;
	};

	PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

	PseudoElementContainer.prototype.appendToDOM = function() {
	    if (this.before) {
		this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
	    } else {
		this.parent.node.appendChild(this.node);
	    }
	    this.parent.node.className += " " + this.getHideClass();
	};

	PseudoElementContainer.prototype.cleanDOM = function() {
	    this.node.parentNode.removeChild(this.node);
	    this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
	};

	PseudoElementContainer.prototype.getHideClass = function() {
	    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
	};

	PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
	PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

	function Renderer(width, height, images, options, document) {
	    this.width = width;
	    this.height = height;
	    this.images = images;
	    this.options = options;
	    this.document = document;
	}

	Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
	    var paddingLeft = container.cssInt('paddingLeft'),
		paddingTop = container.cssInt('paddingTop'),
		paddingRight = container.cssInt('paddingRight'),
		paddingBottom = container.cssInt('paddingBottom'),
		marginLeft = container.cssInt('marginLeft'),
		marginTop = container.cssInt('marginTop'),
		borders = borderData.borders;
		/*console.log(container.width);
		if (marginLeft != 0) {
			marginLeft = 100;
		}
		if (marginTop != 0) {
			marginTop = 100;
		}*/

	    var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
	    var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
	    this.drawImage(
		imageContainer,
		0,
		0,
		imageContainer.image.width || width,
		imageContainer.image.height || height,
		bounds.left + paddingLeft + borders[3].width,
		bounds.top + paddingTop + borders[0].width,
		width,
		height, 
		container
	    );
	};

	Renderer.prototype.renderBackground = function(container, bounds, borderData) {
	    if (bounds.height > 0 && bounds.width > 0) {
		this.renderBackgroundColor(container, bounds);
		this.renderBackgroundImage(container, bounds, borderData);
	    }
	};

	Renderer.prototype.renderBackgroundColor = function(container, bounds) {
	    var color = container.color("backgroundColor");
	    if (!color.isTransparent()) {
		this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
	    }
	};

	Renderer.prototype.renderBorders = function(borders) {
	    borders.forEach(this.renderBorder, this);
	};

	Renderer.prototype.renderBorder = function(data) {
	    if (!data.color.isTransparent() && data.args !== null) {
		this.drawShape(data.args, data.color);
	    }
	};

	Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
	    var backgroundImages = container.parseBackgroundImages();
	    backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
		switch(backgroundImage.method) {
		case "url":
		    var image = this.images.get(backgroundImage.args[0]);
		    if (image) {
			this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
		    } else {
			log("Error loading background-image", backgroundImage.args[0]);
		    }
		    break;
		case "linear-gradient":
		case "gradient":
		    var gradientImage = this.images.get(backgroundImage.value);
		    if (gradientImage) {
			this.renderBackgroundGradient(gradientImage, bounds, borderData);
		    } else {
			log("Error loading background-image", backgroundImage.args[0]);
		    }
		    break;
		case "none":
		    break;
		default:
		    log("Unknown background-image type", backgroundImage.args[0]);
		}
	    }, this);
	};

	Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
	    var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
	    var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
	    var repeat = container.parseBackgroundRepeat(index);
	    switch (repeat) {
	    case "repeat-x":
	    case "repeat no-repeat":
		this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
		break;
	    case "repeat-y":
	    case "no-repeat repeat":
		this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
		break;
	    case "no-repeat":
		this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
		break;
	    default:
		this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
		break;
	    }
	};

	function StackingContext(hasOwnStacking, opacity, element, parent) {
	    NodeContainer.call(this, element, parent);
	    this.ownStacking = hasOwnStacking;
	    this.contexts = [];
	    this.children = [];
	    this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
	}

	StackingContext.prototype = Object.create(NodeContainer.prototype);

	StackingContext.prototype.getParentStack = function(context) {
	    var parentStack = (this.parent) ? this.parent.stack : null;
	    return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
	};

	function Support(document) {
	    this.rangeBounds = this.testRangeBounds(document);
	    this.cors = this.testCORS();
	    this.svg = this.testSVG();
	}

	Support.prototype.testRangeBounds = function(document) {
	    var range, testElement, rangeBounds, rangeHeight, support = false;

	    if (document.createRange) {
		range = document.createRange();
		if (range.getBoundingClientRect) {
		    testElement = document.createElement('boundtest');
		    testElement.style.height = "123px";
		    testElement.style.display = "block";
		    document.body.appendChild(testElement);

		    range.selectNode(testElement);
		    rangeBounds = range.getBoundingClientRect();
		    rangeHeight = rangeBounds.height;

		    if (rangeHeight === 123) {
			support = true;
		    }
		    document.body.removeChild(testElement);
		}
	    }

	    return support;
	};

	Support.prototype.testCORS = function() {
	    return typeof((new Image()).crossOrigin) !== "undefined";
	};

	Support.prototype.testSVG = function() {
	    var img = new Image();
	    var canvas = document.createElement("canvas");
	    var ctx =  canvas.getContext("2d");
	    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

	    try {
		ctx.drawImage(img, 0, 0);
		canvas.toDataURL();
	    } catch(e) {
		return false;
	    }
	    return true;
	};

	function SVGContainer(src) {
	    this.src = src;
	    this.image = null;
	    var self = this;

	    this.promise = this.hasFabric().then(function() {
		return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
	    }).then(function(svg) {
		return new Promise(function(resolve) {
		    html2canvas.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
		});
	    });
	}

	SVGContainer.prototype.hasFabric = function() {
	    return !html2canvas.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
	};

	SVGContainer.prototype.inlineFormatting = function(src) {
	    return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
	};

	SVGContainer.prototype.removeContentType = function(src) {
	    return src.replace(/^data:image\/svg\+xml(;base64)?,/,'');
	};

	SVGContainer.prototype.isInline = function(src) {
	    return (/^data:image\/svg\+xml/i.test(src));
	};

	SVGContainer.prototype.createCanvas = function(resolve) {
	    var self = this;
	    return function (objects, options) {
		var canvas = new html2canvas.fabric.StaticCanvas('c');
		self.image = canvas.lowerCanvasEl;
		canvas
		    .setWidth(options.width)
		    .setHeight(options.height)
		    .add(html2canvas.fabric.util.groupSVGElements(objects, options))
		    .renderAll();
		resolve(canvas.lowerCanvasEl);
	    };
	};

	SVGContainer.prototype.decode64 = function(str) {
	    return (typeof(window.atob) === "function") ? window.atob(str) : decode64(str);
	};

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */

	function decode64(base64) {
	    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	    var len = base64.length, i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

	    var output = "";

	    for (i = 0; i < len; i+=4) {
		encoded1 = chars.indexOf(base64[i]);
		encoded2 = chars.indexOf(base64[i+1]);
		encoded3 = chars.indexOf(base64[i+2]);
		encoded4 = chars.indexOf(base64[i+3]);

		byte1 = (encoded1 << 2) | (encoded2 >> 4);
		byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
		byte3 = ((encoded3 & 3) << 6) | encoded4;
		if (encoded3 === 64) {
		    output += String.fromCharCode(byte1);
		} else if (encoded4 === 64 || encoded4 === -1) {
		    output += String.fromCharCode(byte1, byte2);
		} else{
		    output += String.fromCharCode(byte1, byte2, byte3);
		}
	    }

	    return output;
	}

	function SVGNodeContainer(node, native) {
	    this.src = node;
	    this.image = null;
	    var self = this;

	    this.promise = native ? new Promise(function(resolve, reject) {
		self.image = new Image();
		self.image.onload = resolve;
		self.image.onerror = reject;
		self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
		if (self.image.complete === true) {
		    resolve(self.image);
		}
	    }) : this.hasFabric().then(function() {
		return new Promise(function(resolve) {
		    html2canvas.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
		});
	    });
	}

	SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

	function TextContainer(node, parent) {
	    NodeContainer.call(this, node, parent);
	}

	TextContainer.prototype = Object.create(NodeContainer.prototype);

	TextContainer.prototype.applyTextTransform = function() {
	    this.node.data = this.transform(this.parent.css("textTransform"));
	};

	TextContainer.prototype.transform = function(transform) {
	    var text = this.node.data;
	    switch(transform){
		case "lowercase":
		    return text.toLowerCase();
		case "capitalize":
		    return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
		case "uppercase":
		    return text.toUpperCase();
		default:
		    return text;
	    }
	};

	function capitalize(m, p1, p2) {
	    if (m.length > 0) {
		return p1 + p2.toUpperCase();
	    }
	}

	function WebkitGradientContainer(imageData) {
	    GradientContainer.apply(this, arguments);
	    this.type = (imageData.args[0] === "linear") ? this.TYPES.LINEAR : this.TYPES.RADIAL;
	}

	WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

	function XHR(url) {
	    return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);

		xhr.onload = function() {
		    if (xhr.status === 200) {
			resolve(xhr.responseText);
		    } else {
			reject(new Error(xhr.statusText));
		    }
		};

		xhr.onerror = function() {
		    reject(new Error("Network Error"));
		};

		xhr.send();
	    });
	}

	function CanvasRenderer(width, height) {
	    Renderer.apply(this, arguments);
	    this.canvas = this.options.canvas || this.document.createElement("canvas");
	    if (!this.options.canvas) {
		this.canvas.width = width;
		this.canvas.height = height;
	    }
	    this.ctx = this.canvas.getContext("2d");
	    this.taintCtx = this.document.createElement("canvas").getContext("2d");
	    this.ctx.textBaseline = "bottom";
	    this.variables = {};
	    log("Initialized CanvasRenderer with size", width, "x", height);
	}

	CanvasRenderer.prototype = Object.create(Renderer.prototype);

	CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
	    this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
	    return this.ctx;
	};

	CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
	    this.setFillStyle(color).fillRect(left, top, width, height);
	};

	CanvasRenderer.prototype.circle = function(left, top, size, color) {
	    this.setFillStyle(color);
	    this.ctx.beginPath();
	    this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
	    this.ctx.closePath();
	    this.ctx.fill();
	};

	CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
	    this.circle(left, top, size, color);
	    this.ctx.strokeStyle = strokeColor.toString();
	    this.ctx.stroke();
	};

	CanvasRenderer.prototype.drawShape = function(shape, color) {
	    this.shape(shape);
	    this.setFillStyle(color).fill();
	};

	CanvasRenderer.prototype.taints = function(imageContainer) {
	    if (imageContainer.tainted === null) {
		this.taintCtx.drawImage(imageContainer.image, 0, 0);
		try {
		    this.taintCtx.getImageData(0, 0, 1, 1);
		    imageContainer.tainted = false;
		} catch(e) {
		    this.taintCtx = document.createElement("canvas").getContext("2d");
		    imageContainer.tainted = true;
		}
	    }

	    return imageContainer.tainted;
	};

	CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh, container) {
	    if (!this.taints(imageContainer) || this.options.allowTaint) {
		//canvas
		if (imageContainer.src === undefined) {
			this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
			return;
		}
		
		//canvas 제외 - image, svg 등
		if (typeof imageContainer.src !== "string") {
			if (imageContainer.src.nodeName === "svg") {
				var originDx = 0;
				var originDy = 0;
				if (container != undefined) {
					var transform = container.prefixedCss("transform");
					if (transform != "none") {
						var matrix = parseMatrix(transform.match(container.MATRIX_PROPERTY));
						// 2017. 03. 10 개발팀 수정요청
						if (matrix != undefined) {
							originDx = matrix[4];
						originDy = matrix[5];
						}
					}
				}
				this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx-originDx, dy-originDy, dw, dh);
			}else {
				this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
			}
		}else {
			this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
		}
		
	    }
	};

	CanvasRenderer.prototype.clip = function(shapes, callback, context) {
	    this.ctx.save();
	    shapes.filter(hasEntries).forEach(function(shape) {
		this.shape(shape).clip();
	    }, this);
	    callback.call(context);
	    this.ctx.restore();
	};

	CanvasRenderer.prototype.shape = function(shape) {
	    this.ctx.beginPath();
	    shape.forEach(function(point, index) {
		if (point[0] === "rect") {
		    this.ctx.rect.apply(this.ctx, point.slice(1));
		} else {
		    this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
		}
	    }, this);
	    this.ctx.closePath();
	    return this.ctx;
	};

	CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
	    this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
	};

	CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
	    this.setVariable("shadowColor", color.toString())
		.setVariable("shadowOffsetY", offsetX)
		.setVariable("shadowOffsetX", offsetY)
		.setVariable("shadowBlur", blur);
	};

	CanvasRenderer.prototype.clearShadow = function() {
	    this.setVariable("shadowColor", "rgba(0,0,0,0)");
	};

	CanvasRenderer.prototype.setOpacity = function(opacity) {
	    this.ctx.globalAlpha = opacity;
	};

	CanvasRenderer.prototype.setTransform = function(transform) {
	    this.ctx.translate(transform.origin[0], transform.origin[1]);
	    this.ctx.transform.apply(this.ctx, transform.matrix);
	    this.ctx.translate(-transform.origin[0], -transform.origin[1]);
	};

	CanvasRenderer.prototype.setVariable = function(property, value) {
	    if (this.variables[property] !== value) {
		this.variables[property] = this.ctx[property] = value;
	    }

	    return this;
	};

	CanvasRenderer.prototype.text = function(text, left, bottom) {
	    this.ctx.fillText(text, left, bottom);
	};
	//
	CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
	    var shape = [
		["line", Math.round(left), Math.round(top)],
		["line", Math.round(left + width), Math.round(top)],
		["line", Math.round(left + width), Math.round(height + top)],
		["line", Math.round(left), Math.round(height + top)]
	    ];
	    this.clip([shape], function() {
		this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
	    }, this);
	};

	CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
	    var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
	    this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
	    this.ctx.translate(offsetX, offsetY);
	    this.ctx.fill();
	    this.ctx.translate(-offsetX, -offsetY);
	};

	CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
	    if (gradientImage instanceof LinearGradientContainer) {
		var gradient = this.ctx.createLinearGradient(
		    bounds.left + bounds.width * gradientImage.x0,
		    bounds.top + bounds.height * gradientImage.y0,
		    bounds.left +  bounds.width * gradientImage.x1,
		    bounds.top +  bounds.height * gradientImage.y1);
		gradientImage.colorStops.forEach(function(colorStop) {
		    gradient.addColorStop(colorStop.stop, colorStop.color.toString());
		});
		this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
	    }
	};

	CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
	    var image = imageContainer.image;
	    if(image.width === size.width && image.height === size.height) {
		return image;
	    }

	    var ctx, canvas = document.createElement('canvas');
	    canvas.width = size.width;
	    canvas.height = size.height;
	    ctx = canvas.getContext("2d");
	    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
	    return canvas;
	};

	function hasEntries(array) {
	    return array.length > 0;
	}

	}).call({}, typeof(window) !== "undefined" ? window : undefined, typeof(document) !== "undefined" ? document : undefined);		

}else{
	//최신버전 크롬 되게 적용함	
	/*!
	 * html2canvas 1.0.0-alpha.11 <https://html2canvas.hertzen.com>
	 * Copyright (c) 2018 Niklas von Hertzen <https://hertzen.com>
	 * Released under MIT License
	 */
	(function webpackUniversalModuleDefinition(root, factory) {
		if(typeof exports === 'object' && typeof module === 'object')
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["html2canvas"] = factory();
		else
			root["html2canvas"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
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
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 27);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	// http://dev.w3.org/csswg/css-color/

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HEX3 = /^#([a-f0-9]{3})$/i;
	var hex3 = function hex3(value) {
		var match = value.match(HEX3);
		if (match) {
			return [parseInt(match[1][0] + match[1][0], 16), parseInt(match[1][1] + match[1][1], 16), parseInt(match[1][2] + match[1][2], 16), null];
		}
		return false;
	};

	var HEX6 = /^#([a-f0-9]{6})$/i;
	var hex6 = function hex6(value) {
		var match = value.match(HEX6);
		if (match) {
			return [parseInt(match[1].substring(0, 2), 16), parseInt(match[1].substring(2, 4), 16), parseInt(match[1].substring(4, 6), 16), null];
		}
		return false;
	};

	var RGB = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
	var rgb = function rgb(value) {
		var match = value.match(RGB);
		if (match) {
			return [Number(match[1]), Number(match[2]), Number(match[3]), null];
		}
		return false;
	};

	var RGBA = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;
	var rgba = function rgba(value) {
		var match = value.match(RGBA);
		if (match && match.length > 4) {
			return [Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4])];
		}
		return false;
	};

	var fromArray = function fromArray(array) {
		return [Math.min(array[0], 255), Math.min(array[1], 255), Math.min(array[2], 255), array.length > 3 ? array[3] : null];
	};

	var namedColor = function namedColor(name) {
		var color = NAMED_COLORS[name.toLowerCase()];
		return color ? color : false;
	};

	var Color = function () {
		function Color(value) {
			_classCallCheck(this, Color);

			var _ref = Array.isArray(value) ? fromArray(value) : hex3(value) || rgb(value) || rgba(value) || namedColor(value) || hex6(value) || [0, 0, 0, null],
				_ref2 = _slicedToArray(_ref, 4),
				r = _ref2[0],
				g = _ref2[1],
				b = _ref2[2],
				a = _ref2[3];

			this.r = r;
			this.g = g;
			this.b = b;
			this.a = a;
		}

		_createClass(Color, [{
			key: 'isTransparent',
			value: function isTransparent() {
				return this.a === 0;
			}
		}, {
			key: 'toString',
			value: function toString() {
				return this.a !== null && this.a !== 1 ? 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')' : 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
			}
		}]);

		return Color;
	}();

	exports.default = Color;


	var NAMED_COLORS = {
		transparent: [0, 0, 0, 0],
		aliceblue: [240, 248, 255, null],
		antiquewhite: [250, 235, 215, null],
		aqua: [0, 255, 255, null],
		aquamarine: [127, 255, 212, null],
		azure: [240, 255, 255, null],
		beige: [245, 245, 220, null],
		bisque: [255, 228, 196, null],
		black: [0, 0, 0, null],
		blanchedalmond: [255, 235, 205, null],
		blue: [0, 0, 255, null],
		blueviolet: [138, 43, 226, null],
		brown: [165, 42, 42, null],
		burlywood: [222, 184, 135, null],
		cadetblue: [95, 158, 160, null],
		chartreuse: [127, 255, 0, null],
		chocolate: [210, 105, 30, null],
		coral: [255, 127, 80, null],
		cornflowerblue: [100, 149, 237, null],
		cornsilk: [255, 248, 220, null],
		crimson: [220, 20, 60, null],
		cyan: [0, 255, 255, null],
		darkblue: [0, 0, 139, null],
		darkcyan: [0, 139, 139, null],
		darkgoldenrod: [184, 134, 11, null],
		darkgray: [169, 169, 169, null],
		darkgreen: [0, 100, 0, null],
		darkgrey: [169, 169, 169, null],
		darkkhaki: [189, 183, 107, null],
		darkmagenta: [139, 0, 139, null],
		darkolivegreen: [85, 107, 47, null],
		darkorange: [255, 140, 0, null],
		darkorchid: [153, 50, 204, null],
		darkred: [139, 0, 0, null],
		darksalmon: [233, 150, 122, null],
		darkseagreen: [143, 188, 143, null],
		darkslateblue: [72, 61, 139, null],
		darkslategray: [47, 79, 79, null],
		darkslategrey: [47, 79, 79, null],
		darkturquoise: [0, 206, 209, null],
		darkviolet: [148, 0, 211, null],
		deeppink: [255, 20, 147, null],
		deepskyblue: [0, 191, 255, null],
		dimgray: [105, 105, 105, null],
		dimgrey: [105, 105, 105, null],
		dodgerblue: [30, 144, 255, null],
		firebrick: [178, 34, 34, null],
		floralwhite: [255, 250, 240, null],
		forestgreen: [34, 139, 34, null],
		fuchsia: [255, 0, 255, null],
		gainsboro: [220, 220, 220, null],
		ghostwhite: [248, 248, 255, null],
		gold: [255, 215, 0, null],
		goldenrod: [218, 165, 32, null],
		gray: [128, 128, 128, null],
		green: [0, 128, 0, null],
		greenyellow: [173, 255, 47, null],
		grey: [128, 128, 128, null],
		honeydew: [240, 255, 240, null],
		hotpink: [255, 105, 180, null],
		indianred: [205, 92, 92, null],
		indigo: [75, 0, 130, null],
		ivory: [255, 255, 240, null],
		khaki: [240, 230, 140, null],
		lavender: [230, 230, 250, null],
		lavenderblush: [255, 240, 245, null],
		lawngreen: [124, 252, 0, null],
		lemonchiffon: [255, 250, 205, null],
		lightblue: [173, 216, 230, null],
		lightcoral: [240, 128, 128, null],
		lightcyan: [224, 255, 255, null],
		lightgoldenrodyellow: [250, 250, 210, null],
		lightgray: [211, 211, 211, null],
		lightgreen: [144, 238, 144, null],
		lightgrey: [211, 211, 211, null],
		lightpink: [255, 182, 193, null],
		lightsalmon: [255, 160, 122, null],
		lightseagreen: [32, 178, 170, null],
		lightskyblue: [135, 206, 250, null],
		lightslategray: [119, 136, 153, null],
		lightslategrey: [119, 136, 153, null],
		lightsteelblue: [176, 196, 222, null],
		lightyellow: [255, 255, 224, null],
		lime: [0, 255, 0, null],
		limegreen: [50, 205, 50, null],
		linen: [250, 240, 230, null],
		magenta: [255, 0, 255, null],
		maroon: [128, 0, 0, null],
		mediumaquamarine: [102, 205, 170, null],
		mediumblue: [0, 0, 205, null],
		mediumorchid: [186, 85, 211, null],
		mediumpurple: [147, 112, 219, null],
		mediumseagreen: [60, 179, 113, null],
		mediumslateblue: [123, 104, 238, null],
		mediumspringgreen: [0, 250, 154, null],
		mediumturquoise: [72, 209, 204, null],
		mediumvioletred: [199, 21, 133, null],
		midnightblue: [25, 25, 112, null],
		mintcream: [245, 255, 250, null],
		mistyrose: [255, 228, 225, null],
		moccasin: [255, 228, 181, null],
		navajowhite: [255, 222, 173, null],
		navy: [0, 0, 128, null],
		oldlace: [253, 245, 230, null],
		olive: [128, 128, 0, null],
		olivedrab: [107, 142, 35, null],
		orange: [255, 165, 0, null],
		orangered: [255, 69, 0, null],
		orchid: [218, 112, 214, null],
		palegoldenrod: [238, 232, 170, null],
		palegreen: [152, 251, 152, null],
		paleturquoise: [175, 238, 238, null],
		palevioletred: [219, 112, 147, null],
		papayawhip: [255, 239, 213, null],
		peachpuff: [255, 218, 185, null],
		peru: [205, 133, 63, null],
		pink: [255, 192, 203, null],
		plum: [221, 160, 221, null],
		powderblue: [176, 224, 230, null],
		purple: [128, 0, 128, null],
		rebeccapurple: [102, 51, 153, null],
		red: [255, 0, 0, null],
		rosybrown: [188, 143, 143, null],
		royalblue: [65, 105, 225, null],
		saddlebrown: [139, 69, 19, null],
		salmon: [250, 128, 114, null],
		sandybrown: [244, 164, 96, null],
		seagreen: [46, 139, 87, null],
		seashell: [255, 245, 238, null],
		sienna: [160, 82, 45, null],
		silver: [192, 192, 192, null],
		skyblue: [135, 206, 235, null],
		slateblue: [106, 90, 205, null],
		slategray: [112, 128, 144, null],
		slategrey: [112, 128, 144, null],
		snow: [255, 250, 250, null],
		springgreen: [0, 255, 127, null],
		steelblue: [70, 130, 180, null],
		tan: [210, 180, 140, null],
		teal: [0, 128, 128, null],
		thistle: [216, 191, 216, null],
		tomato: [255, 99, 71, null],
		turquoise: [64, 224, 208, null],
		violet: [238, 130, 238, null],
		wheat: [245, 222, 179, null],
		white: [255, 255, 255, null],
		whitesmoke: [245, 245, 245, null],
		yellow: [255, 255, 0, null],
		yellowgreen: [154, 205, 50, null]
	};

	var TRANSPARENT = exports.TRANSPARENT = new Color([0, 0, 0, 0]);

	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.calculateLengthFromValueWithUnit = exports.LENGTH_TYPE = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _NodeContainer = __webpack_require__(3);

	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LENGTH_WITH_UNIT = /([\d.]+)(px|r?em|%)/i;

	var LENGTH_TYPE = exports.LENGTH_TYPE = {
		PX: 0,
		PERCENTAGE: 1
	};

	var Length = function () {
		function Length(value) {
			_classCallCheck(this, Length);

			this.type = value.substr(value.length - 1) === '%' ? LENGTH_TYPE.PERCENTAGE : LENGTH_TYPE.PX;
			var parsedValue = parseFloat(value);
			if (true && isNaN(parsedValue)) {
				console.error('Invalid value given for Length: "' + value + '"');
			}
			this.value = isNaN(parsedValue) ? 0 : parsedValue;
		}

		_createClass(Length, [{
			key: 'isPercentage',
			value: function isPercentage() {
				return this.type === LENGTH_TYPE.PERCENTAGE;
			}
		}, {
			key: 'getAbsoluteValue',
			value: function getAbsoluteValue(parentLength) {
				return this.isPercentage() ? parentLength * (this.value / 100) : this.value;
			}
		}], [{
			key: 'create',
			value: function create(v) {
				return new Length(v);
			}
		}]);

		return Length;
	}();

	exports.default = Length;


	var getRootFontSize = function getRootFontSize(container) {
		var parent = container.parent;
		return parent ? getRootFontSize(parent) : parseFloat(container.style.font.fontSize);
	};

	var calculateLengthFromValueWithUnit = exports.calculateLengthFromValueWithUnit = function calculateLengthFromValueWithUnit(container, value, unit) {
		switch (unit) {
			case 'px':
			case '%':
				return new Length(value + unit);
			case 'em':
			case 'rem':
				var length = new Length(value);
				length.value *= unit === 'em' ? parseFloat(container.style.font.fontSize) : getRootFontSize(container);
				return length;
			default:
				// TODO: handle correctly if unknown unit is used
				return new Length('0');
		}
	};

	/***/ }),
	/* 2 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseBoundCurves = exports.calculatePaddingBoxPath = exports.calculateBorderBoxPath = exports.parsePathForBorder = exports.parseDocumentSize = exports.calculateContentBox = exports.calculatePaddingBox = exports.parseBounds = exports.Bounds = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Vector = __webpack_require__(7);

	var _Vector2 = _interopRequireDefault(_Vector);

	var _BezierCurve = __webpack_require__(32);

	var _BezierCurve2 = _interopRequireDefault(_BezierCurve);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TOP = 0;
	var RIGHT = 1;
	var BOTTOM = 2;
	var LEFT = 3;

	var H = 0;
	var V = 1;

	var Bounds = exports.Bounds = function () {
		function Bounds(x, y, w, h) {
			_classCallCheck(this, Bounds);

			this.left = x;
			this.top = y;
			this.width = w;
			this.height = h;
		}

		_createClass(Bounds, null, [{
			key: 'fromClientRect',
			value: function fromClientRect(clientRect, scrollX, scrollY) {
				return new Bounds(clientRect.left + scrollX, clientRect.top + scrollY, clientRect.width, clientRect.height);
			}
		}]);

		return Bounds;
	}();

	var parseBounds = exports.parseBounds = function parseBounds(node, scrollX, scrollY) {
		return Bounds.fromClientRect(node.getBoundingClientRect(), scrollX, scrollY);
	};

	var calculatePaddingBox = exports.calculatePaddingBox = function calculatePaddingBox(bounds, borders) {
		return new Bounds(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth, bounds.width - (borders[RIGHT].borderWidth + borders[LEFT].borderWidth), bounds.height - (borders[TOP].borderWidth + borders[BOTTOM].borderWidth));
	};

	var calculateContentBox = exports.calculateContentBox = function calculateContentBox(bounds, padding, borders) {
		// TODO support percentage paddings
		var paddingTop = padding[TOP].value;
		var paddingRight = padding[RIGHT].value;
		var paddingBottom = padding[BOTTOM].value;
		var paddingLeft = padding[LEFT].value;
		
		return new Bounds(bounds.left + paddingLeft + borders[LEFT].borderWidth, bounds.top + paddingTop + borders[TOP].borderWidth, bounds.width - (borders[RIGHT].borderWidth + borders[LEFT].borderWidth + paddingLeft + paddingRight), bounds.height - (borders[TOP].borderWidth + borders[BOTTOM].borderWidth + paddingTop + paddingBottom));
	};

	var parseDocumentSize = exports.parseDocumentSize = function parseDocumentSize(document) {
		var body = document.body;
		var documentElement = document.documentElement;

		if (!body || !documentElement) {
			throw new Error( true ? 'Unable to get document size' : '');
		}
		var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));

		var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));

		return new Bounds(0, 0, width, height);
	};

	var parsePathForBorder = exports.parsePathForBorder = function parsePathForBorder(curves, borderSide) {
		switch (borderSide) {
			case TOP:
				return createPathFromCurves(curves.topLeftOuter, curves.topLeftInner, curves.topRightOuter, curves.topRightInner);
			case RIGHT:
				return createPathFromCurves(curves.topRightOuter, curves.topRightInner, curves.bottomRightOuter, curves.bottomRightInner);
			case BOTTOM:
				return createPathFromCurves(curves.bottomRightOuter, curves.bottomRightInner, curves.bottomLeftOuter, curves.bottomLeftInner);
			case LEFT:
			default:
				return createPathFromCurves(curves.bottomLeftOuter, curves.bottomLeftInner, curves.topLeftOuter, curves.topLeftInner);
		}
	};

	var createPathFromCurves = function createPathFromCurves(outer1, inner1, outer2, inner2) {
		var path = [];
		if (outer1 instanceof _BezierCurve2.default) {
			path.push(outer1.subdivide(0.5, false));
		} else {
			path.push(outer1);
		}

		if (outer2 instanceof _BezierCurve2.default) {
			path.push(outer2.subdivide(0.5, true));
		} else {
			path.push(outer2);
		}

		if (inner2 instanceof _BezierCurve2.default) {
			path.push(inner2.subdivide(0.5, true).reverse());
		} else {
			path.push(inner2);
		}

		if (inner1 instanceof _BezierCurve2.default) {
			path.push(inner1.subdivide(0.5, false).reverse());
		} else {
			path.push(inner1);
		}

		return path;
	};

	var calculateBorderBoxPath = exports.calculateBorderBoxPath = function calculateBorderBoxPath(curves) {
		return [curves.topLeftOuter, curves.topRightOuter, curves.bottomRightOuter, curves.bottomLeftOuter];
	};

	var calculatePaddingBoxPath = exports.calculatePaddingBoxPath = function calculatePaddingBoxPath(curves) {
		return [curves.topLeftInner, curves.topRightInner, curves.bottomRightInner, curves.bottomLeftInner];
	};

	var parseBoundCurves = exports.parseBoundCurves = function parseBoundCurves(bounds, borders, borderRadius) {
		var tlh = borderRadius[CORNER.TOP_LEFT][H].getAbsoluteValue(bounds.width);
		var tlv = borderRadius[CORNER.TOP_LEFT][V].getAbsoluteValue(bounds.height);
		var trh = borderRadius[CORNER.TOP_RIGHT][H].getAbsoluteValue(bounds.width);
		var trv = borderRadius[CORNER.TOP_RIGHT][V].getAbsoluteValue(bounds.height);
		var brh = borderRadius[CORNER.BOTTOM_RIGHT][H].getAbsoluteValue(bounds.width);
		var brv = borderRadius[CORNER.BOTTOM_RIGHT][V].getAbsoluteValue(bounds.height);
		var blh = borderRadius[CORNER.BOTTOM_LEFT][H].getAbsoluteValue(bounds.width);
		var blv = borderRadius[CORNER.BOTTOM_LEFT][V].getAbsoluteValue(bounds.height);

		var factors = [];
		factors.push((tlh + trh) / bounds.width);
		factors.push((blh + brh) / bounds.width);
		factors.push((tlv + blv) / bounds.height);
		factors.push((trv + brv) / bounds.height);
		var maxFactor = Math.max.apply(Math, factors);

		if (maxFactor > 1) {
			tlh /= maxFactor;
			tlv /= maxFactor;
			trh /= maxFactor;
			trv /= maxFactor;
			brh /= maxFactor;
			brv /= maxFactor;
			blh /= maxFactor;
			blv /= maxFactor;
		}

		var topWidth = bounds.width - trh;
		var rightHeight = bounds.height - brv;
		var bottomWidth = bounds.width - brh;
		var leftHeight = bounds.height - blv;

		return {
			topLeftOuter: tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT) : new _Vector2.default(bounds.left, bounds.top),
			topLeftInner: tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth, Math.max(0, tlh - borders[LEFT].borderWidth), Math.max(0, tlv - borders[TOP].borderWidth), CORNER.TOP_LEFT) : new _Vector2.default(bounds.left + borders[LEFT].borderWidth, bounds.top + borders[TOP].borderWidth),
			topRightOuter: trh > 0 || trv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT) : new _Vector2.default(bounds.left + bounds.width, bounds.top),
			topRightInner: trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borders[LEFT].borderWidth), bounds.top + borders[TOP].borderWidth, topWidth > bounds.width + borders[LEFT].borderWidth ? 0 : trh - borders[LEFT].borderWidth, trv - borders[TOP].borderWidth, CORNER.TOP_RIGHT) : new _Vector2.default(bounds.left + bounds.width - borders[RIGHT].borderWidth, bounds.top + borders[TOP].borderWidth),
			bottomRightOuter: brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT) : new _Vector2.default(bounds.left + bounds.width, bounds.top + bounds.height),
			bottomRightInner: brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borders[LEFT].borderWidth), bounds.top + Math.min(rightHeight, bounds.height + borders[TOP].borderWidth), Math.max(0, brh - borders[RIGHT].borderWidth), brv - borders[BOTTOM].borderWidth, CORNER.BOTTOM_RIGHT) : new _Vector2.default(bounds.left + bounds.width - borders[RIGHT].borderWidth, bounds.top + bounds.height - borders[BOTTOM].borderWidth),
			bottomLeftOuter: blh > 0 || blv > 0 ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT) : new _Vector2.default(bounds.left, bounds.top + bounds.height),
			bottomLeftInner: blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borders[LEFT].borderWidth, bounds.top + leftHeight, Math.max(0, blh - borders[LEFT].borderWidth), blv - borders[BOTTOM].borderWidth, CORNER.BOTTOM_LEFT) : new _Vector2.default(bounds.left + borders[LEFT].borderWidth, bounds.top + bounds.height - borders[BOTTOM].borderWidth)
		};
	};

	var CORNER = {
		TOP_LEFT: 0,
		TOP_RIGHT: 1,
		BOTTOM_RIGHT: 2,
		BOTTOM_LEFT: 3
	};

	var getCurvePoints = function getCurvePoints(x, y, r1, r2, position) {
		var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
		var ox = r1 * kappa; // control point offset horizontal
		var oy = r2 * kappa; // control point offset vertical
		var xm = x + r1; // x-middle
		var ym = y + r2; // y-middle

		switch (position) {
			case CORNER.TOP_LEFT:
				return new _BezierCurve2.default(new _Vector2.default(x, ym), new _Vector2.default(x, ym - oy), new _Vector2.default(xm - ox, y), new _Vector2.default(xm, y));
			case CORNER.TOP_RIGHT:
				return new _BezierCurve2.default(new _Vector2.default(x, y), new _Vector2.default(x + ox, y), new _Vector2.default(xm, ym - oy), new _Vector2.default(xm, ym));
			case CORNER.BOTTOM_RIGHT:
				return new _BezierCurve2.default(new _Vector2.default(xm, y), new _Vector2.default(xm, y + oy), new _Vector2.default(x + ox, ym), new _Vector2.default(x, ym));
			case CORNER.BOTTOM_LEFT:
			default:
				return new _BezierCurve2.default(new _Vector2.default(xm, ym), new _Vector2.default(xm - ox, ym), new _Vector2.default(x, y + oy), new _Vector2.default(x, y));
		}
	};

	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Color = __webpack_require__(0);

	var _Color2 = _interopRequireDefault(_Color);

	var _Util = __webpack_require__(4);

	var _background = __webpack_require__(5);

	var _border = __webpack_require__(12);

	var _borderRadius = __webpack_require__(33);

	var _display = __webpack_require__(34);

	var _float = __webpack_require__(35);

	var _font = __webpack_require__(36);

	var _letterSpacing = __webpack_require__(37);

	var _lineBreak = __webpack_require__(38);

	var _listStyle = __webpack_require__(8);

	var _margin = __webpack_require__(39);

	var _overflow = __webpack_require__(40);

	var _overflowWrap = __webpack_require__(18);

	var _padding = __webpack_require__(17);

	var _position = __webpack_require__(19);

	var _textDecoration = __webpack_require__(11);

	var _textShadow = __webpack_require__(41);

	var _textTransform = __webpack_require__(20);

	var _transform = __webpack_require__(42);

	var _visibility = __webpack_require__(43);

	var _wordBreak = __webpack_require__(44);

	var _zIndex = __webpack_require__(45);

	var _Bounds = __webpack_require__(2);

	var _Input = __webpack_require__(21);

	var _ListItem = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

	var NodeContainer = function () {
		function NodeContainer(node, parent, resourceLoader, index) {
			var _this = this;

			_classCallCheck(this, NodeContainer);

			this.parent = parent;
			this.tagName = node.tagName;
			this.index = index;
			this.childNodes = [];
			this.listItems = [];
			if (typeof node.start === 'number') {
				this.listStart = node.start;
			}
			var defaultView = node.ownerDocument.defaultView;
			var scrollX = defaultView.pageXOffset;
			var scrollY = defaultView.pageYOffset;
			var style = defaultView.getComputedStyle(node, null);
			var display = (0, _display.parseDisplay)(style.display);

			var IS_INPUT = node.type === 'radio' || node.type === 'checkbox';

			var position = (0, _position.parsePosition)(style.position);
			
			if(node.style.marginTop.match('-') || node.style.marginRight.match('-') || node.style.marginBottom.match('-') || node.style.marginLeft.match('-') || node.style.margin.match('-') ){
				node.style.margin = '';
			}
			this.style = {
				background: IS_INPUT ? _Input.INPUT_BACKGROUND : (0, _background.parseBackground)(style, resourceLoader),
				border: IS_INPUT ? _Input.INPUT_BORDERS : (0, _border.parseBorder)(style),
				borderRadius: (node instanceof defaultView.HTMLInputElement || node instanceof HTMLInputElement) && IS_INPUT ? (0, _Input.getInputBorderRadius)(node) : (0, _borderRadius.parseBorderRadius)(style),
				color: IS_INPUT ? _Input.INPUT_COLOR : new _Color2.default(style.color),
				display: display,
				float: (0, _float.parseCSSFloat)(style.float),
				font: (0, _font.parseFont)(style),
				letterSpacing: (0, _letterSpacing.parseLetterSpacing)(style.letterSpacing),
				listStyle: display === _display.DISPLAY.LIST_ITEM ? (0, _listStyle.parseListStyle)(style) : null,
				lineBreak: (0, _lineBreak.parseLineBreak)(style.lineBreak),
				margin: (0, _margin.parseMargin)(style),
				opacity: parseFloat(style.opacity),
				overflow: INPUT_TAGS.indexOf(node.tagName) === -1 ? (0, _overflow.parseOverflow)(style.overflow) : _overflow.OVERFLOW.HIDDEN,
				overflowWrap: (0, _overflowWrap.parseOverflowWrap)(style.overflowWrap ? style.overflowWrap : style.wordWrap),
				padding: (0, _padding.parsePadding)(style),
				position: position,
				textDecoration: (0, _textDecoration.parseTextDecoration)(style),
				textShadow: (0, _textShadow.parseTextShadow)(style.textShadow),
				textTransform: (0, _textTransform.parseTextTransform)(style.textTransform),
				transform: (0, _transform.parseTransform)(style),
				visibility: (0, _visibility.parseVisibility)(style.visibility),
				wordBreak: (0, _wordBreak.parseWordBreak)(style.wordBreak),
				zIndex: (0, _zIndex.parseZIndex)(position !== _position.POSITION.STATIC ? style.zIndex : 'auto')
			};

			if (this.isTransformed()) {
				// getBoundingClientRect provides values post-transform, we want them without the transformation
				node.style.transform = 'matrix(1,0,0,1,0,0)';
			}

			if (display === _display.DISPLAY.LIST_ITEM) {
				var listOwner = (0, _ListItem.getListOwner)(this);
				if (listOwner) {
					var listIndex = listOwner.listItems.length;
					listOwner.listItems.push(this);
					this.listIndex = node.hasAttribute('value') && typeof node.value === 'number' ? node.value : listIndex === 0 ? typeof listOwner.listStart === 'number' ? listOwner.listStart : 1 : listOwner.listItems[listIndex - 1].listIndex + 1;
				}
			}

			// TODO move bound retrieval for all nodes to a later stage?
			if (node.tagName === 'IMG') {
				node.addEventListener('load', function () {
					_this.bounds = (0, _Bounds.parseBounds)(node, scrollX, scrollY);
					_this.curvedBounds = (0, _Bounds.parseBoundCurves)(_this.bounds, _this.style.border, _this.style.borderRadius);
				});
			}
			this.image = getImage(node, resourceLoader);
			this.bounds = IS_INPUT ? (0, _Input.reformatInputBounds)((0, _Bounds.parseBounds)(node, scrollX, scrollY)) : (0, _Bounds.parseBounds)(node, scrollX, scrollY);
			this.curvedBounds = (0, _Bounds.parseBoundCurves)(this.bounds, this.style.border, this.style.borderRadius);

			if (true) {
				this.name = '' + node.tagName.toLowerCase() + (node.id ? '#' + node.id : '') + node.className.toString().split(' ').map(function (s) {
					return s.length ? '.' + s : '';
				}).join('');
			}
		}

		_createClass(NodeContainer, [{
			key: 'getClipPaths',
			value: function getClipPaths() {
				var parentClips = this.parent ? this.parent.getClipPaths() : [];
				var isClipped = this.style.overflow !== _overflow.OVERFLOW.VISIBLE;

				return isClipped ? parentClips.concat([(0, _Bounds.calculatePaddingBoxPath)(this.curvedBounds)]) : parentClips;
			}
		}, {
			key: 'isInFlow',
			value: function isInFlow() {
				return this.isRootElement() && !this.isFloating() && !this.isAbsolutelyPositioned();
			}
		}, {
			key: 'isVisible',
			value: function isVisible() {
				return !(0, _Util.contains)(this.style.display, _display.DISPLAY.NONE) && this.style.opacity > 0 && this.style.visibility === _visibility.VISIBILITY.VISIBLE;
			}
		}, {
			key: 'isAbsolutelyPositioned',
			value: function isAbsolutelyPositioned() {
				return this.style.position !== _position.POSITION.STATIC && this.style.position !== _position.POSITION.RELATIVE;
			}
		}, {
			key: 'isPositioned',
			value: function isPositioned() {
				return this.style.position !== _position.POSITION.STATIC;
			}
		}, {
			key: 'isFloating',
			value: function isFloating() {
				return this.style.float !== _float.FLOAT.NONE;
			}
		}, {
			key: 'isRootElement',
			value: function isRootElement() {
				return this.parent === null;
			}
		}, {
			key: 'isTransformed',
			value: function isTransformed() {
				return this.style.transform !== null;
			}
		}, {
			key: 'isPositionedWithZIndex',
			value: function isPositionedWithZIndex() {
				return this.isPositioned() && !this.style.zIndex.auto;
			}
		}, {
			key: 'isInlineLevel',
			value: function isInlineLevel() {
				return (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_BLOCK) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_FLEX) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_GRID) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_LIST_ITEM) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_TABLE);
			}
		}, {
			key: 'isInlineBlockOrInlineTable',
			value: function isInlineBlockOrInlineTable() {
				return (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_BLOCK) || (0, _Util.contains)(this.style.display, _display.DISPLAY.INLINE_TABLE);
			}
		}]);

		return NodeContainer;
	}();

	exports.default = NodeContainer;


	var getImage = function getImage(node, resourceLoader) {
		if (node instanceof node.ownerDocument.defaultView.SVGSVGElement || node instanceof SVGSVGElement) {
			var s = new XMLSerializer();
			return resourceLoader.loadImage('data:image/svg+xml,' + encodeURIComponent(s.serializeToString(node)));
		}
		switch (node.tagName) {
			case 'IMG':
				// $FlowFixMe
				var img = node;
				return resourceLoader.loadImage(img.currentSrc || img.src);
			case 'CANVAS':
				// $FlowFixMe
				var canvas = node;
				return resourceLoader.loadCanvas(canvas);
			case 'IFRAME':
				var iframeKey = node.getAttribute('data-html2canvas-internal-iframe-key');
				if (iframeKey) {
					return iframeKey;
				}
				break;
		}

		return null;
	};

	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var contains = exports.contains = function contains(bit, value) {
		return (bit & value) !== 0;
	};

	var distance = exports.distance = function distance(a, b) {
		return Math.sqrt(a * a + b * b);
	};

	var copyCSSStyles = exports.copyCSSStyles = function copyCSSStyles(style, target) {
		// Edge does not provide value for cssText
		for (var i = style.length - 1; i >= 0; i--) {
			var property = style.item(i);
			// Safari shows pseudoelements if content is set
			if (property !== 'content') {
				target.style.setProperty(property, style.getPropertyValue(property));
			}
		}
		return target;
	};

	var SMALL_IMAGE = exports.SMALL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseBackgroundImage = exports.parseBackground = exports.calculateBackgroundRepeatPath = exports.calculateBackgroundPosition = exports.calculateBackgroungPositioningArea = exports.calculateBackgroungPaintingArea = exports.calculateGradientBackgroundSize = exports.calculateBackgroundSize = exports.BACKGROUND_ORIGIN = exports.BACKGROUND_CLIP = exports.BACKGROUND_SIZE = exports.BACKGROUND_REPEAT = undefined;

	var _Color = __webpack_require__(0);

	var _Color2 = _interopRequireDefault(_Color);

	var _Length = __webpack_require__(1);

	var _Length2 = _interopRequireDefault(_Length);

	var _Size = __webpack_require__(31);

	var _Size2 = _interopRequireDefault(_Size);

	var _Vector = __webpack_require__(7);

	var _Vector2 = _interopRequireDefault(_Vector);

	var _Bounds = __webpack_require__(2);

	var _padding = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BACKGROUND_REPEAT = exports.BACKGROUND_REPEAT = {
		REPEAT: 0,
		NO_REPEAT: 1,
		REPEAT_X: 2,
		REPEAT_Y: 3
	};

	var BACKGROUND_SIZE = exports.BACKGROUND_SIZE = {
		AUTO: 0,
		CONTAIN: 1,
		COVER: 2,
		LENGTH: 3
	};

	var BACKGROUND_CLIP = exports.BACKGROUND_CLIP = {
		BORDER_BOX: 0,
		PADDING_BOX: 1,
		CONTENT_BOX: 2
	};

	var BACKGROUND_ORIGIN = exports.BACKGROUND_ORIGIN = BACKGROUND_CLIP;

	var AUTO = 'auto';

	var BackgroundSize = function BackgroundSize(size) {
		_classCallCheck(this, BackgroundSize);

		switch (size) {
			case 'contain':
				this.size = BACKGROUND_SIZE.CONTAIN;
				break;
			case 'cover':
				this.size = BACKGROUND_SIZE.COVER;
				break;
			case 'auto':
				this.size = BACKGROUND_SIZE.AUTO;
				break;
			default:
				this.value = new _Length2.default(size);
		}
	};

	var calculateBackgroundSize = exports.calculateBackgroundSize = function calculateBackgroundSize(backgroundImage, image, bounds) {
		var width = 0;
		var height = 0;
		var size = backgroundImage.size;
		if (size[0].size === BACKGROUND_SIZE.CONTAIN || size[0].size === BACKGROUND_SIZE.COVER) {
			var targetRatio = bounds.width / bounds.height;
			var currentRatio = image.width / image.height;
			return targetRatio < currentRatio !== (size[0].size === BACKGROUND_SIZE.COVER) ? new _Size2.default(bounds.width, bounds.width / currentRatio) : new _Size2.default(bounds.height * currentRatio, bounds.height);
		}

		if (size[0].value) {
			width = size[0].value.getAbsoluteValue(bounds.width);
		}
		if (size[0].size === BACKGROUND_SIZE.AUTO && size[1].size === BACKGROUND_SIZE.AUTO) {
			height = image.height;
		} else if (size[1].size === BACKGROUND_SIZE.AUTO) {
			height = width / image.width * image.height;
		} else if (size[1].value) {
			height = size[1].value.getAbsoluteValue(bounds.height);
		}

		if (size[0].size === BACKGROUND_SIZE.AUTO) {
			width = height / image.height * image.width;
		}

		return new _Size2.default(width, height);
	};

	var calculateGradientBackgroundSize = exports.calculateGradientBackgroundSize = function calculateGradientBackgroundSize(backgroundImage, bounds) {
		var size = backgroundImage.size;
		var width = size[0].value ? size[0].value.getAbsoluteValue(bounds.width) : bounds.width;
		var height = size[1].value ? size[1].value.getAbsoluteValue(bounds.height) : size[0].value ? width : bounds.height;

		return new _Size2.default(width, height);
	};

	var AUTO_SIZE = new BackgroundSize(AUTO);

	var calculateBackgroungPaintingArea = exports.calculateBackgroungPaintingArea = function calculateBackgroungPaintingArea(curves, clip) {
		switch (clip) {
			case BACKGROUND_CLIP.BORDER_BOX:
				return (0, _Bounds.calculateBorderBoxPath)(curves);
			case BACKGROUND_CLIP.PADDING_BOX:
			default:
				return (0, _Bounds.calculatePaddingBoxPath)(curves);
		}
	};

	var calculateBackgroungPositioningArea = exports.calculateBackgroungPositioningArea = function calculateBackgroungPositioningArea(backgroundOrigin, bounds, padding, border) {
		var paddingBox = (0, _Bounds.calculatePaddingBox)(bounds, border);

		switch (backgroundOrigin) {
			case BACKGROUND_ORIGIN.BORDER_BOX:
				return bounds;
			case BACKGROUND_ORIGIN.CONTENT_BOX:
				var paddingLeft = padding[_padding.PADDING_SIDES.LEFT].getAbsoluteValue(bounds.width);
				var paddingRight = padding[_padding.PADDING_SIDES.RIGHT].getAbsoluteValue(bounds.width);
				var paddingTop = padding[_padding.PADDING_SIDES.TOP].getAbsoluteValue(bounds.width);
				var paddingBottom = padding[_padding.PADDING_SIDES.BOTTOM].getAbsoluteValue(bounds.width);
				return new _Bounds.Bounds(paddingBox.left + paddingLeft, paddingBox.top + paddingTop, paddingBox.width - paddingLeft - paddingRight, paddingBox.height - paddingTop - paddingBottom);
			case BACKGROUND_ORIGIN.PADDING_BOX:
			default:
				return paddingBox;
		}
	};

	var calculateBackgroundPosition = exports.calculateBackgroundPosition = function calculateBackgroundPosition(position, size, bounds) {
		return new _Vector2.default(position[0].getAbsoluteValue(bounds.width - size.width), position[1].getAbsoluteValue(bounds.height - size.height));
	};

	var calculateBackgroundRepeatPath = exports.calculateBackgroundRepeatPath = function calculateBackgroundRepeatPath(background, position, size, backgroundPositioningArea, bounds) {
		var repeat = background.repeat;
		switch (repeat) {
			case BACKGROUND_REPEAT.REPEAT_X:
				return [new _Vector2.default(Math.round(bounds.left), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(size.height + backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(bounds.left), Math.round(size.height + backgroundPositioningArea.top + position.y))];
			case BACKGROUND_REPEAT.REPEAT_Y:
				return [new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(bounds.height + bounds.top)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(bounds.height + bounds.top))];
			case BACKGROUND_REPEAT.NO_REPEAT:
				return [new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(backgroundPositioningArea.top + position.y)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x + size.width), Math.round(backgroundPositioningArea.top + position.y + size.height)), new _Vector2.default(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y + size.height))];
			default:
				return [new _Vector2.default(Math.round(bounds.left), Math.round(bounds.top)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(bounds.top)), new _Vector2.default(Math.round(bounds.left + bounds.width), Math.round(bounds.height + bounds.top)), new _Vector2.default(Math.round(bounds.left), Math.round(bounds.height + bounds.top))];
		}
	};

	var parseBackground = exports.parseBackground = function parseBackground(style, resourceLoader) {
		return {
			backgroundColor: new _Color2.default(style.backgroundColor),
			backgroundImage: parseBackgroundImages(style, resourceLoader),
			backgroundClip: parseBackgroundClip(style.backgroundClip),
			backgroundOrigin: parseBackgroundOrigin(style.backgroundOrigin)
		};
	};

	var parseBackgroundClip = function parseBackgroundClip(backgroundClip) {
		switch (backgroundClip) {
			case 'padding-box':
				return BACKGROUND_CLIP.PADDING_BOX;
			case 'content-box':
				return BACKGROUND_CLIP.CONTENT_BOX;
		}
		return BACKGROUND_CLIP.BORDER_BOX;
	};

	var parseBackgroundOrigin = function parseBackgroundOrigin(backgroundOrigin) {
		switch (backgroundOrigin) {
			case 'padding-box':
				return BACKGROUND_ORIGIN.PADDING_BOX;
			case 'content-box':
				return BACKGROUND_ORIGIN.CONTENT_BOX;
		}
		return BACKGROUND_ORIGIN.BORDER_BOX;
	};

	var parseBackgroundRepeat = function parseBackgroundRepeat(backgroundRepeat) {
		switch (backgroundRepeat.trim()) {
			case 'no-repeat':
				return BACKGROUND_REPEAT.NO_REPEAT;
			case 'repeat-x':
			case 'repeat no-repeat':
				return BACKGROUND_REPEAT.REPEAT_X;
			case 'repeat-y':
			case 'no-repeat repeat':
				return BACKGROUND_REPEAT.REPEAT_Y;
			case 'repeat':
				return BACKGROUND_REPEAT.REPEAT;
		}

		if (true) {
			console.error('Invalid background-repeat value "' + backgroundRepeat + '"');
		}

		return BACKGROUND_REPEAT.REPEAT;
	};

	var parseBackgroundImages = function parseBackgroundImages(style, resourceLoader) {
		var sources = parseBackgroundImage(style.backgroundImage).map(function (backgroundImage) {
			if (backgroundImage.method === 'url') {
				var key = resourceLoader.loadImage(backgroundImage.args[0]);
				backgroundImage.args = key ? [key] : [];
			}
			return backgroundImage;
		});
		var positions = style.backgroundPosition.split(',');
		var repeats = style.backgroundRepeat.split(',');
		var sizes = style.backgroundSize.split(',');

		return sources.map(function (source, index) {
			var size = (sizes[index] || AUTO).trim().split(' ').map(parseBackgroundSize);
			var position = (positions[index] || AUTO).trim().split(' ').map(parseBackgoundPosition);
			
			return {
				source: source,
				repeat: parseBackgroundRepeat(typeof repeats[index] === 'string' ? repeats[index] : repeats[0]),
				size: size.length < 2 ? [size[0], AUTO_SIZE] : [size[0], size[1]],
				position: position.length < 2 ? [position[0], position[0]] : [position[0], position[1]]
			};
		});
	};

	var parseBackgroundSize = function parseBackgroundSize(size) {
		return size === 'auto' ? AUTO_SIZE : new BackgroundSize(size);
	};

	var parseBackgoundPosition = function parseBackgoundPosition(position) {
		switch (position) {
			case 'bottom':
			case 'right':
				return new _Length2.default('100%');
			case 'left':
			case 'top':
				return new _Length2.default('0%');
			case 'auto':
				return new _Length2.default('0');
		}
		return new _Length2.default(position);
	};

	var parseBackgroundImage = exports.parseBackgroundImage = function parseBackgroundImage(image) {
		var whitespace = /^\s$/;
		var results = [];

		var args = [];
		var method = '';
		var quote = null;
		var definition = '';
		var mode = 0;
		var numParen = 0;

		var appendResult = function appendResult() {
			var prefix = '';
			if (method) {
				if (definition.substr(0, 1) === '"') {
					definition = definition.substr(1, definition.length - 2);
				}

				if (definition) {
					args.push(definition.trim());
				}

				var prefix_i = method.indexOf('-', 1) + 1;
				if (method.substr(0, 1) === '-' && prefix_i > 0) {
					prefix = method.substr(0, prefix_i).toLowerCase();
					method = method.substr(prefix_i);
				}
				method = method.toLowerCase();
				if (method !== 'none') {
					results.push({
						prefix: prefix,
						method: method,
						args: args
					});
				}
			}
			args = [];
			method = definition = '';
		};

		image.split('').forEach(function (c) {
			if (mode === 0 && whitespace.test(c)) {
				return;
			}
			switch (c) {
				case '"':
					if (!quote) {
						quote = c;
					} else if (quote === c) {
						quote = null;
					}
					break;
				case '(':
					if (quote) {
						break;
					} else if (mode === 0) {
						mode = 1;
						return;
					} else {
						numParen++;
					}
					break;
				case ')':
					if (quote) {
						break;
					} else if (mode === 1) {
						if (numParen === 0) {
							mode = 0;
							appendResult();
							return;
						} else {
							numParen--;
						}
					}
					break;

				case ',':
					if (quote) {
						break;
					} else if (mode === 0) {
						appendResult();
						return;
					} else if (mode === 1) {
						if (numParen === 0 && !method.match(/^url$/i)) {
							args.push(definition.trim());
							definition = '';
							return;
						}
					}
					break;
			}

			if (mode === 0) {
				method += c;
			} else {
				definition += c;
			}
		});

		appendResult();
		return results;
	};

	/***/ }),
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var PATH = exports.PATH = {
		VECTOR: 0,
		BEZIER_CURVE: 1,
		CIRCLE: 2
	};

	/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Path = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector = function Vector(x, y) {
		_classCallCheck(this, Vector);

		this.type = _Path.PATH.VECTOR;
		this.x = x;
		this.y = y;
		if (true) {
			if (isNaN(x)) {
				console.error('Invalid x value given for Vector');
			}
			if (isNaN(y)) {
				console.error('Invalid y value given for Vector');
			}
		}
	};

	exports.default = Vector;

	/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseListStyle = exports.parseListStyleType = exports.LIST_STYLE_TYPE = exports.LIST_STYLE_POSITION = undefined;

	var _background = __webpack_require__(5);

	var LIST_STYLE_POSITION = exports.LIST_STYLE_POSITION = {
		INSIDE: 0,
		OUTSIDE: 1
	};

	var LIST_STYLE_TYPE = exports.LIST_STYLE_TYPE = {
		NONE: -1,
		DISC: 0,
		CIRCLE: 1,
		SQUARE: 2,
		DECIMAL: 3,
		CJK_DECIMAL: 4,
		DECIMAL_LEADING_ZERO: 5,
		LOWER_ROMAN: 6,
		UPPER_ROMAN: 7,
		LOWER_GREEK: 8,
		LOWER_ALPHA: 9,
		UPPER_ALPHA: 10,
		ARABIC_INDIC: 11,
		ARMENIAN: 12,
		BENGALI: 13,
		CAMBODIAN: 14,
		CJK_EARTHLY_BRANCH: 15,
		CJK_HEAVENLY_STEM: 16,
		CJK_IDEOGRAPHIC: 17,
		DEVANAGARI: 18,
		ETHIOPIC_NUMERIC: 19,
		GEORGIAN: 20,
		GUJARATI: 21,
		GURMUKHI: 22,
		HEBREW: 22,
		HIRAGANA: 23,
		HIRAGANA_IROHA: 24,
		JAPANESE_FORMAL: 25,
		JAPANESE_INFORMAL: 26,
		KANNADA: 27,
		KATAKANA: 28,
		KATAKANA_IROHA: 29,
		KHMER: 30,
		KOREAN_HANGUL_FORMAL: 31,
		KOREAN_HANJA_FORMAL: 32,
		KOREAN_HANJA_INFORMAL: 33,
		LAO: 34,
		LOWER_ARMENIAN: 35,
		MALAYALAM: 36,
		MONGOLIAN: 37,
		MYANMAR: 38,
		ORIYA: 39,
		PERSIAN: 40,
		SIMP_CHINESE_FORMAL: 41,
		SIMP_CHINESE_INFORMAL: 42,
		TAMIL: 43,
		TELUGU: 44,
		THAI: 45,
		TIBETAN: 46,
		TRAD_CHINESE_FORMAL: 47,
		TRAD_CHINESE_INFORMAL: 48,
		UPPER_ARMENIAN: 49,
		DISCLOSURE_OPEN: 50,
		DISCLOSURE_CLOSED: 51
	};

	var parseListStyleType = exports.parseListStyleType = function parseListStyleType(type) {
		switch (type) {
			case 'disc':
				return LIST_STYLE_TYPE.DISC;
			case 'circle':
				return LIST_STYLE_TYPE.CIRCLE;
			case 'square':
				return LIST_STYLE_TYPE.SQUARE;
			case 'decimal':
				return LIST_STYLE_TYPE.DECIMAL;
			case 'cjk-decimal':
				return LIST_STYLE_TYPE.CJK_DECIMAL;
			case 'decimal-leading-zero':
				return LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO;
			case 'lower-roman':
				return LIST_STYLE_TYPE.LOWER_ROMAN;
			case 'upper-roman':
				return LIST_STYLE_TYPE.UPPER_ROMAN;
			case 'lower-greek':
				return LIST_STYLE_TYPE.LOWER_GREEK;
			case 'lower-alpha':
				return LIST_STYLE_TYPE.LOWER_ALPHA;
			case 'upper-alpha':
				return LIST_STYLE_TYPE.UPPER_ALPHA;
			case 'arabic-indic':
				return LIST_STYLE_TYPE.ARABIC_INDIC;
			case 'armenian':
				return LIST_STYLE_TYPE.ARMENIAN;
			case 'bengali':
				return LIST_STYLE_TYPE.BENGALI;
			case 'cambodian':
				return LIST_STYLE_TYPE.CAMBODIAN;
			case 'cjk-earthly-branch':
				return LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH;
			case 'cjk-heavenly-stem':
				return LIST_STYLE_TYPE.CJK_HEAVENLY_STEM;
			case 'cjk-ideographic':
				return LIST_STYLE_TYPE.CJK_IDEOGRAPHIC;
			case 'devanagari':
				return LIST_STYLE_TYPE.DEVANAGARI;
			case 'ethiopic-numeric':
				return LIST_STYLE_TYPE.ETHIOPIC_NUMERIC;
			case 'georgian':
				return LIST_STYLE_TYPE.GEORGIAN;
			case 'gujarati':
				return LIST_STYLE_TYPE.GUJARATI;
			case 'gurmukhi':
				return LIST_STYLE_TYPE.GURMUKHI;
			case 'hebrew':
				return LIST_STYLE_TYPE.HEBREW;
			case 'hiragana':
				return LIST_STYLE_TYPE.HIRAGANA;
			case 'hiragana-iroha':
				return LIST_STYLE_TYPE.HIRAGANA_IROHA;
			case 'japanese-formal':
				return LIST_STYLE_TYPE.JAPANESE_FORMAL;
			case 'japanese-informal':
				return LIST_STYLE_TYPE.JAPANESE_INFORMAL;
			case 'kannada':
				return LIST_STYLE_TYPE.KANNADA;
			case 'katakana':
				return LIST_STYLE_TYPE.KATAKANA;
			case 'katakana-iroha':
				return LIST_STYLE_TYPE.KATAKANA_IROHA;
			case 'khmer':
				return LIST_STYLE_TYPE.KHMER;
			case 'korean-hangul-formal':
				return LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL;
			case 'korean-hanja-formal':
				return LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL;
			case 'korean-hanja-informal':
				return LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL;
			case 'lao':
				return LIST_STYLE_TYPE.LAO;
			case 'lower-armenian':
				return LIST_STYLE_TYPE.LOWER_ARMENIAN;
			case 'malayalam':
				return LIST_STYLE_TYPE.MALAYALAM;
			case 'mongolian':
				return LIST_STYLE_TYPE.MONGOLIAN;
			case 'myanmar':
				return LIST_STYLE_TYPE.MYANMAR;
			case 'oriya':
				return LIST_STYLE_TYPE.ORIYA;
			case 'persian':
				return LIST_STYLE_TYPE.PERSIAN;
			case 'simp-chinese-formal':
				return LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL;
			case 'simp-chinese-informal':
				return LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL;
			case 'tamil':
				return LIST_STYLE_TYPE.TAMIL;
			case 'telugu':
				return LIST_STYLE_TYPE.TELUGU;
			case 'thai':
				return LIST_STYLE_TYPE.THAI;
			case 'tibetan':
				return LIST_STYLE_TYPE.TIBETAN;
			case 'trad-chinese-formal':
				return LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL;
			case 'trad-chinese-informal':
				return LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL;
			case 'upper-armenian':
				return LIST_STYLE_TYPE.UPPER_ARMENIAN;
			case 'disclosure-open':
				return LIST_STYLE_TYPE.DISCLOSURE_OPEN;
			case 'disclosure-closed':
				return LIST_STYLE_TYPE.DISCLOSURE_CLOSED;
			case 'none':
			default:
				return LIST_STYLE_TYPE.NONE;
		}
	};

	var parseListStyle = exports.parseListStyle = function parseListStyle(style) {
		var listStyleImage = (0, _background.parseBackgroundImage)(style.getPropertyValue('list-style-image'));
		return {
			listStyleType: parseListStyleType(style.getPropertyValue('list-style-type')),
			listStyleImage: listStyleImage.length ? listStyleImage[0] : null,
			listStylePosition: parseListStylePosition(style.getPropertyValue('list-style-position'))
		};
	};

	var parseListStylePosition = function parseListStylePosition(position) {
		switch (position) {
			case 'inside':
				return LIST_STYLE_POSITION.INSIDE;
			case 'outside':
			default:
				return LIST_STYLE_POSITION.OUTSIDE;
		}
	};

	/***/ }),
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _textTransform = __webpack_require__(20);

	var _TextBounds = __webpack_require__(22);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextContainer = function () {
		function TextContainer(text, parent, bounds) {
			_classCallCheck(this, TextContainer);

			this.text = text;
			this.parent = parent;
			this.bounds = bounds;
		}

		_createClass(TextContainer, null, [{
			key: 'fromTextNode',
			value: function fromTextNode(node, parent) {
				var text = transform(node.data, parent.style.textTransform);
				return new TextContainer(text, parent, (0, _TextBounds.parseTextBounds)(text, parent, node));
			}
		}]);

		return TextContainer;
	}();

	exports.default = TextContainer;


	var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;

	var transform = function transform(text, _transform) {
		switch (_transform) {
			case _textTransform.TEXT_TRANSFORM.LOWERCASE:
				return text.toLowerCase();
			case _textTransform.TEXT_TRANSFORM.CAPITALIZE:
				return text.replace(CAPITALIZE, capitalize);
			case _textTransform.TEXT_TRANSFORM.UPPERCASE:
				return text.toUpperCase();
			default:
				return text;
		}
	};

	function capitalize(m, p1, p2) {
		if (m.length > 0) {
			return p1 + p2.toUpperCase();
		}

		return m;
	}

	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ForeignObjectRenderer = __webpack_require__(23);

	var testRangeBounds = function testRangeBounds(document) {
		var TEST_HEIGHT = 123;

		if (document.createRange) {
			var range = document.createRange();
			if (range.getBoundingClientRect) {
				var testElement = document.createElement('boundtest');
				testElement.style.height = TEST_HEIGHT + 'px';
				testElement.style.display = 'block';
				document.body.appendChild(testElement);

				range.selectNode(testElement);
				var rangeBounds = range.getBoundingClientRect();
				var rangeHeight = Math.round(rangeBounds.height);
				document.body.removeChild(testElement);
				if (rangeHeight === TEST_HEIGHT) {
					return true;
				}
			}
		}

		return false;
	};

	// iOS 10.3 taints canvas with base64 images unless crossOrigin = 'anonymous'
	var testBase64 = function testBase64(document, src) {
		var img = new Image();
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');

		return new Promise(function (resolve) {
			// Single pixel base64 image renders fine on iOS 10.3???
			img.src = src;

			var onload = function onload() {
				try {
					ctx.drawImage(img, 0, 0);
					canvas.toDataURL();
				} catch (e) {
					return resolve(false);
				}

				return resolve(true);
			};

			img.onload = onload;
			img.onerror = function () {
				return resolve(false);
			};

			if (img.complete === true) {
				setTimeout(function () {
					onload();
				}, 500);
			}
		});
	};

	var testCORS = function testCORS() {
		return typeof new Image().crossOrigin !== 'undefined';
	};

	var testResponseType = function testResponseType() {
		return typeof new XMLHttpRequest().responseType === 'string';
	};

	var testSVG = function testSVG(document) {
		var img = new Image();
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		img.src = 'data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\'></svg>';

		try {
			ctx.drawImage(img, 0, 0);
			canvas.toDataURL();
		} catch (e) {
			return false;
		}
		return true;
	};

	var isGreenPixel = function isGreenPixel(data) {
		return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
	};

	var testForeignObject = function testForeignObject(document) {
		var canvas = document.createElement('canvas');
		var size = 100;
		canvas.width = size;
		canvas.height = size;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = 'rgb(0, 255, 0)';
		ctx.fillRect(0, 0, size, size);

		var img = new Image();
		var greenImageSrc = canvas.toDataURL();
		img.src = greenImageSrc;
		var svg = (0, _ForeignObjectRenderer.createForeignObjectSVG)(size, size, 0, 0, img);
		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, size, size);

		return (0, _ForeignObjectRenderer.loadSerializedSVG)(svg).then(function (img) {
			ctx.drawImage(img, 0, 0);
			var data = ctx.getImageData(0, 0, size, size).data;
			ctx.fillStyle = 'red';
			ctx.fillRect(0, 0, size, size);

			var node = document.createElement('div');
			node.style.backgroundImage = 'url(' + greenImageSrc + ')';
			node.style.height = size + 'px';
			// Firefox 55 does not render inline <img /> tags
			return isGreenPixel(data) ? (0, _ForeignObjectRenderer.loadSerializedSVG)((0, _ForeignObjectRenderer.createForeignObjectSVG)(size, size, 0, 0, node)) : Promise.reject(false);
		}).then(function (img) {
			ctx.drawImage(img, 0, 0);
			// Edge does not render background-images
			return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
		}).catch(function (e) {
			return false;
		});
	};

	var FEATURES = {
		// $FlowFixMe - get/set properties not yet supported
		get SUPPORT_RANGE_BOUNDS() {
			'use strict';

			var value = testRangeBounds(document);
			Object.defineProperty(FEATURES, 'SUPPORT_RANGE_BOUNDS', { value: value });
			return value;
		},
		// $FlowFixMe - get/set properties not yet supported
		get SUPPORT_SVG_DRAWING() {
			'use strict';

			var value = testSVG(document);
			Object.defineProperty(FEATURES, 'SUPPORT_SVG_DRAWING', { value: value });
			return value;
		},
		// $FlowFixMe - get/set properties not yet supported
		get SUPPORT_BASE64_DRAWING() {
			'use strict';

			return function (src) {
				var _value = testBase64(document, src);
				Object.defineProperty(FEATURES, 'SUPPORT_BASE64_DRAWING', { value: function value() {
						return _value;
					} });
				return _value;
			};
		},
		// $FlowFixMe - get/set properties not yet supported
		get SUPPORT_FOREIGNOBJECT_DRAWING() {
			'use strict';

			var value = typeof Array.from === 'function' && typeof window.fetch === 'function' ? testForeignObject(document) : Promise.resolve(false);
			Object.defineProperty(FEATURES, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: value });
			return value;
		},
		// $FlowFixMe - get/set properties not yet supported
		get SUPPORT_CORS_IMAGES() {
			'use strict';

			var value = testCORS();
			Object.defineProperty(FEATURES, 'SUPPORT_CORS_IMAGES', { value: value });
			return value;
		},
		// $FlowFixMe - get/set properties not yet supported
		get SUPPORT_RESPONSE_TYPE() {
			'use strict';

			var value = testResponseType();
			Object.defineProperty(FEATURES, 'SUPPORT_RESPONSE_TYPE', { value: value });
			return value;
		},
		// $FlowFixMe - get/set properties not yet supported
		get SUPPORT_CORS_XHR() {
			'use strict';

			var value = 'withCredentials' in new XMLHttpRequest();
			Object.defineProperty(FEATURES, 'SUPPORT_CORS_XHR', { value: value });
			return value;
		}
	};

	exports.default = FEATURES;

	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseTextDecoration = exports.TEXT_DECORATION_LINE = exports.TEXT_DECORATION = exports.TEXT_DECORATION_STYLE = undefined;

	var _Color = __webpack_require__(0);

	var _Color2 = _interopRequireDefault(_Color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TEXT_DECORATION_STYLE = exports.TEXT_DECORATION_STYLE = {
		SOLID: 0,
		DOUBLE: 1,
		DOTTED: 2,
		DASHED: 3,
		WAVY: 4
	};

	var TEXT_DECORATION = exports.TEXT_DECORATION = {
		NONE: null
	};

	var TEXT_DECORATION_LINE = exports.TEXT_DECORATION_LINE = {
		UNDERLINE: 1,
		OVERLINE: 2,
		LINE_THROUGH: 3,
		BLINK: 4
	};

	var parseLine = function parseLine(line) {
		switch (line) {
			case 'underline':
				return TEXT_DECORATION_LINE.UNDERLINE;
			case 'overline':
				return TEXT_DECORATION_LINE.OVERLINE;
			case 'line-through':
				return TEXT_DECORATION_LINE.LINE_THROUGH;
		}
		return TEXT_DECORATION_LINE.BLINK;
	};

	var parseTextDecorationLine = function parseTextDecorationLine(line) {
		if (line === 'none') {
			return null;
		}

		return line.split(' ').map(parseLine);
	};

	var parseTextDecorationStyle = function parseTextDecorationStyle(style) {
		switch (style) {
			case 'double':
				return TEXT_DECORATION_STYLE.DOUBLE;
			case 'dotted':
				return TEXT_DECORATION_STYLE.DOTTED;
			case 'dashed':
				return TEXT_DECORATION_STYLE.DASHED;
			case 'wavy':
				return TEXT_DECORATION_STYLE.WAVY;
		}
		return TEXT_DECORATION_STYLE.SOLID;
	};

	var parseTextDecoration = exports.parseTextDecoration = function parseTextDecoration(style) {
		var textDecorationLine = parseTextDecorationLine(style.textDecorationLine ? style.textDecorationLine : style.textDecoration);
		if (textDecorationLine === null) {
			return TEXT_DECORATION.NONE;
		}

		var textDecorationColor = style.textDecorationColor ? new _Color2.default(style.textDecorationColor) : null;
		var textDecorationStyle = parseTextDecorationStyle(style.textDecorationStyle);

		return {
			textDecorationLine: textDecorationLine,
			textDecorationColor: textDecorationColor,
			textDecorationStyle: textDecorationStyle
		};
	};

	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseBorder = exports.BORDER_SIDES = exports.BORDER_STYLE = undefined;

	var _Color = __webpack_require__(0);

	var _Color2 = _interopRequireDefault(_Color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BORDER_STYLE = exports.BORDER_STYLE = {
		NONE: 0,
		SOLID: 1
	};

	var BORDER_SIDES = exports.BORDER_SIDES = {
		TOP: 0,
		RIGHT: 1,
		BOTTOM: 2,
		LEFT: 3
	};

	var SIDES = Object.keys(BORDER_SIDES).map(function (s) {
		return s.toLowerCase();
	});

	var parseBorderStyle = function parseBorderStyle(style) {
		switch (style) {
			case 'none':
				return BORDER_STYLE.NONE;
		}
		return BORDER_STYLE.SOLID;
	};

	var parseBorder = exports.parseBorder = function parseBorder(style) {
		return SIDES.map(function (side) {
			var borderColor = new _Color2.default(style.getPropertyValue('border-' + side + '-color'));
			var borderStyle = parseBorderStyle(style.getPropertyValue('border-' + side + '-style'));
			var borderWidth = parseFloat(style.getPropertyValue('border-' + side + '-width'));
			return {
				borderColor: borderColor,
				borderStyle: borderStyle,
				borderWidth: isNaN(borderWidth) ? 0 : borderWidth
			};
		});
	};

	/***/ }),
	/* 13 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var toCodePoints = exports.toCodePoints = function toCodePoints(str) {
		var codePoints = [];
		var i = 0;
		var length = str.length;
		while (i < length) {
			var value = str.charCodeAt(i++);
			if (value >= 0xd800 && value <= 0xdbff && i < length) {
				var extra = str.charCodeAt(i++);
				if ((extra & 0xfc00) === 0xdc00) {
					codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
				} else {
					codePoints.push(value);
					i--;
				}
			} else {
				codePoints.push(value);
			}
		}
		return codePoints;
	};

	var fromCodePoint = exports.fromCodePoint = function fromCodePoint() {
		if (String.fromCodePoint) {
			return String.fromCodePoint.apply(String, arguments);
		}

		var length = arguments.length;
		if (!length) {
			return '';
		}

		var codeUnits = [];

		var index = -1;
		var result = '';
		while (++index < length) {
			var codePoint = arguments.length <= index ? undefined : arguments[index];
			if (codePoint <= 0xffff) {
				codeUnits.push(codePoint);
			} else {
				codePoint -= 0x10000;
				codeUnits.push((codePoint >> 10) + 0xd800, codePoint % 0x400 + 0xdc00);
			}
			if (index + 1 === length || codeUnits.length > 0x4000) {
				result += String.fromCharCode.apply(String, codeUnits);
				codeUnits.length = 0;
			}
		}
		return result;
	};

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	// Use a lookup table to find the index.
	var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
	for (var i = 0; i < chars.length; i++) {
		lookup[chars.charCodeAt(i)] = i;
	}

	var decode = exports.decode = function decode(base64) {
		var bufferLength = base64.length * 0.75,
			len = base64.length,
			i = void 0,
			p = 0,
			encoded1 = void 0,
			encoded2 = void 0,
			encoded3 = void 0,
			encoded4 = void 0;

		if (base64[base64.length - 1] === '=') {
			bufferLength--;
			if (base64[base64.length - 2] === '=') {
				bufferLength--;
			}
		}

		var buffer = typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint8Array.prototype.slice !== 'undefined' ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
		var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);

		for (i = 0; i < len; i += 4) {
			encoded1 = lookup[base64.charCodeAt(i)];
			encoded2 = lookup[base64.charCodeAt(i + 1)];
			encoded3 = lookup[base64.charCodeAt(i + 2)];
			encoded4 = lookup[base64.charCodeAt(i + 3)];

			bytes[p++] = encoded1 << 2 | encoded2 >> 4;
			bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
			bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
		}

		return buffer;
	};

	var polyUint16Array = exports.polyUint16Array = function polyUint16Array(buffer) {
		var length = buffer.length;
		var bytes = [];
		for (var _i = 0; _i < length; _i += 2) {
			bytes.push(buffer[_i + 1] << 8 | buffer[_i]);
		}
		return bytes;
	};

	var polyUint32Array = exports.polyUint32Array = function polyUint32Array(buffer) {
		var length = buffer.length;
		var bytes = [];
		for (var _i2 = 0; _i2 < length; _i2 += 4) {
			bytes.push(buffer[_i2 + 3] << 24 | buffer[_i2 + 2] << 16 | buffer[_i2 + 1] << 8 | buffer[_i2]);
		}
		return bytes;
	};

	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createCounterText = exports.inlineListItemElement = exports.getListOwner = undefined;

	var _Util = __webpack_require__(4);

	var _NodeContainer = __webpack_require__(3);

	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);

	var _TextContainer = __webpack_require__(9);

	var _TextContainer2 = _interopRequireDefault(_TextContainer);

	var _listStyle = __webpack_require__(8);

	var _Unicode = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Margin between the enumeration and the list item content
	var MARGIN_RIGHT = 7;

	var ancestorTypes = ['OL', 'UL', 'MENU'];

	var getListOwner = exports.getListOwner = function getListOwner(container) {
		var parent = container.parent;
		if (!parent) {
			return null;
		}

		do {
			var isAncestor = ancestorTypes.indexOf(parent.tagName) !== -1;
			if (isAncestor) {
				return parent;
			}
			parent = parent.parent;
		} while (parent);

		return container.parent;
	};

	var inlineListItemElement = exports.inlineListItemElement = function inlineListItemElement(node, container, resourceLoader) {
		var listStyle = container.style.listStyle;

		if (!listStyle) {
			return;
		}

		var style = node.ownerDocument.defaultView.getComputedStyle(node, null);
		var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
		(0, _Util.copyCSSStyles)(style, wrapper);

		wrapper.style.position = 'absolute';
		wrapper.style.bottom = 'auto';
		wrapper.style.display = 'block';
		wrapper.style.letterSpacing = 'normal';

		switch (listStyle.listStylePosition) {
			case _listStyle.LIST_STYLE_POSITION.OUTSIDE:
				wrapper.style.left = 'auto';
				wrapper.style.right = node.ownerDocument.defaultView.innerWidth - container.bounds.left - container.style.margin[1].getAbsoluteValue(container.bounds.width) + MARGIN_RIGHT + 'px';
				wrapper.style.textAlign = 'right';
				break;
			case _listStyle.LIST_STYLE_POSITION.INSIDE:
				wrapper.style.left = container.bounds.left - container.style.margin[3].getAbsoluteValue(container.bounds.width) + 'px';
				wrapper.style.right = 'auto';
				wrapper.style.textAlign = 'left';
				break;
		}

		var text = void 0;
		var MARGIN_TOP = container.style.margin[0].getAbsoluteValue(container.bounds.width);
		var styleImage = listStyle.listStyleImage;
		if (styleImage) {
			if (styleImage.method === 'url') {
				var image = node.ownerDocument.createElement('img');
				image.src = styleImage.args[0];
				wrapper.style.top = container.bounds.top - MARGIN_TOP + 'px';
				wrapper.style.width = 'auto';
				wrapper.style.height = 'auto';
				wrapper.appendChild(image);
			} else {
				var size = parseFloat(container.style.font.fontSize) * 0.5;
				wrapper.style.top = container.bounds.top - MARGIN_TOP + container.bounds.height - 1.5 * size + 'px';
				wrapper.style.width = size + 'px';
				wrapper.style.height = size + 'px';
				wrapper.style.backgroundImage = style.listStyleImage;
			}
		} else if (typeof container.listIndex === 'number') {
			text = node.ownerDocument.createTextNode(createCounterText(container.listIndex, listStyle.listStyleType, true));
			wrapper.appendChild(text);
			wrapper.style.top = container.bounds.top - MARGIN_TOP + 'px';
		}

		// $FlowFixMe
		var body = node.ownerDocument.body;
		body.appendChild(wrapper);

		if (text) {
			container.childNodes.push(_TextContainer2.default.fromTextNode(text, container));
			body.removeChild(wrapper);
		} else {
			// $FlowFixMe
			container.childNodes.push(new _NodeContainer2.default(wrapper, container, resourceLoader, 0));
		}
	};

	var ROMAN_UPPER = {
		integers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
		values: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
	};

	var ARMENIAN = {
		integers: [9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
		values: ['Ք', 'Փ', 'Ւ', 'Ց', 'Ր', 'Տ', 'Վ', 'Ս', 'Ռ', 'Ջ', 'Պ', 'Չ', 'Ո', 'Շ', 'Ն', 'Յ', 'Մ', 'Ճ', 'Ղ', 'Ձ', 'Հ', 'Կ', 'Ծ', 'Խ', 'Լ', 'Ի', 'Ժ', 'Թ', 'Ը', 'Է', 'Զ', 'Ե', 'Դ', 'Գ', 'Բ', 'Ա']
	};

	var HEBREW = {
		integers: [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
		values: ['י׳', 'ט׳', 'ח׳', 'ז׳', 'ו׳', 'ה׳', 'ד׳', 'ג׳', 'ב׳', 'א׳', 'ת', 'ש', 'ר', 'ק', 'צ', 'פ', 'ע', 'ס', 'נ', 'מ', 'ל', 'כ', 'יט', 'יח', 'יז', 'טז', 'טו', 'י', 'ט', 'ח', 'ז', 'ו', 'ה', 'ד', 'ג', 'ב', 'א']
	};

	var GEORGIAN = {
		integers: [10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
		values: ['ჵ', 'ჰ', 'ჯ', 'ჴ', 'ხ', 'ჭ', 'წ', 'ძ', 'ც', 'ჩ', 'შ', 'ყ', 'ღ', 'ქ', 'ფ', 'ჳ', 'ტ', 'ს', 'რ', 'ჟ', 'პ', 'ო', 'ჲ', 'ნ', 'მ', 'ლ', 'კ', 'ი', 'თ', 'ჱ', 'ზ', 'ვ', 'ე', 'დ', 'გ', 'ბ', 'ა']
	};

	var createAdditiveCounter = function createAdditiveCounter(value, min, max, symbols, fallback, suffix) {
		if (value < min || value > max) {
			return createCounterText(value, fallback, suffix.length > 0);
		}

		return symbols.integers.reduce(function (string, integer, index) {
			while (value >= integer) {
				value -= integer;
				string += symbols.values[index];
			}
			return string;
		}, '') + suffix;
	};

	var createCounterStyleWithSymbolResolver = function createCounterStyleWithSymbolResolver(value, codePointRangeLength, isNumeric, resolver) {
		var string = '';

		do {
			if (!isNumeric) {
				value--;
			}
			string = resolver(value) + string;
			value /= codePointRangeLength;
		} while (value * codePointRangeLength >= codePointRangeLength);

		return string;
	};

	var createCounterStyleFromRange = function createCounterStyleFromRange(value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
		var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;

		return (value < 0 ? '-' : '') + (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function (codePoint) {
			return (0, _Unicode.fromCodePoint)(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
		}) + suffix);
	};

	var createCounterStyleFromSymbols = function createCounterStyleFromSymbols(value, symbols) {
		var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '. ';

		var codePointRangeLength = symbols.length;
		return createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function (codePoint) {
			return symbols[Math.floor(codePoint % codePointRangeLength)];
		}) + suffix;
	};

	var CJK_ZEROS = 1 << 0;
	var CJK_TEN_COEFFICIENTS = 1 << 1;
	var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
	var CJK_HUNDRED_COEFFICIENTS = 1 << 3;

	var createCJKCounter = function createCJKCounter(value, numbers, multipliers, negativeSign, suffix, flags) {
		if (value < -9999 || value > 9999) {
			return createCounterText(value, _listStyle.LIST_STYLE_TYPE.CJK_DECIMAL, suffix.length > 0);
		}
		var tmp = Math.abs(value);
		var string = suffix;

		if (tmp === 0) {
			return numbers[0] + string;
		}

		for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
			var coefficient = tmp % 10;

			if (coefficient === 0 && (0, _Util.contains)(flags, CJK_ZEROS) && string !== '') {
				string = numbers[coefficient] + string;
			} else if (coefficient > 1 || coefficient === 1 && digit === 0 || coefficient === 1 && digit === 1 && (0, _Util.contains)(flags, CJK_TEN_COEFFICIENTS) || coefficient === 1 && digit === 1 && (0, _Util.contains)(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100 || coefficient === 1 && digit > 1 && (0, _Util.contains)(flags, CJK_HUNDRED_COEFFICIENTS)) {
				string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : '') + string;
			} else if (coefficient === 1 && digit > 0) {
				string = multipliers[digit - 1] + string;
			}
			tmp = Math.floor(tmp / 10);
		}

		return (value < 0 ? negativeSign : '') + string;
	};

	var CHINESE_INFORMAL_MULTIPLIERS = '十百千萬';
	var CHINESE_FORMAL_MULTIPLIERS = '拾佰仟萬';
	var JAPANESE_NEGATIVE = 'マイナス';
	var KOREAN_NEGATIVE = '마이너스 ';

	var createCounterText = exports.createCounterText = function createCounterText(value, type, appendSuffix) {
		var defaultSuffix = appendSuffix ? '. ' : '';
		var cjkSuffix = appendSuffix ? '、' : '';
		var koreanSuffix = appendSuffix ? ', ' : '';
		switch (type) {
			case _listStyle.LIST_STYLE_TYPE.DISC:
				return '•';
			case _listStyle.LIST_STYLE_TYPE.CIRCLE:
				return '◦';
			case _listStyle.LIST_STYLE_TYPE.SQUARE:
				return '◾';
			case _listStyle.LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:
				var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
				return string.length < 4 ? '0' + string : string;
			case _listStyle.LIST_STYLE_TYPE.CJK_DECIMAL:
				return createCounterStyleFromSymbols(value, '〇一二三四五六七八九', cjkSuffix);
			case _listStyle.LIST_STYLE_TYPE.LOWER_ROMAN:
				return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, _listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
			case _listStyle.LIST_STYLE_TYPE.UPPER_ROMAN:
				return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, _listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.LOWER_GREEK:
				return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.LOWER_ALPHA:
				return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.UPPER_ALPHA:
				return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.ARABIC_INDIC:
				return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.ARMENIAN:
			case _listStyle.LIST_STYLE_TYPE.UPPER_ARMENIAN:
				return createAdditiveCounter(value, 1, 9999, ARMENIAN, _listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.LOWER_ARMENIAN:
				return createAdditiveCounter(value, 1, 9999, ARMENIAN, _listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
			case _listStyle.LIST_STYLE_TYPE.BENGALI:
				return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.CAMBODIAN:
			case _listStyle.LIST_STYLE_TYPE.KHMER:
				return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:
				return createCounterStyleFromSymbols(value, '子丑寅卯辰巳午未申酉戌亥', cjkSuffix);
			case _listStyle.LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:
				return createCounterStyleFromSymbols(value, '甲乙丙丁戊己庚辛壬癸', cjkSuffix);
			case _listStyle.LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:
			case _listStyle.LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:
				return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
			case _listStyle.LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:
				return createCJKCounter(value, '零壹貳參肆伍陸柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
			case _listStyle.LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:
				return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
			case _listStyle.LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:
				return createCJKCounter(value, '零壹贰叁肆伍陆柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
			case _listStyle.LIST_STYLE_TYPE.JAPANESE_INFORMAL:
				return createCJKCounter(value, '〇一二三四五六七八九', '十百千万', JAPANESE_NEGATIVE, cjkSuffix, 0);
			case _listStyle.LIST_STYLE_TYPE.JAPANESE_FORMAL:
				return createCJKCounter(value, '零壱弐参四伍六七八九', '拾百千万', JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
			case _listStyle.LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:
				return createCJKCounter(value, '영일이삼사오육칠팔구', '십백천만', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
			case _listStyle.LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:
				return createCJKCounter(value, '零一二三四五六七八九', '十百千萬', KOREAN_NEGATIVE, koreanSuffix, 0);
			case _listStyle.LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:
				return createCJKCounter(value, '零壹貳參四五六七八九', '拾百千', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
			case _listStyle.LIST_STYLE_TYPE.DEVANAGARI:
				return createCounterStyleFromRange(value, 0x966, 0x96f, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.GEORGIAN:
				return createAdditiveCounter(value, 1, 19999, GEORGIAN, _listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.GUJARATI:
				return createCounterStyleFromRange(value, 0xae6, 0xaef, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.GURMUKHI:
				return createCounterStyleFromRange(value, 0xa66, 0xa6f, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.HEBREW:
				return createAdditiveCounter(value, 1, 10999, HEBREW, _listStyle.LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.HIRAGANA:
				return createCounterStyleFromSymbols(value, 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん');
			case _listStyle.LIST_STYLE_TYPE.HIRAGANA_IROHA:
				return createCounterStyleFromSymbols(value, 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす');
			case _listStyle.LIST_STYLE_TYPE.KANNADA:
				return createCounterStyleFromRange(value, 0xce6, 0xcef, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.KATAKANA:
				return createCounterStyleFromSymbols(value, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン', cjkSuffix);
			case _listStyle.LIST_STYLE_TYPE.KATAKANA_IROHA:
				return createCounterStyleFromSymbols(value, 'イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス', cjkSuffix);
			case _listStyle.LIST_STYLE_TYPE.LAO:
				return createCounterStyleFromRange(value, 0xed0, 0xed9, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.MONGOLIAN:
				return createCounterStyleFromRange(value, 0x1810, 0x1819, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.MYANMAR:
				return createCounterStyleFromRange(value, 0x1040, 0x1049, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.ORIYA:
				return createCounterStyleFromRange(value, 0xb66, 0xb6f, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.PERSIAN:
				return createCounterStyleFromRange(value, 0x6f0, 0x6f9, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.TAMIL:
				return createCounterStyleFromRange(value, 0xbe6, 0xbef, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.TELUGU:
				return createCounterStyleFromRange(value, 0xc66, 0xc6f, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.THAI:
				return createCounterStyleFromRange(value, 0xe50, 0xe59, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.TIBETAN:
				return createCounterStyleFromRange(value, 0xf20, 0xf29, true, defaultSuffix);
			case _listStyle.LIST_STYLE_TYPE.DECIMAL:
			default:
				return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
		}
	};

	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Path = __webpack_require__(6);

	var _textDecoration = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var addColorStops = function addColorStops(gradient, canvasGradient) {
		var maxStop = Math.max.apply(null, gradient.colorStops.map(function (colorStop) {
			return colorStop.stop;
		}));
		var f = 1 / Math.max(1, maxStop);
		gradient.colorStops.forEach(function (colorStop) {
			canvasGradient.addColorStop(f * colorStop.stop, colorStop.color.toString());
		});
	};

	var CanvasRenderer = function () {
		function CanvasRenderer(canvas) {
			_classCallCheck(this, CanvasRenderer);

			this.canvas = canvas ? canvas : document.createElement('canvas');
		}

		_createClass(CanvasRenderer, [{
			key: 'render',
			value: function render(options) {
				this.ctx = this.canvas.getContext('2d');
				this.options = options;
				this.canvas.width = Math.floor(options.width * options.scale);
				this.canvas.height = Math.floor(options.height * options.scale);
				this.canvas.style.width = options.width + 'px';
				this.canvas.style.height = options.height + 'px';

				this.ctx.scale(this.options.scale, this.options.scale);
				this.ctx.translate(-options.x, -options.y);
				this.ctx.textBaseline = 'bottom';
				options.logger.log('Canvas renderer initialized (' + options.width + 'x' + options.height + ' at ' + options.x + ',' + options.y + ') with scale ' + this.options.scale);
			}
		}, {
			key: 'clip',
			value: function clip(clipPaths, callback) {
				var _this = this;

				if (clipPaths.length) {
					this.ctx.save();
					clipPaths.forEach(function (path) {
						_this.path(path);
						_this.ctx.clip();
					});
				}

				callback();

				if (clipPaths.length) {
					this.ctx.restore();
				}
			}
		}, {
			key: 'drawImage',
			value: function drawImage(image, source, destination) {
				this.ctx.drawImage(image, source.left, source.top, source.width, source.height, destination.left, destination.top, destination.width, destination.height);
			}
		}, {
			key: 'drawShape',
			value: function drawShape(path, color) {
				this.path(path);
				this.ctx.fillStyle = color.toString();
				this.ctx.fill();
			}
		}, {
			key: 'fill',
			value: function fill(color) {
				this.ctx.fillStyle = color.toString();
				this.ctx.fill();
			}
		}, {
			key: 'getTarget',
			value: function getTarget() {
				this.canvas.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
				return Promise.resolve(this.canvas);
			}
		}, {
			key: 'path',
			value: function path(_path) {
				var _this2 = this;

				this.ctx.beginPath();
				if (Array.isArray(_path)) {
					_path.forEach(function (point, index) {
						var start = point.type === _Path.PATH.VECTOR ? point : point.start;
						if (index === 0) {
							_this2.ctx.moveTo(start.x, start.y);
						} else {
							_this2.ctx.lineTo(start.x, start.y);
						}

						if (point.type === _Path.PATH.BEZIER_CURVE) {
							_this2.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
						}
					});
				} else {
					this.ctx.arc(_path.x + _path.radius, _path.y + _path.radius, _path.radius, 0, Math.PI * 2, true);
				}

				this.ctx.closePath();
			}
		}, {
			key: 'rectangle',
			value: function rectangle(x, y, width, height, color) {
				this.ctx.fillStyle = color.toString();
				this.ctx.fillRect(x, y, width, height);
			}
		}, {
			key: 'renderLinearGradient',
			value: function renderLinearGradient(bounds, gradient) {
				var linearGradient = this.ctx.createLinearGradient(bounds.left + gradient.direction.x1, bounds.top + gradient.direction.y1, bounds.left + gradient.direction.x0, bounds.top + gradient.direction.y0);

				addColorStops(gradient, linearGradient);
				this.ctx.fillStyle = linearGradient;
				this.ctx.fillRect(bounds.left, bounds.top, bounds.width, bounds.height);
			}
		}, {
			key: 'renderRadialGradient',
			value: function renderRadialGradient(bounds, gradient) {
				var _this3 = this;

				var x = bounds.left + gradient.center.x;
				var y = bounds.top + gradient.center.y;

				var radialGradient = this.ctx.createRadialGradient(x, y, 0, x, y, gradient.radius.x);
				if (!radialGradient) {
					return;
				}

				addColorStops(gradient, radialGradient);
				this.ctx.fillStyle = radialGradient;

				if (gradient.radius.x !== gradient.radius.y) {
					// transforms for elliptical radial gradient
					var midX = bounds.left + 0.5 * bounds.width;
					var midY = bounds.top + 0.5 * bounds.height;
					var f = gradient.radius.y / gradient.radius.x;
					var invF = 1 / f;

					this.transform(midX, midY, [1, 0, 0, f, 0, 0], function () {
						return _this3.ctx.fillRect(bounds.left, invF * (bounds.top - midY) + midY, bounds.width, bounds.height * invF);
					});
				} else {
					this.ctx.fillRect(bounds.left, bounds.top, bounds.width, bounds.height);
				}
			}
		}, {
			key: 'renderRepeat',
			value: function renderRepeat(path, image, imageSize, offsetX, offsetY) {
				this.path(path);
				this.ctx.fillStyle = this.ctx.createPattern(this.resizeImage(image, imageSize), 'repeat');
				this.ctx.translate(offsetX, offsetY);
				this.ctx.fill();
				this.ctx.translate(-offsetX, -offsetY);
			}
		}, {
			key: 'renderTextNode',
			value: function renderTextNode(textBounds, color, font, textDecoration, textShadows) {
				var _this4 = this;

				this.ctx.font = [font.fontStyle, font.fontVariant, font.fontWeight, font.fontSize, font.fontFamily].join(' ');

				textBounds.forEach(function (text) {
					_this4.ctx.fillStyle = color.toString();
					if (textShadows && text.text.trim().length) {
						textShadows.slice(0).reverse().forEach(function (textShadow) {
							_this4.ctx.shadowColor = textShadow.color.toString();
							_this4.ctx.shadowOffsetX = textShadow.offsetX * _this4.options.scale;
							_this4.ctx.shadowOffsetY = textShadow.offsetY * _this4.options.scale;
							_this4.ctx.shadowBlur = textShadow.blur;

							_this4.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
						});
					} else {
						_this4.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
					}

					if (textDecoration !== null) {
						var textDecorationColor = textDecoration.textDecorationColor || color;
						textDecoration.textDecorationLine.forEach(function (textDecorationLine) {
							switch (textDecorationLine) {
								case _textDecoration.TEXT_DECORATION_LINE.UNDERLINE:
									// Draws a line at the baseline of the font
									// TODO As some browsers display the line as more than 1px if the font-size is big,
									// need to take that into account both in position and size
									var _options$fontMetrics$ = _this4.options.fontMetrics.getMetrics(font),
										baseline = _options$fontMetrics$.baseline;

									_this4.rectangle(text.bounds.left, Math.round(text.bounds.top + baseline), text.bounds.width, 1, textDecorationColor);
									break;
								case _textDecoration.TEXT_DECORATION_LINE.OVERLINE:
									_this4.rectangle(text.bounds.left, Math.round(text.bounds.top), text.bounds.width, 1, textDecorationColor);
									break;
								case _textDecoration.TEXT_DECORATION_LINE.LINE_THROUGH:
									// TODO try and find exact position for line-through
									var _options$fontMetrics$2 = _this4.options.fontMetrics.getMetrics(font),
										middle = _options$fontMetrics$2.middle;

									_this4.rectangle(text.bounds.left, Math.ceil(text.bounds.top + middle), text.bounds.width, 1, textDecorationColor);
									break;
							}
						});
					}
				});
			}
		}, {
			key: 'resizeImage',
			value: function resizeImage(image, size) {
				if (image.width === size.width && image.height === size.height) {
					return image;
				}

				var canvas = this.canvas.ownerDocument.createElement('canvas');
				canvas.width = size.width;
				canvas.height = size.height;
				var ctx = canvas.getContext('2d');
				ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height);
				return canvas;
			}
		}, {
			key: 'setOpacity',
			value: function setOpacity(opacity) {
				this.ctx.globalAlpha = opacity;
			}
		}, {
			key: 'transform',
			value: function transform(offsetX, offsetY, matrix, callback) {
				this.ctx.save();
				this.ctx.translate(offsetX, offsetY);
				this.ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
				this.ctx.translate(-offsetX, -offsetY);

				callback();

				this.ctx.restore();
			}
		}]);

		return CanvasRenderer;
	}();

	exports.default = CanvasRenderer;

	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Logger = function () {
		function Logger(enabled, id, start) {
			_classCallCheck(this, Logger);

			this.enabled = typeof window !== 'undefined' && enabled;
			this.start = start ? start : Date.now();
			this.id = id;
		}

		_createClass(Logger, [{
			key: 'child',
			value: function child(id) {
				return new Logger(this.enabled, id, this.start);
			}

			// eslint-disable-next-line flowtype/no-weak-types

		}, {
			key: 'log',
			value: function log() {
				if (this.enabled && window.console && window.console.log) {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - this.start + 'ms', this.id ? 'html2canvas (' + this.id + '):' : 'html2canvas:'].concat([].slice.call(args, 0)));
				}
			}

			// eslint-disable-next-line flowtype/no-weak-types

		}, {
			key: 'error',
			value: function error() {
				if (this.enabled && window.console && window.console.error) {
					for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
						args[_key2] = arguments[_key2];
					}

					Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [Date.now() - this.start + 'ms', this.id ? 'html2canvas (' + this.id + '):' : 'html2canvas:'].concat([].slice.call(args, 0)));
				}
			}
		}]);

		return Logger;
	}();

	exports.default = Logger;

	/***/ }),
	/* 17 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parsePadding = exports.PADDING_SIDES = undefined;

	var _Length = __webpack_require__(1);

	var _Length2 = _interopRequireDefault(_Length);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PADDING_SIDES = exports.PADDING_SIDES = {
		TOP: 0,
		RIGHT: 1,
		BOTTOM: 2,
		LEFT: 3
	};

	var SIDES = ['top', 'right', 'bottom', 'left'];

	var parsePadding = exports.parsePadding = function parsePadding(style) {
		return SIDES.map(function (side) {
			return new _Length2.default(style.getPropertyValue('padding-' + side));
		});
	};

	/***/ }),
	/* 18 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var OVERFLOW_WRAP = exports.OVERFLOW_WRAP = {
		NORMAL: 0,
		BREAK_WORD: 1
	};

	var parseOverflowWrap = exports.parseOverflowWrap = function parseOverflowWrap(overflow) {
		switch (overflow) {
			case 'break-word':
				return OVERFLOW_WRAP.BREAK_WORD;
			case 'normal':
			default:
				return OVERFLOW_WRAP.NORMAL;
		}
	};

	/***/ }),
	/* 19 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var POSITION = exports.POSITION = {
		STATIC: 0,
		RELATIVE: 1,
		ABSOLUTE: 2,
		FIXED: 3,
		STICKY: 4
	};

	var parsePosition = exports.parsePosition = function parsePosition(position) {
		switch (position) {
			case 'relative':
				return POSITION.RELATIVE;
			case 'absolute':
				return POSITION.ABSOLUTE;
			case 'fixed':
				return POSITION.FIXED;
			case 'sticky':
				return POSITION.STICKY;
		}

		return POSITION.STATIC;
	};

	/***/ }),
	/* 20 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var TEXT_TRANSFORM = exports.TEXT_TRANSFORM = {
		NONE: 0,
		LOWERCASE: 1,
		UPPERCASE: 2,
		CAPITALIZE: 3
	};

	var parseTextTransform = exports.parseTextTransform = function parseTextTransform(textTransform) {
		switch (textTransform) {
			case 'uppercase':
				return TEXT_TRANSFORM.UPPERCASE;
			case 'lowercase':
				return TEXT_TRANSFORM.LOWERCASE;
			case 'capitalize':
				return TEXT_TRANSFORM.CAPITALIZE;
		}

		return TEXT_TRANSFORM.NONE;
	};

	/***/ }),
	/* 21 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.reformatInputBounds = exports.inlineSelectElement = exports.inlineTextAreaElement = exports.inlineInputElement = exports.getInputBorderRadius = exports.INPUT_BACKGROUND = exports.INPUT_BORDERS = exports.INPUT_COLOR = undefined;

	var _TextContainer = __webpack_require__(9);

	var _TextContainer2 = _interopRequireDefault(_TextContainer);

	var _background = __webpack_require__(5);

	var _border = __webpack_require__(12);

	var _Circle = __webpack_require__(50);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Vector = __webpack_require__(7);

	var _Vector2 = _interopRequireDefault(_Vector);

	var _Color = __webpack_require__(0);

	var _Color2 = _interopRequireDefault(_Color);

	var _Length = __webpack_require__(1);

	var _Length2 = _interopRequireDefault(_Length);

	var _Bounds = __webpack_require__(2);

	var _TextBounds = __webpack_require__(22);

	var _Util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var INPUT_COLOR = exports.INPUT_COLOR = new _Color2.default([42, 42, 42]);
	var INPUT_BORDER_COLOR = new _Color2.default([165, 165, 165]);
	var INPUT_BACKGROUND_COLOR = new _Color2.default([222, 222, 222]);
	var INPUT_BORDER = {
		borderWidth: 1,
		borderColor: INPUT_BORDER_COLOR,
		borderStyle: _border.BORDER_STYLE.SOLID
	};
	var INPUT_BORDERS = exports.INPUT_BORDERS = [INPUT_BORDER, INPUT_BORDER, INPUT_BORDER, INPUT_BORDER];
	var INPUT_BACKGROUND = exports.INPUT_BACKGROUND = {
		backgroundColor: INPUT_BACKGROUND_COLOR,
		backgroundImage: [],
		backgroundClip: _background.BACKGROUND_CLIP.PADDING_BOX,
		backgroundOrigin: _background.BACKGROUND_ORIGIN.PADDING_BOX
	};

	var RADIO_BORDER_RADIUS = new _Length2.default('50%');
	var RADIO_BORDER_RADIUS_TUPLE = [RADIO_BORDER_RADIUS, RADIO_BORDER_RADIUS];
	var INPUT_RADIO_BORDER_RADIUS = [RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE, RADIO_BORDER_RADIUS_TUPLE];

	var CHECKBOX_BORDER_RADIUS = new _Length2.default('3px');
	var CHECKBOX_BORDER_RADIUS_TUPLE = [CHECKBOX_BORDER_RADIUS, CHECKBOX_BORDER_RADIUS];
	var INPUT_CHECKBOX_BORDER_RADIUS = [CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE, CHECKBOX_BORDER_RADIUS_TUPLE];

	var getInputBorderRadius = exports.getInputBorderRadius = function getInputBorderRadius(node) {
		return node.type === 'radio' ? INPUT_RADIO_BORDER_RADIUS : INPUT_CHECKBOX_BORDER_RADIUS;
	};

	var inlineInputElement = exports.inlineInputElement = function inlineInputElement(node, container) {
		if (node.type === 'radio' || node.type === 'checkbox') {
			if (node.checked) {
				var size = Math.min(container.bounds.width, container.bounds.height);
				container.childNodes.push(node.type === 'checkbox' ? [new _Vector2.default(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79), new _Vector2.default(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549), new _Vector2.default(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071), new _Vector2.default(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649), new _Vector2.default(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23), new _Vector2.default(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085), new _Vector2.default(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)] : new _Circle2.default(container.bounds.left + size / 4, container.bounds.top + size / 4, size / 4));
			}
		} else {
			inlineFormElement(getInputValue(node), node, container, false);
		}
	};

	var inlineTextAreaElement = exports.inlineTextAreaElement = function inlineTextAreaElement(node, container) {
		inlineFormElement(node.value, node, container, true);
	};

	var inlineSelectElement = exports.inlineSelectElement = function inlineSelectElement(node, container) {
		var option = node.options[node.selectedIndex || 0];
		inlineFormElement(option ? option.text || '' : '', node, container, false);
	};

	var reformatInputBounds = exports.reformatInputBounds = function reformatInputBounds(bounds) {
		if (bounds.width > bounds.height) {
			bounds.left += (bounds.width - bounds.height) / 2;
			bounds.width = bounds.height;
		} else if (bounds.width < bounds.height) {
			bounds.top += (bounds.height - bounds.width) / 2;
			bounds.height = bounds.width;
		}
		return bounds;
	};

	var inlineFormElement = function inlineFormElement(value, node, container, allowLinebreak) {
		var body = node.ownerDocument.body;
		if (value.length > 0 && body) {
			var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
			(0, _Util.copyCSSStyles)(node.ownerDocument.defaultView.getComputedStyle(node, null), wrapper);
			wrapper.style.position = 'absolute';
			wrapper.style.left = container.bounds.left + 'px';
			wrapper.style.top = container.bounds.top + 'px';
			if (!allowLinebreak) {
				wrapper.style.whiteSpace = 'nowrap';
			}
			var text = node.ownerDocument.createTextNode(value);
			wrapper.appendChild(text);
			body.appendChild(wrapper);
			container.childNodes.push(_TextContainer2.default.fromTextNode(text, container));
			body.removeChild(wrapper);
		}
	};

	var getInputValue = function getInputValue(node) {
		var value = node.type === 'password' ? new Array(node.value.length + 1).join('\u2022') : node.value;

		return value.length === 0 ? node.placeholder || '' : value;
	};

	/***/ }),
	/* 22 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseTextBounds = exports.TextBounds = undefined;

	var _Bounds = __webpack_require__(2);

	var _textDecoration = __webpack_require__(11);

	var _Feature = __webpack_require__(10);

	var _Feature2 = _interopRequireDefault(_Feature);

	var _Unicode = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextBounds = exports.TextBounds = function TextBounds(text, bounds) {
		_classCallCheck(this, TextBounds);

		this.text = text;
		this.bounds = bounds;
	};

	var parseTextBounds = exports.parseTextBounds = function parseTextBounds(value, parent, node) {
		var letterRendering = parent.style.letterSpacing !== 0;
		var textList = letterRendering ? (0, _Unicode.toCodePoints)(value).map(function (i) {
			return (0, _Unicode.fromCodePoint)(i);
		}) : (0, _Unicode.breakWords)(value, parent);
		var length = textList.length;
		var defaultView = node.parentNode ? node.parentNode.ownerDocument.defaultView : null;
		var scrollX = defaultView ? defaultView.pageXOffset : 0;
		var scrollY = defaultView ? defaultView.pageYOffset : 0;
		var textBounds = [];
		var offset = 0;
		for (var i = 0; i < length; i++) {
			var text = textList[i];
			if (parent.style.textDecoration !== _textDecoration.TEXT_DECORATION.NONE || text.trim().length > 0) {
				if (_Feature2.default.SUPPORT_RANGE_BOUNDS) {
					textBounds.push(new TextBounds(text, getRangeBounds(node, offset, text.length, scrollX, scrollY)));
				} else {
					var replacementNode = node.splitText(text.length);
					textBounds.push(new TextBounds(text, getWrapperBounds(node, scrollX, scrollY)));
					node = replacementNode;
				}
			} else if (!_Feature2.default.SUPPORT_RANGE_BOUNDS) {
				node = node.splitText(text.length);
			}
			offset += text.length;
		}
		return textBounds;
	};

	var getWrapperBounds = function getWrapperBounds(node, scrollX, scrollY) {
		var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
		wrapper.appendChild(node.cloneNode(true));
		var parentNode = node.parentNode;
		if (parentNode) {
			parentNode.replaceChild(wrapper, node);
			var bounds = (0, _Bounds.parseBounds)(wrapper, scrollX, scrollY);
			if (wrapper.firstChild) {
				parentNode.replaceChild(wrapper.firstChild, wrapper);
			}
			return bounds;
		}
		return new _Bounds.Bounds(0, 0, 0, 0);
	};

	var getRangeBounds = function getRangeBounds(node, offset, length, scrollX, scrollY) {
		var range = node.ownerDocument.createRange();
		range.setStart(node, offset);
		range.setEnd(node, offset + length);
		return _Bounds.Bounds.fromClientRect(range.getBoundingClientRect(), scrollX, scrollY);
	};

	/***/ }),
	/* 23 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ForeignObjectRenderer = function () {
		function ForeignObjectRenderer(element) {
			_classCallCheck(this, ForeignObjectRenderer);

			this.element = element;
		}

		_createClass(ForeignObjectRenderer, [{
			key: 'render',
			value: function render(options) {
				var _this = this;

				this.options = options;
				this.canvas = document.createElement('canvas');
				this.ctx = this.canvas.getContext('2d');
				this.canvas.width = Math.floor(options.width) * options.scale;
				this.canvas.height = Math.floor(options.height) * options.scale;
				this.canvas.style.width = options.width + 'px';
				this.canvas.style.height = options.height + 'px';

				options.logger.log('ForeignObject renderer initialized (' + options.width + 'x' + options.height + ' at ' + options.x + ',' + options.y + ') with scale ' + options.scale);
				var svg = createForeignObjectSVG(Math.max(options.windowWidth, options.width) * options.scale, Math.max(options.windowHeight, options.height) * options.scale, options.scrollX * options.scale, options.scrollY * options.scale, this.element);

				return loadSerializedSVG(svg).then(function (img) {
					if (options.backgroundColor) {
						_this.ctx.fillStyle = options.backgroundColor.toString();
						_this.ctx.fillRect(0, 0, options.width * options.scale, options.height * options.scale);
					}

					_this.ctx.drawImage(img, -options.x * options.scale, -options.y * options.scale);
					return _this.canvas;
				});
			}
		}]);

		return ForeignObjectRenderer;
	}();

	exports.default = ForeignObjectRenderer;
	var createForeignObjectSVG = exports.createForeignObjectSVG = function createForeignObjectSVG(width, height, x, y, node) {
		var xmlns = 'http://www.w3.org/2000/svg';
		var svg = document.createElementNS(xmlns, 'svg');
		var foreignObject = document.createElementNS(xmlns, 'foreignObject');
		svg.setAttributeNS(null, 'width', width);
		svg.setAttributeNS(null, 'height', height);

		foreignObject.setAttributeNS(null, 'width', '100%');
		foreignObject.setAttributeNS(null, 'height', '100%');
		foreignObject.setAttributeNS(null, 'x', x);
		foreignObject.setAttributeNS(null, 'y', y);
		foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true');
		svg.appendChild(foreignObject);

		foreignObject.appendChild(node);

		return svg;
	};

	var loadSerializedSVG = exports.loadSerializedSVG = function loadSerializedSVG(svg) {
		return new Promise(function (resolve, reject) {
			var img = new Image();
			img.onload = function () {
				return resolve(img);
			};
			img.onerror = reject;

			img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
		});
	};

	/***/ }),
	/* 24 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.breakWords = exports.fromCodePoint = exports.toCodePoints = undefined;

	var _cssLineBreak = __webpack_require__(46);

	Object.defineProperty(exports, 'toCodePoints', {
		enumerable: true,
		get: function get() {
			return _cssLineBreak.toCodePoints;
		}
	});
	Object.defineProperty(exports, 'fromCodePoint', {
		enumerable: true,
		get: function get() {
			return _cssLineBreak.fromCodePoint;
		}
	});

	var _NodeContainer = __webpack_require__(3);

	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);

	var _overflowWrap = __webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var breakWords = exports.breakWords = function breakWords(str, parent) {
		var breaker = (0, _cssLineBreak.LineBreaker)(str, {
			lineBreak: parent.style.lineBreak,
			wordBreak: parent.style.overflowWrap === _overflowWrap.OVERFLOW_WRAP.BREAK_WORD ? 'break-word' : parent.style.wordBreak
		});

		var words = [];
		var bk = void 0;

		while (!(bk = breaker.next()).done) {
			words.push(bk.value.slice());
		}

		return words;
	};

	/***/ }),
	/* 25 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FontMetrics = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Util = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SAMPLE_TEXT = 'Hidden Text';

	var FontMetrics = exports.FontMetrics = function () {
		function FontMetrics(document) {
			_classCallCheck(this, FontMetrics);

			this._data = {};
			this._document = document;
		}

		_createClass(FontMetrics, [{
			key: '_parseMetrics',
			value: function _parseMetrics(font) {
				var container = this._document.createElement('div');
				var img = this._document.createElement('img');
				var span = this._document.createElement('span');

				var body = this._document.body;
				if (!body) {
					throw new Error( true ? 'No document found for font metrics' : '');
				}

				container.style.visibility = 'hidden';
				container.style.fontFamily = font.fontFamily;
				container.style.fontSize = font.fontSize;
				container.style.margin = '0';
				container.style.padding = '0';

				body.appendChild(container);

				img.src = _Util.SMALL_IMAGE;
				img.width = 1;
				img.height = 1;

				img.style.margin = '0';
				img.style.padding = '0';
				img.style.verticalAlign = 'baseline';

				span.style.fontFamily = font.fontFamily;
				span.style.fontSize = font.fontSize;
				span.style.margin = '0';
				span.style.padding = '0';

				span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
				container.appendChild(span);
				container.appendChild(img);
				var baseline = img.offsetTop - span.offsetTop + 2;

				container.removeChild(span);
				container.appendChild(this._document.createTextNode(SAMPLE_TEXT));

				container.style.lineHeight = 'normal';
				img.style.verticalAlign = 'super';

				var middle = img.offsetTop - container.offsetTop + 2;

				body.removeChild(container);

				return { baseline: baseline, middle: middle };
			}
		}, {
			key: 'getMetrics',
			value: function getMetrics(font) {
				var key = font.fontFamily + ' ' + font.fontSize;
				if (this._data[key] === undefined) {
					this._data[key] = this._parseMetrics(font);
				}

				return this._data[key];
			}
		}]);

		return FontMetrics;
	}();

	/***/ }),
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Proxy = undefined;

	var _Feature = __webpack_require__(10);

	var _Feature2 = _interopRequireDefault(_Feature);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Proxy = exports.Proxy = function Proxy(src, options) {
		if (!options.proxy) {
			return Promise.reject( true ? 'No proxy defined' : null);
		}
		var proxy = options.proxy;

		return new Promise(function (resolve, reject) {
			var responseType = _Feature2.default.SUPPORT_CORS_XHR && _Feature2.default.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
			var xhr = _Feature2.default.SUPPORT_CORS_XHR ? new XMLHttpRequest() : new XDomainRequest();
			xhr.onload = function () {
				if (xhr instanceof XMLHttpRequest) {
					if (xhr.status === 200) {
						if (responseType === 'text') {
							resolve(xhr.response);
						} else {
							var reader = new FileReader();
							// $FlowFixMe
							reader.addEventListener('load', function () {
								return resolve(reader.result);
							}, false);
							// $FlowFixMe
							reader.addEventListener('error', function (e) {
								return reject(e);
							}, false);
							reader.readAsDataURL(xhr.response);
						}
					} else {
						reject( true ? 'Failed to proxy resource ' + src.substring(0, 256) + ' with status code ' + xhr.status : '');
					}
				} else {
					resolve(xhr.responseText);
				}
			};

			xhr.onerror = reject;
			xhr.open('GET', proxy + '?url=' + encodeURIComponent(src)); //+ '&responseType=' + responseType);

			if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
				xhr.responseType = responseType;
			}

			if (options.imageTimeout) {
				var timeout = options.imageTimeout;
				xhr.timeout = timeout;
				xhr.ontimeout = function () {
					return reject( true ? 'Timed out (' + timeout + 'ms) proxying ' + src.substring(0, 256) : '');
				};
			}

			xhr.send();
		});
	};

	/***/ }),
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _CanvasRenderer = __webpack_require__(15);

	var _CanvasRenderer2 = _interopRequireDefault(_CanvasRenderer);

	var _Logger = __webpack_require__(16);

	var _Logger2 = _interopRequireDefault(_Logger);

	var _Window = __webpack_require__(28);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var html2canvas = function html2canvas(element, conf) {
		var config = conf || {};
		var logger = new _Logger2.default(typeof config.logging === 'boolean' ? config.logging : true);
		logger.log('html2canvas ' + "1.0.0-alpha.11");

		if (true && typeof config.onrendered === 'function') {
			logger.error('onrendered option is deprecated, html2canvas returns a Promise with the canvas as the value');
		}

		var ownerDocument = element.ownerDocument;
		if (!ownerDocument) {
			return Promise.reject('Provided element is not within a Document');
		}
		var defaultView = ownerDocument.defaultView;

		var defaultOptions = {
			async: true,
			allowTaint: false,
			backgroundColor: '#ffffff',
			imageTimeout: 15000,
			logging: true,
			proxy: null,
			removeContainer: true,
			foreignObjectRendering: false,
			scale: defaultView.devicePixelRatio || 1,
			target: new _CanvasRenderer2.default(config.canvas),
			useCORS: false,
			windowWidth: defaultView.innerWidth,
			windowHeight: defaultView.innerHeight,
			scrollX: defaultView.pageXOffset,
			scrollY: defaultView.pageYOffset
		};

		var result = (0, _Window.renderElement)(element, _extends({}, defaultOptions, config), logger);

		if (true) {
			return result.catch(function (e) {
				logger.error(e);
				throw e;
			});
		}
		return result;
	};

	html2canvas.CanvasRenderer = _CanvasRenderer2.default;

	module.exports = html2canvas;

	/***/ }),
	/* 28 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderElement = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _Logger = __webpack_require__(16);

	var _Logger2 = _interopRequireDefault(_Logger);

	var _NodeParser = __webpack_require__(29);

	var _Renderer = __webpack_require__(51);

	var _Renderer2 = _interopRequireDefault(_Renderer);

	var _ForeignObjectRenderer = __webpack_require__(23);

	var _ForeignObjectRenderer2 = _interopRequireDefault(_ForeignObjectRenderer);

	var _Feature = __webpack_require__(10);

	var _Feature2 = _interopRequireDefault(_Feature);

	var _Bounds = __webpack_require__(2);

	var _Clone = __webpack_require__(54);

	var _Font = __webpack_require__(25);

	var _Color = __webpack_require__(0);

	var _Color2 = _interopRequireDefault(_Color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renderElement = exports.renderElement = function renderElement(element, options, logger) {
		var ownerDocument = element.ownerDocument;

		var windowBounds = new _Bounds.Bounds(options.scrollX, options.scrollY, options.windowWidth, options.windowHeight);

		// http://www.w3.org/TR/css3-background/#special-backgrounds
		var documentBackgroundColor = ownerDocument.documentElement ? new _Color2.default(getComputedStyle(ownerDocument.documentElement).backgroundColor) : _Color.TRANSPARENT;
		var bodyBackgroundColor = ownerDocument.body ? new _Color2.default(getComputedStyle(ownerDocument.body).backgroundColor) : _Color.TRANSPARENT;

		var backgroundColor = element === ownerDocument.documentElement ? documentBackgroundColor.isTransparent() ? bodyBackgroundColor.isTransparent() ? options.backgroundColor ? new _Color2.default(options.backgroundColor) : null : bodyBackgroundColor : documentBackgroundColor : options.backgroundColor ? new _Color2.default(options.backgroundColor) : null;

		return (options.foreignObjectRendering ? // $FlowFixMe
		_Feature2.default.SUPPORT_FOREIGNOBJECT_DRAWING : Promise.resolve(false)).then(function (supportForeignObject) {
			return supportForeignObject ? function (cloner) {
				if (true) {
					logger.log('Document cloned, using foreignObject rendering');
				}

				return cloner.inlineFonts(ownerDocument).then(function () {
					return cloner.resourceLoader.ready();
				}).then(function () {
					var renderer = new _ForeignObjectRenderer2.default(cloner.documentElement);

					var defaultView = ownerDocument.defaultView;
					var scrollX = defaultView.pageXOffset;
					var scrollY = defaultView.pageYOffset;

					var isDocument = element.tagName === 'HTML' || element.tagName === 'BODY';

					var _ref = isDocument ? (0, _Bounds.parseDocumentSize)(ownerDocument) : (0, _Bounds.parseBounds)(element, scrollX, scrollY),
						width = _ref.width,
						height = _ref.height,
						left = _ref.left,
						top = _ref.top;

					return renderer.render({
						backgroundColor: backgroundColor,
						logger: logger,
						scale: options.scale,
						x: typeof options.x === 'number' ? options.x : left,
						y: typeof options.y === 'number' ? options.y : top,
						width: typeof options.width === 'number' ? options.width : Math.ceil(width),
						height: typeof options.height === 'number' ? options.height : Math.ceil(height),
						windowWidth: options.windowWidth,
						windowHeight: options.windowHeight,
						scrollX: options.scrollX,
						scrollY: options.scrollY
					});
				});
			}(new _Clone.DocumentCloner(element, options, logger, true, renderElement)) : (0, _Clone.cloneWindow)(ownerDocument, windowBounds, element, options, logger, renderElement).then(function (_ref2) {
				var _ref3 = _slicedToArray(_ref2, 3),
					container = _ref3[0],
					clonedElement = _ref3[1],
					resourceLoader = _ref3[2];

				if (true) {
					logger.log('Document cloned, using computed rendering');
				}

				var stack = (0, _NodeParser.NodeParser)(clonedElement, resourceLoader, logger);
				var clonedDocument = clonedElement.ownerDocument;

				if (backgroundColor === stack.container.style.background.backgroundColor) {
					stack.container.style.background.backgroundColor = _Color.TRANSPARENT;
				}

				return resourceLoader.ready().then(function (imageStore) {
					var fontMetrics = new _Font.FontMetrics(clonedDocument);
					if (true) {
						logger.log('Starting renderer');
					}

					var defaultView = clonedDocument.defaultView;
					var scrollX = defaultView.pageXOffset;
					var scrollY = defaultView.pageYOffset;

					var isDocument = clonedElement.tagName === 'HTML' || clonedElement.tagName === 'BODY';

					var _ref4 = isDocument ? (0, _Bounds.parseDocumentSize)(ownerDocument) : (0, _Bounds.parseBounds)(clonedElement, scrollX, scrollY),
						width = _ref4.width,
						height = _ref4.height,
						left = _ref4.left,
						top = _ref4.top;

					var renderOptions = {
						backgroundColor: backgroundColor,
						fontMetrics: fontMetrics,
						imageStore: imageStore,
						logger: logger,
						scale: options.scale,
						x: typeof options.x === 'number' ? options.x : left,
						y: typeof options.y === 'number' ? options.y : top,
						width: typeof options.width === 'number' ? options.width : Math.ceil(width),
						height: typeof options.height === 'number' ? options.height : Math.ceil(height)
					};

					if (Array.isArray(options.target)) {
						return Promise.all(options.target.map(function (target) {
							var renderer = new _Renderer2.default(target, renderOptions);
							return renderer.render(stack);
						}));
					} else {
						var renderer = new _Renderer2.default(options.target, renderOptions);
						var canvas = renderer.render(stack);
						if (options.removeContainer === true) {
							if (container.parentNode) {
								container.parentNode.removeChild(container);
							} else if (true) {
								logger.log('Cannot detach cloned iframe as it is not in the DOM anymore');
							}
						}

						return canvas;
					}
				});
			});
		});
	};

	/***/ }),
	/* 29 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NodeParser = undefined;

	var _StackingContext = __webpack_require__(30);

	var _StackingContext2 = _interopRequireDefault(_StackingContext);

	var _NodeContainer = __webpack_require__(3);

	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);

	var _TextContainer = __webpack_require__(9);

	var _TextContainer2 = _interopRequireDefault(_TextContainer);

	var _Input = __webpack_require__(21);

	var _ListItem = __webpack_require__(14);

	var _listStyle = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NodeParser = exports.NodeParser = function NodeParser(node, resourceLoader, logger) {
		if (true) {
			logger.log('Starting node parsing');
		}

		var index = 0;

		var container = new _NodeContainer2.default(node, null, resourceLoader, index++);
		var stack = new _StackingContext2.default(container, null, true);

		parseNodeTree(node, container, stack, resourceLoader, index);

		if (true) {
			logger.log('Finished parsing node tree');
		}

		return stack;
	};

	var IGNORED_NODE_NAMES = ['SCRIPT', 'HEAD', 'TITLE', 'OBJECT', 'BR', 'OPTION'];

	var parseNodeTree = function parseNodeTree(node, parent, stack, resourceLoader, index) {
		if (true && index > 50000) {
			throw new Error('Recursion error while parsing node tree');
		}

		for (var childNode = node.firstChild, nextNode; childNode; childNode = nextNode) {
			nextNode = childNode.nextSibling;
			var defaultView = childNode.ownerDocument.defaultView;
			if (childNode instanceof defaultView.Text || childNode instanceof Text || defaultView.parent && childNode instanceof defaultView.parent.Text) {
				if (childNode.data.trim().length > 0) {
					parent.childNodes.push(_TextContainer2.default.fromTextNode(childNode, parent));
				}
			} else if (childNode instanceof defaultView.HTMLElement || childNode instanceof HTMLElement || defaultView.parent && childNode instanceof defaultView.parent.HTMLElement) {
				if (IGNORED_NODE_NAMES.indexOf(childNode.nodeName) === -1) {
					var container = new _NodeContainer2.default(childNode, parent, resourceLoader, index++);
					if (container.isVisible()) {
						if (childNode.tagName === 'INPUT') {
							// $FlowFixMe
							(0, _Input.inlineInputElement)(childNode, container);
						} else if (childNode.tagName === 'TEXTAREA') {
							// $FlowFixMe
							(0, _Input.inlineTextAreaElement)(childNode, container);
						} else if (childNode.tagName === 'SELECT') {
							// $FlowFixMe
							(0, _Input.inlineSelectElement)(childNode, container);
						} else if (container.style.listStyle && container.style.listStyle.listStyleType !== _listStyle.LIST_STYLE_TYPE.NONE) {
							(0, _ListItem.inlineListItemElement)(childNode, container, resourceLoader);
						}

						var SHOULD_TRAVERSE_CHILDREN = childNode.tagName !== 'TEXTAREA';
						var treatAsRealStackingContext = createsRealStackingContext(container, childNode);
						if (treatAsRealStackingContext || createsStackingContext(container)) {
							// for treatAsRealStackingContext:false, any positioned descendants and descendants
							// which actually create a new stacking context should be considered part of the parent stacking context
							var parentStack = treatAsRealStackingContext || container.isPositioned() ? stack.getRealParentStackingContext() : stack;
							var childStack = new _StackingContext2.default(container, parentStack, treatAsRealStackingContext);
							parentStack.contexts.push(childStack);
							if (SHOULD_TRAVERSE_CHILDREN) {
								parseNodeTree(childNode, container, childStack, resourceLoader, index);
							}
						} else {
							stack.children.push(container);
							if (SHOULD_TRAVERSE_CHILDREN) {
								parseNodeTree(childNode, container, stack, resourceLoader, index);
							}
						}
					}
				}
			} else if (childNode instanceof defaultView.SVGSVGElement || childNode instanceof SVGSVGElement || defaultView.parent && childNode instanceof defaultView.parent.SVGSVGElement) {
				var _container = new _NodeContainer2.default(childNode, parent, resourceLoader, index++);
				var _treatAsRealStackingContext = createsRealStackingContext(_container, childNode);
				if (_treatAsRealStackingContext || createsStackingContext(_container)) {
					// for treatAsRealStackingContext:false, any positioned descendants and descendants
					// which actually create a new stacking context should be considered part of the parent stacking context
					var _parentStack = _treatAsRealStackingContext || _container.isPositioned() ? stack.getRealParentStackingContext() : stack;
					var _childStack = new _StackingContext2.default(_container, _parentStack, _treatAsRealStackingContext);
					_parentStack.contexts.push(_childStack);
				} else {
					stack.children.push(_container);
				}
			}
		}
	};

	var createsRealStackingContext = function createsRealStackingContext(container, node) {
		return container.isRootElement() || container.isPositionedWithZIndex() || container.style.opacity < 1 || container.isTransformed() || isBodyWithTransparentRoot(container, node);
	};

	var createsStackingContext = function createsStackingContext(container) {
		return container.isPositioned() || container.isFloating();
	};

	var isBodyWithTransparentRoot = function isBodyWithTransparentRoot(container, node) {
		return node.nodeName === 'BODY' && container.parent instanceof _NodeContainer2.default && container.parent.style.background.backgroundColor.isTransparent();
	};

	/***/ }),
	/* 30 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _NodeContainer = __webpack_require__(3);

	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);

	var _position = __webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StackingContext = function () {
		function StackingContext(container, parent, treatAsRealStackingContext) {
			_classCallCheck(this, StackingContext);

			this.container = container;
			this.parent = parent;
			this.contexts = [];
			this.children = [];
			this.treatAsRealStackingContext = treatAsRealStackingContext;
		}

		_createClass(StackingContext, [{
			key: 'getOpacity',
			value: function getOpacity() {
				return this.parent ? this.container.style.opacity * this.parent.getOpacity() : this.container.style.opacity;
			}
		}, {
			key: 'getRealParentStackingContext',
			value: function getRealParentStackingContext() {
				return !this.parent || this.treatAsRealStackingContext ? this : this.parent.getRealParentStackingContext();
			}
		}]);

		return StackingContext;
	}();

	exports.default = StackingContext;

	/***/ }),
	/* 31 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Size = function Size(width, height) {
		_classCallCheck(this, Size);

		this.width = width;
		this.height = height;
	};

	exports.default = Size;

	/***/ }),
	/* 32 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Path = __webpack_require__(6);

	var _Vector = __webpack_require__(7);

	var _Vector2 = _interopRequireDefault(_Vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var lerp = function lerp(a, b, t) {
		return new _Vector2.default(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
	};

	var BezierCurve = function () {
		function BezierCurve(start, startControl, endControl, end) {
			_classCallCheck(this, BezierCurve);

			this.type = _Path.PATH.BEZIER_CURVE;
			this.start = start;
			this.startControl = startControl;
			this.endControl = endControl;
			this.end = end;
		}

		_createClass(BezierCurve, [{
			key: 'subdivide',
			value: function subdivide(t, firstHalf) {
				var ab = lerp(this.start, this.startControl, t);
				var bc = lerp(this.startControl, this.endControl, t);
				var cd = lerp(this.endControl, this.end, t);
				var abbc = lerp(ab, bc, t);
				var bccd = lerp(bc, cd, t);
				var dest = lerp(abbc, bccd, t);
				return firstHalf ? new BezierCurve(this.start, ab, abbc, dest) : new BezierCurve(dest, bccd, cd, this.end);
			}
		}, {
			key: 'reverse',
			value: function reverse() {
				return new BezierCurve(this.end, this.endControl, this.startControl, this.start);
			}
		}]);

		return BezierCurve;
	}();

	exports.default = BezierCurve;

	/***/ }),
	/* 33 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseBorderRadius = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _Length = __webpack_require__(1);

	var _Length2 = _interopRequireDefault(_Length);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SIDES = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

	var parseBorderRadius = exports.parseBorderRadius = function parseBorderRadius(style) {
		return SIDES.map(function (side) {
			var value = style.getPropertyValue('border-' + side + '-radius');

			var _value$split$map = value.split(' ').map(_Length2.default.create),
				_value$split$map2 = _slicedToArray(_value$split$map, 2),
				horizontal = _value$split$map2[0],
				vertical = _value$split$map2[1];

			return typeof vertical === 'undefined' ? [horizontal, horizontal] : [horizontal, vertical];
		});
	};

	/***/ }),
	/* 34 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var DISPLAY = exports.DISPLAY = {
		NONE: 1 << 0,
		BLOCK: 1 << 1,
		INLINE: 1 << 2,
		RUN_IN: 1 << 3,
		FLOW: 1 << 4,
		FLOW_ROOT: 1 << 5,
		TABLE: 1 << 6,
		FLEX: 1 << 7,
		GRID: 1 << 8,
		RUBY: 1 << 9,
		SUBGRID: 1 << 10,
		LIST_ITEM: 1 << 11,
		TABLE_ROW_GROUP: 1 << 12,
		TABLE_HEADER_GROUP: 1 << 13,
		TABLE_FOOTER_GROUP: 1 << 14,
		TABLE_ROW: 1 << 15,
		TABLE_CELL: 1 << 16,
		TABLE_COLUMN_GROUP: 1 << 17,
		TABLE_COLUMN: 1 << 18,
		TABLE_CAPTION: 1 << 19,
		RUBY_BASE: 1 << 20,
		RUBY_TEXT: 1 << 21,
		RUBY_BASE_CONTAINER: 1 << 22,
		RUBY_TEXT_CONTAINER: 1 << 23,
		CONTENTS: 1 << 24,
		INLINE_BLOCK: 1 << 25,
		INLINE_LIST_ITEM: 1 << 26,
		INLINE_TABLE: 1 << 27,
		INLINE_FLEX: 1 << 28,
		INLINE_GRID: 1 << 29
	};

	var parseDisplayValue = function parseDisplayValue(display) {
		switch (display) {
			case 'block':
				return DISPLAY.BLOCK;
			case 'inline':
				return DISPLAY.INLINE;
			case 'run-in':
				return DISPLAY.RUN_IN;
			case 'flow':
				return DISPLAY.FLOW;
			case 'flow-root':
				return DISPLAY.FLOW_ROOT;
			case 'table':
				return DISPLAY.TABLE;
			case 'flex':
				return DISPLAY.FLEX;
			case 'grid':
				return DISPLAY.GRID;
			case 'ruby':
				return DISPLAY.RUBY;
			case 'subgrid':
				return DISPLAY.SUBGRID;
			case 'list-item':
				return DISPLAY.LIST_ITEM;
			case 'table-row-group':
				return DISPLAY.TABLE_ROW_GROUP;
			case 'table-header-group':
				return DISPLAY.TABLE_HEADER_GROUP;
			case 'table-footer-group':
				return DISPLAY.TABLE_FOOTER_GROUP;
			case 'table-row':
				return DISPLAY.TABLE_ROW;
			case 'table-cell':
				return DISPLAY.TABLE_CELL;
			case 'table-column-group':
				return DISPLAY.TABLE_COLUMN_GROUP;
			case 'table-column':
				return DISPLAY.TABLE_COLUMN;
			case 'table-caption':
				return DISPLAY.TABLE_CAPTION;
			case 'ruby-base':
				return DISPLAY.RUBY_BASE;
			case 'ruby-text':
				return DISPLAY.RUBY_TEXT;
			case 'ruby-base-container':
				return DISPLAY.RUBY_BASE_CONTAINER;
			case 'ruby-text-container':
				return DISPLAY.RUBY_TEXT_CONTAINER;
			case 'contents':
				return DISPLAY.CONTENTS;
			case 'inline-block':
				return DISPLAY.INLINE_BLOCK;
			case 'inline-list-item':
				return DISPLAY.INLINE_LIST_ITEM;
			case 'inline-table':
				return DISPLAY.INLINE_TABLE;
			case 'inline-flex':
				return DISPLAY.INLINE_FLEX;
			case 'inline-grid':
				return DISPLAY.INLINE_GRID;
		}

		return DISPLAY.NONE;
	};

	var setDisplayBit = function setDisplayBit(bit, display) {
		return bit | parseDisplayValue(display);
	};

	var parseDisplay = exports.parseDisplay = function parseDisplay(display) {
		return display.split(' ').reduce(setDisplayBit, 0);
	};

	/***/ }),
	/* 35 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var FLOAT = exports.FLOAT = {
		NONE: 0,
		LEFT: 1,
		RIGHT: 2,
		INLINE_START: 3,
		INLINE_END: 4
	};

	var parseCSSFloat = exports.parseCSSFloat = function parseCSSFloat(float) {
		switch (float) {
			case 'left':
				return FLOAT.LEFT;
			case 'right':
				return FLOAT.RIGHT;
			case 'inline-start':
				return FLOAT.INLINE_START;
			case 'inline-end':
				return FLOAT.INLINE_END;
		}
		return FLOAT.NONE;
	};

	/***/ }),
	/* 36 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var parseFontWeight = function parseFontWeight(weight) {
		switch (weight) {
			case 'normal':
				return 400;
			case 'bold':
				return 700;
		}

		var value = parseInt(weight, 10);
		return isNaN(value) ? 400 : value;
	};

	var parseFont = exports.parseFont = function parseFont(style) {
		var fontFamily = style.fontFamily;
		var fontSize = style.fontSize;
		var fontStyle = style.fontStyle;
		var fontVariant = style.fontVariant;
		var fontWeight = parseFontWeight(style.fontWeight);

		return {
			fontFamily: fontFamily,
			fontSize: fontSize,
			fontStyle: fontStyle,
			fontVariant: fontVariant,
			fontWeight: fontWeight
		};
	};

	/***/ }),
	/* 37 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var parseLetterSpacing = exports.parseLetterSpacing = function parseLetterSpacing(letterSpacing) {
		if (letterSpacing === 'normal') {
			return 0;
		}
		var value = parseFloat(letterSpacing);
		return isNaN(value) ? 0 : value;
	};

	/***/ }),
	/* 38 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var LINE_BREAK = exports.LINE_BREAK = {
		NORMAL: 'normal',
		STRICT: 'strict'
	};

	var parseLineBreak = exports.parseLineBreak = function parseLineBreak(wordBreak) {
		switch (wordBreak) {
			case 'strict':
				return LINE_BREAK.STRICT;
			case 'normal':
			default:
				return LINE_BREAK.NORMAL;
		}
	};

	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseMargin = undefined;

	var _Length = __webpack_require__(1);

	var _Length2 = _interopRequireDefault(_Length);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SIDES = ['top', 'right', 'bottom', 'left'];

	var parseMargin = exports.parseMargin = function parseMargin(style) {
		return SIDES.map(function (side) {
			return new _Length2.default(style.getPropertyValue('margin-' + side));
		});
	};

	/***/ }),
	/* 40 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var OVERFLOW = exports.OVERFLOW = {
		VISIBLE: 0,
		HIDDEN: 1,
		SCROLL: 2,
		AUTO: 3
	};

	var parseOverflow = exports.parseOverflow = function parseOverflow(overflow) {
		switch (overflow) {
			case 'hidden':
				return OVERFLOW.HIDDEN;
			case 'scroll':
				return OVERFLOW.SCROLL;
			case 'auto':
				return OVERFLOW.AUTO;
			case 'visible':
			default:
				return OVERFLOW.VISIBLE;
		}
	};

	/***/ }),
	/* 41 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseTextShadow = undefined;

	var _Color = __webpack_require__(0);

	var _Color2 = _interopRequireDefault(_Color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NUMBER = /^([+-]|\d|\.)$/i;

	var parseTextShadow = exports.parseTextShadow = function parseTextShadow(textShadow) {
		if (textShadow === 'none' || typeof textShadow !== 'string') {
			return null;
		}

		var currentValue = '';
		var isLength = false;
		var values = [];
		var shadows = [];
		var numParens = 0;
		var color = null;

		var appendValue = function appendValue() {
			if (currentValue.length) {
				if (isLength) {
					values.push(parseFloat(currentValue));
				} else {
					color = new _Color2.default(currentValue);
				}
			}
			isLength = false;
			currentValue = '';
		};

		var appendShadow = function appendShadow() {
			if (values.length && color !== null) {
				shadows.push({
					color: color,
					offsetX: values[0] || 0,
					offsetY: values[1] || 0,
					blur: values[2] || 0
				});
			}
			values.splice(0, values.length);
			color = null;
		};

		for (var i = 0; i < textShadow.length; i++) {
			var c = textShadow[i];
			switch (c) {
				case '(':
					currentValue += c;
					numParens++;
					break;
				case ')':
					currentValue += c;
					numParens--;
					break;
				case ',':
					if (numParens === 0) {
						appendValue();
						appendShadow();
					} else {
						currentValue += c;
					}
					break;
				case ' ':
					if (numParens === 0) {
						appendValue();
					} else {
						currentValue += c;
					}
					break;
				default:
					if (currentValue.length === 0 && NUMBER.test(c)) {
						isLength = true;
					}
					currentValue += c;
			}
		}

		appendValue();
		appendShadow();

		if (shadows.length === 0) {
			return null;
		}

		return shadows;
	};

	/***/ }),
	/* 42 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseTransform = undefined;

	var _Length = __webpack_require__(1);

	var _Length2 = _interopRequireDefault(_Length);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var toFloat = function toFloat(s) {
		return parseFloat(s.trim());
	};

	var MATRIX = /(matrix|matrix3d)\((.+)\)/;

	var parseTransform = exports.parseTransform = function parseTransform(style) {
		var transform = parseTransformMatrix(style.transform || style.webkitTransform || style.mozTransform ||
		// $FlowFixMe
		style.msTransform ||
		// $FlowFixMe
		style.oTransform);
		if (transform === null) {
			return null;
		}

		return {
			transform: transform,
			transformOrigin: parseTransformOrigin(style.transformOrigin || style.webkitTransformOrigin || style.mozTransformOrigin ||
			// $FlowFixMe
			style.msTransformOrigin ||
			// $FlowFixMe
			style.oTransformOrigin)
		};
	};

	// $FlowFixMe
	var parseTransformOrigin = function parseTransformOrigin(origin) {
		if (typeof origin !== 'string') {
			var v = new _Length2.default('0');
			return [v, v];
		}
		var values = origin.split(' ').map(_Length2.default.create);
		return [values[0], values[1]];
	};

	// $FlowFixMe
	var parseTransformMatrix = function parseTransformMatrix(transform) {
		if (transform === 'none' || typeof transform !== 'string') {
			return null;
		}

		var match = transform.match(MATRIX);
		if (match) {
			if (match[1] === 'matrix') {
				var matrix = match[2].split(',').map(toFloat);
				return [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]];
			} else {
				var matrix3d = match[2].split(',').map(toFloat);
				return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
			}
		}
		return null;
	};

	/***/ }),
	/* 43 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var VISIBILITY = exports.VISIBILITY = {
		VISIBLE: 0,
		HIDDEN: 1,
		COLLAPSE: 2
	};

	var parseVisibility = exports.parseVisibility = function parseVisibility(visibility) {
		switch (visibility) {
			case 'hidden':
				return VISIBILITY.HIDDEN;
			case 'collapse':
				return VISIBILITY.COLLAPSE;
			case 'visible':
			default:
				return VISIBILITY.VISIBLE;
		}
	};

	/***/ }),
	/* 44 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var WORD_BREAK = exports.WORD_BREAK = {
		NORMAL: 'normal',
		BREAK_ALL: 'break-all',
		KEEP_ALL: 'keep-all'
	};

	var parseWordBreak = exports.parseWordBreak = function parseWordBreak(wordBreak) {
		switch (wordBreak) {
			case 'break-all':
				return WORD_BREAK.BREAK_ALL;
			case 'keep-all':
				return WORD_BREAK.KEEP_ALL;
			case 'normal':
			default:
				return WORD_BREAK.NORMAL;
		}
	};

	/***/ }),
	/* 45 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var parseZIndex = exports.parseZIndex = function parseZIndex(zIndex) {
		var auto = zIndex === 'auto';
		return {
			auto: auto,
			order: auto ? 0 : parseInt(zIndex, 10)
		};
	};

	/***/ }),
	/* 46 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Util = __webpack_require__(13);

	Object.defineProperty(exports, 'toCodePoints', {
	  enumerable: true,
	  get: function get() {
		return _Util.toCodePoints;
	  }
	});
	Object.defineProperty(exports, 'fromCodePoint', {
	  enumerable: true,
	  get: function get() {
		return _Util.fromCodePoint;
	  }
	});

	var _LineBreak = __webpack_require__(47);

	Object.defineProperty(exports, 'LineBreaker', {
	  enumerable: true,
	  get: function get() {
		return _LineBreak.LineBreaker;
	  }
	});

	/***/ }),
	/* 47 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LineBreaker = exports.inlineBreakOpportunities = exports.lineBreakAtIndex = exports.codePointsToCharacterClasses = exports.UnicodeTrie = exports.BREAK_ALLOWED = exports.BREAK_NOT_ALLOWED = exports.BREAK_MANDATORY = exports.classes = exports.LETTER_NUMBER_MODIFIER = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _Trie = __webpack_require__(48);

	var _linebreakTrie = __webpack_require__(49);

	var _linebreakTrie2 = _interopRequireDefault(_linebreakTrie);

	var _Util = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LETTER_NUMBER_MODIFIER = exports.LETTER_NUMBER_MODIFIER = 50;

	// Non-tailorable Line Breaking Classes
	var BK = 1; //  Cause a line break (after)
	var CR = 2; //  Cause a line break (after), except between CR and LF
	var LF = 3; //  Cause a line break (after)
	var CM = 4; //  Prohibit a line break between the character and the preceding character
	var NL = 5; //  Cause a line break (after)
	var SG = 6; //  Do not occur in well-formed text
	var WJ = 7; //  Prohibit line breaks before and after
	var ZW = 8; //  Provide a break opportunity
	var GL = 9; //  Prohibit line breaks before and after
	var SP = 10; // Enable indirect line breaks
	var ZWJ = 11; // Prohibit line breaks within joiner sequences
	// Break Opportunities
	var B2 = 12; //  Provide a line break opportunity before and after the character
	var BA = 13; //  Generally provide a line break opportunity after the character
	var BB = 14; //  Generally provide a line break opportunity before the character
	var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
	var CB = 16; //   Provide a line break opportunity contingent on additional information
	// Characters Prohibiting Certain Breaks
	var CL = 17; //  Prohibit line breaks before
	var CP = 18; //  Prohibit line breaks before
	var EX = 19; //  Prohibit line breaks before
	var IN = 20; //  Allow only indirect line breaks between pairs
	var NS = 21; //  Allow only indirect line breaks before
	var OP = 22; //  Prohibit line breaks after
	var QU = 23; //  Act like they are both opening and closing
	// Numeric Context
	var IS = 24; //  Prevent breaks after any and before numeric
	var NU = 25; //  Form numeric expressions for line breaking purposes
	var PO = 26; //  Do not break following a numeric expression
	var PR = 27; //  Do not break in front of a numeric expression
	var SY = 28; //  Prevent a break before; and allow a break after
	// Other Characters
	var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
	var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
	var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
	var EB = 32; //  Do not break from following Emoji Modifier
	var EM = 33; //  Do not break from preceding Emoji Base
	var H2 = 34; //  Form Korean syllable blocks
	var H3 = 35; //  Form Korean syllable blocks
	var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
	var ID = 37; //  Break before or after; except in some numeric context
	var JL = 38; //  Form Korean syllable blocks
	var JV = 39; //  Form Korean syllable blocks
	var JT = 40; //  Form Korean syllable blocks
	var RI = 41; //  Keep pairs together. For pairs; break before and after other classes
	var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
	var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions

	var classes = exports.classes = {
		BK: BK,
		CR: CR,
		LF: LF,
		CM: CM,
		NL: NL,
		SG: SG,
		WJ: WJ,
		ZW: ZW,
		GL: GL,
		SP: SP,
		ZWJ: ZWJ,
		B2: B2,
		BA: BA,
		BB: BB,
		HY: HY,
		CB: CB,
		CL: CL,
		CP: CP,
		EX: EX,
		IN: IN,
		NS: NS,
		OP: OP,
		QU: QU,
		IS: IS,
		NU: NU,
		PO: PO,
		PR: PR,
		SY: SY,
		AI: AI,
		AL: AL,
		CJ: CJ,
		EB: EB,
		EM: EM,
		H2: H2,
		H3: H3,
		HL: HL,
		ID: ID,
		JL: JL,
		JV: JV,
		JT: JT,
		RI: RI,
		SA: SA,
		XX: XX
	};

	var BREAK_MANDATORY = exports.BREAK_MANDATORY = '!';
	var BREAK_NOT_ALLOWED = exports.BREAK_NOT_ALLOWED = '×';
	var BREAK_ALLOWED = exports.BREAK_ALLOWED = '÷';
	var UnicodeTrie = exports.UnicodeTrie = (0, _Trie.createTrieFromBase64)(_linebreakTrie2.default);

	var ALPHABETICS = [AL, HL];
	var HARD_LINE_BREAKS = [BK, CR, LF, NL];
	var SPACE = [SP, ZW];
	var PREFIX_POSTFIX = [PR, PO];
	var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE);
	var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
	var HYPHEN = [HY, BA];

	var codePointsToCharacterClasses = exports.codePointsToCharacterClasses = function codePointsToCharacterClasses(codePoints) {
		var lineBreak = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'strict';

		var types = [];
		var indicies = [];
		var categories = [];
		codePoints.forEach(function (codePoint, index) {
			var classType = UnicodeTrie.get(codePoint);
			if (classType > LETTER_NUMBER_MODIFIER) {
				categories.push(true);
				classType -= LETTER_NUMBER_MODIFIER;
			} else {
				categories.push(false);
			}

			if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
				// U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
				if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
					indicies.push(index);
					return types.push(CB);
				}
			}

			if (classType === CM || classType === ZWJ) {
				// LB10 Treat any remaining combining mark or ZWJ as AL.
				if (index === 0) {
					indicies.push(index);
					return types.push(AL);
				}

				// LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
				// the base character in all of the following rules. Treat ZWJ as if it were CM.
				var prev = types[index - 1];
				if (LINE_BREAKS.indexOf(prev) === -1) {
					indicies.push(indicies[index - 1]);
					return types.push(prev);
				}
				indicies.push(index);
				return types.push(AL);
			}

			indicies.push(index);

			if (classType === CJ) {
				return types.push(lineBreak === 'strict' ? NS : ID);
			}

			if (classType === SA) {
				return types.push(AL);
			}

			if (classType === AI) {
				return types.push(AL);
			}

			// For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
			// and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
			// to take into account the actual line breaking properties for these characters.
			if (classType === XX) {
				if (codePoint >= 0x20000 && codePoint <= 0x2fffd || codePoint >= 0x30000 && codePoint <= 0x3fffd) {
					return types.push(ID);
				} else {
					return types.push(AL);
				}
			}

			types.push(classType);
		});

		return [indicies, types, categories];
	};

	var isAdjacentWithSpaceIgnored = function isAdjacentWithSpaceIgnored(a, b, currentIndex, classTypes) {
		var current = classTypes[currentIndex];
		if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
			var i = currentIndex;
			while (i <= classTypes.length) {
				i++;
				var next = classTypes[i];

				if (next === b) {
					return true;
				}

				if (next !== SP) {
					break;
				}
			}
		}

		if (current === SP) {
			var _i = currentIndex;

			while (_i > 0) {
				_i--;
				var prev = classTypes[_i];

				if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
					var n = currentIndex;
					while (n <= classTypes.length) {
						n++;
						var _next = classTypes[n];

						if (_next === b) {
							return true;
						}

						if (_next !== SP) {
							break;
						}
					}
				}

				if (prev !== SP) {
					break;
				}
			}
		}
		return false;
	};

	var previousNonSpaceClassType = function previousNonSpaceClassType(currentIndex, classTypes) {
		var i = currentIndex;
		while (i >= 0) {
			var type = classTypes[i];
			if (type === SP) {
				i--;
			} else {
				return type;
			}
		}
		return 0;
	};

	var _lineBreakAtIndex = function _lineBreakAtIndex(codePoints, classTypes, indicies, index, forbiddenBreaks) {
		if (indicies[index] === 0) {
			return BREAK_NOT_ALLOWED;
		}

		var currentIndex = index - 1;
		if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
			return BREAK_NOT_ALLOWED;
		}

		var beforeIndex = currentIndex - 1;
		var afterIndex = currentIndex + 1;
		var current = classTypes[currentIndex];

		// LB4 Always break after hard line breaks.
		// LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
		var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
		var next = classTypes[afterIndex];

		if (current === CR && next === LF) {
			return BREAK_NOT_ALLOWED;
		}

		if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
			return BREAK_MANDATORY;
		}

		// LB6 Do not break before hard line breaks.
		if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// LB7 Do not break before spaces or zero width space.
		if (SPACE.indexOf(next) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
		if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
			return BREAK_ALLOWED;
		}

		// LB8a Do not break between a zero width joiner and an ideograph, emoji base or emoji modifier.
		if (UnicodeTrie.get(codePoints[currentIndex]) === ZWJ && (next === ID || next === EB || next === EM)) {
			return BREAK_NOT_ALLOWED;
		}

		// LB11 Do not break before or after Word joiner and related characters.
		if (current === WJ || next === WJ) {
			return BREAK_NOT_ALLOWED;
		}

		// LB12 Do not break after NBSP and related characters.
		if (current === GL) {
			return BREAK_NOT_ALLOWED;
		}

		// LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
		if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
			return BREAK_NOT_ALLOWED;
		}

		// LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
		if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// LB14 Do not break after ‘[’, even after spaces.
		if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
			return BREAK_NOT_ALLOWED;
		}

		// LB15 Do not break within ‘”[’, even with intervening spaces.
		if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
			return BREAK_NOT_ALLOWED;
		}

		// LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
		if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
			return BREAK_NOT_ALLOWED;
		}

		// LB17 Do not break within ‘——’, even with intervening spaces.
		if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
			return BREAK_NOT_ALLOWED;
		}

		// LB18 Break after spaces.
		if (current === SP) {
			return BREAK_ALLOWED;
		}

		// LB19 Do not break before or after quotation marks, such as ‘ ” ’.
		if (current === QU || next === QU) {
			return BREAK_NOT_ALLOWED;
		}

		// LB20 Break before and after unresolved CB.
		if (next === CB || current === CB) {
			return BREAK_ALLOWED;
		}

		// LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
		if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
			return BREAK_NOT_ALLOWED;
		}

		// LB21a Don't break after Hebrew + Hyphen.
		if (before === HL && HYPHEN.indexOf(current) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// LB21b Don’t break between Solidus and Hebrew letters.
		if (current === SY && next === HL) {
			return BREAK_NOT_ALLOWED;
		}

		// LB22 Do not break between two ellipses, or between letters, numbers or exclamations and ellipsis.
		if (next === IN && ALPHABETICS.concat(IN, EX, NU, ID, EB, EM).indexOf(current) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// LB23 Do not break between digits and letters.
		if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
			return BREAK_NOT_ALLOWED;
		}

		// LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
		if (current === PR && [ID, EB, EM].indexOf(next) !== -1 || [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
			return BREAK_NOT_ALLOWED;
		}

		// LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
		if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 || PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// LB25 Do not break between the following pairs of classes relevant to numbers:
		if (
		// (PR | PO) × ( OP | HY )? NU
		[PR, PO].indexOf(current) !== -1 && (next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) ||
		// ( OP | HY ) × NU
		[OP, HY].indexOf(current) !== -1 && next === NU ||
		// NU ×	(NU | SY | IS)
		current === NU && [NU, SY, IS].indexOf(next) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
		if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
			var prevIndex = currentIndex;
			while (prevIndex >= 0) {
				var type = classTypes[prevIndex];
				if (type === NU) {
					return BREAK_NOT_ALLOWED;
				} else if ([SY, IS].indexOf(type) !== -1) {
					prevIndex--;
				} else {
					break;
				}
			}
		}

		// NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
		if ([PR, PO].indexOf(next) !== -1) {
			var _prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
			while (_prevIndex >= 0) {
				var _type = classTypes[_prevIndex];
				if (_type === NU) {
					return BREAK_NOT_ALLOWED;
				} else if ([SY, IS].indexOf(_type) !== -1) {
					_prevIndex--;
				} else {
					break;
				}
			}
		}

		// LB26 Do not break a Korean syllable.
		if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 || [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 || [JT, H3].indexOf(current) !== -1 && next === JT) {
			return BREAK_NOT_ALLOWED;
		}

		// LB27 Treat a Korean Syllable Block the same as ID.
		if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 || KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
			return BREAK_NOT_ALLOWED;
		}

		// LB28 Do not break between alphabetics (“at”).
		if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
		if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
			return BREAK_NOT_ALLOWED;
		}

		// LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
		if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP || ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
			return BREAK_NOT_ALLOWED;
		}

		// LB30a Break between two regional indicator symbols if and only if there are an even number of regional
		// indicators preceding the position of the break.
		if (current === RI && next === RI) {
			var i = indicies[currentIndex];
			var count = 1;
			while (i > 0) {
				i--;
				if (classTypes[i] === RI) {
					count++;
				} else {
					break;
				}
			}
			if (count % 2 !== 0) {
				return BREAK_NOT_ALLOWED;
			}
		}

		// LB30b Do not break between an emoji base and an emoji modifier.
		if (current === EB && next === EM) {
			return BREAK_NOT_ALLOWED;
		}

		return BREAK_ALLOWED;
	};

	var lineBreakAtIndex = exports.lineBreakAtIndex = function lineBreakAtIndex(codePoints, index) {
		// LB2 Never break at the start of text.
		if (index === 0) {
			return BREAK_NOT_ALLOWED;
		}

		// LB3 Always break at the end of text.
		if (index >= codePoints.length) {
			return BREAK_MANDATORY;
		}

		var _codePointsToCharacte = codePointsToCharacterClasses(codePoints),
			_codePointsToCharacte2 = _slicedToArray(_codePointsToCharacte, 2),
			indicies = _codePointsToCharacte2[0],
			classTypes = _codePointsToCharacte2[1];

		return _lineBreakAtIndex(codePoints, classTypes, indicies, index);
	};

	var cssFormattedClasses = function cssFormattedClasses(codePoints, options) {
		if (!options) {
			options = { lineBreak: 'normal', wordBreak: 'normal' };
		}

		var _codePointsToCharacte3 = codePointsToCharacterClasses(codePoints, options.lineBreak),
			_codePointsToCharacte4 = _slicedToArray(_codePointsToCharacte3, 3),
			indicies = _codePointsToCharacte4[0],
			classTypes = _codePointsToCharacte4[1],
			isLetterNumber = _codePointsToCharacte4[2];

		if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
			classTypes = classTypes.map(function (type) {
				return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
			});
		}

		var forbiddenBreakpoints = options.wordBreak === 'keep-all' ? isLetterNumber.map(function (isLetterNumber, i) {
			return isLetterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
		}) : null;

		return [indicies, classTypes, forbiddenBreakpoints];
	};

	var inlineBreakOpportunities = exports.inlineBreakOpportunities = function inlineBreakOpportunities(str, options) {
		var codePoints = (0, _Util.toCodePoints)(str);
		var output = BREAK_NOT_ALLOWED;

		var _cssFormattedClasses = cssFormattedClasses(codePoints, options),
			_cssFormattedClasses2 = _slicedToArray(_cssFormattedClasses, 3),
			indicies = _cssFormattedClasses2[0],
			classTypes = _cssFormattedClasses2[1],
			forbiddenBreakpoints = _cssFormattedClasses2[2];

		codePoints.forEach(function (codePoint, i) {
			output += (0, _Util.fromCodePoint)(codePoint) + (i >= codePoints.length - 1 ? BREAK_MANDATORY : _lineBreakAtIndex(codePoints, classTypes, indicies, i + 1, forbiddenBreakpoints));
		});

		return output;
	};

	var Break = function () {
		function Break(codePoints, lineBreak, start, end) {
			_classCallCheck(this, Break);

			this._codePoints = codePoints;
			this.required = lineBreak === BREAK_MANDATORY;
			this.start = start;
			this.end = end;
		}

		_createClass(Break, [{
			key: 'slice',
			value: function slice() {
				return _Util.fromCodePoint.apply(undefined, _toConsumableArray(this._codePoints.slice(this.start, this.end)));
			}
		}]);

		return Break;
	}();

	var LineBreaker = exports.LineBreaker = function LineBreaker(str, options) {
		var codePoints = (0, _Util.toCodePoints)(str);

		var _cssFormattedClasses3 = cssFormattedClasses(codePoints, options),
			_cssFormattedClasses4 = _slicedToArray(_cssFormattedClasses3, 3),
			indicies = _cssFormattedClasses4[0],
			classTypes = _cssFormattedClasses4[1],
			forbiddenBreakpoints = _cssFormattedClasses4[2];

		var length = codePoints.length;
		var lastEnd = 0;
		var nextIndex = 0;

		return {
			next: function next() {
				if (nextIndex >= length) {
					return { done: true };
				}
				var lineBreak = BREAK_NOT_ALLOWED;
				while (nextIndex < length && (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) === BREAK_NOT_ALLOWED) {}

				if (lineBreak !== BREAK_NOT_ALLOWED || nextIndex === length) {
					var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
					lastEnd = nextIndex;
					return { value: value, done: false };
				}

				return { done: true };
			}
		};
	};

	/***/ }),
	/* 48 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Trie = exports.createTrieFromBase64 = exports.UTRIE2_INDEX_2_MASK = exports.UTRIE2_INDEX_2_BLOCK_LENGTH = exports.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = exports.UTRIE2_INDEX_1_OFFSET = exports.UTRIE2_UTF8_2B_INDEX_2_LENGTH = exports.UTRIE2_UTF8_2B_INDEX_2_OFFSET = exports.UTRIE2_INDEX_2_BMP_LENGTH = exports.UTRIE2_LSCP_INDEX_2_LENGTH = exports.UTRIE2_DATA_MASK = exports.UTRIE2_DATA_BLOCK_LENGTH = exports.UTRIE2_LSCP_INDEX_2_OFFSET = exports.UTRIE2_SHIFT_1_2 = exports.UTRIE2_INDEX_SHIFT = exports.UTRIE2_SHIFT_1 = exports.UTRIE2_SHIFT_2 = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Util = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** Shift size for getting the index-2 table offset. */
	var UTRIE2_SHIFT_2 = exports.UTRIE2_SHIFT_2 = 5;

	/** Shift size for getting the index-1 table offset. */
	var UTRIE2_SHIFT_1 = exports.UTRIE2_SHIFT_1 = 6 + 5;

	/**
	 * Shift size for shifting left the index array values.
	 * Increases possible data size with 16-bit index values at the cost
	 * of compactability.
	 * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
	 */
	var UTRIE2_INDEX_SHIFT = exports.UTRIE2_INDEX_SHIFT = 2;

	/**
	 * Difference between the two shift sizes,
	 * for getting an index-1 offset from an index-2 offset. 6=11-5
	 */
	var UTRIE2_SHIFT_1_2 = exports.UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;

	/**
	 * The part of the index-2 table for U+D800..U+DBFF stores values for
	 * lead surrogate code _units_ not code _points_.
	 * Values for lead surrogate code _points_ are indexed with this portion of the table.
	 * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
	 */
	var UTRIE2_LSCP_INDEX_2_OFFSET = exports.UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;

	/** Number of entries in a data block. 32=0x20 */
	var UTRIE2_DATA_BLOCK_LENGTH = exports.UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
	/** Mask for getting the lower bits for the in-data-block offset. */
	var UTRIE2_DATA_MASK = exports.UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;

	var UTRIE2_LSCP_INDEX_2_LENGTH = exports.UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
	/** Count the lengths of both BMP pieces. 2080=0x820 */
	var UTRIE2_INDEX_2_BMP_LENGTH = exports.UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
	/**
	 * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
	 * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
	 */
	var UTRIE2_UTF8_2B_INDEX_2_OFFSET = exports.UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
	var UTRIE2_UTF8_2B_INDEX_2_LENGTH = exports.UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
	/**
	 * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
	 * Variable length, for code points up to highStart, where the last single-value range starts.
	 * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
	 * (For 0x100000 supplementary code points U+10000..U+10ffff.)
	 *
	 * The part of the index-2 table for supplementary code points starts
	 * after this index-1 table.
	 *
	 * Both the index-1 table and the following part of the index-2 table
	 * are omitted completely if there is only BMP data.
	 */
	var UTRIE2_INDEX_1_OFFSET = exports.UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;

	/**
	 * Number of index-1 entries for the BMP. 32=0x20
	 * This part of the index-1 table is omitted from the serialized form.
	 */
	var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = exports.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;

	/** Number of entries in an index-2 block. 64=0x40 */
	var UTRIE2_INDEX_2_BLOCK_LENGTH = exports.UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
	/** Mask for getting the lower bits for the in-index-2-block offset. */
	var UTRIE2_INDEX_2_MASK = exports.UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;

	var createTrieFromBase64 = exports.createTrieFromBase64 = function createTrieFromBase64(base64) {
		var buffer = (0, _Util.decode)(base64);
		var view32 = Array.isArray(buffer) ? (0, _Util.polyUint32Array)(buffer) : new Uint32Array(buffer);
		var view16 = Array.isArray(buffer) ? (0, _Util.polyUint16Array)(buffer) : new Uint16Array(buffer);
		var headerLength = 24;

		var index = view16.slice(headerLength / 2, view32[4] / 2);
		var data = view32[5] === 2 ? view16.slice((headerLength + view32[4]) / 2) : view32.slice(Math.ceil((headerLength + view32[4]) / 4));

		return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
	};

	var Trie = exports.Trie = function () {
		function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
			_classCallCheck(this, Trie);

			this.initialValue = initialValue;
			this.errorValue = errorValue;
			this.highStart = highStart;
			this.highValueIndex = highValueIndex;
			this.index = index;
			this.data = data;
		}

		/**
		 * Get the value for a code point as stored in the Trie.
		 *
		 * @param codePoint the code point
		 * @return the value
		 */


		_createClass(Trie, [{
			key: 'get',
			value: function get(codePoint) {
				var ix = void 0;
				if (codePoint >= 0) {
					if (codePoint < 0x0d800 || codePoint > 0x0dbff && codePoint <= 0x0ffff) {
						// Ordinary BMP code point, excluding leading surrogates.
						// BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
						// 16 bit data is stored in the index array itself.
						ix = this.index[codePoint >> UTRIE2_SHIFT_2];
						ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
						return this.data[ix];
					}

					if (codePoint <= 0xffff) {
						// Lead Surrogate Code Point.  A Separate index section is stored for
						// lead surrogate code units and code points.
						//   The main index has the code unit data.
						//   For this function, we need the code point data.
						// Note: this expression could be refactored for slightly improved efficiency, but
						//       surrogate code points will be so rare in practice that it's not worth it.
						ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 0xd800 >> UTRIE2_SHIFT_2)];
						ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
						return this.data[ix];
					}

					if (codePoint < this.highStart) {
						// Supplemental code point, use two-level lookup.
						ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
						ix = this.index[ix];
						ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
						ix = this.index[ix];
						ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
						return this.data[ix];
					}
					if (codePoint <= 0x10ffff) {
						return this.data[this.highValueIndex];
					}
				}

				// Fall through.  The code point is outside of the legal range of 0..0x10ffff.
				return this.errorValue;
			}
		}]);

		return Trie;
	}();

	/***/ }),
	/* 49 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	module.exports = 'KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA';

	/***/ }),
	/* 50 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Path = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Circle = function Circle(x, y, radius) {
		_classCallCheck(this, Circle);

		this.type = _Path.PATH.CIRCLE;
		this.x = x;
		this.y = y;
		this.radius = radius;
		if (true) {
			if (isNaN(x)) {
				console.error('Invalid x value given for Circle');
			}
			if (isNaN(y)) {
				console.error('Invalid y value given for Circle');
			}
			if (isNaN(radius)) {
				console.error('Invalid radius value given for Circle');
			}
		}
	};

	exports.default = Circle;

	/***/ }),
	/* 51 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Bounds = __webpack_require__(2);

	var _Font = __webpack_require__(25);

	var _Gradient = __webpack_require__(52);

	var _TextContainer = __webpack_require__(9);

	var _TextContainer2 = _interopRequireDefault(_TextContainer);

	var _background = __webpack_require__(5);

	var _border = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Renderer = function () {
		function Renderer(target, options) {
			_classCallCheck(this, Renderer);

			this.target = target;
			this.options = options;
			target.render(options);
		}

		_createClass(Renderer, [{
			key: 'renderNode',
			value: function renderNode(container) {
				if (container.isVisible()) {
					this.renderNodeBackgroundAndBorders(container);
					this.renderNodeContent(container);
				}
			}
		}, {
			key: 'renderNodeContent',
			value: function renderNodeContent(container) {
				var _this = this;

				var callback = function callback() {
					if (container.childNodes.length) {
						container.childNodes.forEach(function (child) {
							if (child instanceof _TextContainer2.default) {
								var style = child.parent.style;
								_this.target.renderTextNode(child.bounds, style.color, style.font, style.textDecoration, style.textShadow);
							} else {
								_this.target.drawShape(child, container.style.color);
							}
						});
					}

					if (container.image) {
						var _image = _this.options.imageStore.get(container.image);
						if (_image) {
							var contentBox = (0, _Bounds.calculateContentBox)(container.bounds, container.style.padding, container.style.border);
							var _width = typeof _image.width === 'number' && _image.width > 0 ? _image.width : contentBox.width;
							var _height = typeof _image.height === 'number' && _image.height > 0 ? _image.height : contentBox.height;
							if (_width > 0 && _height > 0) {
								_this.target.clip([(0, _Bounds.calculatePaddingBoxPath)(container.curvedBounds)], function () {
									_this.target.drawImage(_image, new _Bounds.Bounds(0, 0, _width, _height), contentBox);
								});
							}
						}
					}
				};
				var paths = container.getClipPaths();
				if (paths.length) {
					this.target.clip(paths, callback);
				} else {
					callback();
				}
			}
		}, {
			key: 'renderNodeBackgroundAndBorders',
			value: function renderNodeBackgroundAndBorders(container) {
				var _this2 = this;

				var HAS_BACKGROUND = !container.style.background.backgroundColor.isTransparent() || container.style.background.backgroundImage.length;

				var hasRenderableBorders = container.style.border.some(function (border) {
					return border.borderStyle !== _border.BORDER_STYLE.NONE && !border.borderColor.isTransparent();
				});

				var callback = function callback() {
					var backgroundPaintingArea = (0, _background.calculateBackgroungPaintingArea)(container.curvedBounds, container.style.background.backgroundClip);

					if (HAS_BACKGROUND) {
						_this2.target.clip([backgroundPaintingArea], function () {
							if (!container.style.background.backgroundColor.isTransparent()) {
								_this2.target.fill(container.style.background.backgroundColor);
							}

							_this2.renderBackgroundImage(container);
						});
					}

					container.style.border.forEach(function (border, side) {
						if (border.borderStyle !== _border.BORDER_STYLE.NONE && !border.borderColor.isTransparent()) {
							_this2.renderBorder(border, side, container.curvedBounds);
						}
					});
				};

				if (HAS_BACKGROUND || hasRenderableBorders) {
					var paths = container.parent ? container.parent.getClipPaths() : [];
					if (paths.length) {
						this.target.clip(paths, callback);
					} else {
						callback();
					}
				}
			}
		}, {
			key: 'renderBackgroundImage',
			value: function renderBackgroundImage(container) {
				var _this3 = this;

				container.style.background.backgroundImage.slice(0).reverse().forEach(function (backgroundImage) {
					if (backgroundImage.source.method === 'url' && backgroundImage.source.args.length) {
						_this3.renderBackgroundRepeat(container, backgroundImage);
					} else if (/gradient/i.test(backgroundImage.source.method)) {
						_this3.renderBackgroundGradient(container, backgroundImage);
					}
				});
			}
		}, {
			key: 'renderBackgroundRepeat',
			value: function renderBackgroundRepeat(container, background) {
				var image = this.options.imageStore.get(background.source.args[0]);
				if (image) {
					var backgroundPositioningArea = (0, _background.calculateBackgroungPositioningArea)(container.style.background.backgroundOrigin, container.bounds, container.style.padding, container.style.border);
					var backgroundImageSize = (0, _background.calculateBackgroundSize)(background, image, backgroundPositioningArea);
					var position = (0, _background.calculateBackgroundPosition)(background.position, backgroundImageSize, backgroundPositioningArea);
					var _path = (0, _background.calculateBackgroundRepeatPath)(background, position, backgroundImageSize, backgroundPositioningArea, container.bounds);
					var _offsetX = Math.round(backgroundPositioningArea.left + position.x);
					var _offsetY = Math.round(backgroundPositioningArea.top + position.y);
					this.target.renderRepeat(_path, image, backgroundImageSize, _offsetX, _offsetY);
				}
			}
		}, {
			key: 'renderBackgroundGradient',
			value: function renderBackgroundGradient(container, background) {
				var backgroundPositioningArea = (0, _background.calculateBackgroungPositioningArea)(container.style.background.backgroundOrigin, container.bounds, container.style.padding, container.style.border);
				var backgroundImageSize = (0, _background.calculateGradientBackgroundSize)(background, backgroundPositioningArea);
				var position = (0, _background.calculateBackgroundPosition)(background.position, backgroundImageSize, backgroundPositioningArea);
				var gradientBounds = new _Bounds.Bounds(Math.round(backgroundPositioningArea.left + position.x), Math.round(backgroundPositioningArea.top + position.y), backgroundImageSize.width, backgroundImageSize.height);

				var gradient = (0, _Gradient.parseGradient)(container, background.source, gradientBounds);
				if (gradient) {
					switch (gradient.type) {
						case _Gradient.GRADIENT_TYPE.LINEAR_GRADIENT:
							// $FlowFixMe
							this.target.renderLinearGradient(gradientBounds, gradient);
							break;
						case _Gradient.GRADIENT_TYPE.RADIAL_GRADIENT:
							// $FlowFixMe
							this.target.renderRadialGradient(gradientBounds, gradient);
							break;
					}
				}
			}
		}, {
			key: 'renderBorder',
			value: function renderBorder(border, side, curvePoints) {
				this.target.drawShape((0, _Bounds.parsePathForBorder)(curvePoints, side), border.borderColor);
			}
		}, {
			key: 'renderStack',
			value: function renderStack(stack) {
				var _this4 = this;

				if (stack.container.isVisible()) {
					var _opacity = stack.getOpacity();
					if (_opacity !== this._opacity) {
						this.target.setOpacity(stack.getOpacity());
						this._opacity = _opacity;
					}

					var _transform = stack.container.style.transform;
					if (_transform !== null) {
						this.target.transform(stack.container.bounds.left + _transform.transformOrigin[0].value, stack.container.bounds.top + _transform.transformOrigin[1].value, _transform.transform, function () {
							return _this4.renderStackContent(stack);
						});
					} else {
						this.renderStackContent(stack);
					}
				}
			}
		}, {
			key: 'renderStackContent',
			value: function renderStackContent(stack) {
				var _splitStackingContext = splitStackingContexts(stack),
					_splitStackingContext2 = _slicedToArray(_splitStackingContext, 5),
					negativeZIndex = _splitStackingContext2[0],
					zeroOrAutoZIndexOrTransformedOrOpacity = _splitStackingContext2[1],
					positiveZIndex = _splitStackingContext2[2],
					nonPositionedFloats = _splitStackingContext2[3],
					nonPositionedInlineLevel = _splitStackingContext2[4];

				var _splitDescendants = splitDescendants(stack),
					_splitDescendants2 = _slicedToArray(_splitDescendants, 2),
					inlineLevel = _splitDescendants2[0],
					nonInlineLevel = _splitDescendants2[1];

				// https://www.w3.org/TR/css-position-3/#painting-order
				// 1. the background and borders of the element forming the stacking context.


				this.renderNodeBackgroundAndBorders(stack.container);
				// 2. the child stacking contexts with negative stack levels (most negative first).
				negativeZIndex.sort(sortByZIndex).forEach(this.renderStack, this);
				// 3. For all its in-flow, non-positioned, block-level descendants in tree order:
				this.renderNodeContent(stack.container);
				nonInlineLevel.forEach(this.renderNode, this);
				// 4. All non-positioned floating descendants, in tree order. For each one of these,
				// treat the element as if it created a new stacking context, but any positioned descendants and descendants
				// which actually create a new stacking context should be considered part of the parent stacking context,
				// not this new one.
				nonPositionedFloats.forEach(this.renderStack, this);
				// 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
				nonPositionedInlineLevel.forEach(this.renderStack, this);
				inlineLevel.forEach(this.renderNode, this);
				// 6. All positioned, opacity or transform descendants, in tree order that fall into the following categories:
				//  All positioned descendants with 'z-index: auto' or 'z-index: 0', in tree order.
				//  For those with 'z-index: auto', treat the element as if it created a new stacking context,
				//  but any positioned descendants and descendants which actually create a new stacking context should be
				//  considered part of the parent stacking context, not this new one. For those with 'z-index: 0',
				//  treat the stacking context generated atomically.
				//
				//  All opacity descendants with opacity less than 1
				//
				//  All transform descendants with transform other than none
				zeroOrAutoZIndexOrTransformedOrOpacity.forEach(this.renderStack, this);
				// 7. Stacking contexts formed by positioned descendants with z-indices greater than or equal to 1 in z-index
				// order (smallest first) then tree order.
				positiveZIndex.sort(sortByZIndex).forEach(this.renderStack, this);
			}
		}, {
			key: 'render',
			value: function render(stack) {
				var _this5 = this;

				if (this.options.backgroundColor) {
					this.target.rectangle(this.options.x, this.options.y, this.options.width, this.options.height, this.options.backgroundColor);
				}
				this.renderStack(stack);
				var target = this.target.getTarget();
				if (true) {
					return target.then(function (output) {
						_this5.options.logger.log('Render completed');
						return output;
					});
				}
				return target;
			}
		}]);

		return Renderer;
	}();

	exports.default = Renderer;


	var splitDescendants = function splitDescendants(stack) {
		var inlineLevel = [];
		var nonInlineLevel = [];

		var length = stack.children.length;
		for (var i = 0; i < length; i++) {
			var child = stack.children[i];
			if (child.isInlineLevel()) {
				inlineLevel.push(child);
			} else {
				nonInlineLevel.push(child);
			}
		}
		return [inlineLevel, nonInlineLevel];
	};

	var splitStackingContexts = function splitStackingContexts(stack) {
		var negativeZIndex = [];
		var zeroOrAutoZIndexOrTransformedOrOpacity = [];
		var positiveZIndex = [];
		var nonPositionedFloats = [];
		var nonPositionedInlineLevel = [];
		var length = stack.contexts.length;
		for (var i = 0; i < length; i++) {
			var child = stack.contexts[i];
			if (child.container.isPositioned() || child.container.style.opacity < 1 || child.container.isTransformed()) {
				if (child.container.style.zIndex.order < 0) {
					negativeZIndex.push(child);
				} else if (child.container.style.zIndex.order > 0) {
					positiveZIndex.push(child);
				} else {
					zeroOrAutoZIndexOrTransformedOrOpacity.push(child);
				}
			} else {
				if (child.container.isFloating()) {
					nonPositionedFloats.push(child);
				} else {
					nonPositionedInlineLevel.push(child);
				}
			}
		}
		return [negativeZIndex, zeroOrAutoZIndexOrTransformedOrOpacity, positiveZIndex, nonPositionedFloats, nonPositionedInlineLevel];
	};

	var sortByZIndex = function sortByZIndex(a, b) {
		if (a.container.style.zIndex.order > b.container.style.zIndex.order) {
			return 1;
		} else if (a.container.style.zIndex.order < b.container.style.zIndex.order) {
			return -1;
		}

		return a.container.index > b.container.index ? 1 : -1;
	};

	/***/ }),
	/* 52 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.transformWebkitRadialGradientArgs = exports.parseGradient = exports.RadialGradient = exports.LinearGradient = exports.RADIAL_GRADIENT_SHAPE = exports.GRADIENT_TYPE = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _NodeContainer = __webpack_require__(3);

	var _NodeContainer2 = _interopRequireDefault(_NodeContainer);

	var _Angle = __webpack_require__(53);

	var _Color = __webpack_require__(0);

	var _Color2 = _interopRequireDefault(_Color);

	var _Length = __webpack_require__(1);

	var _Length2 = _interopRequireDefault(_Length);

	var _Util = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SIDE_OR_CORNER = /^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i;
	var PERCENTAGE_ANGLES = /^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i;
	var ENDS_WITH_LENGTH = /(px)|%|( 0)$/i;
	var FROM_TO_COLORSTOP = /^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i;
	var RADIAL_SHAPE_DEFINITION = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i;

	var GRADIENT_TYPE = exports.GRADIENT_TYPE = {
		LINEAR_GRADIENT: 0,
		RADIAL_GRADIENT: 1
	};

	var RADIAL_GRADIENT_SHAPE = exports.RADIAL_GRADIENT_SHAPE = {
		CIRCLE: 0,
		ELLIPSE: 1
	};

	var LENGTH_FOR_POSITION = {
		left: new _Length2.default('0%'),
		top: new _Length2.default('0%'),
		center: new _Length2.default('50%'),
		right: new _Length2.default('100%'),
		bottom: new _Length2.default('100%')
	};

	var LinearGradient = exports.LinearGradient = function LinearGradient(colorStops, direction) {
		_classCallCheck(this, LinearGradient);

		this.type = GRADIENT_TYPE.LINEAR_GRADIENT;
		this.colorStops = colorStops;
		this.direction = direction;
	};

	var RadialGradient = exports.RadialGradient = function RadialGradient(colorStops, shape, center, radius) {
		_classCallCheck(this, RadialGradient);

		this.type = GRADIENT_TYPE.RADIAL_GRADIENT;
		this.colorStops = colorStops;
		this.shape = shape;
		this.center = center;
		this.radius = radius;
	};

	var parseGradient = exports.parseGradient = function parseGradient(container, _ref, bounds) {
		var args = _ref.args,
			method = _ref.method,
			prefix = _ref.prefix;

		if (method === 'linear-gradient') {
			return parseLinearGradient(args, bounds, !!prefix);
		} else if (method === 'gradient' && args[0] === 'linear') {
			// TODO handle correct angle
			return parseLinearGradient(['to bottom'].concat(transformObsoleteColorStops(args.slice(3))), bounds, !!prefix);
		} else if (method === 'radial-gradient') {
			return parseRadialGradient(container, prefix === '-webkit-' ? transformWebkitRadialGradientArgs(args) : args, bounds);
		} else if (method === 'gradient' && args[0] === 'radial') {
			return parseRadialGradient(container, transformObsoleteColorStops(transformWebkitRadialGradientArgs(args.slice(1))), bounds);
		}
	};

	var parseColorStops = function parseColorStops(args, firstColorStopIndex, lineLength) {
		var colorStops = [];

		for (var i = firstColorStopIndex; i < args.length; i++) {
			var value = args[i];
			var HAS_LENGTH = ENDS_WITH_LENGTH.test(value);
			var lastSpaceIndex = value.lastIndexOf(' ');
			var _color = new _Color2.default(HAS_LENGTH ? value.substring(0, lastSpaceIndex) : value);
			var _stop = HAS_LENGTH ? new _Length2.default(value.substring(lastSpaceIndex + 1)) : i === firstColorStopIndex ? new _Length2.default('0%') : i === args.length - 1 ? new _Length2.default('100%') : null;
			colorStops.push({ color: _color, stop: _stop });
		}

		var absoluteValuedColorStops = colorStops.map(function (_ref2) {
			var color = _ref2.color,
				stop = _ref2.stop;

			var absoluteStop = lineLength === 0 ? 0 : stop ? stop.getAbsoluteValue(lineLength) / lineLength : null;

			return {
				color: color,
				// $FlowFixMe
				stop: absoluteStop
			};
		});

		var previousColorStop = absoluteValuedColorStops[0].stop;
		for (var _i = 0; _i < absoluteValuedColorStops.length; _i++) {
			if (previousColorStop !== null) {
				var _stop2 = absoluteValuedColorStops[_i].stop;
				if (_stop2 === null) {
					var n = _i;
					while (absoluteValuedColorStops[n].stop === null) {
						n++;
					}
					var steps = n - _i + 1;
					var nextColorStep = absoluteValuedColorStops[n].stop;
					var stepSize = (nextColorStep - previousColorStop) / steps;
					for (; _i < n; _i++) {
						previousColorStop = absoluteValuedColorStops[_i].stop = previousColorStop + stepSize;
					}
				} else {
					previousColorStop = _stop2;
				}
			}
		}

		return absoluteValuedColorStops;
	};

	var parseLinearGradient = function parseLinearGradient(args, bounds, hasPrefix) {
		var angle = (0, _Angle.parseAngle)(args[0]);
		var HAS_SIDE_OR_CORNER = SIDE_OR_CORNER.test(args[0]);
		var HAS_DIRECTION = HAS_SIDE_OR_CORNER || angle !== null || PERCENTAGE_ANGLES.test(args[0]);
		var direction = HAS_DIRECTION ? angle !== null ? calculateGradientDirection(
		// if there is a prefix, the 0° angle points due East (instead of North per W3C)
		hasPrefix ? angle - Math.PI * 0.5 : angle, bounds) : HAS_SIDE_OR_CORNER ? parseSideOrCorner(args[0], bounds) : parsePercentageAngle(args[0], bounds) : calculateGradientDirection(Math.PI, bounds);
		var firstColorStopIndex = HAS_DIRECTION ? 1 : 0;

		// TODO: Fix some inaccuracy with color stops with px values
		var lineLength = Math.min((0, _Util.distance)(Math.abs(direction.x0) + Math.abs(direction.x1), Math.abs(direction.y0) + Math.abs(direction.y1)), bounds.width * 2, bounds.height * 2);

		return new LinearGradient(parseColorStops(args, firstColorStopIndex, lineLength), direction);
	};

	var parseRadialGradient = function parseRadialGradient(container, args, bounds) {
		var m = args[0].match(RADIAL_SHAPE_DEFINITION);
		var shape = m && (m[1] === 'circle' || // explicit shape specification
		m[3] !== undefined && m[5] === undefined) // only one radius coordinate
		? RADIAL_GRADIENT_SHAPE.CIRCLE : RADIAL_GRADIENT_SHAPE.ELLIPSE;
		var radius = {};
		var center = {};

		if (m) {
			// Radius
			if (m[3] !== undefined) {
				radius.x = (0, _Length.calculateLengthFromValueWithUnit)(container, m[3], m[4]).getAbsoluteValue(bounds.width);
			}

			if (m[5] !== undefined) {
				radius.y = (0, _Length.calculateLengthFromValueWithUnit)(container, m[5], m[6]).getAbsoluteValue(bounds.height);
			}

			// Position
			if (m[7]) {
				center.x = LENGTH_FOR_POSITION[m[7].toLowerCase()];
			} else if (m[8] !== undefined) {
				center.x = (0, _Length.calculateLengthFromValueWithUnit)(container, m[8], m[9]);
			}

			if (m[10]) {
				center.y = LENGTH_FOR_POSITION[m[10].toLowerCase()];
			} else if (m[11] !== undefined) {
				center.y = (0, _Length.calculateLengthFromValueWithUnit)(container, m[11], m[12]);
			}
		}

		var gradientCenter = {
			x: center.x === undefined ? bounds.width / 2 : center.x.getAbsoluteValue(bounds.width),
			y: center.y === undefined ? bounds.height / 2 : center.y.getAbsoluteValue(bounds.height)
		};
		var gradientRadius = calculateRadius(m && m[2] || 'farthest-corner', shape, gradientCenter, radius, bounds);

		return new RadialGradient(parseColorStops(args, m ? 1 : 0, Math.min(gradientRadius.x, gradientRadius.y)), shape, gradientCenter, gradientRadius);
	};

	var calculateGradientDirection = function calculateGradientDirection(radian, bounds) {
		var width = bounds.width;
		var height = bounds.height;
		var HALF_WIDTH = width * 0.5;
		var HALF_HEIGHT = height * 0.5;
		var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
		var HALF_LINE_LENGTH = lineLength / 2;

		var x0 = HALF_WIDTH + Math.sin(radian) * HALF_LINE_LENGTH;
		var y0 = HALF_HEIGHT - Math.cos(radian) * HALF_LINE_LENGTH;
		var x1 = width - x0;
		var y1 = height - y0;

		return { x0: x0, x1: x1, y0: y0, y1: y1 };
	};

	var parseTopRight = function parseTopRight(bounds) {
		return Math.acos(bounds.width / 2 / ((0, _Util.distance)(bounds.width, bounds.height) / 2));
	};

	var parseSideOrCorner = function parseSideOrCorner(side, bounds) {
		switch (side) {
			case 'bottom':
			case 'to top':
				return calculateGradientDirection(0, bounds);
			case 'left':
			case 'to right':
				return calculateGradientDirection(Math.PI / 2, bounds);
			case 'right':
			case 'to left':
				return calculateGradientDirection(3 * Math.PI / 2, bounds);
			case 'top right':
			case 'right top':
			case 'to bottom left':
			case 'to left bottom':
				return calculateGradientDirection(Math.PI + parseTopRight(bounds), bounds);
			case 'top left':
			case 'left top':
			case 'to bottom right':
			case 'to right bottom':
				return calculateGradientDirection(Math.PI - parseTopRight(bounds), bounds);
			case 'bottom left':
			case 'left bottom':
			case 'to top right':
			case 'to right top':
				return calculateGradientDirection(parseTopRight(bounds), bounds);
			case 'bottom right':
			case 'right bottom':
			case 'to top left':
			case 'to left top':
				return calculateGradientDirection(2 * Math.PI - parseTopRight(bounds), bounds);
			case 'top':
			case 'to bottom':
			default:
				return calculateGradientDirection(Math.PI, bounds);
		}
	};

	var parsePercentageAngle = function parsePercentageAngle(angle, bounds) {
		var _angle$split$map = angle.split(' ').map(parseFloat),
			_angle$split$map2 = _slicedToArray(_angle$split$map, 2),
			left = _angle$split$map2[0],
			top = _angle$split$map2[1];

		var ratio = left / 100 * bounds.width / (top / 100 * bounds.height);

		return calculateGradientDirection(Math.atan(isNaN(ratio) ? 1 : ratio) + Math.PI / 2, bounds);
	};

	var findCorner = function findCorner(bounds, x, y, closest) {
		var corners = [{ x: 0, y: 0 }, { x: 0, y: bounds.height }, { x: bounds.width, y: 0 }, { x: bounds.width, y: bounds.height }];

		// $FlowFixMe
		return corners.reduce(function (stat, corner) {
			var d = (0, _Util.distance)(x - corner.x, y - corner.y);
			if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
				return {
					optimumCorner: corner,
					optimumDistance: d
				};
			}

			return stat;
		}, {
			optimumDistance: closest ? Infinity : -Infinity,
			optimumCorner: null
		}).optimumCorner;
	};

	var calculateRadius = function calculateRadius(extent, shape, center, radius, bounds) {
		var x = center.x;
		var y = center.y;
		var rx = 0;
		var ry = 0;

		switch (extent) {
			case 'closest-side':
				// The ending shape is sized so that that it exactly meets the side of the gradient box closest to the gradient’s center.
				// If the shape is an ellipse, it exactly meets the closest side in each dimension.
				if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
					rx = ry = Math.min(Math.abs(x), Math.abs(x - bounds.width), Math.abs(y), Math.abs(y - bounds.height));
				} else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
					rx = Math.min(Math.abs(x), Math.abs(x - bounds.width));
					ry = Math.min(Math.abs(y), Math.abs(y - bounds.height));
				}
				break;

			case 'closest-corner':
				// The ending shape is sized so that that it passes through the corner of the gradient box closest to the gradient’s center.
				// If the shape is an ellipse, the ending shape is given the same aspect-ratio it would have if closest-side were specified.
				if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
					rx = ry = Math.min((0, _Util.distance)(x, y), (0, _Util.distance)(x, y - bounds.height), (0, _Util.distance)(x - bounds.width, y), (0, _Util.distance)(x - bounds.width, y - bounds.height));
				} else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
					// Compute the ratio ry/rx (which is to be the same as for "closest-side")
					var c = Math.min(Math.abs(y), Math.abs(y - bounds.height)) / Math.min(Math.abs(x), Math.abs(x - bounds.width));
					var corner = findCorner(bounds, x, y, true);
					rx = (0, _Util.distance)(corner.x - x, (corner.y - y) / c);
					ry = c * rx;
				}
				break;

			case 'farthest-side':
				// Same as closest-side, except the ending shape is sized based on the farthest side(s)
				if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
					rx = ry = Math.max(Math.abs(x), Math.abs(x - bounds.width), Math.abs(y), Math.abs(y - bounds.height));
				} else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
					rx = Math.max(Math.abs(x), Math.abs(x - bounds.width));
					ry = Math.max(Math.abs(y), Math.abs(y - bounds.height));
				}
				break;

			case 'farthest-corner':
				// Same as closest-corner, except the ending shape is sized based on the farthest corner.
				// If the shape is an ellipse, the ending shape is given the same aspect ratio it would have if farthest-side were specified.
				if (shape === RADIAL_GRADIENT_SHAPE.CIRCLE) {
					rx = ry = Math.max((0, _Util.distance)(x, y), (0, _Util.distance)(x, y - bounds.height), (0, _Util.distance)(x - bounds.width, y), (0, _Util.distance)(x - bounds.width, y - bounds.height));
				} else if (shape === RADIAL_GRADIENT_SHAPE.ELLIPSE) {
					// Compute the ratio ry/rx (which is to be the same as for "farthest-side")
					var _c = Math.max(Math.abs(y), Math.abs(y - bounds.height)) / Math.max(Math.abs(x), Math.abs(x - bounds.width));
					var _corner = findCorner(bounds, x, y, false);
					rx = (0, _Util.distance)(_corner.x - x, (_corner.y - y) / _c);
					ry = _c * rx;
				}
				break;

			default:
				// pixel or percentage values
				rx = radius.x || 0;
				ry = radius.y !== undefined ? radius.y : rx;
				break;
		}

		return {
			x: rx,
			y: ry
		};
	};

	var transformWebkitRadialGradientArgs = exports.transformWebkitRadialGradientArgs = function transformWebkitRadialGradientArgs(args) {
		var shape = '';
		var radius = '';
		var extent = '';
		var position = '';
		var idx = 0;

		var POSITION = /^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i;
		var SHAPE_AND_EXTENT = /^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i;
		var RADIUS = /^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i;

		var matchStartPosition = args[idx].match(POSITION);
		if (matchStartPosition) {
			idx++;
		}

		var matchShapeExtent = args[idx].match(SHAPE_AND_EXTENT);
		if (matchShapeExtent) {
			shape = matchShapeExtent[1] || '';
			extent = matchShapeExtent[2] || '';
			if (extent === 'contain') {
				extent = 'closest-side';
			} else if (extent === 'cover') {
				extent = 'farthest-corner';
			}
			idx++;
		}

		var matchStartRadius = args[idx].match(RADIUS);
		if (matchStartRadius) {
			idx++;
		}

		var matchEndPosition = args[idx].match(POSITION);
		if (matchEndPosition) {
			idx++;
		}

		var matchEndRadius = args[idx].match(RADIUS);
		if (matchEndRadius) {
			idx++;
		}

		var matchPosition = matchEndPosition || matchStartPosition;
		if (matchPosition && matchPosition[1]) {
			position = matchPosition[1] + (/^\d+$/.test(matchPosition[1]) ? 'px' : '');
			if (matchPosition[2]) {
				position += ' ' + matchPosition[2] + (/^\d+$/.test(matchPosition[2]) ? 'px' : '');
			}
		}

		var matchRadius = matchEndRadius || matchStartRadius;
		if (matchRadius) {
			radius = matchRadius[0];
			if (!matchRadius[1]) {
				radius += 'px';
			}
		}

		if (position && !shape && !radius && !extent) {
			radius = position;
			position = '';
		}

		if (position) {
			position = 'at ' + position;
		}

		return [[shape, extent, radius, position].filter(function (s) {
			return !!s;
		}).join(' ')].concat(args.slice(idx));
	};

	var transformObsoleteColorStops = function transformObsoleteColorStops(args) {
		return args.map(function (color) {
			return color.match(FROM_TO_COLORSTOP);
		})
		// $FlowFixMe
		.map(function (v, index) {
			if (!v) {
				return args[index];
			}

			switch (v[1]) {
				case 'from':
					return v[4] + ' 0%';
				case 'to':
					return v[4] + ' 100%';
				case 'color-stop':
					if (v[3] === '%') {
						return v[4] + ' ' + v[2];
					}
					return v[4] + ' ' + parseFloat(v[2]) * 100 + '%';
			}
		});
	};

	/***/ }),
	/* 53 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var ANGLE = /([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;

	var parseAngle = exports.parseAngle = function parseAngle(angle) {
		var match = angle.match(ANGLE);

		if (match) {
			var value = parseFloat(match[1]);
			switch (match[2].toLowerCase()) {
				case 'deg':
					return Math.PI * value / 180;
				case 'grad':
					return Math.PI / 200 * value;
				case 'rad':
					return value;
				case 'turn':
					return Math.PI * 2 * value;
			}
		}

		return null;
	};

	/***/ }),
	/* 54 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.cloneWindow = exports.DocumentCloner = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Bounds = __webpack_require__(2);

	var _Proxy = __webpack_require__(26);

	var _ResourceLoader = __webpack_require__(55);

	var _ResourceLoader2 = _interopRequireDefault(_ResourceLoader);

	var _Util = __webpack_require__(4);

	var _background = __webpack_require__(5);

	var _CanvasRenderer = __webpack_require__(15);

	var _CanvasRenderer2 = _interopRequireDefault(_CanvasRenderer);

	var _PseudoNodeContent = __webpack_require__(56);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var IGNORE_ATTRIBUTE = 'data-html2canvas-ignore';

	var DocumentCloner = exports.DocumentCloner = function () {
		function DocumentCloner(element, options, logger, copyInline, renderer) {
			_classCallCheck(this, DocumentCloner);

			this.referenceElement = element;
			this.scrolledElements = [];
			this.copyStyles = copyInline;
			this.inlineImages = copyInline;
			this.logger = logger;
			this.options = options;
			this.renderer = renderer;
			this.resourceLoader = new _ResourceLoader2.default(options, logger, window);
			this.pseudoContentData = {
				counters: {},
				quoteDepth: 0
			};
			// $FlowFixMe
			this.documentElement = this.cloneNode(element.ownerDocument.documentElement);
		}

		_createClass(DocumentCloner, [{
			key: 'inlineAllImages',
			value: function inlineAllImages(node) {
				var _this = this;

				if (this.inlineImages && node) {
					var style = node.style;
					Promise.all((0, _background.parseBackgroundImage)(style.backgroundImage).map(function (backgroundImage) {
						if (backgroundImage.method === 'url') {
							return _this.resourceLoader.inlineImage(backgroundImage.args[0]).then(function (img) {
								return img && typeof img.src === 'string' ? 'url("' + img.src + '")' : 'none';
							}).catch(function (e) {
								if (true) {
									_this.logger.log('1: Unable to load image', e);
								}
							});
						}
						return Promise.resolve('' + backgroundImage.prefix + backgroundImage.method + '(' + backgroundImage.args.join(',') + ')');
					})).then(function (backgroundImages) {
						if (backgroundImages.length > 1) {
							// TODO Multiple backgrounds somehow broken in Chrome
							style.backgroundColor = '';
						}
						style.backgroundImage = backgroundImages.join(',');
					});

					if (node instanceof HTMLImageElement) {
						this.resourceLoader.inlineImage(node.src).then(function (img) {
							if (img && node instanceof HTMLImageElement && node.parentNode) {
								var parentNode = node.parentNode;
								var clonedChild = (0, _Util.copyCSSStyles)(node.style, img.cloneNode(false));
								parentNode.replaceChild(clonedChild, node);
							}
						}).catch(function (e) {
							if (true) {
								_this.logger.log('2: Unable to load image', e);
							}
						});
					}
				}
			}
		}, {
			key: 'inlineFonts',
			value: function inlineFonts(document) {
				var _this2 = this;

				return Promise.all(Array.from(document.styleSheets).map(function (sheet) {
					if (sheet.href) {
						return fetch(sheet.href).then(function (res) {
							return res.text();
						}).then(function (text) {
							return createStyleSheetFontsFromText(text, sheet.href);
						}).catch(function (e) {
							if (true) {
								_this2.logger.log('Unable to load stylesheet', e);
							}
							return [];
						});
					}
					return getSheetFonts(sheet, document);
				})).then(function (fonts) {
					return fonts.reduce(function (acc, font) {
						return acc.concat(font);
					}, []);
				}).then(function (fonts) {
					return Promise.all(fonts.map(function (font) {
						return fetch(font.formats[0].src).then(function (response) {
							return response.blob();
						}).then(function (blob) {
							return new Promise(function (resolve, reject) {
								var reader = new FileReader();
								reader.onerror = reject;
								reader.onload = function () {
									// $FlowFixMe
									var result = reader.result;
									resolve(result);
								};
								reader.readAsDataURL(blob);
							});
						}).then(function (dataUri) {
							font.fontFace.setProperty('src', 'url("' + dataUri + '")');
							return '@font-face {' + font.fontFace.cssText + ' ';
						});
					}));
				}).then(function (fontCss) {
					var style = document.createElement('style');
					style.textContent = fontCss.join('\n');
					_this2.documentElement.appendChild(style);
				});
			}
		}, {
			key: 'createElementClone',
			value: function createElementClone(node) {
				var _this3 = this;

				if (this.copyStyles && node instanceof HTMLCanvasElement) {
					var img = node.ownerDocument.createElement('img');
					try {
						img.src = node.toDataURL();
						return img;
					} catch (e) {
						if (true) {
							this.logger.log('Unable to clone canvas contents, canvas is tainted');
						}
					}
				}

				if (node instanceof HTMLIFrameElement) {
					var tempIframe = node.cloneNode(false);
					var iframeKey = generateIframeKey();
					tempIframe.setAttribute('data-html2canvas-internal-iframe-key', iframeKey);

					var _parseBounds = (0, _Bounds.parseBounds)(node, 0, 0),
						width = _parseBounds.width,
						height = _parseBounds.height;

					this.resourceLoader.cache[iframeKey] = getIframeDocumentElement(node, this.options).then(function (documentElement) {
						return _this3.renderer(documentElement, {
							async: _this3.options.async,
							allowTaint: _this3.options.allowTaint,
							backgroundColor: '#ffffff',
							canvas: null,
							imageTimeout: _this3.options.imageTimeout,
							logging: _this3.options.logging,
							proxy: _this3.options.proxy,
							removeContainer: _this3.options.removeContainer,
							scale: _this3.options.scale,
							foreignObjectRendering: _this3.options.foreignObjectRendering,
							useCORS: _this3.options.useCORS,
							target: new _CanvasRenderer2.default(),
							width: width,
							height: height,
							x: 0,
							y: 0,
							windowWidth: documentElement.ownerDocument.defaultView.innerWidth,
							windowHeight: documentElement.ownerDocument.defaultView.innerHeight,
							scrollX: documentElement.ownerDocument.defaultView.pageXOffset,
							scrollY: documentElement.ownerDocument.defaultView.pageYOffset
						}, _this3.logger.child(iframeKey));
					}).then(function (canvas) {
						return new Promise(function (resolve, reject) {
							var iframeCanvas = document.createElement('img');
							iframeCanvas.onload = function () {
								return resolve(canvas);
							};
							iframeCanvas.onerror = reject;
							iframeCanvas.src = canvas.toDataURL();
							if (tempIframe.parentNode) {
								tempIframe.parentNode.replaceChild((0, _Util.copyCSSStyles)(node.ownerDocument.defaultView.getComputedStyle(node), iframeCanvas), tempIframe);
							}
						});
					});
					return tempIframe;
				}

				if (node instanceof HTMLStyleElement && node.sheet && node.sheet.cssRules) {
					var css = [].slice.call(node.sheet.cssRules, 0).reduce(function (css, rule) {
						try {
							if (rule && rule.cssText) {
								return css + rule.cssText;
							}
							return css;
						} catch (err) {
							_this3.logger.log('Unable to access cssText property', rule.name);
							return css;
						}
					}, '');
					var style = node.cloneNode(false);
					style.textContent = css;
					return style;
				}

				return node.cloneNode(false);
			}
		}, {
			key: 'cloneNode',
			value: function cloneNode(node) {
				var clone = node.nodeType === Node.TEXT_NODE ? document.createTextNode(node.nodeValue) : this.createElementClone(node);

				var window = node.ownerDocument.defaultView;
				var style = node instanceof window.HTMLElement ? window.getComputedStyle(node) : null;
				var styleBefore = node instanceof window.HTMLElement ? window.getComputedStyle(node, ':before') : null;
				var styleAfter = node instanceof window.HTMLElement ? window.getComputedStyle(node, ':after') : null;

				if (this.referenceElement === node && clone instanceof window.HTMLElement) {
					this.clonedReferenceElement = clone;
				}

				if (clone instanceof window.HTMLBodyElement) {
					createPseudoHideStyles(clone);
				}

				var counters = (0, _PseudoNodeContent.parseCounterReset)(style, this.pseudoContentData);
				var contentBefore = (0, _PseudoNodeContent.resolvePseudoContent)(node, styleBefore, this.pseudoContentData);

				for (var child = node.firstChild; child; child = child.nextSibling) {
					if (child.nodeType !== Node.ELEMENT_NODE || child.nodeName !== 'SCRIPT' &&
					// $FlowFixMe
					!child.hasAttribute(IGNORE_ATTRIBUTE) && (typeof this.options.ignoreElements !== 'function' ||
					// $FlowFixMe
					!this.options.ignoreElements(child))) {
						if (!this.copyStyles || child.nodeName !== 'STYLE') {
							clone.appendChild(this.cloneNode(child));
						}
					}
				}

				var contentAfter = (0, _PseudoNodeContent.resolvePseudoContent)(node, styleAfter, this.pseudoContentData);
				(0, _PseudoNodeContent.popCounters)(counters, this.pseudoContentData);

				if (node instanceof window.HTMLElement && clone instanceof window.HTMLElement) {
					if (styleBefore) {
						this.inlineAllImages(inlinePseudoElement(node, clone, styleBefore, contentBefore, PSEUDO_BEFORE));
					}
					if (styleAfter) {
						this.inlineAllImages(inlinePseudoElement(node, clone, styleAfter, contentAfter, PSEUDO_AFTER));
					}
					if (style && this.copyStyles && !(node instanceof HTMLIFrameElement)) {
						(0, _Util.copyCSSStyles)(style, clone);
					}
					this.inlineAllImages(clone);
					if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
						this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
					}
					switch (node.nodeName) {
						case 'CANVAS':
							if (!this.copyStyles) {
								cloneCanvasContents(node, clone);
							}
							break;
						case 'TEXTAREA':
						case 'SELECT':
							clone.value = node.value;
							break;
					}
				}
				return clone;
			}
		}]);

		return DocumentCloner;
	}();

	var getSheetFonts = function getSheetFonts(sheet, document) {
		// $FlowFixMe
		return (sheet.cssRules ? Array.from(sheet.cssRules) : []).filter(function (rule) {
			return rule.type === CSSRule.FONT_FACE_RULE;
		}).map(function (rule) {
			var src = (0, _background.parseBackgroundImage)(rule.style.getPropertyValue('src'));
			var formats = [];
			for (var i = 0; i < src.length; i++) {
				if (src[i].method === 'url' && src[i + 1] && src[i + 1].method === 'format') {
					var a = document.createElement('a');
					a.href = src[i].args[0];
					if (document.body) {
						document.body.appendChild(a);
					}

					var font = {
						src: a.href,
						format: src[i + 1].args[0]
					};
					formats.push(font);
				}
			}

			return {
				// TODO select correct format for browser),

				formats: formats.filter(function (font) {
					return (/^woff/i.test(font.format)
					);
				}),
				fontFace: rule.style
			};
		}).filter(function (font) {
			return font.formats.length;
		});
	};

	var createStyleSheetFontsFromText = function createStyleSheetFontsFromText(text, baseHref) {
		var doc = document.implementation.createHTMLDocument('');
		var base = document.createElement('base');
		// $FlowFixMe
		base.href = baseHref;
		var style = document.createElement('style');

		style.textContent = text;
		if (doc.head) {
			doc.head.appendChild(base);
		}
		if (doc.body) {
			doc.body.appendChild(style);
		}

		return style.sheet ? getSheetFonts(style.sheet, doc) : [];
	};

	var restoreOwnerScroll = function restoreOwnerScroll(ownerDocument, x, y) {
		if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
			ownerDocument.defaultView.scrollTo(x, y);
		}
	};

	var cloneCanvasContents = function cloneCanvasContents(canvas, clonedCanvas) {
		try {
			if (clonedCanvas) {
				clonedCanvas.width = canvas.width;
				clonedCanvas.height = canvas.height;
				var ctx = canvas.getContext('2d');
				var clonedCtx = clonedCanvas.getContext('2d');
				if (ctx) {
					clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
				} else {
					clonedCtx.drawImage(canvas, 0, 0);
				}
			}
		} catch (e) {}
	};

	var inlinePseudoElement = function inlinePseudoElement(node, clone, style, contentItems, pseudoElt) {
		if (!style || !style.content || style.content === 'none' || style.content === '-moz-alt-content' || style.display === 'none') {
			return;
		}

		var anonymousReplacedElement = clone.ownerDocument.createElement('html2canvaspseudoelement');
		(0, _Util.copyCSSStyles)(style, anonymousReplacedElement);

		if (contentItems) {
			var len = contentItems.length;
			for (var i = 0; i < len; i++) {
				var item = contentItems[i];
				switch (item.type) {
					case _PseudoNodeContent.PSEUDO_CONTENT_ITEM_TYPE.IMAGE:
						var img = clone.ownerDocument.createElement('img');
						img.src = (0, _background.parseBackgroundImage)('url(' + item.value + ')')[0].args[0];
						img.style.opacity = '1';
						anonymousReplacedElement.appendChild(img);
						break;
					case _PseudoNodeContent.PSEUDO_CONTENT_ITEM_TYPE.TEXT:
						anonymousReplacedElement.appendChild(clone.ownerDocument.createTextNode(item.value));
						break;
				}
			}
		}

		anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ' ' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
		clone.className += pseudoElt === PSEUDO_BEFORE ? ' ' + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE : ' ' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
		if (pseudoElt === PSEUDO_BEFORE) {
			clone.insertBefore(anonymousReplacedElement, clone.firstChild);
		} else {
			clone.appendChild(anonymousReplacedElement);
		}

		return anonymousReplacedElement;
	};

	var URL_REGEXP = /^url\((.+)\)$/i;
	var PSEUDO_BEFORE = ':before';
	var PSEUDO_AFTER = ':after';
	var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = '___html2canvas___pseudoelement_before';
	var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = '___html2canvas___pseudoelement_after';

	var PSEUDO_HIDE_ELEMENT_STYLE = '{\n    content: "" !important;\n    display: none !important;\n}';

	var createPseudoHideStyles = function createPseudoHideStyles(body) {
		createStyles(body, '.' + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + '\n         .' + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
	};

	var createStyles = function createStyles(body, styles) {
		var style = body.ownerDocument.createElement('style');
		style.innerHTML = styles;
		body.appendChild(style);
	};

	var initNode = function initNode(_ref) {
		var _ref2 = _slicedToArray(_ref, 3),
			element = _ref2[0],
			x = _ref2[1],
			y = _ref2[2];

		element.scrollLeft = x;
		element.scrollTop = y;
	};

	var generateIframeKey = function generateIframeKey() {
		return Math.ceil(Date.now() + Math.random() * 10000000).toString(16);
	};

	var DATA_URI_REGEXP = /^data:text\/(.+);(base64)?,(.*)$/i;

	var getIframeDocumentElement = function getIframeDocumentElement(node, options) {
		try {
			return Promise.resolve(node.contentWindow.document.documentElement);
		} catch (e) {
			return options.proxy ? (0, _Proxy.Proxy)(node.src, options).then(function (html) {
				var match = html.match(DATA_URI_REGEXP);
				if (!match) {
					return Promise.reject();
				}

				return match[2] === 'base64' ? window.atob(decodeURIComponent(match[3])) : decodeURIComponent(match[3]);
			}).then(function (html) {
				return createIframeContainer(node.ownerDocument, (0, _Bounds.parseBounds)(node, 0, 0)).then(function (cloneIframeContainer) {
					var cloneWindow = cloneIframeContainer.contentWindow;
					var documentClone = cloneWindow.document;

					documentClone.open();
					documentClone.write(html);
					var iframeLoad = iframeLoader(cloneIframeContainer).then(function () {
						return documentClone.documentElement;
					});

					documentClone.close();
					return iframeLoad;
				});
			}) : Promise.reject();
		}
	};

	var createIframeContainer = function createIframeContainer(ownerDocument, bounds) {
		var cloneIframeContainer = ownerDocument.createElement('iframe');

		cloneIframeContainer.className = 'html2canvas-container';
		cloneIframeContainer.style.visibility = 'hidden';
		cloneIframeContainer.style.position = 'fixed';
		cloneIframeContainer.style.left = '-10000px';
		cloneIframeContainer.style.top = '0px';
		cloneIframeContainer.style.border = '0';
		cloneIframeContainer.width = bounds.width.toString();
		cloneIframeContainer.height = bounds.height.toString();
		cloneIframeContainer.scrolling = 'no'; // ios won't scroll without it
		cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, 'true');
		if (!ownerDocument.body) {
			return Promise.reject( true ? 'Body element not found in Document that is getting rendered' : '');
		}

		ownerDocument.body.appendChild(cloneIframeContainer);

		return Promise.resolve(cloneIframeContainer);
	};

	var iframeLoader = function iframeLoader(cloneIframeContainer) {
		var cloneWindow = cloneIframeContainer.contentWindow;
		var documentClone = cloneWindow.document;

		return new Promise(function (resolve, reject) {
			cloneWindow.onload = cloneIframeContainer.onload = documentClone.onreadystatechange = function () {
				var interval = setInterval(function () {
					if (documentClone.body.childNodes.length > 0 && documentClone.readyState === 'complete') {
						clearInterval(interval);
						resolve(cloneIframeContainer);
					}
				}, 50);
			};
		});
	};

	var cloneWindow = exports.cloneWindow = function cloneWindow(ownerDocument, bounds, referenceElement, options, logger, renderer) {
		var cloner = new DocumentCloner(referenceElement, options, logger, false, renderer);
		var scrollX = ownerDocument.defaultView.pageXOffset;
		var scrollY = ownerDocument.defaultView.pageYOffset;

		return createIframeContainer(ownerDocument, bounds).then(function (cloneIframeContainer) {
			var cloneWindow = cloneIframeContainer.contentWindow;
			var documentClone = cloneWindow.document;

			/* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
				 if window url is about:blank, we can assign the url to current by writing onto the document
				 */

			var iframeLoad = iframeLoader(cloneIframeContainer).then(function () {
				cloner.scrolledElements.forEach(initNode);
				cloneWindow.scrollTo(bounds.left, bounds.top);
				if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (cloneWindow.scrollY !== bounds.top || cloneWindow.scrollX !== bounds.left)) {
					documentClone.documentElement.style.top = -bounds.top + 'px';
					documentClone.documentElement.style.left = -bounds.left + 'px';
					documentClone.documentElement.style.position = 'absolute';
				}

				var result = Promise.resolve([cloneIframeContainer, cloner.clonedReferenceElement, cloner.resourceLoader]);

				var onclone = options.onclone;

				return cloner.clonedReferenceElement instanceof cloneWindow.HTMLElement || cloner.clonedReferenceElement instanceof ownerDocument.defaultView.HTMLElement || cloner.clonedReferenceElement instanceof HTMLElement ? typeof onclone === 'function' ? Promise.resolve().then(function () {
					return onclone(documentClone);
				}).then(function () {
					return result;
				}) : result : Promise.reject( true ? 'Error finding the ' + referenceElement.nodeName + ' in the cloned document' : '');
			});

			documentClone.open();
			documentClone.write(serializeDoctype(document.doctype) + '<html></html>');
			// Chrome scrolls the parent document for some reason after the write to the cloned window???
			restoreOwnerScroll(referenceElement.ownerDocument, scrollX, scrollY);
			documentClone.replaceChild(documentClone.adoptNode(cloner.documentElement), documentClone.documentElement);
			documentClone.close();

			return iframeLoad;
		});
	};

	var serializeDoctype = function serializeDoctype(doctype) {
		var str = '';
		if (doctype) {
			str += '<!DOCTYPE ';
			if (doctype.name) {
				str += doctype.name;
			}

			if (doctype.internalSubset) {
				str += doctype.internalSubset;
			}

			if (doctype.publicId) {
				str += '"' + doctype.publicId + '"';
			}

			if (doctype.systemId) {
				str += '"' + doctype.systemId + '"';
			}

			str += '>';
		}

		return str;
	};

	/***/ }),
	/* 55 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ResourceStore = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Feature = __webpack_require__(10);

	var _Feature2 = _interopRequireDefault(_Feature);

	var _Proxy = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResourceLoader = function () {
		function ResourceLoader(options, logger, window) {
			_classCallCheck(this, ResourceLoader);

			this.options = options;
			this._window = window;
			this.origin = this.getOrigin(window.location.href);
			this.cache = {};
			this.logger = logger;
			this._index = 0;
		}

		_createClass(ResourceLoader, [{
			key: 'loadImage',
			value: function loadImage(src) {
				var _this = this;

				if (this.hasResourceInCache(src)) {
					return src;
				}
				if (isBlobImage(src)) {
					this.cache[src] = _loadImage(src, this.options.imageTimeout || 0);
					return src;
				}

				if (!isSVG(src) || _Feature2.default.SUPPORT_SVG_DRAWING) {
					if (this.options.allowTaint === true || isInlineImage(src) || this.isSameOrigin(src)) {
						return this.addImage(src, src, false);
					} else if (!this.isSameOrigin(src)) {
						if (typeof this.options.proxy === 'string') {
							this.cache[src] = (0, _Proxy.Proxy)(src, this.options).then(function (src) {
								return _loadImage(src, _this.options.imageTimeout || 0);
							});
							return src;
						} else if (this.options.useCORS === true && _Feature2.default.SUPPORT_CORS_IMAGES) {
							return this.addImage(src, src, true);
						}
					}
				}
			}
		}, {
			key: 'inlineImage',
			value: function inlineImage(src) {
				var _this2 = this;

				if (isInlineImage(src)) {
					return _loadImage(src, this.options.imageTimeout || 0);
				}
				if (this.hasResourceInCache(src)) {
					return this.cache[src];
				}
				if (!this.isSameOrigin(src) && typeof this.options.proxy === 'string') {
					return this.cache[src] = (0, _Proxy.Proxy)(src, this.options).then(function (src) {
						return _loadImage(src, _this2.options.imageTimeout || 0);
					});
				}

				return this.xhrImage(src);
			}
		}, {
			key: 'xhrImage',
			value: function xhrImage(src) {
				var _this3 = this;

				this.cache[src] = new Promise(function (resolve, reject) {
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (xhr.status !== 200) {
								reject('Failed to fetch image ' + src.substring(0, 256) + ' with status code ' + xhr.status);
							} else {
								var reader = new FileReader();
								reader.addEventListener('load', function () {
									// $FlowFixMe
									var result = reader.result;
									resolve(result);
								}, false);
								reader.addEventListener('error', function (e) {
									return reject(e);
								}, false);
								reader.readAsDataURL(xhr.response);
							}
						}
					};
					xhr.responseType = 'blob';
					if (_this3.options.imageTimeout) {
						var timeout = _this3.options.imageTimeout;
						xhr.timeout = timeout;
						xhr.ontimeout = function () {
							return reject( true ? 'Timed out (' + timeout + 'ms) fetching ' + src.substring(0, 256) : '');
						};
					}
					xhr.open('GET', src, true);
					xhr.send();
				}).then(function (src) {
					return _loadImage(src, _this3.options.imageTimeout || 0);
				});

				return this.cache[src];
			}
		}, {
			key: 'loadCanvas',
			value: function loadCanvas(node) {
				var key = String(this._index++);
				this.cache[key] = Promise.resolve(node);
				return key;
			}
		}, {
			key: 'hasResourceInCache',
			value: function hasResourceInCache(key) {
				return typeof this.cache[key] !== 'undefined';
			}
		}, {
			key: 'addImage',
			value: function addImage(key, src, useCORS) {
				var _this4 = this;

				if (true) {
					this.logger.log('1 : Added image ' + key.substring(0, 256));
				}

				var imageLoadHandler = function imageLoadHandler(supportsDataImages) {
					return new Promise(function (resolve, reject) {
						var img = new Image();
						img.onload = function () {
							return resolve(img);
						};
						//ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
						if (!supportsDataImages || useCORS) {
							img.crossOrigin = 'anonymous';
						}

						img.onerror = reject;
						img.src = src;
						if (img.complete === true) {
							// Inline XML images may fail to parse, throwing an Error later on
							setTimeout(function () {
								resolve(img);
							}, 500);
						}
						if (_this4.options.imageTimeout) {
							var timeout = _this4.options.imageTimeout;
							setTimeout(function () {
								return reject( true ? 'Timed out (' + timeout + 'ms) fetching ' + src.substring(0, 256) : '');
							}, timeout);
						}
					});
				};

				this.cache[key] = isInlineBase64Image(src) && !isSVG(src) ? // $FlowFixMe
				_Feature2.default.SUPPORT_BASE64_DRAWING(src).then(imageLoadHandler) : imageLoadHandler(true);
				return key;
			}
		}, {
			key: 'isSameOrigin',
			value: function isSameOrigin(url) {
				return this.getOrigin(url) === this.origin;
			}
		}, {
			key: 'getOrigin',
			value: function getOrigin(url) {
				var link = this._link || (this._link = this._window.document.createElement('a'));
				link.href = url;
				link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
				return link.protocol + link.hostname + link.port;
			}
		}, {
			key: 'ready',
			value: function ready() {
				var _this5 = this;

				var keys = Object.keys(this.cache);
				var values = keys.map(function (str) {
					return _this5.cache[str].catch(function (e) {
						if (true) {
							_this5.logger.log('3: Unable to load image', e);
						}
						return null;
					});
				});
				return Promise.all(values).then(function (images) {
					if (true) {
						_this5.logger.log('Finished loading ' + images.length + ' images', images);
					}
					return new ResourceStore(keys, images);
				});
			}
		}]);

		return ResourceLoader;
	}();

	exports.default = ResourceLoader;

	var ResourceStore = exports.ResourceStore = function () {
		function ResourceStore(keys, resources) {
			_classCallCheck(this, ResourceStore);

			this._keys = keys;
			this._resources = resources;
		}

		_createClass(ResourceStore, [{
			key: 'get',
			value: function get(key) {
				var index = this._keys.indexOf(key);
				return index === -1 ? null : this._resources[index];
			}
		}]);

		return ResourceStore;
	}();

	var INLINE_SVG = /^data:image\/svg\+xml/i;
	var INLINE_BASE64 = /^data:image\/.*;base64,/i;
	var INLINE_IMG = /^data:image\/.*/i;

	var isInlineImage = function isInlineImage(src) {
		return INLINE_IMG.test(src);
	};
	var isInlineBase64Image = function isInlineBase64Image(src) {
		return INLINE_BASE64.test(src);
	};
	var isBlobImage = function isBlobImage(src) {
		return src.substr(0, 4) === 'blob';
	};

	var isSVG = function isSVG(src) {
		return src.substr(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src);
	};

	var _loadImage = function _loadImage(src, timeout) {
		return new Promise(function (resolve, reject) {
			var img = new Image();
			img.onload = function () {
				return resolve(img);
			};
			img.onerror = reject;
			img.src = src;
			if (img.complete === true) {
				// Inline XML images may fail to parse, throwing an Error later on
				setTimeout(function () {
					resolve(img);
				}, 500);
			}
			if (timeout) {
				setTimeout(function () {
					return reject( true ? 'Timed out (' + timeout + 'ms) loading image' : '');
				}, timeout);
			}
		});
	};

	/***/ }),
	/* 56 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.parseContent = exports.resolvePseudoContent = exports.popCounters = exports.parseCounterReset = exports.TOKEN_TYPE = exports.PSEUDO_CONTENT_ITEM_TYPE = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _ListItem = __webpack_require__(14);

	var _listStyle = __webpack_require__(8);

	var PSEUDO_CONTENT_ITEM_TYPE = exports.PSEUDO_CONTENT_ITEM_TYPE = {
		TEXT: 0,
		IMAGE: 1
	};

	var TOKEN_TYPE = exports.TOKEN_TYPE = {
		STRING: 0,
		ATTRIBUTE: 1,
		URL: 2,
		COUNTER: 3,
		COUNTERS: 4,
		OPENQUOTE: 5,
		CLOSEQUOTE: 6
	};

	var parseCounterReset = exports.parseCounterReset = function parseCounterReset(style, data) {
		if (!style || !style.counterReset || style.counterReset === 'none') {
			return [];
		}

		var counterNames = [];
		var counterResets = style.counterReset.split(/\s*,\s*/);
		var lenCounterResets = counterResets.length;

		for (var i = 0; i < lenCounterResets; i++) {
			var _counterResets$i$spli = counterResets[i].split(/\s+/),
				_counterResets$i$spli2 = _slicedToArray(_counterResets$i$spli, 2),
				counterName = _counterResets$i$spli2[0],
				initialValue = _counterResets$i$spli2[1];

			counterNames.push(counterName);
			var counter = data.counters[counterName];
			if (!counter) {
				counter = data.counters[counterName] = [];
			}
			counter.push(parseInt(initialValue || 0, 10));
		}

		return counterNames;
	};

	var popCounters = exports.popCounters = function popCounters(counterNames, data) {
		var lenCounters = counterNames.length;
		for (var i = 0; i < lenCounters; i++) {
			data.counters[counterNames[i]].pop();
		}
	};

	var resolvePseudoContent = exports.resolvePseudoContent = function resolvePseudoContent(node, style, data) {
		if (!style || !style.content || style.content === 'none' || style.content === '-moz-alt-content' || style.display === 'none') {
			return null;
		}

		var tokens = parseContent(style.content);

		var len = tokens.length;
		var contentItems = [];
		var s = '';

		// increment the counter (if there is a "counter-increment" declaration)
		var counterIncrement = style.counterIncrement;
		if (counterIncrement && counterIncrement !== 'none') {
			var _counterIncrement$spl = counterIncrement.split(/\s+/),
				_counterIncrement$spl2 = _slicedToArray(_counterIncrement$spl, 2),
				counterName = _counterIncrement$spl2[0],
				incrementValue = _counterIncrement$spl2[1];

			var counter = data.counters[counterName];
			if (counter) {
				counter[counter.length - 1] += incrementValue === undefined ? 1 : parseInt(incrementValue, 10);
			}
		}

		// build the content string
		for (var i = 0; i < len; i++) {
			var token = tokens[i];
			switch (token.type) {
				case TOKEN_TYPE.STRING:
					s += token.value || '';
					break;

				case TOKEN_TYPE.ATTRIBUTE:
					if (node instanceof HTMLElement && token.value) {
						s += node.getAttribute(token.value) || '';
					}
					break;

				case TOKEN_TYPE.COUNTER:
					var _counter = data.counters[token.name || ''];
					if (_counter) {
						s += formatCounterValue([_counter[_counter.length - 1]], '', token.format);
					}
					break;

				case TOKEN_TYPE.COUNTERS:
					var _counters = data.counters[token.name || ''];
					if (_counters) {
						s += formatCounterValue(_counters, token.glue, token.format);
					}
					break;

				case TOKEN_TYPE.OPENQUOTE:
					s += getQuote(style, true, data.quoteDepth);
					data.quoteDepth++;
					break;

				case TOKEN_TYPE.CLOSEQUOTE:
					data.quoteDepth--;
					s += getQuote(style, false, data.quoteDepth);
					break;

				case TOKEN_TYPE.URL:
					if (s) {
						contentItems.push({ type: PSEUDO_CONTENT_ITEM_TYPE.TEXT, value: s });
						s = '';
					}
					contentItems.push({ type: PSEUDO_CONTENT_ITEM_TYPE.IMAGE, value: token.value || '' });
					break;
			}
		}

		if (s) {
			contentItems.push({ type: PSEUDO_CONTENT_ITEM_TYPE.TEXT, value: s });
		}

		return contentItems;
	};

	var parseContent = exports.parseContent = function parseContent(content, cache) {
		if (cache && cache[content]) {
			return cache[content];
		}

		var tokens = [];
		var len = content.length;

		var isString = false;
		var isEscaped = false;
		var isFunction = false;
		var str = '';
		var functionName = '';
		var args = [];

		for (var i = 0; i < len; i++) {
			var c = content.charAt(i);

			switch (c) {
				case "'":
				case '"':
					if (isEscaped) {
						str += c;
					} else {
						isString = !isString;
						if (!isFunction && !isString) {
							tokens.push({ type: TOKEN_TYPE.STRING, value: str });
							str = '';
						}
					}
					break;

				case '\\':
					if (isEscaped) {
						str += c;
						isEscaped = false;
					} else {
						isEscaped = true;
					}
					break;

				case '(':
					if (isString) {
						str += c;
					} else {
						isFunction = true;
						functionName = str;
						str = '';
						args = [];
					}
					break;

				case ')':
					if (isString) {
						str += c;
					} else if (isFunction) {
						if (str) {
							args.push(str);
						}

						switch (functionName) {
							case 'attr':
								if (args.length > 0) {
									tokens.push({ type: TOKEN_TYPE.ATTRIBUTE, value: args[0] });
								}
								break;

							case 'counter':
								if (args.length > 0) {
									var counter = {
										type: TOKEN_TYPE.COUNTER,
										name: args[0]
									};
									if (args.length > 1) {
										counter.format = args[1];
									}
									tokens.push(counter);
								}
								break;

							case 'counters':
								if (args.length > 0) {
									var _counters2 = {
										type: TOKEN_TYPE.COUNTERS,
										name: args[0]
									};
									if (args.length > 1) {
										_counters2.glue = args[1];
									}
									if (args.length > 2) {
										_counters2.format = args[2];
									}
									tokens.push(_counters2);
								}
								break;

							case 'url':
								if (args.length > 0) {
									tokens.push({ type: TOKEN_TYPE.URL, value: args[0] });
								}
								break;
						}

						isFunction = false;
						str = '';
					}
					break;

				case ',':
					if (isString) {
						str += c;
					} else if (isFunction) {
						args.push(str);
						str = '';
					}
					break;

				case ' ':
				case '\t':
					if (isString) {
						str += c;
					} else if (str) {
						addOtherToken(tokens, str);
						str = '';
					}
					break;

				default:
					str += c;
			}

			if (c !== '\\') {
				isEscaped = false;
			}
		}

		if (str) {
			addOtherToken(tokens, str);
		}

		if (cache) {
			cache[content] = tokens;
		}

		return tokens;
	};

	var addOtherToken = function addOtherToken(tokens, identifier) {
		switch (identifier) {
			case 'open-quote':
				tokens.push({ type: TOKEN_TYPE.OPENQUOTE });
				break;
			case 'close-quote':
				tokens.push({ type: TOKEN_TYPE.CLOSEQUOTE });
				break;
		}
	};

	var getQuote = function getQuote(style, isOpening, quoteDepth) {
		var quotes = style.quotes ? style.quotes.split(/\s+/) : ["'\"'", "'\"'"];
		var idx = quoteDepth * 2;
		if (idx >= quotes.length) {
			idx = quotes.length - 2;
		}
		if (!isOpening) {
			++idx;
		}
		return quotes[idx].replace(/^["']|["']$/g, '');
	};

	var formatCounterValue = function formatCounterValue(counter, glue, format) {
		var len = counter.length;
		var result = '';

		for (var i = 0; i < len; i++) {
			if (i > 0) {
				result += glue || '';
			}
			result += (0, _ListItem.createCounterText)(counter[i], (0, _listStyle.parseListStyleType)(format || 'decimal'), false);
		}

		return result;
	};

	/***/ })
	/******/ ]);
	});

}
