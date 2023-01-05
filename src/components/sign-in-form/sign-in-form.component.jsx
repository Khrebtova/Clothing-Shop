import React, { useState } from "react";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {
  signInWithGooglPopup,
  createUserDocumentFromAuth,
  signInWithEmailPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [user, setUser] = useState(defaultFormFields);
  const { email, password } = user;

  const resetFormFields = () => setUser(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signInWithGoogle = async() => {
    const { user } = await signInWithGooglPopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log('Sign in with google - success ', user.displayName);
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const loggedInUser = await signInWithEmailPassword(email, password);
      console.log('Sign in - success ', loggedInUser);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        case "auth/wrong-password":
          alert("incorrect password or email");
          break;
        default:
          alert("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmitForm}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button buttonType="default" type="submit">
            Sign In
          </Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
