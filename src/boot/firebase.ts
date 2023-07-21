import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import {
  getAuth, connectAuthEmulator
} from 'firebase/auth'

import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

initializeApp(firebaseConfig)

const auth = getAuth()
auth.useDeviceLanguage()
connectAuthEmulator(auth, 'http://127.0.0.1:9101')

const db = getFirestore()
// getFirestore는 firestore에서 제공하는 함수로 그냥 firestore에 있는 정보들을 가져온다는 의미.
connectFirestoreEmulator(db, '127.0.0.1', 8120)

export { auth, db }
