import React from 'react';
import '../css/Home.css';
import Footer from './Footer';

function Home() {
    return (
        <div>

            <div className="container h-100 bewocBody">
                <div className="row h-100 justify-content-center div-wrapper align-items-center home">

                    <a href="/game" className="btn mybtn button-div col-10 col-md-8 grow"> new game </a>
                    <a href="" className="btn mybtn button-div col-10 col-md-8 grow "> saved games </a>
                    <a href="" className="btn mybtn button-div col-10 col-md-8 grow"> settings </a>
                    <a href="/how" className="btn mybtn button-div col-10 col-md-8 grow "> how to play </a>


                </div>
            </div>

            <Footer/>
        </div>
    )

}

export default Home;