//http://blog.csdn.net/xxb2008/article/details/9109329
//http://www.2cto.com/kf/201409/333401.html
//盒子模型和属性都有哪些，怎么计算需要好好学习
//
//

//1. 先构建基本模型$('elem').on('type','selector',handler);
//利用分离机制保证函数能正常运行
//2. 传递参数，参数的传递需要进行包装，让传递的参数更方便传递
// $('elem').on('type','selector',data,handler);
// 基本结构完成之后，需要考虑的问题
// 有了机构就要触发，一种直接触发，一种模拟触发
// 3. 直接可以让系统自动处理，模拟需要跟系统保持一样
// 考虑点：兼容性，冒泡触发，jQuery本身的事件，native的事件
// 4. 增加和触发都已经完成，后续的就是删除这个事件
// 如何删除绑定在native和jQuery缓存里的对象和事件函数
// 5. 功能扩展
// 绑定多个函数，在elem
// 绑定多个type
// 让type里带命名空间

jQuery.fn.extend({
	on: function(types, selector, data, fn, one) {
		fn = selector;
		selector = data = "";
		jQuery.event.add(this, types, fn, data, selector);
	}
});
jQuery.event = {
	add: function(elem, types, handler, data, selector) {
		var elemData = data_priv.get(elem),
			events, eventHandle, handlers;
		handler.guid = jQuery.guid++;
		events = elemData.events = {};
		handlers = events[types] = [];
		elem = elem[0]; //从jquery换成dom对象
		eventHandle = elemData.handle = function(e) {
			return jQuery.event.dispatch.apply(elem, arguments);
		}
		elem.addEventListener(types, eventHandle, false);
		handlers.splice(1, 0, handler);
		data_priv.set(elem, types, handlers);
	},
	dispatch: function(event) {
		
		event = jQuery.event.fix(event);

		var handleQueue = [],
		//复制传进来的参数，为了后续event对象传递方便
		args = slice.call(arguments),
		//取出封装的handler函数
		handlers = (data_priv.get(this, "events") || {})[event.type] || [];
		
		handleQueue = jQuery.event.handlers.call(this, event, handlers);
		handlers[0].apply(this, event);
	},
	handlers: function(event, handlers) {
		var handleObj;
		handleObj = handlers;
		return handleObj;
	},
	//由于兼容性的问题，不同浏览器下面的属性数量和结果都是不一样
	//所以，我们需要把我们需要的属性信息封装到jQuery对象里面
	//保证我们的属性可以正确使用
	mouseHook: function() {
		//封装的属性列表
		//* buttons在官网的解释跟实际实验情况不一致，在按右键时候
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function(event, original) {
			var eventDoc,
				doc, body,
				//点击的按钮是什么
				button = original.button;
			//通过clientx/y计算pagex/y
			if (event.pageX == null && original.clientX != null) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;
				event.pageX = original.clientX + doc.scrollLeft - doc.clientLeft;
				event.pageY = original.clientY + doc.scrollTop - doc.clientTop;
			}
			//如果没有which标记，设置which标记
			//一般情况下left：1 right：2，middle：4,，jQuery对其进行封装修改
			if (!event.which && button !== undefined) {
				event.which = (button & 1 ? 1 : (button & 2: 3 ? (button & 2 ? 4 : 0)));
			}
			return event;

		}
	},
	fix: function(event) {
		this.fixHooks[type] = fixHooks =
			rmouseEvent.test(type) ?
			this.mouseHook : rkeyEvent.test(type) ?
			this.keyHooks : {};
	}
}