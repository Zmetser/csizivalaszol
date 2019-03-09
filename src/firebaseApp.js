import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyDZ8rFCMnvRSRjbPVJ0YMY_rLM_FmSBLdM',
  authDomain: 'csizivalaszol.firebaseapp.com',
  databaseURL: 'https://csizivalaszol.firebaseio.com',
  projectId: 'csizivalaszol',
  storageBucket: 'csizivalaszol.appspot.com',
  messagingSenderId: '634906101849'
}

export function facebookAuth () {
  const provider = new firebase.auth.FacebookAuthProvider()
  const auth = firebase.auth()

  return auth.signInWithPopup(provider).catch(error => {
    console.error(error)
    throw new Error('AUTH_ERROR')
  })
}

export function signOut () {
  firebase.auth().signOut()
}

export default firebase.initializeApp(config)
