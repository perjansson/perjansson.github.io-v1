<script>
  export let tags;
</script>

<style>
  .tags,
  .tags * {
    font-weight: 200;
    color: #404040;
  }

  .tags > * {
    display: inline-block;
    margin: 0 5px 5px 0;
    padding: 5px;
    border: 1px dashed #bfbfbf;
    background: #fcfcfc;
  }

  .tags > *:hover {
    background: #ececec;
  }
</style>

<div class="tags">
  {#each tags as tag, i}
    <span> {tag} </span>
  {/each}
</div>
