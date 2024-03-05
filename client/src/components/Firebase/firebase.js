import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import for Firebase Authentication

const firebaseConfig = {
  //  Firebase configuration
  apiKey: "AIzaSyDnq7WRlnaQTwUgJUOmSqvJGtWiTgIFec0",
  authDomain: "horizons-e72ef.firebaseapp.com",
  projectId: "horizons-e72ef",
  storageBucket: "horizons-e72ef.appspot.com",
  messagingSenderId: "323869939208",
  appId: "1:323869939208:web:35178ea02ac5a24101e3bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

export default app;
export { auth };