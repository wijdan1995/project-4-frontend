import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    {/* <Link to="/create">Create</Link> */}
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const authenticatedOptionsAdmin = (
  <React.Fragment>
    <Link to="/create">Create</Link>
  </React.Fragment>
)
const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
    <Link to="/videos">Videos</Link>
  </React.Fragment>
)

class Header extends Component {
  render() {
    const user = this.props.user
    let isAdmin;
    if (user) {
      isAdmin = user.admin
    } else {


    }


    return (<header className="main-header">

      <h1>Learn Coding</h1>

      <nav>
        {user && <span>Welcome, {user.name}</span>}
        {alwaysOptions}
        {isAdmin ? authenticatedOptionsAdmin : ''}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </nav>
    </header>);
  }
}

export default Header;