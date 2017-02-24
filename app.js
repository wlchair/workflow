// jQuery.extend({
// 	ex: function() {
// 		console.log('this is jQuery object extend function');
// 	}
// });
// jQuery.fn.extend({
// 	ex: function() {
// 		console.log('this is jQuery example extend function');
// 	}
// });
// jQuery.fn.extend({
// 	chain: function() {
// 		console.log('chain effect for follow-up function');
// 		return this;
// 	}
// });
// jQuery.ex();
// jQuery('selector').ex();
// jQuery('selector').chain().ex();

// var x = jQuery('#flevel').find('#slevel');
// var y = x.end();
// y[0].innerHTML = 'ZHANGSAN';

// jQuery.each(['1', '2'], function(item, index, list) {
// 	console.log('one:' + item + index);
// 	console.log('list:' + list);
// });
// jQuery('div').each(function(item, index) {
// 	console.log('two:' + item + index);
// });
function consoleData(msg) {
	console.log(msg);
}
// var cbs = jQuery.Callbacks('memory');
// cbs.add(function(){
// 	consoleData('first add');
// });
// cbs.fire();
// cbs.add(function(){
// 	consoleData('second add');
// })
// cbs.fire();

// var test = jQuery('#testing');
// var testt = jQuery('#testing');
// jQuerydata内存存储形式
// 实例化的对象 jQuery1243 : cache(object);
// cache = {
// 	1:{"name":"zhangsan","age":18},
// 	2:{"name":"lisi"}
// }
// jQuery.data(test,'name','w');
// jQuery.data(testt,'name','m');
// jQuery.data(test,'name');

// test.data('name','w');
// testt.data('name','y');
// consoleData(test.data('name'));


// var d = jQuery.Deferred();
// d.done(function() {
// 	console.log('done1');
// });
// d.done(function() {
// 	console.log('done');
// });
// d.resolve();


// complie();

jQuery("#text").on("click",function(){
	console.log(this);
});