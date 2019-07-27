<script>
  import { onMount } from "svelte";
  export let short;
  export let long;

  let wrapperEl;
  let descriptionEl;
  let moreEl;

  let isShowingShortText = true;

  onMount(() => {
    setTimeout(() => {
      ScrollReveal().reveal(descriptionEl, {
        scale: 0.9,
        duration: 1000,
        delay: 1000
      });

      ScrollReveal().reveal(moreEl, {
        scale: 0.0,
        duration: 1000,
        delay: 1000
      });
    }, 500);
  });

  const toggle = () => {
    wrapperEl.style.opacity = 0;
    setTimeout(() => {
      isShowingShortText = !isShowingShortText;
      wrapperEl.style.opacity = 1;
    }, 500);
  };
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: row;
    transition: opacity 400ms ease-in-out;
  }

  .description {
    font-weight: 400;
    cursor: pointer;
  }

  .short .description {
    flex: 3;
    font-size: 3em;
    line-height: 1.2em;
  }

  .long .description {
    flex: 9;
    font-size: 1.1em;
    line-height: 1.5em;
  }

  .more {
    flex: 1;
    padding: 100px 20px 0 20px;
    font-size: 2em;
    color: #7f7f7f;
    line-height: 1.2em;
    text-align: center;
    cursor: pointer;
  }

  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .short .description {
      font-size: 2em;
    }

    .long .description {
      font-size: 0.9em;
    }
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .description {
      width: 100%;
      overflow: hidden;
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block; /* Fallback for non-webkit */
      display: -webkit-box;
      -webkit-line-clamp: 30;
      -webkit-box-orient: vertical;
    }

    .short .description {
      flex: 10;
      font-size: 2.5em;
    }

    .long .description {
      margin-top: 2em;
      font-size: 1.2em;
      line-height: 1.3em;
    }

    .more {
      margin-left: 0;
      padding-top: 180px;
    }
  }
</style>

<div
  class={isShowingShortText ? 'wrapper short' : 'wrapper long'}
  bind:this={wrapperEl}>
  <div class="description" bind:this={descriptionEl}>
    {@html isShowingShortText ? short : long}
  </div>
  <div class="more" on:click={toggle} bind:this={moreEl}>
    {isShowingShortText ? '►' : '◄'}
  </div>
</div>
