// @flow

import * as React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import App from 'grommet/components/App'
import Sidebar from 'grommet/components/Sidebar'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Anchor from 'grommet/components/Anchor'
import Menu from 'grommet/components/Menu'
import MenuIcon from 'grommet/components/icons/base/Menu'
import UserIcon from 'grommet/components/icons/base/User'
import ArchiveIcon from 'grommet/components/icons/base/Archive'

import firebase, { facebookAuth, signOut } from '../../firebaseApp'

import Container from '../../components/Container'
import Archive from '../Archive'
import Permalink from '../Permalink'
import Home from '../Home'

import User from '../../models/User'

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

const UserMenu = ({ user }: { user: User }) => (
  <Menu
    icon={<MenuIcon />}
    dropAlign={{ 'right': 'right', 'top': 'bottom' }}
  >
    <Anchor onClick={signOut} label='Kijelentkezés' />
  </Menu>
)

export default class CsiziApp extends React.Component<{}, State> {
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
    const { user } = this.state

    return (
      <BrowserRouter>
        <App centered>
          <Header fixed size='small' align='baseline'>
            <Title>
              <Anchor path={{ path: '/', index: true }} label='Csizi válaszol' />
            </Title>
            <Menu
              fill
              direction='row'
            >
              <Anchor path={{ path: '/archive' }} label='Archívum' />
            </Menu>
            <Box
              flex
              justify='end'
              direction='row'
              responsive={false}
            >
              {user
                ? <UserMenu user={user} />
                : <Anchor icon={<UserIcon />} onClick={facebookAuth} />
              }
            </Box>
          </Header>
          <RouteWithUser exact path='/' component={Home} user={user} />
          <RouteWithUser exact path='/archive' component={Archive} user={user} />
          <RouteWithUser exact path='/entry/:entryId' component={Permalink} user={user} />
        </App>
      </BrowserRouter>
    )
  }
}
