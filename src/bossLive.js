import React, { Component } from 'react'

export default class Bossman extends Component {

    render = () => {
        return(
            <div>
                <h3>{this.props.name}</h3>
                <img src={this.props.image} alt={this.props.name}/>
            </div>
        )
    }
}