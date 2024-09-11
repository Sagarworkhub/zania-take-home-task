import { useMutation } from '@tanstack/react-query';
import { queryClient } from '~/query-client';

import { type IDocument } from '../types';

type ReorderDocumentsResponse = Array<IDocument>;

export const reorderDocuments = async (body: Array<IDocument>) => {
  const response = await fetch('/documents/reorder', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', // Define content type
    },
    body: JSON.stringify(body), // Convert your data to a JSON string
  });
  const data = (await response.json()) as ReorderDocumentsResponse;
  return data;
};

export const useReorderDocuments = () => {
  return useMutation({
    mutationFn: reorderDocuments,
    // Always refetch after error or success
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};
