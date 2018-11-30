import React, { Component } from 'react';
import './App.css';
import NewDashBoard from './components/NewDashBoard.js';
import { BrowserRouter as Router } from "react-router-dom";



class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NewDashBoard />
        </Router>
      </div>
    );
  }
}

export default App;
