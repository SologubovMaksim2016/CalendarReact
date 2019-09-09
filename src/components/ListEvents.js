import React from 'react';
// import ReactDOM from 'react-dom';
import ListEventsItem from './ListEventsItem';


const ListEvents = ({data}) =>{

    let key=300;
    const elems = data.map((item) => {
        return (
            <div key = {key++} class="events">
            <div class="eventsName">PRACTICEEEE</div>
            <div class="timeEvents">11:00 AM</div>
            <div class="descritpionEvents">Sope Greek</div>
        </div>
        )
    });

    return(
        <div class="listEvents">
                <div class='dateEvents'> TUESDAY, 20 JUNE</div> 
                {elems}               
                {/* <div><ListEventsItem /></div>
                <div><ListEventsItem /></div>
                <div><ListEventsItem /></div>
                <div><ListEventsItem /></div> */}
        </div>
    );
};

export default ListEvents;