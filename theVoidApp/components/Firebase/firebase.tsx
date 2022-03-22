import "firebase/auth";
import firebase from "firebase/compat";
import firebaseConfig from "./firebaseConfig";
import UserService from "../../services/UserService";
import FirebaseService, { APP_NAME } from "../../services/FirebaseService";

// Initialize Firebase App

export const auth = firebase.auth(FirebaseService.app);

export const loginWithEmail = async (email, password) => {
  console.warn("loginWithEmail");
  await auth.signInWithEmailAndPassword(email, password);
  UserService.fetchCurrentUser(auth.currentUser.uid);
};

export const registerWithEmail = async (email, password, firstname, lastname) => {
  console.warn("registerWithEmail");
  await UserService.checkMindbodyAndRegister(email, password, firstname, lastname);
};

export const logout = () => auth.signOut();

export const passwordReset = (email) => auth.sendPasswordResetEmail(email);

auth.onAuthStateChanged(async function (user) {
  if (user) {
    UserService.fetchCurrentUser(user.uid);
  } else {
    UserService.resetAll();
  }
});
