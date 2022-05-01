<script>
  import Woozzle from './Woozzle.svelte';
</script>

<div class="woozzle">
  <div class="woozzle-container">
    <h1>Woozzle</h1>
    <p>An Wordle-ish sketch.</p>

    <Woozzle />
  </div>
</div>

<style>
  .woozzle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    --wooozzle-color-green: #35CC24;
    --wooozzle-color-blue: #2F9AE0;
    --wooozzle-color-purple: #D940F7;
    --wooozzle-color-red: #E0762F;
    --wooozzle-color-yellow: #F8F734;
    --wooozzle-color-gray: #979797;
    --wooozzle-color-black: #232323;
  }

  .woozzle-container {
    max-width: 40em;
    color: --wooozzle-color-black;
  }

  h1 {
    margin-bottom: 0;
  }

  p {
    margin-bottom: 2em;
  }

  @media only screen and (max-width: 550px) {
    .woozzle {
      display: block;
    }

    .woozzle-container {
      max-width: auto;
      padding: 1rem;
    }
  }
</style>
