import App from "./App.svelte";

const app = new App({
  target: document.body,
});

if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.path");
  });
}

export default app;
