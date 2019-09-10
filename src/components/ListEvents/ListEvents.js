import React from 'react';
// import ReactDOM from 'react-dom';
import ListEventsItem from '../ListEventsItem';


const ListEvents = ({data}) =>{

    let key=300;
    const elems = data.map((item) => {
        return (
            <div key = {key++} className="events">
            <div className="eventsName">PRACTICEEEE</div>
            <div className="timeEvents">11:00 AM</div>
            <div className="descritpionEvents">Sope Greek</div>
        </div>
        )
    });

    return(
        <div className="listEvents">
                <div className='dateEvents'> TUESDAY, 20 JUNE</div> 
                {elems}               
                {/* <div><ListEventsItem /></div>
                <div><ListEventsItem /></div>
                <div><ListEventsItem /></div>
                <div><ListEventsItem /></div> */}
        </div>
    );
};

export default ListEvents;