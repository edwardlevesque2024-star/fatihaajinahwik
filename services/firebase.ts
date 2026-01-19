import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAhmMyDlVIdsVQ2KJ4qPiYz86lnKu2tXI",
  authDomain: "aisaas-cf1e1.firebaseapp.com",
  projectId: "aisaas-cf1e1",
  storageBucket: "aisaas-cf1e1.firebasestorage.app",
  messagingSenderId: "23200069244",
  appId: "1:23200069244:web:382131e41c50f252f43bf9",
  measurementId: "G-7C0B3LPR96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let analytics;

// Analytics only works in browser environments
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, googleProvider };