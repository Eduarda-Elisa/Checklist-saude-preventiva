# Backend - Checklist de Saúde Preventiva

Backend API desenvolvido com Node.js e Express para o sistema de checklist de saúde preventiva.

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

## Modo de Desenvolvimento

```bash
npm run dev
```

## Endpoints

### Usuários
- POST /api/users - Criar usuário
- GET /api/users - Listar todos os usuários
- GET /api/users/:id - Buscar usuário por ID
- PUT /api/users/:id - Atualizar usuário
- DELETE /api/users/:id - Deletar usuário

### Checklists
- POST /api/checklists - Criar checklist
- GET /api/checklists/user/:userId - Buscar checklist por usuário
- PUT /api/checklists/:checklistId/items/:itemId - Atualizar item do checklist
- POST /api/checklists/regenerate/:userId - Regenerar checklist

### Lembretes
- POST /api/reminders - Criar lembrete
- GET /api/reminders/user/:userId - Buscar lembretes por usuário
- PUT /api/reminders/:id - Atualizar lembrete
- DELETE /api/reminders/:id - Deletar lembrete

## Porta

A API roda por padrão na porta 3000.
