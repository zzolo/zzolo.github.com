// Dependencies
import { writable } from 'svelte/store';
import { uniqBy, cloneDeep } from 'lodash-es';

// Stores
const players = writable([]);
const cards = writable([]);
const turn = writable(0);
const phase = writable('intro');

// Calculations (probably some way to use derived stores here)
const computeScores = (cards) => {
  let player1Cards = cards.filter(c => c.player === 0);
  let player1Score = player1Cards.length / 2;
  let player1Matches = uniqBy(cloneDeep(player1Cards), 'id');
  let player2Cards = cards.filter(c => c.player === 1);
  let player2Score = player2Cards.length / 2;
  let player2Matches = uniqBy(cloneDeep(player2Cards), 'id');

  return {
    player1: {
      cards: player1Cards,
      score: player1Score || 0,
      matches: player1Matches
    },
    player2: {
      cards: player2Cards,
      score: player2Score || 0,
      matches: player2Matches
    }
  }
}

export {
  players,
  cards,
  turn,
  phase,
  computeScores
};
