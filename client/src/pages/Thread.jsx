import './Thread.css';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import ContentBox from '../components/ContentBox';
import CommentBox from '../components/CommentBox';

const Thread = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState('Guest');

  const [error, setError] = useState(null);
  const [thread, setThread] = useState({});
  const [comments, setComments] = useState([]);

  const fetchThreadHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/threads/' + slug);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      //console.log(data);
      setThread((prevThreads) => {
        return data.data.thread;
      });
      //console.log(thread);
    } catch (error) {
      setError(error.message);
    }

    try {
      var vid = document.getElementById('main-video');
      vid.volume = 0.2;
      // console.log('volume set');
    } catch {
      // console.log('volume not set');
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchThreadHandler();
  }, [fetchThreadHandler]);

  return (
    <div>
      <div>
        <h3>ID: {slug}</h3>
        <video id="main-video" src={thread.video} controls loop></video>
        <h3>Title: {thread.title}</h3>
        <ContentBox content={thread.content}></ContentBox>
      </div>

      <CommentBox thread={thread}></CommentBox>
    </div>
  );
};
export default Thread;
