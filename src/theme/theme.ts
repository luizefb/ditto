import { createTheme } from '@mui/material/styles';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';

export const dittoTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB', // Azul profissional
      light: '#60A5FA', // Azul claro
      dark: '#1D4ED8', // Azul escuro
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#64748B', // Cinza azulado
      light: '#94A3B8',
      dark: '#475569',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC', // Fundo cinza muito claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Courier New", monospace',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#1D4ED8',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#2563EB',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#2563EB',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#475569',
    },
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.25px',
    },
  },
  shape: {
    borderRadius: 8, // Bordas mais suaves
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease',
          border: '1px solid #E2E8F0',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#D1D5DB',
            },
            '&:hover fieldset': {
              borderColor: '#94A3B8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563EB',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 500,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },
});
