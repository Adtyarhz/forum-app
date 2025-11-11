import * as actions from '../action';
import api from '../../../utils/api';

jest.mock('../../../utils/api');

describe('threads actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('asyncAddThread', () => {
    it('should call api.createThread with correct data', async () => {
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

      // action
      await actions.asyncAddThread(fakeThreadData)(() => {}, () => {});

      // assert
      expect(api.createThread).toHaveBeenCalledWith(fakeThreadData);
    });

    it('should handle error when api.createThread fails', async () => {
      // arrange
      const fakeError = new Error('Failed to create thread');
      const fakeThreadData = {
        title: 'New Thread',
        body: 'This is a new thread',
        category: 'General',
      };

      api.createThread.mockRejectedValue(fakeError);

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await actions.asyncAddThread(fakeThreadData)(() => {}, () => {});

      // assert
      expect(api.createThread).toHaveBeenCalledWith(fakeThreadData);
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncUpVoteThread', () => {
    it('should call api.upVoteThread with correct threadId', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };

      // action
      await actions.asyncUpVoteThread(threadId)(() => {}, () => ({ authUser: fakeAuthUser }));

      // assert
      expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
    });

    it('should handle error when api.upVoteThread fails', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };
      const fakeError = new Error('Failed to up vote');

      api.upVoteThread.mockRejectedValue(fakeError);

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await actions.asyncUpVoteThread(threadId)(() => {}, () => ({ authUser: fakeAuthUser }));

      // assert
      expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncDownVoteThread', () => {
    it('should call api.downVoteThread with correct threadId', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };

      // action
      await actions.asyncDownVoteThread(threadId)(() => {}, () => ({ authUser: fakeAuthUser }));

      // assert
      expect(api.downVoteThread).toHaveBeenCalledWith(threadId);
    });

    it('should handle error when api.downVoteThread fails', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };
      const fakeError = new Error('Failed to down vote');

      api.downVoteThread.mockRejectedValue(fakeError);

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await actions.asyncDownVoteThread(threadId)(() => {}, () => ({ authUser: fakeAuthUser }));

      // assert
      expect(api.downVoteThread).toHaveBeenCalledWith(threadId);
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncNeutralizeVoteThread', () => {
    it('should call api.neutralizeThreadVote with correct threadId', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };

      // action
      await actions.asyncNeutralizeVoteThread(threadId)(() => {}, () => ({ authUser: fakeAuthUser }));

      // assert
      expect(api.neutralizeThreadVote).toHaveBeenCalledWith(threadId);
    });

    it('should handle error when api.neutralizeVoteThread fails', async () => {
      // arrange
      const threadId = 'thread-1';
      const fakeAuthUser = { id: 'user-1' };
      const fakeError = new Error('Failed to neutralize vote');

      api.neutralizeThreadVote.mockRejectedValue(fakeError);

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await actions.asyncNeutralizeVoteThread(threadId)(() => {}, () => ({ authUser: fakeAuthUser }));

      // assert
      expect(api.neutralizeThreadVote).toHaveBeenCalledWith(threadId);
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });
});
