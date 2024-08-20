// import { User } from '@types';
import { api } from '@/utils/api';

// export const requestUser = ({
//   params: { id },
//   config,
// }: ApiParams<UsersIdReqGetParams>) =>
//   api.get<ApiResponse<User>>(`users/${id}`, config);

export async function requestUser({ params }: { params: { id: string } }) {
  const response = await api.get(`/users/${params.id}`);
  return response;
}
