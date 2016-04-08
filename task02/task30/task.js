/**
 * Created by guolimin on 2016-04-08.
 */
(function(){

    // dom元素
    var myName = $('myName');
    var validator =$('validator');
    var box =$('box');
    var msgEle = $('msg');

    //正则
    var trimReg=/(^\s*)|(\s*$)/g;//去除首位空格
    var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
    var lenReg=/^.{4,16}$/  ;//4-16位

    // 定义提示信息
    var msgs={
        error_length: {
            "msg":"长度为4~16个字符",
            "className":"error"
        },
        error_required: {
            "msg":"姓名不能为空",
            "className":"error"
        },
        right: {
            "msg":"名称格式正确",
            "className":"right"
        }
    }
    /**
     * 表单验证
     */
    function warnMsg(ele,paramObj) {
        // 修改类名
        ele.className = paramObj.className;
        // 修改提示信息
        msgEle.innerHTML = paramObj.msg;
    }
     function validate(){
         // 获取value
        var nameText = myName.value;
         // 首尾去空字符, 替换中文为英文字符好计算长度
        var testStr = nameText.replace(trimReg,'').replace(chineseReg, '--');
         var paramObj =null;
      if(testStr.length===0){
          // 不能为空 “姓名不能为空”
          paramObj=msgs.error_required;
          myName.value='';
      }else if(!lenReg.test(testStr)){
          // 字符长度不对 “长度为4~16个字符”
          paramObj=msgs.error_length;
          myName.value='';
      }else{
        // 格式正确
        paramObj = msgs.right;
       }
       warnMsg(box,paramObj);

    }

    addEvent(validator,'click', validate);

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
        }
    }

})();