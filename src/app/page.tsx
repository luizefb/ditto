'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { DittoBackground, DittoLoader } from '../components/DittoElements';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      sx={{ backgroundColor: '#F3E5F5', position: 'relative' }}
    >
      <DittoBackground />
      <Box textAlign="center" sx={{ zIndex: 1 }}>
        <DittoLoader size={60} />
        <Typography variant="h6" sx={{ 
          color: '#E91E63',
          fontWeight: 700,
          mt: 2,
          textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
        }}>
          REDIRECIONANDO...
        </Typography>
      </Box>
    </Box>
  );
}
