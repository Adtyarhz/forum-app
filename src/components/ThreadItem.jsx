import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncUpVoteThread, asyncDownVoteThread, asyncNeutralizeVoteThread } from '../states/threads/action';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  totalComments,
  upVotesBy,
  downVotesBy,
  authUser,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onUpVote = (event) => {
    event.stopPropagation();
    if (upVotesBy.includes(authUser)) {
      dispatch(asyncNeutralizeVoteThread(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const onDownVote = (event) => {
    event.stopPropagation();
    if (downVotesBy.includes(authUser)) {
      dispatch(asyncNeutralizeVoteThread(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  return (
    <div
      className="thread-item"
      onClick={onThreadClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onThreadClick()}
    >
      <div className="thread-header">
        <img src={user.avatar} alt={user.name} className="thread-avatar" />
        <div className="thread-user-info">
          <span className="thread-author">{user.name}</span>
          <span className="thread-date">{createdAt}</span>
        </div>
      </div>
      <h3 className="thread-title">{title}</h3>
      <div
        className="thread-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="thread-footer">
        <span className="thread-category">#{category}</span>
        <div className="thread-actions">
          <button
            className={`vote-btn up-vote ${upVotesBy.includes(authUser) ? 'voted' : ''}`}
            onClick={onUpVote}
          >
            👍 {upVotesBy.length}
          </button>
          <button
            className={`vote-btn down-vote ${downVotesBy.includes(authUser) ? 'voted' : ''}`}
            onClick={onDownVote}
          >
            👎 {downVotesBy.length}
          </button>
          <span className="thread-comments">{totalComments} comments</span>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

export { threadItemShape };

export default ThreadItem;
