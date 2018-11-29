import React, { Component } from 'react';
import './App.css';
import NewDashBoard from './components/NewDashBoard.js';
import Dashboard from './components/Dashboard.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NewDashBoard />
      </div>
    );
  }
}

export default App;
