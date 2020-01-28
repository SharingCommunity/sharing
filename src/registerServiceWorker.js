/* eslint-disable no-unused-vars */
import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: { scope: "./" },
    ready(registration) {
      console.log("Service worker is active.");
    },
    registered(registration) {
      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60); // e.g. hourly checks
    },
    cached(registration) {
      console.log("Content has been cached for offline use.");
    },
    updatefound(registration) {
      console.log("New content is downloading.");
    },
    updated(registration) {
      document.dispatchEvent(
        new CustomEvent("swUpdated", { detail: registration })
      );
      console.log("New content is available; please refresh.");
      let worker = registration.waiting;
      worker.postMessage({ action: "skipWaiting" });
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
