import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem';

function CommentList({ comments }) {
  return (
    <div className="detail-page-comment-list-card">
      <h3 className="detail-page-comment-list-title">Comments ({comments.length})</h3>
      <div className="detail-page-comment-list-items">
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
};

export default CommentList;