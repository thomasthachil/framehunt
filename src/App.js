import React, { Component } from 'react';
import './App.css';

import { parseResponseToTagMap, makeAPIRequest } from './utils';
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
      response: dummyResponse,
      tagMap: null,

    };
  }

  componentDidMount() {
    // test parsing response
    const tM = parseResponseToTagMap(this.state.response);
    console.log(tM);
    this.setState({ tagMap: tM });
    
    /*
    var YTUrl = "https://www.youtube.com/watch?v=0O5h4enjrHw";
      var url = "/bytes?url=" + YTUrl;
      fetch(url, {
          method: 'GET'
      }).then(function(response) {
          console.log(response);
          //console.log(makeAPIRequest(response));
      });
     */
  }

  nextPage() {
    console.log(this.state);
    this.setState({stage: (this.state.stage + 1) % 3})
  }

  renderSubpage() {
    if (this.state.stage === 0) {
      return (
        <SelectVideoPage
          nextPage={this.nextPage}
        />
      );
    } else if (this.state.stage === 1) {
      return (
        <ProcessingPage
          nextPage={this.nextPage}
        />
      );
    } else {
      return (
        <SearchPage
          TagMap={this.state.tagMap}
          nextPage={this.nextPage}
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
