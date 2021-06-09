import React, { Component } from 'react';

var timeCount = 0
class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            timeValue: ['00', '00']
        }
    }
    componentDidMount() {
        console.log(this.props.running)
        if(this.props.running){
            console.log('yeah')
            this.timer = setInterval(() => {
                timeCount++
                this.setState(state => {
                    const time = timeCount
                    let min = Math.floor(timeCount / 60)
                    let sec = timeCount % 60
                    const timeValue = [min < 10 ? `0${min}` : min, sec < 10 ? `0${sec}` : sec]
    
                    return {
                        time,
                        timeValue
                    }
                }
                )
            }, 1000
            )

        }else{

        }

    }

    render() {
        return (
            <div className="tc">
                 <h1>{this.state.timeValue[0]}:{this.state.timeValue[1]}</h1>
            </div>
           
        )
    }

}

export default Timer;