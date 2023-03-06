import React, { useState } from 'react';

import Card from './Card';
import './PostCard.css';

function PostCard(props) {
  const [title, setTitle] = useState(props.post.title);
  const [user, setUser] = useState(props.post.user);
  const [content, setContent] = useState(props.post.content);

  const titleClickedHandler = () => {
    setTitle('Updated!');
    console.log(title);
  };
  return (
    <Card>
      <figure>
        <p onClick={titleClickedHandler}>{title}</p>
        <p>{user}</p>
        <p>{content}</p>
      </figure>
    </Card>
  );
}

export default PostCard;
