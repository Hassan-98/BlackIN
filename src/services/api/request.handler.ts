//= Axios Util
import { clientWithAuthorizationHeader, clientNormal } from './axios';
//= Toasts
import { toaster } from '@/utils/toaster';
//= Types
import { type AxiosRequestConfig } from 'axios';

interface RequestOptions {
  body?: unknown;
  config?: AxiosRequestConfig;
  withAuthorizationHeader?: boolean;
}

export interface Response<T> {
  success: boolean;
  data?: T;
  message: string;
}

class API_HANDLER {
  async Get<T>(endpoint: string, options?: RequestOptions): Promise<T | undefined> {
    const config = options?.config || {};

    try {
      const response = await (options?.withAuthorizationHeader ? await clientWithAuthorizationHeader() : await clientNormal()).get<T>(endpoint, config);
      return response.data;
    } catch (err: any) {
      showErrorMessage(err);
    }
  }

  async Post<T>(endpoint: string, options: RequestOptions): Promise<T | undefined> {
    const config = options?.config;
    const body = options?.body || {};

    try {
      const response = await (options?.withAuthorizationHeader ? await clientWithAuthorizationHeader() : await clientNormal()).post<T>(endpoint, body, config);
      return response.data;
    } catch (err: any) {
      showErrorMessage(err);
    }
  }

  async Patch<T>(endpoint: string, options: RequestOptions): Promise<T | undefined> {
    const config = options?.config || {};
    const body = options?.body || {};

    try {
      const response = await (options?.withAuthorizationHeader ? await clientWithAuthorizationHeader() : await clientNormal()).post<T>(endpoint, body, config);
      return response.data;
    } catch (err: any) {
      showErrorMessage(err);
    }
  }

  async Put<T>(endpoint: string, options: RequestOptions): Promise<T | undefined> {
    const config = options?.config || {};
    const body = options?.body || {};

    try {
      const response = await (options?.withAuthorizationHeader ? await clientWithAuthorizationHeader() : await clientNormal()).patch<T>(endpoint, body, config);
      return response.data;
    } catch (err: any) {
      showErrorMessage(err);
    }
  }

  async Delete<T>(endpoint: string, options?: RequestOptions): Promise<T | undefined> {
    const config = options?.config || {};
    const body = options?.body || {};

    try {
      const response = await (options?.withAuthorizationHeader ? await clientWithAuthorizationHeader() : await clientNormal()).delete<T>(endpoint, { ...config, data: body });
      return response.data;
    } catch (err: any) {
      showErrorMessage(err);
    }
  }
}

function showErrorMessage(err: any) {
  typeof window === 'undefined' ?
    console.log(err?.response?.data?.error || err.message)
    :
    toaster.error(err?.response?.data?.error || err.message);
}


const api = new API_HANDLER();

export default api;