import React, { Component } from 'react'

export default class Playcard extends Component {

    render = () => {
        return (
            <div className="container">
                <div style={{ width: '16rem', height: 'auto' }} className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.state.card.title}</h4>
                        <figure>
                            <style dangerouslySetInnerHTML={{
                                __html: `.win {max-height: 320px;}`
                            }} />
                            <img max-width="100%" max-height="150px" className="win img-fluid d-flex justify-content-center" src={this.props.state.card.image} alt={this.props.state.card.title} />
                        </figure>
                        <h6>{this.props.state.card.description}</h6>
                        <ul className="card-text">{this.props.state.card.value}</ul>
                    </div>
                </div >
            </div>
        )
    }
}