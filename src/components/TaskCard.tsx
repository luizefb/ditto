'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { Task, PRIORITY_COLORS } from '../types/kanban';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  isDragging = false,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
    };
    return labels[priority as keyof typeof labels] || priority;
  };

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(5deg)' : 'none',
        '&:active': {
          cursor: 'grabbing',
        },
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFE4E1 100%)',
        border: '2px solid transparent',
        '&:hover': {
          border: '2px solid #FF69B4',
        },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" component="h3" sx={{ 
            fontWeight: 600, 
            color: '#FF1493',
            flexGrow: 1,
            mr: 1,
          }}>
            {task.title}
          </Typography>
          <Box>
            <IconButton 
              size="small" 
              onClick={() => onEdit?.(task)}
              sx={{ color: '#FF69B4', p: 0.5 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => onDelete?.(task.id)}
              sx={{ color: '#FF69B4', p: 0.5 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {task.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, lineHeight: 1.4 }}
          >
            {task.description}
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip
            label={getPriorityLabel(task.priority)}
            size="small"
            sx={{
              backgroundColor: PRIORITY_COLORS[task.priority],
              color: '#FFFFFF',
              fontWeight: 600,
              '& .MuiChip-label': {
                px: 1.5,
              },
            }}
          />
          
          <Box display="flex" alignItems="center" gap={0.5}>
            <TimeIcon sx={{ fontSize: 14, color: '#DDA0DD' }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(task.updatedAt)}
            </Typography>
          </Box>
        </Box>

        {/* Ditto Avatar decorativo */}
        <Box display="flex" justifyContent="center" mt={1}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              backgroundColor: '#FF69B4',
              fontSize: '12px',
            }}
          >
            ✨
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};
