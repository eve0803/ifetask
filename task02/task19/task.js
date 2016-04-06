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
    var getRandomColor = function(){
        return '#'+(Math.random()*0xffffff<<0).toString(16);
    }
    var inAnimation = false;
    var flag=0;//从大到小或者从小到大
    var insert_left =$("left-in"),
        insert_right =$("right-in"),
        delete_left =$("left-out"),
        delete_right =$("right-out"),
        input_Num = $('input-num'),
        showResult = $('showDiv'),
        apiData = [],
        sortBtn = $('sort'),
        apiChart = $('api-chart'),
        addNum = $('addNum'),
        el = showResult.getElementsByTagName('div');
    var eventUtil = {
        getInput:function(){
            var input_word = input_Num.value;
            if(apiData.length >= 60){
                alert("超过输入限制（60个）,请删除不需要的数据后再输入！");
                return false;
            }
            if(input_word < 10 || input_word > 100){
                alert("请输入10-100的数!");
                return false;
            }
            if(!/^\s*\d+\s*$/.test(input_word)){
                alert("请输入正整数数字!");
                input_Num.focus();
                return false;
            }
            input_word = input_word.replace(/(^\s*)|(\s*$)/g, ""); //删除左右两端的空格
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
            showResult.innerHTML = "";
            input_Num.value="";
            for(var i = 0 ; i < apiData.length ; i++){
                showResult.innerHTML += '<div style="height:'+apiData[i] * 5 + 'px"  title="' + +apiData[i] + '">'+ apiData[i] +'</div>';

            }
            return apiData;
        },
        bubbleSort:function(arr){
            flag=(flag==0)?1:0;
            var i=arr.length-1;
            var mySort=setInterval(function(){
                var tmp;
                if(i<=0)
                {
                    clearInterval(mySort);
                    return;
                }
                for(var j=0;j<i;j++)
                {
                    if(flag==0) {
                        if (arr[j] < arr[j + 1]) {
                            var tmp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = tmp;
                            tmp=j;
                        }
                    }
                    else
                    {
                        if (arr[j] > arr[j + 1]) {
                            var tmp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = tmp;
                            tmp=j;
                        }
                    }
                }
                eventUtil.renderChart();
                i--;

            },200);
        }
    };

    /* 随机50 */
    function randomForTest() {
      /*  if (inAnimation) {
            alert('in animation');
            return;
        }*/
        for (var i = 0; i < 60; i++) {
            apiData.push(Math.floor(Math.random() * 91 + 10));
        }
        eventUtil.renderChart();
    }

    addEvent(insert_left, 'click', eventUtil.leftIn);
    addEvent(insert_right, 'click', eventUtil.rightIn);
    addEvent(delete_left, 'click', eventUtil.leftOut);
    addEvent(delete_right, 'click', eventUtil.rightOut);
    addEvent(sortBtn, 'click',function(){
        eventUtil.bubbleSort(apiData);
    });
    addEvent(addNum, 'click',function(){
        randomForTest();
    });
    addEvent(showResult, 'click', function(e) {
        showResult.removeChild(e.target); //e.target 是目标对象，e.event是目标所发生的事件
    }, false);

})();


/*
*
* */



