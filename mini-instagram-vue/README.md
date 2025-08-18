# 📸 InstaPocket

Bem-vindo ao **InstaPocket**, um projeto frontend moderno que simula um feed de fotos, permitindo que os usuários naveguem, favoritem e pesquisem imagens.  

### 🚀 Tecnologias Utilizadas  

O projeto foi construído utilizando um ecossistema de ferramentas e tecnologias de ponta para desenvolvimento frontend:  

- **Vue.js** → Framework progressivo para construção de interfaces.
- **Vue Router** → Gerenciador de rotas oficial do Vue.js.
- **Vite** → Build rápido e otimizado para dev ágil.
- **Tailwind CSS** → Framework utilitário para estilização responsiva.
- **Unsplash API** → Busca fotos de alta qualidade.
- **localStorage** → Persiste os dados de favoritos no navegador.

### ✨ Funcionalidades  

✅ Feed de Fotos → Fotos aleatórias da Unsplash API  
✅ Sistema de Favoritos → Adicionar/remover fotos e salvar localmente  
✅ Página de Favoritos → Gerenciar fotos favoritadas  
✅ Busca de Fotos → Filtrar imagens no feed  
✅ Modal de Imagem → Exibe detalhes da foto + autor  
✅ Navegação Suave → Rotas com Vue Router  
✅ Design Responsivo → Mobile e desktop  

### 📂 Estrutura do Projeto


```
mini-instagram-vue/
├── .vscode/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Logo.vue
│   │   ├── PhotoModal.vue
│   │   └── Search.vue
│   ├── composables/
│   │   └── useFavorites.js
│   ├── pages/
│   │   ├── Favorites.vue
│   │   ├── Feed.vue
│   │   └── Login.vue
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```
### ⚙️ Como Executar o Projeto

**Clone o repositório:**

```
git clone <URL_DO_SEU_REPOSITÓRIO>
```

**Instale as dependências:**

```
cd mini-instagram-vue
npm install
```

**Crie o arquivo** `.env`:

```
VITE_UNSPLASH_ACCESS_KEY=<SUA_CHAVE_AQUI>
```

**Inicie o servidor de desenvolvimento:**

```
npm run dev
```

### 🧩 Detalhes dos Arquivos

`src/components/Header.vue` → Cabeçalho com logo e navegação.

`src/components/Logo.vue` → Logo com gradiente animado.

`src/components/PhotoModal.vue` → Modal de fotos (detalhes, fechar com ESC/click, favoritar).

`src/components/Search.vue` → Barra de busca conectada à Unsplash API.

`src/composables/useFavorites.js` → Lógica de favoritos (adicionar, remover, salvar, verificar).

`src/pages/Favorites.vue` → Página de fotos favoritadas.

`src/pages/Feed.vue` → Página principal (feed, busca, favoritos, carregamento).

`src/pages/Login.vue` → Tela de login (formulário, validação, design estilizado).

`src/router/index.js` → Configuração do Vue Router (/feed, /favorites, /login).