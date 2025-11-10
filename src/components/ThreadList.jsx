import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({ threads }) {
  if (threads.length === 0) {
    return (
      <div className="no-threads-message">
        <p className="no-threads-text">
          No threads found.
        </p>
      </div>
    );
  }

  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};

export default ThreadsList;
