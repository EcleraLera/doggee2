import React from 'react';

interface ApiSuccessResponse<T> {
  data: T;
  success: true;
}
interface ApiFailureResponse {
  data: {
    message: string;
  };
  success: false;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const useQueryLazy = <K>(request: () => Promise<any>) => {
  const [status, setStatus] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const query = React.useCallback(async (): Promise<ApiResponse<K>> => {
    setLoading(true);
    try {
      return await request().then(async (response) => {
        setStatus(response.status);
        return response.data;
      });
      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData?.message || 'Something went wrong');
      //   }
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
      return {
        data: { message: (err as Error).message },
        success: false,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return { query, error, isLoading, status };
};
