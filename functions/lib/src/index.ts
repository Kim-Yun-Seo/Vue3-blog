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
// import * as functions from 'firebase-functions'

import onUser from './events/user'

export const userCreated = onUser.created
export const userDeleted = onUser.deleted

console.log(`run ${new Date().toLocaleString()}`)
