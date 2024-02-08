// src/firebase.js
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD9pFGVzVGgiLozwFDJeH81ktXbBiu-bAA",
    authDomain: "genx-data-logging.firebaseapp.com",
    databaseURL: "https://genx-data-logging-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "genx-data-logging",
    storageBucket: "genx-data-logging.appspot.com",
    messagingSenderId: "451643225121",
    appId: "1:451643225121:web:e0b57596201071b1ebdf60"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
