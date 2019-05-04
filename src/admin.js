import React, { Component } from 'react'

export default class Admin extends Component {

    state = {
        boss: {
            nameInProgress: '',
            imageInProgress: '',
            healthInProgress: 0
        },
        player: {
            nameInProgress: '',
            imageInProgress: '',
            playerHealth: 50
        }
    }
//boss params
    bossNameInProgress = (e) => {
        this.setState({
            boss: {
                nameInProgress: e.target.value,
                imageInProgress: this.state.boss.imageInProgress,
                healthInProgress: this.state.boss.healthInProgress
            }
        })
    }
    bossImageInProgress = (e) => {
        this.setState({
            boss: {
                nameInProgress: this.state.boss.nameInProgress,
                imageInProgress: e.target.value,
                healthInProgress: this.state.boss.healthInProgress
            }
        })
    }
    bossHpInProgress = (e) => {
        this.setState({
            boss: {
                nameInProgress: this.state.boss.nameInProgress,
                imageInProgress: this.state.boss.imageInProgress,
                healthInProgress: e.target.value
            }
        })
    }
//player params
    playerNameInProgress = (e) => {
        this.setState({
            player: {
                nameInProgress: e.target.value,
                imageInProgress: this.state.player.imageInProgress
            }
        })
    }
    playerImageInProgress = (e) => {
        this.setState({
            player: {
                nameInProgress: this.state.player.nameInProgress,
                imageInProgress: e.target.value
            }
        })
    }
//submit for boss
    submitBoss = async (e) => {
        e.preventDefault()
        try {
        await console.log(this.state.boss)
        }
        catch (err) {
            console.log(err)
        }
    }
//submit for player
    submitPlayer = async (e) => {
        e.preventDefault()
        try{
            await console.log(this.state.player)
        }
        catch (err) {
            console.log(err)
        }
    }
 

    render() {
        <div>
            <section>
                <form>
                    <h1>New Boss</h1>
                    <span>Name: <input onChange={this.bossNameInProgress} size="20" type="text" value={this.state.boss.nameInProgress}/></span>
                    <span>Image URL: <input onChange={this.bossImageInProgress} size="20" type="url" value={this.state.boss.imageInProgress}/></span>
                    <span>Total HP: <input onChange={this.bossHpInProgress} size="20" type="number" value={this.state.boss.bossHpInProgress}/></span>
                </form>
                <button>Create New Boss</button>
            </section>
            <section>
                <form>
                    <h1>New Player</h1>
                    <span>Name: <input onChange={this.playerNameInProgress} size="20" type="text" value={this.state.player.nameInProgress}/></span>
                    <span>Image URL: <input onChange={this.playerImageInProgress} size="20" type="url" value={this.state.player.imageInProgress}/></span>
                </form>
                <button>Create New Player</button>
            </section>
        </div>
    }
}