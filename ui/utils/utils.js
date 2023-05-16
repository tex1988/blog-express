export  function getDate(stringDate) {
  const date = new Date(stringDate);
  return date.toLocaleString('en-US');
}

export function isTheSameUser(user, userId) {
  if (!user) return false;
  return Number(userId) === Number(user.userId);
}