import React, { Component } from 'react'

export default class Users extends Component {

    render = () => {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <div>
                    {this.props.health}
                </div>
                <img src={this.props.image} alt={this.props.name} width='500px' height='500px'/>
            </div>
        )
    }
}