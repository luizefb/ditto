'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

interface WelcomePageProps {
  onEnterBoards: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onEnterBoards }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Stack spacing={4} alignItems="center">
            {/* Logo/Title */}
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #2563EB, #60A5FA)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Ditto Kanban
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                }}
              >
                Transforme suas ideias em ação
              </Typography>
            </Box>

            {/* Welcome Message */}
            <Box sx={{ maxWidth: 600 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                  color: theme.palette.text.primary,
                  mb: 3,
                }}
              >
                Bem-vindo ao Ditto Kanban! 🎉
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary,
                  mb: 2,
                }}
              >
                Organize suas tarefas de forma visual e eficiente com nosso sistema Kanban.
                Crie boards personalizados, gerencie suas 
                colunas e transforme seu fluxo de trabalho.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary,
                }}
              >
                Clique no botão abaixo para começar a organizar suas tarefas!
              </Typography>
            </Box>

            {/* Enter Button */}
            <Button
              variant="contained"
              size="large"
              onClick={onEnterBoards}
              startIcon={<PlayArrow />}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2563EB, #60A5FA)',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1D4ED8, #3B82F6)',
                  boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Entrar nos Boards
            </Button>

            {/* Features */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 3,
                mt: 4,
                width: '100%',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  📋 Organização Visual
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Organize tarefas em colunas intuitivas
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  🎨 Personalização
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Crie boards personalizados para seus projetos
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  ⚡ Produtividade
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Aumente sua eficiência no trabalho
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
