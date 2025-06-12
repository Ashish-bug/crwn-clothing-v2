import React from "react";
import SignUpForm from "components/sign-up-form/sign-up-form.component";
import SignInForm from "components/sign-in-form/sign-in-form.component";
import './authenticate.style.scss';

const Authenticate = () =>{

    return (
        <div className="authenticate-container">
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default Authenticate;