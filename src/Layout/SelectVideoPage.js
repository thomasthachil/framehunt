import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Form, Button } from 'semantic-ui-react';


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

    handleUrlSubmit() {
        console.log('submitted!');

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
                        onChange={url => this.setState({url})}
                    />
                        <h3> OR</h3>
                </Form>

                <Form onSubmit={() => this.handleFileUpload()}>
                    <Form.Input className="fileInput"
                        type="file"
                        onChange={(e) => this.handleFileUpload(e)}

                    />

                    <Form.Input type="submit" name="submit" />
                </Form>

            </Container>
        )
    }
}
