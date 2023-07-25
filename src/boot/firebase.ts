import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import {
  getAuth, connectAuthEmulator
} from 'firebase/auth'

import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import firebaseJson from '../../firebase.json'

const app = initializeApp(firebaseConfig)

const auth = getAuth()
auth.useDeviceLanguage()
connectAuthEmulator(auth, 'http://127.0.0.1:9101')

const db = getFirestore()
// getFirestore는 firestore에서 제공하는 함수로 그냥 firestore에 있는 정보들을 가져온다는 의미.
connectFirestoreEmulator(db, '127.0.0.1', firebaseJson.emulators.firestore.port)

const rtdb = getDatabase(app)
connectDatabaseEmulator(rtdb, '127.0.0.1', firebaseJson.emulators.database.port)

export { auth, db, app, rtdb }
