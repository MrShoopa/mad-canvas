import React from 'react'
import Axios from 'axios'

/*
  How to use:
  Render a hidden CanvasDataHandler component first, then set the state
  to include your credentials (see below in constructor) in a JSON object.
*/

export default class CanvasDataHandler extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

            //  Required
            credentials: {
                install_url: 'https://canvas.instructure.com',
                access_token: '',
            },

            data: {}
        }
    }
    componentDidMount = () => {
        this.props.onRef(this)
    }
    componentWillUnmount = () => {
        this.props.onRef(undefined)
    }

    fetchCourses = async (
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses`

        await Axios.get(`${install_url + type_string + token_string}`)
            .then(res => {
                console.log(res)
                this.state.data.courses = res
            })

        return this.state.data.courses
    }

    fetchAssignments = async (course_id,
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${course_id}/assignments`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {


                console.log(res.data)
                this.state.data.assignments.push({
                    course_id: `${course_id}`,
                    course_assignments: res
                })
            })

        return this.state.data.assignments
    }
    fetchQuizzes = async (course_id,
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${course_id}/quizzes`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {
                console.log(res.data)
                this.state.data.quizzes.push({
                    course_id: `${course_id}`,
                    course_quizzes: res
                })
            })

        return this.state.data.quizzes
    }
    fetchModules = async (course_id,
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${course_id}/modules`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {
                console.log(res.data)
                this.state.data.modules.push({
                    course_id: `${course_id}`,
                    courses_modules: res
                })
            })

        return this.state.data.modules
    }
    fetchStudents = async (course_id,
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${course_id}/users?=enrollment_type[student]`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {
                console.log(res.data)
                this.state.data.students.push({
                    course_id: `${course_id}`,
                    course_students: res
                })
            })

        return this.state.data.students
    }
    fetchTeachers = async (course_id,
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${course_id}/users?=enrollment_type[teacher]`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {
                console.log(res.data)
                this.state.data.teachers.push({
                    course_id: `${course_id}`,
                    course_teachers: res
                })
            })

        return this.state.data.teachers
    }
    fetchAccounts = async (
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/accounts`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {
                console.log(res.data)
                this.state.data.accounts = res
            })

        return this.state.data.accounts
    }
    //TODO: Functionalize with account's 'users'
    fetchRoles = async (account_id = this.state.data.accounts[0].id,
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/accounts/${account_id}/roles`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {
                console.log(res.data)
                this.state.data.roles = res
            })

        return this.state.data.roles
    }
    fetchGroups = async (
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/users/self/groups`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {
                console.log(res.data)
                this.state.data.groups = res
            })

        return this.state.data.groups
    }

    fetchRandomCourse = async () => {
        //TODO:

        return "sdjkfnaskdjfn"
    }
    fetchRandomQuiz = () => {

    }
    fetchRandomAssignment = () => {

    }
    fetchRandomModule = () => {

    }
    fetchRandomRole = () => {

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
CanvasDataHandler.defaultProps = {
    data: {}
}