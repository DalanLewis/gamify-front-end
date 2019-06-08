import React, { Component } from 'react'

export default class Users extends Component {

    render = () => {
        return (
            <div className="card">
                <div className="card-body d-flex" style={{ width: '27' }}>
                    <h2>{this.props.name}</h2>
                    <div>
                        {this.props.health}
                    </div>
                    <img src={this.props.image} alt={this.props.name} />
                </div>
            </div>
        )
    }
}