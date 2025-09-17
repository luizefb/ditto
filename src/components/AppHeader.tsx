'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

export const AppHeader: React.FC = () => {
  const { user: authUser, signOut } = useAuth();
  const { user, currentBoard, setCurrentBoard } = useApp();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await signOut();
  };

  const handleBackToBoards = () => {
    setCurrentBoard(null);
  };

  if (!authUser || !user) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F3E5F5 100%)',
        borderBottom: '3px solid #FF6B9D',
        boxShadow: '0 2px 8px rgba(255, 107, 157, 0.2)',
      }}
    >
      {/* Logo and Navigation */}
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: '#FF6B9D',
            border: '2px solid #E91E63',
            borderRadius: 0,
            transform: 'rotate(45deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleBackToBoards}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: '#FFFFFF',
              borderRadius: 0,
              transform: 'rotate(-45deg)',
            }}
          />
        </Box>
        
        <Typography
          variant="h6"
          sx={{
            color: '#E91E63',
            fontWeight: 700,
            textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
          onClick={handleBackToBoards}
        >
          DITTO KANBAN
        </Typography>

        {currentBoard && (
          <>
            <Typography variant="h6" sx={{ color: '#9C27B0', mx: 1 }}>
              /
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#9C27B0',
                fontWeight: 600,
              }}
            >
              {currentBoard.title}
            </Typography>
          </>
        )}
      </Box>

      {/* User Menu */}
      <Box>
        <Button
          onClick={handleMenuOpen}
          endIcon={<ExpandMoreIcon />}
          sx={{
            color: '#E91E63',
            border: '2px solid #FF9EC5',
            borderRadius: 2,
            px: 2,
            py: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 157, 0.1)',
              border: '2px solid #FF6B9D',
            },
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#FF6B9D',
              color: '#FFFFFF',
              mr: 1,
              fontSize: '0.875rem',
            }}
          >
            {user.name?.charAt(0).toUpperCase() || authUser.email?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {user.name || authUser.email?.split('@')[0]}
          </Typography>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              border: '2px solid #FF9EC5',
              borderRadius: 2,
              minWidth: 200,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F7 100%)',
            },
          }}
        >
          <MenuItem disabled sx={{ opacity: 0.7 }}>
            <PersonIcon sx={{ mr: 2, color: '#FF6B9D' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#E91E63' }}>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {authUser.email}
              </Typography>
            </Box>
          </MenuItem>
          
          <Divider sx={{ my: 1, borderColor: '#FF9EC5' }} />
          
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 2, color: '#FF6B9D' }} />
            <Typography variant="body2" sx={{ color: '#E91E63' }}>
              Sair
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
