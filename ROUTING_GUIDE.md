# 🗺️ Sistema de Roteamento - Ditto Kanban

Este documento explica como funciona o sistema de navegação e roteamento do projeto.

## 📁 Estrutura de Rotas

O projeto utiliza o **Next.js 15 App Router** com a seguinte estrutura:

```
src/app/
├── (auth)/                    # Grupo de rotas de autenticação
│   ├── layout.tsx            # Layout para páginas de auth
│   ├── login/
│   │   └── page.tsx          # Página de login (/login)
│   └── signup/
│       └── page.tsx          # Página de cadastro (/signup)
├── (protected)/              # Grupo de rotas protegidas
│   ├── layout.tsx            # Layout com proteção de auth
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard principal (/dashboard)
│   └── board/
│       └── [id]/
│           └── page.tsx      # Página do board (/board/[id])
├── layout.tsx                # Layout raiz da aplicação
├── page.tsx                  # Página inicial (redireciona)
└── middleware.ts             # Middleware de autenticação
```

## 🛡️ Proteção de Rotas

### Rotas Públicas (Não requerem autenticação)
- `/login` - Página de login
- `/signup` - Página de cadastro

### Rotas Protegidas (Requerem autenticação)
- `/dashboard` - Lista de boards do usuário
- `/board/[id]` - Visualização específica de um board

### Middleware de Autenticação
O arquivo `middleware.ts` intercepta todas as requisições e:
- ✅ Verifica se o usuário está autenticado
- ✅ Redireciona usuários não autenticados para `/login`
- ✅ Redireciona usuários autenticados de páginas públicas para `/dashboard`
- ✅ Gerencia cookies de sessão do Supabase

## 🧭 Fluxo de Navegação

### 1. **Usuário Não Autenticado**
```
/ → /login → (após login) → /dashboard
```

### 2. **Usuário Autenticado**
```
/ → /dashboard
/login → /dashboard (redirecionamento automático)
/signup → /dashboard (redirecionamento automático)
```

### 3. **Navegação Interna**
```
/dashboard → /board/[id] → /dashboard (botão voltar)
```

## 🔄 Componentes de Navegação

### AppHeader
- **Localização**: `src/components/AppHeader.tsx`
- **Funcionalidades**:
  - Logo clicável (volta para dashboard)
  - Breadcrumb dinâmico baseado na rota atual
  - Menu do usuário com opção de logout
  - Navegação programática usando `useRouter`

### BoardManager
- **Localização**: `src/components/BoardManager.tsx`
- **Funcionalidades**:
  - Lista todos os boards do usuário
  - Botão "Abrir Board" navega para `/board/[id]`
  - Criação, edição e exclusão de boards

### AuthForm
- **Localização**: `src/components/AuthForm.tsx`
- **Funcionalidades**:
  - Alterna entre login e signup baseado na rota atual
  - Botão de alternar modo navega entre `/login` e `/signup`
  - Redirecionamento automático após autenticação

## 🚀 Como Usar

### Navegação Programática
```tsx
import { useRouter } from 'next/navigation';

const Component = () => {
  const router = useRouter();
  
  // Navegar para uma rota
  const goToDashboard = () => {
    router.push('/dashboard');
  };
  
  // Navegar para um board específico
  const openBoard = (boardId: string) => {
    router.push(`/board/${boardId}`);
  };
  
  // Voltar
  const goBack = () => {
    router.back();
  };
};
```

### Verificar Rota Atual
```tsx
import { usePathname } from 'next/navigation';

const Component = () => {
  const pathname = usePathname();
  
  const isOnDashboard = pathname === '/dashboard';
  const isOnBoard = pathname.startsWith('/board/');
  const isOnLogin = pathname === '/login';
};
```

### Proteção Manual de Componentes
```tsx
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedComponent = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (!user) return null;
  
  return <div>Conteúdo protegido</div>;
};
```

## 🔧 Configurações

### Middleware
O middleware é configurado para interceptar todas as rotas exceto:
- Arquivos estáticos (`_next/static`)
- Otimização de imagens (`_next/image`)
- Favicon e arquivos de mídia

### Grupos de Rotas
- `(auth)` - Agrupa rotas de autenticação sem afetar a URL
- `(protected)` - Agrupa rotas que requerem autenticação

### Layouts Aninhados
- **Root Layout**: Providers globais (Theme, Auth, App)
- **Auth Layout**: Estilo específico para páginas de autenticação
- **Protected Layout**: Verificação de autenticação automática

## 📝 Exemplos Práticos

### Criar Nova Rota Protegida
1. Criar pasta em `(protected)/nova-rota/`
2. Adicionar `page.tsx` na pasta
3. A rota será automaticamente protegida pelo layout pai

### Adicionar Rota Pública
1. Criar pasta em `(auth)/nova-rota/` ou na raiz
2. Adicionar rota no array `publicRoutes` do middleware
3. Adicionar `page.tsx` na pasta

### Redirecionar Após Ação
```tsx
// Após criar um board
const handleCreateBoard = async () => {
  const newBoard = await createBoard(data);
  router.push(`/board/${newBoard.id}`);
};

// Após logout
const handleLogout = async () => {
  await signOut();
  router.push('/login');
};
```

## 🎯 Benefícios

- ✅ **Proteção Automática**: Middleware gerencia acesso
- ✅ **UX Fluida**: Redirecionamentos automáticos
- ✅ **Organização Clara**: Grupos de rotas bem definidos
- ✅ **Tipagem Forte**: TypeScript em todas as rotas
- ✅ **SEO Friendly**: URLs semânticas e limpas
- ✅ **Performance**: Layouts aninhados otimizam re-renderizações

---

🚀 **O sistema de roteamento está pronto para uso!** Navegue entre as páginas e teste todas as funcionalidades.
