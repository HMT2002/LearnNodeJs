import './SignUp.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';

import { SignUpAction } from '../../actions/userActions';

const SignUp = () => {
  const navigate = useNavigate();

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

    try {
      const userData = {
        account: enteredAccount,
        username: enteredUsername,
        password: enteredPassword,
        passwordConfirm: enteredPasswordConfirm,
        email: enteredEmail,
        role: 'user',
      };

      const data = await SignUpAction(userData);
      if (data.status === 'fail') {
        setErrorMessage('Username, Email or Account has been used');
        return;
      }

      setEnteredAccount('');
      setEnteredPassword('');
      setEnteredPasswordConfirm('');
      setEnteredUsername('');
      setEnteredEmail('');

      localStorage.setItem('token', 'Bearer ' + data.token);

      navigate('/');
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <Fragment>
      <h1>Sign Up</h1>
      <div>
        <form onSubmit={submitChangeHandler}>
          <div className="enter-field ">
            <label>Account</label>
            <input type="text" onChange={accountChangeHandler} />
          </div>

          <div className="enter-field">
            <label>Password</label>

            <input type="password" onChange={passwordChangeHandler} />
          </div>

          <div className="enter-field">
            <label>Re-enter password</label>

            <input type="password" onChange={passwordConfirmChangeHandler} />
          </div>

          <div className="enter-field">
            <label>Email</label>

            <input type="text" onChange={emailChangeHandler} />
          </div>

          <div className="enter-field">
            <label>Choose Username</label>

            <input type="text" onChange={usernameChangeHandler} />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;
