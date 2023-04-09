import './Welcome.css';
import ControllPanel from '../../components/ControlPanel';
import ListThreadCard from '../../components/ListThreadCard';
import React, { useState, useEffect, useCallback } from 'react';
import { GETAllThreadAction } from '../../actions/threadActions';

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState('Guest');

  const [error, setError] = useState(null);
  const [threads, setThreads] = useState([]);

  const fetchThreadsHandler = useCallback(async () => {
    const storedToken = localStorage.getItem('token');

    setError(null);
    setIsLoading(true);
    try {
      const data = await GETAllThreadAction();
      // console.log(data);
      setThreads((prevThreads) => {
        return [...data.data.threads];
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchThreadsHandler();
  }, [fetchThreadsHandler]);

  return (
    <section>
      <section>
        <ControllPanel />
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
