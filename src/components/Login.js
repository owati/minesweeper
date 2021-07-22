import React from 'react';
import '../css/Login.css';
import { API_URL } from '../functions/generatemines';
import Footer from './Footer';


function Login(props) {
    let loginFunc = () => {
        let nameInput = document.getElementById('name')
        let passInput = document.getElementById('password')

        if(nameInput.value === '' || passInput.value === ''){
            document.getElementsByClassName('header')[0].innerHTML = "<h4>..incomplete form🙄..</h3>"
            setTimeout(()=>{
                document.getElementsByClassName('header')[0].innerHTML = "<h3>Login you account</h3>"

            }, 1500)
        } else {
            let data = {name: nameInput.value, pass: passInput.value}

            fetch(API_URL + 'login', {
                method: 'POST', 
                body: JSON.stringify(data),
                headers:{
                    'Content-type': 'application/json;charset-UTF-8'
                }
            })
            .then((response) => response.json())
            .then((data) =>{
        
                if(data.name){
                    props.func(data)
                    alert('Login successful')
                    window.location.replace('/minesweeper/#/')
                } else {
                    document.getElementsByClassName('header')[0].innerHTML = "<h3>..incorrect details🙄..</h3>"
                    nameInput.style.borderColor = 'red'
                    passInput.style.borderColor = 'red'
                    setTimeout(()=>{
                        document.getElementsByClassName('header')[0].innerHTML = "<h3>Login you account</h3>"
                        nameInput.style.borderColor = 'black'
                        passInput.style.borderColor = 'black'
                    }, 1500)
                }
                
            })
        }
    }
    return (
        <div>
            <div className="flop">
                <div className='login-form'>
                    <div className="header"><h3>Login you account </h3></div>
                    

                    <input type="text" placeholder="nickname" id="name" required="required"/>
                    <input type="password" placeholder="*********" id="password" id="password"/>

                

                    <button className="login-but grow shadow-5" onClick={loginFunc}> Login </button>
                    <div><h5>dont have an account ? click here</h5></div>
                </div>

            </div>
            <Footer />
        </div>
    )

}

export default Login