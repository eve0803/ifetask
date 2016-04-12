/**
 * Created by guolimin on 2016-04-08.
 */
window.onload=function(){
    //用户名校验规则配置

    /*
    *  {
     label: '名称',                    // 表单标签
     type: 'input',                   // 表单类型
     validator: function () {...},    // 表单验证规
     rules: '必填，长度为4-16个字符',    // 填写规则提示
     success: '格式正确',              // 验证通过提示
     fail: '名称不能为空'               // 验证失败提示
     }
    * */
    var regName = new Validate();
    regName.setting={
        node: document.getElementById('regName'),
        errEle:document.getElementById('regName_error'),
        type : "input",
        rules :[validateRules.isUserName,{min:4,max:20}],
        Msg:validateMsg.regName
    }
    regName.useValidator(validator1);

    //密码校验规则配置
    var pwd = new Validate();
    pwd.setting={
        node: document.getElementById('regPwd'),
        errEle:document.getElementById('regPwd_error'),
        type : "input",
        rules :[validateRules.isPwd,{min:6,max:20}],
        Msg:validateMsg.regPwd
    }
    pwd.useValidator(validator1);

    //重复密码校验规则配置
    var rePwd = new ruleMaker();
    rePwd.setting={
        node: document.getElementById('rePwd'),
        errEle:document.getElementById('rePwd_error'),
        type : "input",
        rules :[validateRules.isPwd,{min:6,max:20},validateRules.isPwdRepeat],
        Msg:validateMsg.rePwd
    }
    rePwd.useValidator(validator3);

    // 手机号码校验配置
    var phone = new ruleMaker();
    phone.setting={
        node: document.getElementById('regPhone'),
        errEle:document.getElementById('regPhone_error'),
        type : "input",
        rules :[validateRules.isMobile,{min:11,max:11}],
        Msg:validateMsg.regPhone
    }
    phone.useValidator(validator1);

    // 邮箱校验配置
    var mail = new ruleMaker();
    mail.setting={
        node: document.getElementById('regMail'),
        errEle:document.getElementById('regMail_error'),
        type : "input",
        rules :[validateRules.isEmail],
        Msg:validateMsg.regMail
    }
    mail.useValidator(validator2);

    checkAll();

}

//表单验证的安全类

function Validate(){
    this.obj = null;
    this.msg=null;
    /// this.op=this.obj.nextNode('');
    this.settings = {   //默认参数
        toDown : function(){},
        toUp : function(){}
    };

};
Validate.prototype={
    init:function (opt){
        var This = this;
        this.obj = document.getElementById(opt.id);
        this.msg = document.getElementById('nameMsg');
        extend( this.settings , opt );
        console.log(this.obj.parentNode.lastChild.id)
        this.obj.onfocus = function(){
            This.fnFocus("必填，长度为4~16个字符");
            // This.settings.toDown();
        };
        this.obj.onblur = function(ev){
            This.fnBlur();
        };

    },
    fnFocus:function(warn){
        this.msg.style.display = "block";
        this.msg.innerHTML = warn;
    },
    fnBlur : function(){

        if(this.obj.value.length == 0){
            this.msg.innerHTML="姓名不能为空";
            this.msg.style.color="red";
            this.obj.style.borderColor="red";
            bClicked = false;
        }else if(getLength(this.obj.value)>=4 && getLength(this.obj.value)<=16){
            this.msg.innerHTML="名称格式正确";
            this.msg.style.color="green";
            this.obj.style.borderColor="green";
            bClicked = true;
        }else{
            this.msg.innerHTML="请填写4~16位的字符";
            this.msg.style.color="red";
            this.obj.style.borderColor="red";
            bClicked = false;
        }
    }
}

function getLength(str){
    // \x00-xff代表单字节字符。
    return str.replace(/[^\x00-\xff]/g, "xx").length;
}

function extend(obj1,obj2){
    for(var attr in obj2){
        obj1[attr] = obj2[attr];
    }
}