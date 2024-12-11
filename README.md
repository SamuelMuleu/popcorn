# Favoritos de Filmes e Séries
Um projeto desenvolvido para gerenciar filmes e séries favoritos, oferecendo uma experiência personalizada para os usuários.

# 📖 Descrição
Este projeto permite que os usuários explorem um catálogo de filmes e séries ou realizem buscas específicas, adicionem títulos aos seus favoritos e gerenciem sua lista personalizada. O sistema utiliza autenticação para salvar os favoritos de forma segura, com suporte para login via Google ou conta própria.

# 🚀 Funcionalidades
Explorar filmes e séries em um catálogo dinâmico.
Pesquisar por títulos específicos.
Adicionar e remover filmes/séries da lista de favoritos.
Criar uma conta ou fazer login via Google.
Salvar os favoritos diretamente no Firebase para acesso em qualquer dispositivo.

# 🛠️ Tecnologias Utilizadas
Front-End:
Next.js - Framework para React.
TypeScript - Tipagem estática para maior segurança no código.
Tailwind CSS - Estilização moderna e responsiva.
Back-End e Banco de Dados:
Firebase - Gerenciamento de autenticação e dados em tempo real.
API:
The Movie Database (TMDB) - Fonte de dados para filmes e séries.

# 📸 Demonstração
[🎥 Confira o vídeo demonstrativo no repositório!](https://www.linkedin.com/posts/samuel-muleu_estou-muito-empolgado-em-compartilhar-um-activity-7272600298978713600-YC99?utm_source=share&utm_medium=member_ios)


# 📦 Como Rodar o Projeto
Pré-requisitos:
Node.js instalado
Gerenciador de pacotes (NPM ou Yarn)
Passos para executar:
Clone o repositório:
git clone
Instale as dependências:


npm install  
# ou  
yarn  


Inicie o servidor de desenvolvimento:
npm run dev  
# ou  
yarn dev  

Acesse o projeto no navegador em http://localhost:3000.
Crie um arquivo .env.local na raiz do projeto e adicione as seguintes variáveis de ambiente:


```env
NEXT_PUBLIC_TMDB_API_KEY=f7cb90673fad6f688bf6dda0ca264b72
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA7aBl1VCtYxIa1e0VoAOzP81UYGkvtwLU
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=popcorn-view.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=popcorn-view
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=popcorn-view.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=206900432073
NEXT_PUBLIC_FIREBASE_APP_ID=1:206900432073:web:581ff6a3cb7f9d4655d118
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LTMWDZ669P
NETLIFY_NEXT_PLUGIN_SKIP="TRUE"

```

# 📂 Estrutura do Projeto
```plaintext
├── .next/              # Arquivos gerados pelo Next.js (build)
├── node_modules/       # Dependências do projeto
├── public/             # Arquivos públicos e estáticos
├── src/                # Código-fonte do projeto
│   ├── app/            # Páginas e estrutura principal do aplicativo
│   │   ├── authstate/  # Gerenciamento de autenticação
│   │   ├── context/    # Contextos globais do React
│   │   ├── favorites/  # Lógica e componentes relacionados aos favoritos
│   │   ├── fonts/      # Configuração de fontes personalizadas
│   │   ├── movies/     # Páginas e lógica relacionadas aos filmes
│   │   ├── register/   # Páginas de registro de usuários
│   │   ├── search/     # Lógica e interface de pesquisa
│   │   ├── signin/     # Páginas de login de usuários
│   │   ├── globals.css # Estilos globais do Tailwind CSS
│   │   ├── layout.tsx  # Layout principal do aplicativo
│   │   ├── page.tsx    # Página inicial
│   │   └── popcorn.svg # Arquivo SVG usado no projeto
│   ├── components/     # Componentes reutilizáveis
│   └── lib/            # Funções utilitárias e bibliotecas auxiliares
├── netlify.toml        # Configuração para deploy no Netlify
├── .env.local          # Variáveis de ambiente do projeto
├── .eslint.json        # Configuração do ESLint
├── .gitignore          # Arquivos e pastas ignorados pelo Git
├── next-env.d.ts       # Configurações do ambiente Next.js com TypeScript
├── next.config.ts      # Configuração personalizada do Next.js
├── package.json        # Dependências e scripts do projeto
├── package-lock.json   # Controle de versões das dependências
├── postcss.config.mjs  # Configuração do PostCSS
├── tailwind.config.ts  # Configuração do Tailwind CSS
└── tsconfig.json       # Configuração do TypeScript

