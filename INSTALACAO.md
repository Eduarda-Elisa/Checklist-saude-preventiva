# Guia de Instalação e Execução

Este documento contém instruções detalhadas para instalar e executar o projeto Checklist de Saúde Preventiva.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior): [Download Node.js](https://nodejs.org/)
- **npm** (geralmente vem com Node.js)
- Um editor de código (recomendado: Visual Studio Code)

## Passo 1: Instalação do Backend

1. Abra o PowerShell ou terminal
2. Navegue até a pasta do backend:

```powershell
cd c:\Projects\checklist-saude-preventiva\backend
```

3. Instale as dependências:

```powershell
npm install
```

4. Inicie o servidor:

```powershell
npm start
```

Você deverá ver a mensagem: `Servidor rodando na porta 3000`

**Deixe este terminal aberto com o servidor rodando!**

## Passo 2: Instalação do Frontend

1. Abra um **novo terminal** (PowerShell)
2. Navegue até a pasta do frontend:

```powershell
cd c:\Projects\checklist-saude-preventiva\frontend
```

3. Instale as dependências:

```powershell
npm install
```

4. Inicie a aplicação:

```powershell
npm start
```

A aplicação será aberta automaticamente no navegador em `http://localhost:4200`

## Passo 3: Usando o Sistema

### 3.1 Primeira Vez - Cadastro

1. Na página inicial, clique em **"Cadastrar Informações"**
2. Preencha seus dados:
   - Nome completo
   - E-mail
   - Idade
   - Sexo
   - Histórico de saúde (opcional)
3. Clique em **"Cadastrar e Gerar Checklist"**

### 3.2 Visualizar Checklist

Após o cadastro, você será redirecionado para o checklist personalizado onde poderá:
- Ver todos os exames e consultas recomendados
- Marcar itens como concluídos
- Ver o progresso geral
- Regenerar o checklist (botão de refresh no canto superior direito)

### 3.3 Gerenciar Lembretes

1. Na página do checklist, clique em **"Gerenciar Lembretes"**
2. Clique no botão **"+"** no canto superior direito
3. Preencha:
   - Selecione um item do checklist
   - Título do lembrete
   - Descrição (opcional)
   - Data
   - Marque se é recorrente
4. Clique em **"Criar Lembrete"**

### 3.4 Atualizar Dados

1. Na página inicial, clique em **"Atualizar Dados"**
2. Modifique as informações necessárias
3. Clique em **"Atualizar Dados"**
4. Volte ao checklist e clique no botão de refresh para regenerar baseado nos novos dados

## Comandos Úteis

### Backend

```powershell
cd backend
npm start          # Iniciar servidor
npm run dev        # Iniciar com nodemon (reinicia automaticamente)
```

### Frontend

```powershell
cd frontend
npm start          # Iniciar aplicação
npm run build      # Build para produção
```

## Portas Utilizadas

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:4200

## Solução de Problemas

### Erro: "Porta já em uso"

Se a porta 3000 ou 4200 já estiver em uso:

**Para backend (porta 3000):**
```powershell
$PORT=3001 npm start
```

**Para frontend (porta 4200):**
O Angular CLI irá sugerir automaticamente outra porta.

### Erro: "npm não é reconhecido"

Reinstale o Node.js e certifique-se de adicionar ao PATH durante a instalação.

### Erro ao instalar dependências

Tente limpar o cache do npm:

```powershell
npm cache clean --force
npm install
```

## Testando a API (Opcional)

Você pode testar a API diretamente usando PowerShell ou ferramentas como Postman:

### Criar um usuário:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name":"João Silva","email":"joao@email.com","age":35,"sex":"masculino","healthHistory":["diabetes"]}'
```

### Ver status da API:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method GET
```

## Estrutura de Dados

### Banco de Dados (JSON)

Os dados são salvos em: `backend/database/db.json`

Este arquivo contém:
- Usuários cadastrados
- Checklists gerados
- Lembretes criados

## Recursos do Sistema

### Páginas Disponíveis

1. **Home** (`/home`)
   - Página inicial
   - Apresentação do sistema
   - Acesso rápido às funcionalidades

2. **Cadastro** (`/cadastro`)
   - Formulário de cadastro/atualização
   - Coleta de informações de saúde

3. **Checklist** (`/checklist`)
   - Visualização do checklist personalizado
   - Marcação de itens concluídos
   - Barra de progresso

4. **Lembretes** (`/lembretes`)
   - Criação de lembretes
   - Gerenciamento de lembretes
   - Ativação/desativação

## Requisitos Implementados

✅ R01 - Coleta de dados básicos (idade, sexo, histórico)  
✅ R02 - Análise e processamento de informações  
✅ R03 - Geração automática de checklist personalizado  
✅ R04 - Exibição organizada e intuitiva  
✅ R05 - Sistema de lembretes automáticos  
✅ R06 - Atualização de checklist e dados  
✅ R07 - Ambiente web com design responsivo  
✅ R08 - Feedback visual em todas as ações  

## Suporte

Para problemas ou dúvidas:
1. Verifique se backend e frontend estão rodando
2. Verifique o console do navegador (F12) para erros
3. Verifique o terminal do backend para logs de erro

## Próximos Passos (Melhorias Futuras)

- Notificações push para lembretes
- Exportação de checklist em PDF
- Integração com calendário
- Dashboard com estatísticas
- Sistema de login e autenticação
- Múltiplos perfis de usuário
- Histórico de exames realizados
