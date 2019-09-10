import React from 'react';
// import ReactDOM from 'react-dom';

const Header =({headerData})=>{
console.log("TCL: Header -> headerData", headerData)





    return (
        <div className="header">             
                <div className="current"><div className="currentCenter">{headerData[1]}</div>            
                  <div className="arrow">
                    <img className="arrowImg" 
                         src={"arrow.png"}
                         onClick="myArrowClick()"
                         alt=".png">
                    </img>
                  </div>
                  <div className="prev" onClick="prevMonth()">{headerData[0]}</div>
                  <div className="next">{headerData[2]}</div>
                </div>
              </div> 
    );
};

export default Header;