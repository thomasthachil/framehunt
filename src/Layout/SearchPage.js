import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Input, Icon, Label } from 'semantic-ui-react';


export default class SearchPage extends Component {
    static propTypes = {

    }

    renderLabels() {
        const { TagMap } = this.props;
        const tagArr = [];

        for (let tag in TagMap) {
            tagArr.push(
                <Label>
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
                <Input icon='search' placeholder='Search for frames by tags' />
                <br />
                <br />

                {this.renderLabels()}

            </div>
        )
    }
}
