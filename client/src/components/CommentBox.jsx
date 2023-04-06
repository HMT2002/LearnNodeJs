import './CommentBox.css';

import React, { useState, useEffect, useCallback } from 'react';

import CommentBlock from './CommentBlock';
import CommentForm from './CommentForm';
const CommentBox = (props) => {
  const [listComment, setListComment] = useState([]);
  const [thread, setThread] = useState(props.thread);
  const [threadComments, setThreadComments] = useState(<p>There is no comment</p>);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState('Guest');
  const [error, setError] = useState(null);
  const storedToken = localStorage.getItem('token');
  //console.log(props.thread);

  //console.log('this is liscomment' + listComment + ' : ' + listComment.length);

  console.log('localstorage: CommentBox');
  console.log(localStorage.getItem('token'));

  const loadingUserStatusHandler = useCallback(async () => {
    //setUserStatus(props.user);
    setIsLoading(true);

    //
    try {
      const checkToken_response = await fetch('/api/v1/auth/check-token', {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: storedToken,
        },
      });
      if (!checkToken_response.status) {
        throw new Error('Something went wrong!');
      }
      const dataCheck = await checkToken_response.json();
      //console.log(data);
      if (dataCheck.status === 'ok') {
        setUserStatus('Logged in as ' + dataCheck.role);
        setIsLoggedIn(true);
        console.log(dataCheck);
      }
    } catch {
      setError(error.message);
    }
    //
    setIsLoading(false);
  }, []);

  const getCommentsHandler = async () => {
    const comments_response = await fetch('/api/v1/threads/' + props.thread.slug + '/comment', {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        // Authorization: storedToken,
      },
    });
    if (!comments_response.status) {
      throw new Error('Something went wrong!');
    }
    const dataComment = await comments_response.json();
    // console.log(dataComment);
    if (dataComment.status === 'ok') {
      if (dataComment.data.length > 0) {
        setThreadComments(dataComment.data.map((comment, index) => <CommentBlock key={index} comment={comment} />));
      }
    }
  };

  const loadingCommentsHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('this is the props: ');
      console.log(thread);
      console.log(props.thread);
      await getCommentsHandler();
    } catch {
      setError(error.message);
    }
    //
    setIsLoading(false);
  }, [props.thread]);

  useEffect(() => {
    loadingUserStatusHandler();
  }, [loadingUserStatusHandler]);

  useEffect(() => {
    loadingCommentsHandler();
  }, [loadingCommentsHandler]);

  const postCommentHandler = async (comment) => {
    const storedToken = localStorage.getItem('token');
    console.log(props.thread);
    if (!props.thread) {
      throw new Error('No thread found: ' + comment.thread.slug);
    }

    const response = await fetch('/api/v1/threads/' + comment.thread.slug + '/comment', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
        Authorization: storedToken,
      },
    });
    const response_data = await response.json();
    // console.log(response_data);
  };
  const saveCommentDataHandler = async (comment, error) => {
    try {
      setIsLoading(true);
      if (error != null) {
        throw new Error(error);
      }
      await postCommentHandler(comment);
      await getCommentsHandler();
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
export default CommentBox;
