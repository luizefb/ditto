'use client';

import React from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { KanbanBoard } from '../components/KanbanBoard';
import { BoardManager } from '../components/BoardManager';
import { AuthForm } from '../components/AuthForm';
import { AppHeader } from '../components/AppHeader';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { currentBoard, loading, error, updateBoard, setCurrentBoard } = useApp();
  const { user: authUser, loading: authLoading } = useAuth();

  // Show auth form if user is not authenticated
  if (!authUser && !authLoading) {
    return <AuthForm />;
  }

  if (loading || authLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: '#F3E5F5' }}
      >
        <Box textAlign="center">
          <CircularProgress 
            size={60} 
            sx={{ 
              color: '#FF6B9D',
              mb: 2,
            }} 
          />
          <Typography variant="h6" sx={{ 
            color: '#E91E63',
            fontWeight: 700,
            textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
          }}>
            CARREGANDO DITTO KANBAN...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: '#FAFAFA', p: 3 }}
      >
        <Alert 
          severity="error" 
          sx={{ 
            maxWidth: 500,
            '& .MuiAlert-icon': {
              color: '#E91E63',
            },
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Ops! Algo deu errado
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F3E5F5' }}>
      <AppHeader />
      {currentBoard ? (
        <KanbanBoard
          board={currentBoard}
          onUpdateBoard={updateBoard}
          onBack={() => setCurrentBoard(null)}
        />
      ) : (
        <BoardManager />
      )}
    </div>
  );
}
