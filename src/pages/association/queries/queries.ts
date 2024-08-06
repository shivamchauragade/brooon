import { getAssociation } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetAssociation = (page, pageLimit, country) => {
  return useQuery({
    queryKey: ['association', page, pageLimit, country],
    queryFn: async () => getAssociation(page, pageLimit, country)
  });
};
