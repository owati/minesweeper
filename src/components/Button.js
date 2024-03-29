import React from 'react';
import '../css/Button.css';


const Button = (props) => { 
    if(props.disabled){
        return <button className={"grow disabled gamebutton " + props.level} id={props.id}>{props.value === 0 ? '':props.value}</button>
    }
    else{
        return <button className={"grow gamebutton " + props.level} id={props.id} onClick={props.func}></button>
    }
}


      
export default Button;