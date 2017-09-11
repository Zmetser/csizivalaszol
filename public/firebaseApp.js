/**
 * @flow
 */
import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyDZ8rFCMnvRSRjbPVJ0YMY_rLM_FmSBLdM',
  authDomain: 'csizivalaszol.firebaseapp.com',
  databaseURL: 'https://csizivalaszol.firebaseio.com',
  projectId: 'csizivalaszol',
  storageBucket: 'csizivalaszol.appspot.com',
  messagingSenderId: '634906101849'
}

export default firebase.initializeApp(config)
