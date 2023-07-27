const BASE_URL = `${location.protocol}//${window.location.host}`;

export async function fetchPosts(params) {
  const url = `${BASE_URL}/post?`;
  const res = await fetch(url + new URLSearchParams(params));
  await validateResponse(res);
  return res.json();
}

export async function fetchPostById(id) {
  const url = `${BASE_URL}/post/${id}`;
  const res = await fetch(url);
  await validateResponse(res);
  return res.json();
}

export async function fetchUserByUsername(username) {
  const url = `${BASE_URL}/user?username=${username}`;
  const res = await fetch(url);
  await validateResponse(res);
  const json = await res.json();
  return json[0];
}

export async function savePost(post) {
  const url = `${BASE_URL}/post`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  await validateResponse(res);
  return res.json();
}

export async function updatePost(id, post) {
  const url = `${BASE_URL}/post/${id}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  await validateResponse(res);
  return res.json();
}

export async function deletePostById(postId) {
  const url = `${BASE_URL}/post/${postId}`;
  const res = await fetch(url, { method: 'DELETE' });
  await validateResponse(res);
  return res.json();
}

export async function fetchUserPosts(userId, params) {
  const url = `${BASE_URL}/user/${userId}/post?`;
  const res = await fetch(url + new URLSearchParams(params));
  await validateResponse(res);
  return res.json();
}

export async function fetchUserPost(userId, postId) {
  const url = `${BASE_URL}/user/${userId}/post/${postId}`;
  const res = await fetch(url);
  await validateResponse(res);
  return res.json();
}

export async function logInUser(credentials) {
  const url = `${BASE_URL}/login`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  await validateResponse(res);
  return res.json();
}

export async function createUser(user) {
  const url = `${BASE_URL}/user`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  await validateResponse(res);
  return res.json();
}

export async function fetchCommentsByPostId(postId, params) {
  const url = `${BASE_URL}/post/${postId}/comment?`;
  const res = await fetch(url + new URLSearchParams(params));
  await validateResponse(res);
  return res.json();
}

export async function deleteCommentById(commentId) {
  const url = `${BASE_URL}/comment/${commentId}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  await validateResponse(res);
  return res.json();
}

export async function savePostComment(postId, comment) {
  const url = `${BASE_URL}/post/${postId}/comment`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  await validateResponse(res);
  return res.json();
}

export async function updateComment(id, comment) {
  const url = `${BASE_URL}/comment/${id}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  await validateResponse(res);
  return res.json();
}

async function validateResponse(res) {
  if (!res.ok) {
    const json = await res.json();
    const message = json.message;
    throw new Error(`Error: ${res.status}\n ${message}`);
  }
}
