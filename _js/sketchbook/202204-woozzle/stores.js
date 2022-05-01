/**
 * Methods for getting word
 */

// Dependencies
import words from './word-list';
import localStorageStore from './local-storage-store';

// Word index store
const wordIndex = localStorageStore('woozzle-word-index', 0, parseInt, null);

// Guessed word store
const guessedWords = localStorageStore('woozzle-guessed-words', []);

// Score history
const scores = localStorageStore('woozzle-scores', [], i => {
  // Sorting order doesn't seem to be consistent
  let p = JSON.parse(i);
  return p.sort((a, b) => {
    return words.indexOf(a.word) - words.indexOf(b.word);
  });
});

export {
  scores,
  wordIndex,
  guessedWords
}
