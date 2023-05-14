export  function getDate(stringDate) {
  const date = new Date(stringDate);
  return date.toLocaleString('en-US');
}