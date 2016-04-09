/**
 * Created by guolimin on 2016-04-06.
 *
 * 二叉树的先序、中序和后序遍历其实都是二叉树的深度优先遍历的特例，访问节点的顺序一样，只不过进栈顺序不同
 */
(function(){
    var timer = null;
    var btnWarp=$('btnWrap');
    var oBtns = btnWarp.getElementsByTagName("button");
    var lock = false;
    var head = null;
    var showQueue=[];//showQueue是要显示的节点的队列
    //添加事件
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }

    //前序遍历
    function preOrder(node){
        if(!(node == null)){
            showQueue.push(node);
            arguments.callee(node.firstElementChild);
            arguments.callee(node.lastElementChild);
        }
    };
    //中序遍历
    function inOrder(node,list){
        if(!(node == null)){
            arguments.callee(node.firstElementChild);
            showQueue.push(node);
            arguments.callee(node.lastElementChild);
        }
    };
    //后序遍历
    function postOrder(node){
        if(!(node == null)){
            arguments.callee(node.firstElementChild);
            arguments.callee(node.lastElementChild);
            showQueue.push(node);
        }
    };

    //显示
    function show(){
        head = showQueue.shift(); //出队
        // console.log(head);
        lock = true;
        if (head) {
            head.style.backgroundColor = "#6fa3ff";//显示蓝色
            timer = setTimeout(function () {
                head.style.backgroundColor = "#fff";//1秒后节点的蓝色变为白色
                show(); //递归调用show，使要显示的节点不停出队显示，直至为空
                if(showQueue.length<=0){
                    lock = false;

                };
            }, 500);
        }


    }

    //选择入口
    function order(orderIndex){
        var rootNode=$('one')
        switch(orderIndex){
            case 0:preOrder(rootNode);
                break;
            case 1:inOrder(rootNode);
                break;
            case 2:postOrder(rootNode);
                break;
        }
        show();
    }

    function init(){
        for(var i=0;i<oBtns.length;i++){
            (function(i){
                oBtns[i].onclick = function(){
                    // console.log(lock);
                    if(lock === true){
                        alert("正在遍历中!");
                    }
                    else{
                        order(i);
                    }
                };
            }(i));
        }
    }
    init();

})();