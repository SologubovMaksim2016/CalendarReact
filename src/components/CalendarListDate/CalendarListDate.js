import React from 'react';
// import ReactDOM from 'react-dom';
import CalendarListDateItem from '../CalendarListDateItem';

const CalendarListDate = ({weekData, daySelected,onDaySelectedChange})=> {
// console.log("TCL: CalendarListDate -> weekData, daySelected", weekData, daySelected)

    // console.log("TCL: CalendarListDate -> weekData", weekData)
    let key=10;
    return (
        <div className="calendar__date">
                    {weekData.map(function (item) { 
                   
                    

                        return (                
                            <CalendarListDateItem 
                                key={key++} 
                                data={item} 
                                daySelected={daySelected}
                                onDaySelectedChange ={onDaySelectedChange}
                            />
                        )
                    })}
        </div> 
    );
};

export default CalendarListDate;


