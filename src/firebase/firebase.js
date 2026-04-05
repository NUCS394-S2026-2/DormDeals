// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyADUK7iWTC2i_MsF-Yu6F_muZcRThZ0dtc',
  authDomain: 'dormdeals-fdf71.firebaseapp.com',
  databaseURL: 'https://dormdeals-fdf71-default-rtdb.firebaseio.com',
  projectId: 'dormdeals-fdf71',
  storageBucket: 'dormdeals-fdf71.firebasestorage.app',
  messagingSenderId: '813259868588',
  appId: '1:813259868588:web:a7bf852d55b73297c7d209',
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getDatabase(app);
