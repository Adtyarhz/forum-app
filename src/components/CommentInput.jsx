import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }) {
  const [content, onContentChange, setContent] = useInput('');

  const onSubmit = (event) => {
    event.preventDefault();
    addComment(content);
    setContent('');
  };

  return (
    <div className="detail-page-comment-input-card">
      <form className="detail-page-comment-input-form" onSubmit={onSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={content}
          onChange={onContentChange}
          className="detail-page-comment-input-textarea"
        />
        <button
          type="submit"
          className="detail-page-comment-submit-btn"
        >
          Comment
        </button>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;