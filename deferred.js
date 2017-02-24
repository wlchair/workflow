//then模块先跳过，回头再琢磨下再来继续
jQuery.extend({
	Deferred: function(func) {
		var tuples = [
				["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
				["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
				["notify", "progress", jQuery.Callbacks("memory")]
			],
			state = "pending",
			promise,
			deferred = {};
		promise = {
			state: function() {
				return state;
			},
			then: function() {

			},
			always: function() {
				deferred.done(arguments).fail(arguments);
				return this;
			},
			promise: function(obj) {
				return obj !== null ? jQuery.extend(obj, promise) : promise;
			}
		};
		promise.pipe = promise.then;
		jQuery.each(tuples, function(i, tuple) {
			var list = tuple[2],
				stateString = tuple[3];
			promise[tuple[1]] = list.add;
			//保证done,fail触发，其他对应的后续函数不会触发，
			if (stateString) {
				list.add(function() {
					state = stateString;
				});
				list.add(tuples[i ^ 1][2].disable);
				list.add(tuples[2][2].lock);
			}
			deferred[tuple[0]] = function() {
				//触发fire时候，传入当前this的环境
				deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
				return this;
			};
			deferred[tuple[0] + "With"] = list.fireWith;
		});
		//让deferred可以拥有promise的方法
		promise.promise(deferred);

		if (func) {
			func.call(deferred, deferred);
		}
		return deferred;
	},
	when: function() {

	}
});