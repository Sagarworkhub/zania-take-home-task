import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import invariant from 'tiny-invariant';

import { App } from './App.tsx';
import './index.css';

const root = document.getElementById('root');

// Create a client
const queryClient = new QueryClient();

invariant(root, 'Root element not found');

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
