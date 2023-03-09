import React, { useState } from 'react';

import Card from './Card';
import './ThreadCard.css';

function ThreadCard(props) {
  const [title, setTitle] = useState(props.thread.title);
  const [user, setUser] = useState(props.thread.user);
  const [content, setContent] = useState(props.thread.content);

  const titleClickedHandler = () => {
    //setTitle('Updated!');
    console.log(title);
  };
  const cardClickedHandler = () => {
    console.log('Card ' + title + ' Clicked');
  };
  return (
    <Card onClick={cardClickedHandler}>
      <figure>
        <p>{title}</p>
        <p>{user}</p>
        <p>{content}</p>
      </figure>
    </Card>
  );
}

export default ThreadCard;
