# LZR Skills

**Skills para Claude Code que produzem apps de produto com identidade visual única e código world class.**

Estas skills foram construídas para resolver um problema real: a maioria dos apps gerados com IA saem iguais — mesmas fontes, mesmas cores, mesmo padrão genérico. E o código que os sustenta segue os mesmos atalhos que geram dívida técnica.

Este repositório tem uma abordagem diferente.

---

## Filosofia

A identidade visual de um produto deve emergir da essência desse produto — seu propósito, seus usuários, o que ele promete. Não de tendências, não de catálogos, não de referências a outras marcas.

O código deve ser escrito como se qualquer engenheiro sênior do mercado pudesse abrir e não encontrar nada fora do padrão internacional.

---

## Skills disponíveis

### [origin-design](./skills/origin-design/)

Skill de design para apps de produto. Antes de qualquer decisão visual, extrai 5 informações do produto e deriva a identidade a partir delas. Cobre sistema de cores, tipografia, espaçamento, 8 componentes obrigatórios, padrões de UX para apps, animação, acessibilidade e responsividade.

**Para quem:** quem constrói apps web, painéis, ferramentas e plataformas com Claude Code.
**Não é para:** landing pages e portfólios.

### [lzr-code-standards](./skills/lzr-code-standards/)

Padrões de codificação para apps com interface web. Cobre como buscar dados do servidor, como organizar o acesso ao banco, como aplicar o sistema visual em código, navegação, componentes e segurança multi-empresa.

**Para quem:** qualquer projeto web com React e banco de dados.

### [new-project](./skills/new-project/)

Cria um projeto novo completo — estrutura de pastas, repositório, ramos de desenvolvimento, proteção do ramo principal, quadro de tarefas automático — precedido de um wizard que coleta o briefing do produto para a skill de design.

**Como usar:** `/new-project nome-do-projeto tipo`

---

## Como instalar

**Uma skill específica:**
```bash
npx skills add https://github.com/Lizardsstudios/lzr-skills/skills/origin-design
```

**Todas as skills de uma vez:**
```bash
npx skills add https://github.com/Lizardsstudios/lzr-skills
```

**Ou copie manualmente** a pasta da skill para `.claude/skills/` dentro do seu projeto, ou para `~/.claude/skills/` para disponibilizar em todos os projetos.

---

## Como contribuir

Encontrou algo que não funciona como esperado? Tem uma regra que deveria estar aqui?

Abra uma issue descrevendo o problema ou a sugestão. Pull requests com melhorias documentadas são bem-vindos.

---

## Licença

MIT
