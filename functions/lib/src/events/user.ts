import * as functions from 'firebase-functions'
import { createUser, deleteUser } from '../..'

const created = functions.auth.user().onCreate((user) => {
  console.log('created', user.email)
  return createUser(user)
})

const deleted = functions.auth.user().onDelete((user) => {
  console.log('deleted', user.email)
  return deleteUser(user)
})

export default { created, deleted }
