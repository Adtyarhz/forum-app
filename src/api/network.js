const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.user;
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.token;
}

async function getOwnProfile() {
  const response = await fetchWithAuth(`${BASE_URL}/users/me`);
  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.user;
}

async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.users;
}

async function getAllThreads() {
  const response = await fetch(`${BASE_URL}/threads`);
  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.threads;
}

async function getThreadDetail(id) {
  const response = await fetch(`${BASE_URL}/threads/${id}`);
  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.detailThread;
}

async function createThread({ title, body, category = '' }) {
  const response = await fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, category }),
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.thread;
}

async function createComment({ threadId, content }) {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.comment;
}

async function upVoteThread(id) {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.vote;
}

async function downVoteThread(id) {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.vote;
}

async function neutralizeThreadVote(id) {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.vote;
}

async function upVoteComment(threadId, commentId) {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.vote;
}

async function downVoteComment(threadId, commentId) {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.vote;
}

async function neutralizeCommentVote(threadId, commentId) {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.vote;
}

async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  const responseJson = await response.json();
  const { status, message, data } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  return data.leaderboards;
}

export {
  getAccessToken,
  putAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  upVoteComment,
  downVoteComment,
  neutralizeCommentVote,
  getLeaderboards,
};