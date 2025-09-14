# 🌸 Ditto Kanban - Configuração do Supabase

Este guia explica como conectar seu projeto Ditto Kanban com o Supabase.

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto Next.js configurado (já feito!)

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em "New Project"
3. Escolha sua organização
4. Preencha os dados:
   - **Name**: `ditto-kanban`
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a mais próxima (ex: South America)
5. Clique em "Create new project"

### 2. Configurar as Tabelas

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em "New query"
3. Cole o seguinte SQL para criar as tabelas:

```sql
-- Tabela de usuários
create table public.tb_users (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  email text not null,
  constraint tb_users_pkey primary key (id),
  constraint tb_users_email_key unique (email)
) tablespace pg_default;

-- Tabela de boards
create table public.tb_boards (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  title text not null,
  owner_id uuid not null,
  constraint tb_boards_pkey primary key (id),
  constraint tb_boards_owner_id_fkey foreign key (owner_id) references tb_users (id) on delete cascade
) tablespace pg_default;

-- Tabela de colunas
create table public.tb_columns_board (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  title text not null,
  board_id uuid not null,
  "order" smallint not null,
  constraint tb_columns_board_pkey primary key (id),
  constraint tb_columns_board_board_id_fkey foreign key (board_id) references tb_boards (id) on delete cascade
) tablespace pg_default;

-- Tabela de tarefas
create table public.tb_tasks (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  title text not null,
  description text null,
  column_id uuid not null,
  "order" smallint null,
  priority smallint null,
  constraint tb_tasks_pkey primary key (id),
  constraint tb_tasks_column_id_fkey foreign key (column_id) references tb_columns_board (id) on delete cascade
) tablespace pg_default;
```

4. Clique em "Run" para executar

### 3. Configurar RLS (Row Level Security)

1. Ainda no SQL Editor, execute:

```sql
-- Habilitar RLS nas tabelas
ALTER TABLE tb_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tb_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE tb_columns_board ENABLE ROW LEVEL SECURITY;
ALTER TABLE tb_tasks ENABLE ROW LEVEL SECURITY;

-- Políticas para tb_users (usuários podem ver/editar apenas seus próprios dados)
CREATE POLICY "Users can view own profile" ON tb_users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own profile" ON tb_users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own profile" ON tb_users FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Políticas para tb_boards (usuários podem ver/editar apenas seus próprios boards)
CREATE POLICY "Users can view own boards" ON tb_boards FOR SELECT USING (auth.uid()::text = owner_id::text);
CREATE POLICY "Users can create boards" ON tb_boards FOR INSERT WITH CHECK (auth.uid()::text = owner_id::text);
CREATE POLICY "Users can update own boards" ON tb_boards FOR UPDATE USING (auth.uid()::text = owner_id::text);
CREATE POLICY "Users can delete own boards" ON tb_boards FOR DELETE USING (auth.uid()::text = owner_id::text);

-- Políticas para tb_columns_board
CREATE POLICY "Users can view columns of own boards" ON tb_columns_board FOR SELECT 
USING (board_id IN (SELECT id FROM tb_boards WHERE owner_id::text = auth.uid()::text));

CREATE POLICY "Users can create columns in own boards" ON tb_columns_board FOR INSERT 
WITH CHECK (board_id IN (SELECT id FROM tb_boards WHERE owner_id::text = auth.uid()::text));

CREATE POLICY "Users can update columns of own boards" ON tb_columns_board FOR UPDATE 
USING (board_id IN (SELECT id FROM tb_boards WHERE owner_id::text = auth.uid()::text));

CREATE POLICY "Users can delete columns of own boards" ON tb_columns_board FOR DELETE 
USING (board_id IN (SELECT id FROM tb_boards WHERE owner_id::text = auth.uid()::text));

-- Políticas para tb_tasks
CREATE POLICY "Users can view tasks of own boards" ON tb_tasks FOR SELECT 
USING (column_id IN (
  SELECT tc.id FROM tb_columns_board tc 
  JOIN tb_boards tb ON tc.board_id = tb.id 
  WHERE tb.owner_id::text = auth.uid()::text
));

CREATE POLICY "Users can create tasks in own boards" ON tb_tasks FOR INSERT 
WITH CHECK (column_id IN (
  SELECT tc.id FROM tb_columns_board tc 
  JOIN tb_boards tb ON tc.board_id = tb.id 
  WHERE tb.owner_id::text = auth.uid()::text
));

CREATE POLICY "Users can update tasks of own boards" ON tb_tasks FOR UPDATE 
USING (column_id IN (
  SELECT tc.id FROM tb_columns_board tc 
  JOIN tb_boards tb ON tc.board_id = tb.id 
  WHERE tb.owner_id::text = auth.uid()::text
));

CREATE POLICY "Users can delete tasks of own boards" ON tb_tasks FOR DELETE 
USING (column_id IN (
  SELECT tc.id FROM tb_columns_board tc 
  JOIN tb_boards tb ON tc.board_id = tb.id 
  WHERE tb.owner_id::text = auth.uid()::text
));
```

### 4. Obter as Credenciais

1. No painel do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://xyz.supabase.co`)
   - **anon public** key (chave pública)

### 5. Configurar Variáveis de Ambiente

1. No seu projeto, copie o arquivo de exemplo:
   ```bash
   cp env.example .env.local
   ```

2. Edite o arquivo `.env.local` e adicione suas credenciais:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica-aqui
   ```

### 6. Habilitar Autenticação (Opcional)

Se quiser adicionar autenticação:

1. No Supabase, vá em **Authentication** → **Settings**
2. Configure os providers desejados (Google, GitHub, etc.)
3. Adicione o domínio do seu site em **Site URL**

## 🧪 Testar a Conexão

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Abra o console do navegador (F12)
3. Verifique se não há erros de conexão

## 📁 Estrutura dos Dados

### Relacionamentos:
- `tb_users` → `tb_boards` (1:N)
- `tb_boards` → `tb_columns_board` (1:N)  
- `tb_columns_board` → `tb_tasks` (1:N)

### Campos importantes:
- **priority**: 1 = Baixa, 2 = Média, 3 = Alta
- **order**: Define a ordem das colunas/tarefas
- **created_at**: Timestamp automático

## 🔄 Próximos Passos

Depois de configurado, você pode:

1. **Integrar autenticação** - Usar o Supabase Auth
2. **Implementar real-time** - Usar subscriptions do Supabase
3. **Adicionar storage** - Para upload de arquivos
4. **Deploy** - Hospedar no Vercel/Netlify

## 🆘 Problemas Comuns

### Erro de CORS
- Verifique se o domínio está configurado no Supabase
- Em desenvolvimento, use `http://localhost:3000`

### Erro de RLS
- Certifique-se de que as políticas estão corretas
- Teste com RLS desabilitado primeiro

### Erro de conexão
- Verifique se as variáveis de ambiente estão corretas
- Reinicie o servidor após alterar o `.env.local`

---

🌸 **Ditto Kanban** - Organize suas tarefas com a magia do Pokémon mais flexível! ✨
