import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Gamearea from './components/Gamearea';


class App extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                <Gamearea/>
            </div>

        )
    }

}

export default App;
