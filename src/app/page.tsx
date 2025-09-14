'use client';

import React, { useState } from 'react';
import { KanbanBoard } from '../components/KanbanBoard';
import { Board } from '../types/kanban';

// Dados de exemplo para demonstrar o Kanban
const initialBoard: Board = {
  id: '1',
  title: 'Ditto Kanban - Organizador de Tarefas ✨',
  createdAt: new Date(),
  updatedAt: new Date(),
  columns: [
    {
      id: 'todo',
      title: 'Para Fazer',
      color: '#FF69B4',
      tasks: [
        {
          id: '1',
          title: 'Estudar React Hooks',
          description: 'Revisar useState, useEffect e custom hooks',
          priority: 'high',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Implementar tema escuro',
          description: 'Adicionar toggle para alternar entre tema claro e escuro',
          priority: 'medium',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      id: 'doing',
      title: 'Fazendo',
      color: '#FFD700',
      tasks: [
        {
          id: '3',
          title: 'Criar componentes MUI',
          description: 'Desenvolver interface com Material-UI e temática do Ditto',
          priority: 'high',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      id: 'review',
      title: 'Em Revisão',
      color: '#90EE90',
      tasks: [
        {
          id: '4',
          title: 'Testar funcionalidade drag and drop',
          description: 'Verificar se as tarefas estão sendo movidas corretamente entre colunas',
          priority: 'medium',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      id: 'done',
      title: 'Concluído',
      color: '#DDA0DD',
      tasks: [
        {
          id: '5',
          title: 'Setup inicial do projeto',
          description: 'Configurar Next.js, TypeScript e Material-UI',
          priority: 'low',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '6',
          title: 'Definir paleta de cores',
          description: 'Escolher cores baseadas na temática do Pokémon Ditto',
          priority: 'low',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ],
};

export default function Home() {
  const [board, setBoard] = useState<Board>(initialBoard);

  const handleUpdateBoard = (updatedBoard: Board) => {
    setBoard(updatedBoard);
    // Aqui você poderia salvar no localStorage ou enviar para uma API
    console.log('Board atualizado:', updatedBoard);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFF0F5' }}>
      <KanbanBoard
        board={board}
        onUpdateBoard={handleUpdateBoard}
      />
    </div>
  );
}
