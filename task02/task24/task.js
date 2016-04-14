/**
 * Created by guolimin on 2016-04-08.
 *
 */


(function(){
    var oFiles = $('files');
    var btnWrap = $('btnWrap');
    var search=getByClass(btnWrap,'search')[0];
    var rename=getByClass(btnWrap,'rename')[0];
    var delfile=getByClass(btnWrap,'delfile')[0];
    var mkdir=getByClass(btnWrap,'mkdir')[0];


//获取id
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }
//获取class
    function getByClass(oParent, sClass)
    {
        var aEle=oParent.getElementsByTagName('*');
        var aResult=[];
        var re=new RegExp('\\b'+sClass+'\\b', 'i');
        var i=0;

        for(i=0;i<aEle.length;i++)
        {
            if(re.test(aEle[i].className))
                if(re.test(aEle[i].className))
                {
                    aResult.push(aEle[i]);
                }
        }

        return aResult;
    }

// 跨浏览器兼容的工具函数
    function addEvent(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = handler;
        }
    }
//去除两边空格
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

//下一个兄弟节点
    function getNext( obj ){
        if( !obj || !obj.nextSibling ) return null;
        return obj.nextSibling.nodeType === 1 ? obj.nextSibling : getNext( obj.nextSibling );
        }


   //搜索节点
    function searchFile(){
        var searchText=document.getElementById('searchText');

    }
    //重命名节点
    function reName(){
        alert(2);
    }
    //删除节点
    function delFile(){
        alert(31);
    }
    //新增节点
    function addFile(){
        alert(4);
    }

   //展示收缩
    function flod(){
        var tree =$('tree');
        var aUl = tree.getElementsByTagName('ul');
        var aA =  tree.getElementsByTagName('a');
        for(var i=0,len=aA.length;i<len;i++){
            aA[i].onclick=function(){
                var oUl=getNext(this); //a的下一个兄弟节点，即要展开的下一级
                var siblingsUl = this.parentNode.parentNode.getElementsByTagName('ul');
                if( oUl ){
                    if( oUl.style.display == 'none' ){
                        for(var i=0; i<siblingsUl.length; i++){
                            siblingsUl[i].className = '';
                        }
                        this.className='active';
                        oUl.style.display = 'block';
                    }else{
                        this.className='';
                        oUl.style.display = 'none';
                    }
                };
                var oSpan = this.getElementsByTagName('span')[0];
                // 查找第一个button
                var liUl = this.parentNode.getElementsByTagName('ul')[0];
                // 有没有展开菜单
                var hasul = liUl ? true : false;
                var aSpan = this.parentNode.parentNode.getElementsByTagName('span');
                if(oSpan.innerHTML=='-'&&hasul){
                   oSpan.innerHTML = '+';
                }
                else{
                    oSpan.innerHTML = '-';
                }



            }
        }

    }



    addEvent(search,'click', searchFile);
    addEvent(rename,'click', reName);
    addEvent(delfile,'click', delFile);
    addEvent(mkdir,'click', addFile);
    function init(){
       // creat();
        flod();
    }
    init();

})();
//绘制节点
function creat(point,initName,id){

    //创建元素
    var ul=document.createElement("ul");
    var li=document.createElement("li");
    var div=document.createElement("div");
    var div1=document.createElement("span");
    var div2=document.createElement("div");
    var add=document.createElement("i");
    var del=document.createElement("i");
    var ren=document.createElement("i");
    var show=document.createElement("i");
    //添加样式
    div.setAttribute('class','title');
    div2.setAttribute('class','btnGroup');
    show.setAttribute('class','iconfont');
    add.innerHTML='&#xe600添加';
    if(id){
        add.setAttribute('id',id);
    }
    add.setAttribute('onclick','onAddItem(this)');
    add.setAttribute('class','iconfont');
    del.innerHTML='&#xe608删除';
    del.setAttribute('onclick','onDelItem(this)');
    del.setAttribute('class','iconfont');
    ren.innerHTML='&#xe604重命名';
    ren.setAttribute('onclick','onRename(this)');
    ren.setAttribute('class','iconfont');
    //添加分支
    div2.appendChild(add);
    div2.appendChild(del);
    div2.appendChild(ren);
    div1.innerHTML=name||initName||'未命名';
    div1.setAttribute('onclick','onIsShow(this,1)');
    div.appendChild(show);
    div.appendChild(div1);
    div.appendChild(div2);
    li.appendChild(div);
    li.appendChild(ul);
    node.appendChild(li);

}


