/**
 * @flow
 */
import React from 'react'
import AppBar from 'material-ui/AppBar'

import Entries from '../../components/Entries'

const AppBarExampleIcon = () => (
  <div>
    <AppBar
      title='Csizi válaszol archívum'
      showMenuIconButton={false}
    />
    <Entries />
  </div>
)

export default AppBarExampleIcon
