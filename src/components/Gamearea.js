import React, { Component, useState, useEffect } from 'react';
import Levelset from './Levelset';
import '../css/Gamearea.css';
import { generateMines, countAround, zeroButtonArray, splitArray, remove, SaveGame, API_URL, string_List, PlayedGame } from '../functions/generatemines';
import Buttonarea from './Buttonarea';
import Footer from './Footer';
import home from '../assets/home.png';
import board from '../assets/board.png';
import newgame from '../assets/newgame.png';
import save from '../assets/save.png';

const LevelMap = {
    easy: [7, 10],
    medium: [10, 20],
    hard: [14, 30]
}

let side_bar_open = false
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
    constructor(props) {
        super(props)
        this.state = {
            level: 'easy',          // determines the game hardness level
            numOfBoxes: 7,          // show the length of the grid to be generated
            numOfError: 10,         // depicts the number of mines to be generated in the grid
            minesArray: [],         // stores the mines index numbers
            running: false,         // remains true while a game is being played
            openedButtons: [],      // stores the number of index numbers of already opened buttons
        }
    }

    componentDidMount(){
        let id
        
        try {
            id =this.props.match.params.id
        } catch {
            id = -1
        }
        if (id !== -1) {
            fetch(API_URL + `savedgames/${this.props.user.id}/${id}`)
            .then((response) => response.json())
            .then((data) => {
                this.state = {
                    level: data.level,
                    numOfBoxes: LevelMap[data.level][0],
                    numOfError: LevelMap[data.level][1],
                    minesArray: string_List(data.mines_array),
                    openedButtons: string_List(data.opened_array),
                    running: true
                }
                this.setState(() => {
                    const level = data.level
                    const numOfBoxes = LevelMap[data.level][0]
                    const numOfError =  LevelMap[data.level][1]
                    const minesArray = string_List(data.mines_array)
                    const openedButtons = string_List(data.opened_array)
                    const running = true

                    return { level, numOfBoxes, numOfError, minesArray, openedButtons, running}
                })
                timeCount = data.time
                console.log(this.state)
            })  
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
                    PlayedGame(this.state.level, timeCount)
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

    sideButFunc = (event) => {
        let but = event.target
        let side_bar = document.getElementById('side-bar-id')
        if (side_bar_open) {
            side_bar.style.height = '70px'
            side_bar_open = false
            but.style.backgroundColor = '#6c757d'
        } else {
            side_bar.style.height = '350px'
            side_bar_open = true
            but.style.backgroundColor = '#4e5459'
        }
    }

    bottomNavFunctions = {
        home: () => {
            if (this.state.running) {
                alert('sorry a game is running')
            } else {
                window.location.replace('/minesweeper/#/')
            }
        },
        newgame: () => {
            this.setState({  // reset all original state
                running: false,
                openedButtons: [],
                minesArray: [],
            })
            clearInterval(timerFunc)
            timeCount = 0
        },
        save: () => {
            if (this.props.user.name) {
                if(this.state.running){
                    let name = prompt('enter the name of the game', '')
                    if (!name) {
                        alert('you must enter a name')
                    } else {
                        SaveGame(
                            this.state.minesArray,
                            this.state.openedButtons,
                            timeCount,
                            this.state.level,
                            name
                        )
                        this.setState({  // reset all original state
                            running: false,
                            openedButtons: [],
                            minesArray: [],
                        })
                        clearInterval(timerFunc)
                        timeCount = 0
                        alert('hurray your game has been saved.')
                    }
                } else {
                    alert('sorry no game is being played.')
                }

            } else {
                alert("you can't save until you login.")
            }
        }
    }

    render() {

        return (
            <div>
                <div className="d-flex justify-content-between align-items-center status">
                    <Levelset change={this.setLevel} value={this.state.level}/>
                    <div><h4>{this.state.openedButtons.length} / {this.state.numOfBoxes ** 2 - this.state.numOfError}</h4></div>
                    <div className="timer d-flex justify-content-between align-items-center">{this.state.running ? <Timer /> : <h1>00:00</h1>}</div>
                </div>


                <div className="side-bar" id='side-bar-id'>



                    <div className="butDiv"> <button className="sideBut grow shadow-5" onClick={this.sideButFunc}>&#9776;</button> </div>
                    <div className="butDiv"> <button className="sideBut" onClick={this.bottomNavFunctions.newgame}><img src={newgame} height="40" width="40"></img></button> </div>
                    <div className="butDiv"> <button className={"sideBut"}><img src={save} height="40" width="40" onClick={this.bottomNavFunctions.save}></img></button> </div>
                    <div className="butDiv"> <button className="sideBut"><img src={home} height="40" width="40" onClick={this.bottomNavFunctions.home}></img></button> </div>
                    <div className="butDiv"> <button className="sideBut"><img src={board} height="40" width="40"></img></button> </div>

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
                <Footer game={true} func={this.bottomNavFunctions} user={this.props.user.name}/>
            </div>
        )
    }


}
export default Gamearea;