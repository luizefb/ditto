'use client';

import React from 'react';
import { Box } from '@mui/material';
import { BoardManager } from '../../../components/BoardManager';
import { AppHeader } from '../../../components/AppHeader';

export default function DashboardPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F3E5F5' }}>
      <AppHeader />
      <BoardManager />
    </Box>
  );
}
