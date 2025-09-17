'use client';

import React from 'react';
import { AuthForm } from '../../../components/AuthForm';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleAuthSuccess = () => {
    router.push('/dashboard');
  };

  return <AuthForm onSuccess={handleAuthSuccess} />;
}
