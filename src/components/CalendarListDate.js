import React from 'react';
// import ReactDOM from 'react-dom';
import CalendarListDateItem from './CalendarListDateItem';

const CalendarListDate = ({weekData})=> {
       let key=10;
    return (
        <div class="calendar__date">
                    {weekData.map(function (item) { 
                        return (                
                            <CalendarListDateItem key={key++} data={item}/>
                        )
                    })}
        </div> 
    );
};

export default CalendarListDate;


