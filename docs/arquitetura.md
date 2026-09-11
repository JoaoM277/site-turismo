# Arquitetura do projeto

## Visão geral

```
┌─────────────────┐        HTTP/JSON        ┌──────────────────┐
│  Frontend (SPA)  │ ───────────────────────▶│   Backend (API)  │
│  React + Vite    │◀─────────────────────── │  Node.js/Express │
└─────────────────┘                          └──────────────────┘
                                                       │
                                                       ▼
                                              dados mock em memória
                                              (src/data/*.js)
```

- O **frontend** é uma SPA (Single Page Application) em React que consome a
  API via `axios`, com rotas de página gerenciadas pelo `react-router-dom`.
- O **backend** expõe uma API REST em Express. Os dados hoje ficam em
  memória (arrays JavaScript dentro de `backend/src/data/`), o que é
  suficiente para desenvolvimento e demonstração.

## Evoluções futuras sugeridas

- Substituir os arquivos em `backend/src/data/` por um banco de dados real
  (ex: MongoDB com Mongoose, ou PostgreSQL com Prisma/Sequelize), mantendo a
  mesma assinatura das funções para não impactar controllers/rotas.
- Adicionar autenticação (ex: JWT) para proteger rotas administrativas,
  como `GET /api/reservas`.
- Adicionar testes automatizados (ex: Jest + Supertest no backend,
  Vitest + Testing Library no frontend).
- Adicionar paginação nos endpoints de listagem (`/destinos`, `/pacotes`).
