import React, { Component } from 'react';
import './App.css';

import { parseResponseToTagMap } from './utils';
import { dummyResponse } from './dummyResponse.js';

import { Container, Step, Button, Header } from 'semantic-ui-react';
import SelectVideoPage from './Layout/SelectVideoPage';
import ProcessingPage from './Layout/ProcessingPage';
import SearchPage from './Layout/SearchPage';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      response: null,
      tagMap: null,
      url: null,

    };
    // this.nextPage.bind(this)
  }

  // componentDidMount() {
  //   const tM = parseResponseToTagMap(this.state.response);
  //   console.log(tM);
  //   this.setState({ tagMap: tM });
  // }

  nextPage() {
    console.log("next page called!");
    this.setState({ stage: (this.state.stage + 1) % 3 });
  }

  setUrl(url) {
    this.setState({ url });
  }

  setResponse(response) {
    console.log('got ', response);
    const tM = parseResponseToTagMap(response);
    console.log(tM);
    this.setState({ tagMap: tM });
    // this.setState({ response });

  }

  renderSubpage() {
    if (this.state.stage === 0) {
      return (
        <SelectVideoPage
          nPage={() => this.nextPage()}
          setUrl={url => this.setUrl(url)}
          setResponse={r => this.setResponse(r)}
        />
      );
    } else if (this.state.stage === 1) {
      return (
        <ProcessingPage
          nPage={() => this.nextPage()}
        />
      );
    } else {
      return (
        <SearchPage
          TagMap={this.state.tagMap}
          nPage={() => this.nextPage()}
          url={this.state.url}
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
