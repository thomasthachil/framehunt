import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Form, Button } from 'semantic-ui-react';

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
        this.cAPP = new Clarifai.App({
            apiKey: 'be5a7ee646c14bb0ac0e5f6f0baabb7f'
        });
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
        this.cAPP.models.predict(Clarifai.GENERAL_MODEL,
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
        // console.log(e);

        let reader = new FileReader();
        let file = e.target.files[0];

        fetch('/upload', {
            method: 'POST',
            body: file
        }).then(response => console.log(response.json()));

        console.log(file);
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

                <Form onSubmit={() => console.log('uploading')}>
                    <Form.Input className="fileInput"
                        type="file"
                        name="video"
                        onChange={(e) => this.handleFileUpload(e)}
                    />

                    <Form.Input type="submit" name="submit" />
                </Form>

            </Container>
        )
    }
}
