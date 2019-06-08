import React, { Component } from 'react'
import Users from './users'
import Players from './players'
import Bossman from './bossLive'
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
        boss: {

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
            <div className="ml-4 mr-4">

                <h3>Players</h3>
                <div className="d-flex justify-content-around">
                    {this.renderPlayers()}
                </div>

                {/* <select onChange={this.props.selectPlayer}>
                    <option value={null} className="container">Select Player</option>
                    {this.props.renderDropdown('battlefield')}
                </select> */}
                <Users
                    key={this.props.state.user.nameInProgress}
                    name={this.props.state.user.nameInProgress}
                    image={this.props.state.user.imageInProgress}
                    health={this.props.state.user.healthInProgress}
                    type={this.props.state.user.type}
                />

                <div>
                    {this.props.renderHand()}
                </div>
            </div>

        )
    }
}