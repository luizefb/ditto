// Tipos baseados no schema do banco de dados

export interface User {
  id: string;
  created_at: string;
  name: string;
  email: string;
}

export interface Board {
  id: string;
  created_at: string;
  title: string;
  owner_id: string;
  columns?: Column[];
}

export interface Column {
  id: string;
  created_at: string;
  title: string;
  board_id: string;
  order: number;
  tasks?: Task[];
  // Propriedades para UI (não estão no banco)
  color?: string;
}

export interface Task {
  id: string;
  created_at: string;
  title: string;
  description?: string | null;
  column_id: string;
  order?: number | null;
  priority?: number | null; // 1 = low, 2 = medium, 3 = high
}

// Tipos auxiliares para a interface
export type Priority = 1 | 2 | 3; // 1 = low, 2 = medium, 3 = high

export const PRIORITY_LABELS = {
  1: 'Baixa',
  2: 'Média', 
  3: 'Alta',
} as const;

export const PRIORITY_COLORS = {
  1: '#00E676',    // Verde neon - low
  2: '#FFD700',    // Dourado vibrante - medium
  3: '#FF1744',    // Vermelho vibrante - high
} as const;

// Cores padrão para colunas (para UI) - Pixel Art vibrantes
export const DEFAULT_COLUMN_COLORS = [
  '#FF6B9D', // Rosa vibrante
  '#FFD700', // Dourado vibrante
  '#00E676', // Verde neon
  '#9C27B0', // Roxo vibrante
  '#2196F3', // Azul vibrante
  '#FF9800', // Laranja vibrante
] as const;

// Tipos para criação/atualização (sem campos gerados automaticamente)
export interface CreateBoard {
  title: string;
  owner_id: string;
}

export interface CreateColumn {
  title: string;
  board_id: string;
  order: number;
}

export interface CreateTask {
  title: string;
  description?: string;
  column_id: string;
  order?: number;
  priority?: Priority;
}

export interface UpdateBoard {
  title?: string;
}

export interface UpdateColumn {
  title?: string;
  order?: number;
}

export interface UpdateTask {
  title?: string;
  description?: string;
  column_id?: string;
  order?: number;
  priority?: Priority;
}
