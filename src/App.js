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
      healthInProgress: null,
      hand: [],
      draws: null
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
  //set player params
  playerNameInProgress = (e) => {
    this.setState({
      user: {
        type: 'player',
        nameInProgress: e.target.value,
        imageInProgress: this.state.user.imageInProgress,
        healthInProgress: 100,
        hand: this.state.user.hand,
        draws: this.state.user.draws
      }
    })
  }
  playerImageInProgress = (e) => {
    this.setState({
      user: {
        type: 'player',
        nameInProgress: this.state.user.nameInProgress,
        imageInProgress: e.target.value,
        healthInProgress: 100,
        hand: this.state.user.hand,
        draws: this.state.user.draws
      }
    })
  }

  setHand = () => {
    this.setState({
      user: {
        type: this.state.user.type,
        nameInProgress: this.state.user.nameInProgress,
        imageInProgress: this.state.user.imageInProgress,
        healthInProgress: this.state.user.healthInProgress,
        hand: [],
        draws: this.state.user.draws
      }
    })
  }

  removeCardFromHand = (e) => {
    if (e.length < this.state.user.hand.length) {
      this.setState({
        user: {
          _id: this.state.user._id,
          type: this.state.user.type,
          nameInProgress: this.state.user.nameInProgress,
          imageInProgress: this.state.user.imageInProgress,
          healthInProgress: this.state.user.healthInProgress,
          hand: e,
          draws: this.state.user.draws
        }
      })
    }
    this.updateHand();
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

  updateHand = async () => {
    const id = this.state.user._id;
    if (this.state.user.nameInProgress !== 'No Player Selected') {
        try {
            await fetch('http://localhost:8888/users/' + id, {
                method: 'put',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(this.state.user)
            })
            // console.log(this.props.state.user)
        }
        catch (err) {
            console.log(err)
        }
    }
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

  renderFullDropdown = () => {
    if (this.state.users) {
      return this.state.users
        .map((target) =>
          <Dropdown player={target} key={target._id} state={this.state} />
        )
    }
  }

  renderHand = () => {
    return (
      <Hand
        hand={this.state.user.hand}
        cardDidDraw={this.cardDidDraw}
        state={this.state}
        renderDropdown={this.renderFullDropdown}
        setHand={this.setHand}
        componentDidMount={this.componentDidMount}
        removeCardFromHand={this.removeCardFromHand}
      />
    )
  }

  selectPlayer = (e) => {
    let player = this.state.users.filter((player) => player.nameInProgress === e.target.value)
    if (e.target.value === 'Select Player') {
      this.setState({
        user: {
          type: null,
          nameInProgress: 'No Player Selected',
          imageInProgress: this.state.user.imageInProgress,
          healthInProgress: null,
          hand: this.state.user.hand,
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

  selectPlayerButton = (e) => {
    let player = this.state.users.filter((player) => player.nameInProgress === e.target.value)
    this.setState({
      user: player[0]
    })
    console.log(this.state)
  }

  componentDidUpdate = () => {
    console.log(this.state);
  }
  //draws
  setCardsToDraw = (e) => {
    this.setState({
      user: {
        _id: this.state.user._id,
        type: this.state.user.type,
        nameInProgress: this.state.user.nameInProgress,
        imageInProgress: this.state.user.imageInProgress,
        healthInProgress: this.state.user.healthInProgress,
        hand: this.state.user.hand,
        draws: e.target.value
      }
    })
  }

  cardDidDraw = () => {
    this.setState({
      user: {
        _id: this.state.user._id,
        type: this.state.user.type,
        nameInProgress: this.state.user.nameInProgress,
        imageInProgress: this.state.user.imageInProgress,
        healthInProgress: this.state.user.healthInProgress,
        hand: this.state.user.hand,
        draws: this.state.user.draws - 1
      }
    })
  }
  //render
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
        selectPlayerButton={this.selectPlayerButton}
        renderDropdown={this.renderDropdown}
        renderHand={this.renderHand}
        selectPlayer={this.selectPlayer}
        state={this.state}
        componentDidMount={this.componentDidMount}
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