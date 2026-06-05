# Entrega E Demonstracao - ObservaAcao

## Pre-Requisitos

- frontend em `http://localhost:3000`;
- backend em `http://localhost:8080`;
- CORS do backend permitindo `http://localhost:3000` com credenciais;
- uma conta `SERVIDOR` previamente criada no backend;
- ao menos uma categoria ativa para abertura de solicitacoes.

## Preparacao

```bash
npm install
npm run validate
npm run dev
```

Use `.env.example` como referencia para configurar a URL da API.

## Roteiro Do Cidadao

1. Acessar `/register` e criar uma conta.
2. Confirmar o redirecionamento para `/cidadao/solicitacoes`.
3. Abrir uma nova solicitacao.
4. Selecionar uma categoria sensivel e confirmar o anonimato obrigatorio.
5. Copiar o protocolo exibido apos a criacao.
6. Abrir os detalhes e conferir o historico.
7. Editar a solicitacao.
8. Consultar a solicitacao pelo protocolo.

## Roteiro Do Servidor

1. Entrar com uma conta `SERVIDOR`.
2. Conferir os indicadores do dashboard.
3. Filtrar a fila por bairro, categoria, status e prioridade.
4. Abrir o detalhe de uma solicitacao.
5. Confirmar que solicitacoes anonimas nao exibem o nome do cidadao.
6. Atualizar para o proximo status com comentario.
7. Conferir a timeline atualizada.
8. Criar, editar, ativar, desativar e excluir uma categoria.

## Validacoes De Interface

- alternar entre tema claro e escuro pelo menu de perfil;
- validar sidebar no desktop e menu lateral no celular;
- confirmar estados de carregamento, erro e vazio;
- confirmar dialogs de exclusao e atualizacao de status;
- confirmar que login invalido permanece na pagina de login;
- confirmar que rotas de outra role exibem acesso negado.

## Limitacoes De Contrato

- o cadastro publico cria apenas usuarios `CIDADAO`;
- a consulta por protocolo exige autenticacao na API atual;
- o dashboard e derivado da fila geral;
- nao existe paginacao documentada para as listagens.
