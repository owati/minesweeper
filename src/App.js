import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Howto from './components/Howto'
import Gamearea from './components/Gamearea';
import Sidebar from './components/Sidebar';
import Savedgames from './components/Savedgames';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';




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
                    <Navbar open={this.openNav} />
                    <Sidebar close={this.closeNav} name={this.state.user.id === -1 ? 'Guest' : this.state.user.nick_name}/>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/game/" exact component={() => <Gamearea />} />
                        <Route path='/game/:id/' exact component = {(props) => <Gamearea {...props}/> }/>
                        <Route path="/how/" exact component={Howto} />
                        <Route path='/saved/' exact component={Savedgames}/>
                        <Route path='/login/' exact component={() => <Login func={this.loginUser}/>}/>

                    </Switch>

                </Router>
            </div>

        )
    }

}

export default App;
