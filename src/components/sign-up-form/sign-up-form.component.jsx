import FormInput from "components/form-input/form-input.component";
import React, { useState } from "react";
import {
  creatAuthUserFromEmailPassword,
  createUserDocumentFromAuth,
} from "utils/firebase.utils";

import './sign-up-form.styles.scss';
import Button from "components/button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    try {
      debugger;
      event.preventDefault();
      const { displayName, password, confirmPassword } = formFields;
      if (password !== confirmPassword) {
        alert("Password and Confirm password does not match.");
        return;
      }

      const user = await creatAuthUserFromEmailPassword(
        formFields.email,
        formFields.password
      );
      console.log(user);
      if (user) {
        await createUserDocumentFromAuth(user.user, { displayName });
        resetFormFields();
      }
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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          value={displayName}
          name="displayName"
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          value={confirmPassword}
          name="confirmPassword"
        />

        <Button type="submit" >Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
