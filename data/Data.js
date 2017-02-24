//data_priv没有看到用的地方
//看到_data未来要废弃，还得看后续这块要怎么用
function Data() {
	this.cache = {};
	Object.defineProperty(this.cache, 0, {
		get: function() {
			return {};
		}
	});
	this.expando = jQuery.expando + Math.random();
}
Data.uid = 1;
Data.accpets = jQuery.accpetData;
Data.prototype = {
	key: function(owner) {
		if (!Data.accpets(owner)) {
			return 0;
		}
		var descriptor = {},
			unlock = owner[this.expando];
		if (!unlock) {
			unlock = Data.uid++;

			descriptor[this.expando] = {
				value: unlock
			};
			Object.defineProperties(owner, descriptor);
		}
		if (!this.cache[unlock]) {
			this.cache[unlock] = {};
		}
		return unlock;
	},
	get: function(owner, key) {
		var cache;
		cache = this.cache[this.key(owner)];
		return key === undefined ? cache : cache[key];
	},
	set: function(owner, data, value) {
		var prop,
			unlock = this.key(owner),
			cache = this.cache[unlock];
		if (typeof data === "string") {
			cache[data] = value;
		}
		return cache;
	},
	access: function(owner, key, value) {
		//判断是否已经存在缓存中了
		var stored;
		//如果没有key 或者 有key没有值，说需要需要取值
		if (key === undefined ||
			(key && typeof key === "string" && value === undefined)) {
			stored = this.get(owner, key);
			return stored !== undefined ?
				stored :
				this.get(owner, jQuery.camelCase(key));
		}
		this.set(owner, key, value);
		return value !== undefined ? value : key;
	}
}