const BASE_URL = `${location.protocol}//${window.location.host}`;

export function fetchPostsByPage(size, page) {
  const url = `${BASE_URL}/post?`;
  return fetch(url + new URLSearchParams({size, page}))
    .then((res) => res.json());
}

export function fetchPostById(id) {
  const url = `${BASE_URL}/post/${id}`;
  return fetch(url).then((res) => res.json());
}

export async function fetchUserByUsername(username) {
  const url = `${BASE_URL}/user?username=${username}`;
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json[0]);
}

export async function savePost(post) {
  const url = `${BASE_URL}/post`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
}

export async function updatePost(id, post) {
  const url = `${BASE_URL}/post/${id}`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  }).then((res) => res.status);
}

export async function deletePostById(postId) {
  const url = `${BASE_URL}/post/${postId}`;
  return fetch(url, {
    method: 'DELETE',
  }).then((res) => res.status);
}

export async function fetchUserPosts(userId) {
  const url = `${BASE_URL}/user/${userId}/post`;
  return await fetch(url).then((res) => res.json());
}

export async function fetchUser(userId) {
  const url = `${BASE_URL}/user/${userId}`;
  return fetch(url).then((res) => res.json());
}

export async function createUser(user) {
  const url = `${BASE_URL}/user`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.status);;
}

export async function fetchCommentById(commentId) {
  const url = `${BASE_URL}/comment/${commentId}`;
  return fetch(url).then((res) => res.json());
}

export async function fetchCommentsByPostId(postId, params) {
  const url = `${BASE_URL}/post/${postId}/comment?`;
  return fetch(url + new URLSearchParams(params)).then((res) => res.json());
}

export async function deleteCommentById(commentId) {
  const url = `${BASE_URL}/comment/${commentId}`;
  return fetch(url, {
    method: 'DELETE',
  }).then((res) => res.status);
}

export async function savePostComment(postId, comment) {
  const url = `${BASE_URL}/post/${postId}/comment`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
}

export async function updateComment(id, comment) {
  const url = `${BASE_URL}/comment/${id}`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  }).then((res) => res.status);
}

function getUrlWithQueryParams(url, params) {
  let urlWithParams = `${url}?`;
  params.entries.each((param, index) => {
    if (index === 0) {
      urlWithParams = `${urlWithParams}`;
    } else {
    }
  });
}
