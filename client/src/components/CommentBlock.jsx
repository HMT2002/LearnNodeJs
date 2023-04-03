import './CommentBlock.css';

import { useState } from 'react';

const CommentBlock = (props) => {
  const [comment, setComment] = useState(props.comment);

  return <div>{comment}</div>;
};
export default CommentBlock;
