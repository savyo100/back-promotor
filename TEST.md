# 🧪 Testes do Backend – Projeto Back-Promotor

Este documento descreve **a estratégia de testes**, **estrutura**, e **comandos necessários** para executar os testes unitários e o relatório de cobertura do projeto **Back-Promotor**, conforme boas práticas de Engenharia de Software e exigências acadêmicas.

---

## 🎯 Objetivo dos Testes

Os testes têm como objetivo garantir:

- O correto funcionamento das **regras de negócio (Services)**
- O comportamento esperado dos **Controllers** (status HTTP e respostas)
- Isolamento total de dependências externas (Supabase)
- Código confiável, previsível e de fácil manutenção

Todos os testes são **unitários**, simples e totalmente **mockados**, garantindo execução rápida e determinística.

---

## 🧱 Escopo de Testes

### ✅ Testado
- Controllers
- Services

---

## 📁 Estrutura de Testes

```txt
src/
├── __tests__/
│   ├── controllers/
│   │   ├── auth.controller.test.ts
│   │   ├── jornada.controller.test.ts
│   │   ├── localizacao.controller.test.ts
│   │   ├── promotor.controller.test.ts
│   │   └── supervisor.controller.test.ts
│   ├── services/
│   │   ├── auth.service.test.ts
│   │   ├── date.service.test.ts
│   │   ├── jornada.service.test.ts
│   │   ├── localizacao.service.test.ts
│   │   ├── promotor.service.test.ts
│   │   └── supervisor.service.test.ts
├── test-utils/
│   └── mockExpress.ts
```

---

## 🛠️ Ferramentas Utilizadas

- **Jest** – Framework de testes
- **ts-jest** – Integração com TypeScript
- **@types/jest** – Tipagem para o Jest

---

## 📦 Instalação das Dependências de Teste

Execute o comando abaixo na raiz do projeto:

```bash
npm install --save-dev jest ts-jest @types/jest
```

Caso o TypeScript ainda não esteja instalado:

```bash
npm install --save-dev typescript
```

---

## ⚙️ Configuração do Jest

Arquivo `jest.config.js`:

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  clearMocks: true,
};
```

---

## ▶️ Executando os Testes

Para executar **todos os testes unitários**:

```bash
npm test
```

ou

```bash
npx jest
```

---

## 📊 Teste de Cobertura de Código

Para gerar o relatório de cobertura de testes:

```bash
npx jest --coverage
```

Após a execução, será criada a pasta:

```txt
coverage/
```

Dentro dela, abra o arquivo:

```txt
coverage/lcov-report/index.html
```

no navegador para visualizar o relatório completo.

---

## 📈 Métricas de Cobertura

A cobertura gerada inclui:

- Statements
- Branches
- Functions
- Lines

O foco principal está nos **Services**, onde se concentram as regras de negócio.

---

## 🧪 Estratégia de Mock

- Todas as chamadas ao **Supabase** são mockadas
- Nenhuma dependência externa real é utilizada
- Controllers são testados isoladamente, simulando `Request` e `Response`

Isso garante:
- Testes rápidos
- Execução offline
- Resultados previsíveis

---

## ✅ Resultado Esperado

```txt
Test Suites: ALL PASSED
Tests:       ALL PASSED
```

Com relatório de cobertura gerado com sucesso.

---

## 📌 Observações Finais

- Os testes seguem boas práticas de testes unitários
- A estrutura foi mantida simples e objetiva
- O projeto está pronto para avaliação acadêmica e evolução futura

---

📚 *Documento de testes – Projeto Back-Promotor*

