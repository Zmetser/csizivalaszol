import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'

import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { faFolder, faFolderOpen } from '@fortawesome/free-regular-svg-icons'

import Flex, { FlexItem } from 'styled-flex-component'
import { Button } from 'reactackle'

import { containerMixin } from './Container'

import User from '../models/User'

const Header = styled.header`
  margin-bottom: 2rem;
  color: #333;
`

const FlexContainer = styled(Flex)`
  ${containerMixin}
`

const HeaderTop = styled.div`
  border-bottom: 4px solid #3EC9A7;
`

const Logo = styled(FlexItem)`
  font-family: 'Patua One', cursive;
  font-size: 40px;
  text-transform: uppercase;

  a {
    color: #333;
    text-decoration: none;
  }
`

const HeaderNav = styled.div`
  background-color: #616668;
  padding: .7rem;
`

const Nav = styled(FlexItem)`
  order: 2;
  width: 100%;

  ul {
    padding: 0;
    margin: 0;
    display: flex;

    li {
      display: inline-block
    }
  }
`

const NavItem = styled(NavLink)`
  display: block;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  font-size: .9rem;

  &:hover, &.active {
    color: #F2E8C4;
    .icon { display: none }
    .icon-hover { display: block }
  }
`

const NavItemIcon = styled.i`
  &.icon { display: block }
  &.icon-hover { display: none; margin-left: 5px; }
`

type Props = {
  user: ?User
}

type State = {
  menuOpen: boolean
}

export default class HeaderComponent extends React.Component<Props, State> {
  state = {
    menuOpen: false
  }

  toggleMenu = () => {
    this.setState(prevState => ({ ...prevState, menuOpen: !prevState.menuOpen }))
  }

  render () {
    const { user } = this.props
    const { menuOpen } = this.state

    return (
      <Header>
        <HeaderTop>
          <FlexContainer full justifyBetween alignCenter>
            <FlexItem>
              <Button
                onPress={this.toggleMenu}
                icon={<FontAwesomeIcon icon={faBars} size='2x' />}
                colorScheme='flat'
              />
            </FlexItem>
            <Logo><Link to='/'>Csizi válaszol</Link></Logo>
            <FlexItem>
              {user
                ? user.displayName
                : <Button
                  icon={<FontAwesomeIcon icon={faUser} size='2x' />}
                  colorScheme='flat'
                />
              }
            </FlexItem>
          </FlexContainer>
        </HeaderTop>
        {menuOpen &&
          <HeaderNav>
            <FlexContainer full alignCenter>
              <Nav as="nav">
                <ul>
                  <li>
                    <NavItem to='/archive' activeClassName='active'>
                      <NavItemIcon className='icon'><FontAwesomeIcon icon={faFolder} size='3x' /></NavItemIcon>
                      <NavItemIcon className='icon-hover'><FontAwesomeIcon icon={faFolderOpen} size='3x' /></NavItemIcon>
                      Archívum
                    </NavItem>
                  </li>
                </ul>
              </Nav>
            </FlexContainer>
          </HeaderNav>
        }
      </Header>
    )
  }
}
