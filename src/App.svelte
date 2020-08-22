<script>
  import { onMount } from "svelte";

  import content from "./content";
  import ProjectList from "./components/ProjectList.svelte";
  import Me from "./components/Me.svelte";

  onMount(() => {
    window.addEventListener("online", handleConnection);
    window.addEventListener("offline", handleConnection);

    async function handleConnection() {
      if (navigator.onLine) {
        const isConnected = await hasConnection();
        if (isConnected) {
          // Connected
          setConnectionStyles(true);
        } else {
          // Not connected
          setConnectionStyles(false);
        }
      } else {
        // Offline
        setConnectionStyles(false);
      }
    }

    async function hasConnection() {
      try {
        await fetch("https://google.com/noexist", {
          method: "HEAD",
          mode: "no-cors"
        });
        return true;
      } catch (e) {
        return false;
      }
    }

    function setConnectionStyles(connected) {
      document.documentElement.style.setProperty(
        "--connectivity-color",
        connected ? "transparent" : "gray"
      );
    }
  });
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
