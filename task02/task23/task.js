/**
 * Created by guolimin on 2016-04-06.
 *
 */
(function(){
    var timer = null;
    var btnWarp=$('btnWrap');
    var oBtns = btnWarp.getElementsByTagName("button");
    var rootNode = $("one");
   //动画进行时标志
    var  lock = false;;
    var BFindex = 0;//广度优先遍历自增标识符
    var showQueue = [];    //存放树的数据，便于遍历
    //添加事件
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }

//去除两边空格
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

// 深度优先遍历
    function traverseDF(node) {
       //模拟栈，用于深度优先
        var stack = [];
        stack.push(node);
        while (stack.length > 0) {
            var temp = stack.pop();
            //按深度优先遍历顺序存放进全局数组内，用于动画展示
            showQueue.push(temp);
            for (var i = temp.children.length - 1; i >= 0; i--) {
                if (temp.children[i]) stack.push(temp.children[i]);
            }
        }

    }
//广度优先遍历
    function traverseBF(node) {
        //模拟队列，用于广度优先
        var stack = [];
        stack.push(node);
        while (stack.length > 0) {
            var temp = stack.shift();
           //按广度优先遍历顺序存放进全局数组内，用于动画展示
            showQueue.push(temp);
            for (var i = 0; i < temp.children.length; i++) {
                if (temp.children[i]) stack.push(temp.children[i]);
            }
        }
    }

/*    function traverseDF(node,nodeList){
        if(node){
            nodeList.push(node);
            for(var i=0;i<node.children.length;i++){
                traverseDF(node.children[i],nodeList);
            }
        }
    }
    function traverseBF(node, nodeList) {;
        if (node) {
            nodeList.push(node);
            traverseBF(node.nextElementSibling, nodeList);
            node = nodeList[BFindex++];
            traverseBF(node.firstElementChild, nodeList);
        }
    }*/

//获取数据
    function getData() {
        var aqiData = $('searchText');
        return trim(aqiData.value);
    }


//渲染动画，有文本传入则可执行搜索
    function show(showQueue,foundText){
        var i  = 0;
        var len = showQueue.length;
      if (trim(showQueue[i].firstChild.nodeValue) == foundText) {
            showQueue[i].className = "found";
            lock = false;
            clearInterval(timer);
        } else {
            showQueue[i++].className = "active";
        }
        lock = true;
        timer = setInterval(function(){
            if(i<len){
                showQueue[i-1].className = "";
                //若查找到了，则将色块变色，退出动画
                if(trim(showQueue[i].firstChild.nodeValue) == foundText){
                    showQueue[i].className = "found";
                    alert('已找到');
                    lock = false;
                    clearInterval(timer);
                }
                else{
                    showQueue[i++].className = "active";
                }
            }
            else{
                //动画结束，重置全局数组，动画进行标志
                showQueue[i-1].className = "";
                lock = false;
                clearInterval(timer);
            }

        },500);
    }


    function traverse(traverseIndex){
        var foundList = [];

        switch(traverseIndex){
            case 0:traverseDF(rootNode);
                break;
            case 1:traverseBF(rootNode);
                break;
            case 2:var foundText =$('searchText').value;
                if(!foundText){
                    alert("请输入查询内容");
                    return ;
                }
                traverseDF(rootNode);
                break;
            case 3:
                var foundText = $('searchText').value;
                if(!foundText){
                    alert("请输入查询内容");
                    return ;
                }
                traverseBF(rootNode);
                break;
        }

        setTimeout(show(showQueue,foundText),500);
    }

//绑定按钮事件
    function init(){
        for(var i=0;i<oBtns.length;i++){
            (function(i){
                oBtns[i].onclick = function(){
                    resetBG();
                    if(lock === true){
                        alert("正在遍历中!");
                    }
                    else{
                        traverse(i);
                    }
                };
            }(i));
        }
    }

// 重置所谓节点样式
    function resetBG(){
        var showQueue = [];
        for(var i=0;i<showQueue.length;i++){
            showQueue[i].className = "";
        }
    }

    init();


})();