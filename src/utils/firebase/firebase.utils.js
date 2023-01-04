// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
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
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglPopup = () => signInWithPopup(auth, provider);

// Initialize Firebase Firestore database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
      console.log("User created successfully");
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  // if user data exists in the database, return userDocRef
  return userDocRef;
};
