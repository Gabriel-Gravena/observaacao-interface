# Plano de Execucao - ObservaAcao

## Status

- Fase 1 - Fundacao e autenticacao: concluida.
- Fase 2 - Base visual autenticada e componentes do dominio: concluida.
- Fase 3 - Fluxo do cidadao: concluida.
- Fase 4 - Fluxo do servidor: concluida.
- Refinamento visual e tema claro/escuro: concluido.
- Fase 5 - Robustez, acessibilidade e validacao: concluida.
- Fase 6 - Preparacao de entrega e demonstracao: concluida.

## 1. Estado Atual

O projeto possui a base de Next.js 16 com App Router, TypeScript, Tailwind CSS v4,
shadcn/ui e tokens visuais do dominio.

Ja existem:

- grupos de rota `app/(auth)`;
- paginas iniciais de login e cadastro;
- um formulario visual inicial de login;
- componentes base do shadcn/ui;
- tokens de status e prioridade em `app/globals.css`;
- documentacao da API em `DOCUMENTACAO-API.md`.

O frontend funcional foi implementado. Permanecem como dependencias externas
para a demonstracao:

- backend executando e acessivel;
- conta `SERVIDOR` previamente criada;
- categorias ativas cadastradas;
- validacao visual manual em navegadores e tamanhos de tela reais.

## 2. Decisoes E Pendencias De Contrato

- Usar um unico cliente Axios em `api/client.ts`, com `withCredentials: true`.
- Nunca armazenar ou manipular o JWT no frontend.
- Usar `GET /auth/me` como fonte de verdade da sessao e da role.
- Respeitar os enums e bodies exatamente como definidos em
  `DOCUMENTACAO-API.md`.
- Derivar os dados do dashboard da fila geral, pois nao existe endpoint
  especifico.
- O arquivo solicitado `com/API_FRONTEND.md` nao existe no projeto. A referencia
  adotada sera `DOCUMENTACAO-API.md`.
- A consulta por protocolo foi descrita como publica no escopo visual, mas o
  endpoint `GET /solicitacoes/protocolo/{protocolo}` exige autenticacao na
  documentacao atual. O frontend deve tratar a rota como autenticada ate que o
  contrato do backend seja alterado.
- Axios e React Hook Form estao instalados e integrados.

## 3. Arquitetura Planejada

### API

```txt
api/
  client.ts
  auth.ts
  categorias.ts
  solicitacoes.ts
  types.ts
```

Responsabilidades:

- `client.ts`: instancia Axios, `withCredentials`, normalizacao de erros e
  tratamento central de `401`;
- `auth.ts`: cadastro, login, logout e usuario atual;
- `categorias.ts`: CRUD de categorias;
- `solicitacoes.ts`: criacao, listas, detalhes, historico, atualizacao, status e
  exclusao;
- `types.ts`: tipos derivados exclusivamente dos contratos documentados.

### Rotas

```txt
app/
  (auth)/
    login/
    register/
    consultar-protocolo/
  (cidadao)/
    cidadao/
      solicitacoes/
      solicitacoes/nova/
      solicitacoes/[id]/
  (servidor)/
    servidor/
      dashboard/
      solicitacoes/
      solicitacoes/atrasadas/
      solicitacoes/[id]/
      categorias/
  acesso-negado/
```

Os layouts autenticados devem compartilhar a estrutura visual, mas montar menus
e acoes conforme a role.

### Componentes De Dominio

```txt
components/features/
  auth/
  layout/
  solicitacoes/
    status-badge.tsx
    priority-badge.tsx
    protocol-display.tsx
    request-history-timeline.tsx
    request-table.tsx
    request-filters.tsx
    request-list.tsx
    request-form.tsx
    request-details.tsx
    update-status-dialog.tsx
  categorias/
    category-form-dialog.tsx
    category-table.tsx
  servidor/
    dashboard-summary.tsx
  shared/
    empty-state.tsx
    error-state.tsx
    confirm-delete-dialog.tsx
```

### Infraestrutura Compartilhada

```txt
helpers/
  format-date.ts
  format-protocol.ts
  request-status.ts
  request-priority.ts
  request-deadline.ts
lib/
  constants.ts
  routes.ts
  validations/
hooks/
  use-auth.ts
  use-categorias.ts
  use-solicitacoes.ts
```

Hooks serao criados somente quando a mesma logica de estado remoto for usada em
mais de um componente.

## 4. Fases De Implementacao

### Fase 1 - Fundacao E Autenticacao

- instalar Axios e React Hook Form;
- adicionar componentes shadcn necessarios para formularios, tabelas, dialogs,
  alertas, badges, selects e feedback;
- criar tipos, rotas, constantes e schemas Zod;
- criar o cliente HTTP unico e modulos iniciais da API;
- implementar cadastro, login, logout e consulta de sessao;
- redirecionar por role apos autenticacao;
- criar protecao de rotas e tela de acesso negado;
- substituir a pagina inicial padrao por redirecionamento coerente;
- ajustar metadata, idioma e identidade ObservaAcao.

**Criterio de conclusao:** cidadao e servidor entram, sao direcionados para suas
areas, podem sair, e `401`/`403` possuem tratamento claro.

### Fase 2 - Base Visual Autenticada E Componentes Do Dominio

- criar layout responsivo com sidebar no desktop e sheet no mobile;
- criar navegacao por role;
- implementar badges de status e prioridade;
- implementar exibicao e copia de protocolo;
- implementar estados compartilhados de carregamento, erro e vazio;
- implementar timeline de historico e confirmacao de exclusao;
- criar helpers puros de data, prazo, status e prioridade.

**Criterio de conclusao:** os componentes centrais podem ser reutilizados nas
duas areas sem duplicacao de regras visuais ou de dominio.

### Fase 3 - Fluxo Do Cidadao

- implementar "Minhas solicitacoes" com resumo, filtros locais e lista
  responsiva;
- implementar formulario guiado de nova solicitacao;
- carregar somente categorias ativas para abertura;
- forcar e bloquear anonimato ao selecionar categoria sensivel;
- exibir confirmacao com protocolo apos criacao;
- implementar detalhe com historico;
- permitir edicao e exclusao com confirmacao quando aplicavel;
- implementar consulta por protocolo respeitando a autenticacao exigida pela
  API.

**Criterio de conclusao:** um cidadao consegue criar conta, abrir uma
solicitacao, copiar o protocolo e acompanhar seus detalhes e historico.

### Fase 4 - Fluxo Do Servidor

- implementar fila geral em tabela densa e responsiva;
- integrar filtros combinados de bairro, categoria, status e prioridade;
- destacar demandas criticas, atrasadas e proximas do prazo;
- implementar pagina de atrasadas;
- implementar dashboard derivado da fila geral;
- implementar detalhe completo;
- permitir apenas o proximo status do fluxo;
- exigir comentario e confirmacao para atualizar status;
- recarregar solicitacao e timeline apos atualizacao;
- ocultar identidade em solicitacoes anonimas;
- implementar CRUD de categorias, sensibilidade e ativacao.

**Criterio de conclusao:** um servidor consegue filtrar a fila, abrir uma
demanda, avancar o status com comentario e administrar categorias.

### Fase 5 - Robustez, Acessibilidade E Validacao

- revisar validacoes e mensagens de erro da API;
- confirmar estados de carregamento, erro, vazio e sucesso em todas as telas;
- revisar foco, labels, navegacao por teclado e contraste;
- validar layouts em desktop e mobile com o Browser;
- validar que textos nao se sobrepoem;
- validar envio de cookies em chamadas autenticadas;
- validar permissoes e ausencia de acoes indevidas por role;
- executar `npm run lint` e `npm run build`;
- corrigir todos os erros encontrados.

**Criterio de conclusao:** os dez passos do fluxo demonstravel funcionam de ponta
a ponta, sem erros de lint/build e com interfaces utilizaveis em desktop e
mobile.

### Refinamento Visual E Temas

- elevar a hierarquia visual sem descaracterizar o servico publico;
- adicionar tema claro e escuro com preferencia persistida;
- transformar o rodape da sidebar em menu compacto de perfil;
- disponibilizar troca de tema e logout no menu de perfil;
- melhorar paineis, tabelas, espacamentos, sombras e fundos institucionais.

**Criterio de conclusao:** a interface possui acabamento consistente, permanece
discreta e funcional e oferece temas claro e escuro.

### Fase 6 - Preparacao De Entrega E Demonstracao

- consolidar configuracao de ambiente;
- disponibilizar roteiro de demonstracao dos perfis;
- documentar pre-requisitos e limitacoes do contrato;
- consolidar scripts de validacao;
- revisar a ordem recomendada de entrega.

**Criterio de conclusao:** outro desenvolvedor consegue configurar, validar e
demonstrar o frontend usando a documentacao do repositorio.

## 5. Ordem Recomendada De Entrega

- [x] Fundacao HTTP, tipos, validacoes e autenticacao.
- [x] Layout autenticado e componentes compartilhados.
- [x] Criacao e acompanhamento de solicitacoes pelo cidadao.
- [x] Fila e atualizacao de status pelo servidor.
- [x] Categorias, dashboard e atrasadas.
- [x] Revisao de estados, permissoes, responsividade, lint e build.

Cada etapa deve terminar funcional e integrada antes da seguinte. Isso permite
validar cedo o fluxo principal sem depender de todas as telas administrativas.

Evidencias de fechamento:

- cliente Axios unico com `withCredentials: true`;
- autenticacao baseada em `/auth/me` e protecao por role;
- formularios com React Hook Form e Zod;
- fluxos de cidadao e servidor integrados aos contratos documentados;
- estados globais e locais de carregamento, erro e vazio;
- temas claro e escuro;
- scripts `lint`, `typecheck`, `build` e `validate`.

## 6. Matriz De Validacao Final

| Area | Validacao |
| --- | --- |
| Autenticacao | Cookie HTTP-only enviado com `withCredentials`; logout funcional |
| Roles | CIDADAO e SERVIDOR veem apenas rotas e acoes permitidas |
| Formularios | Zod, mensagens proximas, envio bloqueado e feedback |
| Solicitacoes | Criacao, listas, detalhes, historico, edicao e exclusao |
| Status | Apenas proxima etapa permitida, com comentario obrigatorio |
| Anonimato | Categoria sensivel forca anonimato; identidade nao aparece |
| Categorias | CRUD, ativacao e sensibilidade funcionais |
| Estados | Carregando, erro, vazio, sucesso e confirmacoes presentes |
| Responsividade | Desktop e mobile sem sobreposicoes |
| Qualidade | `npm run lint` e `npm run build` sem erros |

## 7. Fora Do Escopo Sem Alteracao Do Backend

- tornar realmente publica a consulta por protocolo;
- criar endpoint dedicado de dashboard;
- alterar regras de permissao ou transicao de status;
- inventar paginacao, campos ou respostas nao documentadas.
