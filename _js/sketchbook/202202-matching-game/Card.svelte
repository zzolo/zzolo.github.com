<script>
  import { fade } from 'svelte/transition';

  export let flipped = false;
  export let matched = false;
  export let image;
  export let imageAlt;
</script>

<div class="card-container">
  {#if matched}
    <div class="card-matched-container" transition:fade>
      <div class="card-matched"></div>
    </div>
  {:else}
    <div class="card-flippable" class:flipped={flipped}>
      <div class="card">
        <div class="front"></div>

        <div class="back">
          <img src={image} alt={imageAlt} />
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .card-container,
  .card-matched-container, .card-matched,
  .card-flippable, .card, .front, .back {
    width: 100%;
    height: 100%;
  }

  .card-matched-container {
    position: relative;
  }

  .card-matched {
    border: 0.5rem dashed var(--matching-game-color-primary-dark);
    border-radius: 0.5rem;
    position: absolute;
    bottom:0;
    top:0;
    left:0;
    right:0;
  }

  .card-flippable {
    position: relative;
    cursor: pointer;
  }

  .card-flippable, .card, .front, .back {
    perspective: 1000px;
    border-radius: 0.5rem;
  }

  .card {
    transition: 0.8s;
    transform-style: preserve-3d;
    position: relative;
  }

  .front, .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
    background-color: var(--matching-game-color-primary);
    border: 1rem solid var(--matching-game-color-primary-dark);
  }

  .back {
    transform: rotateY(180deg);
  }

  .back img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .card-flippable.flipped .card {
    transform: rotateY(180deg);
  }
</style>
