import React from 'react';
// import ReactDOM from 'react-dom';


const CalendarDays = ({days}) => {
    let key = 500;
    const elems = days.map((item)=>{
        return  <div key={key++} class="calendar__day">{item}</div>;        
    });   
    
    
    return ( 
        <div class="calendar__days"> 
           {elems}
        </div>
    );
};

export default CalendarDays;