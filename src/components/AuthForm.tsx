'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { DittoBackground, DittoLoader } from './DittoElements';

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const { signIn, signUp, loading, error, clearError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSignUp, setIsSignUp] = useState(pathname === '/signup');

  // Sync isSignUp state with current route
  React.useEffect(() => {
    setIsSignUp(pathname === '/signup');
  }, [pathname]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (error) clearError();
  };

  const validateForm = (): string | null => {
    if (!formData.email || !formData.password) {
      return 'Email e senha são obrigatórios';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Email inválido';
    }

    if (formData.password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }

    if (isSignUp) {
      if (!formData.name.trim()) {
        return 'Nome é obrigatório para cadastro';
      }
      if (formData.password !== formData.confirmPassword) {
        return 'As senhas não coincidem';
      }
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      // You might want to show this error in the UI
      return;
    }

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.name);
      } else {
        await signIn(formData.email, formData.password);
      }
      onSuccess?.();
    } catch (err) {
      // Error is handled by the context
    }
  };

  const switchMode = () => {
    const newPath = isSignUp ? '/login' : '/signup';
    router.push(newPath);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    });
    clearError();
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: '#F3E5F5', position: 'relative' }}
      >
        <DittoBackground />
        <Box textAlign="center" sx={{ zIndex: 1 }}>
          <DittoLoader size={60} />
          <Typography variant="h6" sx={{ 
            color: '#E91E63',
            fontWeight: 700,
            mt: 2,
            textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
          }}>
            {isSignUp ? 'CRIANDO CONTA...' : 'ENTRANDO...'}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ 
        backgroundColor: '#F3E5F5',
        position: 'relative',
        p: 2,
      }}
    >
      <DittoBackground />
      
      <Fade in timeout={800}>
        <Card
          sx={{
            maxWidth: 480,
            width: '100%',
            zIndex: 1,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F7 100%)',
            border: '3px solid #FF6B9D',
            borderRadius: 4,
            boxShadow: '6px 6px 0px rgba(255, 107, 157, 0.3)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box textAlign="center" mb={4}>
              <Box
                sx={{
                  mx: 'auto',
                  mb: 2,
                  width: 80,
                  height: 80,
                  backgroundColor: '#FF6B9D',
                  border: '3px solid #E91E63',
                  borderRadius: 0,
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 0,
                    transform: 'rotate(-45deg)',
                  }}
                />
              </Box>
              
              <Typography variant="h4" sx={{ 
                color: '#E91E63',
                fontWeight: 700,
                mb: 1,
                textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
              }}>
                DITTO KANBAN
              </Typography>
              
              <Typography variant="h6" sx={{ 
                color: '#9C27B0',
                fontWeight: 600,
              }}>
                {isSignUp ? 'CRIAR CONTA' : 'FAZER LOGIN'}
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Fade in>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    border: '2px solid #f44336',
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: '#E91E63',
                    },
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={3}>
                {isSignUp && (
                  <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderWidth: '2px',
                          borderColor: '#FF9EC5',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FF6B9D',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E91E63',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#E91E63',
                      },
                    }}
                  />
                )}

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderWidth: '2px',
                        borderColor: '#FF9EC5',
                      },
                      '&:hover fieldset': {
                        borderColor: '#FF6B9D',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E91E63',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#E91E63',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  disabled={loading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#FF6B9D' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderWidth: '2px',
                        borderColor: '#FF9EC5',
                      },
                      '&:hover fieldset': {
                        borderColor: '#FF6B9D',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#E91E63',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#E91E63',
                    },
                  }}
                />

                {isSignUp && (
                  <TextField
                    fullWidth
                    label="Confirmar Senha"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    disabled={loading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: '#FF6B9D' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderWidth: '2px',
                          borderColor: '#FF9EC5',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FF6B9D',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#E91E63',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#E91E63',
                      },
                    }}
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : isSignUp ? (
                      <SignUpIcon />
                    ) : (
                      <LoginIcon />
                    )
                  }
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #FF6B9D 30%, #E91E63 90%)',
                    border: '2px solid #E91E63',
                    boxShadow: '3px 3px 0px rgba(233, 30, 99, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #E91E63 30%, #C2185B 90%)',
                      transform: 'translate(-1px, -1px)',
                      boxShadow: '4px 4px 0px rgba(233, 30, 99, 0.4)',
                    },
                    '&:active': {
                      transform: 'translate(1px, 1px)',
                      boxShadow: '2px 2px 0px rgba(233, 30, 99, 0.3)',
                    },
                    '&:disabled': {
                      background: '#CCCCCC',
                      border: '2px solid #999999',
                    },
                  }}
                >
                  {loading
                    ? (isSignUp ? 'CRIANDO...' : 'ENTRANDO...')
                    : (isSignUp ? 'CRIAR CONTA' : 'ENTRAR')
                  }
                </Button>
              </Box>
            </form>

            {/* Switch Mode */}
            <Box mt={4}>
              <Divider sx={{ 
                my: 2, 
                '&::before, &::after': {
                  borderColor: '#FF9EC5',
                  borderWidth: '1px',
                },
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                  OU
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                onClick={switchMode}
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  border: '2px solid #FF6B9D',
                  color: '#FF6B9D',
                  '&:hover': {
                    border: '2px solid #E91E63',
                    backgroundColor: 'rgba(255, 107, 157, 0.1)',
                    color: '#E91E63',
                  },
                }}
              >
                {isSignUp ? 'JÁ TENHO CONTA - FAZER LOGIN' : 'CRIAR NOVA CONTA'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};
