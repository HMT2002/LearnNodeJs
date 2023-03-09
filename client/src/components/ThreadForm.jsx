import React, { useState } from 'react';

import './ThreadForm.css';
const ThreadForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredContent, setEnteredContent] = useState('');
  const [videoDriveLink, setVideoDriveLink] = useState('');
  const [enteredVideo, setEnteredVideo] = useState('');
  const [enteredTag, setEnteredTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const contentChangeHandler = (event) => {
    setEnteredContent(event.target.value);
  };

  const videoChangeHandler = async (event) => {
    setEnteredVideo(event.target.value);
    setIsLoading(true);
    setErrorMessage('Video is uploading');
    //console.log(event.target.value);
    //console.log(event.target);
    //console.log(event.target.files[0]);

    let formData = new FormData();
    formData.append('myFile', event.target.files[0]);
    const response = await fetch('/api/v1/upload', {
      method: 'POST',
      body: formData,
    });

    const response_data = await response.json();
    console.log(response_data);
    setVideoDriveLink('https://drive.google.com/uc?export=view&id=' + response_data.driveID);

    setIsLoading(false);
    setErrorMessage('');
  };

  const tagChangeHandler = (event) => {
    setEnteredTag(event.target.value);
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const threadData = {
      title: enteredTitle,
      video: videoDriveLink,
      user: 'user thread',
      content: enteredContent,
      tag: enteredTag,
      createDate: Date.now(),
    };
    let error = null;
    if (enteredContent === '' || enteredTitle === '' || enteredTag === '' || enteredVideo === '') {
      error = 'Missing information';
    }
    props.onSaveThreadData(threadData, error);

    //console.log(error);
    setEnteredTitle('');
    setEnteredVideo('');
    setEnteredContent('');
    setVideoDriveLink('');
    setEnteredTag('');
  };

  return (
    <form onSubmit={submitChangeHandler}>
      <div className="new-thread__controls">
        <div className="new-thread__controls">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} value={enteredTitle} />
        </div>

        <div className="new-thread__controls">
          <label>Explain Video</label>
          <input id="myFile" name="myFile" type="file" onChange={videoChangeHandler} value={enteredVideo} />
        </div>

        <div className="new-thread__controls">
          <label>Content</label>
          <input type="text" onChange={contentChangeHandler} value={enteredContent} />
        </div>
        <div className="new-thread__controls">
          <label>Choose a car:</label>
          <select onChange={tagChangeHandler} value={enteredTag}>
            <option>Đời sống</option>
            <option>Kỹ thuật</option>
            <option>Mỹ thuật</option>
            <option>Ẩm thực</option>
            <option>Du lịch</option>
          </select>
        </div>
      </div>

      <div className="new-thread__actions">
        <button type="submit">Create new thread</button>
      </div>

      <div className="new-thread__error_message">
        <p>{errorMessage}</p>
      </div>
    </form>
  );
};
export default ThreadForm;
