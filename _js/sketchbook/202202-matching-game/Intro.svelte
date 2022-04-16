<script>
  import { players } from './game-state.js';
  import { createEventDispatcher } from 'svelte';

  // Values
  let player1;
  let player2;

  // Event for start
	const dispatchStart = createEventDispatcher();

  // Set player
  function setPlayerName(player, name) {
    players.update(p => {
      p[player] = name;
      return p;
    });
  }

  // Start game
  function startGame() {
    if (!player1 || !player2 || player1 === player2) {
      return;
    }

    setPlayerName(0, player1);
    setPlayerName(1, player2);
    dispatchStart('start');
  }
</script>

<div class="intro">
  <div class="header-wrapper">
    <h1>Match-It</h1>
  </div>

  <div class="player-names">
    <div class="player-item">
      <label for="player-1">Player 1</label>
      <input id="player-1" bind:value={player1} />
    </div>

    <div class="vs">vs</div>

    <div class="player-item">
      <label for="player-2">Player 2</label>
      <input id="player-2" bind:value={player2} />
    </div>
  </div>

  <div class="start">
    <button on:click|preventDefault={startGame}>Start</button>
  </div>
</div>

<style>
  .header-wrapper {
    text-align: center;
  }

  h1 {
    text-align: center;
    margin-bottom: rem;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 8em;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;

    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: url("/sketchbook/202202-matching-game/tiger-wikipedia.jpg");
    background-size: cover;
    background-position: center;
    color: var(--matching-game-color-primary);
    line-height: 1.1em;
    text-shadow: 1px 1px 2px transparent, 0 0 1em var(--matching-game-color-primary), 0 0 0.2em var(--matching-game-color-primary);
  }

  .player-names {
    display: flex;
    margin-bottom: 2rem;
  }

  .player-item {
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
    align-self: flex-end;
  }

  input {
    border-color: var(--matching-game-color-dark);
    max-width: 20em;
  }

  .vs {
    font-weight: bold;
    align-self: center;
  }

  #player-1,
  [for="player-1"] {
    text-align: right;
    margin-left: auto;
  }

  .start {
    text-align: center;
  }

  .start button {
    font-size: 1.5em;
    background-color: var(--matching-game-color-dark);
    color: white;
    padding: 0.25em 2em;
  }
</style>
