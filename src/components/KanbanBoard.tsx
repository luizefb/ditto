'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Button,
  Container,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { KanbanColumn } from './KanbanColumn';
import { TaskDialog } from './TaskDialog';
import { ColumnDialog } from './ColumnDialog';
import { Board, Task, Column, Priority, CreateColumn, CreateTask, UpdateColumn, UpdateTask, DEFAULT_COLUMN_COLORS } from '../types/kanban';
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
      {/* Header */}
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(45deg, #C48B9F 30%, #A67C89 90%)',
        mb: 3,
      }}>
        <Toolbar>
          {onBack && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onBack}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          
          <Box sx={{ 
            mr: 2, 
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #C48B9F',
          }}>
            <Box sx={{ 
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#C48B9F',
            }} />
          </Box>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {board.title}
          </Typography>
          
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={handleAddColumn}
            disabled={loading}
            sx={{ mr: 2, fontWeight: 600 }}
          >
            Nova Coluna
          </Button>
          
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Board Content */}
      <Container maxWidth={false} sx={{ px: 2 }}>
        <Box
          display="flex"
          gap={2}
          sx={{
            overflowX: 'auto',
            pb: 2,
            minHeight: 'calc(100vh - 140px)',
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#FFF0F5',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#C48B9F',
              borderRadius: '4px',
            },
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
      </Container>

      {/* Task Dialog */}
      <TaskDialog
        open={isTaskDialogOpen}
        task={selectedTask}
        onClose={() => setIsTaskDialogOpen(false)}
        onSave={handleSaveTask}
      />

      {/* Column Dialog */}
      <ColumnDialog
        open={isColumnDialogOpen}
        column={selectedColumn}
        onClose={() => setIsColumnDialogOpen(false)}
        onSave={handleSaveColumn}
      />
    </>
  );
};
