// Import CSS files here for hot module reloading to work.
import "./assets/styles.css";

// Set up EventSource for server-sent events
document.addEventListener("DOMContentLoaded", () => {
  const eventSource = new EventSource("/api/sse");

  const parser = new DOMParser();

  eventSource.onmessage = (event) => {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      return;
    }
    const htmlString = JSON.parse(event.data);
    const doc = parser.parseFromString(htmlString, "text/html");
    const toast = doc.body.firstChild;
    if (toast) {
      // Directly insert the received HTML
      toastContainer.appendChild(toast);

      // Auto-remove the toast after 5 seconds
      const newToast = toastContainer.lastElementChild;
      if (newToast) {
        setTimeout(() => {
          newToast.addEventListener("animationend", () => newToast.remove(), {
            once: true,
          });
        }, 5000);
      }
    }
  };

  // Handle connection errors
  eventSource.onerror = () => {
    console.error("EventSource failed to connect or encountered an error");
    // Try to reconnect after a delay
    setTimeout(() => {
      eventSource.close();
      // The browser will automatically attempt to reconnect
    }, 5000);
  };
});
