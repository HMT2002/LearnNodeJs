import './Welcome.css';
import ControllPanel from '../../components/ControlPanel';
import ListThreadCard from '../../components/ListThreadCard';
import React, { useState, useEffect, useCallback } from 'react';
import { GETAllThreadAction } from '../../actions/threadActions';
import { CheckTokenAction } from '../../actions/userActions';

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [error, setError] = useState(null);
  const [threads, setThreads] = useState([]);

  const fetchThreadsHandler = useCallback(async () => {
    const storedToken = localStorage.getItem('token');

    setError(null);
    setIsLoading(true);
    try {
      const data = await GETAllThreadAction();
      setThreads((prevThreads) => {
        return [...data.data.threads];
      });

      const user_data = await CheckTokenAction(storedToken);
      setCurrentUser((prevState) => {
        return user_data.user;
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
      <section>{!isLoading && !error && <ControllPanel currentUser={currentUser} />}</section>
      <section>
        {!isLoading && !error && <ListThreadCard threads={threads} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </section>
  );
};
export default Welcome;
