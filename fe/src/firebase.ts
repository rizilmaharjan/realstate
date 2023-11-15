import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-741a4.firebaseapp.com",
  projectId: "real-estate-741a4",
  storageBucket: "real-estate-741a4.appspot.com",
  messagingSenderId: "869332474393",
  appId: "1:869332474393:web:d6279177571a9866bca888"
};

export const app = initializeApp(firebaseConfig);