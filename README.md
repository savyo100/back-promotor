# PromotorApp - Backend

API backend para gerenciamento de promotores, jornadas, leads e supervisores.

## Visão Geral

Este backend expõe APIs para dois perfis:
- Supervisor (Web): administração de promotores, leads, localização e dashboard
- Promotor (Mobile): jornada, envio de localização e cadastro de leads

Autenticação e autorização são realizadas via Supabase, com validação de token nas rotas protegidas.

## Tecnologias

- Node.js + TypeScript
- Express
- Supabase
- Jest (testes)

## Requisitos

- Node.js >= 18
- npm ou yarn

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

- `SUPABASE_SERVICE_ROLE_KEY` — chave de serviço do Supabase (obrigatória)
- `PORT` — porta do servidor (opcional, padrão 3333)

Observações:
- A URL do Supabase está definida em `src/config/supabase.ts`
- Nunca exponha chaves de produção; mantenha `.env` fora do controle de versão

## Instalação

1. Clone o repositório

   git clone <repo-url>

2. Instale dependências

   npm install

3. Configure o `.env` conforme seção acima.

## Scripts úteis

- `npm run dev` — roda a aplicação em modo desenvolvimento com `ts-node-dev`.
- `npm run build` — compila TypeScript para `dist`.
- `npm run start` — executa o build em `dist` (produção).
- `npm run lint` — executa o ESLint.
- `npm run test` — executa os testes com Jest.

## Como rodar

- Desenvolvimento:

  `npm run dev`

- Produção (build + start):

  `npm run build`
  `npm run start`

## CORS

Origens permitidas configuradas no servidor:
- http://172.16.17.12:8080
- http://localhost:5173

As requisições sem origem (ex.: Postman) são aceitas. Ajuste em [server.ts](file:///c:/Users/EAD04/Documents/Workspace/bakcer/back-promotor/src/server.ts).

## Autenticação

- Login: `POST /auth/login`  
  Entrada: `{ email, password }`  
  Saída: `{ accessToken, refreshToken, expiresIn, user: { id, email, role } }`
- Logout: `POST /auth/logout`  
  Header: `Authorization: Bearer <token>`
- Usuário atual: `GET /auth/me`  
  Header: `Authorization: Bearer <token>`

Rotas protegidas utilizam `Authorization: Bearer <accessToken>` e são validadas pelo middleware em [auth.middleware.ts](file:///c:/Users/EAD04/Documents/Workspace/bakcer/back-promotor/src/middleware/auth.middleware.ts).

Papéis:
- `supervisor` — acesso administrativo
- `promotor` — acesso operacional

## Endpoints

Base path: `/`

- Autenticação:
  - `POST /auth/login`
  - `POST /auth/logout`
  - `GET /auth/me`

- Supervisor:
  - `GET /supervisor/dashboard`
  - `GET /supervisor/supervisores`
  - `GET /supervisor/supervisores/:id`
  - `POST /supervisor/supervisores`
  - `PUT /supervisor/supervisores/:id`
  - `DELETE /supervisor/supervisores/:id`
  - `POST /supervisor/promotores`
  - `GET /supervisor/promotores`
  - `GET /supervisor/promotores/:id`
  - `PUT /supervisor/promotores/:id`
  - `DELETE /supervisor/promotores/:id`
  - `GET /supervisor/promotores/:id/localizacao-atual`
  - `GET /supervisor/promotores/:id/historico-localizacao`
  - `GET /supervisor/leads`
  - `GET /supervisor/leads/:id`
  - `PUT /supervisor/leads/:id`
  - `DELETE /supervisor/leads/:id`
  - `GET /supervisor/promotores/:id/leads`

- Promotor:
  - `POST /promotor/jornada/iniciar`
  - `POST /promotor/jornada/finalizar`
  - `GET /promotor/jornada/status`
  - `POST /promotor/localizacao`
  - `POST /promotor/leads`
  - `GET /promotor/leads`
  - `GET /promotor/leads/:id`
  - `PUT /promotor/leads/:id`
  - `DELETE /promotor/leads/:id`

## Testes

Os testes usam Jest. Para executar:

`npm run test`

Cobertura de testes e relatórios ficam no diretório `coverage/`.

## Estrutura do projeto (resumo)

- `src/` — código-fonte TypeScript
- `src/controllers` — controllers da API
- `src/services` — lógica de negócio
- `src/routes` — definições de rotas
- `src/__tests__` — testes unitários

## Notas de Segurança

- Não commit chaves e segredos (`.env`).
- Tokens devem ser enviados via `Authorization: Bearer`.
- Usuários e permissões são verificados via Supabase.

## Contribuição

1. Abra uma issue descrevendo a mudança.
2. Crie uma branch com um nome descritivo.
3. Envie um pull request.


