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
        searchbtn = $('search'),
        mySearch = $('mySearch');
    var matchnum=[]
    var eventUtil = {
        getInput:function(){
        var input_word=input_Num.value;
            var reg = /[^\n\r\s 、,，0-9A-Za-z\u4e00-\u9fa5]/;
            var regBlank =/^[\n\r\s ,，、]*$/;
            if(reg.test(input_word)){
                alert("输入的内容只能包含数字、中文、英文");
                return false;
            }
            else if(regBlank.test(input_word)){
                alert("无法输入空数据");
                return false;
            }

            return input_word.trim();
        },
        leftIn: function() {
            var inputText = eventUtil.getInput();
            if(inputText === false) return;
            apiData=inputText.split(/\s|;|；|，|,/g).concat(apiData);
            eventUtil.renderChart();
        },
        rightIn: function() {
            var inputText = eventUtil.getInput();
            if(inputText === false) return;
            apiData=apiData.concat(inputText.split(/\s|;|；|，|,/g));
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
            showResult.innerHTML="";
            input_Num.value="";
            for(var i = 0 ; i < apiData.length ; i++){
                showResult.innerHTML += '<div>'+ apiData[i] +'</div>';
            }
          //下面是用于标记出查找到元素的判断逻辑
            if(matchnum.length>0){
                //获得所有li节点以备操作
                var lipack=document.getElementsByTagName("li");
                for(i=0;i<=matchnum.length-1;i++){
                    lipack[matchnum[i]].setAttribute("class","located")
                }
                matchnum=[];
            }
            return apiData;
        }
    };
    //查询内容
    function searchDivContent(text) {
        for (var i = 0; i < showDiv.childNodes.length; i++) {
            if (showDiv.childNodes[i].innerHTML.indexOf(text) != -1) {
                showDiv.childNodes[i].style.color = "#ffffff";
                showDiv.childNodes[i].style.background = "blue";
            }
        }
    }

    addEvent(insert_left, 'click', eventUtil.leftIn);
    addEvent(insert_right, 'click', eventUtil.rightIn);
    addEvent(delete_left, 'click', eventUtil.leftOut);
    addEvent(delete_right, 'click', eventUtil.rightOut);
    addEvent(searchbtn, 'click',function(){
        var inputValue = mySearch.value;
        searchDivContent(inputValue);
    });

    addEvent(showResult, 'click', function(e) {
        showResult.removeChild(e.target); //e.target 是目标对象，e.event是目标所发生的事件
    }, false);

})();


/*
*
* */



