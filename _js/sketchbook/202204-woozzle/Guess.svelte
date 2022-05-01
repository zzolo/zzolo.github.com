<script>

  export let actual = '';
  export let guess = '';
  export let alert = false;
  let letters = [];

  $: {
    let matched = [];
    let guessLetters = guess.toLowerCase().split('');
    let actualLetters = actual.toLowerCase().split('');

    // Look for exact matches first
    guessLetters.forEach((l, li) => {
      if (l === actualLetters[li]) {
        matched.push(li);
      }
    });

    // Then look for fuzzy/close matches
    letters = guessLetters.map((l, li) => {
      let status = actualLetters[li] === l ? 'exact' : null;
      if (!status) {
        let found = actualLetters.find((a, ai) => {
          // If letter matches somewhere, but not somewhere we have seen before.
          let f = a === l && matched.indexOf(ai) === -1;
          if (f) {
            matched.push(ai);
            return true;
          }
        });
        status = found ? 'close' : status;
      }


      return {
        letter: l,
        status
      };
    });
  };
</script>

<p class="guess">
  <span class="sr-only" role={alert ? 'alert' : ''}>
    "{guess}" was guessed where:
    {#each letters as letter, li}
      {letter.letter}
      {#if letter.status === 'exact'}
        matched exactly as the letter in position {li + 1}.
      {:else if letter.status === 'close'}
        matched but in a different position other than {li + 1}.
      {:else}
        did not match at all in position {li + 1}.
      {/if}
      {' '}{' '}
    {/each}
  </span>

  {#each letters as letter}
    <div class="letter {letter.status || ''}">
      {letter.letter}
    </div>
  {/each}
</p>

<style>
  .guess {
    display: flex;
    margin-bottom: 0.5em;
  }

  .letter {
    display: block;
    background-color: var(--wooozzle-color-gray);
    padding: 0.25em 0.5em;
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-right: 0.25em;
    width: 2em;
    text-align: center;
  }

  .exact {
    background-color: var(--wooozzle-color-green);
  }

  .close {
    background-color: var(--wooozzle-color-yellow);
  }
</style>
