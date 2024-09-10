import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      // this line to load different cat images
      staleTime: Infinity,
    },
  },
});

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
