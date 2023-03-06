import './NewPost.css';

import PostForm from './PostForm';
import React from 'react';

const NewPost = (props) => {
  const savePostDataHandler = (enteredPostData) => {
    const postData = {
      ...enteredPostData,
    };
    console.log('savePostDataHandler called');

    props.onAddPost(postData);
  };

  return (
    <div className="new-post">
      <PostForm onSavePostData={savePostDataHandler} />
    </div>
  );
};

export default NewPost;
