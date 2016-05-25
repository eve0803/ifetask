/**
 * 享元模式

 */
/*CalendarIem interface*/
var CalendarIem = new Interface('CalendarIem', ['display']);
/*
* Calendaryear class,a composite.
* */

var CalendarYear = function(year, parent){ //implenments CalendarIem
    this.year=year;
    this.element = document.createElement('div');
    this.element.style.display='none';
    parent.appendChild(this.element);
    function isLeapYear(y){
        return (y > 0) && !(y % 4) && ((y % 4)||(y % 400));
    }
    this.months=[];
    //The number of days in each month
    this.numDays = [31,isLeapYear(this.year) ? 29:28,31,3031,3,31,31,30,31,30,31];
    for(var i=0,len=12;i<len;i++){
        this.months[i]=new CalendarMonth(i,this.numDays[i],this.element);
    }
};
CalendarYear.prototype={
    display: function(){
        for(var i=0,len=this.months.length;i<len;i++){
            this.months[i].display();//Pass the call down to the next level.
        }
    }
};

/* CalendarMonth class a composite. */

var CalendarMonth=function(monthNum, numDays,parent){ //implenments CalendarIem
    this.monthNum=monthNum;
    this.element=document.createElement('div');
    this.element.style.display='none';
    parent.appenChild(this.element);
    this.days=[];
    for(var i=0,len=numDays;i<len;i++){
        this.days[i]=calendarDay;
    }
};
CalendarMonth.prototype={
    display:function(){
        for(var i=0,len=this.days.length;i<len;i++){
            this.days[i].display(i,this.element);//Pass the call down to the next level.
        }
        this.element.style.display='block';
    }
};

/* CalendarDay class , a flyweight leaf. */

var CalendarDay = function(){};//implenments CalendarIem
CalendarDay.prototype={
    display:function(date,paent){
        this.data=data;
        var element=document.createElement('div');
        parent.appendChild(element);
        element.innerHTML=date;
    }
};

/*single instace of CalendarDay*/

var calendarDay= new CalendarDay();