import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const isUpvoted = thread.upVotesBy.includes(action.payload.userId);
        return {
          ...thread,
          upVotesBy: isUpvoted
            ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
            : thread.upVotesBy.concat([action.payload.userId]),
          downVotesBy: isUpvoted
            ? thread.downVotesBy
            : thread.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }
      return thread;
    });
  case ActionType.DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const isDownvoted = thread.downVotesBy.includes(action.payload.userId);
        return {
          ...thread,
          downVotesBy: isDownvoted
            ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
            : thread.downVotesBy.concat([action.payload.userId]),
          upVotesBy: isDownvoted
            ? thread.upVotesBy
            : thread.upVotesBy.filter((id) => id !== action.payload.userId),
        };
      }
      return thread;
    });
  case ActionType.NEUTRALIZE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;