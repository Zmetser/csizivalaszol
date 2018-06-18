// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'

import firebase from './firebaseApp'

import User from './models/User'

import Archive from './containers/Archive'
import Permalink from './containers/Permalink'
import Home from './containers/Home'

import Container from './components/Container'
import Header from './components/Header'

function RouteWithUser ({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => <Component {...props} user={user} />}
    />
  )
}

type State = {
  user: ?User,
  loading: boolean
}

export default class App extends React.Component<{}, State> {
  unsubscribeAuthObserver: () => void

  state = {
    user: null,
    loading: true
  }

  componentDidMount () {
    this.unsubscribeAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        user: user ? new User(user) : null,
        loading: false
      })
    })
  }

  componentWillUnmount () {
    this.unsubscribeAuthObserver()
  }

  render () {
    const { loading, user } = this.state

    if (loading) {
      return <Container><p>Loading...</p></Container>
    }

    return (
      <BrowserRouter>
        <React.Fragment>
          <Header user={user} />
          <Container>
            <RouteWithUser exact path='/' component={Home} user={user} />
            <RouteWithUser exact path='/archive' component={Archive} user={user} />
            <RouteWithUser exact path='/entry/:entryId' component={Permalink} user={user} />
          </Container>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
