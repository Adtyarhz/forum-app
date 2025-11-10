import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem, { leaderboardItemShape } from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboard-list">
      <div className="leaderboard-header">
        <div className="rank-column">
          <span className="header-text">Rank</span>
        </div>
        <div className="user-column">
          <span className="header-text">User</span>
        </div>
        <div className="score-column">
          <span className="header-text">Score</span>
        </div>
      </div>
      <div className="leaderboard-items">
        {leaderboards.map((leaderboard, index) => (
          <LeaderboardItem
            key={leaderboard.user.id}
            {...leaderboard}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape)).isRequired,
};

export default LeaderboardList;
