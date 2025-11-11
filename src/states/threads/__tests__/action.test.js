import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../action';
import api from '../../../utils/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../utils/api');

describe('threads actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('asyncAddThread', () => {
    it('should dispatch correct actions on successful thread creation', async () => {
      // arrange
      const fakeThreadData = {
        title: 'New Thread',
        body: 'This is a new thread',
        category: 'General',
      };
      const fakeThreadResponse = {
        id: 'thread-1',
        title: 'New Thread',
        body: 'This is a new thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      };

      api.createThread.mockResolvedValue(fakeThreadResponse);

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        { type: 'ADD_THREAD', payload: { thread: fakeThreadResponse } },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({});

      // action
      await store.dispatch(actions.asyncAddThread(fakeThreadData));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.createThread).toHaveBeenCalledWith(fakeThreadData);
    });

    it('should dispatch correct actions on failed thread creation', async () => {
      // arrange
      const fakeError = new Error('Failed to create thread');
      const fakeThreadData = {
        title: 'New Thread',
        body: 'This is a new thread',
        category: 'General',
      };

      api.createThread.mockRejectedValue(fakeError);

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({});

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await store.dispatch(actions.asyncAddThread(fakeThreadData));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.createThread).toHaveBeenCalledWith(fakeThreadData);
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncUpVoteThread', () => {
    it('should dispatch correct actions on successful up vote', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        {
          type: 'UP_VOTE_THREAD',
          payload: { threadId, userId: fakeAuthUser.id },
        },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({
        authUser: fakeAuthUser,
      });

      // action
      await store.dispatch(actions.asyncUpVoteThread(threadId));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch correct actions on failed up vote', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };
      const fakeError = new Error('Failed to up vote');

      api.upVoteThread.mockRejectedValue(fakeError);

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        {
          type: 'UP_VOTE_THREAD',
          payload: { threadId, userId: fakeAuthUser.id },
        },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({
        authUser: fakeAuthUser,
      });

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await store.dispatch(actions.asyncUpVoteThread(threadId));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncDownVoteThread', () => {
    it('should dispatch correct actions on successful down vote', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        {
          type: 'DOWN_VOTE_THREAD',
          payload: { threadId, userId: fakeAuthUser.id },
        },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({
        authUser: fakeAuthUser,
      });

      // action
      await store.dispatch(actions.asyncDownVoteThread(threadId));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.downVoteThread).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch correct actions on failed down vote', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };
      const fakeError = new Error('Failed to down vote');

      api.downVoteThread.mockRejectedValue(fakeError);

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        {
          type: 'DOWN_VOTE_THREAD',
          payload: { threadId, userId: fakeAuthUser.id },
        },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({
        authUser: fakeAuthUser,
      });

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await store.dispatch(actions.asyncDownVoteThread(threadId));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.downVoteThread).toHaveBeenCalledWith(threadId);
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncNeutralizeVoteThread', () => {
    it('should dispatch correct actions on successful neutralize vote', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        {
          type: 'NEUTRALIZE_VOTE_THREAD',
          payload: { threadId, userId: fakeAuthUser.id },
        },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({
        authUser: fakeAuthUser,
      });

      // action
      await store.dispatch(actions.asyncNeutralizeVoteThread(threadId));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.neutralizeVoteThread).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch correct actions on failed neutralize vote', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };
      const fakeError = new Error('Failed to neutralize vote');

      api.neutralizeVoteThread.mockRejectedValue(fakeError);

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        {
          type: 'NEUTRALIZE_VOTE_THREAD',
          payload: { threadId, userId: fakeAuthUser.id },
        },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({
        authUser: fakeAuthUser,
      });

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await store.dispatch(actions.asyncNeutralizeVoteThread(threadId));

      // action
      await store.dispatch(actions.asyncNeutralizeVoteThread(threadId));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.neutralizeVoteThread).toHaveBeenCalledWith(threadId);
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });
});
