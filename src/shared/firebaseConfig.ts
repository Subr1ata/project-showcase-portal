// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: 'project-showcase-portal-df6a8.firebaseapp.com',
  projectId: 'project-showcase-portal-df6a8',
  storageBucket: 'project-showcase-portal-df6a8.appspot.com',
  messagingSenderId: '88837452309',
  appId: '1:88837452309:web:287219ca5fb24a7c79941c',
  measurementId: 'G-82WFNYJ860',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
