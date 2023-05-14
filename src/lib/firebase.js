import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfrNsd8P353UbjQuGok7wWtkM_8aTdrrg",
  authDomain: "nugas-c34e8.firebaseapp.com",
  projectId: "nugas-c34e8",
  storageBucket: "nugas-c34e8.appspot.com",
  messagingSenderId: "601327077815",
  appId: "1:601327077815:web:5329b992ed7b85312fc032"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)