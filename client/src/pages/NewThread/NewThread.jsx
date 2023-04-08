import './NewThread.css';

import ThreadForm from '../../components/ThreadForm';
import React, { useState, useEffect, useCallback } from 'react';

import { POSTThreadAction } from '../../actions/threadActions';

const NewThread = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveThreadDataHandler = useCallback(async (thread, error) => {
    try {
      setIsLoading(true);
      //console.log(thread);
      //console.log(error);
      if (error != null) {
        throw new Error(error);
      }

      const data = await POSTThreadAction(thread);
      // setThreads((prevThreads) => {
      //   return [data.data, ...prevThreads];
      // });
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  // const saveThreadDataHandler = (enteredThreadData, error) => {
  //   const threadData = {
  //     ...enteredThreadData,
  //   };
  //   props.onAddThread(threadData, error);
  // };
  return (
    <section>
      <div className="new-thread">
        <section>
          <ThreadForm onSaveThreadData={saveThreadDataHandler} />
        </section>
        <section className="new-thread_error">
          {error && !isLoading && <p>{error.message}</p>}
          {isLoading && <p>Loading</p>}
        </section>
      </div>
    </section>
  );
};

export default NewThread;
