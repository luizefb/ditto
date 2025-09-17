'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { KanbanBoard } from '../../../../components/KanbanBoard';
import { AppHeader } from '../../../../components/AppHeader';
import { useApp } from '../../../../contexts/AppContext';
import { getBoardById } from '../../../../lib/api';
import { Board } from '../../../../types/kanban';

export default function BoardPage() {
  const params = useParams();
  const router = useRouter();
  const { updateBoard } = useApp();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const boardId = params.id as string;

  useEffect(() => {
    const loadBoard = async () => {
      if (!boardId) return;

      try {
        setLoading(true);
        setError(null);
        const boardData = await getBoardById(boardId);
        
        if (!boardData) {
          setError('Board não encontrado');
          return;
        }
        
        setBoard(boardData);
      } catch (err) {
        setError('Erro ao carregar board');
      } finally {
        setLoading(false);
      }
    };

    loadBoard();
  }, [boardId]);

  const handleUpdateBoard = async (updatedBoard: Board) => {
    setBoard(updatedBoard);
    updateBoard(updatedBoard);
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#F3E5F5' }}>
        <AppHeader />
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="50vh"
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
              CARREGANDO BOARD...
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  if (error || !board) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#F3E5F5' }}>
        <AppHeader />
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="50vh"
          sx={{ p: 3 }}
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
              {error || 'Board não encontrado'}
            </Typography>
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F3E5F5' }}>
      <AppHeader />
      <KanbanBoard
        board={board}
        onUpdateBoard={handleUpdateBoard}
        onBack={handleBack}
      />
    </Box>
  );
}
