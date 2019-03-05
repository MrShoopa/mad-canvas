import React from 'react';
import ReactDOM from 'react-dom'

import './StoryScreen.scss'

import Story from '../resources/Story'

export default class StoryScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            //story: ''
        }
    }


    generateNewStory = () => {

    }

    render = () => {

        return (
            <div >
                <header className="App-header" >
                    <p>
                        Your Story!
                    </p>
                </header>
                <div className="Story-card">
                    <div className="children">
                        <h1> {this.props.title}</h1>
                        <Story story={this.props.story} />
                    </div>
                </div>
                <footer className="App-footer" >
                    <p>
                    </p>
                </footer>
            </div>
        )
    }
}
StoryScreen.defaultProps = {
    story: "The quick brown fox jumped over the turtle's lemonade stand."
}