// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc, //get data related to a document
  setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWzkcdBL2LaXCkE1fw0X3Q20GMf-gCdP8",
  authDomain: "clothing-shop-db-ca17c.firebaseapp.com",
  projectId: "clothing-shop-db-ca17c",
  storageBucket: "clothing-shop-db-ca17c.appspot.com",
  messagingSenderId: "325043728024",
  appId: "1:325043728024:web:5659718f20f81cff49eaed",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth();
// set custom parameters for google authentication
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglPopup = () => signInWithPopup(auth, googleProvider);

// sign in with email and password
export const signInWithEmailPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Initialize Firebase Firestore database
export const db = getFirestore();

//add user data to the database
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // if userAuth is null, return
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist in the database,create/set user data in the database using Snapshot
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      console.log("User created successfully");
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  // if user data exists in the database, return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    alert("please fill all required fields");
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};
