# Casos de Uso - Checklist de Saúde Preventiva

## Atores

- **Usuário**: Pessoa que utiliza o sistema para gerenciar sua saúde preventiva
- **Sistema**: Aplicação web (frontend + backend)

## Casos de Uso Principais

### UC01 - Cadastrar Informações Pessoais

**Ator Principal**: Usuário  
**Objetivo**: Registrar dados pessoais e de saúde no sistema

**Pré-condições**: 
- Sistema disponível
- Navegador com acesso à internet

**Fluxo Principal**:
1. Usuário acessa a página inicial
2. Usuário clica em "Cadastrar Informações"
3. Sistema exibe formulário de cadastro
4. Usuário preenche:
   - Nome completo
   - E-mail
   - Idade
   - Sexo
   - Histórico de saúde (opcional)
5. Usuário clica em "Cadastrar e Gerar Checklist"
6. Sistema valida os dados
7. Sistema cria o usuário
8. Sistema gera checklist personalizado
9. Sistema redireciona para visualização do checklist

**Fluxo Alternativo 1 - Dados Inválidos**:
6a. Sistema detecta dados inválidos
6b. Sistema exibe mensagem de erro
6c. Retorna ao passo 4

**Fluxo Alternativo 2 - E-mail Já Cadastrado**:
7a. Sistema detecta e-mail já existente
7b. Sistema exibe mensagem de erro
7c. Retorna ao passo 4

**Pós-condições**: 
- Usuário cadastrado no sistema
- Checklist gerado e salvo

---

### UC02 - Gerar Checklist Personalizado

**Ator Principal**: Sistema (automático)  
**Objetivo**: Criar lista de exames e consultas baseada no perfil do usuário

**Pré-condições**: 
- Usuário cadastrado com dados válidos

**Fluxo Principal**:
1. Sistema recebe dados do usuário
2. Sistema analisa idade
3. Sistema analisa sexo
4. Sistema analisa histórico de saúde
5. Sistema aplica regras de recomendação:
   - Adiciona exames por faixa etária
   - Adiciona exames específicos por sexo
   - Adiciona exames por condições de saúde
6. Sistema define prioridades (alta, média, baixa)
7. Sistema define frequências recomendadas
8. Sistema categoriza os itens
9. Sistema salva checklist no banco de dados
10. Sistema retorna checklist gerado

**Regras de Negócio**:
- RN01: Idade >= 18 anos → Hemograma completo anual
- RN02: Idade >= 40 anos → Glicemia e perfil lipídico
- RN03: Idade >= 50 anos → Colonoscopia
- RN04: Mulheres >= 25 anos → Papanicolau anual
- RN05: Mulheres >= 40 anos → Mamografia anual
- RN06: Homens >= 45 anos → PSA anual
- RN07: Diabetes → Hemoglobina glicada trimestral
- RN08: Hipertensão → Monitoramento mensal de PA

**Pós-condições**: 
- Checklist personalizado criado e salvo

---

### UC03 - Exibir Checklist

**Ator Principal**: Usuário  
**Objetivo**: Visualizar lista de exames e consultas recomendadas

**Pré-condições**: 
- Usuário cadastrado
- Checklist gerado

**Fluxo Principal**:
1. Usuário acessa "Meu Checklist"
2. Sistema carrega checklist do usuário
3. Sistema organiza itens por categoria
4. Sistema calcula progresso geral
5. Sistema exibe:
   - Barra de progresso
   - Itens agrupados por categoria
   - Prioridade de cada item
   - Frequência recomendada
   - Status de conclusão
6. Usuário visualiza as recomendações

**Fluxo Alternativo - Checklist Não Encontrado**:
2a. Sistema não encontra checklist
2b. Sistema cria novo checklist automaticamente
2c. Continua do passo 3

**Pós-condições**: 
- Usuário visualiza suas recomendações de saúde

---

### UC04 - Adicionar Lembretes

**Ator Principal**: Usuário  
**Objetivo**: Criar lembretes para exames ou consultas

**Pré-condições**: 
- Usuário cadastrado
- Checklist existente

**Fluxo Principal**:
1. Usuário acessa "Lembretes"
2. Usuário clica em "Adicionar Lembrete" (+)
3. Sistema exibe formulário de lembrete
4. Usuário preenche:
   - Seleciona item do checklist
   - Define título
   - Adiciona descrição (opcional)
   - Define data
   - Marca como recorrente (opcional)
5. Usuário clica em "Criar Lembrete"
6. Sistema valida os dados
7. Sistema salva o lembrete
8. Sistema exibe mensagem de sucesso
9. Sistema atualiza lista de lembretes

**Fluxo Alternativo - Dados Incompletos**:
6a. Sistema detecta campos obrigatórios vazios
6b. Sistema exibe mensagem de erro
6c. Retorna ao passo 4

**Pós-condições**: 
- Lembrete criado e ativo

---

### UC05 - Atualizar Checklist

**Ator Principal**: Usuário  
**Objetivo**: Marcar exames como concluídos

**Pré-condições**: 
- Usuário cadastrado
- Checklist existente

**Fluxo Principal**:
1. Usuário visualiza checklist
2. Usuário marca/desmarca checkbox de um item
3. Sistema atualiza status do item
4. Sistema registra data da última atualização
5. Sistema recalcula progresso geral
6. Sistema exibe feedback visual (toast)
7. Sistema atualiza interface

**Pós-condições**: 
- Item do checklist atualizado
- Progresso recalculado

---

### UC06 - Receber Notificações

**Ator Principal**: Sistema  
**Objetivo**: Notificar usuário sobre lembretes pendentes

**Pré-condições**: 
- Lembretes ativos cadastrados
- Data do lembrete chegou

**Fluxo Principal**:
1. Sistema verifica lembretes ativos
2. Sistema identifica lembretes para hoje
3. Sistema exibe notificação visual
4. Usuário visualiza lembrete

**Fluxo Alternativo - Lembrete Recorrente**:
4a. Sistema identifica lembrete como recorrente
4b. Sistema agenda próxima notificação

**Pós-condições**: 
- Usuário notificado

---

### UC07 - Atualizar Informações Pessoais

**Ator Principal**: Usuário  
**Objetivo**: Modificar dados cadastrais

**Pré-condições**: 
- Usuário cadastrado

**Fluxo Principal**:
1. Usuário acessa "Atualizar Dados"
2. Sistema carrega dados atuais
3. Sistema preenche formulário
4. Usuário modifica informações desejadas
5. Usuário clica em "Atualizar Dados"
6. Sistema valida os dados
7. Sistema atualiza informações do usuário
8. Sistema exibe mensagem de sucesso
9. Sistema retorna para página inicial

**Fluxo Alternativo - Regenerar Checklist**:
9a. Usuário acessa checklist
9b. Usuário clica em "Regenerar"
9c. Sistema confirma ação
9d. Sistema gera novo checklist baseado em dados atualizados
9e. Sistema substitui checklist anterior

**Pós-condições**: 
- Dados do usuário atualizados
- Checklist pode ser regenerado

---

## Diagrama de Interação

```
┌─────────────────────────────────────────────┐
│     Checklist Saúde Preventiva              │
├─────────────────────────────────────────────┤
│ (1) Cadastrar Informações Pessoais          │
│ (2) Gerar Checklist Personalizado           │
│ (3) Exibir Checklist                        │
│ (4) Adicionar Lembretes                     │
│ (5) Atualizar Checklist                     │
│ (6) Receber Notificações                    │
└─────────────────────────────────────────────┘
         ↑             ↑              ↑
         │             │              │
     ┌───┴───┐    ┌────┴────┐   ┌────┴────┐
     │       │    │         │   │         │
     │Usuário│    │ Sistema │   │ Sistema │
     │       │    │         │   │         │
     └───────┘    └─────────┘   └─────────┘
  Interage com   Processa dados  Envia lembretes
    o sistema
```

## Matriz de Rastreabilidade

| Caso de Uso | Requisitos Atendidos |
|-------------|---------------------|
| UC01 | R01, R08 |
| UC02 | R02, R03 |
| UC03 | R04, R08 |
| UC04 | R05, R08 |
| UC05 | R06, R08 |
| UC06 | R05, R06 |
| UC07 | R01, R06, R08 |

## Priorização

### Alta Prioridade
- UC01 - Cadastrar Informações
- UC02 - Gerar Checklist
- UC03 - Exibir Checklist

### Média Prioridade
- UC04 - Adicionar Lembretes
- UC05 - Atualizar Checklist

### Baixa Prioridade
- UC06 - Receber Notificações
- UC07 - Atualizar Informações

## Métricas de Sucesso

- Taxa de cadastros concluídos
- Número de checklists gerados
- Taxa de itens marcados como concluídos
- Número de lembretes criados
- Engajamento do usuário (retorno ao sistema)
