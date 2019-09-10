import React from 'react';
import EventItem from '../EventItem';
// import ReactDOM from 'react-dom';

const CalendarListDateItem = ({data})=> {


    function renderEvent(data) {
        return (            
        !data.ev.length ? <div></div> : 
        <EventItem data = {data}/>        
    )};

   
                    
    const elem = data.name[0] ==='0' ? <div></div> :  
                <div className = {data.daySelected ? "dayWeek daySelected" : "dayWeek" }> 
                    <div className ={data.redPoint ? "redPoint " : "" }></div>
                    <div className = {data.wd ? "date wd" : "date"}>{data.name}</div>
                    {/*Структура событий в текущий день */}
                    
                    {renderEvent(data)}                    
                </div>
 ;

    // const clazz = {

    // };

    return (
        <>    
            {elem}
        </>
        
    );
};

export default CalendarListDateItem;