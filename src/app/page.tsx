'use client';

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Box, CircularProgress, Alert } from '@mui/material';
import { KanbanBoard } from '../components/KanbanBoard';
import { BoardManager } from '../components/BoardManager';
import { WelcomePage } from '../components/WelcomePage';

export default function Home() {
  const { currentBoard, loading, error, setCurrentBoard, updateBoard, showWelcome, setShowWelcome } = useApp();

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: '#F8FAFC' }}
      >
        <CircularProgress 
          sx={{ 
            color: '#2563EB',
            '& .MuiCircularProgress-circle': {
              strokeWidth: 3,
            },
          }} 
        />
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
        sx={{ backgroundColor: '#F8FAFC', p: 2 }}
      >
        <Alert 
          severity="error" 
          sx={{ 
            maxWidth: 500,
            border: '2px solid #f44336',
            borderRadius: 2,
            '& .MuiAlert-icon': {
              color: '#DC2626',
            },
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (showWelcome) {
    return <WelcomePage onEnterBoards={() => setShowWelcome(false)} />;
  }

  return (
    <Box sx={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {currentBoard ? (
        <KanbanBoard 
          board={currentBoard} 
          onBack={() => setCurrentBoard(null)}
          onUpdateBoard={updateBoard}
        />
      ) : (
        <BoardManager />
      )}
    </Box>
  );
}
