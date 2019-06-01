import React, { Component, Fragment } from 'react';
let cards = require('./cards.json')

export default class Hand extends Component {

    state = {
        card: {
            title: '',
            image: '',
            description: '',
            damage: true,
            value: 0
        },
        hand: []
    }

    drawCard = async (cE, i) => {
        const randomCard = cards[Math.floor(Math.random() * cards.length)]
        await this.setState({
            card: {
                title: randomCard.title,
                image: randomCard.image,
                description: randomCard.description,
                damage: randomCard.damage,
                value: randomCard.value
            }
        })
        await this.addCardToHand()
    }

    addCardToHand = () => {
        const hand = this.props.hand
        const card = this.state.card
        hand.push(card)
    }

    render = () => {
        return (
            <Fragment>
                <div>
                    <h2>Selected card:</h2>
                    <button onClick={this.drawCard}>Draw</button>
                    <h2>{this.state.card.title}</h2>
                    <img src={this.state.card.image} alt={this.state.card.title} />
                    <p>{this.state.card.description}</p>
                    <ul>{this.state.card.value}</ul>
                </div>
                <div>
                    <h1>Hand</h1>
                    <option>
                        
                    </option>
                </div>
            </Fragment>
        )
    }
}