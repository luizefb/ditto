import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco para TypeScript
export type Database = {
  public: {
    Tables: {
      tb_users: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
        };
      };
      tb_boards: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          owner_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          owner_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          owner_id?: string;
        };
      };
      tb_columns_board: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          board_id: string;
          order: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          board_id: string;
          order: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          board_id?: string;
          order?: number;
        };
      };
      tb_tasks: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string | null;
          column_id: string;
          order: number | null;
          priority: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description?: string | null;
          column_id: string;
          order?: number | null;
          priority?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string | null;
          column_id?: string;
          order?: number | null;
          priority?: number | null;
        };
      };
    };
  };
};
