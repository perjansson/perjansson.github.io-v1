<script>
  import Project from "./Project.svelte";

  export let projects;

  setTimeout(() => {
    ScrollReveal().reveal("#projects-container");
    ScrollReveal().reveal("#projects-header", {
      scale: 0.9,
      duration: 1000,
      delay: 2500
    });
  }, 500);

  const scrollToHeader = () =>
    zenscroll.to(document.querySelector("#projects-header"));
</script>

<style>
  @keyframes bounce {
    0%,
    20%,
    53%,
    80%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }

    40%,
    43% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -30px, 0);
      transform: translate3d(0, -30px, 0);
    }

    70% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -15px, 0);
      transform: translate3d(0, -15px, 0);
    }

    90% {
      -webkit-transform: translate3d(0, -4px, 0);
      transform: translate3d(0, -4px, 0);
    }
  }

  .bounce {
    -webkit-animation-name: bounce;
    animation-name: bounce;
    -webkit-transform-origin: center bottom;
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
    animation-delay: 3s;
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

<div class="projects-container" id="projects-container">
  <div class="header" id="projects-header" on:click={scrollToHeader}>
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
