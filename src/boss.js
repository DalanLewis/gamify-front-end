import React, { Component, Fragment } from 'react'

export default class Boss extends Component {

    render = () => {
        return (
            <Fragment>
                <section>
                    <form>
                        <h1>New Boss</h1>
                        <span>Name: <input onChange={this.props.bossNameInProgress} size="20" type="text" value={this.props.nameInProgress} /></span>
                        <span>Image URL: <input onChange={this.props.bossImageInProgress} size="20" type="url" value={this.props.imageInProgress} /></span>
                        <span>Total HP: <input onChange={this.props.bossHpInProgress} size="20" type="number" value={this.props.healthInProgress} /></span>
                    </form>
                    <button onClick={this.props.submitBoss}>Create New Boss</button>
                </section>
            </Fragment>
        )
    }
}