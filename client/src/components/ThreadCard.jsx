import React, { useState } from 'react';

import Card from './Card';
import './ThreadCard.css';

function ThreadCard(props) {
  const [title, setTitle] = useState(props.thread.title);
  const [user, setUser] = useState(props.thread.user);
  const [content, setContent] = useState(props.thread.content);

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

export default ThreadCard;
