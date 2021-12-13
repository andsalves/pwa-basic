async function registerServiceWorker() {
  if (!('serviceWorker' in window.navigator)) {
    console.warn('Browser or device does not support service workers.');
    return;
  }

  try {
    await navigator.serviceWorker.register('./serviceWorker.js');
  } catch (error) {
    console.warn('Service worker could not be registered: ', error);
  }
}

window.addEventListener('load', () => {
  registerServiceWorker();
});