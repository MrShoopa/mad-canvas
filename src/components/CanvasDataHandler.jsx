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

    /*  Fetch Item Lists  */
    fetchCourses = async (
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses`

        await Axios.get(`${install_url + type_string + token_string}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
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
                    course_modules: res
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
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                console.log(res.data)
                this.state.data.accounts = res
            }).catch(err => {
                console.error(err)
                console.log('Canvas account not found.')
                return null
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
    fetchSelf = async (
        token = this.state.credentials.access_token,
        install_url = this.state.credentials.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/users/self`

        await Axios.get(`${install_url + type_string + token_string}`, {
            crossDomain: true
        })
            .then(res => {
                console.log(res.data)
                this.state.data.self = res
            })

        return this.state.data.self
    }

    /*  Fetch Random items */
    fetchRandomCourse = async (course_list = this.fetchCourses()) => {
        let dice = Math.floor(Math.random(course_list))

        return this.state.data.courses[dice]
        //TODO: NULL CASES 
    }
    fetchRandomQuiz = () => {
        let dice
        for (var i = 0; i < this.state.data.quizzes.length; i++)
            dice += Math.floor(Math.random(this.state.data.quizzes[i].length))

        let comb_index = 0;
        for (i = 0; i < this.state.data.quizzes.length; i++)
            for (var j = 0; j < this.state.data.quizzes[i].course_quizzes.length; j++)
                if (comb_index === dice) return this.state.data.quizzes[i].course_quizzes[j]
                else comb_index++

        return this.state.data.quizzes[0].course_quizzes[0]

        //TODO: NULL CASES
    }
    fetchRandomAssignment = () => {
        let dice
        for (var i = 0; i < this.state.data.assignments.length; i++)
            dice += Math.floor(Math.random(this.state.data.assignments[i].length))

        let comb_index = 0;
        for (i = 0; i < this.state.data.assignments.length; i++)
            for (var j = 0; j < this.state.data.assignments[i].course_assignments.length; j++)
                if (comb_index === dice) return this.state.data.assignments[i].course_assignments[j]
                else comb_index++

        return this.state.data.assignments[0].course_assignments[0]
    }
    fetchRandomModule = () => {
        let dice
        for (var i = 0; i < this.state.data.modules.length; i++)
            dice += Math.floor(Math.random(this.state.data.modules[i].length))

        let comb_index = 0;
        for (i = 0; i < this.state.data.modules.length; i++)
            for (var j = 0; j < this.state.data.modules[i].course_modules.length; j++)
                if (comb_index === dice) return this.state.data.modules[i].course_modules[j]
                else comb_index++

        return this.state.data.modules[0].course_modules[0]
    }
    fetchRandomRole = () => {
        let dice = Math.floor(Math.random(this.state.data.roles.length))

        return this.state.data.roles[dice]
        //TODO: NULL CASES 
    }
    fetchRandomGroup = () => {
        let dice = Math.floor(Math.random(this.state.data.groups.length))

        return this.state.data.groups[dice]
        //TODO: NULL CASES 
    }
    fetchRandomStudent = () => {
        let dice
        for (var i = 0; i < this.state.data.students.length; i++)
            dice += Math.floor(Math.random(this.state.data.students[i].length))

        let comb_index = 0;
        for (i = 0; i < this.state.data.students.length; i++)
            for (var j = 0; j < this.state.data.students[i].course_students.length; j++)
                if (comb_index === dice) return this.state.data.students[i].course_students[j]
                else comb_index++

        return this.state.data.students[0].course_students[0]
    }
    fetchRandomTeacher = () => {
        let dice
        for (var i = 0; i < this.state.data.teachers.length; i++)
            dice += Math.floor(Math.random(this.state.data.teachers[i].length))

        let comb_index = 0;
        for (i = 0; i < this.state.data.teachers.length; i++)
            for (var j = 0; j < this.state.data.teachers[i].course_teachers.length; j++)
                if (comb_index === dice) return this.state.data.teachers[i].course_teachers[j]
                else comb_index++

        return this.state.data.teachers[0].course_teachers[0]
    }
    fetchSelfName = () => {
        return this.fetchSelf().name
    }

    render() {
        return (<i></i>)
    }
}
CanvasDataHandler.defaultProps = {
    data: {}
}