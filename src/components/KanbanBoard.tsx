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
} from '@mui/icons-material';
import { KanbanColumn } from './KanbanColumn';
import { TaskDialog } from './TaskDialog';
import { Board, Task, Column } from '../types/kanban';

interface KanbanBoardProps {
  board: Board;
  onUpdateBoard?: (board: Board) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  board,
  onUpdateBoard,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

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

  const handleDeleteTask = (taskId: string) => {
    const updatedColumns = board.columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId),
    }));

    const updatedBoard = {
      ...board,
      columns: updatedColumns,
      updatedAt: new Date(),
    };

    onUpdateBoard?.(updatedBoard);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedTask) {
      // Editando tarefa existente
      const updatedTask: Task = {
        ...selectedTask,
        ...taskData,
        updatedAt: new Date(),
      };

      const updatedColumns = board.columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task => 
          task.id === selectedTask.id ? updatedTask : task
        ),
      }));

      const updatedBoard = {
        ...board,
        columns: updatedColumns,
        updatedAt: new Date(),
      };

      onUpdateBoard?.(updatedBoard);
    } else if (selectedColumnId) {
      // Criando nova tarefa
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedColumns = board.columns.map(column => 
        column.id === selectedColumnId 
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      );

      const updatedBoard = {
        ...board,
        columns: updatedColumns,
        updatedAt: new Date(),
      };

      onUpdateBoard?.(updatedBoard);
    }

    setIsTaskDialogOpen(false);
    setSelectedTask(null);
    setSelectedColumnId(null);
  };

  const handleDropTask = (taskId: string, targetColumnId: string) => {
    // Encontrar a tarefa e removê-la da coluna atual
    let taskToMove: Task | null = null;
    const updatedColumns = board.columns.map(column => {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        taskToMove = column.tasks[taskIndex];
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId),
        };
      }
      return column;
    });

    // Adicionar a tarefa na coluna de destino
    if (taskToMove) {
      const finalColumns = updatedColumns.map(column => 
        column.id === targetColumnId
          ? { ...column, tasks: [...column.tasks, taskToMove!] }
          : column
      );

      const updatedBoard = {
        ...board,
        columns: finalColumns,
        updatedAt: new Date(),
      };

      onUpdateBoard?.(updatedBoard);
    }
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(45deg, #FF69B4 30%, #FF1493 90%)',
        mb: 3,
      }}>
        <Toolbar>
          <Avatar sx={{ 
            mr: 2, 
            backgroundColor: '#FFFFFF',
            color: '#FF69B4',
            fontWeight: 'bold',
          }}>
            ✨
          </Avatar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {board.title}
          </Typography>
          
          <Button
            color="inherit"
            startIcon={<AddIcon />}
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
              backgroundColor: '#FF69B4',
              borderRadius: '4px',
            },
          }}
        >
          {board.columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onDropTask={handleDropTask}
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
    </>
  );
};
