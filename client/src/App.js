import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import ControllPanel from './components/ControlPanel';
import ListThreadCard from './components/ListThreadCard';
import NewThread from './components/NewThread';

const DUMMY_POSTS = [];

function App() {
  const [threads, setThreads] = useState(DUMMY_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchThreadHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/test/threads');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      //console.log(data);
      setThreads((prevThreads) => {
        return [...data.data.threads, ...prevThreads];
      });
      //setThreads(data.data.threads);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchThreadHandler();
  }, [fetchThreadHandler]);

  const addThreadHandler = async (thread) => {
    setIsLoading(true);

    await setThreads((prevThreads) => {
      return [thread, ...prevThreads];
    });

    console.log(thread);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <section>
            <button onClick={fetchThreadHandler}>Fetch</button>
          </section>
          <section>
            <section>
              <ControllPanel />
            </section>
            <section>
              {!isLoading && !error && <ListThreadCard threads={threads} />}
              {isLoading && <p>Loading...</p>}
              {!isLoading && error && <p>{error}</p>}
            </section>
            <section>
              <NewThread onAddThread={addThreadHandler}></NewThread>
            </section>
          </section>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
