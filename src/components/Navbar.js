import React from 'react';
import '../css/Navbar.css'

const Navbar = (props) => {
    return (

        <nav className="navbar navbar-light bg-secondary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Minesweeper</a>

                <div className="d-flex">
                    <button className="btn btn-outline-danger" onClick={props.open}>&#9776;</button>
                
                </div>
            </div>
        </nav>

    )
}

export default Navbar;