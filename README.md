# 🎯 Ditto Kanban

Um sistema de gerenciamento de tarefas estilo Kanban inspirado no Pokémon Ditto, desenvolvido com Next.js e Material-UI.

## 📋 Sobre o Projeto

O **Ditto Kanban** é uma aplicação web moderna para organização e gerenciamento de tarefas utilizando a metodologia Kanban. Com uma interface intuitiva e design responsivo, permite que você transforme suas ideias em ação de forma visual e eficiente.

### ✨ Características Principais

- 📊 **Interface Kanban Visual**: Organize tarefas em colunas personalizáveis
- 🎨 **Design Moderno**: Interface limpa e responsiva com Material-UI
- 🔄 **Drag & Drop**: Arraste e solte tarefas entre colunas
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🎯 **Tema Ditto**: Inspirado no Pokémon Ditto com cores vibrantes
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

### Interface Mobile
<!-- Adicione aqui uma screenshot da interface mobile -->
![Interface Mobile](./screenshots/mobile-view.png)

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI/UX**: Material-UI (MUI), Emotion
- **Backend**: Supabase (PostgreSQL)
- **Estilização**: CSS-in-JS, Tailwind CSS
- **Fontes**: JetBrains Mono, Geist
- **Deploy**: Vercel (recomendado)

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Conta no Supabase (para backend)

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/ditto-kanban.git
   cd ditto-kanban
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env.local
   ```
   
   Edite o arquivo `.env.local` com suas credenciais do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

4. **Execute o projeto em desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🗄️ Configuração do Banco de Dados

### Estrutura das Tabelas no Supabase

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de boards
CREATE TABLE boards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de colunas
CREATE TABLE columns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de tarefas
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  column_id UUID REFERENCES columns(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

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

## 🎨 Personalização

### Tema
O tema pode ser personalizado editando `src/theme/theme.ts`:

```typescript
export const dittoTheme = createTheme({
  palette: {
    primary: {
      main: '#2563EB', // Cor principal
      light: '#60A5FA', // Cor clara
      dark: '#1D4ED8',  // Cor escura
    },
    // ... outras configurações
  },
});
```

### Cores
As cores principais do tema Ditto:
- **Azul Principal**: `#2563EB`
- **Azul Claro**: `#60A5FA`
- **Azul Escuro**: `#1D4ED8`
- **Fundo**: `#F8FAFC`
- **Texto**: `#1E293B`

## 🚀 Deploy

### Deploy na Vercel (Recomendado)

1. **Conecte seu repositório à Vercel**
2. **Configure as variáveis de ambiente** na Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy automático** a cada push para a branch principal

### Deploy Manual

```bash
# Build do projeto
npm run build

# Iniciar em produção
npm start
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Autenticação de usuários
- [ ] Colaboração em tempo real
- [ ] Templates de boards
- [ ] Integração com calendário
- [ ] Notificações push
- [ ] Exportação de dados
- [ ] Temas personalizáveis
- [ ] API REST completa

## 🐛 Reportando Bugs

Se você encontrar algum bug, por favor:

1. Verifique se já existe uma issue similar
2. Crie uma nova issue com:
   - Descrição detalhada do problema
   - Passos para reproduzir
   - Screenshots (se aplicável)
   - Informações do ambiente (navegador, OS, etc.)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- Email: seu.email@exemplo.com

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Material-UI](https://mui.com/) - Componentes UI
- [Supabase](https://supabase.com/) - Backend como serviço
- [Pokémon](https://pokemon.com/) - Inspiração para o tema Ditto

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐
