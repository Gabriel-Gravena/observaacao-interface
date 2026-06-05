# ObservaAcao Frontend

Frontend da plataforma municipal de acompanhamento e gestao de solicitacoes
publicas.

## Requisitos

- Node.js compativel com Next.js 16;
- backend ObservaAcao executando em `http://localhost:8080`.

## Configuracao

Por padrao, o frontend usa:

```txt
http://localhost:8080
```

Para alterar a URL da API, defina:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

O arquivo `.env.example` contem a configuracao de referencia.

A autenticacao utiliza cookie HTTP-only enviado pela API. O frontend nao
armazena tokens.

## Execucao

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Qualidade

```bash
npm run lint
npm run typecheck
npm run build
```

Para executar todas as verificacoes:

```bash
npm run validate
```

## Documentacao

- `DOCUMENTACAO-API.md`: contratos do backend;
- `DESIGN_TOKENS.md`: tokens e regras visuais;
- `PLANO-EXECUCAO.md`: fases e decisoes de implementacao.
- `ENTREGA-DEMO.md`: pre-requisitos e roteiro de demonstracao.
