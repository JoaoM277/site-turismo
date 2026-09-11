# Frontend — Site de Turismo

Aplicação **React.js** (JavaScript puro), criada com **Vite**.

## Scripts

- `npm run dev` — inicia o servidor de desenvolvimento (com hot reload)
- `npm run build` — gera a versão de produção na pasta `dist/`
- `npm run preview` — serve localmente a build de produção, para testes

## Configuração

Copie `.env.example` para `.env` e ajuste `VITE_API_URL` se o backend não
estiver rodando em `http://localhost:4000`.

## Estrutura de pastas

```
src/
├── main.jsx            # ponto de entrada: monta o React na página
├── App.jsx             # layout raiz (Navbar + rotas + Footer)
├── routes/              # mapeamento de URLs para páginas (react-router-dom)
├── pages/               # uma pasta por página do site
├── components/          # componentes reutilizáveis (Navbar, Cards, Botão...)
├── context/              # estado global da aplicação (React Context)
├── hooks/                # hooks customizados (ex: useFetch)
├── services/             # comunicação com a API (axios)
└── styles/               # variáveis de design (cores, espaçamentos...)
```

## Responsividade

O layout é construído com Flexbox/CSS Grid e media queries, testado em três
faixas principais:

- **Celular**: até 600px
- **Tablet**: 601px – 1024px
- **Desktop**: acima de 1024px

As variáveis de design (cores, espaçamentos, raios) ficam centralizadas em
`src/styles/variables.css`.
