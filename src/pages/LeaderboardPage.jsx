import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';
import '../styles/LeaderboardPage.css';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (!leaderboards.length) {
    return null;
  }

  return (
    <section className="leaderboard-page">
      <div className="container">
        <div className="leaderboard-card">
          <h2 className="leaderboard-title">
            🏆 Leaderboard
          </h2>
          <p className="leaderboard-subtitle">
            Top contributors ranked by their activity and engagement
          </p>
          <LeaderboardList leaderboards={leaderboards} />
        </div>
      </div>
    </section>
  );
}

export default LeaderboardPage;
