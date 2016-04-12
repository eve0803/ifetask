/**
 * Created by guolimin on 2016-04-12.
 */
(function(){
    var aInput = document.getElementById('login');
    aInput.onclick = function(){
        var d1 = new Dialog();
        d1.init({   //配置参数
            class:'dialog',
            iNow : 1,
            mark : true,
            content:'我是中间的弹出层内容',
            title : '我是公告'
        });
    };
   //组件代码开始
    function Dialog(){
        this.oDialog = null;
        this.settings = {   //默认参数
            w : 300,
            h : 300,
            dir: 'center',
            title : '',
            mark : false,
            content:''
        };
    }
    Dialog.prototype.json = {};
    Dialog.prototype.init = function( opt ){
        extend( this.settings , opt );
        if( this.json[opt.iNow] == undefined ){
            this.json[opt.iNow] = true;
        }
        if(this.json[opt.iNow]){
            this.create();
            this.fnClose();
            if(this.settings.mark){
                this.createMark();
            }
            this.json[opt.iNow] = false;
        }
    };
    //创建弹出框
    Dialog.prototype.create = function(){
        this.oDialog = document.createElement('div');
        this.oDialog.className = this.settings.class;
        this.oDialog.innerHTML = '<div class="title"><span>'+ this.settings.title +'</span><span class="close">X</span></div><div class="content">'+this.settings.content+'</div>';
        document.body.appendChild( this.oDialog );
        this.setData();
    };
    Dialog.prototype.setData = function(){
        this.oDialog.style.width = this.settings.w + 'px';
        this.oDialog.style.height = this.settings.h + 'px';
        if( this.settings.dir == 'center' ){
            this.oDialog.style.left =  (viewWidth() - this.oDialog.offsetWidth)/2 + 'px';
            this.oDialog.style.top =  (viewHeight() - this.oDialog.offsetHeight)/2 + 'px';
        }
        else if( this.settings.dir == 'right' ){
            this.oDialog.style.left =  (viewWidth() - this.oDialog.offsetWidth) + 'px';
            this.oDialog.style.top =  (viewHeight() - this.oDialog.offsetHeight) + 'px';
        }

    };
    // 关闭
    Dialog.prototype.fnClose = function(){
        var oClose = this.oDialog.getElementsByTagName('span')[1];
       // var oMark= this.oDialog.getElementById('mark');
        var This = this;
        oClose.onclick  = function(){
            document.body.removeChild( This.oDialog );
            if(This.settings.mark){
                document.body.removeChild( This.oMark );
            }
            This.json[This.settings.iNow] = true;
        };


    };
   // 遮罩
    Dialog.prototype.createMark = function(){
        var oMark = document.createElement('div');
        oMark.id = 'mark';
        document.body.appendChild( oMark );
        this.oMark = oMark;
        oMark.style.width = viewWidth() + 'px';
        oMark.style.height = viewHeight() + 'px';
        var This = this;
        oMark.onclick  = function(){
            document.body.removeChild( This.oDialog );
            if(This.settings.mark){
                document.body.removeChild( This.oMark );
            }
            This.json[This.settings.iNow] = true;
        };
    };
    // 拖拽移动
    Dialog.prototype.drag = function(){

    };
    //继承
    function extend(obj1,obj2){
        for(var attr in obj2){
            obj1[attr] = obj2[attr];
        }
    }
    //可视区的宽高
    function viewWidth(){
        return document.documentElement.clientWidth;
    }
    function viewHeight(){
        return document.documentElement.clientHeight;
    }

})();


