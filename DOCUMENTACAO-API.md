# ObservaAcao API - Guia Para o Frontend

Base URL local:

```txt
http://localhost:8080
```

A autenticacao usa cookie HTTP-only. O frontend nao precisa ler nem salvar JWT manualmente. Depois de `POST /auth/login` ou `POST /auth/register`, o backend envia o cookie `observaacao_token`.

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

Status de solicitacao:

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

Autenticacao: publica.

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
- novo usuario sempre nasce como `CIDADAO`.

Retorna: `201 Created`, seta cookie `observaacao_token` e retorna o usuario criado.

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
Set-Cookie: observaacao_token=...
Location: http://localhost:8080/user/{id}
```

### Login

```txt
POST http://localhost:8080/auth/login
```

Autenticacao: publica.

Body:

```json
{
  "email": "gabriel@email.com",
  "password": "12345678"
}
```

Retorna: `200 OK`, seta cookie `observaacao_token` e retorna o usuario autenticado.

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

Autenticacao: autenticada.

Body: nao precisa.

Retorna: `204 No Content` e remove o cookie de autenticacao.

### Usuario Logado

```txt
GET http://localhost:8080/auth/me
```

Autenticacao: autenticada.

Body: nao precisa.

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

## Usuarios

### Buscar Usuario Por ID

```txt
GET http://localhost:8080/user/{id}
```

Autenticacao: autenticada.

Path:

```txt
id: UUID do usuario
```

Body: nao precisa.

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

Autenticacao: `SERVIDOR`.

Body:

```json
{
  "nome": "Iluminacao publica",
  "descricao": "Problemas com postes, lampadas e iluminacao urbana",
  "sensivel": false,
  "ativa": true
}
```

Observacoes:

- `nome` obrigatorio.
- `sensivel` obrigatorio.
- `ativa` e opcional na criacao; a entidade nasce ativa por padrao.

Retorna: `201 Created`.

```json
{
  "id": "uuid",
  "nome": "Iluminacao publica",
  "descricao": "Problemas com postes, lampadas e iluminacao urbana",
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

Autenticacao: autenticada.

Body: nao precisa.

Retorna: `200 OK`.

```json
[
  {
    "id": "uuid",
    "nome": "Iluminacao publica",
    "descricao": "Problemas com postes, lampadas e iluminacao urbana",
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

Autenticacao: autenticada.

Path:

```txt
id: UUID da categoria
```

Retorna: `200 OK`.

```json
{
  "id": "uuid",
  "nome": "Iluminacao publica",
  "descricao": "Problemas com postes, lampadas e iluminacao urbana",
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

Autenticacao: `SERVIDOR`.

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

Autenticacao: `SERVIDOR`.

Path:

```txt
id: UUID da categoria
```

Body: nao precisa.

Retorna: `204 No Content`.

## Solicitacoes

### Abrir Solicitacao

```txt
POST http://localhost:8080/solicitacoes
```

Autenticacao: autenticada.

Body:

```json
{
  "titulo": "Poste apagado",
  "descricao": "Poste sem iluminacao ha 3 dias",
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
- se a categoria for sensivel, a solicitacao fica anonima mesmo que `anonima` seja `false`.
- o usuario da solicitacao e obtido pelo cookie de autenticacao.

Retorna: `201 Created`.

```json
{
  "id": "uuid",
  "protocolo": "OBS-2026-AB12CD34",
  "titulo": "Poste apagado",
  "descricao": "Poste sem iluminacao ha 3 dias",
  "bairro": "Centro",
  "endereco": "Rua A, 123",
  "status": "ABERTO",
  "prioridade": "MEDIA",
  "anonima": false,
  "categoriaId": "uuid-da-categoria",
  "categoriaNome": "Iluminacao publica",
  "cidadaoId": "uuid-do-usuario",
  "cidadaoNome": "Gabriel",
  "prazoAlvo": "2026-06-14T19:41:42",
  "createdAt": "2026-06-04T19:41:42",
  "updatedAt": null
}
```

### Listar Fila Geral

```txt
GET http://localhost:8080/solicitacoes
```

Autenticacao: `SERVIDOR`.

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

Body: nao precisa.

Retorna: `200 OK`, lista de solicitacoes.

### Listar Minhas Solicitacoes

```txt
GET http://localhost:8080/solicitacoes/minhas
```

Autenticacao: autenticada.

Body: nao precisa.

Retorna: `200 OK`, lista de solicitacoes do usuario logado.

### Listar Solicitacoes Atrasadas

```txt
GET http://localhost:8080/solicitacoes/atrasadas
```

Autenticacao: `SERVIDOR`.

Body: nao precisa.

Retorna: `200 OK`, lista de solicitacoes atrasadas.

### Consultar Por Protocolo

```txt
GET http://localhost:8080/solicitacoes/protocolo/{protocolo}
```

Autenticacao: autenticada.

Path:

```txt
protocolo: protocolo publico da solicitacao
```

Exemplo:

```txt
GET /solicitacoes/protocolo/OBS-2026-AB12CD34
```

Body: nao precisa.

Retorna: `200 OK`, uma solicitacao.

### Buscar Solicitacao Por ID

```txt
GET http://localhost:8080/solicitacoes/{id}
```

Autenticacao: autenticada.

Path:

```txt
id: UUID da solicitacao
```

Regra de acesso:

- `SERVIDOR` pode ver qualquer solicitacao.
- `CIDADAO` so pode ver solicitacoes dele.

Retorna: `200 OK`, uma solicitacao.

### Atualizar Solicitacao

```txt
PUT http://localhost:8080/solicitacoes/{id}
```

Autenticacao: autenticada.

Path:

```txt
id: UUID da solicitacao
```

Regra de acesso:

- `SERVIDOR` pode atualizar qualquer solicitacao.
- `CIDADAO` so pode atualizar solicitacoes dele.

Body:

```json
{
  "titulo": "Poste apagado",
  "descricao": "Poste continua sem iluminacao",
  "bairro": "Centro",
  "endereco": "Rua A, 123",
  "prioridade": "ALTA",
  "anonima": false,
  "categoriaId": "uuid-da-categoria"
}
```

Retorna: `200 OK`, solicitacao atualizada.

### Atualizar Status

```txt
PATCH http://localhost:8080/solicitacoes/{id}/status
```

Autenticacao: `SERVIDOR`.

Path:

```txt
id: UUID da solicitacao
```

Body:

```json
{
  "status": "TRIAGEM",
  "comentario": "Solicitacao encaminhada para triagem"
}
```

Regras:

- `status` obrigatorio.
- `comentario` obrigatorio.
- fluxo permitido: `ABERTO -> TRIAGEM -> EM_EXECUCAO -> RESOLVIDO -> ENCERRADO`.

Retorna: `200 OK`, solicitacao atualizada.

### Historico Da Solicitacao

```txt
GET http://localhost:8080/solicitacoes/{id}/historico
```

Autenticacao: autenticada.

Path:

```txt
id: UUID da solicitacao
```

Regra de acesso:

- `SERVIDOR` pode ver qualquer historico.
- `CIDADAO` so pode ver historico de solicitacoes dele.

Retorna: `200 OK`.

```json
[
  {
    "id": "uuid",
    "solicitacaoId": "uuid-da-solicitacao",
    "statusAnterior": null,
    "statusNovo": "ABERTO",
    "comentario": "Solicitacao aberta",
    "servidorId": null,
    "servidorNome": null,
    "createdAt": "2026-06-04T19:41:42"
  }
]
```

### Remover Solicitacao

```txt
DELETE http://localhost:8080/solicitacoes/{id}
```

Autenticacao: autenticada.

Path:

```txt
id: UUID da solicitacao
```

Regra de acesso:

- `SERVIDOR` pode remover qualquer solicitacao.
- `CIDADAO` so pode remover solicitacoes dele.

Body: nao precisa.

Retorna: `204 No Content`.

## Historicos Status

### Listar Historicos

```txt
GET http://localhost:8080/historicos-status
```

Autenticacao: autenticada.

Body: nao precisa.

Retorna: `200 OK`, lista de historicos.

### Buscar Historico Por ID

```txt
GET http://localhost:8080/historicos-status/{id}
```

Autenticacao: autenticada.

Path:

```txt
id: UUID do historico
```

Retorna: `200 OK`.

```json
{
  "id": "uuid",
  "solicitacaoId": "uuid-da-solicitacao",
  "statusAnterior": "ABERTO",
  "statusNovo": "TRIAGEM",
  "comentario": "Solicitacao encaminhada para triagem",
  "servidorId": "uuid-do-servidor",
  "servidorNome": "Servidor",
  "createdAt": "2026-06-04T19:41:42"
}
```

### Remover Historico

```txt
DELETE http://localhost:8080/historicos-status/{id}
```

Autenticacao: autenticada.

Path:

```txt
id: UUID do historico
```

Body: nao precisa.

Retorna: `204 No Content`.

## Common

### Listar Prioridades

```txt
GET http://localhost:8080/common/prioridades
```

Autenticacao: publica.

Retorna:

```json
["BAIXA", "MEDIA", "ALTA", "CRITICA"]
```

### Listar Status De Solicitacao

```txt
GET http://localhost:8080/common/status-solicitacao
```

Autenticacao: publica.

Retorna:

```json
["ABERTO", "TRIAGEM", "EM_EXECUCAO", "RESOLVIDO", "ENCERRADO"]
```

### Listar Roles

```txt
GET http://localhost:8080/common/roles
```

Autenticacao: publica.

Retorna:

```json
["CIDADAO", "SERVIDOR"]
```

## Observacoes Para o Frontend

- O token JWT fica em cookie HTTP-only, entao o frontend nao deve tentar ler o token.
- Todas as chamadas autenticadas devem usar `credentials: "include"` ou `withCredentials: true`.
- Se uma solicitacao for anonima, `cidadaoNome` retorna `null`.
- Se a categoria for sensivel, o backend forca `anonima: true`.
- Erros atualmente podem retornar mensagens simples vindas de excecoes do backend.
