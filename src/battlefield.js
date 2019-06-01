import React, { Component } from 'react'
import Users from './users'
import Hand from './hand'

export default class Battlefield extends Component {

    state = {
        user: {
            nameInProgress: '',
            imageInProgress: '',
            healthInProgress: '',
            type: ''
        },
        users: []
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

    // renderUsers = () => {
    //     if (this.state.user.nameInProgress) {
    //         return this.state.user.map(
    //             (user) => (
    //                                      <Users key={this.props.state.user.nameInProgress} name={this.props.state.user.nameInProgress} image={this.props.state.user.imageInProgress} health={this.props.state.user.healthInProgress} type={this.props.state.user.type} />
    //             ))
    //     }


    render = () => {
        return (
            <div>
                <h1>Players</h1>
                <select onChange={this.props.selectPlayer}>
                    <option value={null}>Select Player</option>
                    {this.props.renderDropdown('battlefield')}
                </select>
                <Users
                    key={this.props.state.user.nameInProgress}
                    name={this.props.state.user.nameInProgress}
                    image={this.props.state.user.imageInProgress}
                    health={this.props.state.user.healthInProgress}
                    type={this.props.state.user.type}
                />
                <div>
                    <br />
                    <br />
                    <Hand />
                </div>
            </div>

        )
    }
}