import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Form, Button } from 'semantic-ui-react';

import { makeAPIRequest, cApp } from '../utils';

import Clarifai from 'clarifai';


export default class SelectVideoPage extends Component {
    static propTypes = {
        nextPage: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            url: "",
            file: null,
        };

    }

    log(d) {
        try {
          console.log(JSON.stringify(d, null, 2));
        } catch (e) {
          console.log(d);
        }
      }

    handleUrlSubmit() {
        console.log('SVP:', this.state.url);
        this.props.setUrl(this.state.url);
        this.props.nPage();
        const url = this.state.url;
        cApp.models.predict(Clarifai.GENERAL_MODEL,
            {url},
            { video: true })
        .then(e => {
            this.props.nPage();
            this.props.setResponse(e);

            console.log(e);
        })
        .catch(e => console.log('error', e));

        // console.log("passed clarafai request");
        // this.props.nextPage();
    }

    handleFileUpload(e) {
        console.log('uploaded:');

        var data = new FormData()
        data.append('video', e.target.files[0])
        this.props.nPage();
        fetch('/upload', {
            method: 'POST',
            body: data
        }).then(e => {
            this.props.nPage();
            // makeAPIRequest()
            console.log('upload post result: ', e);
        });


        console.log(e);
    }

    render() {
        return (
            <Container>
                <Form onSubmit={() => this.handleUrlSubmit()}>
                    Link Youtube Video
                    <Form.Input
                        style={{ alignSelf: 'center' }}
                        iconPosition='left'
                        icon='linkify'
                        placeholder='Paste Youtube Link'
                        onChange={e => this.setState({url: e.target.value})}
                        value = {this.state.url}
                    />
                        <h3> OR</h3>
                </Form>

                <Form onSubmit={() => this.handleFileUpload()}>
                    <Form.Input className="fileInput"
                        type="file"
                        name="video"
                        onChange={(e) => this.handleFileUpload(e)}
                    />

                    <Form.Input type="submit" name="submit"/>
                </Form>

            </Container>
        )
    }
}
