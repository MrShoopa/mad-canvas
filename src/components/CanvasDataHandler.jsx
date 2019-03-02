import React from 'react'
import Axios from 'axios'

export default class CanvasDataHandler extends React.Component {
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

    fetchRandomCourse = () => {
        //TODO:
        return "sdjkfnaskdjfn"
    }
    fetchRandomQuiz = () => {

    }
    fetchRandomAssignment = () => {

    }
    fetchRandomRoles = () => {

    }
    fetchRandomGroup = () => {

    }
    fetchRandomStudent = () => {

    }
    fetchRandomAdmin = () => {

    }
    fetchSelfName = () => {

    }

    render() {
        return (<i></i>)
    }
}