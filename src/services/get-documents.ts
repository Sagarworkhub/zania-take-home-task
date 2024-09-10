import { useQuery } from '@tanstack/react-query';

import { type IDocument } from './types';

type GetDocumentsResponse = Array<IDocument>;

export const getDocuments = async () => {
  const response = await fetch('/documents');
  const data = (await response.json()) as GetDocumentsResponse;
  return data;
};

export const useGetDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });
};
