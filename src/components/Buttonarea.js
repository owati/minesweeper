import React, { Component } from 'react';
import Button from './Button'
import { countAround, numMap } from '../functions/generatemines'
import '../css/Buttonarea.css'


var timeCounter = 0
class Buttonarea extends Component {
    constructor(props) {
        console.log('pol')
        super(props)
        this.state = {
            timeCount: 0,
        }
    }
    componentDidMount(){
        if(!this.props.running || this.props.start){
            console.log('yesah')
            this.timer = setInterval(() => {
                timeCounter++
                this.setState({
                    timeCount: timeCounter
                })
    
                if(this.state.timeCount === this.props.limit){
                    clearInterval(this.timer)
                    timeCounter = 0
                }
        
            },1000)
    

        }
       
    }

    render() {
        console.log(this.props.running, this.props.start)
        if (!this.props.running || this.props.start) {
            let count = this.props.start ? this.props.limit:this.state.timeCount
            
            let list = []
            for (let i = 0; i < count; i++) {
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
                list.push(<div className="row align-items-center">{list2}</div>)
            }

            return (
                <div className="container h-100 bewocBody">
                    <div className="game-area">
                        { list }
                    </div>
                </div>
            )
        

        } else {
            console.log('yeah')
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

}
export default Buttonarea;