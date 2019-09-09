import React from 'react';
// import ReactDOM from 'react-dom';

import Header from './Header';
import SelectWeekMonth from './SelectWeekMonth';
import CalendarDays from './CalendarDays';
import CalendarListDate from './CalendarListDate'
import ListEvents from './ListEvents';


const App = () =>{
    const nameDays = ['S','M','T','W','T','F','S'];
    const weekData = [
        { name: '0' /*пустой div */},
        { name: '0' /*пустой div */},
        { name: '0' /*пустой div */},
        { name: '0' /*пустой div */},
        { name: '0' /*пустой div */},
        { name: '0' /*пустой div */},
        { name: '1' ,  daySelected: true, redPoint: true, wd:true, events: true, ev: ["aquamarine","grey","grey","aquamarine"]},
        { name: '2' ,  daySelected: false, redPoint: false, wd:true, events: false, ev: 0},
        { name: '3' ,  daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '4' ,  daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '5' ,  daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '6' ,  daySelected: false, redPoint: false, wd:false, events: true, ev: ["aquamarine","grey","grey","aquamarine"]},
        { name: '7' ,  daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '8' ,  daySelected: false, redPoint: false, wd:true, events: false, ev: 0},
        { name: '9' ,  daySelected: false, redPoint: false, wd:true, events: false, ev: 0},
        { name: '10' , daySelected: false, redPoint: false, wd:false, events: true, ev: ["aquamarine","grey","grey","aquamarine"]},
        { name: '11' , daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
        { name: '12' , daySelected: false, redPoint: false, wd:false, events: false, ev: 0},
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
                        <CalendarListDate weekData= {weekData}/>
                        <ListEvents data = {eventsData}/>
                </div>
        </div>
    );
};

export default App;