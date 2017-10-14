import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { parseResponseToTagMap, makeAPIRequest } from './utils';
import { response } from './dummyResponse.js';


class App extends Component {

  componentDidMount() {

      var filename = "./inputs/test2.mp4";
      var url = "/" + $.param({file: filename})
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
