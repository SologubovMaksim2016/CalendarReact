import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import Header from '../Header';
import SelectWeekMonth from '../SelectWeekMonth';
import CalendarDays from '../CalendarDays/CalendarDays';
import CalendarListDate from '../CalendarListDate'
import ListEvents from '../ListEvents';
import moment from "moment";
// import eventsData from './eventsData';


class App2 extends Component {

    state ={
        offsetMonth: 0,
        selectWeekMonthPanel: false,
        monthView: true,
        startWeekDay: moment().startOf('week'),
        daySelected: null// moment().format('DD')  //   1,2,3  и т.д.
    }

    
    nameDays = ['S','M','T','W','T','F','S'];  //дни недели
    weekData=[];
    headerData = [];
    eventsData= [
        {
            date:"20.06.2019",
            events:[
                {
                name:"event name",
                body:"event body", 
                time:"11:00"
                }
            ]
        },
        {
            date:"22.06.2019", 
            events:[
                {
                name:"event 2",
                body:"event 2", 
                time:"12:00"
                }
            ]
        }
      ];


        renderMonth = (offset) => {
            console.log("TCL: App2 -> renderMonth -> offset", offset)
            // console.log(this.eventsData);
            let currMonth=moment();
            
            
            this.weekData=[];
            this.headerData=[];        
            let startMonthDay = moment().add(offset, 'month').startOf('month').day();//номер дня недели начала месяца
            for(let i=0; i<startMonthDay;i++){   //добавляем пустые ячейки 
                this.weekData.push({ name: '0'+i });
            }
            let numDay=1;  // начинаем отсчет с первого числа
            for(let i=0; i<moment().add(offset, 'month').daysInMonth();i++){           
                this.weekData.push( { 
                    redPoint: this.checkRePoint(numDay,offset),
                    name: numDay++ ,                 
                    wd:this.checkWd(startMonthDay,numDay),                 
                    ev: this.checkEvents(offset,numDay)
                });  
            };    
            this.headerData.push(moment().add(offset-1, 'month').format('MMM'));
            this.headerData.push(moment().add(offset, 'month').format('MMMM').toLocaleUpperCase());
            this.headerData.push(moment().add(offset+1, 'month').format('MMM'));  
            this.headerData.push("");      



        };
        renderWeek = (offset) => {
            console.log("TCL: App2 -> renderWeek -> offset", offset)
            // console.log(this.eventsData);
             /*если есть выбранная дата, формируем неделю с выбранной даты */   
            let startWeek =this.state.daySelected ?
                moment().add(offset, 'month')
                        .startOf('month')
                        .add(this.state.daySelected-1,'days')
                        .startOf('week')
              : this.state.startWeekDay ;
            let endWeek = startWeek.clone().endOf('week');

            this.weekData=[];
            this.headerData=[];  
            
            for(let i=0; i<7;i++){                   
                let numDay = startWeek.clone().add(i,'day').date()
                this.weekData.push( { 
                    redPoint: this.checkRePoint(numDay,offset),
                    // daySelected: this.checkDaySel(numDay,offset),                
                    name: numDay ,                 
                    wd: (i===0 || i===6 ) ? true : false ,                 
                    ev: this.checkEvents(offset,numDay)
                });  
            };  
            let centerText = startWeek.format('MMM DD').toLowerCase();
            centerText += " - ";
            centerText +=  startWeek.format('MMM') !== endWeek.format('MMM') ? 
                                endWeek.format('MMM DD').toLowerCase() : 
                                endWeek.format('DD').toLowerCase();
            
            this.headerData.push("prev");
            this.headerData.push(centerText);
            this.headerData.push("next");
            this.headerData.push("16px");    
            
           


        };
        checkEvents = (offset,numDay) => {

            return (

                ["aquamarine","grey","grey","aquamarine"]
            );
        };
        //указывает на текущую дату (неизменно )
        checkRePoint = ( nDay, offset) => {              
            return   ( nDay === +(moment().format('D'))   &&  offset===0 )? true:false               
            
        };      
        // проверка выходного дня недели
        checkWd =  (stMon,nDay) => {
             return ((stMon+nDay-1)%7 && (stMon+nDay-2)%7)===0? true:false ;
        };

        nextWeek = () => { 
                let tmp2 = this.state.offsetMonth;
                let tmp=this.state.startWeekDay
                    .clone().add(1,'week')
                    .endOf('week').date();

                if (tmp>=4 && tmp<=6)  tmp2 = ++this.state.offsetMonth;
                let m1=this.state.startWeekDay.clone().add(7,'day').month();
                let m2 = this.state.startWeekDay.month();
                if(tmp>6 && tmp <10)
                    if ( m1>m2){
                        tmp2 = ++this.state.offsetMonth ; 
                        console.log("TCL: App2 -> nextWeek -> this.state.offsetMonth", 
                        this.state.offsetMonth, ":   tmp2=",tmp2);
                        
                    }
                     

            
            // let tmp = this.state.startWeekDay.clone().add(13, 'day').date();
            //                 console.log("TCL: App2 -> nextWeek -> tmp", tmp);


                            
            this.setState({
                offsetMonth: tmp2/*>=4 && tmp<=6? ++this.state.offsetMonth : this.state.offsetMonth*/ ,
                daySelected: null,
                startWeekDay: this.state.startWeekDay.add(7, 'day')
            });
            console.log("TCL: App2 -> nextWeek -> this.state.offsetMonth", this.state.offsetMonth)
              
        };
        prevWeek = () => {
            
            this.setState({
                daySelected: null,
                startWeekDay: this.state.startWeekDay.add(-7, 'day')
            });

        };

        nextMonth = () => { 

            this.setState({
                offsetMonth: ++this.state.offsetMonth
            });
        };
        prevMonth = () => {
            
            this.setState({
                offsetMonth: --this.state.offsetMonth
            });
        };

        arrowClick = () => {
            this.setState({
                selectWeekMonthPanel: !this.state.selectWeekMonthPanel
            });
        };
        monthSelect = () => {
            this.setState({
                selectWeekMonthPanel: !this.state.selectWeekMonthPanel,
                monthView: true
            });
        };
        weekSelect = () => {
            this.setState({
                selectWeekMonthPanel: !this.state.selectWeekMonthPanel,
                monthView: false
            });
        };
        onDaySelectedChange = (daySelected) => {
        console.log("TCL: App2 -> onDaySelectedChange -> daySelected", daySelected);
            
            this.setState({daySelected})
        };
    
        /*filterEventsForDay(items,daySelected){

        };*/

    
    
    render(){
        
    this.state.monthView?  this.renderMonth(this.state.offsetMonth) :
                           this.renderWeek(this.state.offsetMonth) ;

    const dataHeader = [this.headerData,
                        this.state.monthView? this.nextMonth : this.nextWeek,
                        this.state.monthView? this.prevMonth : this.prevWeek,                        
                        this.state.selectWeekMonthPanel,
                        this.arrowClick]; 

    const selectWeekMonth_data =[this.state.selectWeekMonthPanel,this.monthSelect,this.weekSelect];
     
    const OverflowClazz =  this.state.selectWeekMonthPanel ?   "overflow ovf1" : "overflow"  ;  ;               
    

    return(
       
        <div className="calendar noselect"> 
                <Header dataHeader= {dataHeader} />
                <SelectWeekMonth select = {selectWeekMonth_data} />    
                <div className={OverflowClazz}> 
                    <CalendarDays days = {this.nameDays} select = {this.state.selectWeekMonthPanel}/>
                    <CalendarListDate 
                        weekData= {this.weekData}
                        daySelected= {this.state.daySelected}
                        onDaySelectedChange = {this.onDaySelectedChange}
                    />
                    <ListEvents data = {this.eventsData} />
                </div>
        </div>
    );

    }
}
export default App2;