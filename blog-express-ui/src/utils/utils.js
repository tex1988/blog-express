export function getDate(stringDate) {
  const date = new Date(stringDate);
  return date.toLocaleString('en-US');
}

export function isTheSameUser(user, userId) {
  if (!user) return false;
  return Number(userId) === Number(user.userId);
}

export function isPageExists(length, size , page) {
  return Math.ceil(length / size) >= page;
}

export function forEachObjectEntry(object, callback) {
  Object.entries(object).forEach(entry => {
    const [key, value ] = entry;
    callback(key, value);
  })
}