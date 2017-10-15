import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Form, Button, Input } from 'semantic-ui-react';

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

    handleYoutubeSubmit() {
        //tommy's youtube magic here
        console.log("tommy do your thang");
    }

    handleRawSubmit() {
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
                <h4>Link Youtube Video</h4>
                <Form onSubmit={() => this.handleYoutubeSubmit()}>
                    <Form.Input
                        style={{ alignSelf: 'center' }}
                        iconPosition='left'
                        action={{ icon: 'youtube play' }}
                        placeholder='Paste Youtube Link'
                        onChange={e => this.setState({url: e.target.value})}
                        value = {this.state.url}
                    />
                </Form>
                <h3> OR</h3>
                <h4>Link Raw Video</h4>
                <Form onSubmit={() => this.handleRawSubmit()}>
                    <Form.Input
                        style={{ alignSelf: 'center' }}
                        iconPosition='left'
                        action={{ icon: 'file video outline' }}
                        placeholder='Paste Raw Link'
                        onChange={e => this.setState({url: e.target.value})}
                        value = {this.state.url}
                    />
                </Form>
                <h3> OR</h3>
                <h4>Upload Video</h4>


                <Form onSubmit={() => this.handleFileUpload()}>
                    <Form.Input className="fileInput"
                        type="file"
                        name="video"
                        onChange={(e) => this.handleFileUpload(e)}
                        action={{ icon: 'cloud upload' }}
                    />

                </Form>

            </Container>
        )
    }
}
