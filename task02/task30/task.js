/**
 * Created by guolimin on 2016-04-08.
 */
window.onload=function(){
    var name=new Validate('NameBox');
}

function getLength(str){
    // \x00-xff代表单字节字符。
    return str.replace(/[^\x00-\xff]/g, "xx").length;
}
function Validate(id){
    var _this=this;
    this.obj=document.getElementById(id);
    //this.oLogin.className = 'login';
    this.inputText=this.obj.getElementsByTagName('input')[0];
    this.msg=this.obj.getElementsByTagName('p')[0];
    this.inputText.onfocus=function ()
    {
        _this.fnfocus();
    };
    this.inputText.onkeyup=function ()
    {
        _this.fnkeyup();
    };
    this.inputText.onblur=function ()
    {
        _this.fnblur();
    };

}

Validate.prototype.fnfocus = function(){
    this.msg.style.display = "block";
    this.msg.innerHTML = "必填，长度为4~16个字符";
};
Validate.prototype.fnkeyup = function(){
    var _this=this;
    this.inputLength = getLength(this.inputText.value);


};
Validate.prototype.fnblur = function(){

    this.msg.style.display = "block";
    //含有非法字符
    var reg = /[^\w\u4e00-\u9fa5]/g;    // \w代表“数字、字母（不分大小写）、下划线”，\u4e00-\u9fa5代表汉字。
    //var testStr = nameText.replace(trimReg,'').replace(chineseReg, '--');
    // 获取value
    var nameText = this.inputText.value;
    if(reg.test(this.inputText.value)){
        addClass(this.obj,"error");
        this.msg.innerHTML = '名称含有非法字符！';
    }
    //不能为空
    else if (this.inputText.value==""){
        addClass(this.obj,"error");
        this.msg.innerHTML = "名称不能为空！";
    }

    //长度少于4个字符,长度超过16个字符
    else if (this.inputLength >16){
        addClass(this.obj,"error");
        this.msg.innerHTML = "长度为超过了16个字符！";
    }
    else if(this.inputLength < 4){
        addClass(this.obj,"error");
        this.msg.innerHTML = "长度小于4个字符！";
    }
    //OK
    else {
        addClass(this.obj,"right");
        this.msg.innerHTML = "ok，名称格式正确！";
    }
};

function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
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
    };
}