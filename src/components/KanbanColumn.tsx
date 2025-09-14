'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Badge,
  Fab,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { TaskCard } from './TaskCard';
import { Column, Task } from '../types/kanban';

interface KanbanColumnProps {
  column: Column;
  onAddTask?: (columnId: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onDropTask?: (taskId: string, columnId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDropTask,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && onDropTask) {
      onDropTask(taskId, column.id);
    }
  };

  const handleTaskDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 320,
        minHeight: 600,
        p: 2,
        mx: 1,
        background: isDragOver 
          ? 'linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F5 100%)',
        border: isDragOver ? '2px dashed #FF69B4' : '2px solid transparent',
        transition: 'all 0.3s ease',
        borderRadius: 3,
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header da coluna */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: column.color,
            }}
          />
          <Typography variant="h6" component="h2" sx={{ 
            fontWeight: 600,
            color: '#FF1493',
          }}>
            {column.title}
          </Typography>
          <Badge
            badgeContent={column.tasks.length}
            color="secondary"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#FF69B4',
                color: 'white',
                fontWeight: 600,
              },
            }}
          />
        </Box>
        
        <IconButton size="small" sx={{ color: '#DDA0DD' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2, backgroundColor: '#FFB6C1' }} />

      {/* Lista de tarefas */}
      <Box
        sx={{
          minHeight: 400,
          maxHeight: 480,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#FFF0F5',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#FF69B4',
            borderRadius: '3px',
          },
        }}
      >
        {column.tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleTaskDragStart(e, task.id)}
          >
            <TaskCard
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </div>
        ))}
        
        {column.tasks.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              height: 200,
              color: '#DDA0DD',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              Nenhuma tarefa ainda
            </Typography>
            <Typography variant="caption">
              ✨ Adicione uma nova tarefa! ✨
            </Typography>
          </Box>
        )}
      </Box>

      {/* Botão para adicionar tarefa */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Fab
          size="small"
          color="primary"
          onClick={() => onAddTask?.(column.id)}
          sx={{
            background: 'linear-gradient(45deg, #FF69B4 30%, #FF1493 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF1493 30%, #DC143C 90%)',
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Paper>
  );
};
