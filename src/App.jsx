import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//  Internal Components
//import logo from './logo.svg';
import './App.css';
//import AuthButton from './components/AuthButton';
import AuthIDInput from './components/AuthIDInput';
import MadLibHandler from './components/MadLibHandler'
import CanvasDataHandler from './components/CanvasDataHandler'

//  External Components
import StoryScreen from './components/screens/StoryScreen'

//  Resources
import credentials from './auth/credentials.json'


class App extends Component {

  checkID = async () => {

    if (!(credentials.canvas.access_token === "")) {

      if (await this.CanvasDataHandler.fetchAccounts() !== null)
        document.getElementById('case-message').innerHTML = `Account not found...`
      else {
        document.getElementById('case-message').innerHTML = `Account found! Generating story...`

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
    //console.log(blanks)

    let data = await this.CanvasDataHandler.initializeData()

    let blankParsing = async () => {
      for (var i = 0; i < newBlanks.length; i++) {
        let dice = Math.floor(Math.random() * 4 + 1)
        //console.log(dice)

        //console.log(newBlanks[i])
        if (typeof newBlanks[i] === "undefined") break

        /*  Generic Items */
        if (newBlanks[i] === 'noun') {

          //  Fetches Items from Canvas data since most of these are items
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
            case 5:
              item = await this.CanvasDataHandler.fetchRandomModule()
              newBlanks[i] = item.name
              break
            case 6:
              item = await this.CanvasDataHandler.fetchSelfName()
              newBlanks[i] = item.name
              break
            default:
              console.log(item)
          }
        }
        if (newBlanks[i] === 'plural noun') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomNounMultiple()
        }
        if (newBlanks[i] === 'verb') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomVerb()
        }
        if (newBlanks[i] === 'adverb') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomAdverb()
        }
        if (newBlanks[i] === 'past tense verb') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomVerb()
        }
        if (newBlanks[i] === `verb ending in 'ing'`) {
          newBlanks[i] = await this.MadLibHandler.fetchRandomVerb()
        }
        if (newBlanks[i] === 'adjective') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomAdjective()
        }


        /* Category-Specific Items */
        if (newBlanks[i] === 'a place' || newBlanks[i] === 'foreign country') {
          let item = await this.CanvasDataHandler.fetchRandomCourse()
          newBlanks[i] = item.name
        }
        if (newBlanks[i] === 'animal') {
          newBlanks[i] = await this.MadLibHandler.fetchRandomAnimal()
          //newBlanks[i] = 'husky' hehe
          //TODO: newBlanks[i] = this.state.mascot
        }
        if (newBlanks[i].includes('body') && newBlanks[i].includes('part')) {
          newBlanks[i] = await this.MadLibHandler.fetchRandomBodyPart()
        }
        if (newBlanks[i].includes('clothing')) {
          newBlanks[i] = await this.MadLibHandler.fetchRandomClothingPiece()
        }
        if (newBlanks[i].includes('liquid')) {
          newBlanks[i] = await this.MadLibHandler.fetchRandomLiquid()
        }


        //TODO: More cases :)
      }

    }

    await blankParsing()

    console.log('Finished parsing blanks!')
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
            Created by Joe V.
          </p>
        </footer>
        <MadLibHandler onRef={ref => (this.MadLibHandler = ref)} />
        <CanvasDataHandler onRef={ref => (this.CanvasDataHandler = ref)} />
      </div>

    );
  }
}

export default App;