import React from 'react';

import './PostForm.css';
const PostForm = () => {
  return (
    <form>
      <div className="new-post__controls">
        <div className="new-post__controls">
          <label>Title</label>
          <input type="text" />
        </div>

        <div className="new-post__controls">
          <label>Explain Video</label>
          <input type="file" />
        </div>

        <div className="new-post__controls">
          <label>Content</label>
          <input type="text" />
        </div>
      </div>

      <div className="new-post__actions">
        <button type="submit">Create new post</button>
      </div>
    </form>
  );
};
export default PostForm;
