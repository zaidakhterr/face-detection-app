import React from 'react';

import SignInForm from '../../components/SignInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import './SignInPage.scss';

const SignInPage = () => (
  <div className='signin-page'>
    <div className='background'></div>
    <h1>Sign In Now to access the full features of the App.</h1>
    <SignInForm />
    <SignUpForm />
  </div>
);

export default SignInPage;
