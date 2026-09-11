# Site de Turismo 🌍

Site de turismo full-stack, responsivo, com backend em **Node.js (Express)** e
frontend em **React.js**. Todo o código é escrito em JavaScript puro (sem TypeScript).

## Estrutura do projeto

```
site-turismo/
├── backend/     # API REST em Node.js + Express
├── frontend/    # Aplicação React (Vite)
└── docs/        # Documentação complementar
```

Cada subprojeto (`backend` e `frontend`) tem seu próprio `package.json` e é
instalado/executado de forma independente.

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

## Como rodar o projeto

### 1. Backend (API)

```bash
cd backend
npm install
npm run dev
```

A API sobe por padrão em `http://localhost:4000`.

### 2. Frontend (React)

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O site fica disponível em `http://localhost:5173` (padrão do Vite) e já está
configurado para consumir a API do backend.

## Funcionalidades previstas

- Listagem e detalhe de **destinos** turísticos
- Listagem de **pacotes de viagem** com filtro por destino
- Formulário de **reserva** de pacote
- Formulário de **contato**
- Layout **responsivo** (mobile, tablet e desktop)

## Documentação adicional

Veja a pasta [`docs/`](./docs) e os READMEs específicos de
[`backend`](./backend/README.md) e [`frontend`](./frontend/README.md).
