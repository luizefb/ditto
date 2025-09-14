'use client';

import React from 'react';
import { Box, Typography, Fade } from '@mui/material';

interface FloatingDittoProps {
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size?: number;
  delay?: number;
}

export const FloatingDitto: React.FC<FloatingDittoProps> = ({
  position = { top: '20%', right: '5%' },
  size = 60,
  delay = 0,
}) => {
  return (
    <Fade in timeout={1000 + delay}>
      <Box
        sx={{
          position: 'fixed',
          ...position,
          zIndex: 0,
          opacity: 0.1,
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-20px)',
            },
          },
        }}
      >
        <Typography sx={{ fontSize: `${size}px`, filter: 'blur(1px)' }}>
          ✨
        </Typography>
      </Box>
    </Fade>
  );
};

export const DittoBackground: React.FC = () => {
  return (
    <>
      <FloatingDitto position={{ top: '10%', right: '10%' }} size={40} delay={0} />
      <FloatingDitto position={{ top: '30%', left: '5%' }} size={50} delay={500} />
      <FloatingDitto position={{ bottom: '20%', right: '15%' }} size={35} delay={1000} />
      <FloatingDitto position={{ bottom: '40%', left: '8%' }} size={45} delay={1500} />
      <FloatingDitto position={{ top: '60%', right: '3%' }} size={30} delay={2000} />
      <FloatingDitto position={{ top: '80%', left: '12%' }} size={55} delay={2500} />
    </>
  );
};

interface DittoLoaderProps {
  size?: number;
}

export const DittoLoader: React.FC<DittoLoaderProps> = ({ size = 40 }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        animation: 'bounce 1s ease-in-out infinite',
        '@keyframes bounce': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
        },
      }}
    >
      <Typography sx={{ fontSize: `${size}px` }}>✨</Typography>
    </Box>
  );
};

export const DittoWelcome: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 4,
        background: 'linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 100%)',
        borderRadius: 3,
        border: '2px solid #FF69B4',
        mb: 3,
      }}
    >
      <Typography variant="h4" sx={{ 
        color: '#FF1493',
        fontWeight: 700,
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}>
✨ Bem-vindo ao Ditto Kanban! ✨
      </Typography>
      <Typography variant="body1" sx={{ color: '#DDA0DD' }}>
        Organize suas tarefas com a magia e flexibilidade do Pokémon Ditto!
      </Typography>
    </Box>
  );
};
