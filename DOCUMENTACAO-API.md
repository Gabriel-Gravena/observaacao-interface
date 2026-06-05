# ObservaAção API - Guia Para o Frontend

Base URL local:

```txt
http://localhost:8080
```

A autenticação usa cookie HTTP-only. O frontend não precisa ler nem salvar JWT manualmente. Depois de `POST /auth/login` ou `POST /auth/register`, o backend envia o cookie `observaação_token`.

No frontend, envie credenciais em todas as chamadas autenticadas:

```js
fetch("http://localhost:8080/auth/me", {
  credentials: "include"
});
```

Com Axios:

```js
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});
```

## Formato dos Enums

Prioridades:

```txt
BAIXA
MEDIA
ALTA
CRITICA
```

Status de solicitação:

```txt
ABERTO
TRIAGEM
EM_EXECUCAO
RESOLVIDO
ENCERRADO
```

Roles:

```txt
CIDADAO
SERVIDOR
```

## Auth

### Criar Conta

```txt
POST http://localhost:8080/auth/register
```

Autenticação: publica.

Body:

```json
{
  "name": "Gabriel",
  "email": "gabriel@email.com",
  "password": "12345678",
  "cpf": "12345678900",
  "telefone": "44999999999"
}
```

Regras:

- `name` obrigatorio.
- `email` obrigatorio e deve ser email valido.
- `password` obrigatorio, minimo 8 caracteres.
- `cpf` opcional, mas se enviado deve ser valido.
- novo usuário sempre nasce como `CIDADAO`.

Retorna: `201 Created`, seta cookie `observaação_token` e retorna o usuário criado.

```json
{
  "id": "uuid",
  "name": "Gabriel",
  "email": "gabriel@email.com",
  "cpf": "12345678900",
  "telefone": "44999999999",
  "role": "CIDADAO",
  "createdAt": "2026-06-04T19:41:42"
}
```

Headers relevantes:

```txt
Set-Cookie: observaação_token=...
Location: http://localhost:8080/user/{id}
```

### Login

```txt
POST http://localhost:8080/auth/login
```

Autenticação: publica.

Body:

```json
{
  "email": "gabriel@email.com",
  "password": "12345678"
}
```

Retorna: `200 OK`, seta cookie `observaação_token` e retorna o usuário autenticado.

```json
{
  "id": "uuid",
  "name": "Gabriel",
  "email": "gabriel@email.com",
  "cpf": "12345678900",
  "telefone": "44999999999",
  "role": "CIDADAO",
  "createdAt": "2026-06-04T19:41:42"
}
```

### Logout

```txt
POST http://localhost:8080/auth/logout
```

Autenticação: autenticada.

Body: não precisa.

Retorna: `204 No Content` e remove o cookie de autenticação.

### Usuário Logado

```txt
GET http://localhost:8080/auth/me
```

Autenticação: autenticada.

Body: não precisa.

Retorna: `200 OK`.

```json
{
  "id": "uuid",
  "name": "Gabriel",
  "email": "gabriel@email.com",
  "cpf": "12345678900",
  "telefone": "44999999999",
  "role": "CIDADAO",
  "createdAt": "2026-06-04T19:41:42"
}
```

## Usuários

### Buscar Usuário Por ID

```txt
GET http://localhost:8080/user/{id}
```

Autenticação: autenticada.

Path:

```txt
id: UUID do usuário
```

Body: não precisa.

Retorna: `200 OK`.

```json
{
  "id": "uuid",
  "name": "Gabriel",
  "email": "gabriel@email.com",
  "cpf": "12345678900",
  "telefone": "44999999999",
  "role": "CIDADAO",
  "createdAt": "2026-06-04T19:41:42"
}
```

## Categorias

### Criar Categoria

```txt
POST http://localhost:8080/categorias
```

Autenticação: `SERVIDOR`.

Body:

```json
{
  "nome": "Iluminação publica",
  "descricao": "Problemas com postes, lampadas e iluminação urbana",
  "sensivel": false,
  "ativa": true
}
```

Observacoes:

- `nome` obrigatorio.
- `sensivel` obrigatorio.
- `ativa` e opcional na criação; a entidade nasce ativa por padrao.

Retorna: `201 Created`.

```json
{
  "id": "uuid",
  "nome": "Iluminação publica",
  "descricao": "Problemas com postes, lampadas e iluminação urbana",
  "sensivel": false,
  "ativa": true,
  "createdAt": "2026-06-04T19:41:42",
  "updatedAt": null
}
```

### Listar Categorias

```txt
GET http://localhost:8080/categorias
```

Autenticação: autenticada.

Body: não precisa.

Retorna: `200 OK`.

```json
[
  {
    "id": "uuid",
    "nome": "Iluminação publica",
    "descricao": "Problemas com postes, lampadas e iluminação urbana",
    "sensivel": false,
    "ativa": true,
    "createdAt": "2026-06-04T19:41:42",
    "updatedAt": null
  }
]
```

### Buscar Categoria Por ID

```txt
GET http://localhost:8080/categorias/{id}
```

Autenticação: autenticada.

Path:

```txt
id: UUID da categoria
```

Retorna: `200 OK`.

```json
{
  "id": "uuid",
  "nome": "Iluminação publica",
  "descricao": "Problemas com postes, lampadas e iluminação urbana",
  "sensivel": false,
  "ativa": true,
  "createdAt": "2026-06-04T19:41:42",
  "updatedAt": null
}
```

### Atualizar Categoria

```txt
PUT http://localhost:8080/categorias/{id}
```

Autenticação: `SERVIDOR`.

Path:

```txt
id: UUID da categoria
```

Body:

```json
{
  "nome": "Denuncia de irregularidade",
  "descricao": "Relatos sensiveis sobre irregularidades",
  "sensivel": true,
  "ativa": true
}
```

Retorna: `200 OK`.

### Remover Categoria

```txt
DELETE http://localhost:8080/categorias/{id}
```

Autenticação: `SERVIDOR`.

Path:

```txt
id: UUID da categoria
```

Body: não precisa.

Retorna: `204 No Content`.

## Solicitações

### Abrir Solicitação

```txt
POST http://localhost:8080/solicitacoes
```

Autenticação: autenticada.

Body:

```json
{
  "titulo": "Poste apagado",
  "descricao": "Poste sem iluminação ha 3 dias",
  "bairro": "Centro",
  "endereco": "Rua A, 123",
  "prioridade": "MEDIA",
  "anonima": false,
  "categoriaId": "uuid-da-categoria"
}
```

Regras:

- `titulo`, `descricao`, `bairro`, `prioridade`, `anonima` e `categoriaId` sao obrigatorios.
- `endereco` e opcional.
- se a categoria for sensivel, a solicitação fica anonima mesmo que `anonima` seja `false`.
- o usuário da solicitação e obtido pelo cookie de autenticação.

Retorna: `201 Created`.

```json
{
  "id": "uuid",
  "protocolo": "OBS-2026-AB12CD34",
  "titulo": "Poste apagado",
  "descricao": "Poste sem iluminação ha 3 dias",
  "bairro": "Centro",
  "endereco": "Rua A, 123",
  "status": "ABERTO",
  "prioridade": "MEDIA",
  "anonima": false,
  "categoriaId": "uuid-da-categoria",
  "categoriaNome": "Iluminação publica",
  "cidadãoId": "uuid-do-usuário",
  "cidadãoNome": "Gabriel",
  "prazoAlvo": "2026-06-14T19:41:42",
  "createdAt": "2026-06-04T19:41:42",
  "updatedAt": null
}
```

### Listar Fila Geral

```txt
GET http://localhost:8080/solicitacoes
```

Autenticação: `SERVIDOR`.

Query params opcionais:

```txt
bairro: string
categoriaId: UUID
status: ABERTO | TRIAGEM | EM_EXECUCAO | RESOLVIDO | ENCERRADO
prioridade: BAIXA | MEDIA | ALTA | CRITICA
```

Exemplos:

```txt
GET /solicitacoes?bairro=Centro
GET /solicitacoes?status=ABERTO&prioridade=ALTA
GET /solicitacoes?categoriaId=uuid&bairro=Centro
```

Body: não precisa.

Retorna: `200 OK`, lista de solicitações.

### Listar Minhas Solicitações

```txt
GET http://localhost:8080/solicitacoes/minhas
```

Autenticação: autenticada.

Body: não precisa.

Retorna: `200 OK`, lista de solicitações do usuário logado.

### Listar Solicitações Atrasadas

```txt
GET http://localhost:8080/solicitacoes/atrasadas
```

Autenticação: `SERVIDOR`.

Body: não precisa.

Retorna: `200 OK`, lista de solicitações atrasadas.

### Consultar Por Protocolo

```txt
GET http://localhost:8080/solicitacoes/protocolo/{protocolo}
```

Autenticação: autenticada.

Path:

```txt
protocolo: protocolo publico da solicitação
```

Exemplo:

```txt
GET /solicitacoes/protocolo/OBS-2026-AB12CD34
```

Body: não precisa.

Retorna: `200 OK`, uma solicitação.

### Buscar Solicitação Por ID

```txt
GET http://localhost:8080/solicitacoes/{id}
```

Autenticação: autenticada.

Path:

```txt
id: UUID da solicitação
```

Regra de acesso:

- `SERVIDOR` pode ver qualquer solicitação.
- `CIDADAO` so pode ver solicitações dele.

Retorna: `200 OK`, uma solicitação.

### Atualizar Solicitação

```txt
PUT http://localhost:8080/solicitacoes/{id}
```

Autenticação: autenticada.

Path:

```txt
id: UUID da solicitação
```

Regra de acesso:

- `SERVIDOR` pode atualizar qualquer solicitação.
- `CIDADAO` so pode atualizar solicitações dele.

Body:

```json
{
  "titulo": "Poste apagado",
  "descricao": "Poste continua sem iluminação",
  "bairro": "Centro",
  "endereco": "Rua A, 123",
  "prioridade": "ALTA",
  "anonima": false,
  "categoriaId": "uuid-da-categoria"
}
```

Retorna: `200 OK`, solicitação atualizada.

### Atualizar Status

```txt
PATCH http://localhost:8080/solicitacoes/{id}/status
```

Autenticação: `SERVIDOR`.

Path:

```txt
id: UUID da solicitação
```

Body:

```json
{
  "status": "TRIAGEM",
  "comentario": "Solicitação encaminhada para triagem"
}
```

Regras:

- `status` obrigatorio.
- `comentario` obrigatorio.
- fluxo permitido: `ABERTO -> TRIAGEM -> EM_EXECUCAO -> RESOLVIDO -> ENCERRADO`.

Retorna: `200 OK`, solicitação atualizada.

### Histórico Da Solicitação

```txt
GET http://localhost:8080/solicitacoes/{id}/histórico
```

Autenticação: autenticada.

Path:

```txt
id: UUID da solicitação
```

Regra de acesso:

- `SERVIDOR` pode ver qualquer histórico.
- `CIDADAO` so pode ver histórico de solicitações dele.

Retorna: `200 OK`.

```json
[
  {
    "id": "uuid",
    "solicitaçãoId": "uuid-da-solicitação",
    "statusAnterior": null,
    "statusNovo": "ABERTO",
    "comentario": "Solicitação aberta",
    "servidorId": null,
    "servidorNome": null,
    "createdAt": "2026-06-04T19:41:42"
  }
]
```

### Remover Solicitação

```txt
DELETE http://localhost:8080/solicitacoes/{id}
```

Autenticação: autenticada.

Path:

```txt
id: UUID da solicitação
```

Regra de acesso:

- `SERVIDOR` pode remover qualquer solicitação.
- `CIDADAO` so pode remover solicitações dele.

Body: não precisa.

Retorna: `204 No Content`.

## Históricos Status

### Listar Históricos

```txt
GET http://localhost:8080/históricos-status
```

Autenticação: autenticada.

Body: não precisa.

Retorna: `200 OK`, lista de históricos.

### Buscar Histórico Por ID

```txt
GET http://localhost:8080/históricos-status/{id}
```

Autenticação: autenticada.

Path:

```txt
id: UUID do histórico
```

Retorna: `200 OK`.

```json
{
  "id": "uuid",
  "solicitaçãoId": "uuid-da-solicitação",
  "statusAnterior": "ABERTO",
  "statusNovo": "TRIAGEM",
  "comentario": "Solicitação encaminhada para triagem",
  "servidorId": "uuid-do-servidor",
  "servidorNome": "Servidor",
  "createdAt": "2026-06-04T19:41:42"
}
```

### Remover Histórico

```txt
DELETE http://localhost:8080/históricos-status/{id}
```

Autenticação: autenticada.

Path:

```txt
id: UUID do histórico
```

Body: não precisa.

Retorna: `204 No Content`.

## Common

### Listar Prioridades

```txt
GET http://localhost:8080/common/prioridades
```

Autenticação: publica.

Retorna:

```json
["BAIXA", "MEDIA", "ALTA", "CRITICA"]
```

### Listar Status De Solicitação

```txt
GET http://localhost:8080/common/status-solicitação
```

Autenticação: publica.

Retorna:

```json
["ABERTO", "TRIAGEM", "EM_EXECUCAO", "RESOLVIDO", "ENCERRADO"]
```

### Listar Roles

```txt
GET http://localhost:8080/common/roles
```

Autenticação: publica.

Retorna:

```json
["CIDADAO", "SERVIDOR"]
```

## Observacoes Para o Frontend

- O token JWT fica em cookie HTTP-only, entao o frontend não deve tentar ler o token.
- Todas as chamadas autenticadas devem usar `credentials: "include"` ou `withCredentials: true`.
- Se uma solicitação for anonima, `cidadãoNome` retorna `null`.
- Se a categoria for sensivel, o backend forca `anonima: true`.
- Erros atualmente podem retornar mensagens simples vindas de excecoes do backend.
