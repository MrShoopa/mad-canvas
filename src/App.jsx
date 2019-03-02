import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios'

import logo, { ReactComponent } from './logo.svg';
import './App.css';
//import AuthButton from './components/AuthButton';
import AuthIDInput from './components/AuthIDInput';
import MadLibHandler from './components/MadLibHandler'

import credentials from './auth/credentials.json'

import StoryScreen from './components/screens/StoryScreen.jsx'


class App extends Component {

  checkID = async () => {
    console.log('sadfas')
    if (!(credentials.canvas.access_token === "")) {
      var generatedMadLib = await this.MadLibHandler.fetchStory()
      console.log(generatedMadLib)

      ReactDOM.render(<StoryScreen story={generatedMadLib} />,
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