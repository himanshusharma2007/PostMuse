// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHKfuzfT_n1mzoXLC6woyZDZBwfP_xsnk",
  authDomain: "postmuse-99f66.firebaseapp.com",
  projectId: "postmuse-99f66",
  storageBucket: "postmuse-99f66.appspot.com",
  messagingSenderId: "75635605865",
  appId: "1:75635605865:web:39feca1737796179d83df8",
  measurementId: "G-B323QR0J1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);