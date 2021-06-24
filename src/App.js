import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Gamearea from './components/Gamearea';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



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
                    </Switch>

                </Router>
            </div>

        )
    }

}

export default App;
