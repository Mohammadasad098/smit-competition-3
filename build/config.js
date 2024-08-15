import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDDk0ZeS6sItiOGLYMXYNQoF9-IV6OS1BA",
    authDomain: "smit-competition-3.firebaseapp.com",
    projectId: "smit-competition-3",
    storageBucket: "smit-competition-3.appspot.com",
    messagingSenderId: "867484472239",
    appId: "1:867484472239:web:65164aaebbed2fecac155a",
    measurementId: "G-62HB2YE6S9"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);