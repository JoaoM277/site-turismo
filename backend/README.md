# Backend — Site de Turismo (API)

API REST feita em **Node.js + Express**, em JavaScript puro.

Os dados são servidos, por padrão, a partir de arquivos "mock" em
`src/data/` (não há banco de dados configurado ainda). Essa camada foi
isolada dos controllers propositalmente: quando um banco de dados real
(MongoDB, PostgreSQL, etc.) for adicionado, basta trocar a implementação
dentro de `src/data/`, sem precisar mexer em controllers ou rotas.

## Scripts

- `npm run dev` — inicia a API com recarregamento automático (nodemon)
- `npm start` — inicia a API em modo normal (produção)

## Estrutura de pastas

```
src/
├── server.js          # ponto de entrada: sobe o servidor HTTP
├── app.js             # configuração do app Express (middlewares e rotas)
├── config/            # configurações (variáveis de ambiente, etc.)
├── data/              # "banco de dados" mock em memória (arrays JS)
├── controllers/       # regras de negócio de cada recurso
├── routes/            # definição dos endpoints da API
├── middlewares/       # middlewares customizados (erros, validação, etc.)
└── utils/             # funções utilitárias reaproveitáveis
```

## Endpoints principais

| Método | Rota                     | Descrição                              |
| ------ | ------------------------ | --------------------------------------- |
| GET    | `/api/destinos`          | Lista todos os destinos                 |
| GET    | `/api/destinos/:id`      | Detalhe de um destino                   |
| GET    | `/api/pacotes`           | Lista pacotes (aceita `?destinoId=`)    |
| GET    | `/api/pacotes/:id`       | Detalhe de um pacote                    |
| POST   | `/api/reservas`          | Cria uma nova reserva                   |
| GET    | `/api/reservas`          | Lista reservas (uso administrativo)     |
| POST   | `/api/contato`           | Envia uma mensagem de contato           |
| GET    | `/api/health`            | Healthcheck da API                      |
