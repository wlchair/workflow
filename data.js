jQuery.extend({
	data: function(elem, name, data) {
		return data_user.access(elem, name, data);
	}
});
jQuery.fn.extend({
	data: function(key, value) {
		var elem = this[0];
		return access(this, function(value) {
			var data,
				camelKey = jQuery.camelCase(key);
			//说明要读取单一属性的值
			if (elem && value === undefined) {
				data = data_user.get(elem, key);
				if (data !== undefined) {
					return data;
				}
				data = data_user.get(elem, camelKey);
				if (data !== undefined) {
					return data;
				}
				data = dataAttr(elem, key, undefined);
				if (data !== undefined) {
					return data;
				}
				return;
			}
			//这里需要赋值
			this.each(function() {
				var data = data_user.get(this, camelKey);
				data_user.set(this, camelKey, value);
			})
		}, null, value, arguments.length > 1, null, true);

	}
});

function dataAttr(elem, key, data) {
	if (data === undefined && elem.nodeType === 1) {
		//转换自定义属性data的名称
		name = "data-" + key.replace(key, "-$1").toLowerCase();
		data = elem.getAttribute(name);
		if (typeof data === "string") {
			data = data === "true" ?
				true : data === "false" ?
				false : data === "null" ?
				null : +data + "";
		} else {
			data = undefined;
		}
		data_user.set(elem, key, data);
	}
	return data;
}