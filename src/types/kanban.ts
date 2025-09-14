export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
  maxTasks?: number;
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export type Priority = 'low' | 'medium' | 'high';

export const PRIORITY_COLORS = {
  low: '#90EE90',    // Light Green
  medium: '#FFD700', // Gold
  high: '#FF6B6B',   // Light Red
} as const;
