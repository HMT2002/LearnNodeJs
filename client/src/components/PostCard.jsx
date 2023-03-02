import React, { useState } from 'react';

import Card from './Card';
import './PostCard.css';

function PostCard(props) {
  const [title, setTitle] = useState(props.title);
  const [user, setUser] = useState(props.user);

  return (
    <div>
      <Card>
        <figure>
          <div>{title}</div>
          <div>{user}</div>
        </figure>
      </Card>
    </div>
  );
}

export default PostCard;
