<script>
  import Tags from "./Tags.svelte";

  export let id;
  export let title;
  export let description;
  export let me;
  export let tags;

  setTimeout(() => {
    ScrollReveal().reveal("[id^='project-']", {
      distance: "25%",
      origin: "bottom",
      scale: 0.8,
      duration: 1000
    });
  }, 500);
</script>

<style>
  .project-container {
    margin: 0 0 72px 0;
  }

  .project-container > div {
    margin-bottom: 24px;
  }

  .title {
    font-size: 3em;
    font-weight: 700;
  }

  .prefix {
    font-weight: 400;
  }

  .description {
    font-size: 1.2em;
    font-weight: 300;
    color: #404040;
  }

  .me {
    font-size: 1.2em;
    font-weight: 300;
    color: #404040;
  }
</style>

<div class="project-container" id={`project-${id}-container`}>
  <div class="title"> {title} </div>
  <div class="description">
    <span class="prefix">Desc:</span>
     {description}
  </div>
  <div class="me">
    <span class="prefix">Me:</span>
     {me}
  </div>
  <Tags {tags} />
</div>
