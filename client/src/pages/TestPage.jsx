import './TestPage.css';

import React, { useState, useEffect, useCallback } from 'react';

const TestPage = () => {
  const [threads, setThreads] = useState([]);
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
      console.log(data);
      setThreads((prevThreads) => {
        return [...data.data.threads];
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchThreadHandler();
  }, [fetchThreadHandler]);

  return (
    <section>
      <button onClick={fetchThreadHandler}>Fetch</button>
    </section>
  );
};
export default TestPage;
