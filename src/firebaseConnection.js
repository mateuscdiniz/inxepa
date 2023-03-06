import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC2Ls2WVYPc-_pn0KlroBEy905T1BKW6mk',
  authDomain: 'inxepa-form.firebaseapp.com',
  projectId: 'inxepa-form',
  storageBucket: 'inxepa-form.appspot.com',
  messagingSenderId: '607140645618',
  appId: '1:607140645618:web:e869b9382cb6bb5d9d5e6b',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
