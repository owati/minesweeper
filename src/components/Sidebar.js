import React from 'react';
import '../css/Sidebar.css';

function Sidebar(props) {
    return (
        <div className="sidenav" id="mySidenav">
            <p className="navTit"> Minesweeper</p>
            <a href="javascript:void(0)" class="closebtn" onClick={props.close}>&times;</a>
            <a href="#">My Account</a>
            <a href="#">chatroom</a>
            <a href="#">events</a>
            <a href="#">contact us</a>
            <hr/>
            <a href="/register">sign up</a>
            <a href="#">login</a>
        </div>

  


    )

}

export default Sidebar;