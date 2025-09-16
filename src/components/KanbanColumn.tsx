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
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { TaskCard } from './TaskCard';
import { Column, Task } from '../types/kanban';

interface KanbanColumnProps {
  column: Column;
  onAddTask?: (columnId: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onDropTask?: (taskId: string, columnId: string) => void;
  onEditColumn?: (column: Column) => void;
  onDeleteColumn?: (columnId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDropTask,
  onEditColumn,
  onDeleteColumn,
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
        width: { xs: 280, sm: 320, md: 340 },
        minWidth: { xs: 280, sm: 320, md: 340 },
        height: '100%',
        maxHeight: '100%',
        p: { xs: 1.5, sm: 2 },
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: isDragOver 
          ? 'linear-gradient(135deg, #F8F6F7 0%, #E8C2CA 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
        border: isDragOver ? '2px dashed #C48B9F' : '2px solid transparent',
        transition: 'all 0.3s ease',
        borderRadius: 1,
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header da coluna */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={{ xs: 1.5, sm: 2 }}>
        <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 1 }} flex={1} minWidth={0}>
          <Box
            sx={{
              width: { xs: 10, sm: 12 },
              height: { xs: 10, sm: 12 },
              borderRadius: '50%',
              backgroundColor: column.color,
              flexShrink: 0,
            }}
          />
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              color: '#A67C89',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              mr: 0.5,
            }}
          >
            {column.title}
          </Typography>
          <Badge
            badgeContent={column.tasks?.length || 0}
            color="secondary"
            sx={{
              flexShrink: 0,
              '& .MuiBadge-badge': {
                backgroundColor: '#C48B9F',
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                minWidth: { xs: 16, sm: 20 },
                height: { xs: 16, sm: 20 },
              },
            }}
          />
        </Box>
        
        <Box flexShrink={0}>
          <IconButton 
            size="small" 
            onClick={() => onEditColumn?.(column)}
            sx={{ 
              color: '#B8A9C9', 
              p: { xs: 0.25, sm: 0.5 },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: 16, sm: 20 },
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDeleteColumn?.(column.id)}
            sx={{ 
              color: '#B8A9C9', 
              p: { xs: 0.25, sm: 0.5 },
              '& .MuiSvgIcon-root': {
                fontSize: { xs: 16, sm: 20 },
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ mb: { xs: 1.5, sm: 2 }, backgroundColor: '#E8C2CA' }} />

      {/* Lista de tarefas */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          '&::-webkit-scrollbar': {
            width: { xs: '4px', sm: '6px' },
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#FFF0F5',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#C48B9F',
            borderRadius: '3px',
          },
        }}
      >
        {(column.tasks || []).map((task) => (
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
        
        {(column.tasks?.length || 0) === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              flex: 1,
              minHeight: { xs: 120, sm: 150, md: 200 },
              color: '#B8A9C9',
              textAlign: 'center',
              px: 1,
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 1,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
              }}
            >
              Nenhuma tarefa ainda
            </Typography>
            <Typography 
              variant="caption"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              Adicione uma nova tarefa
            </Typography>
          </Box>
        )}
      </Box>

      {/* Botão para adicionar tarefa */}
      <Box display="flex" justifyContent="center" mt={{ xs: 1.5, sm: 2 }}>
        <Fab
          size="small"
          onClick={() => onAddTask?.(column.id)}
          sx={{
            backgroundColor: '#FFD700',
            color: '#000000',
            border: '2px solid #FFC107',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.3)',
            width: { xs: 40, sm: 56 },
            height: { xs: 40, sm: 56 },
            '&:hover': {
              backgroundColor: '#FFC107',
              transform: 'translate(-1px, -1px)',
              boxShadow: '3px 3px 0px rgba(0,0,0,0.4)',
            },
            '&:active': {
              transform: 'translate(1px, 1px)',
              boxShadow: '1px 1px 0px rgba(0,0,0,0.3)',
            },
            '& .MuiSvgIcon-root': {
              fontSize: { xs: 20, sm: 24 },
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Paper>
  );
};
