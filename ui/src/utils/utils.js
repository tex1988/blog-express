export function forEachObjectEntry(object, callback) {
  Object.entries(object).forEach(entry => {
    const [key, value ] = entry;
    callback(key, value);
  })
}