import React from "react";
import {
  signInWithGooglPopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  async function logGoogleUser() {
    const { user } = await signInWithGooglPopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Login With Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
