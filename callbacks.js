//问题：callbacks内部为什么没用构造函数，把对象实例化存储？
//沒有看关于stack的内容部分，属于fireWith内
//fireing,stack部分没有认真阅读，先让deferred基本过程通畅后，再来研究
jQuery.Callbacks = function(options) {
	options = typeof options === "string" ?
		(optionsCache[options] || createOptions(options)) :
		jQuery.extend({}, options);
	var self,
		list = [],
		firing,
		fired,
		stack = !options.once && [],
		firingStart,
		firingIndex,
		firingLength,
		memory,
		fire = function(data) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for (; list && firingIndex < firingLength; firingIndex++) {
				list[firingIndex](data);
			}
			firing = false;
			if (list) {
				if (stack) {
					if (stack.length) {
						fire(stack.shift());
					}
				} else if (memory) {
					list = [];
				} else {
					self.disable();
				}
			}
		};
	self = {
		add: function(args) {
			var start = list.length;
			list.push(args);

			if (memory) {
				firingStart = start;
				fire(memory);
			}
		},
		fire: function(args) {
			// if (list) {
			// 	jQuery.each(list, function(i, item) {
			// 		item(args);
			// 	});
			// 	if (options === 'once') {
			// 		list = undefined;
			// 	}
			// 	if (options === 'memory') {
			// 		fire(args);
			// 	}
			// }
			self.fireWith(this, arguments);
			return this;
		},
		fireWith: function(context, args) {
			if (list && (!fired || stack)) {
				args = args || [];
				args = [context, args.slice ? args.slice() : args];
				if (firing) {
					stack.push(args);
				} else {
					fire(args);
				}
			}
			return this;
		},
		disable: function() {
			list = stack = memory = undefined;
			return this;

		},
		lock: function() {
			stack = undefined;
			if (!memory) {
				self.disable();
			}
			return this;
		}
	}
	return self;
}
var optionsCache = {};

function createOptions(options) {
	var objects = optionsCache[options] = {};
	jQuery.each(options.match(/\S+/g) || [], function(i, item) {
		objects[item] = true;
	})
	return objects;
}