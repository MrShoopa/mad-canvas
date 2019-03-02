import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios'

import logo from './logo.svg';
import './App.css';
//import AuthButton from './components/AuthButton';
import AuthIDInput from './components/AuthIDInput';
import MadLibHandler from './components/MadLibHandler'

import credentials from './auth/credentials.json'

import Story from './components/resources/Story'


class App extends Component {

  checkID = async () => {
    console.log('sadfas')
    if (!(credentials.canvas.access_token === "")) {
      var generatedMadLib = await this.MadLibHandler.fetchStory()
      generatedMadLib = await this.MadLibHandler.modifyBlanks(generatedMadLib, ['lel'])

      ReactDOM.render(<Story story={generatedMadLib} />,
        document.getElementById('root'))
    }
  }

  render() {

    return (
      <div className="App" >
        <header className="App-header" >
          <p>
            Mad Canvas
          </p>
        </header>

        <div className="Onboard-body">
          <div onClick={() => this.checkID()}>
            <AuthIDInput />
          </div>
        </div>

        <footer className="App-footer" >
          <p>
            Created by Joe Villegas.
          </p>
        </footer>
        <MadLibHandler onRef={ref => (this.MadLibHandler = ref)} />
      </div>

    );
  }
}

export default App;