import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import invariant from 'tiny-invariant';

import { App } from './app.tsx';
import './index.css';
import { persister, queryClient } from './query-client.ts';

async function enableMocking() {
  // if (!import.meta.env.DEV) return;

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const root = document.getElementById('root');

invariant(root, 'Root element not found');

enableMocking()
  .then(() => {
    createRoot(root).render(
      <StrictMode>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <App />
        </PersistQueryClientProvider>
      </StrictMode>,
    );
  })
  .catch((error: unknown) => {
    console.error('Failed to enable mocking', error);
  });
