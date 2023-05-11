const BASE_URL = `${location.protocol}//${window.location.host}`;

export function fetchPosts() {
  const url = `${BASE_URL}/posts`;
  return fetch(url).then((resp) => resp.json());
}

export async function fetchUserPosts(userId) {
  const url = `${BASE_URL}/user/${userId}/post`;
  return await fetch(url).then((resp) => resp.json());
}

export async function fetchUser(userId) {
  const url = `${BASE_URL}/user/${userId}`;
  return fetch(url).then((resp) => resp.json());
}

export async function fetchUserByUsername(username) {
  const url = `${BASE_URL}/user?username=${username}`;
  return fetch(url)
    .then((resp) => resp.json())
    .then(json => json[0]);
}

export async function postPost(post) {
  const url = `${BASE_URL}/post`
  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  }).then(res => res.status)
}

export async function deletePostById(postId) {
  const url = `${BASE_URL}/post/${postId}`
  return fetch(url, {
    method: 'DELETE',
  }).then(res => res.status)
}