(function() {
    var config = {
            tdwidth : '150px',
            tdHeight : '55px',
            rowNum : '5',
            colNum : '5',
            thBgc : '#333',
            border :  "1px solid #CCC",
            thContent : ['姓名','语文','数学','英语','总分'],
            trContent : [
                ['小明',80,90,70,240],
                ['小红',90,60,90,240],
                ['小亮',60,100,70,230],
                ['小强',100,70,80,250],
            ]
        },
        tab = document.getElementById('tab');


    function addTh(){
        var thNode = document.createElement('tr'),
            tdList;
        thNode = addTd(thNode,config.thContent);
        thNode.style.background = config.thBgc;
        thNode.style.color = '#fff';
        thNode.style.fontWeight = "bold";

        tdList = thNode.childNodes;
        for(var i = 1;i<config.colNum;i++){
            addArrowUp(tdList[i]);
            addArrowDown(tdList[i]);
        }
        tab.appendChild(thNode);

        function addArrow(arrowNode,flag){
            arrowNode.className='arrow';
            arrowNode.addEventListener('click',function(eve){
                var content = eve.target.parentNode.innerHTML.split('<')[0],
                    listNum = config.thContent.indexOf(content),
                    sortList = [],
                    newList = [],
                    trList = tab.childNodes;

                //取出要排序的数据，保存在数组中
                for( var i = 0;i<config.rowNum-1;i++){
                    sortList.push(trList[i+1].childNodes[listNum].innerHTML);
                }

                //得到所要求经排序后的数组
                //降序排序
                newList = sortList.sort(sortNumber);
                //需要升序则取反
                if(!flag){
                    newList = newList.reverse();
                }

                //获得当前列的数据分布情况
                sortList = [];
                for( i = 0;i<config.rowNum-1;i++){
                    sortList.push(trList[i+1].childNodes[listNum].innerHTML);
                }

                //根据前后两个数组，重新排序列表项
                changeOrder(newList,sortList);

                function sortNumber(a,b){
                    return b - a ;
                }
                //根据排序结果重新排列行序
                function changeOrder(newList,oldList){
                    var len = newList.length,
                        pos_before,
                        pos_now,
                        trList = tab.childNodes,
                        tempNode = document.createElement('tr'),
                        temp;
                    for(var k = 0;k<len;k++){
                        //记录当前值在新表中位置，并寻找当前值在原表中的位置
                        pos_now = k;
                        pos_before = oldList.indexOf(newList[k]);
                        //如果当前值在两个表中的位置不一样，则交换两个节点的内容
                        if(pos_now !== pos_before){
                            tempNode.innerHTML = trList[pos_before+1].innerHTML;
                            trList[pos_before+1].innerHTML = trList[pos_now+1].innerHTML;
                            trList[pos_now+1].innerHTML = tempNode.innerHTML;

                            //更新表的内容
                            temp = oldList[pos_before];
                            oldList[pos_before] = oldList[pos_now];
                            oldList[pos_now] = temp;
                        }
                    }
                }
            },false);
            return arrowNode;
        }

        function addArrowDown(tdNode){
            var divNode = document.createElement('div');
            divNode = addArrow(divNode,true);
            divNode.style.borderTop ="10px solid #fff";
            divNode.style.top = "30px";
            tdNode.appendChild(divNode);
        }
        function addArrowUp(tdNode){
            var divNode = document.createElement('div');
            divNode = addArrow(divNode,false);
            divNode.style.borderBottom ="10px solid #fff";
            divNode.style.top = "14px";
            tdNode.appendChild(divNode);
        }
    }
    function addTd(rowNode,contentList){
        var tdNode;
        for(var i = 0;i<config.colNum;i++){
            tdNode = document.createElement('td');
            tdNode.innerHTML = contentList[i];
            tdNode.style.width = config.tdwidth;
            tdNode.style.height = config.tdHeight;
            tdNode.style.border = config.border;
            tdNode.style.position = "relative";
            rowNode.appendChild(tdNode);
        }
        return rowNode;
    }
    function addTr(){
        var trNode;
        var trlist='';
        for(var i = 0; i < config.rowNum-1;i++){
            trNode = document.createElement('tr');
           // trNode = addTd(trNode,config.trContent[i]);
            tab.appendChild(trNode);
        }
    }

   function createTable(){
       addTh();
       addTr();
   }

    createTable()

}());