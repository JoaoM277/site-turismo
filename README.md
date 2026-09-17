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

## Deploy

Frontend e backend sobem juntos no **Render**, como dois serviços
criados manualmente pelo dashboard (a conta/plano usado não tem a opção
de Blueprint/`render.yaml`, então não tem arquivo de config pra isso —
os passos abaixo são o equivalente feito na mão).

### Backend — "New +" → "Web Service"

- Conectar o repositório.
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: à escolha (processo contínuo — necessário porque o multer
  salva foto em disco em `backend/public/uploads/` e os dados da API
  são arrays em memória, sem banco — ver `CONTEUDO-INTERNO.md`).
- **Env Vars**:
  - `NODE_ENV` = `production`
  - `CORS_ORIGIN` = URL do site estático abaixo (preencher depois que
    ele existir)
  - `PORT` não precisa ser definida — o Render injeta a própria
    automaticamente, e `config.js` já lê `process.env.PORT` primeiro.

### Frontend — "New +" → "Static Site"

- Conectar o mesmo repositório.
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Redirects/Rewrites**: adicionar uma regra `/*` → `/index.html` do
  tipo **Rewrite** (o site usa `BrowserRouter`, sem isso uma rota tipo
  `/destinos/3` daria 404 ao recarregar a página).
- **Env Vars**:
  - `VITE_API_URL` = URL do backend acima + `/api` (ex:
    `https://site-turismo-backend.onrender.com/api`) — precisa existir
    **antes** do build rodar, é consumida em build-time pelo Vite, não
    em runtime.

### Limitações a saber

Se o backend ficar num plano sem disco persistente, fotos enviadas na
Galeria somem a cada redeploy/restart do serviço; e se ficar num plano
com sleep por inatividade, o primeiro request depois de um tempo parado
demora mais (cold start). Pra fotos sobreviverem de verdade a qualquer
redeploy, duas opções, nenhuma feita ainda: disco persistente do Render
(recurso à parte, não vem junto de nenhum plano) ou trocar o
`multer.diskStorage` por armazenamento externo (S3, Cloudinary, etc.).

## Documentação adicional

Veja a pasta [`docs/`](./docs) e os READMEs específicos de
[`backend`](./backend/README.md) e [`frontend`](./frontend/README.md).
