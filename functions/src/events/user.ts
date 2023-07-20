import * as functions from 'firebase-functions'
import { db } from '../plugins/firebase'

const created = functions.auth.user().onCreate((user) => {
  console.log('created', user.email)
  return db.collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName
  })
})

const deleted = functions.auth.user().onDelete((user) => {
  console.log('deleted', user.email)
  return db.collection('users').doc(user.uid).delete()
})

export default { created, deleted }
