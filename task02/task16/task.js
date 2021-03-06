(function(){
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
    function delegateEvent(ele, tag, eventName, func) {
        addEvent(ele, eventName, function () {
            var event = arguments[0] || window.event,
                target = event.target || event.srcElement;
            if (target && target.tagName === tag.toUpperCase()) {
                func.call(target, event);
            }
        });
    }
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };

     */
    var aqiData = {};

    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {

      var city=$("aqi-city-input").value;
      var value=$('aqi-value-input').value;
      var  eng=/^[u4e00-u9fa5a-zA-Z]+$/;
      var  num=/^[1-9]d*$/;
      if(!eng.test(city).trim()){
          alert('请输入正确的城市名称!');
          return ;
      }
      if(!num.test(value.trim())){
            alert('请输入正整数!');
            value.focus();
            return ;
      }
     aqiData[city] = value;


    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {

        var html="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        for(var city in aqiData){
          html+= "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>";
        }
        document.getElementById("aqi-table").innerHTML = city ? html : "";

    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();

    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(city) {
        // do sth.

        renderAqiList();
    }

    function init() {
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        addEvent(btnSubmit, "click", addBtnHandle);
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        addEvent(aqi-table, "click", function(ev){

        });

    }

    init();


})();