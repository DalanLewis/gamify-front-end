import React, { Component } from 'react';

export default class Dropdown extends Component {


    render = () => {
        return (
            <option>
                {this.props.player.nameInProgress}
            </option>
        )
    }
}