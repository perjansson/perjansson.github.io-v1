<script>
  import { onMount } from "svelte";
  import ContactList from "./ContactList.svelte";
  import Description from "./Description.svelte";

  export let name;
  export let title;
  export let contacts;
  export let short;
  export let long;

  let containerEl;
  let headerEl;
  let contactsEl;

  const isSmallScreen = () => window.matchMedia("(max-width: 480px)").matches;

  onMount(() => {
    setTimeout(() => {
      const factor = isSmallScreen() ? 0.85 : 0.8;
      containerEl.style.height = window.innerHeight * factor + "px";

      ScrollReveal().reveal(headerEl, {
        distance: "150%",
        origin: "top",
        duration: 1000
      });

      ScrollReveal().reveal(contactsEl, {
        distance: "20%",
        origin: "left",
        scale: 0.9,
        duration: 1000,
        delay: 1500
      });
    }, 500);
  });
</script>

<style>
  .container {
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

  .contacts {
    text-align: center;
    font-size: 0.9em;
    margin: 0.75em 0 2em 0;
  }

  .content {
    height: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: opacity 400ms ease-in-out;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .contacts {
      margin-left: 5%;
      margin-right: 5%;
    }

    .content {
      height: 100%;
    }
  }
</style>

<div class="container" bind:this={containerEl}>
  <div class="header" bind:this={headerEl}>
    <div class="name">{name}</div>
    <div class="title">{title}</div>
  </div>
  <div class="contacts" bind:this={contactsEl}>
    <ContactList {contacts} />
  </div>
  <div class="content">
    <Description {short} {long} />
  </div>
</div>
