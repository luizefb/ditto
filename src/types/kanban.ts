
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
  color?: string;
}

export interface Task {
  id: string;
  created_at: string;
  title: string;
  description?: string | null;
  column_id: string;
  order?: number | null;
  priority?: number | null;
}

export type Priority = 1 | 2 | 3;

export const PRIORITY_LABELS = {
  1: 'Baixa',
  2: 'Média', 
  3: 'Alta',
} as const;

export const PRIORITY_COLORS = {
  1: '#059669',    // Verde profissional - low
  2: '#EA580C',    // Laranja profissional - medium
  3: '#DC2626',    // Vermelho profissional - high
} as const;

export const DEFAULT_COLUMN_COLORS = [
  '#2563EB', // Azul profissional
  '#64748B', // Cinza azulado
  '#059669', // Verde profissional
  '#7C3AED', // Roxo profissional
  '#DC2626', // Vermelho profissional
  '#EA580C', // Laranja profissional
] as const;

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
