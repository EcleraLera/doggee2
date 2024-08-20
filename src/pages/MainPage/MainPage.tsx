import React from 'react';

import { useStore } from '@/utils';

export const MainPage: React.FC = () => {
  const { user } = useStore();

  return <div>{user?.username}</div>;
};
