import { useMutation } from '@tanstack/react-query';
import { queryClient } from '~/query-client';

import { type IDocument } from './types';

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

    onMutate: async (reorderedDocuments) => {
      // Cancel any outgoing re-fetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['documents'] });

      // Snapshot the previous value
      const previousDocuments = queryClient.getQueryData(['documents']);

      // Optimistically update to the new value
      queryClient.setQueryData(['documents'], () => reorderedDocuments);

      // Return a context object with the snap-shotted value
      return { previousDocuments };
    },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _reorderDocuments, context) => {
      queryClient.setQueryData(['documents'], context?.previousDocuments);
    },

    // ? Always refetch after error or success: but will comment it for better user experience in the demo app
    // onSettled: async () => {
    //   return queryClient.invalidateQueries({ queryKey: ['documents'] });
    // },
  });
};
