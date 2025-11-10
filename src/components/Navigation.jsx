import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  const { avatar, name } = authUser;

  return (
    <nav className="nav-header">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ForumApp
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/new" className="nav-link">
            New Thread
          </Link>
          <Link to="/leaderboard" className="nav-link">
            Leaderboard
          </Link>
          <div className="nav-user">
            <img src={avatar} alt={name} className="nav-avatar" />
            <button
              onClick={signOut}
              className="nav-signout"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
