'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { authService, AuthUser } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  // Auth actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await authService.getSession();
        setUser(session?.user || null);
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Erro ao inicializar autenticação');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('AuthContext: Attempting sign in...');
      const result = await authService.signIn(email, password);
      console.log('AuthContext: Sign in successful', result.user?.email);
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('AuthContext: Attempting sign up...');
      const result = await authService.signUp(email, password, name);
      console.log('AuthContext: Sign up successful', result.user?.email);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.signOut();
    } catch (err: any) {
      console.error('Sign out error:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Helper function to get user-friendly error messages
  const getErrorMessage = (error: any): string => {
    if (error.message) {
      switch (error.message) {
        case 'Invalid login credentials':
          return 'Email ou senha incorretos';
        case 'User already registered':
          return 'Este email já está cadastrado';
        case 'Signup requires a valid password':
          return 'A senha deve ter pelo menos 6 caracteres';
        case 'Unable to validate email address: invalid format':
          return 'Email inválido';
        default:
          return error.message;
      }
    }
    return 'Ocorreu um erro inesperado';
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
