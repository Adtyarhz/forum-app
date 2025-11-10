import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.UP_VOTE_THREAD_DETAIL:
    const isUpvotedDetail = threadDetail.upVotesBy.includes(action.payload.userId);
    return {
      ...threadDetail,
      upVotesBy: isUpvotedDetail
        ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
        : threadDetail.upVotesBy.concat([action.payload.userId]),
      downVotesBy: isUpvotedDetail
        ? threadDetail.downVotesBy
        : threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };
  case ActionType.DOWN_VOTE_THREAD_DETAIL:
    const isDownvotedDetail = threadDetail.downVotesBy.includes(action.payload.userId);
    return {
      ...threadDetail,
      downVotesBy: isDownvotedDetail
        ? threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
        : threadDetail.downVotesBy.concat([action.payload.userId]),
      upVotesBy: isDownvotedDetail
        ? threadDetail.upVotesBy
        : threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
    };
  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.UP_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          const isUpvotedComment = comment.upVotesBy.includes(action.payload.userId);
          return {
            ...comment,
            upVotesBy: isUpvotedComment
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: isUpvotedComment
              ? comment.downVotesBy
              : comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };
  case ActionType.DOWN_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          const isDownvotedComment = comment.downVotesBy.includes(action.payload.userId);
          return {
            ...comment,
            downVotesBy: isDownvotedComment
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy.concat([action.payload.userId]),
            upVotesBy: isDownvotedComment
              ? comment.upVotesBy
              : comment.upVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };
  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;