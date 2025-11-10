import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score, rank }) {
  const getRankIcon = (rank) => {
    switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `#${rank}`;
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
    case 1:
      return 'rank-gold';
    case 2:
      return 'rank-silver';
    case 3:
      return 'rank-bronze';
    default:
      return 'rank-normal';
    }
  };

  return (
    <div className={`leaderboard-item ${getRankStyle(rank)}`}>
      <div className="rank-column">
        <span className="rank-badge">{getRankIcon(rank)}</span>
      </div>
      <div className="user-column">
        <div className="user-info">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <span className="user-name">{user.name}</span>
        </div>
      </div>
      <div className="score-column">
        <span className="score-value">{score}</span>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
  rank: PropTypes.number.isRequired,
};

export { leaderboardItemShape };
export default LeaderboardItem;
