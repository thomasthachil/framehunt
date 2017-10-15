import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


export default class ProcessingPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <Loader size='massive' active>Processing Video</Loader>
            </div>
        )
    }
}
