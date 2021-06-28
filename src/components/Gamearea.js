import React, { Component, useState, useEffect } from 'react';
import Levelset from './Levelset';
import '../css/Gamearea.css';
import { generateMines, countAround, zeroButtonArray, splitArray, remove } from '../functions/generatemines';
import Buttonarea from './Buttonarea';

const LevelMap = {
    easy: [7, 10],
    medium: [10, 8],
    hard: [14, 20]
}

var timerFunc, timeCount = 0

function Timer() {
    let [time, setTime] = useState(['00', '00'])

    useEffect(() => {
        timerFunc = setInterval(() => {
            let min = Math.floor(timeCount / 60)
            let sec = timeCount % 60

            let minWord = min < 10 ? `0${min}` : `${min}`
            let secWord = sec < 10 ? `0${sec}` : `${sec}`

            setTime([minWord, secWord])
            timeCount++
        }, 1000)

    }, [])


    return (
        <h1>{time[0]}:{time[1]}</h1>
    )
}



class Gamearea extends Component {
    constructor() {
        super()
        this.state = {
            level: 'easy',          // determines the game hardness level
            numOfBoxes: 7,          // show the length of the grid to be generated
            numOfError: 10,         // depicts the number of mines to be generated in the grid
            minesArray: [],         // stores the mines index numbers
            running: false,         // remains true while a game is being played
            openedButtons: [],      // stores the number of index numbers of already opened buttons
        }

    }

    buttonClick = (event) => {  // handles the event when a button is clicked
        let button = event.target // the object of the button being clicked

        if (this.state.running) { // do this if the a game is already being played
            if (this.state.minesArray.includes(button.id)) { // if the button being clicked is a mine
                alert(`you lost after ${timeCount} seconds`)
                this.setState({  // reset all original state
                    running: false,
                    openedButtons: [],
                    minesArray: [],
                })
                clearInterval(timerFunc)
                timeCount = 0

            } else {    // if the button is not a mine
                let num = (this.state.numOfBoxes ** 2) - this.state.numOfError
                if (!((this.state.openedButtons.length + 1) === num)) { // check if all non mine button has been opened, *if no
                    this.setState(state => {    // opened the number of opened buttons
                        let openedButtons
                        if (countAround(button.id, this.state.numOfBoxes, this.state.minesArray) === 0) {
                            openedButtons = state.openedButtons.concat(zeroButtonArray(button.id, this.state.numOfBoxes, this.state.minesArray).concat(button.id))

                        } else {
                            openedButtons = state.openedButtons.concat(button.id)
                        }

                        openedButtons = remove(openedButtons) // remove any repeated button id

                        return { openedButtons }
                    })
                } else {    // *if yes, declare the person a winner and reset all date ***********************************
                    alert(`you win !!  after ${timeCount} seconds`)
                    this.setState({  // reset all original state
                        running: false,
                        openedButtons: [],
                        minesArray: [],
                    })
                    clearInterval(timerFunc)
                    timeCount = 0
                }

            }

        } else {    // if the game is yet to begin

            this.setState(state => {
                const minesArray = generateMines(state.numOfError, state.numOfBoxes, button.id) // generate mines
                const running = true    // declare the game to begin
                const openedButtons = remove(state.openedButtons.concat(button.id, splitArray(button.id, this.state.numOfBoxes))) // update the opened button array

                return {
                    running,
                    minesArray,
                    openedButtons,
                }
            })
        }
    }


    setLevel = (event) => { // sets the hardness level of the game
        if (this.state.running) { // can not set it while a game is going on
            alert('a game is going on')
            event.target.value = this.state.level
        }
        else { // else, set the levels and the update the num of boxes and number of mines
            let levels = event.target.value
            this.setState({
                level: levels,
                numOfBoxes: LevelMap[levels][0],
                numOfError: LevelMap[levels][1],
            })

        }

    }

    render() {
        if (this.state.running) {
            return (
                <div>
                    <div className="d-flex justify-content-between align-items-center status">
                        <Levelset change={this.setLevel} />
                        <div><h4>{this.state.openedButtons.length}</h4></div>
                        <div className="timer d-flex justify-content-between align-items-center"><Timer /></div>
                    </div>


                    <div>
                        <Buttonarea
                            limit={this.state.numOfBoxes}
                            level={this.state.level}
                            butClick={this.buttonClick}
                            opened={this.state.openedButtons}
                            mines={this.state.minesArray}
                            running={this.state.running}
                        />

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="d-flex justify-content-between align-items-center status">
                        <Levelset change={this.setLevel} />
                        <div className="timer d-flex justify-content-between align-items-center"><h1>00:00</h1></div>
                        
                    </div>

                    <div>
                        <Buttonarea
                            limit={this.state.numOfBoxes}
                            level={this.state.level}
                            butClick={this.buttonClick}
                            opened={this.state.openedButtons}
                            mines={this.state.minesArray}
                            running={this.state.running}
                        />

                    </div>
                </div>
            )
        }


    }

}

export default Gamearea;