//暂时不知道它是怎么个处理流程
//为什么要这么处理
var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
	var len = elems.length,
		bulk = key === null;
	if (value !== undefined) {
		chainable = true;
		if (jQuery.isFunction(value)) {
			raw = true;
		}
		if (bulk) {
			if (raw) {
				fn.call(elems, value);
				fn = null;
			}
		}
	}
	return chainable ?
		elems : bulk ?
		fn.call(elems) : len ?
		fn(elem[0], key) : emptyGet;
}