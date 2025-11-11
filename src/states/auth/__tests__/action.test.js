import * as actions from '../action';
import api from '../../../utils/api';

jest.mock('../../../utils/api');

describe('auth actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('asyncSetAuthUser', () => {
    it('should call api.login and api.getOwnProfile on successful login', async () => {
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

      // action
      await actions.asyncSetAuthUser(fakeLoginData)(() => {}, () => {});

      // assert
      expect(api.login).toHaveBeenCalledWith(fakeLoginData);
      expect(api.getOwnProfile).toHaveBeenCalled();
    });

    it('should handle error when api.login fails', async () => {
      // arrange
      const fakeError = new Error('Invalid credentials');
      const fakeLoginData = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };

      api.login.mockRejectedValue(fakeError);

      // Mock alert to prevent console error
      global.alert = jest.fn();

      // action
      await actions.asyncSetAuthUser(fakeLoginData)(() => {}, () => {});

      // assert
      expect(api.login).toHaveBeenCalledWith(fakeLoginData);
      expect(api.getOwnProfile).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith(fakeError.message);
    });
  });

  describe('asyncUnsetAuthUser', () => {
    it('should call api.putAccessToken with empty string on logout', async () => {
      // action
      await actions.asyncUnsetAuthUser()(() => {}, () => {});

      // assert
      expect(api.putAccessToken).toHaveBeenCalledWith('');
    });
  });
});
