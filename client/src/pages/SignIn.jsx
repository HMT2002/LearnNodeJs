import './SignIn.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

  const [enteredAccount, setEnteredAccount] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const accountChangeHandler = (event) => {
    setEnteredAccount(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const submitChangeHandler = async (event) => {
    event.preventDefault();

    const userData = {
      account: enteredAccount,
      password: enteredPassword,
    };

    const response = await fetch('/api/v1/users/signin', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response_data = await response.json();
    console.log(response_data);

    if (response_data.status === 'fail') {
      setErrorMessage(response_data.message);
      return;
    }

    setEnteredAccount('');
    setEnteredPassword('');
    setErrorMessage('Signed in!');

    localStorage.setItem('token', 'Bearer ' + response_data.token);

    navigate('/');
  };
  return (
    <div className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={submitChangeHandler}>
        <input type="text" onChange={accountChangeHandler} />
        <input type="password" onChange={passwordChangeHandler} />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <input type="checkbox" name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
          <a href="/sign/forgot-pass">Forgot password?</a>
        </div>

        <button type="submit">Sign in</button>

        <div className="text-center">
          <p>
            Not a member? <a href="/sign/up">Register</a>
          </p>
          <p>or sign up with:</p>

          <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}>
            <button color="none" className="m-1" style={{ color: '#1266f1' }}>
              Facebook
            </button>

            <button color="none" className="m-1" style={{ color: '#1266f1' }}>
              Google
            </button>

            <button color="none" className="m-1" style={{ color: '#1266f1' }}>
              Twitter
            </button>

            <button color="none" className="m-1" style={{ color: '#1266f1' }}>
              Github
            </button>
          </div>
          <div>
            <p>{errorMessage}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
