import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    {
      fetch('/api/v1/posts')
        .then((response) => {
          response.json();
        })
        .then((data) => {
          setBackendData(data);
        });
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        Learn React <p>Loading...</p>
      </header>
    </div>
  );
}

export default App;
