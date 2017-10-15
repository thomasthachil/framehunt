import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Input, Step, Icon, Button } from 'semantic-ui-react';


export default class SelectVideoPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Container>
                <Input icon='linkify' placeholder='Paste Youtube Link' />
                <h3> OR</h3>
                <h5>placeholder for uploading video</h5>

            </Container>
        )
    }
}
