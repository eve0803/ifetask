/**
 * Created by guolimin on 2016-04-08.
 */
(function(){

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

    window.onload = function(){
        var regName = new Valid('nameBox');
        regName.init({
            rule: '必填，长度为4~16个字符',
            warn:  '名称不能为空！',
            regValid:function(){
                var text=document.getElementById('myName');
                var  len = getLength(text.value);
                if(len <=16&&len >=4){
                    return true;
                }
            },
            success: 'ok，名称可以用',
            error: '长度为4~16个字符'
        });
        var pwdReg = new Valid('pwdbox');
        pwdReg.init({
            rule: '必填，长度为6~12个字符',
            warn:  '密码确认不能为空！',
            regValid:function(){
                var pwd = document.getElementById('pwd').value;
                var len = getLength(pwd);
                if(len <=12&&len >=6){
                    return true;
                }
            },
            success: 'ok，密码一致',
            error: '长度为6~12个字符'
        });
        var repwdReg = new Valid('repwdbox');
        repwdReg.init({
            rule: '必填，请再次输入密码',
            warn:  '密码确认不能为空！',
            regValid:function(){
                var text=document.getElementById('pwd');
                var pwd = document.getElementById('repwd').value;
                var repwd = text.value;
                var len = getLength(repwd);
                if(pwd == repwd&&len <=12&&len >=6){
                    return true;
                }
            },
            success: 'ok，密码一致',
            error: '两次输入不一样'
        });
        var emailReg = new Valid('emailbox');
        emailReg.init({
            rule: '必填，邮箱不能为空',
            warn:  '邮箱不能为空！',
            regValid:function(){
                var text=document.getElementById('email');
                var reg = /^[\w]+@([a-z0-9]+\.)+[a-z]{2,4}$/i;
                var oText = text.value;
                var  len = getLength(text.value);
                if(reg.test(oText)){
                    return true;
                }
            },
            success: 'ok，密码可以用',
            error: '您的电子邮件格式不正确'
        });
        var telReg = new Valid('telbox');
        telReg.init({
            rule: '必填，手机号码不能为空',
            warn:  '手机号码不能为空！',
            regValid:function(){
                var text=document.getElementById('tel');
                var reg = /^\d{11}$/;
                var oText = text.value;
                if(reg.test(oText)){
                    return true;
                }
            },
            success: 'ok，手机号码格式正确',
            error: '您的手机号码格式不正确'
        });

    }



    function Valid(id){
        this.box =document.getElementById(id);
        this.msg = this.box.getElementsByTagName('p')[0];
        this.oInput = this.box.getElementsByTagName('input')[0];
        this.settings = {}
    }
    Valid.prototype.init=function(opt){
        var This = this;
        extend(this.settings, opt);
        this.oInput.onfocus = function(){
            This.focus();
        }
        this.oInput.onblur=function(){
            This.blur();
        }
        this.setting={
            rule: '',
            warn:  '',
            regValid:function(reg){},
            success: '',
            error: ''
        }
    }
    Valid.prototype.focus=function() {
        var This = this;
        this.msg.style.display = "block";
        this.msg.innerHTML = this.settings.rule;
    }
    Valid.prototype.blur=function(){
        this.msg.style.display = "block";
        var reg = /[^\w\u4e00-\u9fa5]/g;

        var nameText =  this.oInput.value;
        if (trim(this.oInput.value) == ''){
            this.box.className = "error";
            this.msg.innerHTML = this.settings.warn;
        }
        //OK
        else if (this.settings.regValid()){
            this.box.className = "right";
            this.msg.innerHTML = this.settings.success;

        }else{
            this.box.className = "error";
            this.msg.innerHTML = this.settings.error;
        }
    }


    function getLength(str){
        return str.replace(/[^\x00-\xff]/g, "xx").length;// 匹配双字节字符（一般就像汉字
    }
    function trim(str){
        return String(str).replace(/(^\s*)|(\s*$)/g, '');
    }
    function extend(obj1, obj2){
        for(var attr in obj2){
            obj1[attr] = obj2[attr];
        }
    }


    //提交
    function validate() {
        var validator = document.getElementById('validator');

        if (document.getElementById('nameBox').className == 'right' && document.getElementById('pwdbox').className == 'right' && document.getElementById('emailbox').className == 'right' && document.getElementById('nameBox').className == 'right' && document.getElementById('telbox').className == 'right') {
            alert("恭喜你，填写成功");
        }
        else {
            alert("有误，请仔细检查");
        }
    }
    addEvent(validator,'click', validate);
})();