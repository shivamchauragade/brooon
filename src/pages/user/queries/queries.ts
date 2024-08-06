import { getUsers } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = (page, pageLimit, country) => {
  return useQuery({
    queryKey: ['users', page, pageLimit, country],
    queryFn: async () => getUsers(page, pageLimit, country)
  });
};

