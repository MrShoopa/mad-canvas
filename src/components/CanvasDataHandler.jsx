import React from 'react'
import Axios from 'axios'
import AxiosRetry from 'axios-retry'


import credentials from '../auth/credentials.json'


AxiosRetry(Axios, { retries: 5 });


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

            data: this.props.data
        }
    }
    componentDidMount = () => {
        this.props.onRef(this)
    }
    componentWillUnmount = () => {
        //this.props.onRef(undefined)
    }

    errorInterceptor = () => Axios.interceptors.response.use(
        response => response,
        error => {
            const { status } = error.response;
            if (status === 401) {
                // Custom function
            }
            return Promise.reject(error);
        }
    );

    /*  Fetch Item Lists  */
    initializeData = async () => {
        let courses = await this.fetchCourses()
        let groups = await this.fetchGroups()

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
                //console.log(course_id)
                //console.log(`Assignments found in ${course_id}: ${res.data.length}`)
                if (res.data.length === 0) return null


                return res.data
                this.state.data.assignments.push({
                    course_id: `${course_id}`,
                    course_assignments: res
                })
            }).catch(err => {
                console.error(`Unable to fetch assignments from a course`)
                if (err.response.status === 401) console.error(`Unauthorized from course ${course_id}`)
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
            }).catch(err => {
                console.error(`Unable to fetch quizzes from a course`)
                if (err.response.status === 401) console.error(`Unauthorized from course ${course_id}`)
            })

        return this.state.data.quizzes
    }
    fetchModules = async (course_id = this.fetchRandomCourseID(),
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${await course_id}/modules`

        const data = await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                //console.log(res.data)
                //console.log(`Modules found in ${course_id}: ${res.data.length}`)


                return res.data
                this.state.data.modules.push({
                    course_id: `${course_id}`,
                    course_modules: res
                })
            }).catch(err => {
                console.error(`Unable to fetch modules from a course`)
                if (err.response.status === 401) console.error(`Unauthorized from course ${course_id}`)
            })

        return data
    }
    fetchUsers = async (course_id = this.fetchRandomCourseID(),
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${await course_id}/users`

        const data = await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                //console.log(res.data)
                //console.log(`Users found in ${course_id}: ${res.data.length} `)

                return res.data
                this.state.data.users.push({
                    course_id: `${course_id}`,
                    course_users: res
                })
            }).catch(err => {
                console.error(`Unable to fetch users from a course`)
                if (err.response.status === 401) console.error(`Unauthorized from course ${course_id}`)
            })

        return data
    }

    //  Normally returns null unless Admin
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
                    console.log('Canvas accounts not found. Not admin?')
                    return false
                })

        if (!account_exists) return null;

        return this.state.data.accounts
    }
    fetchGroups = async (
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/users/self/groups`

        const data = await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                this.state.data.groups = res.data

                //console.log('Groups found in user: ')
                //console.log(this.state.data.groups)
                return res.data
            })


        return data
    }

    /*
    THESE METHODS REQUIRE A USER ID.
    TODO: Plug in account/user id
    */
    fetchStudents = async (course_id = this.fetchRandomCourseID(),
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/courses/${await course_id}/users=enrollment_type[student]`

        const data = await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                console.log(res.data)
                console.log(`Students found in ${course_id}: ${res.data.length} `)

                return res.data
                this.state.data.students.push({
                    course_id: `${course_id}`,
                    course_students: res
                })
            }).catch(err => {
                console.error(`Unable to fetch students from a course`)
                if (err.response.status === 401) console.error(`Unauthorized from course ${course_id}`)
            })

        return data
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

                return res.data
                this.state.data.teachers.push({
                    course_id: `${course_id}`,
                    course_teachers: res
                })
            }).catch(err => {
                console.error(`Unable to fetch teachers from a course`)
                if (err.response.status === 401) console.error(`Unauthorized from course ${course_id}`)
            })

        return this.state.data.teachers
    }

    fetchRoles = async (account_id = this.state.data.accounts[0].id,
        token = credentials.canvas.access_token,
        install_url = credentials.canvas.install_url) => {

        var token_string = `?access_token=${token}`
        var type_string = `/api/v1/accounts/${account_id}/roles`

        const data = await Axios.get(`${this.props.proxy_url +
            install_url + type_string + token_string}`,
            this.props.headers
        )
            .then(res => {
                this.state.data.roles = res.data

                console.log('Roles found in user: ')
                console.log(this.state.data.roles)
                return res.data
            })


        return data
    }

    //  Self User ID required
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

    /*  
    FETCH RANDOM ITEMS

    Use these after setting the state to include pre-generated data.

    You can also throw in an existing list as a parameter when applicable.

    TODO: Error handling and null cases
     */
    fetchRandomCourse = async (course_list = this.state.data.courses) => {

        let dice = Math.floor(Math.random() * course_list.length)

        let logInfo = () => {
            console.log(course_list)
            console.log('fetched random course')
            console.log(course_list[dice])
        }

        //logInfo()
        return course_list[dice]
    }

    fetchRandomCourseID = async (course_list = this.state.data.courses) => {

        let dice = Math.floor(Math.random() * course_list.length)

        //console.log(`Fetched course ID ${course_list[dice].id}`)
        return course_list[dice].id
    }

    fetchRandomAssignment = async () => {
        let assignment_list = null

        while (assignment_list == null)
            assignment_list = await this.fetchAssignments()


        let logInfo = () => {
            console.log(assignment_list)
            console.log('fetched random assignment')
            console.log(assignment_list[dice])
        }


        let dice = Math.floor(Math.random() * assignment_list.length)

        //logInfo()
        return assignment_list[dice]
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
    }

    fetchRandomModule = async () => {
        let module_list = null

        while (module_list == null)
            module_list = await this.fetchModules()


        let logInfo = () => {
            console.log(module_list)
            console.log('fetched random module')
            console.log(module_list[dice])
        }


        let dice = Math.floor(Math.random() * module_list.length)

        logInfo()
        return module_list[dice]
    }


    fetchRandomGroup = async (group_list = this.state.data.groups) => {
        let dice = Math.floor(Math.random() * group_list.length)

        let logInfo = () => {
            console.log(group_list)
            console.log('fetched random group')
            console.log(group_list[dice])
        }

        //logInfo()
        return group_list[dice]
    }

    fetchRandomRole = async (role_list = this.state.data.roles) => {
        let dice = Math.floor(Math.random * role_list.length)

        let logInfo = () => {
            console.log(role_list)
            console.log('fetched random role')
            console.log(role_list[dice])
        }

        //logInfo()
        return role_list[dice]
    }

    fetchRandomUser = async () => {
        let user_list = null

        while (user_list == null)
            user_list = await this.fetchUsers()


        let logInfo = () => {
            console.log(user_list)
            console.log('fetched random user')
            console.log(user_list[dice])
        }


        let dice = Math.floor(Math.random() * user_list.length)

        //logInfo()
        return user_list[dice]
    }

    fetchRandomStudent = async () => {
        let student_list = null

        while (student_list == null)
            student_list = await this.fetchStudents()


        let logInfo = () => {
            console.log(student_list)
            console.log('fetched random student')
            console.log(student_list[dice])
        }


        let dice = Math.floor(Math.random() * student_list.length)

        //logInfo()
        return student_list[dice]
    }

    fetchRandomTeacher = async () => {
        let teacher_list = null

        while (teacher_list == null)
            teacher_list = await this.fetchStudents()


        let logInfo = () => {
            console.log(teacher_list)
            console.log('fetched random student')
            console.log(teacher_list[dice])
        }


        let dice = Math.floor(Math.random() * teacher_list.length)

        //logInfo()
        return teacher_list[dice]
    }
    fetchSelfName = () => {
        return this.fetchSelf().name
    }


    //  And finally...
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