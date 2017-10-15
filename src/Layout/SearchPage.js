import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Label, Form, Button } from 'semantic-ui-react';
import { Player, ControlBar, ReplayControl,
    ForwardControl, CurrentTimeDisplay,
    TimeDivider, PlaybackRateMenuButton, VolumeMenuButton
  } from 'video-react';


export default class SearchPage extends Component {
    static propTypes = {
        nextPage: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            tag: "",
            seekButtons: null,
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

    renderResults(tag) {
        const { TagMap } = this.props;
        // console.log('submitted!', tag);

        // console.log(this.state.tag);
        console.log("tag recieved:", tag);
        const buttonArr = [];
        TagMap[tag].forEach((time, index) => {
            const timeSec = time / 1000;
            buttonArr.push(
                <Button
                    onClick={() => this.refs.player.seek(timeSec)}
                >
                    {`${timeSec} sec`}
                </Button>
            );
        });

        this.setState({seekButtons: buttonArr});


    }

    render() {
        return (
            <div>
                <Form onSubmit={() => this.renderResults(this.state.tag)}>
                    <Input
                        action={{ icon: 'search' }}
                        placeholder='Search for frames by tags'
                        onChange={e => this.setState({tag: e.target.value})}
                        value = {this.state.tag}
                    />
                </Form>
                <br />


                {this.state.seekButtons}

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

                {this.renderLabels()}

            </div>
        )
    }
}
