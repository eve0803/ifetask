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
        input_Num = $('myInput'),
        showResult = $('showDiv'),
        apiData = [],
          mySearch = $('mySearch');
    var eventUtil = {
        getInput:function(num){

            var reg = new RegExp("[^\n\r\s 、,，0-9A-Za-z\u4e00-\u9fa5]");
            var regBlank = new RegExp("^[\n\r\s ,，、]*$");
            if(reg.test(num)){
                alert("输入的内容只能包含数字、中文、英文");
                return false;
            }
            else if(regBlank.test(num)){
                alert("无法输入空数据");
                return false;
            }
            return input_word;
        },
        leftIn: function() {
            var inputText = eventUtil.getInput();
            if(inputText === false) return;
            apiData.unshift(inputText);
            eventUtil.renderChart();
        },
        rightIn: function() {
            var inputText = eventUtil.getInput();
            if(inputText === false) return;
            apiData.push(inputText);
            eventUtil.renderChart();
        },
        leftOut: function() {
            if(apiData.length === 0){
                alert("已无数据！")
                return false;
            };
            //删除
            apiData.shift();
            //渲染图表
            eventUtil.renderChart();
        },
        rightOut: function() {
            if(apiData.length === 0){
                alert("已无数据！")
                return false;
            };
            //删除
            apiData.pop();
            //渲染图表
            eventUtil.renderChart();
        },
        renderChart: function() {
            var input_word = input_Num.value;
            var textArr = input_word.split(/[\s\r\n、,，]+/);
            showResult.innerHTML = "";
            input_Num.value="";
            for(var i = 0 ; i < apiData.length ; i++){
                showResult.innerHTML += '<div>'+ apiData[i] +'</div>';

            }
            return apiData;
        }
    };


    addEvent(insert_left, 'click', eventUtil.leftIn);
    addEvent(insert_right, 'click', eventUtil.rightIn);
    addEvent(delete_left, 'click', eventUtil.leftOut);
    addEvent(delete_right, 'click', eventUtil.rightOut);
    addEvent(mySearch, 'click',function(){
        eventUtil.bubbleSort(apiData);
    });

    addEvent(showResult, 'click', function(e) {
        showResult.removeChild(e.target); //e.target 是目标对象，e.event是目标所发生的事件
    }, false);

})();


/*
*
* */



