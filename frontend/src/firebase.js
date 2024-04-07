// src/firebase.js
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCjLiE1yQU-L860nsmFXKe3LJVohw1T7ec",
    authDomain: "genx-v42.firebaseapp.com",
    databaseURL: "https://genx-v42-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "genx-v42",
    storageBucket: "genx-v42.appspot.com",
    messagingSenderId: "204000689935",
    appId: "1:204000689935:web:883000c61d00e9f968887a"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
