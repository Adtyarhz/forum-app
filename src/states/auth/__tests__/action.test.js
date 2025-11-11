import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../action';
import api from '../../../utils/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../utils/api');

describe('auth actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('asyncSetAuthUser', () => {
    it('should dispatch correct actions on successful login', async () => {
      // arrange
      const fakeLoginResponse = 'fake-token';
      const fakeUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      };
      const fakeLoginData = {
        email: 'john@example.com',
        password: 'password123',
      };

      api.login.mockResolvedValue(fakeLoginResponse);
      api.getOwnProfile.mockResolvedValue(fakeUser);

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        { type: 'SET_AUTH_USER', payload: { authUser: fakeUser } },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({});

      // action
      await store.dispatch(actions.asyncSetAuthUser(fakeLoginData));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.login).toHaveBeenCalledWith(fakeLoginData);
      expect(api.getOwnProfile).toHaveBeenCalled();
    });

    it('should dispatch correct actions on failed login', async () => {
      // arrange
      const fakeError = new Error('Invalid credentials');
      const fakeLoginData = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };

      api.login.mockRejectedValue(fakeError);

      const expectedActions = [
        { type: 'SHOW_LOADING' },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({});

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await store.dispatch(actions.asyncSetAuthUser(fakeLoginData));

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.login).toHaveBeenCalledWith(fakeLoginData);
      expect(api.getOwnProfile).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncUnsetAuthUser', () => {
    it('should dispatch correct actions on logout', async () => {
      // arrange
      const expectedActions = [
        { type: 'SHOW_LOADING' },
        { type: 'UNSET_AUTH_USER', payload: { authUser: null } },
        { type: 'HIDE_LOADING' },
      ];

      const store = mockStore({});

      // action
      await store.dispatch(actions.asyncUnsetAuthUser());

      // assert
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.putAccessToken).toHaveBeenCalledWith('');
    });
  });
});
