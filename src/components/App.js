import React from 'react';
// import ReactDOM from 'react-dom';


import Header from './Header';
import SelectWeekMonth from './SelectWeekMonth';
import CalendarDays from './CalendarDays';
import CalendarListDate from './CalendarListDate'
import ListEvents from './ListEvents';
import Moment from 'react-moment';
import moment from "moment";


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
            return   ( nDay== moment().format('D')   &&  offset==0 )? true:false               
        }
        //указывает вначале на текущую дату (изменяется выбором  )
        function checkDaySel( nDay, offset){        
            return  ( nDay== moment().format('D')   &&  offset==0 )? true:false 
        }

        function checkWd(stMon,nDay){
             return ((stMon+nDay-1)%7 && (stMon+nDay-2)%7)==0? true:false ;
        }

     rendermonth(offsetMonth);


    
    return(
       
        <div className="calendar noselect">     
                 <button>-</button> <button>+</button>   
                <Header headerData = {headerData}/>
                <SelectWeekMonth />    
                <div className="overflow">    
                        <CalendarDays days = {nameDays}/>
                        <CalendarListDate weekData= {weekData}/>
                        <ListEvents data = {eventsData}/>
                </div>
        </div>
    );
};

export default App;