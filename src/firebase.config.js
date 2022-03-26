// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDL4NrwJ59uV3IznlUbonxPvqgvUtte5lM',
  authDomain: 'react-todo-list-77469.firebaseapp.com',
  databaseURL: 'https://react-todo-list-77469-default-rtdb.firebaseio.com',
  projectId: 'react-todo-list-77469',
  storageBucket: 'react-todo-list-77469.appspot.com',
  messagingSenderId: '929926067333',
  appId: '1:929926067333:web:9ac9e4d2acf9511b5825ec',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
