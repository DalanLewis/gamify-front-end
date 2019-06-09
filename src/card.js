import React, { Component, Fragment } from 'react'

export default class Card extends Component {

    render = () => {
        return (
            <Fragment>
                <button className="card" onClick={this.props.selectCard} value={this.props.card.title}>
                    {this.props.card.title}
                    {this.props.card.value}
                </button>
            </Fragment>
        )
    }
    //      <figure >
    //     <style dangerouslySetInnerHTML={{
    //         __html: `.win {max-width: 20px, max-height: 30px;}`
    //     }} />
    //     <img max-width="auto" max-height="56px" className="win img-fluid d-flex justify-content-center" src={this.props.card.image} />
    // </figure > 
}



