import React, {
  Component
} from 'react';
import axios from 'axios'

import logo from './logo.svg';
import './App.css';
import AuthButton from './components/AuthButton';
import AuthIDInput from './components/AuthIDInput';

import credentials from './auth/credentials.json'


class App extends Component {
  render() {
    return (
      <div className="App" >
        <header className="App-header" >
          <p>
            Mad Canvas
          </p>
        </header>

        <div className="Onboard-body">
          <AuthIDInput />
        </div>

        <footer className="App-footer" >
          <p>
            Created by Joe Villegas.
          </p>
        </footer>
      </div>
    );
  }
}

export default App;