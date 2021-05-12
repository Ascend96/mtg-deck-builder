// firebase config
import firebase from "firebase/app";
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyDyMEcAnA-Uo-qBWYbZbGKSyFQ4663Y134",
    authDomain: "javascript2-76257.firebaseapp.com",
    projectId: "javascript2-76257",
    storageBucket: "javascript2-76257.appspot.com",
    messagingSenderId: "603603157534",
    appId: "1:603603157534:web:b7d50368ce979d55f2e40f"
};
// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();

