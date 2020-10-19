import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCTTzcGhY_XZgRoqiKe445VlKpJubGS_Cs",
  authDomain: "vedanta-bharathi-f8ed5.firebaseapp.com",
  databaseURL: "https://vedanta-bharathi-f8ed5.firebaseio.com",
  projectId: "vedanta-bharathi-f8ed5",
  storageBucket: "vedanta-bharathi-f8ed5.appspot.com",
  messagingSenderId: "722539324732",
  appId: "1:722539324732:web:0e1580c08f3dc9cbe26a39",
  measurementId: "G-2SXKZC0WRF",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const logIn = (email, password) => {
  auth.signInWithEmailAndPassword(email, password).catch((error) => {
    console.log(error.message);
  });
};