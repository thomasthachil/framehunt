import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { parseResponseToTagMap, makeAPIRequest } from './utils';
import { response } from './dummyResponse.js';


class App extends Component {

  componentDidMount() {

      var YTUrl = "https://www.youtube.com/watch?v=0O5h4enjrHw";
      var url = "/bytes?url=" + YTUrl;
      fetch(url, {
          method: 'GET'
      }).then(function(response) {
          console.log(response);
          console.log(makeAPIRequest(response));
      });
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
