import React, { Component, Fragment } from 'react'

export default class Player extends Component {


    render = () => {
        return (
            <Fragment>
                <section>
                    <form>
                        <h1>New Player</h1>
                        <span>Name: <input onChange={this.props.playerNameInProgress} size="20" type="text" value={this.props.nameInProgress} /></span>
                        <span>Image URL: <input onChange={this.props.playerImageInProgress} size="20" type="url" value={this.props.imageInProgress} /></span>
                    </form>
                    <button onClick={this.props.submitPlayer}>Create New Player</button>
                </section>
            </Fragment>
        )
    }
}