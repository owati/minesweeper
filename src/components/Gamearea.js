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
            level: 'easy',
            numOfBoxes: 7,
            numOfError: 10,
            minesArray: [],
            start: false,
            running: false,
            openedButtons: ['po'],
            time: [0, 0]
        }

    }

    buttonClick = (event) => {
        let button = event.target
        console.log(this.state.openedButtons.length)

        if (this.state.running) {
            if (this.state.minesArray.includes(button.id)) {
                alert('you loose')
                this.setState({
                    running: false,
                    start: false,
                    openedButtons: ['po'],
                    minesArray: []
                })

            } else {
                let num = (this.state.numOfBoxes ** 2) - this.state.numOfError
                console.log(num)
                if (!(this.state.openedButtons.length === num)) {
                    this.setState(state => {
                        let openedButtons
                        if (countAround(button.id, this.state.numOfBoxes, this.state.minesArray) === 0) {
                            openedButtons = state.openedButtons.concat(zeroButtonArray(button.id, this.state.numOfBoxes, this.state.minesArray).concat(button.id))

                        } else {
                            openedButtons = state.openedButtons.concat(button.id)
                        }

                        openedButtons = remove(openedButtons)

                        return { openedButtons }
                    })
                } else {
                    this.setState(state=>{
                        const openedButtons = state.openedButtons.concat(button.id)
                        const running = false
                        const start = false

                        return { openedButtons, running, start }
                    })
                    alert('you win')
                }

            }

        } else {

            this.setState(state => {
                const minesArray = generateMines(state.numOfError, state.numOfBoxes, button.id)
                const running = true
                const openedButtons = remove(state.openedButtons.concat(button.id,splitArray(button.id,this.state.numOfBoxes)))

                return {
                    running,
                    minesArray,
                    openedButtons
                }
            })
        }
    }


    setLevel = (event) => {
        if (this.state.running) {
            alert('a game is going on')
            event.target.value = this.state.level
        }
        else {
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

                        <br/>
                        <Buttonarea
                            limit={this.state.numOfBoxes}
                            butClick={this.buttonClick}
                            opened={this.state.openedButtons}
                            mines={this.state.minesArray}
                            running= {this.state.running}
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
                        <Timer running={this.state.running}/>


                        <br/>
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