import * as React from 'react'
import styled from 'styled-components'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Button } from 'reactackle'

import { facebookAuth } from '../../firebaseApp'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .8);
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const Modal = styled.div`
  position: relative;
  margin-top: 20%;
  padding: 2rem;
  border: 1px solid #999;
  background-color: #fff;

  h1 {
    margin-bottom: 2rem;
  }
`

const IconStyled = styled(FontAwesomeIcon)``

const SocialButton = styled.p`
  button {
    width: 100%;
    text-align: left;
  }

  ${IconStyled} {
    color: ${props => props.iconColor};
  }
`

const CloseButton = styled.p`
  margin: 2rem 0 0;
  text-align: center;
`

type Props = {
  closeModal: () => void
}

export default ({ closeModal }: Props) => (
  <Backdrop onClick={closeModal}>
    <Modal>
      <h1>Lépj be Csizi tudástárába</h1>
      <p>Csak bejelentkezve tudsz kérdezni Csizitől.</p>
      <SocialButton iconColor='#3b5998'>
        <Button
          onPress={facebookAuth}
          icon={<IconStyled icon={faFacebook} size='lg' />}
          colorScheme='flat'
          outlined
          size='large'
          text='Belépés Facebookkal'
        />
      </SocialButton>
      <SocialButton iconColor='#4285f4'>
        <Button
          icon={<IconStyled icon={faGoogle} size='lg' />}
          colorScheme='flat'
          outlined
          size='large'
          text='Belépés Google-lel'
        />
      </SocialButton>
      <CloseButton><Button text='bezar' onPress={closeModal} colorScheme='flat' /></CloseButton>
    </Modal>
  </Backdrop>
)
