import './SignIn.css';

import React from 'react';
function SignIn() {
  return (
    <div className="p-3 my-5 d-flex flex-column w-50">
      <input className="mb-4" label="Email address" id="form1" type="email" />
      <input className="mb-4" label="Password" id="form2" type="password" />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <input type="checkbox" name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
        <a href="/sign/forgot-pass">Forgot password?</a>
      </div>

      <button className="mb-4">Sign in</button>

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
      </div>
    </div>
  );
}

export default SignIn;
