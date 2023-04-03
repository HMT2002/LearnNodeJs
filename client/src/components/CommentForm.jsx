import './CommentForm.css';

import React, { useState, useEffect, useCallback } from 'react';

const CommentForm = (props) => {
  const [enteredComment, setEnteredComment] = useState('');
  const [commentThread, setCommentThread] = useState(props.thread);

  const commentChangeHandler = (event) => {
    setEnteredComment(event.target.value);
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();
    if (enteredComment === '' || !commentThread) {
      error = 'Missing information';
    }
    const commentData = {
      comment: enteredComment,
      createDate: Date.now(),
      thread: commentThread,
    };
    let error = null;

    setEnteredComment('');
  };
  return (
    <div>
      <form onSubmit={submitChangeHandler}>
        <textarea
          className="main-comment-editor"
          autocomplete="discourse"
          placeholder="Type here. Use Markdown, BBCode, or HTML to format. Drag or paste images."
          onChange={commentChangeHandler}
        ></textarea>
        <div>Post can't be empty </div>
        <div>{props.thread._id}</div>
      </form>
    </div>
  );
};

export default CommentForm;
