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
    console.log('sadfas')
    if (!(credentials.canvas.access_token === "")) {
      var generatedMadLib = await this.MadLibHandler.fetchStory()

      var canvasBlankFillers = await this.matchBlanksFromCanvas(generatedMadLib.blanks)

      generatedMadLib = await this.MadLibHandler.modifyBlanks(generatedMadLib, canvasBlankFillers)

      ReactDOM.render(<Story story={generatedMadLib} />,
        document.getElementById('root'))
    }
  }

  matchBlanksFromCanvas = (blanks) => {
    let newBlanks = blanks


    for (var i = 0; i < blanks.length; i++) {
      if (blanks[i] === 'a place' || blanks[i] === 'foreign country') {
        blanks[i] = this.CanvasDataHandler.fetchRandomCourse()
      }
      if (blanks[i] === 'noun') {
        blanks[i] = this.CanvasDataHandler.fetchRandomCourse()
      }

      //TODO: All other cases
    }

    return newBlanks

  }

  fetchRandomNoun() {
    var dice = Math.random() * 12;

    if (dice < 2) {
      return this.CanvasDataHandler.fetchRandomCourse
    } else if (dice < 4) {
      return this.CanvasDataHandler.fetchRandomAssignment
    } else if (dice < 6) {
      return this.CanvasDataHandler.fetchRandomQuiz
    } else if (dice < 8) {
      return this.CanvasDataHandler.fetchRandomGroup
    } else if (dice < 10) {
      return this.CanvasDataHandler.fetchRandomStudent
    } else if (dice < 12) {
      return this.CanvasDataHandler.fetchRandomAdmin

    }
  }

  fetchRandomAbjective() {
    //TODO: How are you feeling in your classes?

    var dice = Math.random() * 12;
  }

  fetchRandomLiquid() {

  }

  fetchRandomAnimal() {
    //TODO: What is your school mascot?
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
        <CanvasDataHandler onRef={ref => (this.CanvasDataHandler = ref)} />
      </div>

    );
  }
}

export default App;