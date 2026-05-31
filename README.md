# LZR Skills

**Um conjunto de instruções para sua IA criar apps e sites com design único e código de nível profissional.**

A maioria dos apps gerados com IA saem iguais: mesmas fontes, mesmas cores, mesmo padrão visual genérico — e o código que os sustenta cheia de atalhos que geram problemas no futuro.

Este repositório resolve isso. Instale uma vez, use em todos os seus projetos.

---

## O que você ganha ao instalar

**Antes:** você pede para sua IA criar uma tela e ela entrega o padrão genérico de sempre.

**Depois:** antes de criar qualquer coisa, a IA faz cinco perguntas sobre o produto — quem usa, o que resolve, que sensação deve provocar. A partir dessas respostas, deriva uma identidade visual única. Nenhum projeto sai igual ao outro.

Além do design:
- O código segue padrões reconhecidos por qualquer desenvolvedor sênior do mercado
- Todo projeto nasce com estrutura de pastas, versionamento e fluxo de trabalho prontos
- Acessibilidade, responsividade e estados de interface (carregando, vazio, erro) são obrigatórios — não opcionais

---

## Compatibilidade

| Ferramenta de IA | Compatível | Como instalar |
|---|---|---|
| **Claude Code** | ✅ Nativo | Ver instruções abaixo |
| **Cursor** | ✅ Manual | Copiar conteúdo como regras de projeto |
| **Windsurf** | ✅ Manual | Copiar conteúdo como regras de projeto |
| **Codex** | ✅ Manual | Copiar conteúdo como contexto de sistema |
| **Gemini CLI** | ✅ Manual | Copiar conteúdo como contexto de sistema |
| **Antigravity** | ✅ Nativo | Ver instruções abaixo |

---

## Instalação

### Claude Code (instalação automática)

**Disponível em todos os seus projetos — recomendado:**
```bash
npx skills add https://github.com/Lizardsstudios/lzr-skills
```

**Só no projeto atual:**
Copie a pasta `skills/` para dentro de `.claude/skills/` no seu projeto.

**Verificar se foi instalado:**
Abra o Claude Code e digite `/origin-design` — se responder, está pronto.

---

### Cursor, Windsurf e outros editores com IA

Essas ferramentas não usam o formato de skill diretamente, mas o conteúdo funciona como regras de projeto.

1. Abra a pasta `skills/origin-design/`
2. Copie o conteúdo do arquivo principal para as regras do seu editor:
   - **Cursor:** cole em `.cursor/rules/design.mdc`
   - **Windsurf:** cole em `.windsurf/rules/design.md`
   - **Outros:** consulte a documentação da sua ferramenta para "project rules" ou "system context"
3. Repita para `skills/lzr-code-standards/`

---

### Antigravity

```bash
/skills add https://github.com/Lizardsstudios/lzr-skills
```

---

## O que está incluído

### `skills/origin-design` — Design de produto único

Ativa quando você pede para criar uma tela, componente ou interface.

**O que faz:**
- Faz 5 perguntas sobre o produto antes de qualquer decisão visual
- Deriva paleta de cores, tipografia e ritmo visual da essência do produto
- Nunca usa fontes ou cores do "padrão genérico de IA"
- Garante que todos os componentes tenham estados definidos: carregando, vazio, erro, sucesso
- Cobre animações, acessibilidade e responsividade com regras específicas

**Para:** apps web, painéis de gestão, ferramentas, plataformas
**Não é para:** landing pages e portfólios

---

### `skills/lzr-code-standards` — Código de nível profissional

Ativa automaticamente em qualquer projeto web.

**O que garante:**
- Busca de dados do servidor sempre com cache — sem recarregamentos desnecessários
- Estrutura de código separada em camadas — interface, lógica, acesso ao banco
- Tokens visuais no código — nunca cores ou tamanhos fixos
- Navegação que sempre leva o usuário de volta para onde ele estava
- Componentes com todos os estados definidos — nunca HTML solto

---

### `skills/new-project` — Criar projeto novo com um comando

Ativa quando você digita `/new-project` ou "novo projeto".

**O que faz:**
1. Pergunta o que estamos criando (app, site, serviço)
2. Faz as 5 perguntas do produto para gerar a identidade visual
3. Cria toda a estrutura de pastas no padrão profissional
4. Configura repositório, ramos de desenvolvimento e fluxo de revisão
5. Entrega o briefing para a skill de design criar a identidade visual do projeto

**Como usar:**
```
/new-project nome-do-projeto web
/new-project nome-do-projeto api
```

---

## Primeiros passos após instalar

1. Abra sua ferramenta de IA em qualquer projeto
2. Digite: `novo projeto` ou `/new-project meu-app web`
3. Responda as perguntas sobre o produto
4. Receba a estrutura completa e a proposta de identidade visual

Ou, se o projeto já existe:
1. Peça para criar uma tela: `"crie a tela de listagem de faturas"`
2. A skill de design vai perguntar sobre o produto antes de criar qualquer coisa

---

## Por que este repositório existe

As skills de design disponíveis no mercado partem de estilos e catálogos. O resultado é sempre um produto que se parece com outro produto.

Este repositório parte do oposto: antes de qualquer decisão visual, entende o produto. A identidade visual que emerge é derivada — não escolhida de uma lista.

O objetivo é que qualquer produto construído com estas instruções possa um dia se tornar a referência, não a cópia.

---

## Licença

MIT — use, modifique e distribua livremente.
