import React from 'react';
// import ReactDOM from 'react-dom';

const SelectWeekMonth = ({select}) =>{

   
    return (
        !select? null:
        <div className="selectWeekMonth">
                <button className="but" onClick="weekClick()">This week</button>
                <button className="but" onClick="monthClick()">This month</button>
              </div>
    );
};

export default SelectWeekMonth;