<script>
  export let contacts;
</script>

<style>
  a:not(:last-child)::after {
    content: ", ";
  }
</style>

{#each contacts as c}
  <a target="_blank" rel="noopener noreferrer" href={c.url}>{c.medium}</a>
{/each}
