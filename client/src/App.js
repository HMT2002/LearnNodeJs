import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import ControllPanel from './components/ControlPanel';
import ListPostCard from './components/ListPostCard';
import NewPost from './components/NewPost';
import PostCard from './components/PostCard';

const DUMMY_POSTS = [];

function App() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchPostHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/test/posts');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      setPosts((prevPosts) => {
        return [...data.data.posts, ...prevPosts];
      });
      setPosts(data.data.posts);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchPostHandler();
  }, [fetchPostHandler]);

  const addPostHandler = async (post) => {
    setIsLoading(true);

    await setPosts((prevPosts) => {
      return [post, ...prevPosts];
    });

    console.log(posts);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <section>
            <button onClick={fetchPostHandler}>Fetch</button>
          </section>
          <section>
            <section>
              <ControllPanel />
            </section>
            <section>
              {!isLoading && posts.length > 0 && !error && <ListPostCard posts={posts} />}
              {isLoading && <p>Loading...</p>}
              {!isLoading && error && <p>{error}</p>}
            </section>
            <section>
              <NewPost onAddPost={addPostHandler}></NewPost>
            </section>
          </section>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
