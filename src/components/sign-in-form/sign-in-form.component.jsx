import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { ButtonsContainer } from "./sign-in-form.styles.jsx";
import {
  SignUpContainer as SignInContainer,
  SignUpTitle as SignInTitle,
} from "../sign-up-form/sign-up-form.styles.jsx";
import "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    console.log("Sign in with google - success ");
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      console.log("Sign in - success ");
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
    <SignInContainer>
      <SignInTitle>Already have an account</SignInTitle>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            Sign In with Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
