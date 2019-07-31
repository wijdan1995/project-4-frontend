import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AlertDismissible from './auth/components/AlertDismissible'

import SignUpAdmin from './auth/components/SignUpAdmin'
// import Videos
import VideoIndex from './videos/VideoIndex'
import VideoShow from './videos/VideoShow'
import VideoCreate from './videos/VideoCreate'
import VideoUpdate from './videos/VideoUpdate'
//import list
import ListIndex from './list/ListIndex'
// home
import Home from './home/Home'
// footer
import Footer from './footer/Footer'



class App extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render() {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route exact path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-up-admin' render={() => (
            <SignUpAdmin alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Home />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create' render={() => (
            <VideoCreate user={user} />
          )} />
          <Route user={user} exact path='/videos' render={() => (
            <VideoIndex user={user} />
          )} />
          <Route user={user} exact path='/videos/:id' render={(props) => (
            <VideoShow user={user} videoId={props.match.params.id} />
          )} />
          <AuthenticatedRoute user={user} path='/videos/:id/update' render={() => (
            <VideoUpdate user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/mylist' render={() => (
            <ListIndex user={user} />
          )} />
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App
