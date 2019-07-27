<script>
  import content from "./content";
  import ProjectList from "./components/ProjectList.svelte";
  import Me from "./components/Me.svelte";
</script>

<style>
  .main-container {
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
</style>

<main class="main-container">
  <Me {...content.me} />
  <ProjectList projects={content.projects} />
</main>
