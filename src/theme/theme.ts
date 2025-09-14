import { createTheme } from '@mui/material/styles';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';

export const dittoTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6B9D', // Rosa vibrante pixel art
      light: '#FF9EC5', // Rosa claro vibrante
      dark: '#E91E63', // Rosa escuro vibrante
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9C27B0', // Roxo vibrante
      light: '#CE93D8',
      dark: '#7B1FA2',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F3E5F5', // Fundo lilás claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Courier New", monospace',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#E91E63',
      textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#FF6B9D',
      textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#FF6B9D',
      textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#9C27B0',
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
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 4, // Bordas mais pixeladas
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '4px 4px 0px rgba(255, 107, 157, 0.3)', // Sombra pixel art
          transition: 'all 0.2s ease',
          border: '2px solid #FF6B9D',
          '&:hover': {
            boxShadow: '6px 6px 0px rgba(255, 107, 157, 0.4)',
            transform: 'translate(-2px, -2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Bordas pixeladas
          textTransform: 'uppercase',
          fontWeight: 700,
          padding: '12px 24px',
          border: '2px solid transparent',
          boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
          '&:hover': {
            transform: 'translate(-1px, -1px)',
            boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
          },
          '&:active': {
            transform: 'translate(1px, 1px)',
            boxShadow: '1px 1px 0px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #F3E5F5 100%)',
          border: '1px solid #FF9EC5',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            '& fieldset': {
              borderWidth: '2px',
              borderColor: '#FF9EC5',
            },
            '&:hover fieldset': {
              borderColor: '#FF6B9D',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E91E63',
              borderWidth: '2px',
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
          borderRadius: 4,
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 157, 0.1)',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
          '&:hover': {
            transform: 'translate(-1px, -1px)',
            boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
          },
        },
      },
    },
  },
});
