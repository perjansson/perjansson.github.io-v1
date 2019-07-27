<script>
  import { onMount } from "svelte";
  import Project from "./Project.svelte";

  export let projects;

  let containerEl;
  let header;

  onMount(() => {
    setTimeout(() => {
      ScrollReveal().reveal(containerEl);
      ScrollReveal().reveal(header, {
        scale: 0.8,
        duration: 1000,
        delay: 3000
      });
    }, 500);
  });

  const scrollToHeader = () => zenscroll.to(header);
</script>

<style>
  @keyframes bounce {
    0%,
    20%,
    53%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translateZ(0);
    }

    40%,
    43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -30px, 0);
    }

    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  .bounce {
    animation-name: bounce;
    transform-origin: center bottom;
  }

  .projects-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 2em 14em 72px 14em;
  }

  .header {
    margin: 1em 0 1em 0;
    font-size: 2em;
    color: #7f7f7f;
    cursor: pointer;
  }

  .header .bounce {
    animation-duration: 1s;
    animation-delay: 4s;
    animation-fill-mode: both;
  }

  .list {
    list-style-type: none;
    padding-left: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .container {
      margin: 3em 3em 36px 3em;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .container {
      margin: 3em 3em 36px 3em;
    }
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .container {
      margin: 3em 3em 36px 3em;
    }
  }
</style>

<div class="projects-container" bind:this={containerEl}>
  <div class="header" bind:this={header} on:click={scrollToHeader}>
    <div class="bounce">Stuff I've done ▼</div>
  </div>
  <ol class="list">
    {#each projects as project, i}
      <li>
        <Project id={i} {...project} />
      </li>
    {/each}
  </ol>
</div>
