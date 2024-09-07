import { cache } from 'react';
import Cookies from 'universal-cookie';
import API, { type Response } from "../request.handler";
//= Types
import type { IUser, ILoginPayload } from './types';


export const loginWithEmailAndPassword = async (payload: ILoginPayload) => {
  const response = await API.Post<Response<{ token: string }>>(`/login?uid=${payload.uid}`, {
    body: {
      email: payload.email,
      password: payload.password
    }
  });

  console.log(response);

  // if (response && response.success && response.data?.token) {
  //   saveTokenToCookies(response.data.token);
  // }

  // return response?.data;

  /**
   * Simulate a real API call happend
  **/
  if (payload.email === 'admin@gmail.com' && payload.password === '12345678') {
    const token = 'one-hand1234';
    saveTokenToCookies(token);

    return { token };
  }

  return null;
};


export const getUserData = cache(async () => {
  const response = await API.Get<Response<IUser>>(`/user-profile`, {
    withAuthorizationHeader: true
  });

  return response?.data;
});

function saveTokenToCookies(token: string) {
  const cookies = new Cookies();
  cookies.set('token', token, { path: '/' });
}