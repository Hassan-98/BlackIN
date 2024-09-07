'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
//= Styles
import cls from './styles.module.scss';

type Props = {
  isLogggedIn: boolean;
}

export default function Navbar({ isLogggedIn }: Props) {
  const router = useRouter();

  function handleLogout() {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    router.push('/login');
  }

  return (
    <nav className={cls.navbar}>
      <div className="container">
        <div className={cls.content}>
          <Link href={'/'} className={cls.logo}>
            <Image
              src='/images/navbar-icon.svg'
              height={50}
              width={50}
              alt="navbar logo"
              priority
            />
            Black IN Dashboard
          </Link>
          <div className={cls.actions}>
            {
              isLogggedIn ?
                <button onClick={handleLogout}>
                  Logout
                </button>
                :
                <Link href={'/'}>
                  <Image
                    src='/images/website-icon.svg'
                    height={20}
                    width={20}
                    alt="website logo"
                  />
                  Go To Website
                </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}