/* eslint-disable @typescript-eslint/no-explicit-any */
// type BaseUrl = string;
// const baseApiUrl: BaseUrl = 'http://localhost:3001/';
// interface ApiSuccessResponse<T> {
//   data: T;
//   success: true;
// }
// interface ApiFailureResponse {
//   data: {
//     message: string;
//   };
//   success: false;
// }

// type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
// export class API {
//   readonly baseUrl: BaseUrl;

//   constructor(baseUrl: BaseUrl) {
//     this.baseUrl = baseUrl;
//   }

//   async request<T>(endpoint: string, options: RequestInit = {}) {
//     const response = await fetch(this.baseUrl + endpoint, {
//       method: 'GET',
//       credentials: 'include', //  изначально стояло sаme-origin
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...(!!options?.headers && options.headers),
//       },
//     });

//     if (!response.ok) throw new Error(response.statusText);
//     const responseData = (await response.json()) as ApiResponse<T>;
//     console.log('responseData', responseData);

//     return {
//       data: responseData.data,
//       status: response.status,
//       success: responseData.success,
//     };
//   }

//   get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
//     return this.request<T>(endpoint, { ...options, method: 'GET' });
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   post<T>(
//     endpoint: string,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     body: Record<string, any>,
//     options: RequestInit = {}
//   ) {
//     return this.request<T>(endpoint, {
//       ...options,
//       method: 'POST',
//       ...(!!body && { body: JSON.stringify(body) }),
//     });
//   }
// }

// export const api = new API(baseApiUrl);
export class API {
  readonly baseUrl: BaseUrl;

  readonly interceptorHandlers: Interceptors;

  readonly interceptors: {
    request: {
      use: (onSuccess: SuccessRequestFun, onFailure?: FailureFun) => void;
    };
    response: {
      use: (onSuccess: SuccessResponseFun, onFailure?: FailureFun) => void;
    };
  };

  readonly headers?: RequestInit['headers'];

  constructor(
    baseUrl: BaseUrl,
    config?: { headers?: RequestInit['headers']; interceptors?: Interceptors }
  ) {
    this.baseUrl = baseUrl;
    this.interceptorHandlers = { request: [], response: [] };
    this.interceptors = {
      request: {
        use: (onSuccess, onFailure) => {
          this.interceptorHandlers.request?.push({ onSuccess, onFailure });
        },
      },
      response: {
        use: (onSuccess, onFailure) => {
          this.interceptorHandlers.response?.push({ onSuccess, onFailure });
        },
      },
    };
    this.headers = config?.headers ?? {};
  }

  async runResponseInterceptors<T>(initialResponse: Response) {
    let body = (await initialResponse.json()) as T;

    this.interceptorHandlers.response?.forEach(({ onSuccess, onFailure }) => {
      try {
        body = onSuccess({
          status: initialResponse.status,
          statusText: initialResponse.statusText,
          ok: initialResponse.ok,
          body,
        });
      } catch (e) {
        if (onFailure) {
          body = onFailure(e as Error);
        } else throw new Error((e as Error).message);
      }
    });

    return body;
  }

  runRequestInterceptors(initialConfig: RequestInit) {
    let config = initialConfig;

    this.interceptorHandlers.request?.forEach(({ onSuccess, onFailure }) => {
      try {
        config = onSuccess(config);
      } catch (e) {
        if (onFailure) {
          onFailure(e as Error);
        }

        throw new Error((e as Error).message);
      }
    });

    return config;
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const defaultConfig: RequestInit = {
      ...options,
      headers: { ...(!!options?.headers && options.headers), ...this.headers },
    };

    const config = this.runRequestInterceptors(defaultConfig);

    const response = await fetch(this.baseUrl + endpoint, config).catch(
      (e) => ({
        ok: false,
        statusText: e.message,
        headers: config.headers,
        redirected: false,
        status: 503,
        type: 'error',
        url: this.baseUrl + endpoint,
        json: () => null,
      })
    );

    return this.runResponseInterceptors<T>(response as Response);
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  delete<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  post<T>(
    endpoint: string,
    body: Record<string, any>,
    options: RequestInit = {}
  ) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) }),
    });
  }

  put<T>(
    endpoint: string,
    body: Record<string, any>,
    options: RequestInit = {}
  ) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      ...(!!body && { body: JSON.stringify(body) }),
    });
  }

  patch<T>(
    endpoint: string,
    body: Record<string, any>,
    options: RequestInit = {}
  ) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      ...(!!body && { body: JSON.stringify(body) }),
    });
  }
}
