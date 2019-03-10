import React from 'react'
import Axios from 'axios'

import random_words from './resources/random_words.json'


export default class MadLibHandler extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            story: ''
        }
    }
    componentDidMount = () => {
        this.props.onRef(this)
    }
    componentWillUnmount = () => {
        this.props.onRef(undefined)
    }

    fetchStory = async (context = '') => {
        var story = "write your own"
        await Axios.get('http://madlibz.herokuapp.com/api/random')
            .then(res => {
                story = res.data
                this.setState({ story: { story } })
                console.log(`New info receieved MadLibz API:`)
                console.log(res)
            })

        return story
    }

    /*  Modification functions  */
    modifyBlanks = async (story, context = ['LAMOA']) => {
        console.log(story)
        var newBlanks = story.blanks

        if (story.blanks == null || story.value == null) {
            console.error('Error: Not a Story object')
            return "Not a Story Object"
        }

        for (var i = 0; i < story.blanks.length; i++) {
            newBlanks[i] = context[i]
        }

        story.blanks = newBlanks

        return story
    }

    /*  Basic Word Randomizers */

    fetchRandomNoun = () => {
        var dice = Math.floor(Math.random() * random_words.noun.length);

        return random_words.noun[dice]
    }
    fetchRandomNounMultiple = () => {
        var dice = Math.floor(Math.random() * random_words.plural_noun.length);

        return random_words.plural_noun[dice]
    }
    fetchRandomAdjective = () => {
        var dice = Math.floor(Math.random() * random_words.adjective.length);

        return random_words.adjective[dice]
    }
    fetchRandomVerb = () => {
        var dice = Math.floor(Math.random() * random_words.verb.length);

        return random_words.verb[dice]
    }
    fetchRandomVerbPast = () => {
        //  Fetches from verb list then adds 'ed'. Might look weird!
        var dice = Math.floor(Math.random() * random_words.verb.length);

        return random_words.verb[dice] + "ed"
    }
    fetchRandomVerbContinuous = () => {
        //  Fetches from verb list then adds 'ed'. Might look weird!
        var dice = Math.floor(Math.random() * random_words.verb.length);

        return random_words.verb[dice] + "ing"
    }


    /*  Category-specific word randomizers */
    fetchRandomLiquid = () => {
        var dice = Math.floor(Math.random() * random_words.liquid.length);

        return random_words.liquid[dice]
    }
    fetchRandomAnimal = () => {
        var dice = Math.floor(Math.random() * random_words.animal.length);

        return random_words.animal[dice] + "ed"
    }
    fetchRandomBodyPart = () => {
        var dice = Math.floor(Math.random() * random_words.body_part.length);

        return random_words.body_part[dice]
    }
    fetchRandomClothingPiece = () => {
        var dice = Math.floor(Math.random() * random_words.clothing_piece.length);

        return random_words.clothing_piece[dice]
    }

    render = () => {
        return (<i></i>)
    }
}