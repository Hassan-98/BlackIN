import type { NextRequest } from 'next/server';
//= Middlewares
import { authenticationMiddleware } from './middlewares/authentication';

export function middleware(request: NextRequest) {
  /* Authentication middleware */
  const checkAuthentication = authenticationMiddleware({ request });
  if (checkAuthentication.shouldReturn) return checkAuthentication.returnValue;
}


export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.png|imgs|fonts|css|webfonts|favicon).*)']
}