import './CommentBox.css';

import React, { useState, useEffect, useCallback } from 'react';

import CommentForm from './CommentForm';
import ListCommentBlock from './ListCommentBlock';

import { CheckTokenAction } from '../actions/userActions';
import { GETAllCommentAction, POSTCommentAction } from '../actions/commentActions';
const CommentBox = (props) => {
  const [comments, setComments] = useState(<p>There is no comment</p>);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState('Guest');
  const [error, setError] = useState(null);
  // console.log(props.thread);
  const loadingUserStatusHandler = useCallback(async () => {
    //setUserStatus(props.user);
    setIsLoading(true);

    //
    try {
      const storedToken = localStorage.getItem('token');

      const data = await CheckTokenAction(storedToken);

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

  const getCommentsHandler = async () => {
    const data = await GETAllCommentAction(props.thread.slug);
    console.log(data);
    if (data.status === 'ok') {
      if (data.data.length > 0) {
        setComments(<ListCommentBlock comments={data.data}></ListCommentBlock>);
      }
    }
  };

  const loadingCommentsHandler = useCallback(async () => {
    setIsLoading(true);
    try {
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
    if (!props.thread) {
      throw new Error('No thread found: ' + comment.thread.slug);
    }

    const data = await POSTCommentAction(comment, storedToken);
    console.log(data);
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
        {!isLoading && !error && comments}
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
