/**
 * Matching game
 */

// Dependencies
import Game from './202202-matching-game/Game.svelte';

const app = new Game({
	target: document.querySelector('#sketchbook-canvas'),
});
