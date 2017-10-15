import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Label, Form } from 'semantic-ui-react';


export default class SearchPage extends Component {
    static propTypes = {
        nextPage: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            url: "",
        }
    }

    renderLabels() {
        const { TagMap } = this.props;
        const tagArr = [];

        for (let tag in TagMap) {
            tagArr.push(
                <Label
                    key={tag}
                >
                    <span>{`${tag}: `}</span>
                    {TagMap[tag].length}
                </Label>
            );
        }

        return tagArr;
    }

    render() {
        return (
            <div>
                <Form onSubmit={() => console.log('submitted!')}>
                    <Input
                        action={{ icon: 'search' }}
                        placeholder='Search for frames by tags'
                        onChange={url => this.setState({url})}
                    />
                </Form>
                <br />
                <br />

                {this.renderLabels()}

            </div>
        )
    }
}
