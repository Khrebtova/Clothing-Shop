// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc, //get data related to a document
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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

// ---------------------------add shop data to the firebase using collection and writebatch-------------------------------
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });

  await batch.commit();
  console.log("Collection added successfully");
};

// ---------------------------get shop data from firebase-------------------------------
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  // q get us a object what we can get snapshot from
  const q = query(collectionRef);
  //getDocs give as async ability to fetch snapshots from q
  const querySnapshot = await getDocs(q);
  // querySnapshot.docs give us an array of documents inside the collection
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}
/*
[
  {
    id:1,
    title: 'hats',
    items: [{}, {}, {}]
  },
  {
    id:2,
    title: 'sneakers',
    items: [{}, {}, {}]
  }
]

*/

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

export const signOutUser = async () => await signOut(auth);

// ---------------------------listen for auth state change to keep user logged in even after page refresh-------------------------------
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
