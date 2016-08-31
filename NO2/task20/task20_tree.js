(function () {
	var preorder=document.getElementById('preorder');
	var inorder=document.getElementById('inorder');
	var subsequent=document.getElementById('subsequent');
	var rootDom=document.getElementsByClassName('child_2');
	console.log(getElement(rootDom));
	// 前序遍历
	preorder.addEventListener('click', function () {
		console.log(1);
		preorderTraverse(rootDom);
	});
	// 中序遍历
	inorder.addEventListener('click', function () {
		console.log(1);
	});
	// 后序遍历
	subsequent.addEventListener('click', function () {
		console.log(1);
	});

	function preorderTraverse(dom) {
		var nodes=getElement(dom);
		if(nodes.length == 0){

		}
	}
	

	function getElement(dom) {
		var ret=[];
		dom=dom[0].childNodes;
		for (var i = 0; i < dom.length; i++) {
			if(dom[i].nodeType == 1){
				ret.push(dom[i]);
			}
		}
		return ret;
	}

})();