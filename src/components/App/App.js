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
        selectWeekMonthPanel: false
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


    rendermonth = (offset) => {
        console.log(this.eventsData);
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


    nextButton = () => { 

        this.setState({
            offsetMonth: ++this.state.offsetMonth
        });
    };
    prevButton = () => {
        
        this.setState({
            offsetMonth: --this.state.offsetMonth
        });
    };
    arrowClick = () => {
        this.setState({
            selectWeekMonthPanel: !this.state.selectWeekMonthPanel
        });
    };
    
     
    
    render(){
        
        const {offsetMonth,selectWeekMonthPanel} = this.state ;
        

        this.rendermonth(offsetMonth);


    const dataHeader = [this.headerData,
                            this.nextButton,
                            this.prevButton,                            
                            selectWeekMonthPanel,
                            this.arrowClick]; 

    const OverflowClazz =  selectWeekMonthPanel ?   "overflow1" : "overflow2"    ;               
    

    return(
       
        <div className="calendar noselect"> 
                <Header dataHeader= {dataHeader} />
                <SelectWeekMonth select = {selectWeekMonthPanel}/>    
                <div className={OverflowClazz}> 
                    <CalendarDays days = {this.nameDays} select = {selectWeekMonthPanel}/>
                    <CalendarListDate weekData= {this.weekData}/>
                    <ListEvents data = {this.eventsData} />
                </div>
        </div>
    );

    }
}

/*
const App = () =>{

    let offsetMonth = 0;
    const nameDays = ['S','M','T','W','T','F','S'];  //дни недели
    const weekData=[];
    const headerData = [];
    var eventsData= [
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

    function rendermonth(offset) {
        let currMonth=moment();

        console.log(currMonth.format("DD"));
        //let daysInMonth = moment().daysInMonth();
        
        
        let startMonthDay = moment().add(offset, 'month').startOf('month').day();//номер дня недели начала месяца
        for(let i=0; i<startMonthDay;i++){   //добавляем пустые ячейки 
            weekData.push({ name: '0'+i });
        }
        let numDay=1;  // начинаем отсчет с первого числа
        for(let i=0; i<moment().add(offset, 'month').daysInMonth();i++){           
            weekData.push( { 
                redPoint: checkRePoint(numDay,offset),
                daySelected: checkDaySel(numDay,offset), 
               
                name: numDay++ ,                 
                wd:checkWd(startMonthDay,numDay),
                events: true, ev: ["aquamarine","grey","grey","aquamarine"]})  
        }    
        headerData.push(moment().add(offset-1, 'month').format('MMM'));
        headerData.push(moment().add(offset, 'month').format('MMMM').toLocaleUpperCase());
        headerData.push(moment().add(offset+1, 'month').format('MMM'));       



    };
        //указывает на текущую дату (неизменно )
        function checkRePoint( nDay, offset){   
            return   ( nDay=== moment().format('D')   &&  offset===0 )? true:false               
        }
        //указывает вначале на текущую дату (изменяется выбором  )
        function checkDaySel( nDay, offset){        
            return  ( nDay=== moment().format('D')   &&  offset===0 )? true:false 
        }
        // проверка выходного дня недели
        function checkWd(stMon,nDay){
             return ((stMon+nDay-1)%7 && (stMon+nDay-2)%7)===0? true:false ;
        }

     rendermonth(offsetMonth);


     function plusButton (){      

        rendermonth(++offsetMonth);
        console.log("TCL: plusButton -> offsetMonth", offsetMonth)
        
     }
     function minusButton (){      
           
        rendermonth(--offsetMonth);
        console.log("TCL: minusButton -> offsetMonth", offsetMonth)
     }
    
    
    return(
       
        <div className="calendar noselect">     
                 <button onClick = {minusButton}>-</button> <button onClick = {plusButton}>+</button>   
                <Header headerData = {headerData}/>
                <SelectWeekMonth />    
                <div className="overflow">    
                        <CalendarDays days = {nameDays}/>
                        <CalendarListDate weekData= {weekData}/>
                        <ListEvents data = {eventsData}/>
                </div>
        </div>
    );
};*/

export default App2;