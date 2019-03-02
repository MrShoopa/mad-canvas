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

        return story.blanks[0]
    }

    render() {
        return (<i>lol</i>)
    }
}