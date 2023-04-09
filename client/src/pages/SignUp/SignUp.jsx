import './SignUp.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React, { Fragment, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';

import { SignUpAction } from '../../actions/userActions';

const userReducer = (state, action) => {
  if (action.type === 'USER_INPUT_ACCOUNT') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'USER_INPUT_PASSWORD') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'USER_INPUT_PASSWORD_CONFIRM') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'USER_INPUT_USERNAME') {
    return { value: action.val, isValid: true };
  }
  if (action.type === 'USER_INPUT_EMAIL') {
    return { value: action.val, isValid: true };
  }
  return { value: '', isValid: false };
};
const SignUp = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [accountState, dispatchAccount] = useReducer(userReducer, { value: '', isValid: false });
  const [passwordState, dispatchPassword] = useReducer(userReducer, { value: '', isValid: false });
  const [passwordConfirmState, dispatchPasswordConfirm] = useReducer(userReducer, { value: '', isValid: false });
  const [emailState, dispatchEmail] = useReducer(userReducer, { value: '', isValid: false });
  const [usernameState, dispatchUsername] = useReducer(userReducer, { value: '', isValid: false });

  const accountChangeHandler = (event) => {
    dispatchAccount({ type: 'USER_INPUT_ACCOUNT', val: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT_PASSWORD', val: event.target.value });
  };
  const passwordConfirmChangeHandler = (event) => {
    dispatchPasswordConfirm({ type: 'USER_INPUT_PASSWORD_CONFIRM', val: event.target.value });
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT_EMAIL', val: event.target.value });
  };
  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: 'USER_INPUT_USERNAME', val: event.target.value });
  };
  const submitChangeHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const userData = {
        account: accountState.value,
        username: usernameState.value,
        password: passwordState.value,
        passwordConfirm: passwordConfirmState.value,
        email: emailState.value,
        role: 'user',
      };

      const data = await SignUpAction(userData);
      if (data.status === 'fail') {
        setErrorMessage('Username, Email or Account has been used');
        return;
      }

      dispatchAccount({ type: 'USER_INPUT_ACCOUNT', val: '' });
      dispatchEmail({ type: 'USER_INPUT_EMAIL', val: '' });
      dispatchPassword({ type: 'USER_INPUT_PASSWORD', val: '' });
      dispatchPasswordConfirm({ type: 'USER_INPUT_PASSWORD_CONFIRM', val: '' });
      dispatchUsername({ type: 'USER_INPUT_USERNAME', val: '' });

      localStorage.setItem('token', 'Bearer ' + data.token);

      setIsLoading(false);
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
      <div>{errorMessage}</div>
    </Fragment>
  );
};

export default SignUp;
