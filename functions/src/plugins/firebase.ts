import { initializeApp } from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'

// const admin = require('firebase-admin')
// admin.initializeApp()

const app = initializeApp()
const db = getFirestore()

export { app, db }
