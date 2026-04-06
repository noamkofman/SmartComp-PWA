self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type !== 'SHOW_NOTIFICATION') return;

  const payload = data.payload || {};
  const title = payload.title || 'Match Update';
  const options = {
    body: payload.body || 'A match time changed.',
    icon: `${self.registration.scope}vite.svg`,
    badge: `${self.registration.scope}vite.svg`,
    data: { url: payload.url || self.registration.scope },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data ? event.data.text() : 'Match update available.' };
  }

  const title = payload.title || 'Match Update';
  const options = {
    body: payload.body || 'A match time changed.',
    icon: `${self.registration.scope}vite.svg`,
    badge: `${self.registration.scope}vite.svg`,
    data: { url: payload.url || self.registration.scope },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || self.registration.scope;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      for (const client of clientsArr) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }

      return undefined;
    }),
  );
});
