import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

let serviceAccount;

// Try to get service account from environment variable first
if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} else {
  serviceAccount = JSON.parse(
    await readFile(
      new URL(process.env.GOOGLE_APPLICATION_CREDENTIALS, import.meta.url),
    ),
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { admin, db };
