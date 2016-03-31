/**
 *
 * @authors eve
 * @date    2016-03-24
 * @version 1.0
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}
function addEvent(ele, type, func) {
    if (ele.addEventListener) {
        ele.addEventListener(type, func, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, func);
    } else {
        ele['on' + type] = func;
    }
}
(function(){
    var insert_left =$("left-in"),
        insert_right =$("right-in"),
        delete_left =$("left-out"),
        delete_right =$("right-out"),
        input_Num = $('input-num'),
        showResult = $('result'),
        showList = showResult.getElementsByTagName('span');
    var eventUtil = {
        leftIn: function() {
            var pushValue = input_Num.value;
            input_Num.value="";
            if (pushValue.trim().length == 0 || (isNaN(pushValue))) {
                alert('请输入一个有效的阿拉伯数字');
                return false;
            } else {
                var oDiv = document.createElement('div');
                oDiv.innerHTML=pushValue;
                if (showResult.children[0]) {
                    showResult.insertBefore(oDiv, showResult.children[0]);
                } else {
                    showResult.appendChild(oDiv);
                };
            }

        },
        rightIn: function() {
            var pushValue = input_Num.value;
            input_Num.value="";
            if (pushValue.trim().length == 0 || (isNaN(pushValue))) {
                alert('请输入一个有效的阿拉伯数字');
                return false;
            } else {
                var oDiv = document.createElement('div');
                oDiv.innerHTML=pushValue;
                showResult.appendChild(oDiv);
            }
        },
        leftOut: function() {
            if(showResult.children.length===0){
                alert("没有可删除数字");
                return ;
            }
            alert('您正在删除数字'+showResult.firstChild.innerHTML);
            showResult.removeChild(showResult.firstChild);
        },
        rightOut: function() {
            if(showResult.children.length===0){
                alert("没有可删除数字");
                return ;
            }else{
                alert('您正在删除数字'+showResult.lastChild.innerHTML);
                showResult.removeChild(showResult.lastChild);
            }
        }
    }
    addEvent(insert_left, 'click', eventUtil.leftIn);
    addEvent(insert_right, 'click', eventUtil.rightIn);
    addEvent(delete_left, 'click', eventUtil.leftOut);
    addEvent(delete_right, 'click', eventUtil.rightOut);
    addEvent(showResult, 'click', function(e) {
        showResult.removeChild(e.target); //e.target 是目标对象，e.event是目标所发生的事件
    }, false);

})();




