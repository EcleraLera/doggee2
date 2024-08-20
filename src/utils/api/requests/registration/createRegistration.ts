import { User } from '@types';
import { api } from '@/utils';

export const createRegistration = ({
  params,
  config,
}: ApiParams<RegistrationReqPostParams>) =>
  api.post<ApiResponse<User>>('registration', params, config);
