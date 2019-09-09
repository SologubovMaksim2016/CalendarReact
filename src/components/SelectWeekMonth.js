import React from 'react';
// import ReactDOM from 'react-dom';

const SelectWeekMonth = () =>{
    return (
        <div class="selectWeekMonth">
                <button class="but" onclick="weekClick()">This week</button>
                <button class="but" onclick="monthClick()">This month</button>
              </div>
    );
};

export default SelectWeekMonth;