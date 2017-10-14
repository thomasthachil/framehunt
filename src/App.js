import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { parseResponseToTagMap, makeAPIRequest, YTLinkToBytes } from './utils';
import { response } from './dummyResponse.js';



class App extends Component {
  
  componentDidMount() {
    console.log(parseResponseToTagMap(response));
    //console.log(makeAPIRequestWithUrl(url));
    console.log(YTLinkToBytes("https://www.youtube.com/watch?v=0O5h4enjrHw"));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
