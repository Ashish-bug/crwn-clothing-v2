import FormInput from "components/form-input/form-input.component";
import React, { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailPassword,
  signInWithGooglePopup,
} from "utils/firebase.utils";

import "./sign-in-form.styles.scss";
import Button from "components/button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    try {
      debugger;
      event.preventDefault();
      const { email, password } = formFields;

      const user = await signInAuthUserWithEmailPassword(
        formFields.email,
        formFields.password
      );
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
        return;
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account.</h2>
      <span>Sign in with your email and password</span>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          value={email}
          name="email"
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          value={password}
          name="password"
        />

        <div className="buttons-container">
          <Button type="submit">Sign In </Button>
          <Button type="button" onClick={logGoogleUser} buttonType="google" >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
