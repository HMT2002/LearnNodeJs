import './NewThread.css';

import ThreadForm from './ThreadForm';
import React from 'react';

const NewThread = (props) => {
  const saveThreadDataHandler = (enteredThreadData, error) => {
    const threadData = {
      ...enteredThreadData,
    };
    props.onAddThread(threadData, error);
  };

  return (
    <div className="new-thread">
      <ThreadForm onSaveThreadData={saveThreadDataHandler} />
    </div>
  );
};

export default NewThread;
