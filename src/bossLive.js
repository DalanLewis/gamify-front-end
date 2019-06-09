import React, { Component } from 'react'

export default class Bossman extends Component {

    render = () => {
        return (
            <div className="container d-flex float-right">
                <div style={{ width: '16rem', height: 'auto' }} className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.name}</h4>
                        <h2>{this.props.starting}</h2><br/>
                        <h2>{this.props.health}</h2>
                        <figure>
                            <style dangerouslySetInnerHTML={{
                                __html: `.win {max-height: 320px;}`
                            }} />
                            <img max-width="100%" max-height="150px" className="win img-fluid d-flex justify-content-center" src={this.props.image} alt={this.props.name} />
                        </figure>
                    </div>
                </div>
            </div>
        )
    }
}