# 🎯 Ditto Kanban

Um sistema de gerenciamento de tarefas estilo Kanban, desenvolvido com Next.js e Material-UI.

## 📋 Sobre o Projeto

O **Ditto Kanban** é uma aplicação web moderna para organização e gerenciamento de tarefas utilizando a metodologia Kanban. Com uma interface intuitiva e design responsivo.

### ✨ Características Principais

- 📊 **Interface Kanban Visual**: Organize tarefas em colunas personalizáveis
- 🎨 **Design Moderno**: Interface limpa e responsiva com Material-UI
- 🔄 **Drag & Drop**: Arraste e solte tarefas entre colunas
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- ⚡ **Performance**: Desenvolvido com Next.js 15 e React 19

## 🖼️ Screenshots

### Página Principal
<!-- Adicione aqui uma screenshot da página principal -->
![Página Principal](./screenshots/main-page.png)

### Gerenciamento de Boards
<!-- Adicione aqui uma screenshot do gerenciamento de boards -->
![Gerenciamento de Boards](./screenshots/board-manager.png)

### Board Kanban
<!-- Adicione aqui uma screenshot de um board Kanban -->
![Board Kanban](./screenshots/kanban-board.png)

### Criação de Tarefas
<!-- Adicione aqui uma screenshot da criação de tarefas -->
![Criação de Tarefas](./screenshots/task-creation.png)

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js, React, TypeScript
- **UI/UX**: Material-UI (MUI), Emotion
- **Backend**: Supabase (PostgreSQL)
- **Estilização**: Tailwind CSS
- **Fontes**: JetBrains Mono, Geist
- **Deploy**: Vercel

## 🎮 Como Usar

### 1. Criando seu Primeiro Board
- Clique em "Criar Novo Board"
- Digite um título e descrição
- Clique em "Criar"

### 2. Adicionando Colunas
- No seu board, clique no botão "+" para adicionar colunas
- Exemplos: "Para Fazer", "Em Progresso", "Concluído"

### 3. Criando Tarefas
- Clique em "Adicionar Tarefa" em qualquer coluna
- Preencha título e descrição
- A tarefa será adicionada à coluna

### 4. Movendo Tarefas
- Arraste e solte tarefas entre colunas
- A posição é salva automaticamente

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── BoardManager.tsx   # Gerenciador de boards
│   ├── KanbanBoard.tsx    # Board Kanban principal
│   ├── KanbanColumn.tsx   # Coluna do Kanban
│   ├── TaskCard.tsx       # Card de tarefa
│   ├── TaskDialog.tsx     # Modal de criação/edição de tarefas
│   └── ColumnDialog.tsx   # Modal de criação/edição de colunas
├── contexts/              # Contextos React
│   └── AppContext.tsx     # Contexto principal da aplicação
├── lib/                   # Utilitários e configurações
│   ├── api.ts            # Funções de API
│   └── supabase.ts       # Configuração do Supabase
├── theme/                 # Configuração de tema
│   └── theme.ts          # Tema Material-UI personalizado
└── types/                 # Definições de tipos TypeScript
    └── kanban.ts         # Tipos do sistema Kanban
```
