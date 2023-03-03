import './App.css';
import React, { useEffect, useState } from 'react';
import ControllPanel from './components/ControlPanel';
import ListPostCard from './components/ListPostCard';
import NewPost from './components/NewPost';
import PostCard from './components/PostCard';

const DUMMY_POSTS = [];

function App() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPostHandler() {
    setIsLoading(true);

    const response = await fetch('/api/v1/posts');
    const data = await response.json();

    setPosts(data.data.posts);

    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <section>
            <button onClick={fetchPostHandler}>Fetch</button>
          </section>
          <section>
            <ControllPanel />
          </section>
          <section onLoad={fetchPostHandler}>
            {/* <PostCard title="something0" user="someone0" />
          <PostCard title="something1" user="someone1" />
          <PostCard title="something2" user="someone2" />
          <PostCard title="something3" user="someone3" /> */}
            {/* <ListPostCard posts={posts} /> */}

            {!isLoading && posts.length > 0 && <ListPostCard posts={posts} />}

            {!isLoading && posts.length === 0 && <p>No more post</p>}

            {isLoading && <p>Loading...</p>}
          </section>
          <section>
            <NewPost></NewPost>
          </section>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
