import React from 'react';

export default class Story extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            //story: ''
        }
    }

    formatStoryToString = () => {
        var formattedStoryString = ""

        for (let i = 0; i < this.props.story.value.length; i++) {
            if (this.props.story.value[i] === 0) break;

            let valueString = this.props.story.value[i]
            //console.log(valueString)
            formattedStoryString += `${valueString} `

            if (this.props.story.blanks[i] === undefined) {
                //console.log('Null blank found')
                break;
            }

            let blankString = this.props.story.blanks[i]
            //console.log(blankString)
            formattedStoryString += `${blankString} `


        }

        console.log('Generated Mad Lib story.')
        //console.log(`Generated Mad Lib Story: \n${formattedStoryString}`)
        return formattedStoryString
    }

    render = () => {
        var formattedView = this.formatStoryToString();


        return (
            <p className="Story-text">
                {formattedView}
            </p>
        )
    }
}