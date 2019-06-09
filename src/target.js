import React, { Component, Fragment } from 'react'

export default class Target extends Component {

    render = () => {
        return (
            <Fragment>
                <h2>Target:</h2>
                <select onChange={this.props.selectPlayer}>
                    <option value={null}>Select Target</option>
                    {this.props.renderDropdown()}
                </select>
                <button className="btn btn-success" onClick={this.props.playCard}>Play</button>
            </Fragment>
        )
    }
}