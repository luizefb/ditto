import { supabase } from './supabase';
import { Board, Column, Task, CreateBoard, CreateColumn, CreateTask, UpdateBoard, UpdateColumn, UpdateTask, DEFAULT_COLUMN_COLORS } from '../types/kanban';

// ============ BOARDS ============

export const createBoard = async (boardData: CreateBoard): Promise<Board | null> => {
  const { data, error } = await supabase
    .from('tb_boards')
    .insert(boardData)
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar board:', error);
    return null;
  }

  return data;
};

export const getBoardById = async (id: string): Promise<Board | null> => {
  const { data, error } = await supabase
    .from('tb_boards')
    .select(`
      *,
      columns:tb_columns_board(
        *,
        tasks:tb_tasks(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar board:', error);
    return null;
  }

  // Adicionar cores às colunas e ordenar
  if (data.columns) {
    data.columns = data.columns
      .sort((a: Column, b: Column) => a.order - b.order)
      .map((column: Column, index: number) => ({
        ...column,
        color: DEFAULT_COLUMN_COLORS[index % DEFAULT_COLUMN_COLORS.length],
        tasks: column.tasks?.sort((a: Task, b: Task) => (a.order || 0) - (b.order || 0)) || []
      }));
  }

  return data;
};

export const getBoardsByOwner = async (ownerId: string): Promise<Board[]> => {
  const { data, error } = await supabase
    .from('tb_boards')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar boards:', error);
    return [];
  }

  return data || [];
};

export const updateBoard = async (id: string, updates: UpdateBoard): Promise<Board | null> => {
  const { data, error } = await supabase
    .from('tb_boards')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar board:', error);
    return null;
  }

  return data;
};

export const deleteBoard = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('tb_boards')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar board:', error);
    return false;
  }

  return true;
};

// ============ COLUMNS ============

export const createColumn = async (columnData: CreateColumn): Promise<Column | null> => {
  const { data, error } = await supabase
    .from('tb_columns_board')
    .insert(columnData)
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar coluna:', error);
    return null;
  }

  return data;
};

export const updateColumn = async (id: string, updates: UpdateColumn): Promise<Column | null> => {
  const { data, error } = await supabase
    .from('tb_columns_board')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar coluna:', error);
    return null;
  }

  return data;
};

export const deleteColumn = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('tb_columns_board')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar coluna:', error);
    return false;
  }

  return true;
};

// ============ TASKS ============

export const createTask = async (taskData: CreateTask): Promise<Task | null> => {
  // Se não foi fornecida uma ordem, buscar a próxima disponível na coluna
  if (taskData.order === undefined) {
    const { data: tasks } = await supabase
      .from('tb_tasks')
      .select('order')
      .eq('column_id', taskData.column_id)
      .order('order', { ascending: false })
      .limit(1);

    const maxOrder = tasks?.[0]?.order || 0;
    taskData.order = maxOrder + 1;
  }

  const { data, error } = await supabase
    .from('tb_tasks')
    .insert(taskData)
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar tarefa:', error);
    return null;
  }

  return data;
};

export const updateTask = async (id: string, updates: UpdateTask): Promise<Task | null> => {
  const { data, error } = await supabase
    .from('tb_tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return null;
  }

  return data;
};

export const deleteTask = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('tb_tasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar tarefa:', error);
    return false;
  }

  return true;
};

export const moveTask = async (taskId: string, newColumnId: string, newOrder?: number): Promise<Task | null> => {
  // Se não foi fornecida uma nova ordem, colocar no final da coluna de destino
  if (newOrder === undefined) {
    const { data: tasks } = await supabase
      .from('tb_tasks')
      .select('order')
      .eq('column_id', newColumnId)
      .order('order', { ascending: false })
      .limit(1);

    const maxOrder = tasks?.[0]?.order || 0;
    newOrder = maxOrder + 1;
  }

  const { data, error } = await supabase
    .from('tb_tasks')
    .update({ 
      column_id: newColumnId,
      order: newOrder 
    })
    .eq('id', taskId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao mover tarefa:', error);
    return null;
  }

  return data;
};

// ============ USERS ============

export const createUser = async (userData: { name: string; email: string }) => {
  const { data, error } = await supabase
    .from('tb_users')
    .insert(userData)
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar usuário:', error);
    return null;
  }

  return data;
};

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('tb_users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }

  return data;
};
