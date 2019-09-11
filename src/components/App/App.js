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
        startWeekDay: null,
        daySelected: null
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
                daySelected: this.checkDaySel(numDay,offset), 
               
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

        let startWeek = moment().add(offset, 'month').startOf('week');
        let endWeek = moment().add(offset, 'month').endOf('week');

        this.weekData=[];
        this.headerData=[];  

        let startMonthDay = moment().add(offset, 'month').startOf('month').day();//номер дня недели начала месяца
        
        let numDay = startWeek.date();  // начинаем отсчет с первого числа 
        for(let i=0; i<7;i++){           
            this.weekData.push( { 
                redPoint: this.checkRePoint(numDay,offset),
                daySelected: this.checkDaySel(numDay,offset),                
                name: numDay++ ,                 
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
            return   ( nDay=== moment().format('D')   &&  offset===0 )? true:false               
        };
        //указывает вначале на текущую дату (изменяется выбором  )
        checkDaySel= ( nDay, offset) => {     
            return  ( nDay=== moment().format('D')   &&  offset===0 )? true:false 
        };
        // проверка выходного дня недели
        checkWd =  (stMon,nDay) => {
             return ((stMon+nDay-1)%7 && (stMon+nDay-2)%7)===0? true:false ;
        };

        nextWeek = () => { 

            this.setState({
                offsetMonth: ++this.state.offsetMonth
            });
        };
        prevWeek = () => {
            
            this.setState({
                offsetMonth: --this.state.offsetMonth
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
        monthSelect =() => {
            this.setState({
                selectWeekMonthPanel: !this.state.selectWeekMonthPanel,
                monthView: true
            });
        };
        weekSelect =() => {
            this.setState({
                selectWeekMonthPanel: !this.state.selectWeekMonthPanel,
                monthView: false
            });
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
     
    const OverflowClazz =  this.state.selectWeekMonthPanel ?   "overflow ovf1" : "overflow"  ;  ;               
    

    return(
       
        <div className="calendar noselect"> 
                <Header dataHeader= {dataHeader} />
                <SelectWeekMonth select = {selectWeekMonth_data} />    
                <div className={OverflowClazz}> 
                    <CalendarDays days = {this.nameDays} select = {this.state.selectWeekMonthPanel}/>
                    <CalendarListDate weekData= {this.weekData}/>
                    <ListEvents data = {this.eventsData} />
                </div>
        </div>
    );

    }
}
export default App2;