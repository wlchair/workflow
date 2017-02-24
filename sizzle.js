//学习下querySelectorAll能接受什么样的selector，对比sizzle的优势
//正则表达式的学习和练习
//数组的操作方法，需要分类记忆
var selector = ''
var filter = {
	ATTR: function(name, operator, value) {
		return function(el) {
			var attr = el.getAttribute(name);
			if (operator === "=") {
				if (attr === value) {
					return true;
				}
			}
			return false;
		}
	},
	TAG: function(nodeNameSelector) {
		return function(el) {
			return el.nodeName &&
				el.nodeName.toLowerCase() === nodeNameSelector
		}
	}
}
var elementMatcher = function(matchers) {
	return matchers.length > 1 ?
		function(element, context, xml) {
			var i = matchers.length;
			while (i--) {
				if (!matchers[i](element, context, xml)) {
					return false;
				}
			}
			return true;
		} :
		matchers[0]
}
var addCombinator = function(matcher) {
	return function(el, context, xml) {
		while (el = el['parentNode']) {
			if (el.nodeType === 1) {
				return matcher(el);
			}
		}
	}
}
var matcherFromTokens = function(tokens) {
	var len = tokens.length,
		i = 0;
	var matcher,
		matchers = [];
	for (; i < len; i++) {
		if (tokens[i].type === " ") {
			matchers = [addCombinator(elementMatcher(matchers))];
		} else {
			matcher = filter[tokens[i].type].apply(null, tokens[i].matcher);
			matchers.push(matcher);
		}
	}
	return elementMatcher(matchers);
}
var matcherFromGroupMatchers = function(elementMatchers) {
	var superMatcher = function(seed) {
		var result = [],
			i = 0;
		len = seed.length;
		var matcher = elementMatchers[0];
		for (; i < len; i++) {
			var el = seed[i];
			if (matcher(el)) {
				result.push(el);
				break;
			}
		}
		return result;
	}
	return superMatcher;
}
var complie = function() {
	var seed = document.querySelectorAll('input');
	var selector = 'wulei [name=x]';
	var match = [{
		matches: ["div"],
		type: "TAG",
		value: "wulei"
	}, {
		type: " ",
		value: " "
	}, {
		matches: ["name", "=", "x"],
		type: "ATTR",
		value: "[name=x]"
	}];
	var elementMatchers = [];
	var cache;
	elementMatchers.push(matcherFromTokens(match));
	cache = matcherFromGroupMatchers(elementMatchers);
	result = cache(seed);
	console.log(result)
}