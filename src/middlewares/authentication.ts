import { NextResponse } from 'next/server';
//= Types
import type { NextRequest } from 'next/server';

type Params = {
  request: NextRequest;
}

export function authenticationMiddleware({ request }: Params) {
  const protectedRoutes = ['/'];
  const noAuthRoutes = ['/login'];

  const token = request.cookies.get('token')?.value;

  if (token && noAuthRoutes.some(route => route === request.nextUrl.pathname)) return {
    shouldReturn: true,
    returnValue: NextResponse.redirect(new URL(`/`, request.url))
  };

  if (!token && protectedRoutes.some(route => route === request.nextUrl.pathname)) return {
    shouldReturn: true,
    returnValue: NextResponse.redirect(new URL(`/login`, request.url))
  };


  return {
    shouldReturn: false,
    returnValue: null as any
  }
}