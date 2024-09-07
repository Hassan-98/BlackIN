'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
//= Utils
import { toaster } from '@/utils/toaster';
//= Apis
import { loginWithEmailAndPassword } from '@/services/api/auth';
//= Styles
import cls from './styles.module.scss';


export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: React.MouseEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      toaster.error('Please fill in all fields.');
      return;
    }

    const stopLoading = toaster.startLoading('Logging in...');
    const response = await loginWithEmailAndPassword({ email, password, uid: '1231' /* uid is static here */ });

    if (response && response.token) {
      toaster.success('Welcome back.');
      setTimeout(() => {
        router.push('/');
      }, 500);
    }

    stopLoading();
  }

  return (
    <div className={cls.login__container}>
      <div className={cls.login__form}>
        <Link href="/" className={cls.logo}>
          <Image
            src='/images/logo.svg'
            height={100}
            width={200}
            alt="navbar logo"
          />
        </Link>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <div className={cls.form_field}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={cls.form_field}>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}