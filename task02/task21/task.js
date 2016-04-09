/**
 * Created by guolimin on 2016-04-05.
 */

(function(){
    var hobbyBtn=$('hobby-btn'),
        tagInput=$('tag-input'),
        tagContainer=$('tag-container'),
        hobbyInput=$('hobby-input'),
        tagInput=$('tag-input'),
        hobbyContainer=$('hobby-container'),
        apiData=[];
//取得id
   function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }
    //判断标签中是否已经含有
    function hasLabel(label, container){
        var divText = container.getElementsByTagName("div");
        for(var i= 0; i<divText.length; i++){
            if(divText[i].innerHTML === label){
                return true;
            }
        }
        return false;
    }

//事件绑定函数，兼容浏览器差异
    function addEvent(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }
    //数组去重
    Array.prototype.unique = function(){
        var res = [];
        var json = {};
        for(var i = 0; i < this.length; i++){
            if(!json[this[i]]){
                res.push(this[i]);
                json[this[i]] = 1;
            }
        }
        return res;
    }
    //将输入的内容分割为数组
    function spiltInput(text) {
        var inputArray = [];
        inputArray = (text).split(/[,，;；、\s\n]+/);
        return inputArray;
    }
//对textarea内的内容进行trim，否则当开头结尾有大量空格时会有bug
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/, "")
    }
    //将输入的内容分割为数组
    function spiltInput(text) {
        var inputArray = [];
        inputArray = (text).split(/[,，;；、\s\n]+/);
        return inputArray;
    }
    var eventUtil = {
        getInput:function(){
            var input_word=tagInput.value;
            var regBlank =/^[\n\r\s ,，、]*$/;
            if(regBlank.test(input_word)){
                alert("无法输入空数据");
                return false;
            }
           return input_word;
        },
        rightIn: function() {
            var inputText = trim(eventUtil.getInput());
            if(inputText === false) return;
            apiData=apiData.concat(spiltInput(inputText));
            console.log(apiData)
            eventUtil.renderChart();
        },
        renderChart: function() {
            tagContainer.innerHTML="";
            tagInput.value="";
            for(var i = 0 ; i < apiData.length ; i++){
                tagContainer.innerHTML += '<div>'+ apiData[i] +'</div>';
            }
            return apiData;
        }
    };




   //数组去重

    //绑定事件
    addEvent(tagContainer, "mouseover", function(){delectShow(ev);});
    addEvent(hobbyBtn, "click", function(){
        eventUtil.rightIn();
    });
    addEvent(tagInput, "keyup", function(e){
        if (/[,，;；、\s\n]+/.test(tagInput.value) || e.keyCode ===13) {
            //  var handledData = spiltInput(trim(tagInput.value));
            eventUtil.rightIn();

        }
    });




})();






