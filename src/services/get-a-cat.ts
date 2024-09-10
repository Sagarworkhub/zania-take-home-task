import { useQuery } from '@tanstack/react-query';

export interface CatAPIResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const getACat = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = (await response.json()) as Array<CatAPIResponse>;
  return data[0];
};

export const useGetACat = (id: string) => {
  return useQuery({
    queryKey: ['cat', id],
    queryFn: getACat,
  });
};
