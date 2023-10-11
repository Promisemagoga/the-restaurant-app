// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import {getAuth, onAuthStateChanged} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBySnEuFRFkg32QYTnO3eZtF-YUjmPSBYA",
  authDomain: "the-resturant-app.firebaseapp.com",
  projectId: "the-resturant-app",
  storageBucket: "the-resturant-app.appspot.com",
  messagingSenderId: "256916380746",
  appId: "1:256916380746:web:9a1a19d5464651b6fedab3",
  measurementId: "G-ER95Q7XRYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const  db = getFirestore(app)
const storage = getStorage(app)


export { db, storage,auth }

