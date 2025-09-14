import { createTheme } from '@mui/material/styles';

export const dittoTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF69B4', // Hot Pink - cor principal do Ditto
      light: '#FFB6C1', // Light Pink
      dark: '#FF1493', // Deep Pink
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#DDA0DD', // Plum - cor secundária
      light: '#F0E6FF',
      dark: '#BA55D3',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFF0F5', // Lavender Blush - fundo suave
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#6B6B6B',
    },
  },
  typography: {
    fontFamily: '"Geist", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#FF1493',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#FF69B4',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#FF69B4',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#DDA0DD',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(255, 105, 180, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(255, 105, 180, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)',
        },
      },
    },
  },
});
