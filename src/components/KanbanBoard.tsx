'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { KanbanColumn } from './KanbanColumn';
import { TaskDialog } from './TaskDialog';
import { ColumnDialog } from './ColumnDialog';
import { Board, Task, Column, Priority, CreateColumn, CreateTask, UpdateColumn, UpdateTask } from '../types/kanban';
import { createColumn, updateColumn, deleteColumn, createTask, updateTask, deleteTask, moveTask, getBoardById } from '../lib/api';

interface KanbanBoardProps {
  board: Board;
  onUpdateBoard?: (board: Board) => void;
  onBack?: () => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  board,
  onUpdateBoard,
  onBack,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshBoard = async () => {
    try {
      const updatedBoard = await getBoardById(board.id);
      if (updatedBoard) {
        onUpdateBoard?.(updatedBoard);
      }
    } catch (error) {
      console.error('Erro ao recarregar board:', error);
    }
  };

  const handleAddColumn = () => {
    setSelectedColumn(null);
    setIsColumnDialogOpen(true);
  };

  const handleEditColumn = (column: Column) => {
    setSelectedColumn(column);
    setIsColumnDialogOpen(true);
  };

  const handleDeleteColumn = async (columnId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta coluna? Todas as tarefas serão perdidas.')) {
      return;
    }

    try {
      setLoading(true);
      const success = await deleteColumn(columnId);
      
      if (success) {
        await refreshBoard();
      }
    } catch (error) {
      console.error('Erro ao deletar coluna:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveColumn = async (columnData: { title: string }) => {
    try {
      setLoading(true);
      
      if (selectedColumn) {
        // Editando coluna existente
        const updateData: UpdateColumn = {
          title: columnData.title,
        };

        const updatedColumn = await updateColumn(selectedColumn.id, updateData);
        if (updatedColumn) {
          await refreshBoard();
        }
      } else {
        // Criando nova coluna
        const nextOrder = (board.columns?.length || 0) + 1;
        const createData: CreateColumn = {
          title: columnData.title,
          board_id: board.id,
          order: nextOrder,
        };

        const newColumn = await createColumn(createData);
        if (newColumn) {
          await refreshBoard();
        }
      }

      setIsColumnDialogOpen(false);
      setSelectedColumn(null);
    } catch (error) {
      console.error('Erro ao salvar coluna:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setSelectedTask(null);
    setIsTaskDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setSelectedColumnId(null);
    setIsTaskDialogOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      const success = await deleteTask(taskId);
      
      if (success) {
        // Recarregar board atualizado
        await refreshBoard();
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async (taskData: { title: string; description?: string; priority?: Priority }) => {
    try {
      setLoading(true);
      
      if (selectedTask) {
        // Editando tarefa existente
        const updateData: UpdateTask = {
          ...taskData,
        };

        const updatedTask = await updateTask(selectedTask.id, updateData);
        if (updatedTask) {
          await refreshBoard();
        }
      } else if (selectedColumnId) {
        // Criando nova tarefa
        const createData: CreateTask = {
          column_id: selectedColumnId,
          ...taskData,
        };

        const newTask = await createTask(createData);
        if (newTask) {
          await refreshBoard();
        }
      }

      setIsTaskDialogOpen(false);
      setSelectedTask(null);
      setSelectedColumnId(null);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropTask = async (taskId: string, targetColumnId: string) => {
    try {
      setLoading(true);
      const movedTask = await moveTask(taskId, targetColumnId);
      
      if (movedTask) {
        await refreshBoard();
      }
    } catch (error) {
      console.error('Erro ao mover tarefa:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ 
        background: '#2563EB',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        mb: { xs: 2, sm: 3 },
      }}>
        <Toolbar 
          sx={{ 
            px: { xs: 1, sm: 2 },
            py: { xs: 0.5, sm: 1 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {onBack && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onBack}
              size="small"
              sx={{ 
                mr: { xs: 0.5, sm: 1 },
                p: { xs: 0.5, sm: 1 },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          )}
          
          <Box sx={{ 
            mr: { xs: 0.5, sm: 1 }, 
            width: { xs: 20, sm: 28 },
            height: { xs: 20, sm: 28 },
            borderRadius: 0,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #FFFFFF',
          }}>
            <Box sx={{ 
              width: { xs: 6, sm: 10 },
              height: { xs: 6, sm: 10 },
              borderRadius: 0,
              backgroundColor: '#2563EB',
              transform: 'rotate(45deg)',
            }} />
          </Box>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1.25rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mr: 1,
            }}
          >
            {board.title}
          </Typography>
          
          <Button
            color="inherit"
            startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
            onClick={handleAddColumn}
            disabled={loading}
            sx={{ 
              mr: { xs: 1, sm: 2 }, 
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 1,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              minWidth: { xs: 'auto', sm: 'auto' },
              height: { xs: 32, sm: 36 },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
              <AddIcon fontSize="small" />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              Nova Coluna
            </Box>
          </Button>
          
        </Toolbar>
      </AppBar>

      <Box 
        sx={{ 
          height: { xs: 'calc(100vh - 100px)', sm: 'calc(100vh - 140px)' },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowX: 'auto',
            overflowY: 'hidden',
            px: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 2 },
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              height: { xs: '6px', sm: '8px' },
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(255, 240, 245, 0.3)',
              borderRadius: '6px',
              margin: '0 8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#C48B9F',
              borderRadius: '6px',
              '&:hover': {
                backgroundColor: '#B8A9C9',
              },
              '&:active': {
                backgroundColor: '#A67C89',
              },
            },
            background: {
              xs: `
                linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 20px),
                linear-gradient(-90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 20px)
              `,
              sm: 'none'
            },
            backgroundAttachment: 'local, local',
            backgroundSize: '20px 100%, 20px 100%',
            backgroundPosition: '0 0, 100% 0',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Box
            display="flex"
            gap={{ xs: 2, sm: 3 }}
            sx={{
              minWidth: 'max-content',
              height: '100%',
              alignItems: 'stretch',
              pb: 1,
            }}
          >
            {(board.columns || []).map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDropTask={handleDropTask}
                onEditColumn={handleEditColumn}
                onDeleteColumn={handleDeleteColumn}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <TaskDialog
        open={isTaskDialogOpen}
        task={selectedTask}
        onClose={() => setIsTaskDialogOpen(false)}
        onSave={handleSaveTask}
      />

      <ColumnDialog
        open={isColumnDialogOpen}
        column={selectedColumn}
        onClose={() => setIsColumnDialogOpen(false)}
        onSave={handleSaveColumn}
      />
    </>
  );
};
