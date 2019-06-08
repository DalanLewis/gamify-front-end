import React, { Component, Fragment } from 'react'

export default class Card extends Component {

    render = () => {
        return (
            <Fragment>
                <div>
                    <button onClick={this.props.selectCard} value={this.props.card.title}>
                        {this.props.card.title} {this.props.card.value}
                        {/* <img src={this.props.card.image} alt={this.props.card.title} />
                    <p>{this.props.card.description}</p> */}
                        {/* <h3>{this.props.card.value}</h3> */}
                    </button>
                </div>
            </Fragment>
        )
    }
}