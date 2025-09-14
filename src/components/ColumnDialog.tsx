'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import { Column } from '../types/kanban';

interface ColumnDialogProps {
  open: boolean;
  column?: Column | null;
  onClose: () => void;
  onSave: (columnData: { title: string }) => void;
}

export const ColumnDialog: React.FC<ColumnDialogProps> = ({
  open,
  column,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (column) {
      setTitle(column.title);
    } else {
      setTitle('');
    }
  }, [column]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
    });

    // Reset form
    setTitle('');
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setTitle('');
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
            {column ? 'Editar Coluna' : 'Nova Coluna'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Nome da Coluna"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Para Fazer, Em Progresso, Concluído..."
          sx={{
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
          {column ? 'Salvar' : 'Criar Coluna'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
