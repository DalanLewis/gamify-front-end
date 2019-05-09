import React, { Component, Fragment } from 'react'
import Player from './player'
import Boss from './boss'

export default class Admin extends Component {

    state = {
        user: {
            type: '',
            nameInProgress: '',
            imageInProgress: '',
            healthInProgress: 0
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
                healthInProgress: 50
            }
        })
    }
    playerImageInProgress = (e) => {
        this.setState({
            user: {
                type: 'player',
                nameInProgress: this.state.user.nameInProgress,
                imageInProgress: e.target.value,
                healthInProgress: 50
            }
        })
    }

    //submit for boss
    submitBoss = async (e) => {
        e.preventDefault()
        try {
            await fetch('http://localhost:8888/users', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(this.state.user)
            })
            console.log(this.state.user)
        }
        catch (err) {
            console.log(err)
        }
    }
    //submit for player
    submitPlayer = async (e) => {
        e.preventDefault()
        try {
            await fetch('http://localhost:8888/users', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(this.state.user)
            })
            console.log(this.state.user)
        }
        catch (err) {
            console.log(err)
        }
    }

    componentDidMount = async (a) => {
        try {
            const res = await fetch('http://localhost:8888/users')
            const user = await res.json()
            console.log(user)
            this.setState({ users: user })
        }
        catch (err) {
            console.log(err)
        }
    }

    render = () => {
        return (
            <Fragment>
                <Boss bossHpInProgress={this.bossHpInProgress} bossImageInProgress={this.bossImageInProgress} bossNameInProgress={this.bossNameInProgress} submitBoss={this.submitBoss} />
                <Player playerNameInProgress={this.playerNameInProgress} playerImageInProgress={this.playerImageInProgress} submitPlayer={this.submitPlayer} />
                <section>
                    <form>
                        <h1>Set Card Draw</h1>
                    </form>
                </section>
            </Fragment>
        )
    }
}