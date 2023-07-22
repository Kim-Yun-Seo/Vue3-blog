/* eslint-disable no-useless-constructor */
// functions에서 가져온 user를 프론트에서 사용할 수 있게 바꾼다.

import {
  FirestoreDataConverter,
  DocumentData,
  Timestamp,
  collection,
  query,
  getDocs
} from 'firebase/firestore'

import { db } from 'boot/firebase'

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
    return model
  },

  fromFirestore (snapshot): User {
    const data = snapshot.data()
    return new User(
      data.email,
      data.displayName,
      data.photoURL,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined
    )
  }
}

const userCollection = collection(db, 'users').withConverter(converter)

export const getUsers = () => {
  const q = query(userCollection)
  return getDocs(q)
}
