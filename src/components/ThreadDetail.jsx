import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUpVoteThreadDetail, asyncDownVoteThreadDetail, asyncNeutralizeVoteThreadDetail } from '../states/threadDetail/action';

function ThreadDetail({
  title,
  body,
  owner,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
}) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const onUpVote = () => {
    if (upVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeVoteThreadDetail());
    } else {
      dispatch(asyncUpVoteThreadDetail());
    }
  };

  const onDownVote = () => {
    if (downVotesBy.includes(authUser.id)) {
      dispatch(asyncNeutralizeVoteThreadDetail());
    } else {
      dispatch(asyncDownVoteThreadDetail());
    }
  };

  return (
    <div className="detail-page-thread-detail-card">
      <header className="detail-page-thread-detail-header">
        <img src={owner.avatar} alt={owner.name} className="detail-page-thread-author-avatar" />
        <div className="detail-page-thread-author-details">
          <p className="detail-page-thread-author-name">{owner.name}</p>
          <p className="detail-page-thread-created-at">{createdAt}</p>
        </div>
      </header>
      <article className="detail-page-thread-detail-content">
        <h2 className="detail-page-thread-detail-title">{title}</h2>
        <div className="detail-page-thread-detail-body" dangerouslySetInnerHTML={{ __html: body }} />
      </article>
      <footer className="detail-page-thread-detail-footer">
        <div className="detail-page-thread-category">
          <span className="detail-page-category-badge">#{category}</span>
        </div>
        <div className="detail-page-thread-voting">
          <button
            type="button"
            onClick={onUpVote}
            className={`detail-page-vote-btn up-vote ${upVotesBy.includes(authUser.id) ? 'voted' : ''}`}
          >
            👍 {upVotesBy.length}
          </button>
          <button
            type="button"
            onClick={onDownVote}
            className={`detail-page-vote-btn down-vote ${downVotesBy.includes(authUser.id) ? 'voted' : ''}`}
          >
            👎 {downVotesBy.length}
          </button>
        </div>
      </footer>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreadDetail;
