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

Frontend e backend sobem juntos no **Render**, via um único Blueprint
(`render.yaml`, na raiz do repositório) — dois serviços, um dashboard só:

- **`site-turismo-backend`**: Web Service Node (processo contínuo, não
  serverless — necessário porque o multer salva foto em disco em
  `backend/public/uploads/` e os dados da API são arrays em memória, sem
  banco — ver `CONTEUDO-INTERNO.md`).
- **`site-turismo-frontend`**: Static Site (build do Vite), com rota de
  fallback pra `index.html` (o site usa `BrowserRouter`, sem isso uma
  rota tipo `/destinos/3` daria 404 ao recarregar a página).

**Como usar**: no dashboard do Render, "New +" → "Blueprint" → apontar
pro repositório — ele lê o `render.yaml` e cria os dois serviços
sozinho. Depois de criados, preencher no painel as duas env vars
marcadas `sync: false` no arquivo (cada serviço precisa da URL pública
do outro, só disponível depois que ambos existem):
- `CORS_ORIGIN` (no backend) = URL do `site-turismo-frontend`
- `VITE_API_URL` (no frontend) = URL do `site-turismo-backend` + `/api`

**Limitação do plano free**: o disco do backend não é persistente entre
redeploys/restarts (fotos da Galeria somem) e o serviço "dorme" após
15min sem tráfego (primeiro request depois demora ~30-50s). Ver
comentários no próprio `render.yaml` para as opções de resolver isso
quando for preciso (disco persistente pago, ou trocar o upload por
armazenamento externo tipo S3/Cloudinary).

## Documentação adicional

Veja a pasta [`docs/`](./docs) e os READMEs específicos de
[`backend`](./backend/README.md) e [`frontend`](./frontend/README.md).
