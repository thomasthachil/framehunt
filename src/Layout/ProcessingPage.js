import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'


export default class ProcessingPage extends Component {
    static propTypes = {
        nextPage: PropTypes.func,
    }

    render() {
        return (
            <div>
                <Loader size='massive' active>Processing Video</Loader>
            </div>
        )
    }
}
