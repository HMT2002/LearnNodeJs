import './Welcome.css';
import ControllPanel from '../components/ControlPanel';
import ListThreadCard from '../components/ListThreadCard';
import React, { useState, useEffect, useCallback } from 'react';

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState('Guest');

  const [error, setError] = useState(null);
  const [threads, setThreads] = useState([]);

  const fetchThreadHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/threads');
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
      <section>
        <ControllPanel userStatus={userStatus} />
      </section>
      <section>
        {!isLoading && !error && <ListThreadCard threads={threads} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </section>
  );
};
export default Welcome;
