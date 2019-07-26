<script>
  import { onMount } from "svelte";
  import ContactList from "./ContactList.svelte";

  export let name;
  export let title;
  export let contacts;
  export let short;
  export let long;

  const isSmallScreen = () => window.matchMedia("(max-width: 480px)").matches;

  onMount(() => {
    setTimeout(() => {
      const factor = isSmallScreen() ? 0.85 : 0.8;
      document.querySelector(".me-container").style.height =
        window.innerHeight * factor + "px";

      ScrollReveal().reveal(".me-container .header", {
        distance: "150%",
        origin: "top",
        duration: 1000
      });

      ScrollReveal().reveal(".me-container .description", {
        scale: 0.9,
        duration: 1000,
        delay: 1000
      });

      ScrollReveal().reveal(".me-container .contact", {
        distance: "20%",
        origin: "left",
        scale: 0.9,
        duration: 1000,
        delay: 1500
      });

      ScrollReveal().reveal(".me-container .more", {
        distance: "100%",
        origin: "left",
        duration: 1000,
        delay: 2500
      });
    }, 500);
  });
</script>

<style>
  .me-container {
    padding: 0 0 24px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    width: 100%;
  }

  .header {
    width: 100%;
    margin: 1em 0 1em 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .header * {
    font-family: "Unica One", monospace;
    font-size: 1.5em;
    font-weight: 200;
    color: #404040;
    text-transform: uppercase;
    letter-spacing: 0em;
  }

  .contact {
    text-align: center;
    font-size: 0.9em;
    margin: 0.75em 0 2em 0;
  }

  .content {
    height: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: opacity 400ms ease-in-out;
  }

  .description {
    margin-top: 2em;
    width: 75%;
    font-size: 3em;
    font-weight: 400;
    line-height: 1.2em;
    cursor: pointer;
  }

  .long .description {
    width: 90%;
    font-size: 1.1em;
    line-height: 1.5em;
  }

  .description strong {
    font-weight: 600;
  }

  .more {
    margin-left: 1em;
    font-size: 2em;
    color: #7f7f7f;
    line-height: 1.2em;
    cursor: pointer;
  }

  .more::after {
    content: "►";
  }

  .long .more::after {
    content: "◄";
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .contact {
      margin-left: 5%;
      margin-right: 5%;
    }

    .content {
      height: 100%;
    }

    .description {
      margin-top: 0;
      width: 100%;
      overflow: hidden;
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block; /* Fallback for non-webkit */
      display: -webkit-box;
      -webkit-line-clamp: 20;
      -webkit-box-orient: vertical;
    }
    .me .long .description {
      margin-top: 2em;
      font-size: 1.2em;
      line-height: 1.3em;
    }

    .more {
      margin-left: 0;
    }
  }
</style>

<div class="me-container">
  <div class="header">
    <div class="name">{name}</div>
    <div class="title">{title}</div>
  </div>
  <div class="contact">
    <ContactList {contacts} />
  </div>
  <div class="content">
    <div class="description">
      {@html short}
    </div>
    <div class="more" />
  </div>
</div>
