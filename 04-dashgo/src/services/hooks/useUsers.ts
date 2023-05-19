import { useQuery } from '@tanstack/react-query';
import { User } from '@/@types/User';
import { api } from '../api';

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users: User[] = data.users.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
    staleTime: 1000 * 5,
  });
}
