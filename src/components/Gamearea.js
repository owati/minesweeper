import React, { Component } from 'react';
import Levelset from './Levelset';
import '../css/Gamearea.css';
import { generateMines, countAround, zeroButtonArray, splitArray, remove } from '../functions/generatemines';
import Timer from './Timer';
import Buttonarea from './Buttonarea';

const LevelMap = {
    easy: [7, 10],
    medium: [10, 8],
    hard: [16, 20]
}



class Gamearea extends Component {
    constructor() {
        super()
        this.state = {
            level: 'easy',          // determines the game hardness level
            numOfBoxes: 7,          // show the length of the grid to be generated
            numOfError: 10,         // depicts the number of mines to be generated in the grid
            minesArray: [],         // stores the mines index numbers
            start: false,           // determins whether the is rendered with the time function
            running: false,         // remains true while a game is being played
            openedButtons: [],      // stores the number of index numbers of already opened buttons
        }

    }

    buttonClick = (event) => {  // handles the event when a button is clicked
        let button = event.target // the object of the button being clicked

        if (this.state.running) { // do this if the a game is already being played
            if (this.state.minesArray.includes(button.id)) { // if the button being clicked is a mine
                alert('you loose')
                this.setState({  // reset all original state
                    running: false,
                    openedButtons: [],
                    minesArray: [], 
                    start: false
                })

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
                    this.setState(state => {
                        const openedButtons = state.openedButtons.concat(button.id)
                        const running = false
                        const start = false

                        return { openedButtons, running, start }
                    })
                    alert('you win')
                }

            }

        } else {    // if the game is yet to begin

            this.setState(state => {
                const minesArray = generateMines(state.numOfError, state.numOfBoxes, button.id) // generate mines
                const running = true    // declare the game to begin
                const start = false
                const openedButtons = remove(state.openedButtons.concat(button.id, splitArray(button.id, this.state.numOfBoxes))) // update the opened button array

                return {
                    running,
                    minesArray,
                    openedButtons,
                    start
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
                start: true
            })

        }

    }

    render() {
        if (this.state.running) {
            return (
                <div>
                    <Levelset change={this.setLevel} />

                    <div>
                        <Timer running={this.state.running} />

                        <br />
                        <Buttonarea
                            limit={this.state.numOfBoxes}
                            butClick={this.buttonClick}
                            opened={this.state.openedButtons}
                            mines={this.state.minesArray}
                            running={this.state.running}
                            start={this.state.start}
                        />

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Levelset change={this.setLevel} />
                    <div>
                        <Timer running={this.state.running} />


                        <br />
                        <Buttonarea
                            limit={this.state.numOfBoxes}
                            butClick={this.buttonClick}
                            opened={this.state.openedButtons}
                            mines={this.state.minesArray}
                            running={this.state.running}
                            start={this.state.start}
                        />

                    </div>
                </div>
            )
        }


    }

}

export default Gamearea;