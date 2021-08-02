import React, {useState}from 'react';
import Footer from '../components/Footer';
import '../css/Signup.css';
import { API_URL } from '../functions/generatemines';


var data = []

function Signup() {
    const [formField, setForm] = useState({})

    function  register() {
        if(formField.nickname && formField.pass1){
            fetch(API_URL + 'signup', 
            {
                method: 'POST',
                body: JSON.stringify(formField),
                headers: {
                    'Content-type': 'application/json;charset-UTF-8'
                }
            })
            .then((response)=> response.json())
            .then(()=> window.location.replace('/minesweeper/#/login'))
        }
        
    }

    function onFieldChange(event, type){
        let value = event.target.value
        let errorArray = document.getElementsByClassName('errors')
        
        let formD = formField
  
        if(type == 'nickname'){
            fetch(API_URL + 'signup')
            .then((response)=> response.json())
            .then((res) => { data = res })
            .catch(()=> {data = []} )
            if(value.length === 0 || value.length < 3 || value.length > 11 || data.includes(value)){
                if(value.length === 0) errorArray[0].innerHTML = "&#9888; please fill this field"

                else if(value.length < 3) errorArray[0].innerHTML = "&#9888; nickname too short";
    
                else if(value.length > 13) errorArray[0].innerHTML="&#9888; nickname to long";
    
                else if(data.includes(value)) errorArray[0].innerHTML="&#9888; this name already exist";

                formD[type] = null
                setForm(formD)
            }


            else {
                errorArray[0].innerHTML="✅"
                formD[type] = value
                setForm(formD)
            }
        }

        else if(type == 'pass1'){
            if(value.length === 0 || value.length < 3){
                if(value.length === 0) errorArray[1].innerHTML = "&#9888; please fill this field";

                else if(value.length < 3) errorArray[1].innerHTML = "&#9888; password too short";
                formD[type] = null
                setForm(formD)
            }
            else {
                errorArray[1].innerHTML="✅"
                formD[type] = value
                setForm(formD)
            }
        }

        else if(type == 'pass2'){
            if(value !== formField['pass1']) errorArray[2].innerHTML = "&#9888; passwords not the same";
            else errorArray[2].innerHTML="✅";
        }
    }
    return (
        <div>
            <div className="flop2">
                <div className='reg-form'>
                    <div className="header"><h3>Login you account </h3></div>

                    <div className="flex-row1">
                        <div className="input-div">
                        <input type="text" placeholder="nickname" id="name" required="required" onChange={(event)=> {onFieldChange(event, "nickname")}}/>
                        <p className="errors"></p>
                        </div>
                        
                    </div>
                    <div className="flex-row">
                        <div className="input-div">
                        <input type="password" placeholder="password" id="name" required="required" onChange={(event)=>{onFieldChange(event, 'pass1')}}/>
                        <p className="errors"></p>
                        </div>
                        <div className="input-div">
                        <input type="password" placeholder="confirm password" id="password" id="password" onChange={(event)=>{onFieldChange(event, 'pass2')}}/>
                        <p className="errors"></p>
                        </div>
                        
                    </div>


                    <button className="login-but grow shadow-5" onClick={register}> Register </button>
                    <div><h5>already have an account ? click here</h5></div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Signup;