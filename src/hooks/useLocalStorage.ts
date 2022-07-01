import { useState, useEffect } from 'react';

// Function to return the saved item from storage if there is any
// ...if no saved item, we return the second argument's value
const getLocalStorageOrDefault = (
  key: string,
  defaultValue: string | number | boolean
) => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
};

// Hook calling the function, and saving the data to the local state
export function useLocalStorage(
  key: string,
  defaultValue: string | number | boolean
) {
  const [value, setValue] = useState(
    getLocalStorageOrDefault(key, defaultValue)
  );

  // Subscribing the event to any changes made with the determined values
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Returning the value and modificator function just like useState hook
  // ...so it can be used similiarly like the useState
  return [value, setValue];
}
