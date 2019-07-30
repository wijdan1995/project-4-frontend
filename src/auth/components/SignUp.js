import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'

import { Form, Button } from 'react-bootstrap'

class SignUp extends Component {
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

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
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
      <Form className='auth-form' onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>
        <Form.Group >
          <Form.Label>User Name</Form.Label>
          <Form.Control required
            name="name"
            value={name}
            type="name"
            placeholder="User name"
            onChange={this.handleChange} />
        </Form.Group>
        <Form.Group >
          <Form.Label>Email address</Form.Label>
          <Form.Control required
            type="email"
            name="email"
            value={email}
            placeholder="Email address"
            onChange={this.handleChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange} />
        </Form.Group>

        <Button variant="dark" type="submit">
          Sign Up
      </Button>
      </Form>


      // <form className='auth-form' onSubmit={this.onSignUp}>
      //   <h3>Sign Up</h3>

      //   <label htmlFor="name">User name</label>
      //   <input
      //     required
      //     name="name"
      //     value={name}
      //     type="name"
      //     placeholder="User name"
      //     onChange={this.handleChange}
      //   />
      //   <label htmlFor="email">Email</label>
      //   <input
      //     required
      //     name="email"
      //     value={email}
      //     type="email"
      //     placeholder="Email"
      //     onChange={this.handleChange}
      //   />
      //   <label htmlFor="password">Password</label>
      //   <input
      //     required
      //     name="password"
      //     value={password}
      //     type="password"
      //     placeholder="Password"
      //     onChange={this.handleChange}
      //   />
      //   <label htmlFor="passwordConfirmation">Confirm Password</label>
      //   <input
      //     required
      //     name="passwordConfirmation"
      //     value={passwordConfirmation}
      //     type="password"
      //     placeholder="Confirm Password"
      //     onChange={this.handleChange}
      //   />
      //   <button type="submit">Sign Up</button>
      // </form>
    )
  }
}

export default withRouter(SignUp)
