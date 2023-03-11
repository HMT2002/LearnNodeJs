import './SignUp.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './SignIn.css';

import React, { useState } from 'react';

import Card from '../components/Card';

const SignUp = () => {
  const [enteredAccount, setEnteredAccount] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const accountChangeHandler = (event) => {
    setEnteredAccount(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const passwordConfirmChangeHandler = (event) => {
    setEnteredPasswordConfirm(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const submitChangeHandler = async (event) => {
    event.preventDefault();

    const userData = {
      account: enteredAccount,
      username: enteredUsername,
      password: enteredPassword,
      passwordConfirm: enteredPasswordConfirm,
      email: enteredEmail,
      createDate: Date.now(),
    };

    const response = await fetch('/api/v1/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response_data = await response.json();
    console.log(response_data);

    setEnteredAccount('');
    setEnteredPassword('');
    setEnteredPasswordConfirm('');
    setEnteredUsername('');
    setEnteredEmail('');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div className="text-black m-5">
        <form onSubmit={submitChangeHandler}>
          <div className="d-flex flex-row align-items-center mb-4 ">
            <label>Account</label>
            <input type="text" onChange={accountChangeHandler} />
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <label>Password</label>

            <input type="password" onChange={passwordChangeHandler} />
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <label>Re-enter password</label>

            <input type="password" onChange={passwordConfirmChangeHandler} />
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <label>Email</label>

            <input type="text" onChange={emailChangeHandler} />
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <label>Choose Username</label>

            <input type="text" onChange={usernameChangeHandler} />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
