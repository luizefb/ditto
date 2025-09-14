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
        <Box
          sx={{
            width: size,
            height: size,
            borderRadius: 0, // Forma pixelada
            backgroundColor: 'rgba(255, 107, 157, 0.2)',
            border: '2px solid rgba(255, 107, 157, 0.4)',
            transform: 'rotate(45deg)', // Losango pixel art
          }}
        />
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
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: 0,
          backgroundColor: 'rgba(255, 107, 157, 0.3)',
          border: '2px solid rgba(255, 107, 157, 0.5)',
          transform: 'rotate(45deg)',
        }}
      />
    </Box>
  );
};

export const DittoWelcome: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 4,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F3E5F5 100%)',
        borderRadius: 4,
        border: '3px solid #FF6B9D',
        boxShadow: '4px 4px 0px rgba(255, 107, 157, 0.3)',
        mb: 3,
      }}
    >
      <Typography variant="h4" sx={{ 
        color: '#E91E63',
        fontWeight: 700,
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
      }}>
        BEM-VINDO AO DITTO KANBAN
      </Typography>
      <Typography variant="body1" sx={{ 
        color: '#9C27B0',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        ORGANIZE SUAS TAREFAS COM ESTILO PIXEL ART
      </Typography>
    </Box>
  );
};
