import * as React from 'react'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

import { FlexItem } from 'styled-flex-component'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faFolder, faFolderOpen } from '@fortawesome/free-regular-svg-icons'

import Container from '../Container'

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

export default () => (
  <HeaderNav>
    <Container>
      <FlexItem full alignCenter>
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
      </FlexItem>
    </Container>
  </HeaderNav>
)
