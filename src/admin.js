import React, { Component, Fragment, } from 'react'
import Player from './player'
import Boss from './boss'
import Players from './players'

export default class Admin extends Component {

    //submit for boss
    submitBoss = async () => {
        try {
            await fetch('https://rain-gamify.herokuapp.com/users', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(this.props.state.user)
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    //submit for player
    submitPlayer = async () => {
        try {
            await fetch('https://rain-gamify.herokuapp.com/users', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(this.props.state.user)
            })
        }
        catch (err) {
            console.log(err)
        }
        this.props.componentDidMount()
    }

    deletePlayer = async () => {
        const id = this.props.state.user._id;
        try {
            await fetch('https://rain-gamify.herokuapp.com/users/' + id, {
                method: 'delete',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(this.props.state.user)
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    submitCardsToDraw = async () => {
        const id = this.props.state.user._id;
        if (this.props.state.user.nameInProgress !== 'No Player Selected') {
            try {
                await fetch('https://rain-gamify.herokuapp.com/users/' + id, {
                    method: 'put',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(this.props.state.user)
                })
                // console.log(this.props.state.user)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    renderPlayers = () => {
        this.props.componentDidMount();
        if (this.props.state.users) {
            return this.props.state.users.filter((user) => { return user.type === 'player' })
                .map((player, index) => <Players
                    selectPlayer={this.props.selectPlayerButton}
                    player={player}
                    key={index}
                />)
        }
    }

    render = () => {
        return (
            <Fragment>
                <div className="ml-1 mr-1" style={{ backgroundColor: '#ADADAD' }}>
                    <h3 className="d-flex justify-content-center">Players</h3>
                    <div className="d-flex justify-content-around">
                        {this.renderPlayers()}
                    </div>
                    <Boss bossHpInProgress={this.props.bossHpInProgress} bossImageInProgress={this.props.bossImageInProgress} bossNameInProgress={this.props.bossNameInProgress} submitBoss={this.submitBoss} />
                    <Player playerNameInProgress={this.props.playerNameInProgress} playerImageInProgress={this.props.playerImageInProgress} submitPlayer={this.submitPlayer} />
                    <div>
                        <button onClick={this.props.damageAllPlayers}>Damage All Players</button>
                    </div>
                    <h2>SetCardDraw</h2>
                    <select onChange={this.props.selectPlayer}>
                        <option value={null}>Select Player</option>
                        {this.props.renderDropdown('admin')}
                    </select>
                    <br />
                    <input type="number" size="60" placeholder="How many Cards will be drawn?" onChange={this.props.setCardsToDraw} />
                    <button onClick={this.submitCardsToDraw}>{this.props.state.user.nameInProgress} draws {this.props.state.user.draws}</button>
                    <div>
                        <h3>Delete</h3>
                        <select onChange={this.props.selectPlayer}>
                            <option value={null}>Select Character To Delete</option>
                            {this.props.renderFullDropdown()}
                        </select>
                        <button onClick={this.deletePlayer}></button>
                    </div>
                </div>
            </Fragment>
        )
    }
}