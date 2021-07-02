import React from 'react';
import '../css/Footer.css';
import home from '../assets/home.png';
import board from '../assets/board.png';
import newgame from '../assets/newgame.png';
import save from '../assets/save.png';
import github from '../assets/github.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';

function Footer(props) {
    if (props.game) {
        return (
            <footer>
                <div className="footer-text">
                    <h5><strong>Owati</strong>  &copy;{new Date().getFullYear()}</h5>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-between align-items-center social">
                        <a href="https://github.com/owati/minesweeper">
                            <img src={github} height="30" width="30" ></img>
                        </a>
                        <a>
                            <img src={facebook} height="30" width="30" ></img>
                        </a>
                        <a>
                            <img src={twitter} height="30" width="30" ></img>
                        </a>
                        </div>
                    </div>

                </div>

                <div className="bottom-nav">
                    <div>
                        <a className="grow" href="javascript:void(0)" onClick={props.func.newgame}>
                            <img src={newgame} height="50" width="50" className="grow"></img>
                        </a>

                    </div>
                    <div>
                        <a className="grow" href="javascript:void(0)" onClick={props.func.save}>
                            <img src={save} height="50" width="50" className="grow"></img>
                        </a>


                    </div>
                    <div>
                        <a className="grow" href="javascript:void(0)" onClick={props.func.home}>
                            <img src={home} height="50" width="50" className="grow"></img>
                        </a>

                    </div>
                    <div>
                        <a className="grow" href="javascript:void(0)">
                            <img src={board} height="50" width="50" className="grow"></img>
                        </a>

                    </div>



                </div>

            </footer>
        )
    } else {
        return (
            <footer>
                <div className="footer-text2">
                    <h5><strong>Owati</strong>  &copy;{new Date().getFullYear()}</h5>
 
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-between align-items-center social">
                        <a href="https://github.com/owati/minesweeper">
                            <img src={github} height="30" width="30" ></img>
                        </a>
                        <a>
                            <img src={facebook} height="30" width="30" ></img>
                        </a>
                        <a>
                            <img src={twitter} height="30" width="30" ></img>
                        </a>
                        </div>
                    </div>

                </div>
            </footer>
        )

    }

}

export default Footer;