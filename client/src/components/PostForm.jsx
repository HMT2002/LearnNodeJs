import React, { useState } from 'react';

import './PostForm.css';
const PostForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredContent, setEnteredContent] = useState('');
  const [enteredVideo, setEnteredVideo] = useState('');
  const [enteredTag, setEnteredTag] = useState('');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const contentChangeHandler = (event) => {
    setEnteredContent(event.target.value);
  };

  const videoChangeHandler = (event) => {
    setEnteredVideo(event.target.value);
  };

  const tagChangeHandler = (event) => {
    setEnteredTag(event.target.value);
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();

    const postData = {
      id: Math.random().toString(),
      title: enteredTitle,
      video: enteredVideo,
      user: 'user post',
      content: enteredContent,
      tag: enteredTag,
      createDate: Date.now(),
    };

    setEnteredTitle('');
    setEnteredVideo('');
    setEnteredContent('');
    setEnteredTag('');
    console.log('submitHandler called');

    props.onSavePostData(postData);
  };

  return (
    <form onSubmit={submitChangeHandler}>
      <div className="new-post__controls">
        <div className="new-post__controls">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} value={enteredTitle} />
        </div>

        <div className="new-post__controls">
          <label>Explain Video</label>
          <input id="myFile" name="myFile" type="file" onChange={videoChangeHandler} value={enteredVideo} />
        </div>

        <div className="new-post__controls">
          <label>Content</label>
          <input type="text" onChange={contentChangeHandler} value={enteredContent} />
        </div>
        <div className="new-post__controls">
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

      <div className="new-post__actions">
        <button type="submit">Create new post</button>
      </div>
    </form>
  );
};
export default PostForm;
