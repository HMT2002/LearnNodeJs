import './App.css';
import React, { useEffect, useState } from 'react';
import ControllPanel from './components/ControlPanel';
import ListPostCard from './components/ListPostCard';
import NewPost from './components/NewPost';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const list_post = [
    {
      id: '632195b7caeeed710a8fc6d8',
      title: 'Here is the title',
      link: 'here is the link',
      content:
        'Here is the content{%<IMAGE>%}https://i.imgur.com/b8v5vWN.jpg{%<IMAGE-END>%} {%<IMAGE>%}https://i.imgur.com/RNiZaD3.jpg{%<IMAGE-END>%}',
      user: '62e562b3bea7c4847cbce502',
      deleted: false,
      createdate: {
        $date: {
          $numberLong: '1663145399243',
        },
      },
      createdAt: {
        $date: {
          $numberLong: '1663145399245',
        },
      },
      updatedAt: {
        $date: {
          $numberLong: '1663145399245',
        },
      },
    },
    {
      id: '634e0d359abf0ee6f7094fda',
      title: 'dfgdfg',
      link: 'settrsgfg',
      content: ' gdrsgfgtytutdsrtgfsfdgs{%<IMAGE>%}https://i.imgur.com/GkO8tzf.png{%<IMAGE-END>%}',
      user: '62e562b3bea7c4847cbce502',
      deleted: false,
      createdate: {
        $date: {
          $numberLong: '1666059573006',
        },
      },
      createdAt: {
        $date: {
          $numberLong: '1666059573008',
        },
      },
      updatedAt: {
        $date: {
          $numberLong: '1666059573008',
        },
      },
    },
  ];

  async function fetchPostHandler() {
    setIsLoading(true);

    const response = await fetch('/api/v1/posts');
    const data = await response.json();

    //console.log(data);
    console.log(data.data);

    setPosts(list_post);

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
            <ListPostCard posts={list_post} />
            {/* {!isLoading && posts.length > 0 && <ListPostCard posts={list_post} />}
            {!isLoading && posts.length === 0 && <p>No more post</p>} */}
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
