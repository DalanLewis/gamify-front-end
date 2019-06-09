import React, { Component } from 'react'

export default class Players extends Component {

    render = () => {
        return (

            <div className="p-2">
                <style dangerouslySetInnerHTML={{
                    __html: `.beauton { width: 100px; height: 100px; padding: 10px 16px; border-radius: 50%; font-size: 20px; line-height: 1.33; background-color: #501B1D; color: #ADADAD; }`}} />
                <button className="beauton" onClick={this.props.selectPlayer} value={this.props.player.nameInProgress}>
                    {this.props.player.nameInProgress}
                    <br />
                    {this.props.player.healthInProgress}
                </button>
            </div>
        )
    }
}