'use client';
import React from 'react';
//= Styles
import cls from './styles.module.scss';

export default function WelcomeScreen() {
  return (
    <div className={cls.welcome__screen}>
      <h1>Welcome to Black IN Dashboard</h1>
    </div>
  )
}