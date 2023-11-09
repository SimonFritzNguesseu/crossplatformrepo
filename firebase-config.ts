// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPyPQmWltQg2P_rnd86tWMuic7iw5Wxo0",
  authDomain: "the-database-91b72.firebaseapp.com",
  projectId: "the-database-91b72",
  storageBucket: "the-database-91b72.appspot.com",
  messagingSenderId: "369176891379",
  appId: "1:369176891379:web:bd074c5acc6c00135f4c86",
  measurementId: "G-J1Z7VMD22T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()
