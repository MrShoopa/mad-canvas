import React from 'react';

export default class Story extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            //story: ''
        }
    }


    render = () => {
        var formattedView = this.formatStoryToString();


        return (
            formattedView
        )
    }
}