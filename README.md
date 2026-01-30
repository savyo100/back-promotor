# PromotorApp - Backend

API backend para gerenciamento de promotores, jornadas, leads e supervisores.

## Tecnologias

- Node.js + TypeScript
- Express
- Supabase
- Jest (testes)

## Requisitos

- Node.js >= 18
- npm ou yarn

## Instalação

1. Clone o repositório

   git clone <repo-url>

2. Instale dependências

   npm install

3. Crie um arquivo `.env` com as variáveis necessárias (Supabase, etc.).

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

## Contribuição

1. Abra uma issue descrevendo a mudança.
2. Crie uma branch com um nome descritivo.
3. Envie um pull request.


