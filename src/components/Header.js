import React from 'react';
// import ReactDOM from 'react-dom';

const Header =()=>{
    return (
        <div class="header">             
                <div class="current"><div class="currentCenter">AUGUST</div>            
                  <div class="arrow">
                    <img class="arrowImg" 
                         src={"arrow.png"}
                         onclick="myArrowClick()"
                         alt=".png">
                    </img>
                  </div>
                  <div class="prev" onclick="prevMonth()">JUL</div>
                  <div class="next">SEP</div>
                </div>
              </div> 
    );
};

export default Header;