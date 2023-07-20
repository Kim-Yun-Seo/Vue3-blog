/* eslint-disable no-useless-constructor */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// import { onRequest } from 'firebase-functions/v2/https'
// import * as logger from 'firebase-functions/logger'
// import { initializeApp } from 'firebase-admin'
// import onUser from './events/user'

import * as functions from 'firebase-functions'
import {
  getFirestore,
  FirestoreDataConverter,
  DocumentData,
  FieldValue
} from 'firebase-admin/firestore'
// import { createUser, deleteUser } from './models/user'
// import { db } from './plugins/firebase'
import { createHash } from 'crypto'
import { UserRecord } from 'firebase-admin/auth'

const admin = require('firebase-admin')
admin.initializeApp()

const db = getFirestore()
export class User {
  constructor (
    readonly email:string,
    readonly displayName: string,
    readonly photoURL: string,
    readonly createdAt?: Date | undefined
  ) { }
}

const converter:FirestoreDataConverter<User> = {
  toFirestore (model: User): DocumentData {
    return {
      email: model.email,
      displayName: model.displayName,
      photoURL: model.photoURL,
      createdAt: FieldValue.serverTimestamp()
    }
  },

  fromFirestore (snapshot): User {
    const data = snapshot.data()
    return new User(
      data.email,
      data.displayName,
      data.photoURL
    )
  }
}

const collection = db.collection('users').withConverter(converter)

export const createUser = (userRecord: UserRecord) => {
  if (!userRecord.email) throw Error('invaild email')
  const hash = createHash('md5').update(userRecord.uid).digest('hex')
  const photoURL = userRecord.photoURL || `https://www.gravatar.com/avatar/${hash}`
  const user = new User(
    userRecord.email,
    userRecord.displayName || '',
    photoURL
  )
  return collection.doc(userRecord.uid).set(user)
}

export const deleteUser = (userRecord: UserRecord) => {
  return collection.doc(userRecord.uid).delete()
}

export const userCreated = functions.auth.user().onCreate((user) => {
  console.log('created', user.email)
  // return db.collection('users').doc(user.uid).set({
  //   email: user.email,
  //   displayName: user.displayName
  // })
  return createUser(user)
})

export const userDeleted = functions.auth.user().onDelete((user) => {
  // console.log('deleted', user.email)
  // return db.collection('users').doc(user.uid).delete()
  return deleteUser(user)
})

console.log(`run ${new Date().toLocaleString()}`)
