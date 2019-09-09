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


    const nameDays = ['S','M','T','W','T','F','S'];

    const weekData1=[];

    

    // console.log(numDay);
    

    function rendermonth(offset) {
        let currMonth=moment().add(offset, 'month');
        console.log(currMonth.format("MMM Do YY"));
        let currDay = moment().daysInMonth();
        console.log("TCL: rendermonth -> currDay", currDay)
        
        let startMonthDay = currMonth.startOf('month').day();//
        

        for(let i=0; i<startMonthDay;i++){
            weekData1.push({ name: '0' /*пустой div */})
        }

        let numDay=1;
        for(let i=0; i<moment().add(offset, 'month').daysInMonth();i++){           
            weekData1.push( { 
                name: numDay++ , 
                daySelected: false, 
                redPoint: false,
                wd:checkWd(startMonthDay,numDay),
                events: true, ev: ["aquamarine","grey","grey","aquamarine"]})
            
        
        }    
    };
    rendermonth(0);

        function checkWd(stMon,nDay){
             return ((stMon+nDay-1)%7 && (stMon+nDay-2)%7)==0? true:false ;
        }
    








    // const mom = moment('19760419').format("MMM Do YY");
    // console.log(mom);

    const weekData = [
        { name: '0' /*пустой div */},
        { name: '0' /*пустой div */},
        { name: '0' /*пустой div */},       
        { name: '1' ,  daySelected: true, redPoint: true, wd:true, events: true, ev: ["aquamarine","grey","grey","aquamarine"]},
        { name: '2' ,  daySelected: false, redPoint: false, wd:true, events: false, ev: 0},
        { name: '3' ,  daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '4' ,  daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '5' ,  daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '6' ,  daySelected: true, redPoint: false, wd:false, events: true, ev: ["aquamarine","grey","grey","aquamarine"]},
        { name: '7' ,  daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '8' ,  daySelected: false, redPoint: false, wd:true, events: false, ev: 0},
        { name: '9' ,  daySelected: false, redPoint: true, wd:true, events: false, ev: 0},
        { name: '10' , daySelected: false, redPoint: false, wd:false, events: true, ev: ["aquamarine","grey","grey","aquamarine"]},
        { name: '11' , daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '12' , daySelected: false, redPoint: false, wd:true, events: false, ev: 0},
        { name: '13' , daySelected: false, redPoint: false, wd:false, events: false, ev: 0}
        
    
    ];
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

    
    return(
        
        <div class="calendar noselect">                
                <Header />
                <SelectWeekMonth />    
                <div class="overflow">    
                        <CalendarDays days = {nameDays}/>
                        <CalendarListDate weekData= {weekData1}/>
                        <ListEvents data = {eventsData}/>
                </div>
        </div>
    );
};

export default App;