import { useEffect, useState } from 'react';

export default function useLocalStorage(key) {
  const defaultValue = getFromLocalStorage(key);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue !== value) {
      if (value === null) {
        removeFromLocalStorage(key);
      } else {
        saveToLocalStorage(key, value);
      }
    }
  }, [value]);

  function saveToLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function getFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  function removeFromLocalStorage(key) {
    window.localStorage.removeItem(key);
  }

  return [value, setValue];
}