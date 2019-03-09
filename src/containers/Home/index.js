import * as React from 'react'

import User from '../../models/User'
import { facebookAuth, signOut } from '../../firebaseApp'
import styled from 'styled-components'

const FBLogin = styled.button``

export default function Home ({ user }: { user: ?User }) {
  return (
    <div>
      <h1>Csizi válaszol</h1>
      {user
        ? <button onClick={signOut}>logout</button>
        : <FBLogin onClick={facebookAuth}>Facebook login</FBLogin>
      }
    </div>
  )
}

