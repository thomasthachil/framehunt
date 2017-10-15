import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Form, Button, Input } from 'semantic-ui-react';
import axios from 'axios';

import { cApp } from '../utils';

import Clarifai from 'clarifai';

export default class SelectVideoPage extends Component {
    static propTypes = {
        nextPage: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            rawUrl: "",
            ytUrl:"",
            file: null,
        };

    }

    async handleYoutubeSubmit() {
        var ytUrl = this.state.ytUrl;
        var mythis = this;
        fetch('http://52.206.8.179:5000/ytupload?url=' + ytUrl)
        .then(res => res.text())
        .then(parsedStr => {
            setTimeout(function() {
                mythis.handleRawSubmit("http://52.206.8.179/videos/" + parsedStr);
            }, 2000);
        }).catch(e => console.log(e));
    }

    handleRawSubmit(submitUrl) {
        this.props.setUrl(submitUrl);
        this.props.nPage();

        console.log('video being submitted:', submitUrl);

        console.log(cApp);

        cApp.models.predict(Clarifai.GENERAL_MODEL,
            {url: submitUrl},
            { video: true })
        .then(e => {
            this.props.nPage();
            this.props.setResponse(e);

            console.log(e);
        })
        .catch(e => {
            alert('We were not able to parse your video!', e);
            this.props.setPage(0);
        });
    }

    handleFileUpload(e) {
        var mythis = this;
        var data = new FormData()
        data.append('video', e.target.files[0])
        this.props.nPage();
        fetch('http://52.206.8.179:5000/upload', {
            method: 'POST',
            body: data
        })
        .then(res => res.text())
        .then(parsedStr => {
            setTimeout(function() {
                mythis.handleRawSubmit("http://52.206.8.179/videos/" + parsedStr);
            }, 2000);
        }).catch(e => {
            alert('We were not able to parse your video!', e);
            this.props.setPage(0);
        });


        console.log(e);
    }

    render() {
        return (
            <Container className="left">
                <h3>Link Youtube Video</h3>
                <Form onSubmit={() => this.handleYoutubeSubmit()}>
                    <Form.Input
                        style={{ alignSelf: 'center' }}
                        iconPosition='left'
                        action={{ icon: 'youtube play' }}
                        placeholder='Paste YouTube video link.'
                        onChange={e => this.setState({ytUrl: e.target.value})}
                        value = {this.state.ytUrl}
                    />
                </Form>
                <h3>Link Raw Video</h3>
                <Form onSubmit={() => this.handleRawSubmit(this.state.rawUrl)}>
                    <Form.Input
                        style={{ alignSelf: 'center' }}
                        iconPosition='left'
                        action={{ icon: 'file video outline' }}
                        placeholder='Paste raw video link.'
                        onChange={e => this.setState({rawUrl: e.target.value})}
                        value = {this.state.rawUrl}
                    />
                </Form>
                <h3>Upload Video</h3>

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
