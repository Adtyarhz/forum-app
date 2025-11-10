import threadDetailReducer from '../reducer';
import { ActionType } from '../action';

describe('threadDetailReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return thread detail with toggled up vote when given by UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // action: up vote thread detail
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
      downVotesBy: [],
    });

    // action: neutralize up vote thread detail (since user already upvoted, it should remove the vote)
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return thread detail with toggled down vote when given by DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // action: down vote thread detail
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [action.payload.userId],
    });

    // action: neutralize down vote thread detail (since user already downvoted, it should remove the vote)
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return thread detail with neutralized vote when given by NEUTRALIZE_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['user-1'],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return thread detail with new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it('should return thread detail with toggled up vote comment when given by UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action: up vote comment
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
          downVotesBy: [],
        },
      ],
    });

    // action: neutralize up vote comment (since user already upvoted, it should remove the vote)
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });

  it('should return thread detail with toggled down vote comment when given by DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action: down vote comment
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [action.payload.userId],
        },
      ],
    });

    // action: neutralize down vote comment (since user already downvoted, it should remove the vote)
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });

  it('should return thread detail with neutralized vote comment when given by NEUTRALIZE_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });
});
