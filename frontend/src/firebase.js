// src/firebase.js
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAWfhB2BnxeTKNjOBnXxQ6KupNcWvq5wUE",
    authDomain: "genx-119ab.firebaseapp.com",
    databaseURL: "https://genx-119ab-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "genx-119ab",
    storageBucket: "genx-119ab.appspot.com",
    messagingSenderId: "116686597163",
    appId: "1:116686597163:web:804911fb329005b39c0e6e"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
