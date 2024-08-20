import { ApiResponse, User } from '@types';
import { api } from '@/utils';

export const createAuth = ({ params, config }: ApiParams<AuthReqPostParams>) =>
  api.post<ApiResponse<User>>('auth', params, config);
