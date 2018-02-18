// @flow

import * as React from 'react'
import autobind from 'autobind-decorator'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUser, faBars } from '@fortawesome/fontawesome-free-solid'

import Flex, { FlexItem } from 'styled-flex-component'
import { Button } from 'reactackle'

import Container from '../Container'
import HeaderNav from './HeaderNav'
import LoginModal from './LoginModal'

import User from '../../models/User'

const Header = styled.header`
  margin-bottom: 2rem;
  color: #333;
`

const HeaderTop = styled.div`
  border-bottom: 4px solid #3EC9A7;
`

const Logo = FlexItem.extend`
  font-family: 'Patua One', cursive;
  font-size: 30px;
  text-transform: uppercase;

  @media (min-width: 576px) {
    font-size: 40px;
  }

  a {
    color: #333;
    text-decoration: none;
  }
`

type Props = {
  user: ?User
}

type State = {
  menuOpen: boolean,
  modalOpen: boolean
}

export default class HeaderComponent extends React.Component<Props, State> {
  state = {
    menuOpen: false,
    modalOpen: false
  }

  @autobind
  toggleMenu () {
    this.setState(prevState => ({ ...prevState, menuOpen: !prevState.menuOpen }))
  }

  @autobind
  openLoginModal () {
    this.setState({ modalOpen: true })
  }

  @autobind
  closeLoginModal () {
    this.setState({ modalOpen: false })
  }

  render () {
    const { user } = this.props
    const { menuOpen, modalOpen } = this.state

    return (
      <Header>
        <HeaderTop>
          <Container>
            <Flex full justifyBetween alignCenter>
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
                    onPress={this.openLoginModal}
                    icon={<FontAwesomeIcon icon={faUser} size='2x' />}
                    colorScheme='flat'
                  />
                }
              </FlexItem>
            </Flex>
          </Container>
        </HeaderTop>
        {menuOpen && <HeaderNav />}
        {modalOpen && <LoginModal closeModal={this.closeLoginModal} />}
      </Header>
    )
  }
}
