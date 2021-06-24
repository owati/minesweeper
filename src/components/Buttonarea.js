import React, { Component } from 'react';
import Button from './Button'
import { countAround, numMap } from '../functions/generatemines'
import '../css/Buttonarea.css'

class Buttonarea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeCount: 0,
            didMount: false
        }
    }

    render() { 
        let list = []
        for (let i = 0; i < this.props.limit; i++) {
            let list2 = []
            for (let j = 0; j < this.props.limit; j++) {
                let id = `${i < 10 ? i : numMap[`${i}`]}${j < 10 ? j : numMap[`${j}`]}`
                if (this.props.opened.includes(id)) {
                    list2.push(<Button
                        key={id} id={id}
                        func={this.props.butClick}
                        disabled={true}
                        value={countAround(id, this.props.limit, this.props.mines)}
                    />)
                } else {
                    list2.push(<Button key={id} id={id} func={this.props.butClick} disabled={false} />)
                }

            }
            list.push(<div id="i" className="row align-items-center">{list2}</div>)
        }

        return (
            <div className="container h-100 bewocBody">
                <div className="game-area">
                    {list}
                </div>
            </div>
        )
    


    }

}
export default Buttonarea;