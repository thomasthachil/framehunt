import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { parseResponseToTagMap } from './utils';
import { dummyResponse } from './dummyResponse.js';

import { Container, Input, Step, Icon, Button, Header } from 'semantic-ui-react';
import SelectVideoPage from './Layout/SelectVideoPage';
import ProcessingPage from './Layout/ProcessingPage';
import SearchPage from './Layout/SearchPage';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: 2,
      response: dummyResponse,
      tagMap: null,
    };
  }


  componentDidMount() {
    const tM = parseResponseToTagMap(this.state.response);
    console.log(tM);
    this.setState({ tagMap: tM });
  }

  renderSubpage() {
    if (this.state.stage === 0) {
      return (
        <SelectVideoPage />
      );
    } else if (this.state.stage === 1) {
      return (
        <ProcessingPage />
      );
    } else {
      return (
        <SearchPage
          TagMap={this.state.tagMap}
        />
      );
    }
  }

  render() {
    const steps = [
      { active: this.state.stage === 0, icon: 'video', title: 'Select Video', description: 'Upload or Paste Youtube URL' },
      { disabled: this.state.stage < 1, active: this.state.stage === 1, icon: 'hourglass start', title: 'Processing', description: 'Scanning all frames of your video' },
      { disabled: this.state.stage < 2, active: this.state.stage === 2, icon: 'search', title: 'Hunt', description: 'Search for scenes with something in it!' },
    ];

    return (
      <div className="App">
        <Header style={{backgroundColor: 'black'}} inverted>
          <br />
            <h4>Welcome to</h4>
            <h1 className="App-title">FrameHunt</h1>
            <Button onClick={() => this.setState({stage: (this.state.stage + 1) % 3})}>
              Next step
            </Button>
            <br />
          </Header>
          <Container>
          <br />

          <Step.Group items={steps} />
          <br />
          <br />

          {this.renderSubpage()}



          </Container>
        </div>
    );
  }
}

export default App;
