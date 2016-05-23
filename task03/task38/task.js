/**
 * 比较函数生成器

 */
(function(){

})();
升序
function  generateCompareTRs(iCol, sDataType) {
    return   function  compareTRs(oTR1, oTR2) {
        vValue1 = convert(oTR1.cells[iCol].firstChild.nodeValue, sDataType);
        vValue2 = convert(oTR2.cells[iCol].firstChild.nodeValue, sDataType);
        if  (vValue1 < vValue2) {
            return  -1;
        }  else   if  (vValue1 > vValue2) {
            return  1;
        }  else  {
            return  0;
        }
    };
}

//降序
function generateCompareTRs1(iCol,sDataType){
    return   function compareTRs(oTR1,oTR2){
        var vValue1=convert(oTR1.cells[iCol].firstChild.nodeValue,sDataType);
        var vValue2=convert(oTR2.cells[iCol].firstChild.nodeValue,sDataType);
        if(vValue1>vValue2){
            return -1;
        }
        else if(vValue1<vValue2){
            return 1;
        }
        else{
            return 0;
        }
    };
};
//数据类型转换函数
function  convert(sValue, sDataType) {
    switch  (sDataType) {
        case   "int" :
            return  parseInt(sValue);
        case   "float" :
            return  parseFloat(sValue);
        case   "date" :
            return   new  Date(Date.parse(sValue));
        default :
            return  sValue.toString();
    }
}

/**
 * 通过表头对表列进行排序
 *
 * @param sTableID
 *            要处理的表ID<table id=''>
 * @param iCol
 *            字段列id eg: 0 1 2 3 ...
 * @param sDataType
 *            该字段数据类型 int,float,date 缺省情况下当字符串处理
 */
function  sortTable(sTableID, iCol, sDataType) {
    var  oTable = document.getElementById(sTableID);//获取表格的ID
    var  oTBody = oTable.tBodies[0]; //获取表格的tbody
    var  colDataRows = oTBody.rows; //获取tbody里的所有行的引用
    var  aTRs =  new  Array;//定义aTRs数组用于存放tbody里的行
    for  (  var  i = 0; i < colDataRows.length; i++) {/依次把所有行放如aTRs数组
        aTRs[i] = colDataRows[i];
    }
    if  (oTable.sortCol == iCol) {//非首次排序
        aTRs.reverse();//首次排序
    }  else  {
        aTRs.sort(generateCompareTRs(iCol, sDataType));
    }
    var  oFragment = document.createDocumentFragment();
    for  (  var  j = 0; j < aTRs.length; j++) {
        oFragment.appendChild(aTRs[j]);
    }
    oTBody.appendChild(oFragment);
    oTable.sortCol = iCol;
}