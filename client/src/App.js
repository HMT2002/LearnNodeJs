import './App.css';
import React, { useState, useEffect, useCallback } from 'react';

import NewThread from './pages/NewThread/NewThread';
import Welcome from './pages/Welcome/Welcome';
import TestPage from './pages/TestPage/TestPage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Thread from './pages/Thread/Thread';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Route/ProtectRoute';

function App() {
  // const [threads, setThreads] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchThreadHandler = useCallback(async () => {
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch('/api/test/threads');
  //     if (!response.ok) {
  //       throw new Error('Something went wrong!');
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setThreads((prevThreads) => {
  //       return [...data.data.threads];
  //     });
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  // useEffect(() => {
  //   fetchThreadHandler();
  // }, [fetchThreadHandler]);

  // const addThreadHandler = useCallback(async (thread, error) => {
  //   try {
  //     setIsLoading(true);
  //     //console.log(thread);
  //     //console.log(error);
  //     if (error != null) {
  //       throw new Error(error);
  //     }
  //     const response = await fetch('/api/v1/threads', {
  //       method: 'POST',
  //       body: JSON.stringify(thread),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const response_data = await response.json();
  //     console.log(response_data);
  //     // setThreads((prevThreads) => {
  //     //   return [response_data.data, ...prevThreads];
  //     // });
  //   } catch (err) {
  //     console.log(err.message);
  //     setError(err.message);
  //   }
  //   await fetchThreadHandler();
  //   setIsLoading(false);
  // }, []);

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/threads" element={<Welcome />}></Route>
            <Route path="/user-info" element={<Welcome />}></Route>
            <Route path="/create-thread" element={<NewThread />}></Route>
            <Route path="/test" element={<TestPage />}></Route>
            <Route path="/sign/in" element={<SignIn />}></Route>
            <Route path="/sign/up" element={<SignUp />}></Route>
            <Route path="/threads/:slug" element={<Thread />}></Route>
          </Routes>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
