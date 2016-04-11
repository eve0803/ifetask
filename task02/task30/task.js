/**
 * Created by guolimin on 2016-04-08.
 */
(function(){
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }
    function getLength(str){
        // \x00-xff代表单字节字符。
        return str.replace(/[^\x00-\xff]/g, "xx").length;
    }
    //表单验证的安全类
    var oName = $('myName');
    var oName1 = $('nameMsg');
    var oPwd = $('pwd');
    var oPwd1 = $('pwdMsg');
    var oRepwd = $('repwd');
    var oRepwd1 = $('repwdMsg');
    var oEmail = $('email');
    var oEmail1 =$('emailMsg');
    var oPhone = $('tel');
    var oPhone1 = $('telMsg');
    var oSub = $('validator');
    var bClicked = false;
    var bClicked1 = false;
    var bClicked2 = false;
    var bClicked3 = false;
    var bClicked4 = false;


    oName.onfocus=function(){
        oName1.style.display = "block";
        oName1.innerHTML = "必填，长度为4~16个字符";
    }
    oName.onblur=function(){
        if(oName.value.length == 0){
            oName1.innerHTML="姓名不能为空";
            oName.style.borderColor="red";
            oName1.style.color="red";
            bClicked = false;
        }else if(getLength(this.value)>=4 && getLength(this.value)<=16){
            oName1.innerHTML="名称格式正确";
            oName.style.borderColor="green";
            oName1.style.color="green";
            bClicked = true;
        }else{
            oName1.innerHTML="请填写4~16位的字符";
            oName.style.borderColor="red";
            oName1.style.color="red";
            bClicked = false;
        }
    }
    oPwd.onfocus=function(){
        oPwd1.style.display = "block";
        oPwd1.innerHTML = "请输入密码";
    }
    oPwd.onblur=function(){
        if(oPwd.value.length == 0){
            oPwd1.innerHTML="密码不能为空";
            oPwd1.style.color="red";
            oPwd.style.borderColor="red";
            bClicked1 = false;
        }else if(oPwd.value.length>=6 && oPwd.value.length<=12){
            oPwd1.innerHTML="密码可用";
            oPwd1.style.color="green";
            oPwd.style.borderColor="green";
            bClicked1 = true;
        }else{
            oPwd1.innerHTML="请填写6~12位的密码";
            oPwd1.style.color="red";
            oPwd.style.borderColor="red";
            bClicked1 = false;
        }
    }
    oRepwd.onfocus=function(){
        oRepwd1.style.display = "block";
        oRepwd1.innerHTML = "再次输入相同的密码";
    }
    oRepwd.onblur=function(){
        if(oRepwd.value.length == 0){
            oRepwd1.innerHTML="输入不能为空";
            oRepwd1.style.color="red";
            oRepwd.style.borderColor="red";
            bClicked2 = false;
        }else if(oRepwd.value == oPwd.value){
            oRepwd1.innerHTML="密码输入一致";
            oRepwd1.style.color="green";
            oRepwd.style.borderColor="green";
            bClicked2 = true;
        }else{
            oRepwd1.innerHTML="再次输入相同的密码";
            oRepwd1.style.color="red";
            oRepwd.style.borderColor="red";
            bClicked2 = false;
        }
    }
    oEmail.onfocus=function(){
        oEmail1.style.display = "block";
        oEmail1.innerHTML = "请输入邮箱地址";
    }
    oEmail.onblur=function(){
        if(oEmail.value.length == 0){
            oEmail1.innerHTML="邮箱不能为空";
            oEmail1.style.color="red";
            oEmail.style.borderColor="red";
            bClicked3 = false;
        }else if(/^[\w]+@([a-z0-9]+\.)+[a-z]{2,4}$/i.test(oEmail.value)){
            oEmail1.innerHTML="邮箱格式正确";
            oEmail1.style.color="green";
            oEmail.style.borderColor="green";
            bClicked3 = true;
        }else{
            oEmail1.innerHTML="邮箱格式错误";
            oEmail1.style.color="red";
            oEmail.style.borderColor="red";
            bClicked3 = false;
        }
    }
    oPhone.onfocus=function(){
        oPhone1.style.display = "block";
        oPhone1.innerHTML = "请输入有效的手机号";
    }
    oPhone.onblur=function(){
        if(oPhone.value.length == 0){
            oPhone1.innerHTML="手机号不能为空";
            oPhone1.style.color="red";
            oPhone.style.borderColor="red";
            bClicked4 = false;
        }else if(/^\d{11}$/.test(oPhone.value)){
            oPhone1.innerHTML="手机格式正确";
            oPhone1.style.color="green";
            oPhone.style.borderColor="green";
            bClicked4 = true;
        }else{
            oPhone1.innerHTML="请填写11位的有效字符";
            oPhone1.style.color="red";
            oPhone.style.borderColor="red";
            bClicked4 = false;
        }
    }
    oSub.onclick=function(){
        if(bClicked == true && bClicked1 == true && bClicked2 == true && bClicked3 == true && bClicked4 == true){
            alert("提交成功！");
        }else{
            alert("输入有误！");
        }
    }

})();