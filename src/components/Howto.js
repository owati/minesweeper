import React, { useState } from 'react';
import '../css/Howto.css'
import Footer from './Footer';

var slidenum = 0

const slideMap = [
    `
    you are given a field of boxes with mines scattered around within it,
    when a box is opened, it tells you how many mines are hidden in the 8 boxes around it.
    no number means the no mine is hidden around it.
    `,
    `
    using the numbers given as the boxes as they are opened, try and deduce the
    the boxes which are mines and which aren't mines. if you mistakenly open a mine,
    you lose.
    `,
    `
    when you have suceeded in opening all the unmined boxes without trigerring a single mine,
    you have won the game !. although you have to do this as fast as possible because your time is 
    being recorded and form your score.
    `
]


function Howto() {
    const [slidenum, setSlidenum] = useState(0)

    function next() {
        let num = slidenum + 1
        if ([1, 2].includes(num)) {
            setSlidenum(num)
        } else {
            if (num === 3) {
                setSlidenum(0)
            }
        }
    }


    function prev() {
        let num = slidenum - 1
        if ([0, 1].includes(num)) {
            setSlidenum(num)
        } else {
            if (num === -1) {
                setSlidenum(2)
            }
        }

    }
    return (
        <div>

            <div className="container h-100 bewocBody">
                
                <div className="row h-100 justify-content-center div-wrapper align-items-center home">
                    
                    <div className="col">
                        <div className="text">
                            <button className="btn btn-outline-success" onClick={prev}> prev </button>
                        </div>

                    </div>
                    <div className="col-9 howto">
                        <p> {slideMap[slidenum]} </p>
                    </div>
                    <div className="col">
                        <div className="text">
                            <button className="btn btn-outline-success" onClick={next}> next </button>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </div>

    )

}

export default Howto;