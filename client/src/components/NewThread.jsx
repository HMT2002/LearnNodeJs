import './NewThread.css';

import ThreadForm from './ThreadForm';
import React from 'react';

const NewThread = (props) => {
  const saveThreadDataHandler = (enteredThreadData) => {
    const threadData = {
      ...enteredThreadData,
    };
    console.log('saveThreadDataHandler called');

    props.onAddThread(threadData);
  };

  return (
    <div className="new-thread">
      <ThreadForm onSaveThreadData={saveThreadDataHandler} />
    </div>
  );
};

export default NewThread;
