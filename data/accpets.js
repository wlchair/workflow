jQuery.accpetData = function  (owner) {
	//元素
	//document文档
	//object类型
	return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
}