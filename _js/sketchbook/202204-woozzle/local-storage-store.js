/**
 * Svelte store that persists value in local storage.
 */


// Dependencies
import { writable } from 'svelte/store'

// Has local storage
const hasLocalStorage = typeof localStorage !== 'undefined';

function generateLocalStorageStore(key, initial = '', parseGet = JSON.parse, parseSet = JSON.stringify) {
  // Get value
  let stored = hasLocalStorage ? localStorage.getItem(key) : initial;
  stored = parseGet && stored ? parseGet(stored) : stored;

  // Create store
  const store = writable(stored || initial)

  // Anytime the store changes, update the local storage value.
  store.subscribe(value => {
    if (hasLocalStorage) {
      localStorage.setItem(key, parseSet ? parseSet(value) : value);
    }
  });

  return store;
}

export default generateLocalStorageStore;
