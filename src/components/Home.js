import React from 'react';
import '../css/Home.css';
import Footer from './Footer';

function Home(props) {
    let homeMessage, disabled;
    if(props.user.name){
        homeMessage = `welcome ${props.user.nick_name}😎`
        disabled = ''
    } else {
        homeMessage = 'welcome guest😊'
        disabled = 'disabled'
    }
    return (
        <div>

            <div className="container bewocBody">
                <div className="home-header"><h3>{homeMessage}</h3></div>
               
                <div className="row  justify-content-center div-wrapper align-items-center home">
                    <a href="/minesweeper/#/game/" className="btn mybtn button-div col-10 col-md-8 grow"> new game </a>
                    <a href="/minesweeper/#/saved/" className={"btn mybtn button-div col-10 col-md-8 grow "+ disabled}> saved games </a>
                    <a href="" className="btn mybtn button-div col-10 col-md-8 grow"> settings </a>
                    <a href="/minesweeper/#/how/" className="btn mybtn button-div col-10 col-md-8 grow "> how to play </a>


                </div>
            </div>

            <Footer/>

        </div>
    )

}

export default Home;