import React from 'react';
import '../css/Sidebar.css';

function Sidebar(props) {
    return (
        <div className="sidenav" id="mySidenav">
            <p className="navTit"> Welcome {props.name}😊</p>
            <a href="javascript:void(0)" class="closebtn" onClick={props.close}>&times;</a>
            <a href="#">My Account</a>
            <a href="/minesweeper">Home</a>
            <hr/>
            <a href="#">sign up</a>
            <a href="/minesweeper/#/login">login</a>
        </div>

  


    )

}

export default Sidebar;