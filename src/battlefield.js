import React, { Component } from 'react'
import Users from './users'


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

    renderUsers = () => {
        if (this.state.users) {
            return this.state.users.map(
                (users) => (
                    <Users key={users.nameInProgress} name={users.nameInProgress} image={users.imageInProgress} health={users.healthInProgress} type={users.type} />
                ))
        }
    }


    render = () => {
        return (
            <div>
                <h1>Players</h1>
                {this.renderUsers()}
            </div>
        )
    }
}