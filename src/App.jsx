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

import StoryScreen from './components/screens/StoryScreen'


class App extends Component {

  checkID = async () => {

    if (!(credentials.canvas.access_token === "")) {

      if (await this.CanvasDataHandler.fetchAccounts() !== null)
        document.getElementById('case-message').innerHTML = `Account not found...`
      else {
        document.getElementById('case-message').innerHTML = `Account found...`
        var madlibObject = await this.MadLibHandler.fetchStory()
        console.log('called');
        var canvasBlankFillers = await this.matchBlanksFromCanvas(madlibObject.blanks)

        var generatedMadLib = await this.MadLibHandler.modifyBlanks(madlibObject, canvasBlankFillers)

        ReactDOM.render(<StoryScreen story={generatedMadLib} title={madlibObject.title} />,
          document.getElementById('root'))

      }
    }
  }


  matchBlanksFromCanvas = async (blanks) => {
    let dice = 1 //TODO: Math.floor(Math.random() * 3)
    let newBlanks = blanks

    let data = await this.CanvasDataHandler.formData()

    let blankParsing = async () => {
      for (var i = 0; i < newBlanks.length; i++) {
        if (newBlanks[i] === 'a place' || newBlanks[i] === 'foreign country') {
          newBlanks[i] = await data.courses[0].name
        }
        if (newBlanks[i] === 'noun') {

          if (dice === 1) {
            let item = await this.CanvasDataHandler.fetchRandomCourse()
            newBlanks[i] = item.name
          }
          if (dice === 2) {
            let item = await this.CanvasDataHandler.fetchRandomAssignment()
            newBlanks[i] = item.name
          }
          if (dice === 3) {
            let item = await this.CanvasDataHandler.fetchRandomModule()
            newBlanks[i] = item.name
          }
        }
        if (newBlanks[i] === 'verb') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomVerb()
        }
        if (newBlanks[i] === 'adjective') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomAdjective()
        }
        if (newBlanks[i] === 'animal') {
          newBlanks[i] = 'husky'
          //newBlanks[i] = this.state.mascot
        }


        //TODO: All other cases
      }

      console.log('finished parsing')
    }

    await blankParsing()

    console.log(newBlanks)
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
          <AuthIDInput onRef={ref => (this.AuthIDInput = ref)}
            onClick={() => this.checkID()} />
          <p id='case-message' className='hint-caption'>Input Access Token to begin.</p>
        </div>

        <footer className="App-footer" >
          <p>
            Created by Joe Villegas
          </p>
        </footer>
        <MadLibHandler onRef={ref => (this.MadLibHandler = ref)} />
        <CanvasDataHandler onRef={ref => (this.CanvasDataHandler = ref)} />
      </div>

    );
  }
}

export default App;