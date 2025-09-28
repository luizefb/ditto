'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
  Chip,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import { createBoard, deleteBoard, updateBoard, getBoardById } from '../lib/api';
import { Board, CreateBoard, UpdateBoard } from '../types/kanban';

export const BoardManager: React.FC = () => {
  const { user, boards, refreshBoards, addBoard, removeBoard, setCurrentBoard } = useApp();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<Board | null>(null);
  const [boardTitle, setBoardTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateBoard = async () => {
    if (!user || !boardTitle.trim()) return;

    try {
      setLoading(true);
      const boardData: CreateBoard = {
        title: boardTitle.trim(),
        owner_id: user.id,
      };

      const newBoard = await createBoard(boardData);
      if (newBoard) {
        addBoard(newBoard);
        setBoardTitle('');
        setIsCreateDialogOpen(false);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const handleEditBoard = async () => {
    if (!editingBoard || !boardTitle.trim()) return;

    try {
      setLoading(true);
      const updateData: UpdateBoard = {
        title: boardTitle.trim(),
      };

      const updatedBoard = await updateBoard(editingBoard.id, updateData);
      if (updatedBoard) {
        await refreshBoards();
        setBoardTitle('');
        setEditingBoard(null);
        setIsEditDialogOpen(false);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    if (!confirm('Tem certeza que deseja deletar este board? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setLoading(true);
      const success = await deleteBoard(boardId);
      if (success) {
        removeBoard(boardId);
      }
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const handleViewBoard = async (board: Board) => {
    try {
      setLoading(true);
      // Buscar o board completo com colunas e tarefas
      const fullBoard = await getBoardById(board.id);
      if (fullBoard) {
        setCurrentBoard(fullBoard);
      }
    } catch (error) {
      console.error('Erro ao carregar board:', error);
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (board: Board) => {
    setEditingBoard(board);
    setBoardTitle(board.title);
    setIsEditDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6" color="text.secondary">
          Carregando usuário...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" sx={{ color: '#A67C89', fontWeight: 700, mb: 1 }}>
            Meus Boards
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bem-vindo, {user.name}! Gerencie seus boards Kanban aqui.
          </Typography>
        </Box>
        
        <Fab
          onClick={() => setIsCreateDialogOpen(true)}
          sx={{
            backgroundColor: '#2196F3',
            color: '#FFFFFF',
            border: '2px solid #1976D2',
            boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
            width: 64,
            height: 64,
            '&:hover': {
              backgroundColor: '#1976D2',
              transform: 'translate(-2px, -2px)',
              boxShadow: '5px 5px 0px rgba(0,0,0,0.4)',
            },
            '&:active': {
              transform: 'translate(1px, 1px)',
              boxShadow: '2px 2px 0px rgba(0,0,0,0.3)',
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      {boards.length === 0 ? (
        <Card sx={{ textAlign: 'center', p: 4, backgroundColor: '#F8F6F7' }}>
          <Box sx={{ 
            mx: 'auto', 
            mb: 2, 
            backgroundColor: '#C48B9F',
            width: 64,
            height: 64,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Box sx={{ 
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
            }} />
          </Box>
          <Typography variant="h6" sx={{ color: '#A67C89', mb: 1 }}>
            Nenhum board ainda
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Crie seu primeiro board para começar a organizar suas tarefas!
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateDialogOpen(true)}
            sx={{
              background: 'linear-gradient(45deg, #C48B9F 30%, #A67C89 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #A67C89 30%, #8B6B73 90%)',
              },
            }}
          >
            Criar Primeiro Board
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {boards.map((board) => (
            <Grid key={board.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(255, 105, 180, 0.25)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" sx={{ 
                      color: '#A67C89',
                      fontWeight: 600,
                      flexGrow: 1,
                      mr: 1,
                    }}>
                      {board.title}
                    </Typography>
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => openEditDialog(board)}
                        sx={{ color: '#C48B9F', p: 0.5 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteBoard(board.id)}
                        sx={{ color: '#C48B9F', p: 0.5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Chip
                      label={formatDate(board.created_at)}
                      size="small"
                      sx={{
                        backgroundColor: '#B8A9C9',
                        color: '#FFFFFF',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ViewIcon />}
                    onClick={() => handleViewBoard(board)}
                    disabled={loading}
                    sx={{
                      backgroundColor: '#2563EB',
                      '&:hover': {
                        backgroundColor: '#1D4ED8',
                      },
                    }}
                  >
                    Abrir Board
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F7 100%)',
            border: '2px solid #C48B9F',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          color: '#A67C89',
          fontWeight: 600,
        }}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <Box sx={{ 
              backgroundColor: '#C48B9F', 
              width: 32, 
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Box sx={{ 
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
              }} />
            </Box>
            <Typography variant="h6" component="span">
              Criar Novo Board
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Board"
            fullWidth
            variant="outlined"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FF69B4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF69B4',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FF69B4',
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setIsCreateDialogOpen(false)}
            sx={{ color: '#DDA0DD' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleCreateBoard}
            variant="contained"
            disabled={!boardTitle.trim() || loading}
            sx={{
              background: 'linear-gradient(45deg, #C48B9F 30%, #A67C89 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #A67C89 30%, #8B6B73 90%)',
              },
            }}
          >
            {loading ? 'Criando...' : 'Criar Board'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F7 100%)',
            border: '2px solid #C48B9F',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          color: '#A67C89',
          fontWeight: 600,
        }}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <Box sx={{ 
              backgroundColor: '#C48B9F', 
              width: 32, 
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Box sx={{ 
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
              }} />
            </Box>
            <Typography variant="h6" component="span">
              Editar Board
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Board"
            fullWidth
            variant="outlined"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#FF69B4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF69B4',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#FF69B4',
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setIsEditDialogOpen(false)}
            sx={{ color: '#DDA0DD' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleEditBoard}
            variant="contained"
            disabled={!boardTitle.trim() || loading}
            sx={{
              background: 'linear-gradient(45deg, #C48B9F 30%, #A67C89 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #A67C89 30%, #8B6B73 90%)',
              },
            }}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
