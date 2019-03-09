import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios'

//import logo from './logo.svg';
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

        var canvasBlankFillers = await this.matchBlanksFromCanvas(madlibObject.blanks)

        var generatedMadLib = await this.MadLibHandler.modifyBlanks(madlibObject, canvasBlankFillers)

        ReactDOM.render(<StoryScreen story={generatedMadLib} title={madlibObject.title} />,
          document.getElementById('root'))

      }
    }
  }


  matchBlanksFromCanvas = async (blanks) => {
    let newBlanks = blanks

    let data = await this.CanvasDataHandler.initializeData()

    let blankParsing = async () => {
      for (var i = 0; i < newBlanks.length; i++) {
        let dice = Math.floor(Math.random() * 4 + 1)
        //console.log(dice)

        if (newBlanks[i] === 'a place' || newBlanks[i] === 'foreign country') {
          let item = await this.CanvasDataHandler.fetchRandomCourse()
          newBlanks[i] = item.name
        }
        if (newBlanks[i] === 'noun') {

          let item = "llama"
          switch (dice) {
            case 1:
              item = await this.CanvasDataHandler.fetchRandomCourse()
              newBlanks[i] = item.name
              break
            case 2:
              item = await this.CanvasDataHandler.fetchRandomAssignment()
              newBlanks[i] = item.name
              break
            case 3:
              item = await this.CanvasDataHandler.fetchRandomUser()
              newBlanks[i] = item.name
              break
            case 4:
              item = await this.CanvasDataHandler.fetchRandomGroup()
              newBlanks[i] = item.name
              break
            //DISABLED (Look at dice variable)
            case 9:
              item = await this.CanvasDataHandler.fetchRandomModule()
              newBlanks[i] = item.name
              break
            case 10:
              item = await this.CanvasDataHandler.fetchSelfName()
              newBlanks[i] = item.name
              break
            default:
              console.log(item)
          }

        }
        if (newBlanks[i] === 'plural noun') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomPluralNoun()
        }
        if (newBlanks[i] === 'verb') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomVerb()
        }
        if (newBlanks[i] === 'adjective') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomAdjective()
        }
        if (newBlanks[i] === 'animal') {
          newBlanks[i] = 'husky'
          //TODO: newBlanks[i] = this.state.mascot
        }


        //TODO: More cases :)
      }

      console.log('Finished parsing blanks!')
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