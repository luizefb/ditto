'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Board } from '../types/kanban';
import { createUser, getUserByEmail, getBoardsByOwner } from '../lib/api';
import { useAuth } from './AuthContext';

interface AppContextType {
  user: User | null;
  boards: Board[];
  currentBoard: Board | null;
  loading: boolean;
  error: string | null;
  initializeMockUser: () => Promise<void>;
  setCurrentBoard: (board: Board | null) => void;
  refreshBoards: () => Promise<void>;
  addBoard: (board: Board) => void;
  updateBoard: (board: Board) => void;
  removeBoard: (boardId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoardState] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeUserFromAuth = async () => {
    if (!authUser) {
      setUser(null);
      setBoards([]);
      setCurrentBoardState(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let existingUser = await getUserByEmail(authUser.email!);

      if (!existingUser) {
        const userData = {
          name: authUser.user_metadata?.name || authUser.email!.split('@')[0],
          email: authUser.email!,
        };
        existingUser = await createUser(userData);
        if (!existingUser) {
          throw new Error('Falha ao criar usuário');
        }
      }

      setUser(existingUser);
      
      const userBoards = await getBoardsByOwner(existingUser.id);
      setBoards(userBoards);

    } catch (err) {
      setError('Erro ao carregar dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const initializeMockUser = async () => {
    await initializeUserFromAuth();
  };

  const refreshBoards = async () => {
    if (!user) return;

    try {
      const userBoards = await getBoardsByOwner(user.id);
      setBoards(userBoards);
    } catch (err) {
      setError('Erro ao carregar boards');
    }
  };

  const setCurrentBoard = (board: Board | null) => {
    setCurrentBoardState(board);
  };

  const addBoard = (board: Board) => {
    setBoards(prev => [board, ...prev]);
  };

  const updateBoard = (updatedBoard: Board) => {
    setBoards(prev => prev.map(board => 
      board.id === updatedBoard.id ? updatedBoard : board
    ));
    
    if (currentBoard?.id === updatedBoard.id) {
      setCurrentBoardState(updatedBoard);
    }
  };

  const removeBoard = (boardId: string) => {
    setBoards(prev => prev.filter(board => board.id !== boardId));
    
    if (currentBoard?.id === boardId) {
      setCurrentBoardState(null);
    }
  };

  useEffect(() => {
    initializeUserFromAuth();
  }, [authUser]);

  const value: AppContextType = {
    user,
    boards,
    currentBoard,
    loading,
    error,
    initializeMockUser,
    setCurrentBoard,
    refreshBoards,
    addBoard,
    updateBoard,
    removeBoard,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
