/* eslint-disable no-unused-vars */
import { register } from "./register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: { scope: "./" },
    ready(reg) {
      console.log("Service worker is active.");

      // reg.pushManager.getSubscription().then(function(sub) {
      //   if (sub === null) {
      //     // Update UI to ask user to register for Push
      //     console.log("Not subscribed to push service!");
      //   } else {
      //     // We have a subscription, update the database
      //     console.log("Subscription object: ", sub);
      //   }
      // });
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
      console.log("New content is available; please refresh.");
      let confirmationResult = confirm(
        "New content found! Do you want to reload the app?"
      );
      if (confirmationResult)
        registration.waiting.postMessage({ action: "skipWaiting" });
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

var refreshing;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

// function subscribeUser() {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready.then(function(reg) {
//       reg.pushManager
//         .subscribe({
//           userVisibleOnly: true
//         })
//         .then(function(sub) {
//           console.log("Endpoint URL: ", sub.endpoint);
//         })
//         .catch(function(e) {
//           if (Notification.permission === "denied") {
//             console.warn("Permission for notifications was denied");
//           } else {
//             console.error("Unable to subscribe to push", e);
//           }
//         });
//     });
//   }
// }
