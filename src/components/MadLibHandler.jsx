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

    modifyBlanks = async (story, context = ['LAMOA']) => {
        var newBlanks = story.blanks

        if (story.blanks == null || story.value == null) {
            console.error('Error: Not a Story object')
            return "Not a Story Object"
        }

        for (var i = 0; i < story.blanks.length; i++) {
            if (!(i >= context.length)) {
                newBlanks[i] = context[i]
            } else {
                newBlanks[i] = context[context.length - 1]
            }

        }

        story.blanks = newBlanks

        return story
    }

    /*  Basic Word Randomizers */

    fetchRandomNoun = () => {
        var dice = Math.floor(Math.random() * random_words.noun.length);

        return random_words.noun[dice]
    }
    fetchRandomAdjective = () => {
        var dice = Math.floor(Math.random() * random_words.adjective.length);

        return random_words.adjective[dice]
    }
    fetchRandomVerb = () => {
        var dice = Math.floor(Math.random() * random_words.verb.length);

        return random_words.verb[dice]
    }


    /*  Category-specific word randomizers */
    fetchRandomLiquid = () => {

    }
    fetchRandomAnimal = () => {
        //TODO: What is your school mascot?
    }

    render = () => {
        return (<i></i>)
    }
}