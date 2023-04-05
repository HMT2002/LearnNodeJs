import './CommentBox.css';

import React, { useState, useEffect, useCallback } from 'react';

import CommentBlock from './CommentBlock';
import CommentForm from './CommentForm';
const CommentBox = (props) => {
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
      const response = await fetch('/api/v1/auth/check-token', {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: storedToken,
        },
      });
      if (!response.status) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      //console.log(data);
      if (data.status === 'ok') {
        setUserStatus('Logged in as ' + data.role);
        setIsLoggedIn(true);
        console.log(data);
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
  //console.log('this is liscomment' + listComment + ' : ' + listComment.length);
  if (listComment.length > 0) {
    threadComments = listComment.map((comment, index) => <CommentBlock key={index} comment={comment} />);
  }

  const saveCommentDataHandler = async (comment, error) => {
    try {
      setIsLoading(true);
      if (error != null) {
        throw new Error(error);
      }
      // const storedToken = localStorage.getItem('token');
      // console.log(props.thread);
      // if (!props.thread) {
      //   throw new Error('No thread found: ' + comment.thread.slug);
      // }

      // const response = await fetch('/api/v1/threads/' + comment.thread.slug + '/comment', {
      //   method: 'POST',
      //   body: JSON.stringify(comment),
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: storedToken,
      //   },
      // });
      // const response_data = await response.json();
      // console.log(response_data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div>
        {!isLoading && !error && threadComments}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </div>
      <div>{userStatus}</div>
      <div>{props.thread._id}</div>

      <div>
        <CommentForm thread={props.thread} onSaveCommentData={saveCommentDataHandler} />
      </div>
    </div>
  );
};
export default CommentBox;
