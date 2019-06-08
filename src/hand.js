import React, { Component, Fragment } from 'react';
import Card from './card'
import Target from './target'
// import { arrayExpression } from '@babel/types';
let cards = require('./cards.json')


export default class Hand extends Component {

    state = {
        card: {
            title: null,
            image: '',
            description: '',
            damage: true,
            value: 0
        },
        user: {
            _id: '',
            type: '',
            nameInProgress: '',
            imageInProgress: '',
            healthInProgress: 0,
            hand: [],
            draws: 0
        }
    }


    //to api
    // componentDidMount = async (a) => {
    //     try {
    //         const res = await fetch('http://localhost:8888/users')
    //         const user = await res.json()
    //         // console.log(this.props)
    //         this.setState({ users: user })
    //         // console.log(this.state)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    // keepOldUser = () => {
    //     const target = 
    // }

    updateCardsAndDraws = async () => {
        const id = this.props.state.user._id;
        if (this.props.state.user.nameInProgress !== 'No Player Selected') {
            try {
                await fetch('http://localhost:8888/users/' + id, {
                    method: 'put',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(this.props.state.user)
                })
                // console.log(this.props.state.user)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    updateTargetHealth = async () => {
        const id = this.state.user._id;
        if (this.state.user.nameInProgress !== 'No Player Selected') {
            try {
                await fetch('http://localhost:8888/users/' + id, {
                    method: 'put',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(this.state.user)
                })
                // console.log(this.props.state.user)
            }
            catch (err) {
                console.log(err)
            }
        }
        this.props.componentDidMount();
        this.forceUpdate();
    }
    //draw
    drawCard = async () => {
        if (this.props.state.user.draws >= '1') {
            await this.props.cardDidDraw();
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
            await this.addCardToHand();
        }
        else { return alert('Cannot Draw, Call WorldPay') }
    }

    // showDamage = () => {
    //     return new Promise((resolve, reject) => {})
    // }

    addCardToHand = async () => {
        if (this.props.state.user.hand === undefined) {
            this.props.setHand();
        }
        let hand = this.props.state.user.hand
        const card = this.state.card
        hand.push(card)
        await this.updateCardsAndDraws()
        await this.renderCards()
    }

    renderCards = () => {
        if (this.props.hand)
            return this.props.hand.map((card, index) => <Card card={card} key={index} selectCard={this.selectCard} />)
    }

    selectCard = (e) => {
        let card = this.props.hand.filter((card) => card.title === e.target.value)
        this.setState({
            card: card[0]
        })
        console.log(this.state)
    }


    removeCard = () => {
        let idx = this.props.hand.findIndex((card) => card.title === this.state.card.title);
        let result = this.props.hand.filter((card, index) => {
            return index !== idx
        })
        this.props.removeCardFromHand(result);
        console.log(result)
    }
    //targets
    renderTargeting = () => {
        if (this.state.card.title)
            return <Target playCard={this.playCardHelper}
                renderDropdown={this.props.renderDropdown}
                selectPlayer={this.selectPlayer}
            />
    }

    selectPlayer = (e) => {
        this.props.componentDidMount();
        let player = this.props.state.users.filter((player) => player.nameInProgress === e.target.value)
        this.setState({
            user: player[0]
        })
    }

    //play cards
    dealDamage = (value) => {
        let result = Number(this.state.user.healthInProgress) - Number(value)
        this.setState({
            user: {
                _id: this.state.user._id,
                type: this.state.user.type,
                nameInProgress: this.state.user.nameInProgress,
                imageInProgress: this.state.user.imageInProgress,
                healthInProgress: result,
                hand: this.state.user.hand,
                draws: this.state.user.draws
            }
        })
    }

    doTheHealing = (value) => {
        let result = Number(this.state.user.healthInProgress) + Number(value);
        if (this.state.user.healthInProgress >= 1) {
            this.setState({
                user: {
                    _id: this.state.user._id,
                    type: this.state.user.type,
                    nameInProgress: this.state.user.nameInProgress,
                    imageInProgress: this.state.user.imageInProgress,
                    healthInProgress: result,
                    hand: this.state.user.hand,
                    draws: this.state.user.draws
                }
            })
        }
        else {
            alert('good job, you just wasted a card!')
        }
    }

    playCardHelper = () => {
        if (this.props.state.user.healthInProgress >= 1) {
            this.playCard();
        }
        else { return alert('You tried to play a card from beyond the grave... It was not very effective') }
    }

    playCard = async () => {
        this.removeCard();
        this.props.componentDidMount();
        let value = this.state.card.value;
        console.log('clicked')
        if (this.state.card.damage === "true") {
            await this.dealDamage(value);
            await this.updateTargetHealth();
        }
        else if (this.state.card.damage === "false") {
            await this.doTheHealing(value);
            await this.updateTargetHealth();
        }
        else { return alert('Invalid card type') }
    }

    theLog = () => {
        console.log(this.state)
    }

    render = () => {
        return (
            <Fragment>
                <div >
                    <div>
                        <div className="row">
                            <button onClick={this.theLog}>Loggg</button>
                            <button onClick={this.removeCard}>Check</button>
                            <h4 className="float-left">Selected card:</h4>
                            <button onClick={this.drawCard}>Draw</button>
                        </div>
                        <div>
                            <div className="container d-flex justify-content-center">
                                <div style={{ width: '16rem', height: 'auto' }} className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">{this.state.card.title}</h4>
                                        <figure>
                                            <style dangerouslySetInnerHTML={{
                                                __html: `.win {max-height: 320px;}`
                                            }} />
                                            <img max-width="100%" max-height="150px" className="win img-fluid d-flex justify-content-center" src={this.state.card.image} alt={this.state.card.title} />
                                        </figure>
                                        <h6>{this.state.card.description}</h6>
                                        <ul className="card-text">{this.state.card.value}</ul>
                                    </div>

                                </div >
                            </div>
                        </div>
                        <div className="float-left">
                            {this.renderTargeting()}
                        </div>
                    </div>

                    <footer>
                        <h1>Hand</h1>
                        <div className="d-flex justify-content-center">
                            {this.renderCards()}
                        </div>
                    </footer>
                </div>
                <div>
                </div>
            </Fragment>
        )
    }
}