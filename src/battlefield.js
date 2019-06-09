import React, { Component } from 'react'
import Users from './users'
import Players from './players'
import Bossman from './bossLive'
import Playcard from './playcard'
// import Hand from './hand'



export default class Battlefield extends Component {

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

    componentDidMount = async (a) => {
        try {
            const res = await fetch('http://localhost:8888/users')
            const user = await res.json()
            this.setState({ users: user })
        }
        catch (err) {
            console.log(err)
        }
    }

    renderBoss = () => {
        if (this.state.users) {
            this.state.users.filter((boss) => { return boss.type === 'boss' })
                .map((boss) => <Bossman
                    name={boss.nameInProgress}
                    hp={boss.healthInProgress}
                    image={boss.imageInProgress}
                />)

        }
    }

    renderPlayers = () => {
        this.componentDidMount();
        if (this.state.users) {
            return this.state.users.filter((user) => { return user.type === 'player' })
                .map((player, index) => <Players
                    selectPlayer={this.props.selectPlayerButton}
                    player={player}
                    key={index}
                />)
        }
    }


    // renderUsers = () => {
    //     if (this.state.user.nameInProgress) {
    //         return this.state.user.map(
    //             (user) => (
    //                                      <Users key={this.props.state.user.nameInProgress} name={this.props.state.user.nameInProgress} image={this.props.state.user.imageInProgress} health={this.props.state.user.healthInProgress} type={this.props.state.user.type} />
    //             ))
    //     }


    render = () => {
        return (
            <div className="ml-1 mr-1">
                <h3 className="d-flex justify-content-center">Players</h3>
                <div className="d-flex justify-content-around">
                    {this.renderPlayers()}
                </div>
                <div className="container d-flex justiy-content-between border rounded" >
                    <div className="container">
                        <Users
                            key={this.props.state.user.nameInProgress}
                            name={this.props.state.user.nameInProgress}
                            image={this.props.state.user.imageInProgress}
                            health={this.props.state.user.healthInProgress}
                            type={this.props.state.user.type}
                        />
                    </div>
                    <div className="container">
                        <Playcard
                            state={this.props.state}
                        />
                    </div>
                    <div className="container">
                        <Bossman
                            key={this.props.state.boss._id}
                            name={this.props.state.boss.nameInProgress}
                            image={this.props.state.boss.imageInProgress}
                            health={this.props.state.boss.healthInProgress}
                        />
                    </div>
                </div>
                <div>
                    {this.props.renderHand()}
                </div>
            </div>
        )
    }
}