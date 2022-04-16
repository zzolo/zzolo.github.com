<script>
  import JSConfetti from 'js-confetti'
  import { onMount } from 'svelte';
  import { players, turn, cards, computeScores } from './game-state';

  $: scores = computeScores($cards);
  $: isTie = scores.player1.score === scores.player2.score;
  $: winnerPlayer = scores.player1.score > scores.player2.score ? $players[0] : $players[1];

  onMount(() => {
    let jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  });
</script>

<div class="finish">
  <div class="score">
    {scores.player1.score} - {scores.player2.score}
  </div>

  <div class="winner">
    {#if isTie}
      It's a Tie!
    {:else}
      {winnerPlayer} won!
    {/if}
  </div>
</div>

<style>
  .finish {
    border-color: var(--matching-game-color-dark);
    border-width: 2px;
    border-radius: 0.5rem;
    border-style: solid;
    padding: 2rem;
    text-align: center;
    background-color: var(--matching-game-color-background);
  }

  .score {
    font-size: 1.5em;
    margin-bottom: 1rem;
  }

  .winner {
    font-size: 2em;
  }
</style>
