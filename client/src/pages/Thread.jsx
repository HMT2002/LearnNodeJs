import './Thread.css';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
const Thread = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState('Guest');

  const [error, setError] = useState(null);
  const [thread, setThread] = useState([]);

  const fetchThreadHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/threads/' + slug);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);
      setThread((prevThreads) => {
        return data.data.thread;
      });
      console.log(thread);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchThreadHandler();
  }, [fetchThreadHandler]);

  return (
    <div>
      <h3>ID: {slug}</h3>
      <video src={thread.video} autoPlay controls loop></video>
      <h3>Title: {thread.title}</h3>
      <h3>Content: {thread.content}</h3>
    </div>
  );
};
export default Thread;
