import React from 'react';
import ReactDOM from 'react-dom';

import MadLibHandler from '../MadLibHandler'

export default class StoryScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            //story: ''
        }
    }

    formatStory = ()

    render = () => {

        return (
            this.props.story
        )
    }
}