import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import Admin from './admin'
import Battlefield from './battlefield'




class App extends Component {    

    renderAdmin = () => {
        return (
            <Admin />
        )
    }

    renderBattlefield = () => {
      return (
        <Battlefield />
      )
    }


    render = () => {
        return (
            <Router>
                <Switch>
                    <Route path="/admin" component={this.renderAdmin} />
                    <Route path="/" component={this.renderBattlefield}/>
                </Switch>
            </Router>
        )
    }
}
export default App;