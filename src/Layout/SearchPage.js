import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Label, Form, Button } from 'semantic-ui-react';
import { Player, ControlBar, ReplayControl,
    ForwardControl, CurrentTimeDisplay,
    TimeDivider, PlaybackRateMenuButton, VolumeMenuButton
  } from 'video-react';
import { timeFormat } from '../utils';

export default class SearchPage extends Component {
    static propTypes = {
        nextPage: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            searchTag: "",
            seekButtons: null,
        }
    }

    renderLabels() {
        const { TagMap } = this.props;
        const tagArr = [];

        for (let tag in TagMap) {
            const l = TagMap[tag].length;
            if (l < 15) {
                tagArr.push(
                    <Label
                        key={tag}
                        as='a'
                        color='teal'
                        image
                        onClick={() => this.renderButtonArr(tag)}
                        style={{margin: '2px'}}
                    >
                        {`${tag}: `}
                        <Label.Detail>
                            {TagMap[tag].length}
                        </Label.Detail>
                    </Label>
                );
            }
        }

        return tagArr;
    }

    renderButtonArr(tag) {
        const { TagMap } = this.props;

        const buttonArr = [];
        TagMap[tag].forEach((time, index) => {
            const t = timeFormat(time);
            const timeSec = time / 1000;

            buttonArr.push(
                <Button
                    key={`${tag}${timeSec}`}
                    onClick={() => this.refs.player.seek(timeSec)}
                    secondary
                >
                    {`${t}`}
                </Button>
            );
        });

        this.setState({seekButtons: buttonArr});


    }

    render() {
        return (
            <div>
                <Label.Group>
                    {this.renderLabels()}
                </Label.Group>
                <br />

                <Form onSubmit={() => this.renderButtonArr(this.state.searchTag)}>
                    <Input
                        action={{ icon: 'search' }}
                        placeholder='Search for frames by tags'
                        onChange={e => this.setState({searchTag: e.target.value})}
                        value = {this.state.searchTag}
                    />
                </Form>
                <br />


                {this.state.seekButtons}

                <br />
                <br />
                <Player
                    poster="/assets/poster.png"
                    ref="player"
                >
                <source src={this.props.url} />
                <source src={this.props.url} />

                <ControlBar>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton
                    rates={[5, 2, 1, 0.5, 0.1]}
                    order={7.1}
                    />
                    <VolumeMenuButton disabled />
                </ControlBar>
                </Player>
                <br />



            </div>
        )
    }
}
