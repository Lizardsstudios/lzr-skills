---
name: new-project
description: Cria um novo projeto LZR a partir dos templates oficiais (web ou api). Uso /new-project <nome> <tipo>
command: new-project
---

# New Project — Criador de Projetos LZR

## Princípio

Esta skill é uma **camada fina** sobre os templates oficiais da LZR Technologies. Ela **não inventa convenções** nem **corrige bugs do template** — executa só o que varia por projeto:

- Personalizações com valor específico (nome, slug, cores)
- Configurações que só podem existir após o repo ser criado (branches, branch protection)
- Registro de MCPs por projeto (Supabase project_ref)

Se um template está incompleto ou tem bug, **a skill não compensa**: o fix vai no template, e todo projeto novo herda automaticamente.

## Fontes de verdade

| Fonte | URL | Versão atual |
|---|---|---|
| Template Web | https://github.com/LZR-Tech/lzr-template-web-next | — |
| Template API | https://github.com/LZR-Tech/lzr-template-api-node | — |
| Configs compartilhadas | https://github.com/LZR-Tech/lzr-shared-config | — |
| Workflows CI/CD | https://github.com/LZR-Tech/lzr-github-ops | — |
| Engineering Handbook | https://code.lzrtechnologies.com | v2.2 |
| Design System | https://design.lzrtechnologies.com | v1.3 |

A versão do Handbook que vale para um projeto é a que estiver **no `CLAUDE.md` do template no momento do clone**. Não cunhe versões novas dentro da skill.

## Uso

```
/new-project <nome-do-projeto> <tipo>
```

### Tipos disponíveis

| Tipo  | Template                          | Stack base (definida no template)                  |
| ----- | --------------------------------- | -------------------------------------------------- |
| `api` | `LZR-Tech/lzr-template-api-node`  | Fastify + Zod + Pino + TypeScript                  |
| `web` | `LZR-Tech/lzr-template-web-next`  | Next.js + React + Tailwind + React Query + Zod    |

### Exemplos

```
/new-project mindtube web
/new-project bluecopilot-api api
```

## Convenções herdadas dos templates (não impostas pela skill)

- **Package manager**: `npm` (templates documentam npm em README e CI)
- **Branch default do template**: `main` (a skill cria `develop` para projetos privados, ver passo 4)
- **Husky**: hooks ativos (pre-commit, commit-msg, pre-push) — vêm do template via `prepare: husky`
- **CI**: configurado em `.github/workflows/ci.yml` apontando para `LZR-Tech/lzr-github-ops/.github/workflows/ci.yml@main`
- **ESLint, Prettier, TSConfig, Commitlint**: herdados de `LZR-Tech/lzr-shared-config`
- **CODEOWNERS + PR template**: vêm do template

## Wizard de Produto (OBRIGATÓRIO antes de qualquer passo técnico)

O wizard coleta o briefing do produto. Sem ele, o projeto nasce com estrutura técnica correta mas identidade visual genérica. O wizard é o que diferencia um projeto com personalidade de um projeto padrão.

Execute as perguntas abaixo **uma de cada vez**, na ordem. Nunca dispare todas de uma vez — o usuário precisa pensar em cada resposta separadamente.

### Pergunta 0 — O que vamos criar?

Apresentar as opções:
- App web (plataforma, ferramenta, painel de gestão)
- Site (institucional, landing page, blog)
- App mobile
- Serviço de fundo (automação, agente, integração — sem interface)
- Combinação (descrever)

**Se for "serviço de fundo":** pular as perguntas 1 a 5. Ir diretamente ao fluxo técnico — serviços não têm interface e a skill de design não se aplica.

**Para todos os outros:** continuar com as perguntas abaixo.

### Pergunta 1 — Propósito real

"O que este produto resolve, em uma frase? Não marketing — o que ele faz de verdade para quem usa."

Exemplo de resposta ruim: "Uma plataforma que conecta pessoas e gera valor."
Exemplo de resposta boa: "Elimina o processo manual de exportar dados entre dois sistemas que os clientes usam todo dia."

Se a resposta vier em linguagem de marketing, pedir para reformular com a real função.

### Pergunta 2 — Usuário

"Quem vai usar? Me diz: nível técnico (leigo / intermediário / especialista), com que frequência (todo dia / às vezes / uma vez só), e como essa pessoa chega no app — com pressa, com calma, com ansiedade?"

Essa resposta determina a densidade visual, a saturação das cores e a velocidade das animações.

### Pergunta 3 — A ação principal

"Qual é a coisa que o usuário vai fazer mais vezes? Não a mais impressionante — a mais repetida."

Essa resposta determina o que fica no caminho mais curto da interface.

### Pergunta 4 — O diferencial

"O que este produto faz que nenhum concorrente direto faz? E isso precisa aparecer visualmente na tela, ou é algo que acontece por baixo?"

### Pergunta 5 — Sensação

"Como o app deve fazer o usuário se sentir: confiante? Calmo? Rápido? Em controle? Animado? Qual palavra descreve melhor?"

### Após as 5 respostas

1. Apresentar um resumo do briefing para Paulo confirmar em uma linha.
2. Com a confirmação, seguir para as perguntas técnicas (nome, organização, visibilidade).
3. Após concluir todos os passos técnicos (1 a 13), apresentar o briefing completo para a skill **origin-design** com o seguinte texto:

```
Briefing do produto para a skill origin-design:

Tipo: [resposta 0]
Propósito: [resposta 1]
Usuário: [resposta 2]
Ação principal: [resposta 3]
Diferencial: [resposta 4]
Sensação desejada: [resposta 5]

Com base neste briefing, proponha a identidade visual do projeto seguindo as regras da skill origin-design. Derive a paleta, a tipografia, o tom e a densidade a partir deste produto — não de referências externas.
```

---

## Fluxo de execução

### 1. Validar parâmetros

- `<nome>`: kebab-case — regex `^[a-z][a-z0-9-]+$`
- `<tipo>`: `api` ou `web`
- Se algum estiver faltando ou inválido, perguntar ao usuário com as opções disponíveis.

### 2. Perguntar ao usuário

| Pergunta              | Default                                       |
| --------------------- | --------------------------------------------- |
| Organização GitHub    | `LZR-Tech` (ou `BluePilot-lzr`, ou outra)     |
| Visibilidade          | `private` (recomendado para produto LZR)      |
| Diretório local pai   | perguntar (ex.: `C:/lzr-technologies/lzr-tech`) |

### 3. Criar repositório a partir do template

```bash
unset GITHUB_TOKEN
"C:/Program Files/GitHub CLI/gh.exe" repo create <org>/<nome> \
  --template LZR-Tech/<template-repo> \
  --<public|private> \
  --clone

cd <diretório-local-pai>/<nome>
```

Onde `<template-repo>` é:

- `lzr-template-api-node` para `api`
- `lzr-template-web-next` para `web`

### 4. Criar branch `develop` (apenas projetos privados)

Para **projeto privado** (produto LZR), criar `develop` a partir de `main` e definir como default:

```bash
git checkout -b develop
git push -u origin develop

unset GITHUB_TOKEN
"C:/Program Files/GitHub CLI/gh.exe" api repos/<org>/<nome> \
  -X PATCH -f default_branch=develop
```

Para **projeto público** (template, lib, tool): pular este passo, manter só `main`.

### 5. Configurar branch protection na `main`

⚠️ **Branch protection em repos PRIVADOS exige plano pago no GitHub**:

| Tipo de conta | Plano Free | Plano pago necessário |
|---|---|---|
| **Conta de usuário** (`LZR-Tech` é exemplo) | ❌ Bloqueado em privados | GitHub Pro ($4/mês) |
| **Organização** (`BluePilot-lzr` é exemplo) | ❌ Bloqueado em privados | GitHub Team ($4/seat/mês) |
| Qualquer conta | ✅ Funciona em públicos | já incluso |

**Detectar plano antes de tentar — se não suporta, pular com aviso:**

```bash
# Para org:
plan=$(gh api "orgs/<org>" --jq '.plan.name' 2>/dev/null || echo "user")
# Se conta-usuário: gh api "users/<user>" não retorna plan; assumir free a menos que confirmado

if [ "$plan" = "team" ] || [ "$plan" = "enterprise" ]; then
  # Plano paga branch protection em privados → ativar
  gh api "repos/<org>/<nome>/branches/main/protection" -X PUT --input - <<EOF
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "block_creations": false
}
EOF

  # Repetir para 'develop' se foi criada (passo 4)
  # ...

  echo "✅ Branch protection ativada em main (e develop, se aplicável)"
else
  echo "⚠️ Plano '$plan' não suporta branch protection em privados."
  echo "   Repo público → protection ativada normalmente."
  echo "   Repo privado → confiar em CODEOWNERS + Husky pre-push hook (camadas grátis)."
fi
```

**Estado atual conhecido das contas LZR (atualizar quando mudar):**

| Conta | Plano | Cobertura branch protection |
|---|---|---|
| `BluePilot-lzr` (org) | **Team** | ✅ todos os repos privados protegidos |
| `LZR-Tech` (conta-usuário) | Free | ❌ só repos públicos protegidos |

> Para repo público (templates, libs): protection sempre disponível, ativar mesmo no Free.

> Se quiser exigir CI verde antes de merge (recomendado quando o CI estiver estável), trocar `"required_status_checks": null` por `"required_status_checks": {"strict": true, "contexts": ["quality"]}`.

### 5.5. Criar GitHub Project v2 + Project Router (board automático)

Cada produto LZR ganha **um GitHub Project v2** que serve como board kanban. O workflow `project-router` (em `lzr-github-ops/.github/workflows/project-router.yml@main`) cuida do resto:
- Coluna pessoal por coder (criada **dinamicamente** quando alguém abre uma issue pela 1ª vez)
- Movimentação automática: backlog pessoal → `Em andamento` → `Para revisão` → `Feito`

Os templates já trazem `.github/workflows/project-router.yml` com placeholders `__PROJECT_OWNER__` e `__PROJECT_NUMBER__` que esta skill substitui.

```bash
# Criar Project v2
unset GITHUB_TOKEN
"C:/Program Files/GitHub CLI/gh.exe" project create --owner <org> --title "<nome>"

# Capturar o número do Project recém-criado (último da lista do owner)
PROJECT_NUMBER=$("C:/Program Files/GitHub CLI/gh.exe" project list --owner <org> --format json \
  --jq ".projects | sort_by(.number) | last | .number")

# Pegar o ID do Status field (já vem com Todo/In Progress/Done por padrão)
STATUS_FIELD_ID=$("C:/Program Files/GitHub CLI/gh.exe" api graphql -f query='
  query($owner: String!, $number: Int!) {
    user(login: $owner) {
      projectV2(number: $number) {
        field(name: "Status") { ... on ProjectV2SingleSelectField { id } }
      }
    }
  }' -f owner="<org>" -F number="$PROJECT_NUMBER" --jq '.data.user.projectV2.field.id')

# Substituir as opções padrão pelas convenções pt-BR.
# As colunas pessoais (LZR-Tech, lucas, ...) nascem dinamicamente quando o
# workflow project-router roda no primeiro evento de issue de cada coder.
"C:/Program Files/GitHub CLI/gh.exe" api graphql -f query='
  mutation($fieldId: ID!) {
    updateProjectV2Field(input: {
      fieldId: $fieldId
      singleSelectOptions: [
        { name: "Em andamento", color: YELLOW, description: "" }
        { name: "Para revisão", color: PURPLE, description: "" }
        { name: "Feito", color: GREEN, description: "" }
      ]
    }) { projectV2Field { ... on ProjectV2SingleSelectField { id } } }
  }' -f fieldId="$STATUS_FIELD_ID"

# Linkar o repo ao Project (auto-add quando issues são criadas)
"C:/Program Files/GitHub CLI/gh.exe" project link "$PROJECT_NUMBER" \
  --owner <org> --repo <org>/<nome>

# Salvar o PAT do dev como secret do repo, pra Action poder acessar Project v2
# (GITHUB_TOKEN default não tem escopo project — esse PAT precisa ter `project` + `repo`)
"C:/Program Files/GitHub CLI/gh.exe" auth token | \
  "C:/Program Files/GitHub CLI/gh.exe" secret set LZR_PROJECT_TOKEN --repo <org>/<nome>

# Substituir placeholders do workflow trazido pelo template
sed -i "s/__PROJECT_OWNER__/<org>/g" .github/workflows/project-router.yml
sed -i "s/__PROJECT_NUMBER__/$PROJECT_NUMBER/g" .github/workflows/project-router.yml
```

**Verificações antes de seguir:**
- `gh auth status` deve listar o escopo `project` (rodar `gh auth refresh -s project` se faltar).
- O secret `LZR_PROJECT_TOKEN` aparece em `gh secret list --repo <org>/<nome>`.
- O workflow `.github/workflows/project-router.yml` não tem mais nenhum `__PLACEHOLDER__`.

> **Quando NÃO criar Project**: para repos públicos de infra (template, lib, tool de governança), não faz sentido ter board kanban próprio. Pular este passo inteiro nesse caso e remover `.github/workflows/project-router.yml` (não vai funcionar sem Project linkado).

### 6. Instalar dependências

```bash
npm install
```

> Isso aciona o script `prepare: husky` automaticamente. Os 3 hooks (`pre-commit`, `commit-msg`, `pre-push`) ficam ativos a partir daí.

### 7. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Avisar o usuário para preencher `.env.local` com credenciais reais antes de rodar `npm run dev`.

### 8. Personalização básica

- Atualizar campo `name` no `package.json` para `<nome>`.
- Atualizar a 1ª linha do `README.md` para `# <nome>`.

### 9. Personalização Design System (apenas `web`)

Apenas se `<tipo>` for `web`:

- Substituir `__PRODUCT_SLUG__` no `CLAUDE.md`:

  ```bash
  sed -i "s/__PRODUCT_SLUG__/<nome>/g" CLAUDE.md
  ```

- Em `src/app/layout.tsx`:
  - Adicionar `data-product="<nome>"` no elemento `<html>`.
  - Atualizar `metadata.title` para o nome do projeto.

- Buscar tokens em `https://design.lzrtechnologies.com/<nome>`:
  1. Tentar fetch da página.
  2. Se existir, copiar as CSS variables (light + dark) para `src/styles/globals.css`.
  3. Se não existir, avisar:
     > A página `design.lzrtechnologies.com/<nome>` ainda não existe. Crie a sub-página primeiro ou edite `src/styles/globals.css` manualmente.

Pular este passo inteiro se `<tipo>` for `api`.

### 10. Estrutura de migrations Supabase (se aplicável)

Detecção: `.env.local` contém `NEXT_PUBLIC_SUPABASE_URL` ou `SUPABASE_URL` (mesmo com placeholder vazio).

Criar a estrutura mínima de migrations (não substitui supabase CLI; é só placeholder pra forçar convenção desde o início):

```bash
mkdir -p supabase/migrations
```

Criar `supabase/migrations/0001_initial.sql` com placeholder:

```sql
-- Migration: 0001_initial
-- Created: <YYYY-MM-DD>
-- Project: <nome>

-- Why: primeira migration criada via /new-project. Substituir o conteúdo
-- pelo schema inicial real (extensões, schemas, tabelas base, RLS).
-- Convenção LZR: numeração 4 dígitos (0001, 0002, ...) + nome em snake_case.

-- Exemplo (remover quando criar schema real):
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

Se `.env.local` não tiver Supabase URL, pular este passo.

### 11. Configurar Supabase MCP no `~/.claude.json` (se URL preenchida)

Verificar `.env.local`. Se `NEXT_PUBLIC_SUPABASE_URL` ou `SUPABASE_URL` tiver valor preenchido (não vazio), extrair `project_ref` (subdomínio):

```
NEXT_PUBLIC_SUPABASE_URL=https://abc123xyz.supabase.co
                                ^^^^^^^^^ project_ref
```

Antes de editar, **fazer backup**:

```bash
cp ~/.claude.json ~/.claude.json.bak-$(date +%Y%m%d-%H%M%S)
```

Adicionar entrada em `~/.claude.json` em `projects["<diretório-absoluto>"]`:

```json
{
  "<diretório-absoluto>": {
    "allowedTools": [],
    "mcpContextUris": [],
    "mcpServers": {
      "supabase-<nome>": {
        "type": "http",
        "url": "https://mcp.supabase.com/mcp?project_ref=<project_ref>"
      }
    },
    "enabledMcpjsonServers": [],
    "disabledMcpjsonServers": [],
    "hasTrustDialogAccepted": false,
    "projectOnboardingSeenCount": 0,
    "hasClaudeMdExternalIncludesApproved": false,
    "hasClaudeMdExternalIncludesWarningShown": false
  }
}
```

**Validar JSON** depois:

```bash
node -e "JSON.parse(require('fs').readFileSync(process.env.USERPROFILE + '/.claude.json', 'utf8')); console.log('JSON valido')"
```

Se `.env.local` não tiver URL preenchida, pular este passo e avisar:

> Supabase MCP não foi registrado — `.env.local` não tem `*_SUPABASE_URL` preenchido. Quando configurar, rode esta skill novamente OU adicione manualmente no `~/.claude.json`.

### 12. Commit inicial

```bash
# Branch atual: develop em projeto privado, main em público
BRANCH=$(git rev-parse --abbrev-ref HEAD)

git add -A
git commit -m "chore: inicializa projeto <nome> a partir do template <tipo>"
git push origin "$BRANCH"
```

> A skill **não roda** `npm run typecheck/lint/test/build` antes do commit. Os templates podem ainda ter bugs conhecidos (resolução de imports do `lzr-shared-config` via `github:` deps). Quando o `lzr-shared-config` for publicado limpo (sem subpath gambiarra), o gate zero-warnings pode ser endurecido aqui.

### 13. Confirmação ao usuário

```
Projeto <nome> criado.

Local:           <diretório-local>
GitHub:          https://github.com/<org>/<nome>
Template:        <tipo>
Visibilidade:    <privado|público>
Branch default:  <develop|main>
Branch protect:  main (require 1 PR review)
Husky hooks:     ativos (pre-commit, commit-msg, pre-push)
Project board:   https://github.com/users/<org>/projects/<N> (auto-roteamento ativo)
Project secret:  LZR_PROJECT_TOKEN configurado
Supabase MCP:    <configurado: supabase-<nome> | não configurado>
Migrations:      <supabase/migrations/0001_initial.sql criada | não aplicável>

Próximos passos:
1. cd <diretório-local>
2. Edite .env.local com credenciais reais
3. npm run dev
4. Acesse http://localhost:3000 (web) ou http://localhost:3000/api/v1/health (api)

Design System (web): https://design.lzrtechnologies.com/<nome>
  → Se a página ainda não existe, crie a sub-página antes de continuar.
```

## Quando NÃO usar branch `develop`

Pra **projetos públicos** (templates, libs, tools de governança), trabalhe direto em feature branches → PR para `main`. Não crie `develop` — esses repos não têm "produção" separada de "integração".

## Notas importantes

- O `gh` CLI deve estar instalado e autenticado: `gh auth status`.
- Se `GITHUB_TOKEN` estiver setado no env, fazer `unset GITHUB_TOKEN` antes (token global pode conflitar com auth da org).
- Sempre usar caminho completo do `gh` no Windows: `"C:/Program Files/GitHub CLI/gh.exe"`.
- Branch protection é **grátis** em qualquer plano GitHub (Free incluído) para as features que esta skill ativa.
- A skill **não corrige bugs do template**. Se um projeto novo apresentar erros (build, lint, typecheck), o caminho correto é abrir um PR no próprio template, não compensar dentro da skill.
- O passo 5.5 (Project Router) requer PAT com escopo `project` + `repo`. Se `gh auth status` não listar `project`, rodar `gh auth refresh -s project` antes de invocar a skill.
