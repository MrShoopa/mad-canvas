import React from 'react'
import Axios from 'axios'

import credentials from '../auth/credentials.json'

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
        //this.props.onRef(undefined)
    }

    /*  Fetch Item Lists  */
    formData = async () => {
        let courses = await this.fetchCourses()
        let assignments = await this.fetchAssignments()
        //let modules = await this.fetchModules()
        //console.log('data formed')

        return { courses }
    }


    fetchCourses = async (
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses`

        const data = await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                this.state.data.courses = res.data
                //console.log(this.state.data.courses)
                return res.data
            })


        return data
    }

    //TODO: FIX assignments
    fetchAssignments = async (course_id = this.fetchRandomCourseID(),
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${await course_id}/assignments`

        const data = await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                console.log(`Assignments found:`)
                console.log(res.data)
                if (res.data === null) return null
                return res.data

                this.state.data.assignments.push({
                    course_id: `${course_id}`,
                    course_assignments: res
                })
            })

        return data
    }

    fetchQuizzes = async (course_id = this.fetchRandomCourseID(),
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${await course_id}/quizzes`

        await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                console.log(res.data)
                this.state.data.quizzes.push({
                    course_id: `${course_id}`,
                    course_quizzes: res
                })
            })

        return this.state.data.quizzes
    }
    fetchModules = async (course_id = this.fetchRandomCourseID(),
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${await course_id}/modules`

        await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                console.log(res.data)
                this.state.data.modules.push({
                    course_id: `${course_id}`,
                    course_modules: res
                })
            })

        return this.state.data.modules
    }
    fetchStudents = async (course_id = this.fetchRandomCourseID(),
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${await course_id}/users?=enrollment_type[student]`

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
    fetchTeachers = async (course_id = this.fetchRandomCourseID(),
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${await course_id}/users?=enrollment_type[teacher]`

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
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/accounts`

        let account_exists =
            await Axios.get(`${this.props.proxy_url +
                install_url + type_string + token_string}`,
                this.props.headers
            )
                .then(res => {
                    //console.log('Account list: ')
                    //console.log(res.data)
                    this.state.data.accounts = res
                }).catch(err => {
                    console.error(err)
                    console.log('Canvas account not found.')
                    return false
                })
        if (!account_exists) return null;


        return this.state.data.accounts
    }
    //TODO: Functionalize with account's 'users'
    fetchRoles = async (account_id = this.state.data.accounts[0].id,
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/accounts/${account_id}/roles`

        await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`, {
                crossDomain: true
            })
            .then(res => {
                console.log(res.data)
                this.state.data.roles = res
            })

        return this.state.data.roles
    }
    fetchGroups = async (
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

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
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

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
    fetchRandomCourse = async (course_list = this.state.data.courses) => {

        let dice = Math.floor(Math.random() * course_list.length)

        console.log(course_list[dice])
        return course_list[dice]
        //TODO: NULL CASES 
    }
    fetchRandomCourseID = async (course_list = this.state.data.courses) => {

        let dice = Math.floor(Math.random() * course_list.length)

        //console.log(`Fetched course ID ${course_list[dice].id}`)
        return course_list[dice].id
        //TODO: NULL CASES 
    }
    fetchRandomQuiz = async () => {
        let quiz_list = this.fetchQuizzes()

        let dice
        for (var i = 0; i < quiz_list.length; i++)
            dice += Math.floor(Math.random() * quiz_list[i].length)

        let comb_index = 0;
        for (i = 0; i < quiz_list.length; i++)
            for (var j = 0; j < quiz_list[i].course_quizzes.length; j++)
                if (comb_index === dice) return quiz_list[i].course_quizzes[j]
                else comb_index++

        console.log('fetched random quiz')

        return this.quiz_list[0].course_quizzes[0]

        //TODO: NULL CASES
    }
    fetchRandomAssignment = async () => {
        let assignment_list = null

        while (assignment_list == null)
            assignment_list = await this.fetchAssignments()


        let dice
        for (var i = 0; i < assignment_list.length; i++)
            dice += Math.floor(Math.random(assignment_list.length))

        let comb_index = 0;
        for (i = 0; i < assignment_list.length; i++)
            for (var j = 0; j < assignment_list[i].course_assignments.length; j++)
                if (comb_index === dice) return assignment_list[i].course_assignments[j]
                else comb_index++

        console.log('fetched random assignment')
        return assignment_list[0].course_assignments[0]
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

        console.log('fetched random module')
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
    proxy_url: 'https://cors-anywhere.herokuapp.com/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
    },
    data: {}
}