import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Howto from './components/Howto'
import Gamearea from './components/Gamearea';
import Sidebar from './components/Sidebar';
import Savedgames from './components/Savedgames';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';




class App extends Component {
    constructor(){
        super()
        this.state = {
            login: false,
            user:{
                id:-1,
            }
        }
    }

    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

    loginUser = (data) => {
        this.setState({
            user: data
        })
    }

    render() {
        return (
            <div>
                <Router basename={process.env.PUBLIC_URL}>
                    <Navbar open={this.openNav} user={this.state.user}/>
                    <Sidebar close={this.closeNav} user={this.state.user}/>
                    <Switch>
                        <Route path="/" exact component={() => <Home user={this.state.user} />}  />
                        <Route path="/game/" exact component={() => <Gamearea user={this.state.user} />} />
                        <Route path='/game/:id/' exact component = {(props) => <Gamearea {...props} user={this.state.user}/> }/>
                        <Route path="/how/" exact component={Howto} />
                        <Route path='/saved/' exact component={() => <Savedgames user={this.state.user}/>}/>
                        <Route path='/signup/' exact component={Signup}/>
                        <Route path='/login/' exact component={() => <Login func={this.loginUser}/>}/>

                    </Switch>

                </Router>
            </div>

        )
    }

}

export default App;
