# 📘 Regras do Projeto – PromotorApp

## Versão: 1.0  
**Status:** Em elaboração  
**Última atualização:** 01/12/2025  

---

## 1. Introdução
O PromotorApp é composto por duas interfaces:  
- **Web (Supervisor):** Interface administrativa.  
- **Mobile (Promotor):** Interface operacional.  

A API é responsável por fornecer operações seguras, escaláveis e claras para o gerenciamento de promotores, leads e jornadas.

---

## 2. Autenticação
A autenticação será realizada via **Firebase Authentication** utilizando email e senha.

### 2.1 Fluxos suportados:
- **Login de Supervisor:** Acesso administrativo.  
- **Login de Promotor:** Acesso operacional.  
- **Logout:** Finaliza sessão local.  
- **Renovação de token:** Tokens serão validados em cada rota protegida.

---

## 3. Permissões e Papéis
### Papéis:
- **Supervisor:** Usuário administrativo.  
  - Pode realizar: CRUD de promotores, gerenciar leads, visualizar localização, dashboards.  
- **Promotor:** Usuário operacional.  
  - Pode realizar: Cadastrar leads, visualizar seus próprios leads, jornada, enviar localização.

---

## 4. Modelos de Dados
### 4.1 Promotor:
```json
{
  "id": "string",
  "nome": "string",
  "telefone": "string",
  "email": "string",
  "statusJornada": "ativo | inativo",
  "ultimaLocalizacao": {
    "lat": "number",
    "lng": "number",
    "timestamp": "number"
  },
  "criadoEm": "number"
}
```

### 4.2 Lead:
```json
{
  "id": "string",
  "nome": "string",
  "telefone": "string",
  "cpf": "string",
  "criadoPor": "string", // UID do promotor
  "criadoEm": "number"
}
```

### 4.3 Localização:
```json
{
  "idPromotor": "string",
  "latitude": "number",
  "longitude": "number",
  "timestamp": "number"
}
```

### 4.4 Jornada:
```json
{
  "idPromotor": "string",
  "status": "ativo | inativo",
  "inicio": "number",
  "fim": "number"
}
```

### 4.5 Supervisor:
```json
{
  "id": "string", // UID do Firebase
  "nome": "string",
  "email": "string",
  "telefone": "string",
  "role": "supervisor",
  "criadoEm": "number"
}
```

---

## 5. Endpoints da API
### 5.1 Autenticação:
- **POST /auth/login:** Realiza login via Firebase Auth.  
  - Entrada: `{ email, senha }`  
  - Saída: `{ token, uid }`  
- **POST /auth/logout:** Finaliza sessão local.

---

### 5.2 Módulo Supervisor:
#### 5.2.1 Dashboard:
- **GET /supervisor/dashboard:** Retorna informações gerais.  
  - Total de leads, promotores ativos, estatísticas gerais.

#### 5.2.2 Promotores:
- **POST /supervisor/promotores:** Cria um novo promotor.  
  - Entrada: `{ nome, telefone, email, senha }`  
- **GET /supervisor/promotores:** Lista todos os promotores.  
- **GET /supervisor/promotores/:id:** Retorna informações completas de um promotor.  
- **PUT /supervisor/promotores/:id:** Atualiza informações de um promotor.  
- **DELETE /supervisor/promotores/:id:** Exclui um promotor.

#### 5.2.3 Localização:
- **GET /supervisor/promotores/:id/localizacao-atual:** Retorna última posição registrada.  
- **GET /supervisor/promotores/:id/historico-localizacao:** Retorna histórico completo.

#### 5.2.4 Leads:
- **GET /supervisor/leads:** Lista todos os leads.  
- **GET /supervisor/leads/:id:** Retorna detalhes de um lead.  
- **PUT /supervisor/leads/:id:** Atualiza informações de um lead.  
- **DELETE /supervisor/leads/:id:** Exclui um lead.

---

### 5.3 Módulo Promotor:
#### 5.3.1 Jornada:
- **POST /promotor/jornada/iniciar:** Ativa a jornada do promotor.  
- **POST /promotor/jornada/finalizar:** Encerra a jornada.  
- **GET /promotor/jornada/status:** Retorna status atual.

#### 5.3.2 Localização:
- **POST /promotor/localizacao:** Envia localização automaticamente durante jornada.

#### 5.3.3 Leads:
- **POST /promotor/leads:** Cadastra um lead.  
  - Entrada: `{ nome, telefone, cpf }`  
- **GET /promotor/leads:** Lista leads cadastrados pelo promotor.  
- **GET /promotor/leads/:id:** Retorna detalhes de um lead.  
- **PUT /promotor/leads/:id:** Atualiza informações de um lead.  
- **DELETE /promotor/leads/:id:** Exclui um lead.

---

### 5.4 Módulo Supervisor (Administração do Sistema):
#### Endpoints:
- **POST /admin/supervisores:** Cria um novo supervisor.  
  - Entrada: `{ nome, email, telefone, senha }`  
- **GET /admin/supervisores:** Lista todos os supervisores.  
- **GET /admin/supervisores/:id:** Retorna dados de um supervisor específico.  
- **PUT /admin/supervisores/:id:** Atualiza informações de um supervisor.  
- **DELETE /admin/supervisores/:id:** Exclui um supervisor.

#### Regras:
- Apenas supervisores autenticados podem criar novos supervisores.  
- Apenas supervisores podem acessar rotas do módulo supervisor.  
- Um supervisor não pode excluir sua própria conta.

---

## 6. Regras Gerais
- **Timestamp:** Sempre utilize `Date.now()` para criar ou atualizar registros.  
- **Conversão de timestamp:** Utilize `new Date(timestamp)` para converter para data.  
- **Segurança:** Todas as rotas protegidas devem validar tokens do Firebase.  
- **Escalabilidade:** Certifique-se de que os endpoints sejam otimizados para grandes volumes de dados.

---

Este arquivo organiza as regras e diretrizes do projeto PromotorApp, garantindo clareza e suporte para implementação. Caso precise de ajustes ou adições, é só avisar! 😊
