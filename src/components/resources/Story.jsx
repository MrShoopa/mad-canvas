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
            if (this.props.story.value.length > this.props.story.blanks.length
                && i === this.props.story.value.length - 1)
                break;  //  Last word is a blank


            let valueString = this.props.story.value[i]
            //console.log(valueString)
            formattedStoryString += `${valueString} `


            if (i === this.props.story.value.length - 3) {
                let lastValueString = this.props.story.value[i + 1]
                //console.log(`touched last value`)
                formattedStoryString += lastValueString
                break;
            }

            let blankString = this.props.story.blanks[i]
            //console.log(blankString)
            formattedStoryString += `${blankString} `

        }

        console.log(`Generated Mad Lib Story: \n${formattedStoryString}`)
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