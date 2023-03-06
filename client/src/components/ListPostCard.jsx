import './ListPostCard.css';
import React, { useState } from 'react';

import PostCard from './PostCard';

function ListPostCard(props) {
  const [list, setList] = useState(props.posts);

  let postsContent = <p>No more post</p>;

  if (list.length > 0) {
    postsContent = list.map((post) => <PostCard key={post.id} post={post} />);
  }
  //console.log(list);
  return <div>{postsContent}</div>;
}

export default ListPostCard;
