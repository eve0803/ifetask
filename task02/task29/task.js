/**
 * Created by guolimin on 2016-04-08.
 */
(function(){
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
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
    function getLength(str){
            // \x00-xff代表单字节字符。
            return str.replace(/[^\x00-\xff]/g, "xx").length;// 匹配双字节字符（一般就像汉字
   }

   //获取元素
    var oName = $('myName');
    var validator =$('validator');
    var box =$('box');
    var name_msg = $('msg');
    var name_length = 0;
   /* //正则
    var trimReg=/(^\s*)|(\s*$)/g;//去除首位空格
    var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
    var lenReg=/^.{4,16}$/  ;//4-16位*/

     oName.onfocus = function(){
        name_msg.style.display = "block";
        name_msg.innerHTML = "必填，长度为4~16个字符";
    }

    oName.onkeyup = function(){
        name_length = getLength(this.value);
       // name_msg.innerHTML ="输入了"+ name_length + "个字符";
      //  console.log(name_length);
        if(name_length==0){
            box.className = "";
        }
    }
    function validate(){
        name_msg.style.display = "block";
        //含有非法字符
        var reg = /[^\w\u4e00-\u9fa5]/g;    // \w代表“数字、字母（不分大小写）、下划线”，\u4e00-\u9fa5代表汉字。
        //var testStr = nameText.replace(trimReg,'').replace(chineseReg, '--');
        // 获取value
        var nameText = oName.value;
        if(reg.test(oName.value)){
            box.className = "error";
            name_msg.innerHTML = '名称含有非法字符！';
        }
        //不能为空
        else if (oName.value==""){
            box.className = "error";
            name_msg.innerHTML = "名称不能为空！";
        }

        //长度少于4个字符,长度超过16个字符
        else if (name_length >16){
            box.className = "error";
            name_msg.innerHTML = "长度为超过了16个字符！";
        }
        else if(name_length < 4){
            box.className = "error";
            name_msg.innerHTML = "长度小于4个字符！";
        }
        //OK
        else {
            box.className = "right";
            name_msg.innerHTML = "ok，名称格式正确！";
        }
    }
    addEvent(validator,'click', validate);
})();