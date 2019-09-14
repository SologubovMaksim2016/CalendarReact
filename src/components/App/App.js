import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import Header from '../Header';
import SelectWeekMonth from '../SelectWeekMonth';
import CalendarDays from '../CalendarDays/CalendarDays';
import CalendarListDate from '../CalendarListDate'
import ListEvents from '../ListEvents';
import moment from "moment";
import eventsData from './eventsData';

// function App(){
//     let evData = eventsData[0];
//     console.log("TCL: App -> evData", evData);
    
//     return(
//             <div>

//             </div>
//     ) 
// }

class App2 extends Component {

    state ={
        offsetMonth: 0,
        selectWeekMonthPanel: false,
        monthView: true,
        startWeekDay: moment().startOf('week'),
        daySelected: null
    }

    
    nameDays = ['S','M','T','W','T','F','S'];  //дни недели
    weekData=[];
    headerData = [];    
    eventsData = eventsData;
    

        renderMonth = (offset) => {           
            //let currMonth=moment();
            
            
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
                    ev: this.checkEvents(offset,numDay,eventsData)
                });  
            };    
            this.headerData.push(moment().add(offset-1, 'month').format('MMM'));
            this.headerData.push(moment().add(offset, 'month').format('MMMM').toLocaleUpperCase());
            this.headerData.push(moment().add(offset+1, 'month').format('MMM'));  
            this.headerData.push("");      



        };
        renderWeek = (offset) => {
            
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
                    name: numDay++ ,                 
                    wd: (i===0 || i===6 ) ? true : false ,                 
                    ev: this.checkEvents(offset,numDay,eventsData)
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
        checkEvents = (offset,numDay,eventsData) => {
        
        let dates = moment().add(offset,'month').startOf('month').add(numDay-2,'day') ;      
        
        let eventForDate = eventsData.filter((obj) =>obj.date===dates.format("DD.MM.YYYY"));
        let eventArr=[];
        let i=0;
        eventForDate.map(()=>{
            i++%2 ?  eventArr.push("aquamarine") :  eventArr.push("grey")
        });

                     
                     
            return (
                eventArr
               
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

                if (tmp>=4 && tmp<=6)  tmp2 = this.state.offsetMonth+1;
                let m1=this.state.startWeekDay.clone().add(7,'day').month();
                let m2 = this.state.startWeekDay.month();
                if(tmp>6 && tmp <10)
                    if ( m1>m2){
                        tmp2 = this.state.offsetMonth+1 ; 
                        console.log("TCL: App2 -> nextWeek -> this.state.offsetMonth", 
                        this.state.offsetMonth, ":   tmp2=",tmp2);
                        
                    }
                            
            this.setState({
                offsetMonth: tmp2 ,
                daySelected: null,
                startWeekDay: this.state.startWeekDay.add(7, 'day')
            });
            
              
        };
        prevWeek = () => {

            let tmp2 = this.state.offsetMonth;
            let tmp = this.state.startWeekDay
                .clone()
                .startOf('week')
                .date();
                

            if (tmp>2 && tmp <4)  tmp2 = this.state.offsetMonth-1;
            let m1=this.state.startWeekDay.clone().add(-7,'day').month();
            let m2 = this.state.startWeekDay.month();
            if(tmp!==7 /*|| tmp!==??*/)
                if ( m1<m2){
                    tmp2 = this.state.offsetMonth-1 ; 
                    console.log("TCL: App2 -> nextWeek -> this.state.offsetMonth", 
                    this.state.offsetMonth, ":   tmp2=",tmp2);
                    
                }
            
            this.setState({
                offsetMonth: tmp2 ,
                daySelected: null,
                startWeekDay: this.state.startWeekDay.add(-7, 'day')
            });

        };

        nextMonth = () => { 

            this.setState({
                daySelected: null,
                offsetMonth: this.state.offsetMonth+1
            });
        };
        prevMonth = () => {
            
            this.setState({
                daySelected: null,
                offsetMonth: this.state.offsetMonth-1
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
        
    render(){
        
    this.state.monthView?  this.renderMonth(this.state.offsetMonth) :
                           this.renderWeek(this.state.offsetMonth) ;

    const dataHeader = [this.headerData,
                        this.state.monthView? this.nextMonth : this.nextWeek,
                        this.state.monthView? this.prevMonth : this.prevWeek,                        
                        this.state.selectWeekMonthPanel,
                        this.arrowClick]; 

    const selectWeekMonth_data =[this.state.selectWeekMonthPanel,this.monthSelect,this.weekSelect];
     
    const OverflowClazz =  this.state.selectWeekMonthPanel ?   "overflow ovf1" : "overflow"  ;                 
    
    const eventsData = [this.eventsData,this.state.offsetMonth, this.state.daySelected];

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
                    <ListEvents data = {eventsData} />
                </div>
        </div>
    );

    }
}
export default App2;