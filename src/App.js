import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Howto from './components/Howto'
import Gamearea from './components/Gamearea';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';



class App extends Component {

    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar open={this.openNav} />
                    <Sidebar close={this.closeNav} />
                    <Switch>
                        <Route path="/" exact component={() => <Home />} />
                        <Route path="/game" exact component={() => <Gamearea/>} />
                        <Route path="/how" exact component={() => <Howto/>}/>
                    </Switch>
                    <Footer/>
                </Router>
            </div>

        )
    }

}

export default App;
