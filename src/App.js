import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { parseResponseToTagMap, makeAPIRequest } from './utils';
import { response } from './dummyResponse.js';
import { fs } from 'fs';



class App extends Component {
  
  componentDidMount() {
    //var data = fs.readFileSync("./inputs/test2.mp4", { encoding: 'base64' });
    console.log(parseResponseToTagMap(response));
    //console.log(makeAPIRequest(data));
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
