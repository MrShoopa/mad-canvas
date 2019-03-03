import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios'

import logo from './logo.svg';
import './App.css';
//import AuthButton from './components/AuthButton';
import AuthIDInput from './components/AuthIDInput';
import MadLibHandler from './components/MadLibHandler'
import CanvasDataHandler from './components/CanvasDataHandler'

import credentials from './auth/credentials.json'

import Story from './components/resources/Story'


class App extends Component {

  checkID = async () => {
    // Canvas auth and fetch
    if (!(credentials.canvas.access_token === "")) {
      await this.CanvasDataHandler.setState({ credentials: credentials.canvas })

      if (await this.CanvasDataHandler.fetchAccounts() === null)
        document.getElementById('case-message').innerHTML = `Account not found...`
      else {
        var generatedMadLib = await this.MadLibHandler.fetchStory()

        console.log(generatedMadLib.blanks)
        var canvasBlankFillers = await this.matchBlanksFromCanvas(generatedMadLib.blanks)

        generatedMadLib = await this.MadLibHandler.modifyBlanks(generatedMadLib, canvasBlankFillers)

        ReactDOM.render(<Story story={generatedMadLib} />,
          document.getElementById('root'))
      }
    } else {

    }
  }

  matchBlanksFromCanvas = async (blanks) => {
    let dice = Math.floor(Math.random() * 3)
    let newBlanks = blanks


    for (var i = 0; i < blanks.length; i++) {
      if (blanks[i] === 'a place' || blanks[i] === 'foreign country') {
        blanks[i] = this.CanvasDataHandler.fetchRandomCourse()
      }
      if (blanks[i] === 'noun') {
        //if (dice === 1) blanks[i] = this.CanvasDataHandler.fetchRandomCourse().name
        //if (dice === 2) blanks[i] = this.CanvasDataHandler.fetchRandomAssignment().name
        //if (dice === 3) blanks[i] = this.CanvasDataHandler.fetchRandomModule().name
      }
      if (blanks[i] === 'verb') {
        blanks[i] = this.MadLibHandler.fetchRandomVerb()
      }
      if (blanks[i] === 'adjective') {
        blanks[i] = this.MadLibHandler.fetchRandomAdjective()
      }
      if (blanks[i] === 'animal') {
        blanks[i] = 'husky'
        //blanks[i] = this.state.mascot
      }

      //TODO: All other cases
    }

    return newBlanks

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
          <p id='case-message' className='hint-caption'>Input Access Token to begin.</p>
        </div>

        <footer className="App-footer" >
          <p>
            Created by Joe Villegas
          </p>
        </footer>
        <MadLibHandler onRef={ref => (this.MadLibHandler = ref)} />
        <CanvasDataHandler onRef={ref => (this.CanvasDataHandler = ref)}
          canvas_access_token={credentials.canvas.access_token} />
      </div>

    );
  }
}

export default App;