import React from 'react';
// import ReactDOM from 'react-dom';


const EventItem = ({data})=> {
    
    let clazz = "events_for ev"+data.ev.length;
    let key=1000;
    return (        
        <div class={clazz} >
            {data.ev.map(function (item) {   
                         
                clazz = "line "+item;

                return <div key = {key++} class = {clazz}></div> ;
            })}
        </div>        
    );
};

export default EventItem;