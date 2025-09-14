'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import { Task, Priority } from '../types/kanban';

interface TaskDialogProps {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  task,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  const getPriorityLabel = (priority: Priority) => {
    const labels = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
    };
    return labels[priority];
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F5 100%)',
          border: '2px solid #FF69B4',
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center',
        color: '#FF1493',
        fontWeight: 600,
        pb: 1,
      }}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Avatar sx={{ 
            backgroundColor: '#FF69B4',
            width: 32,
            height: 32,
          }}>
            ✨
          </Avatar>
          <Typography variant="h6" component="span">
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Título da Tarefa"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 2,
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

        <TextField
          margin="dense"
          label="Descrição (opcional)"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            mb: 2,
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

        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{
            '&.Mui-focused': {
              color: '#FF69B4',
            },
          }}>
            Prioridade
          </InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            label="Prioridade"
            sx={{
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF69B4',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF69B4',
              },
            }}
          >
            <MenuItem value="low">
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#90EE90',
                  }}
                />
                {getPriorityLabel('low')}
              </Box>
            </MenuItem>
            <MenuItem value="medium">
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#FFD700',
                  }}
                />
                {getPriorityLabel('medium')}
              </Box>
            </MenuItem>
            <MenuItem value="high">
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#FF6B6B',
                  }}
                />
                {getPriorityLabel('high')}
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button 
          onClick={handleClose}
          sx={{ 
            color: '#DDA0DD',
            '&:hover': {
              backgroundColor: '#F0E6FF',
            },
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSave}
          variant="contained"
          disabled={!title.trim()}
          sx={{
            background: 'linear-gradient(45deg, #FF69B4 30%, #FF1493 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF1493 30%, #DC143C 90%)',
            },
            '&:disabled': {
              background: '#DDA0DD',
              color: '#FFFFFF',
            },
          }}
        >
          {task ? 'Salvar' : 'Criar Tarefa'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
