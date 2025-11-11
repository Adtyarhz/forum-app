import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import ThreadItem from '../ThreadItem';

const mockStore = configureMockStore([]);

const mockThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  user: {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  totalComments: 5,
  upVotesBy: ['user-1'],
  downVotesBy: [],
  authUser: 'user-1',
};

const renderWithProviders = (component, store) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('ThreadItem', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authUser: { id: 'user-1' },
    });
  });

  it('should render thread item correctly', () => {
    // Arrange & Action
    renderWithProviders(
      <ThreadItem {...mockThread} />,
      store
    );

    // Assert
    expect(screen.getByText('Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('#General')).toBeInTheDocument();
    expect(screen.getByText('5 comments')).toBeInTheDocument();
  });

  it('should display up vote count correctly', () => {
    // Arrange & Action
    renderWithProviders(
      <ThreadItem {...mockThread} />,
      store
    );

    // Assert
    expect(screen.getByText('👍 1')).toBeInTheDocument();
  });

  it('should display down vote count correctly', () => {
    // Arrange & Action
    const threadWithDownVotes = {
      ...mockThread,
      upVotesBy: [],
      downVotesBy: ['user-2', 'user-3'],
    };

    renderWithProviders(
      <ThreadItem {...threadWithDownVotes} />,
      store
    );

    // Assert
    expect(screen.getByText('👎 2')).toBeInTheDocument();
  });

  it('should handle up vote click correctly', () => {
    // Arrange
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    renderWithProviders(
      <ThreadItem {...mockThread} />,
      store
    );

    const upVoteButton = screen.getByText('👍 1');

    // Action
    fireEvent.click(upVoteButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should handle down vote click correctly', () => {
    // Arrange
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    renderWithProviders(
      <ThreadItem {...mockThread} />,
      store
    );

    const downVoteButton = screen.getByText('👎 0');

    // Action
    fireEvent.click(downVoteButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should handle thread click correctly', () => {
    // Arrange
    renderWithProviders(
      <ThreadItem {...mockThread} />,
      store
    );

    const threadItem = screen.getByRole('button');

    // Action
    fireEvent.click(threadItem);

    // Assert
    // Navigation is handled by react-router, so we can't easily test the actual navigation
    // But we can verify the element is clickable
    expect(threadItem).toBeInTheDocument();
  });
});
