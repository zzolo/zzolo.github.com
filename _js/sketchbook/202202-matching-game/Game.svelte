<script>
  import { fade } from 'svelte/transition';
  import Board from './Board.svelte';
  import Score from './Score.svelte';
  import Intro from './Intro.svelte';
  import Finish from './Finish.svelte';
  import { phase } from './game-state';


</script>

<div class="game-container">
  {#if ($phase === 'intro')}
    <div class="intro" transition:fade>
      <Intro on:start={() => phase.set('game')} />
    </div>
  {/if}

  {#if ($phase === 'game' || $phase === 'finish')}
    <div class="game" transition:fade>
      {#if ($phase === 'finish')}
        <div class="game-overlay"></div>

        <div class="finish">
          <Finish />
        </div>
      {/if}

      <div class="board">
        <Board on:win={() => phase.set('win')} />
      </div>

      <div class="score">
        <Score />
      </div>
    </div>
  {/if}
</div>

<style>
  .game-container {
    width: 100%;
    height: 100%;

    --matching-game-color-primary: #FF8C32;
    --matching-game-color-primary-dark: #ff7204;
    --matching-game-color-dark: #06113C;
    --matching-game-color-highlight: #DDDDDD;
    --matching-game-color-background: #EEEEEE;

    background-color: var(--matching-game-color-background);
  }

  .intro {
    width: 95%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .game {
    position: relative;
    display: flex;
    flex-flow: column;
    height: 100%;
    padding-bottom: 5rem;
  }

  .board {
    width: 100%;
    height: 100%;
  }

  .score {
    width: 100%;
    height: 10rem;
  }

  .game-overlay {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.4s;
  }

  .finish {
    z-index: 20;
    width: 50%;
    min-width: 10em;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
