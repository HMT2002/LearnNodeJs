import './ListPostCard.css';
import React, { useEffect, useState } from 'react';

import PostCard from './PostCard';

function ListPostCard(props) {
  const [list, setList] = useState(props.posts);

  //console.log(list);
  return (
    <div>
      {list.map((post) => (
        <PostCard title={post.title} user={post.user} />
      ))}
    </div>
  );
}

export default ListPostCard;
