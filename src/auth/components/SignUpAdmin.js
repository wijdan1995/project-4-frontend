import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUpAdmin, signIn } from '../api'
import messages from '../messages'

class SignUpAdmin extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            name: ''
        }
    }

    handleChange = event => this.setState({
        [event.target.name]: event.target.value
    })

    onSignUpAdmin = event => {
        event.preventDefault()

        const { alert, history, setUser } = this.props

        signUpAdmin(this.state)
            .then(() => signIn(this.state))
            .then(res => setUser(res.data.user))
            .then(() => alert(messages.signUpSuccess, 'success'))
            .then(() => history.push('/'))
            .catch(error => {
                console.error(error)
                this.setState({ email: '', password: '', passwordConfirmation: '', name: '' })
                alert(messages.signUpFailure, 'danger')
            })
    }

    render() {
        const { email, password, passwordConfirmation, name } = this.state

        return (
            <form className='auth-form' onSubmit={this.onSignUpAdmin}>
                <h3>Sign Up As An Admin</h3>

                <label htmlFor="name">Admin name</label>
                <input
                    required
                    name="name"
                    value={name}
                    type="name"
                    placeholder="Admin name"
                    onChange={this.handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    required
                    name="email"
                    value={email}
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    required
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                />
                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <input
                    required
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
        )
    }
}

export default withRouter(SignUpAdmin)
