# Design Tokens

Este projeto usa Tailwind CSS v4 com shadcn/ui. As cores principais ficam em
`app/globals.css` como variaveis CSS, e o `@theme inline` transforma essas
variaveis em classes Tailwind.

Em vez de pensar em cores soltas, pense nos tokens como papeis visuais da
interface.

## Base da aplicacao

Use no fundo geral das telas e no texto principal.

```tsx
<main className="bg-background text-foreground">
  ...
</main>
```

- `background`: fundo geral da aplicacao.
- `foreground`: texto principal sobre o fundo geral.

## Cards, paineis e blocos de conteudo

Use em cards de solicitacao, paineis de dashboard, blocos de formulario e areas
elevadas.

```tsx
<section className="rounded-lg border border-border bg-card p-4 text-card-foreground">
  ...
</section>
```

- `card`: fundo de cards e paineis.
- `card-foreground`: texto dentro de cards e paineis.
- `border`: bordas padrao da interface.

## Acoes principais

Use para a acao mais importante da tela.

Exemplos:

- Entrar
- Abrir solicitacao
- Salvar
- Atualizar status
- Consultar protocolo

```tsx
<Button className="bg-primary text-primary-foreground">
  Abrir solicitacao
</Button>
```

- `primary`: cor institucional principal.
- `primary-foreground`: texto sobre a cor principal.

## Acoes secundarias

Use quando a acao existe, mas nao e a principal.

Exemplos:

- Voltar
- Ver detalhes
- Limpar filtros
- Cancelar uma edicao

```tsx
<Button className="bg-secondary text-secondary-foreground">
  Ver detalhes
</Button>
```

- `secondary`: fundo de acao secundaria.
- `secondary-foreground`: texto sobre fundo secundario.

## Informacoes discretas

Use para descricoes, areas de apoio, textos auxiliares, estados vazios e fundos
neutros.

```tsx
<p className="text-muted-foreground">
  Acompanhe o andamento da sua solicitacao.
</p>
```

```tsx
<div className="rounded-md bg-muted p-3 text-muted-foreground">
  Nenhuma solicitacao encontrada.
</div>
```

- `muted`: fundo neutro discreto.
- `muted-foreground`: texto secundario.

## Destaques leves

Use quando algo precisa chamar atencao sem parecer erro ou alerta grave.

Exemplos:

- Aviso sobre anonimato
- Caixa informativa
- Destaque de protocolo gerado

```tsx
<div className="rounded-md bg-accent p-3 text-accent-foreground">
  Esta categoria exige anonimato para proteger sua identidade.
</div>
```

- `accent`: fundo de destaque leve.
- `accent-foreground`: texto sobre o destaque leve.

## Erros e acoes destrutivas

Use apenas para erro, falha, exclusao ou situacoes realmente criticas.

```tsx
<Button className="bg-destructive text-white">
  Remover categoria
</Button>
```

- `destructive`: cor de erro ou acao destrutiva.

Evite usar vermelho como cor principal da aplicacao. Assim ele continua forte
quando representar erro, atraso ou prioridade critica.

## Bordas, inputs e foco

Esses tokens sao usados por muitos componentes do shadcn/ui.

```tsx
<input className="border border-input focus:ring-ring" />
```

- `border`: bordas padrao.
- `input`: bordas de campos de formulario.
- `ring`: foco de componentes interativos.

## Status da solicitacao

Use esses tokens em badges, tags, timelines e detalhes da solicitacao.

```tsx
<span className="rounded-md bg-status-triage px-2 py-1 text-status-triage-foreground">
  Em triagem
</span>
```

| Status do dominio | Token |
| --- | --- |
| `ABERTO` | `status-open` |
| `TRIAGEM` | `status-triage` |
| `EM_EXECUCAO` | `status-in-progress` |
| `RESOLVIDO` | `status-resolved` |
| `ENCERRADO` | `status-closed` |

Classes disponiveis:

```tsx
bg-status-open text-status-open-foreground
bg-status-triage text-status-triage-foreground
bg-status-in-progress text-status-in-progress-foreground
bg-status-resolved text-status-resolved-foreground
bg-status-closed text-status-closed-foreground
```

## Prioridade da solicitacao

Use esses tokens em badges de prioridade, principalmente nas listas do servidor.

```tsx
<span className="rounded-md bg-priority-critical px-2 py-1 text-priority-critical-foreground">
  Critica
</span>
```

| Prioridade do dominio | Token |
| --- | --- |
| `BAIXA` | `priority-low` |
| `MEDIA` | `priority-medium` |
| `ALTA` | `priority-high` |
| `CRITICA` | `priority-critical` |

Classes disponiveis:

```tsx
bg-priority-low text-priority-low-foreground
bg-priority-medium text-priority-medium-foreground
bg-priority-high text-priority-high-foreground
bg-priority-critical text-priority-critical-foreground
```

## Regra pratica

Status mostra a etapa do processo. Prioridade mostra urgencia.

Uma mesma solicitacao pode ter os dois:

```tsx
<div className="flex gap-2">
  <span className="rounded-md bg-status-triage px-2 py-1 text-status-triage-foreground">
    Em triagem
  </span>

  <span className="rounded-md bg-priority-critical px-2 py-1 text-priority-critical-foreground">
    Critica
  </span>
</div>
```

