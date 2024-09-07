import axios from 'axios';

const isServer = typeof window === 'undefined';

async function createAxiosClient() {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
    }
  });

  return client;
}


async function createAxiosClientWithToken() {
  const client = await createAxiosClient();

  client.interceptors.request.use(async (config) => {
    if (isServer) {
      const { cookies } = (await import('next/headers'));
      const token = cookies().get('token')?.value;
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return client;
}

export const clientWithAuthorizationHeader = async () => await createAxiosClientWithToken();
export const clientNormal = async () => await createAxiosClient();