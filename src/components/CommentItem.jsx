import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { postedAt } from '../utils';
import { asyncUpVoteComment, asyncDownVoteComment, asyncNeutralizeVoteComment } from '../states/threadDetail/action';

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy }) {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  const isUpVoted = upVotesBy.includes(authUser.id);
  const isDownVoted = downVotesBy.includes(authUser.id);

  const onUpVote = () => {
    if (isUpVoted) {
      dispatch(asyncNeutralizeVoteComment(id));
    } else {
      dispatch(asyncUpVoteComment(id));
    }
  };

  const onDownVote = () => {
    if (isDownVoted) {
      dispatch(asyncNeutralizeVoteComment(id));
    } else {
      dispatch(asyncDownVoteComment(id));
    }
  };

  return (
    <div className="detail-page-comment-item">
      <div className="detail-page-comment-header">
        <img src={owner.avatar} alt={owner.name} className="detail-page-comment-author-avatar" />
        <div className="detail-page-comment-author-info">
          <span className="detail-page-comment-author-name">{owner.name}</span>
          <span className="detail-page-comment-created-at">{postedAt(createdAt)}</span>
        </div>
      </div>
      <p className="detail-page-comment-content">{content}</p>
      <div className="detail-page-comment-voting">
        <button
          onClick={onUpVote}
          className={`detail-page-vote-btn up-vote ${isUpVoted ? 'voted' : ''}`}
        >
          👍 {upVotesBy.length}
        </button>
        <button
          onClick={onDownVote}
          className={`detail-page-vote-btn down-vote ${isDownVoted ? 'voted' : ''}`}
        >
          👎 {downVotesBy.length}
        </button>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
};

export { commentItemShape };
export default CommentItem;