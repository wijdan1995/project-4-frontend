import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
import messages from '../messages'

import { Form, Button } from 'react-bootstrap'

class ChangePassword extends Component {
  constructor() {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render() {
    const { oldPassword, newPassword } = this.state

    return (
      <Form className='auth-form' onSubmit={this.onChangePassword}>
        <h3>Change Password</h3>
        <Form.Group >
          <Form.Label>Old Password</Form.Label>
          <Form.Control required
            name="oldPassword"
            value={oldPassword}
            type="password"
            placeholder="Old Password"
            onChange={this.handleChange} />
        </Form.Group>
        <Form.Group >
          <Form.Label>New Password</Form.Label>
          <Form.Control required
            name="newPassword"
            value={newPassword}
            type="password"
            placeholder="New Password"
            onChange={this.handleChange} />
        </Form.Group>

        <Button variant="dark" type="submit">
          Change Password
              </Button>
        <br />
      </Form>

      // <form className='auth-form' onSubmit={this.onChangePassword}>
      //   <h3>Change Password</h3>

      //   <label htmlFor="oldpw">Old Password</label>
      //   <input
      //     required
      //     name="oldPassword"
      //     value={oldPassword}
      //     type="password"
      //     placeholder="Old Password"
      //     onChange={this.handleChange}
      //   />
      //   <label htmlFor="newPassword">New Password</label>
      //   <input
      //     required
      //     name="newPassword"
      //     value={newPassword}
      //     type="password"
      //     placeholder="New Password"
      //     onChange={this.handleChange}
      //   />
      //   <button type="submit">Change Password</button>
      // </form>
    )
  }
}

export default withRouter(ChangePassword)
