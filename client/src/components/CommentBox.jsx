import './CommentBox.css';

import React, { useState, useEffect, useCallback } from 'react';

import CommentBlock from './CommentBlock';
import CommentForm from './CommentForm';
const CommentBox = (props) => {
  const [commentThread, setCommentThread] = useState(props.thread);

  const [listComment, setListComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState('Guest');
  const [error, setError] = useState(null);
  const storedToken = localStorage.getItem('token');

  const loadingCommentsHandler = useCallback(async () => {
    //setUserStatus(props.user);
    setIsLoading(true);
    //
    try {
      const response = await fetch('/api/v1/threads', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: storedToken,
        },
      });
      if (!response.status) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      //console.log(data);
      if (data.status === 'success') {
        setUserStatus('Logged in User');
        setIsLoggedIn(true);
      }
    } catch {
      setError(error.message);
    }
    //
    setIsLoading(false);
  }, []);
  useEffect(() => {
    loadingCommentsHandler();
  }, [loadingCommentsHandler]);

  let threadComments = <p>There is no comment</p>;

  console.log('this is liscomment' + listComment + ' : ' + listComment.length);
  if (listComment.length > 0) {
    threadComments = listComment.map((comment, index) => <CommentBlock key={index} comment={comment} />);
  }

  return (
    <div>
      <div>
        {!isLoading && !error && threadComments}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </div>

      <div>
        <CommentForm thread={props.thread} />
      </div>
    </div>
  );
};
export default CommentBox;
