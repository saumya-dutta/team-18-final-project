import app from 'firebase/app';
import auth from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCYrh2HvJPPUBP9C6UVdolvrfQnKDsQm0k",
  authDomain: "fitness-app-28b68.firebaseapp.com",
  projectId: "fitness-app-28b68",
  storageBucket: "fitness-app-28b68.appspot.com",
  messagingSenderId: "178228203496",
  appId: "1:178228203496:web:9f5a1c5a7df0cdc410de5d",
  measurementId: "G-ERVQXB72QL"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doGetIdToken = (bool) => {
    return this.auth.currentUser.getIdToken(/* forceRefresh */ bool);
  }

  doGetUserByEmail = email => this.auth.getUserByEmail(email);

}

export default Firebase;