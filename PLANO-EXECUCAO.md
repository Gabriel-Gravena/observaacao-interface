# Plano de Execucao - ObservaAção

## Status

- Fase 1 - Fundação e autenticação: concluida.
- Fase 2 - Base visual autenticada e componentes do dominio: concluida.
- Fase 3 - Fluxo do cidadão: concluida.
- Fase 4 - Fluxo do servidor: concluida.
- Refinamento visual e tema claro/escuro: concluido.
- Fase 5 - Robustez, acessibilidade e validação: concluida.
- Fase 6 - Preparação de entrega e demonstração: concluida.

## 1. Estado Atual

O projeto possui a base de Next.js 16 com App Router, TypeScript, Tailwind CSS v4,
shadcn/ui e tokens visuais do dominio.

Ja existem:

- grupos de rota `app/(auth)`;
- paginas iniciais de login e cadastro;
- um formulario visual inicial de login;
- componentes base do shadcn/ui;
- tokens de status e prioridade em `app/globals.css`;
- documentação da API em `DOCUMENTACAO-API.md`.

O frontend funcional foi implementado. Permanecem como dependencias externas
para a demonstração:

- backend executando e acessivel;
- conta `SERVIDOR` previamente criada;
- categorias ativas cadastradas;
- validação visual manual em navegadores e tamanhos de tela reais.

## 2. Decisoes E Pendencias De Contrato

- Usar um unico cliente Axios em `api/client.ts`, com `withCredentials: true`.
- Nunca armazenar ou manipular o JWT no frontend.
- Usar `GET /auth/me` como fonte de verdade da sessao e da role.
- Respeitar os enums e bodies exatamente como definidos em
  `DOCUMENTACAO-API.md`.
- Derivar os dados do dashboard da fila geral, pois não existe endpoint
  especifico.
- O arquivo solicitado `com/API_FRONTEND.md` não existe no projeto. A referencia
  adotada sera `DOCUMENTACAO-API.md`.
- A consulta por protocolo foi descrita como publica no escopo visual, mas o
  endpoint `GET /solicitacoes/protocolo/{protocolo}` exige autenticação na
  documentação atual. O frontend deve tratar a rota como autenticada ate que o
  contrato do backend seja alterado.
- Axios e React Hook Form estao instalados e integrados.

## 3. Arquitetura Planejada

### API

```txt
api/
  client.ts
  auth.ts
  categorias.ts
  solicitações.ts
  types.ts
```

Responsabilidades:

- `client.ts`: instancia Axios, `withCredentials`, normalização de erros e
  tratamento central de `401`;
- `auth.ts`: cadastro, login, logout e usuário atual;
- `categorias.ts`: CRUD de categorias;
- `solicitações.ts`: criação, listas, detalhes, histórico, atualização, status e
  exclusão;
- `types.ts`: tipos derivados exclusivamente dos contratos documentados.

### Rotas

```txt
app/
  (auth)/
    login/
    register/
    consultar-protocolo/
  (cidadão)/
    cidadão/
      solicitações/
      solicitações/nova/
      solicitações/[id]/
  (servidor)/
    servidor/
      dashboard/
      solicitações/
      solicitações/atrasadas/
      solicitações/[id]/
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
  solicitações/
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

## 4. Fases De Implementação

### Fase 1 - Fundação E Autenticação

- instalar Axios e React Hook Form;
- adicionar componentes shadcn necessarios para formularios, tabelas, dialogs,
  alertas, badges, selects e feedback;
- criar tipos, rotas, constantes e schemas Zod;
- criar o cliente HTTP unico e modulos iniciais da API;
- implementar cadastro, login, logout e consulta de sessao;
- redirecionar por role apos autenticação;
- criar protecao de rotas e tela de acesso negado;
- substituir a pagina inicial padrao por redirecionamento coerente;
- ajustar metadata, idioma e identidade ObservaAção.

**Criterio de conclusao:** cidadão e servidor entram, sao direcionados para suas
areas, podem sair, e `401`/`403` possuem tratamento claro.

### Fase 2 - Base Visual Autenticada E Componentes Do Dominio

- criar layout responsivo com sidebar no desktop e sheet no mobile;
- criar navegação por role;
- implementar badges de status e prioridade;
- implementar exibicao e copia de protocolo;
- implementar estados compartilhados de carregamento, erro e vazio;
- implementar timeline de histórico e confirmação de exclusão;
- criar helpers puros de data, prazo, status e prioridade.

**Criterio de conclusao:** os componentes centrais podem ser reutilizados nas
duas areas sem duplicação de regras visuais ou de dominio.

### Fase 3 - Fluxo Do Cidadão

- implementar "Minhas solicitações" com resumo, filtros locais e lista
  responsiva;
- implementar formulario guiado de nova solicitação;
- carregar somente categorias ativas para abertura;
- forcar e bloquear anonimato ao selecionar categoria sensivel;
- exibir confirmação com protocolo apos criação;
- implementar detalhe com histórico;
- permitir edição e exclusão com confirmação quando aplicavel;
- implementar consulta por protocolo respeitando a autenticação exigida pela
  API.

**Criterio de conclusao:** um cidadão consegue criar conta, abrir uma
solicitação, copiar o protocolo e acompanhar seus detalhes e histórico.

### Fase 4 - Fluxo Do Servidor

- implementar fila geral em tabela densa e responsiva;
- integrar filtros combinados de bairro, categoria, status e prioridade;
- destacar demandas criticas, atrasadas e proximas do prazo;
- implementar pagina de atrasadas;
- implementar dashboard derivado da fila geral;
- implementar detalhe completo;
- permitir apenas o proximo status do fluxo;
- exigir comentario e confirmação para atualizar status;
- recarregar solicitação e timeline apos atualização;
- ocultar identidade em solicitações anonimas;
- implementar CRUD de categorias, sensibilidade e ativação.

**Criterio de conclusao:** um servidor consegue filtrar a fila, abrir uma
demanda, avancar o status com comentario e administrar categorias.

### Fase 5 - Robustez, Acessibilidade E Validação

- revisar validacoes e mensagens de erro da API;
- confirmar estados de carregamento, erro, vazio e sucesso em todas as telas;
- revisar foco, labels, navegação por teclado e contraste;
- validar layouts em desktop e mobile com o Browser;
- validar que textos não se sobrepoem;
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

### Fase 6 - Preparação De Entrega E Demonstração

- consolidar configuração de ambiente;
- disponibilizar roteiro de demonstração dos perfis;
- documentar pre-requisitos e limitacoes do contrato;
- consolidar scripts de validação;
- revisar a ordem recomendada de entrega.

**Criterio de conclusao:** outro desenvolvedor consegue configurar, validar e
demonstrar o frontend usando a documentação do repositorio.

## 5. Ordem Recomendada De Entrega

- [x] Fundação HTTP, tipos, validacoes e autenticação.
- [x] Layout autenticado e componentes compartilhados.
- [x] Criação e acompanhamento de solicitações pelo cidadão.
- [x] Fila e atualização de status pelo servidor.
- [x] Categorias, dashboard e atrasadas.
- [x] Revisao de estados, permissoes, responsividade, lint e build.

Cada etapa deve terminar funcional e integrada antes da seguinte. Isso permite
validar cedo o fluxo principal sem depender de todas as telas administrativas.

Evidencias de fechamento:

- cliente Axios unico com `withCredentials: true`;
- autenticação baseada em `/auth/me` e protecao por role;
- formularios com React Hook Form e Zod;
- fluxos de cidadão e servidor integrados aos contratos documentados;
- estados globais e locais de carregamento, erro e vazio;
- temas claro e escuro;
- scripts `lint`, `typecheck`, `build` e `validate`.

## 6. Matriz De Validação Final

| Area | Validação |
| --- | --- |
| Autenticação | Cookie HTTP-only enviado com `withCredentials`; logout funcional |
| Roles | CIDADAO e SERVIDOR veem apenas rotas e acoes permitidas |
| Formularios | Zod, mensagens proximas, envio bloqueado e feedback |
| Solicitações | Criação, listas, detalhes, histórico, edição e exclusão |
| Status | Apenas proxima etapa permitida, com comentario obrigatorio |
| Anonimato | Categoria sensivel forca anonimato; identidade não aparece |
| Categorias | CRUD, ativação e sensibilidade funcionais |
| Estados | Carregando, erro, vazio, sucesso e confirmacoes presentes |
| Responsividade | Desktop e mobile sem sobreposicoes |
| Qualidade | `npm run lint` e `npm run build` sem erros |

## 7. Fora Do Escopo Sem Alteração Do Backend

- tornar realmente publica a consulta por protocolo;
- criar endpoint dedicado de dashboard;
- alterar regras de permissao ou transicao de status;
- inventar paginação, campos ou respostas não documentadas.
