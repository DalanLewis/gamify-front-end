import React, { Component, Fragment, } from 'react'
import Player from './player'
import Boss from './boss'

export default class Admin extends Component {

    //submit for boss
    submitBoss = async () => {
        try {
            await fetch('http://localhost:8888/users', {
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
            await fetch('http://localhost:8888/users', {
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

    submitCardsToDraw = async () => {
        const id = this.props.state.user._id;
        if (this.props.state.user.nameInProgress !== 'No Player Selected') {
            try {
                await fetch('http://localhost:8888/users/' + id, {
                    method: 'put',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(this.props.state.user)
                }) 
                console.log(this.props.state.user)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    render = () => {
        return (
            <Fragment>
                <Boss bossHpInProgress={this.props.bossHpInProgress} bossImageInProgress={this.props.bossImageInProgress} bossNameInProgress={this.props.bossNameInProgress} submitBoss={this.submitBoss} />
                <Player playerNameInProgress={this.props.playerNameInProgress} playerImageInProgress={this.props.playerImageInProgress} submitPlayer={this.submitPlayer} />
                <h2>SetCardDraw</h2>
                <select onChange={this.props.selectPlayer}>
                    <option value={null}>Select Player</option>
                    {this.props.renderDropdown('admin')}
                </select>
                <br />
                <input type="number" size="60" placeholder="How many Cards will be drawn?" onChange={this.props.setCardsToDraw} />
                <button onClick={this.submitCardsToDraw}>{this.props.state.user.nameInProgress} draws {this.props.state.user.draws}</button>
            </Fragment>
        )
    }
}