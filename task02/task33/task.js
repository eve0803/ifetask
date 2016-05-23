/**
 * Created by guolimin on 2016-04-11.
 */
(function(){
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }
// 解决浏览器兼容
    function addEventHandler(obj,event,handler){
        if(obj.addEventListener){
            obj.addEventListener(event,handler,false);
        }else if(obj.attachEvent){
            obj.attachEvent("on"+event,handler);
        }else
            obj["on"+event]=handler;
    }


    //获得元素
    var chess = document.getElementById('chess');
    var directions = ['top', 'right', 'bottom', 'left'];
    var deg = 0;
    //创建棋盘
    var initRoad = function (container, rows, columns) {
        var ele = $(tableWrap);
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        for(var i=0;i<rows;i++){
            var tr = tbody.insertRow (tbody.rows.length);
            for(var j=0;j<columns;j++){
                var td = tr.insertCell (tr.cells.length);
                if (i == 0 && j == 0) {
                    td.innerHTML = "";
                }
                else if (i == 0) {
                    td.innerHTML = j;
                } else if (j == 0) {
                    td.innerHTML = i;
                }
            }
        }
        ele.appendChild(table);
        //随机棋子
        var n=Math.ceil(Math.random()*9);
        var m=Math.ceil(Math.random()*9);
        chess.style.top=51*n+"px";
        chess.style.left=51*m+"px";
        chess.style.transform = "rotateZ(0deg)";

    };

    //  命令对象
    var command = {
        go: function(){
            var d = parseInt((chess.style.transform).match(/[-]*\d+/g)[0])
            switch(d%360) {
                case 0:
                case -0: {
                    if(chess.style.top==='50px'){return false}
                    chess.style.top = (parseInt(chess.style.top) - 50) +'px';
                    break;
                }

                case 90:
                case -270: {
                    if(chess.style.left==='270px'){return false}
                    chess.style.left = (parseInt(chess.style.left) + 50) +'px';
                    break;
                }

                case 180:
                case -180: {
                    if(chess.style.top==='300px'){return false}
                    chess.style.top = (parseInt(chess.style.top) + 50) +'px';
                    break;
                }

                case 270:
                case -90: {
                    if(chess.style.left==='0px'){return false}
                    chess.style.left = (parseInt(chess.style.left) - 50) +'px';
                    break;
                }
            }
        },

        left: function(){
            setDirection(-90);
        },

        rifht: function(){
            setDirection(90);
        },

        back: function(){
            setDirection(180);
        }
    }

    //  设置方向
    function setDirection(deg){
        var oldDeg = parseInt((chess.style.transform).match(/[-]*\d+/g)[0])
        chess.style.transform = 'rotateZ('+(oldDeg+deg)+'deg)';
    }

    // 按钮执行命令
    var input=document.getElementsByTagName("input");
    input[0].onclick=function(){
        command.exportGo();
    }
    input[1].onclick=function(){
        command.exportLeft();
    }
    input[2].onclick=function(){
        command.exportRight();
    }
    input[3].onclick=function(){
        command.exportBack();
    }

    //  输入框执行命令
    $("confirm").onclick=function(){
        var myValue = $('command').value;
        switch(myValue){
            case "go":
                command.exportGo();
                break;
            case "left":
                command.exportLeft();
                break;
            case "right":
                command.exportRight();
                break;
            case "back":
                command.exportBack();
                break;
        }
    }
    //  键盘执行命令
   document.onkeydown=function(event){
       var ev=event||window.event;
       switch(ev.keyCode){
           case 37:
               command.exportLeft();
               break;
           case 38:
               command.exportGo();
               break;
           case 39:
               command.exportRight();
               break;
           case  40:
               command.exportBack();
               break;

       }
   }
    //初始化
    initRoad('chessboard', 11, 11);



})();

//创建表格的第一种方法
/*    for (var i = 0; i <= rows-1; i++) {
 var tr = document.createElement('tr');
 for (var j = 0; j <= columns-1; j++) {
 var td = document.createElement('td');
 tr.appendChild(td);
 if (i == 0 && j == 0) {
 td.innerHTML = "";
 }
 else if (i == 0) {
 td.innerHTML = j;
 } else if (j == 0) {
 td.innerHTML = i;
 } else {
 }
 }
 tbody.appendChild(tr);
 };*/
//创建表格的第二种方法
