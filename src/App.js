import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import Admin from './admin'
import Battlefield from './battlefield'
import Dropdown from './dropdown'
import Hand from './hand'

class App extends Component {

  state = {
    user: {
      _id: '',
      type: '',
      nameInProgress: '',
      imageInProgress: '',
      healthInProgress: 0,
      cards: [],
      draws: 0
    },
    users: []
  }

  //boss params
  bossNameInProgress = (e) => {
    this.setState({
      user: {
        type: 'boss',
        nameInProgress: e.target.value,
        imageInProgress: this.state.user.imageInProgress,
        healthInProgress: this.state.user.healthInProgress
      }
    })
  }
  bossImageInProgress = (e) => {
    this.setState({
      user: {
        type: 'boss',
        nameInProgress: this.state.user.nameInProgress,
        imageInProgress: e.target.value,
        healthInProgress: this.state.user.healthInProgress
      }
    })
  }
  bossHpInProgress = (e) => {
    this.setState({
      user: {
        type: 'boss',
        nameInProgress: this.state.user.nameInProgress,
        imageInProgress: this.state.user.imageInProgress,
        healthInProgress: e.target.value
      }
    })
  }
  //player params
  playerNameInProgress = (e) => {
    this.setState({
      user: {
        type: 'player',
        nameInProgress: e.target.value,
        imageInProgress: this.state.user.imageInProgress,
        healthInProgress: 50,
        cards: this.state.cards,
        draws: this.state.draws
      }
    })
  }
  playerImageInProgress = (e) => {
    this.setState({
      user: {
        type: 'player',
        nameInProgress: this.state.user.nameInProgress,
        imageInProgress: e.target.value,
        healthInProgress: 50,
        cards: this.state.cards,
        draws: this.state.draws
      }
    })
  }

  userFetch = async () => {
    try {
      const res = await fetch('http://localhost:8888/users')
      const users = await res.json()
      this.setState({ users })
    }
    catch (err) {
      console.log(err)
    }
  }

  componentDidMount = () => {
    this.userFetch()
  }

  renderDropdown = (src) => {
    if (this.state.users) {
      return this.state.users
        .filter((user) => { return user.type === 'player' })
        .map((player) =>
          <Dropdown src={src} player={player} key={player._id} />
        )
    }
  }

  renderHand = () => {
    if (this.state.user.cards) {
      return this.state.user.cards
      .map((hand) => 
        <Hand 
        hand={this.state.cards}
        />
      )
    }
  }

  selectPlayer = (e) => {
    let player = this.state.users.filter((player) => player.nameInProgress === e.target.value)
    if (e.target.value === 'Select Player') {
      this.setState({
        user: {
          type: 'boss',
          nameInProgress: 'No Player Selected',
          imageInProgress: this.state.user.imageInProgress,
          healthInProgress: 50,
          cards: this.state.cards,
          draws: this.state.draws
        }
      })
    }
    else {
      this.setState({
        user: player[0]
      })
    }
  }

  // componentDidUpdate = () => {
  //   console.log(this.state.user);
  // }

  setCardsToDraw = (e) => {
    this.setState({
      user: {
        _id: this.state.user._id,
        type: this.state.user.type,
        nameInProgress: this.state.user.nameInProgress,
        imageInProgress: this.state.user.imageInProgress,
        healthInProgress: this.state.user.healthInProgress,
        cards: this.state.user.cards,
        draws: e.target.value
      }
    })
  }


  renderAdmin = () => {
    return (
      <Admin
        setCardsToDraw={this.setCardsToDraw}
        selectPlayer={this.selectPlayer}
        componentDidMount={this.componentDidMount}
        renderDropdown={this.renderDropdown}
        playerImageInProgress={this.playerImageInProgress}
        playerNameInProgress={this.playerNameInProgress}
        bossHpInProgress={this.bossHpInProgress}
        bossImageInProgress={this.bossImageInProgress}
        bossNameInProgress={this.bossNameInProgress}
        state={this.state}
      />
    )
  }

  renderBattlefield = () => {
    return (
      <Battlefield 
      renderDropdown={this.renderDropdown}
      selectPlayer={this.selectPlayer}
      state={this.state}
      />
    )
  }


  render = () => {
    return (
      <Router>
        <Switch>
          <Route path="/admin" component={this.renderAdmin} />
          <Route path="/" component={this.renderBattlefield} />
        </Switch>
      </Router>
    )
  }
}
export default App;