import { Breed } from '@types';
import { dogApi } from '@/utils';

export const requestBreeds = ({ config }: ApiParams) =>
  dogApi.get<Breed[]>('breeds', config);
