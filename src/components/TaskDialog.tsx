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
} from '@mui/material';
import { Task, Priority, PRIORITY_LABELS, PRIORITY_COLORS } from '../types/kanban';

interface TaskDialogProps {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
  onSave: (task: { title: string; description?: string; priority?: Priority }) => void;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  task,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(2);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority((task.priority as Priority) || 2);
    } else {
      setTitle('');
      setDescription('');
      setPriority(2);
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
    setPriority(2);
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setTitle('');
    setDescription('');
    setPriority(2);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        pb: 1,
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
                borderColor: '#C48B9F',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#C48B9F',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#C48B9F',
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
                borderColor: '#C48B9F',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#C48B9F',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#C48B9F',
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
            <MenuItem value={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: PRIORITY_COLORS[1],
                  }}
                />
                {PRIORITY_LABELS[1]}
              </Box>
            </MenuItem>
            <MenuItem value={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: PRIORITY_COLORS[2],
                  }}
                />
                {PRIORITY_LABELS[2]}
              </Box>
            </MenuItem>
            <MenuItem value={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: PRIORITY_COLORS[3],
                  }}
                />
                {PRIORITY_LABELS[3]}
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button 
          onClick={handleClose}
          sx={{ 
            color: '#B8A9C9',
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
            background: 'linear-gradient(45deg, #C48B9F 30%, #A67C89 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #A67C89 30%, #8B6B73 90%)',
            },
            '&:disabled': {
              background: '#B8A9C9',
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
