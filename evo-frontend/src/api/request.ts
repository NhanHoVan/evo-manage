import type { AxiosRequestConfig, Method } from 'axios';

import { message as $message } from 'antd';
import axios from 'axios';

// import { history } from '@/routes/history';
import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: true,
      }),
    );

    return config;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    if (config?.data?.message) {
      // $message.success(config.data.message);
    }

    return config?.data;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    let errorMessage = 'System exception';

    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = 'Authentication failed, please log in again';
          history.replaceState(null, '', '/login');
          break;
        case 500:
          errorMessage = 'Server error';
          break;
        default:
          errorMessage = error.response.data?.message || 'Request failed';
      }
    } else if (error.message?.includes('Network Error')) {
      errorMessage = 'Network error, please check your network';
    } else {
      errorMessage = error?.message;
    }

    console.dir(error);
    $message.error(errorMessage);

    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  },
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  const prefix = '/api';

  url = prefix + url;

  switch (method) {
    case 'post':
      return axiosInstance.post(url, data, config);
    case 'put':
      return axiosInstance.put(url, data, config);
    case 'patch':
      return axiosInstance.patch(url, data, config);
    case 'delete':
      return axiosInstance.delete(url, {
        data,
        ...config,
      });
    case 'get':
    default:
      return axiosInstance.get(url, {
        params: data,
        ...config,
      });
  }
};
