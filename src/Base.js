import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: _AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID

});

export default app;
