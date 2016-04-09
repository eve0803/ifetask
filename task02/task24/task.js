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


    function getNext( obj ){
        if( !obj || !obj.nextSibling ) return null;
        return obj.nextSibling.nodeType === 1 ? obj.nextSibling : getNext( obj.nextSibling );
    }

   //搜索节点
    function searchFile(){
        alert(1);
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

                var oUl = getNext( this );
                var siblingsUl = this.parentNode.parentNode.getElementsByTagName('ul');
                if(  siblingsUl[this].style.display == 'block' ){
                    siblingsUl[this].style.display = 'none';
                }else{
                    for(var i=0; i<siblingsUl.length; i++){
                        siblingsUl[i].style.display = 'none';
                    }
                    siblingsUl[this].style.display = 'block';
                }
            }
        }

    }



    addEvent(search,'click', searchFile);
    addEvent(rename,'click', reName);
    addEvent(delfile,'click', delFile);
    addEvent(mkdir,'click', addFile);
    function init(){
        flod();
    }
    init();

})();

