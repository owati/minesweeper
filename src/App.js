import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Howto from './components/Howto'
import Gamearea from './components/Gamearea';
import Sidebar from './components/Sidebar';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';




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
                <Router basename={process.env.PUBLIC_URL}>
                    <Navbar open={this.openNav} />
                    <Sidebar close={this.closeNav} />


                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/game/" exact component={() => <Gamearea />} />
                        <Route path="/how/" exact component={Howto} />
                    </Switch>

                </Router>
            </div>

        )
    }

}

export default App;
