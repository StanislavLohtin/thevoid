import firebase from "firebase";
import "firebase/auth";

import firebaseConfig from "./firebaseConfig";
import UserService from "../../services/UserService";
import FirebaseService, { APP_NAME } from "../../services/FirebaseService";

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, APP_NAME);
}

export const auth = firebase.auth(FirebaseService.app);

export const loginWithEmail = async (email, password) => {
  console.warn("loginWithEmail");
  await auth.signInWithEmailAndPassword(email, password);
  UserService.getUser(auth.currentUser.uid);
};

export const registerWithEmail = async (email, password, username) => {
  console.warn("registerWithEmail");
  await auth.createUserWithEmailAndPassword(email, password);
  UserService.createUser(auth.currentUser.uid, email, username);
};

export const logout = () => auth.signOut();

export const passwordReset = (email) => auth.sendPasswordResetEmail(email);

auth.onAuthStateChanged(async function (user) {
  if (user) {
    UserService.getUser(user.uid);
  }
});
