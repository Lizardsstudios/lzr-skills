---
name: lzr-code-standards
description: Padrões de codificação LZR para apps web e serviços. Carrega automaticamente quando trabalhando em qualquer projeto LZR. Define como buscar dados, como organizar a camada de acesso ao banco, como estruturar componentes e como aplicar o sistema visual em código.
---

# LZR Code Standards

Estes padrões valem para todo projeto LZR com interface web. São regras de como o código deve ser escrito — não opiniões, não preferências. Cada regra existe porque o contrário causou problemas reais.

---

## Regra 1 — Busca de Dados

**Todo dado que vem do servidor usa React Query. Sem exceções.**

Usar `useState` + `useEffect` para carregar dados do servidor está proibido. Esse padrão causa: recarregamento a cada troca de tela, múltiplas requisições para o mesmo dado, sem cache, sem estado de carregamento unificado.

**Correto:**
```tsx
const { data, isLoading, error } = useQuery({
  queryKey: queryKeys.faturas.list(),
  queryFn: () => faturaService.getAll(),
  ...queryConfig.lists,
})
```

**Proibido:**
```tsx
const [faturas, setFaturas] = useState([])
useEffect(() => { faturaService.getAll().then(setFaturas) }, [])
```

**`useState` é permitido apenas para:**
- Estado de interface: modal aberto, aba ativa, filtro local
- Rascunho de formulário antes de salvar
- Estado efêmero: hover, foco, animação

**Toda mutation usa atualização otimista:**
```tsx
const mutation = useMutation({
  mutationFn: (dados) => faturaService.criar(dados),
  onMutate: async (novosDados) => {
    await queryClient.cancelQueries({ queryKey: queryKeys.faturas.list() })
    const anterior = queryClient.getQueryData(queryKeys.faturas.list())
    queryClient.setQueryData(queryKeys.faturas.list(), (antigo) => [...antigo, novosDados])
    return { anterior }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.faturas.list() })
  },
  onError: (_err, _vars, context) => {
    queryClient.setQueryData(queryKeys.faturas.list(), context.anterior)
  },
})
```

**Por quê otimista:** a maioria das ações bem-sucedidas. O usuário vê o resultado imediatamente. Se der erro, o estado reverte. Resultado: interface 300–500ms mais rápida sem nenhuma mudança no servidor.

**Arquivo obrigatório `src/lib/query-keys.ts`:**
```tsx
export const queryKeys = {
  faturas: {
    all: ['faturas'] as const,
    list: () => ['faturas', 'list'],
    detail: (id: string) => ['faturas', id],
  },
}
```

**Tempos de cache por tipo de dado:**

| Tipo | Tempo até revalidar | Tempo até limpar |
|---|---|---|
| Dados estáticos (nome da empresa, configurações) | 10 minutos | 30 minutos |
| Listas (faturas, contratos, usuários) | 2 minutos | 10 minutos |
| Detalhes (uma fatura específica) | 1 minuto | 5 minutos |
| Atividade em tempo real | 30 segundos | 5 minutos |

---

## Regra 2 — Separação de Camadas (Backend)

**A regra de negócio nunca acessa o banco diretamente. Sempre passa por uma interface intermediária.**

Sem essa separação: trocar de banco de dados exige reescrever todo o código que toca dados. Com ela: só o adaptador muda.

**Três camadas obrigatórias:**

**Camada 1 — Interface (o contrato):**
Define o que pode ser feito com um dado. Sem nenhuma dependência de ferramenta específica.
```ts
// packages/types/src/repositories/fatura.ts
export interface FaturaRepository {
  getAll(params?: PaginacaoParams): Promise<ResultadoPaginado<Fatura>>
  getById(id: string): Promise<Fatura | null>
  criar(fatura: FaturaInsert): Promise<Fatura>
  atualizar(id: string, atualizacoes: FaturaUpdate): Promise<Fatura>
  deletar(id: string): Promise<void>
  getEmpresaDonoId(id: string): Promise<string | null>
}
```

**Camada 2 — Adaptador (a implementação):**
Faz o acesso real ao banco. Recebe o cliente por parâmetro — nunca instancia por conta própria.
```ts
// packages/supabase/src/repositories/faturaRepository.ts
export function criarSupabaseFaturaRepository(client: SupabaseClient): FaturaRepository {
  return {
    async getById(id) {
      const { data, error } = await client.from('faturas').select('*').eq('id', id).single()
      if (error) throw error
      return data
    },
    // demais métodos...
  }
}
```

**Camada 3 — Ponto de montagem (onde tudo se conecta):**
Único lugar do código que sabe qual banco está sendo usado.
```ts
// apps/web/src/lib/repositories.ts
import { criarSupabaseRepositories } from '@lzr/supabase/repositories'
import { createClient } from '@/lib/supabase'

export function getRepositories() {
  return criarSupabaseRepositories(createClient())
}
```

**Autorização vive na camada de serviço, nunca no adaptador:**
```ts
async function autorizarAcessoFatura(id: string) {
  const ctx = await getContextoAuth()
  verificarAutenticado(ctx)
  const empresaDonoId = await getRepositories().faturas.getEmpresaDonoId(id)
  if (!empresaDonoId) throw new ErroAutorizacao('NOT_FOUND', 'Fatura não encontrada.')
  verificarMesmaEmpresa(ctx.empresaId, empresaDonoId)
}
```

**Quando aplicar:** todo SaaS multi-empresa com mais de 2 semanas de vida.
**Quando não aplicar:** scripts pontuais, protótipos em validação.

---

## Regra 3 — Tokens Visuais em Código

**Nunca usar cor ou tamanho fixo no código. Sempre usar os tokens do sistema.**

**Proibido:**
```tsx
<div className="bg-[#3b82f6] text-white p-[13px]">
```

**Correto:**
```tsx
<div className="bg-action text-inverse p-s4">
```

**Configuração obrigatória em `tailwind.config.ts`:**
```ts
theme: {
  extend: {
    colors: {
      bg:               'var(--bg)',
      surface:          'var(--surface)',
      'surface-raised': 'var(--surface-raised)',
      border:           'var(--border)',
      'border-strong':  'var(--border-strong)',
      'text-primary':   'var(--text-primary)',
      'text-secondary': 'var(--text-secondary)',
      'text-disabled':  'var(--text-disabled)',
      'text-inverse':   'var(--text-inverse)',
      accent:           'var(--accent)',
      'accent-hover':   'var(--accent-hover)',
      action:           'var(--action)',
      'action-hover':   'var(--action-hover)',
      danger:           'var(--danger)',
      success:          'var(--success)',
    },
    spacing: {
      s1: '4px',
      s2: '8px',
      s3: '12px',
      s4: '16px',
      s5: '24px',
      s6: '32px',
      s7: '48px',
      s8: '64px',
      s9: '96px',
    },
  }
}
```

**Placeholder obrigatoriamente usa `text-placeholder`:**
```tsx
// Proibido — contraste insuficiente (~3:1)
<input className="placeholder:text-text-secondary" />

// Correto — garante 4.5:1 exigido pela acessibilidade
<input className="placeholder:text-text-placeholder" />
```

---

## Regra 4 — Navegação

**Botão de voltar usa sempre o histórico. Nunca uma rota fixa.**

```tsx
// Proibido — leva o usuário para um lugar que talvez não seja de onde ele veio
<button onClick={() => router.push('/dashboard')}>Voltar</button>

// Correto — leva de volta para onde o usuário estava
<button onClick={() => router.back()}>Voltar</button>
```

**Por quê:** o usuário pode ter chegado de qualquer tela — busca, notificação, link direto. Uma rota fixa quebra o fluxo de navegação dele.

`router.push()` é para navegação intencional para frente. `router.back()` é exclusivamente para retroceder.

---

## Regra 5 — Componentes HTML Soltos Proibidos

**O código de aplicação nunca usa elemento HTML solto para UI. Sempre usa o componente do sistema.**

```tsx
// Proibido
<button onClick={salvar}>Salvar</button>
<input type="text" />
<select>...</select>

// Correto
<Button onClick={salvar}>Salvar</Button>
<Input />
<Select>...</Select>
```

**Por quê:** elementos soltos ignoram os estados de foco, loading, disabled e acessibilidade que os componentes do sistema implementam. Cada elemento solto é um componente que não tem todos os estados e falha na acessibilidade.

---

## Regra 6 — Super Admin (SaaS multi-empresa)

Em todo SaaS com múltiplas empresas, super admin é um papel explícito — nunca um usuário sem empresa.

```sql
-- Função de verificação obrigatória
CREATE OR REPLACE FUNCTION is_super_admin_user()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;
```

**Regras fixas:**
- Paulo (`paulo.lucca@lzrtechnologies.com`) e Lucas (`lucas@lzrtechnologies.com`) são super admins em todos os projetos
- Usuário sem empresa e sem papel super admin = bloqueado (não é bug, é segurança)
- Nunca usar `IS NULL OR empresa_id = ...` em políticas de segurança — isso abre acesso cruzado entre empresas

---

## Regra 7 — Zero Tolerância a Erros

Nenhum projeto LZR vai para produção com erros ou alertas pendentes. Isso inclui:
- Erros de tipo (TypeScript)
- Alertas do verificador de código
- Falhas de testes
- Falhas de build
- Alertas de auditoria de design

Se aparecer um erro durante o desenvolvimento — independente de quando foi introduzido — para, corrige, confirma que tudo passa, só então continua.

**Sequência antes de qualquer envio de código:**
1. Verificação de tipos: zero erros
2. Verificação de código: zero alertas
3. Testes: todos passando
4. Build: sem erros

---

## Arquivos de referência

- **DATA-FETCHING.md** — carregue quando precisar de exemplos detalhados de React Query
- **BACKEND-PATTERNS.md** — carregue quando estruturando a camada de acesso a dados
