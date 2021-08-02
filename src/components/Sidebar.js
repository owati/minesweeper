import React from 'react';
import '../css/Sidebar.css';

function Sidebar(props) {
    let state;
    state = props.user.name ? [props.user.nick_name, ''] :['Guest', 'disabled']
    
    return (
        <div className="sidenav" id="mySidenav">
            <p className="navTit"> Welcome {state[0]}😊</p>
            <a href="javascript:void(0)" class="closebtn" onClick={props.close}>&times;</a>
            <a href="#">My Account</a>
            <a href="/minesweeper/#/">Home</a>
            <hr/>
            <a href="/minesweeper/#/signup">sign up</a>
            <a href="/minesweeper/#/login">login</a>
        </div>

  


    )

}

export default Sidebar;