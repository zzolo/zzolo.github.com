<script>
  // Dependencies
  import { slide } from 'svelte/transition';
  import words from './word-list';
  import { guessedWords, wordIndex, scores } from './stores.js';
  import Guess from './Guess.svelte';

  let input = '';
  let correctGuess = false;
  let word = words[$wordIndex];

  $: word = words[$wordIndex];
  $: correctGuess = $guessedWords.indexOf(word) !== -1;

  function inputChange() {
    input = input && input.length > 5 ? input.slice(0, 5) : input;
  }

  function guessWord() {
    // Check if 5 letters
    if (!input || input.length !== 5) {
      return;
    }

    // Check if already submitted
    if ($guessedWords.indexOf(input) !== -1) {
      return;
    }

    // If already guessed
    if (correctGuess) {
      return;
    }

    // Update guesses
    guessedWords.update(w => {
      w.push(input);
      return w;
    });

    // Update scores
    scores.update(s => {
      let f = s.find(i => i.word === word);
      if (f) {
        f.guesses = f.guesses ? f.guesses + 1 : 1;
      }
      else {
        s.push({
          word,
          guesses: 1
        });
      }

      // Sort
      return s.sort((a, b) => {
        return words.indexOf(a.word) - words.indexOf(b.word);
      });
    });

    // Check if actual word
    if (input === word) {
      correctGuess = true;
    }

    // Resent input
    input = '';
  }

  function nextWord() {
    guessedWords.set([]);
    input = '';
    correctGuess = false;
    wordIndex.update(w => w + 1);
  }

  function reset() {
    scores.set([]);
    guessedWords.set([]);
    input = '';
    correctGuess = false;
  }
</script>

<div class="container">
  <div class="game">
    <form on:submit|preventDefault={guessWord}>
      <label class="sr-only" for="woozzle-guess">Guess 5-letter word</label>

      <input id="woozzle-guess" type="text" bind:value={input} on:input={inputChange} disabled={correctGuess} placeholder="guess" />

      <button class="guess" on:click={guessWord} disabled={correctGuess}>
        <span class="sr-only">Submit guess</span>
        ✏️
      </button>
    </form>

    <div class="guess-list" transition:slide>
      <h2 class="sr-only">Guesses for this word</h2>

      {#each $guessedWords.reverse() as guessedWord, gi (guessedWord)}
        <Guess guess={guessedWord} actual={word} alert={gi === 0} />
      {/each}
    </div>

    {#if correctGuess}
      <div class="correct" transition:slide role="alert">
        <div>🎉 You guessed it! 🎉</div>
        <button on:click={nextWord}>Next word 👉</button>
      </div>
    {/if}
  </div>

  <div class="scores">
    <table>
      <thead>
        <tr>
          <th>Word</th>
          <th class="score-guesses">Guesses</th>
        </tr>
      </thead>

      <tbody>
        {#each $scores.reverse() as score, si (si)}
          <tr transition:slide>
            <td class="score-word">{score.word === word && !correctGuess ? '' : score.word}</td>
            <td class="score-guesses">{score.guesses.toLocaleString()}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="actions">
      <button on:click={reset} title="Reset all scores and guesses">🗑</button>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
  }

  form {
    display: flex;
  }

  input {
    text-transform: uppercase;
    font-size: 1.5em;
    letter-spacing: 1em;
    max-width: 9.25em;
    border: 1px solid var(--wooozzle-color-black);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  button {
    background-color: transparent;
    border: 1px solid var(--wooozzle-color-black);
    color: var(--wooozzle-color-black);
  }

  button:hover {
    border: 1px solid var(--wooozzle-color-gray);
  }

  button.guess {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }

  .guess-list {
    max-height: 15rem;
    overflow-y: auto;
    margin-bottom: 1rem;
  }

  .correct {
    text-align: center;
  }

  .correct div {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .correct button {
    margin: 0;
  }

  .scores {
    margin-left: 2rem;
    margin-top: -2rem;
  }

  .scores table {
    font-size: 0.75em;
    max-height: 16rem;
    overflow-y: auto;
  }

  .scores .actions {
    text-align: right;
  }

  .score-word {
    text-transform: uppercase;
  }

  .score-guesses {
    text-align: right;
  }

  @media only screen and (max-width: 550px) {
    .container {
      display: block;
    }

    input {
      max-width: 10.25em;
    }

    .scores {
      margin: 2rem 0 0 0;
      max-width: 16.5rem;
    }
  }
</style>
