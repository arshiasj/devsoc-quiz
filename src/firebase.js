// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from "firebase/database"; // <-- if you're using Realtime DB
import { ref, push, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkhXzCrRG7TiXxzEFGgcY1jNFgeyZ-qg4",
  authDomain: "devsoc-quiz.firebaseapp.com",
  databaseURL: "https://devsoc-quiz-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "devsoc-quiz",
  storageBucket: "devsoc-quiz.firebasestorage.app",
  messagingSenderId: "121923000017",
  appId: "1:121923000017:web:0db603ff6ebaf66c29d7f0",
  measurementId: "G-QLXFRJLGQM"
}

const app = initializeApp(firebaseConfig)

let analytics
try {
  analytics = getAnalytics(app)
} catch (err) {
  // getAnalytics can throw in non-browser or SSR environments; ignore safely
  // eslint-disable-next-line no-console
  console.warn('Firebase analytics not initialized:', err.message)
}

export { app, analytics, firebaseConfig }
export const db = getDatabase(app);     // if using Realtime DB
