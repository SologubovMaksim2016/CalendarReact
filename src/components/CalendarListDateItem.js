import React from 'react';
import EventItem from './EventItem';
// import ReactDOM from 'react-dom';

const CalendarListDateItem = ({data})=> {


    function renderEvent(data) {
        return (            
        !data.events===true ? <div></div> : 
        <EventItem data = {data}/>        
        )};

   
                    
    const el1 = data.name ==='0' ? <div></div> :  
                <div class = {data.daySelected ? "dayWeek daySelected" : "dayWeek" }> 
                    <div class ={data.redPoint ? "redPoint " : "" }></div>
                    <div class = {data.wd ? "date wd" : "date"}>{data.name}</div>
                    {/*Структура событий в текущий день */}
                    
                    {renderEvent(data)}                    
                </div>
 ;

    // const clazz = {

    // };

    return (
        <>    
            {el1}
        </>
        
    );
};

export default CalendarListDateItem;