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
import { Task, PRIORITY_COLORS, PRIORITY_LABELS, Priority } from '../types/kanban';

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPriorityLabel = (priority?: number | null) => {
    if (!priority) return 'Sem prioridade';
    return PRIORITY_LABELS[priority as Priority] || 'Sem prioridade';
  };

  const getPriorityColor = (priority?: number | null) => {
    if (!priority) return '#DDD';
    return PRIORITY_COLORS[priority as Priority] || '#DDD';
  };

  return (
    <Card
      sx={{
        mb: { xs: 1.5, sm: 2 },
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(5deg)' : 'none',
        transition: 'all 0.2s ease',
        '&:active': {
          cursor: 'grabbing',
        },
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F3E5F5 100%)',
        border: '2px solid #FF6B9D',
        '&:hover': {
          border: '2px solid #E91E63',
          boxShadow: { xs: '3px 3px 0px rgba(255, 107, 157, 0.4)', sm: '6px 6px 0px rgba(255, 107, 157, 0.4)' },
          transform: isDragging ? 'rotate(5deg)' : { xs: 'translate(-1px, -1px)', sm: 'translate(-2px, -2px)' },
        },
      }}
    >
      <CardContent sx={{ pb: { xs: 0.5, sm: 1 }, p: { xs: 1.5, sm: 2 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={{ xs: 0.5, sm: 1 }}>
          <Typography variant="h6" component="h3" sx={{ 
            fontWeight: 700, 
            color: '#E91E63',
            flexGrow: 1,
            mr: 1,
            textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            lineHeight: { xs: 1.2, sm: 1.3 },
          }}>
            {task.title}
          </Typography>
          <Box sx={{ flexShrink: 0 }}>
            <IconButton 
              size="small" 
              onClick={() => onEdit?.(task)}
              sx={{ 
                color: '#FF6B9D', 
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
              onClick={() => onDelete?.(task.id)}
              sx={{ 
                color: '#FF6B9D', 
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

        {task.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 1.5, sm: 2 }, 
              lineHeight: 1.4,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            {task.description}
          </Typography>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Chip
            label={getPriorityLabel(task.priority)}
            size="small"
            sx={{
              backgroundColor: getPriorityColor(task.priority),
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              height: { xs: 24, sm: 32 },
              '& .MuiChip-label': {
                px: { xs: 1, sm: 1.5 },
              },
            }}
          />
          
          <Box display="flex" alignItems="center" gap={0.5} flexShrink={0}>
            <TimeIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#9C27B0' }} />
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              {formatDate(task.created_at)}
            </Typography>
          </Box>
        </Box>

        {/* Indicador decorativo pixel art */}
        <Box display="flex" justifyContent="center" mt={{ xs: 0.5, sm: 1 }}>
          <Box
            sx={{
              width: { xs: 12, sm: 16 },
              height: { xs: 12, sm: 16 },
              borderRadius: 0,
              backgroundColor: '#FF6B9D',
              border: '2px solid #E91E63',
              transform: 'rotate(45deg)',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
