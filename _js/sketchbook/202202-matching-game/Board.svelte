<script>
  import { shuffle, take, cloneDeep, sortBy } from 'lodash-es';
  import { cards, turn, phase } from './game-state';
  import availableCards from './cards';
  import Card from './Card.svelte';

  let cardCount = availableCards.length * 2;
  let gamePaused = false;
  let boardWidth;
  let boardHeight;
  let cardWidth;
  let cardPadding;

  // Make the set of cards given the number of cards we want
  // on the board.
  $: {
    let cardsWithMatches = sortBy(cloneDeep(availableCards).concat(cloneDeep(availableCards)), 'id');
    cards.set(shuffle(take(cardsWithMatches, cardCount)));
  }

  // Determine card dimensions from board dimensions
  $: {
    let boardRatio = boardWidth / boardHeight;
    let cardColumns = Math[boardRatio > 1 ? 'ceil' : 'floor'](Math.sqrt(cardCount));
    let cardRows = Math.ceil(cardCount / cardColumns)
    cardWidth = Math.min(boardWidth / cardColumns, boardHeight / cardRows);
    cardPadding = cardWidth * 0.05;
  }

  // Flip a card
  function flipCard(cardIndex) {
    if (canFlip(cardIndex)) {
      cards.update(c => {
        c[cardIndex].flipped = !c[cardIndex].flipped;
        return c;
      });

      calculateFlip();
    }
  }

  // Determine if a card can be flipped
  function canFlip(cardIndex) {
    return !gamePaused && !$cards[cardIndex].matched && !$cards[cardIndex].flipped;
  }

  // What to do after a flip
  function calculateFlip() {
    // Determine if other are flipped
    let currentlyFlipped = $cards.filter(c => c.flipped);

    // If just one, keep going
    if (currentlyFlipped.length === 1) {
      return;
    }

    // If too many flipped
    if (currentlyFlipped.length > 2) {
      console.error('Flipped cards is more than 2', { cards: $cards });
      unFlipAllCards();
      return;
    }

    // If not match, flip all back over
    if (currentlyFlipped[0].id !== currentlyFlipped[1].id) {
      pauseThenAct(() => {
        unFlipAllCards();

        // Next players turn
        turn.update(t => t === 0 ? 1 : 0);
      });
    }

    // If match, wait a moment, then hide
    if (currentlyFlipped[0].id === currentlyFlipped[1].id) {
      pauseThenAct(() => {
        cards.set($cards.map(c => {
          if (c.flipped) {
            c.flipped = false;
            c.matched = true;
            c.player = $turn;
          };
          return c;
        }));

        // Check if done
        let matchesLeft = $cards.filter(c => !c.matched);
        if (matchesLeft.length === 0) {
          phase.set('finish');
        }

        // Player keeps going
      });
    }
  }

  // Unflip/hide all cards
  function unFlipAllCards() {
    cards.set($cards.map(c => {
      c.flipped = false;
      return c;
    }));
  }

  // Pause game for a time then do something
  function pauseThenAct(action, timeToPause = 2250) {
    gamePaused = true;
    setTimeout(() => {
      action();
      gamePaused = false;
    }, timeToPause)
  }
</script>

<div
  class="board"
  bind:clientWidth={boardWidth}
  bind:clientHeight={boardHeight}
  style:padding={`${cardPadding || 2}px`}
>
  {#each $cards as card, ci}
    <div
      class="card-container"
      on:click|preventDefault={() => flipCard(ci)}
      style:width={`${cardWidth || 10}px`}
      style:height={`${cardWidth || 10}px`}
      style:padding={`${cardPadding || 2}px`}
    >
      <Card {...card} />
    </div>
  {/each}
</div>

<style>
  .board {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: row;
    align-content: flex-start;
    width: 100%;
    height: 100%;
  }
</style>
