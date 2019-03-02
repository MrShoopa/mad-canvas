import React from 'react'
import Axios from 'axios'

export default class MadLibHandler extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            story: ''
        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
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

    render() {
        return (<i></i>)
    }
}