'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Board } from '../types/kanban';
import { createUser, getUserByEmail, getBoardsByOwner } from '../lib/api';

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
  const [user, setUser] = useState<User | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoardState] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeMockUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock user data
      const mockUserData = {
        name: 'Usuário Ditto',
        email: 'usuario@ditto.com',
      };

      // Try to get existing user or create new one
      let existingUser = await getUserByEmail(mockUserData.email);

      if (!existingUser) {
        existingUser = await createUser(mockUserData);
        if (!existingUser) {
          throw new Error('Falha ao criar usuário mock');
        }
      }

      setUser(existingUser);
      
      const userBoards = await getBoardsByOwner(existingUser.id);
      setBoards(userBoards);

    } catch (err) {
      console.error('Erro ao inicializar usuário mock:', err);
      setError('Erro ao carregar dados do usuário');
    } finally {
      setLoading(false);
    }
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
    initializeMockUser();
  }, []);

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
