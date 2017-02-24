!(function(window, undefined) {
	var jQuery,
		class2type = {},
		version = 'learn',
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(all, letter) {
			return letter.toUpperCase();
		};
	jQuery = function(selector) {
		return new jQuery.fn.init(selector);
	};
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		length: 0,
		init: function(selector) {
			var results = [],
				len, i = 0;
			if (!selector) {
				return this;
			}
			this.selector = selector;
			results = document.querySelectorAll(selector);
			len = results.length;
			if (len) {
				for (; i < len; i++) {
					this[i] = results[i];
				}
				this.length = len;
			}
			return this;
		},
		each: function(callback) {
			jQuery.each(this, callback);
		},
		end: function() {
			return this.prevObject;
		},
		pushStack: function(elems) {
			var ret = jQuery.merge(this.constructor(), elems);
			ret.prevObject = this;
			return ret;
		}
	};
	jQuery.fn.init.prototype = jQuery.fn;
	//对象扩展
	//先做数据赋值，再进行条件判断
	jQuery.extend = jQuery.fn.extend = function() {
		var target, src, copy, i = 1,
			options, len;
		target = arguments[0] || {};
		len = arguments.length;
		if (len === i) {
			target = this;
			i--;
		}
		for (; i < len; i++) {
			options = arguments[i];
			for (name in options) {
				src = target[name];
				copy = options[name];
				if (src === copy) {
					continue;
				}
				target[name] = options[name];
			}
		}
	};
	jQuery.extend({
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
		guid:1,
		isFunction: function(obj) {
			return jQuery.type(obj) === "function";
		},
		camelCase: function(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},
		find: function(selector, context) {
			var context = context || document,
				result = [],
				elems;
			elems = context.querySelectorAll(selector);
			jQuery.merge(result, elems);
			return result;
		},
		merge: function(first, second) {
			var len = second.length,
				i = first.length,
				j = 0;
			for (; j < len; j++) {
				first[i++] = second[j];
			}
			first.length = i;
			return first;
		},
		each: function(list, callback) {
			var len = list.length,
				i = 0,
				value,
				isArray = isLikeArray(list);
			if (isArray) {
				for (; i < len; i++) {
					value = callback.call(list[i], i, list[i]);
					if (value === false) {
						break;
					}
				}
			} else {
				for (i in list) {
					value = callback.call(list[i], i, list[i]);
					if (value === false) {
						break;
					}
				}
			}
		},
		type: function(obj) {
			if (obj == null) {
				return obj + "";
			}
			return typeof obj === "object" ||
				typeof obj === "function" ?
				class2type[toString.call(obj)] || "object" :
				typeof obj;
		},
		isWindow: function(obj) {
			//对象不是null 且 有window属性
			return obj != null && obj === obj.window;
		}
	});
	jQuery.fn.extend({
		find: function(selector) {
			var ret = [];
			ret = jQuery.find(selector, this[0]);
			ret = this.pushStack(ret);
			ret.selector = this.selector + " " + selector;
			return ret;
		}
	});

	function isLikeArray(obj) {
		var length = obj.length,
			type = jQuery.type(obj);
		//如果是函數类型 或 window对象 就不是类数组
		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}
		//如果是元素类型 且 长度不是0 
		if (obj.nodeType === 1 && length) {
			return true;
		}
		//类型时数组
		//长度等于0
		//长度是数字类型 且 长度不是0 且 对象里含有下标属性
		return type === "array" ||
			length === 0 ||
			typeof length === "number" &&
			length > 0 &&
			(length - 1) in obj;
	}
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, item) {
		class2type["[object " + item + "]"] = item.toLowerCase();
	})
	window.jQuery = jQuery;
})(window, undefined);