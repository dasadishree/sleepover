import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqJDtckPA1kZcVBRrhwmnB9W-XqJDQUsw",
  authDomain: "sleepover-7a6cf.firebaseapp.com",
  databaseURL: "https://sleepover-7a6cf-default-rtdb.firebaseio.com",
  projectId: "sleepover-7a6cf",
  storageBucket: "sleepover-7a6cf.firebasestorage.app",
  messagingSenderId: "943335330317",
  appId: "1:943335330317:web:20a1ae7eb8f71172d9fb44",
  measurementId: "G-52J5XY5KGF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);