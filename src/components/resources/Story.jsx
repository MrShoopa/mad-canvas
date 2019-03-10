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
                continue;  //  Last word is a blank


            let valueString = this.props.story.value[i]
            //console.log(valueString)
            formattedStoryString += `${valueString} `

            let blankString = this.props.story.blanks[i]
            //console.log(blankString)
            formattedStoryString += `${blankString} `

            if (i === this.props.story.blanks.length - 1
                && this.props.story.value[i + 1] && this.props.story.value[i + 1] !== 0)
                formattedStoryString += `${this.props.story.value[i + 1]}`

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