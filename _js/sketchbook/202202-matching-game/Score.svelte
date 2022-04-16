<script>
  import { players, turn, cards, computeScores } from './game-state';
  import Card from './Card.svelte';

  $: scores = computeScores($cards);
</script>

<div class="scoreboard">
  <div class="player-1" class:turn={$turn === 0}>
    <div class="player-score">{scores.player1.score}</div>
    <div class="player-name">{$players[0]}</div>
    <div class="player-matches">
      {#each scores.player1.matches as card}
        <div class="matched-card">
          <Card {...card} flipped={true} matched={false} />
        </div>
      {/each}
    </div>
  </div>

  <div>
    <i
      class="turn-arrow ion-ios-arrow-back"
      class:turn-player1={$turn === 0}
      class:turn-player2={$turn === 1}
    ></i>
  </div>

  <div class="player-2" class:turn={$turn === 1}>
    <div class="player-score">{scores.player2.score}</div>
    <div class="player-name">{$players[1]}</div>
    <div class="player-matches">
      {#each scores.player2.matches as card}
        <div class="matched-card">
          <Card {...card} flipped={true} matched={false} />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .scoreboard {
    border-top: 2px solid var(--matching-game-color-dark);
    padding: 1rem 2rem;
    display: flex;
    column-gap: 3rem;
  }

  .player-1,
  .player-2 {
    width: 100%;
    opacity: 0.5;
    transition: opacity 0.5s;
  }

  .player-1 {
    text-align: right;
  }

  .player-2 {
    text-align: left;
  }

  .player-score {
    font-size: 1.75em;
  }

  .turn {
    opacity: 1;
    font-weight: bold;
  }

  .turn-arrow {
    color: var(--matching-game-color-primary);
    font-size: 2.5rem;
    margin-top: 1rem;
    display: inline-block;
    transform: rotate(0);
    transition: transform 0.5s;
  }

  .turn-arrow.turn-player2 {
    transform: rotate(180deg);
  }

  .player-matches {
    padding-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }

  .player-1 .player-matches {
    flex-direction: row-reverse;
  }

  .matched-card {
    height: 2rem;
    width: 2rem;
  }
</style>
