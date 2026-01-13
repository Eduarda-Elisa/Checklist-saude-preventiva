# Documentação Técnica - Checklist de Saúde Preventiva

## Arquitetura do Sistema

### Visão Geral

O sistema segue uma arquitetura cliente-servidor com separação completa entre frontend e backend:

```
┌─────────────────────────────────────┐
│         FRONTEND (Angular)          │
│  - Interface do usuário             │
│  - Validações cliente               │
│  - Gerenciamento de estado          │
└──────────────┬──────────────────────┘
               │ HTTP/REST
               │
┌──────────────▼──────────────────────┐
│         BACKEND (Node.js)           │
│  - API REST                         │
│  - Lógica de negócio                │
│  - Validações servidor              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      BANCO DE DADOS (JSON)          │
│  - Armazenamento persistente        │
└─────────────────────────────────────┘
```

## Backend - Node.js + Express

### Estrutura de Diretórios

```
backend/
├── controllers/          # Lógica de controle das rotas
│   ├── userController.js
│   ├── checklistController.js
│   └── reminderController.js
├── routes/              # Definição de rotas
│   ├── userRoutes.js
│   ├── checklistRoutes.js
│   └── reminderRoutes.js
├── services/            # Lógica de negócio
│   └── checklistGenerator.js
├── utils/               # Utilitários
│   └── database.js
├── database/            # Banco de dados
│   └── db.json
├── server.js            # Ponto de entrada
└── package.json
```

### Camadas da Aplicação

#### 1. Camada de Roteamento (Routes)

Responsável por definir os endpoints da API e mapear para os controladores apropriados.

**Exemplo: userRoutes.js**
- Define rotas CRUD para usuários
- Mapeia verbos HTTP para métodos do controller

#### 2. Camada de Controle (Controllers)

Recebe requisições HTTP, processa e retorna respostas.

**Responsabilidades:**
- Validação de entrada
- Chamada de serviços
- Tratamento de erros
- Formatação de respostas

#### 3. Camada de Serviço (Services)

Contém a lógica de negócio principal.

**checklistGenerator.js:**
- Analisa idade, sexo e histórico de saúde
- Gera recomendações personalizadas
- Define prioridades e frequências

#### 4. Camada de Dados (Utils)

Gerencia acesso ao banco de dados JSON.

**database.js:**
- `readDatabase()`: Lê dados do JSON
- `writeDatabase()`: Escreve dados no JSON

### Algoritmo de Geração de Checklist

```javascript
função generateChecklist(userData):
    checklist = []
    
    // Exames básicos por idade
    se idade >= 18:
        adicionar "Hemograma Completo"
    
    se idade >= 40:
        adicionar "Glicemia de Jejum"
        adicionar "Perfil Lipídico"
    
    se idade >= 50:
        adicionar "Colonoscopia"
    
    // Exames específicos por sexo
    se sexo == "feminino":
        se idade >= 25:
            adicionar "Papanicolau"
        se idade >= 40:
            adicionar "Mamografia"
    
    se sexo == "masculino":
        se idade >= 45:
            adicionar "PSA"
    
    // Exames por histórico de saúde
    para cada condição em healthHistory:
        adicionar exames relacionados
    
    retornar checklist
```

### Modelo de Dados

#### User
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "age": "number",
  "sex": "masculino | feminino",
  "healthHistory": ["string"],
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

#### Checklist
```json
{
  "id": "uuid",
  "userId": "uuid",
  "items": [
    {
      "id": "uuid",
      "type": "exam | consultation",
      "name": "string",
      "frequency": "string",
      "category": "string",
      "priority": "alta | media | baixa",
      "completed": "boolean",
      "lastUpdate": "ISO8601 | null"
    }
  ],
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

#### Reminder
```json
{
  "id": "uuid",
  "userId": "uuid",
  "checklistItemId": "uuid",
  "title": "string",
  "description": "string",
  "date": "ISO8601",
  "recurring": "boolean",
  "active": "boolean",
  "createdAt": "ISO8601"
}
```

## Frontend - Angular + Ionic

### Estrutura de Diretórios

```
frontend/src/app/
├── pages/                  # Páginas do aplicativo
│   ├── home/
│   ├── cadastro/
│   ├── checklist/
│   └── lembretes/
├── services/              # Serviços HTTP
│   ├── user.service.ts
│   ├── checklist.service.ts
│   └── reminder.service.ts
├── models/                # Interfaces TypeScript
│   └── models.ts
├── app-routing.module.ts  # Configuração de rotas
└── app.module.ts          # Módulo principal
```

### Arquitetura de Componentes

#### Padrão de Organização

Cada página segue a estrutura:
- `.page.ts` - Lógica do componente
- `.page.html` - Template HTML
- `.page.scss` - Estilos específicos
- `.module.ts` - Módulo do componente
- `-routing.module.ts` - Rotas

### Serviços (Services)

#### UserService

**Responsabilidades:**
- Gerenciar estado do usuário atual
- Comunicação com API de usuários
- Persistência de sessão (localStorage)

**BehaviorSubject:**
```typescript
currentUserSubject = new BehaviorSubject<User | null>(null)
currentUser$ = currentUserSubject.asObservable()
```

#### ChecklistService

**Responsabilidades:**
- Gerenciar checklists
- Atualizar itens
- Regenerar checklist

#### ReminderService

**Responsabilidades:**
- CRUD de lembretes
- Filtrar por usuário

### Fluxo de Dados

```
Componente
    ↓ chama método
Serviço
    ↓ HTTP Request
Backend API
    ↓ Response
Serviço (Observable)
    ↓ subscribe
Componente (atualiza view)
```

### Sistema de Roteamento

```typescript
Routes:
/home      → HomePage
/cadastro  → CadastroPage
/checklist → ChecklistPage
/lembretes → LembretesPage
```

### Gerenciamento de Estado

#### Estado Local
- Cada componente mantém seu próprio estado
- Uso de variáveis locais

#### Estado Compartilhado
- UserService mantém usuário atual
- Uso de BehaviorSubject + Observable
- Componentes se inscrevem em mudanças

### Validações

#### Frontend
- Validação de formulários (Reactive Forms)
- Mensagens de erro em tempo real
- Desabilitação de botões em estado inválido

#### Backend
- Validação de dados recebidos
- Retorno de códigos HTTP apropriados
- Mensagens de erro descritivas

## Comunicação Frontend-Backend

### Protocolo HTTP

Todas as requisições usam:
- Content-Type: application/json
- CORS habilitado no backend

### Tratamento de Erros

#### Frontend
```typescript
service.method().subscribe({
  next: (data) => { /* sucesso */ },
  error: (error) => { /* erro */ }
})
```

#### Backend
```javascript
try {
  // lógica
  res.status(200).json(data)
} catch (error) {
  res.status(500).json({ error: message })
}
```

### Códigos de Status HTTP

- 200: Sucesso
- 201: Criado
- 204: Sem conteúdo (delete)
- 400: Requisição inválida
- 404: Não encontrado
- 409: Conflito (usuário já existe)
- 500: Erro interno

## Performance

### Backend
- Leitura/escrita síncrona de JSON
- Sem cache (simplicidade)
- Adequado para pequeno volume

### Frontend
- Lazy loading de rotas
- Ionic otimizado para performance
- Observables para programação reativa

## Segurança

### Considerações Atuais
- Sem autenticação (MVP)
- Sem criptografia de dados
- CORS aberto para desenvolvimento

### Melhorias Futuras
- JWT para autenticação
- Bcrypt para senhas
- HTTPS em produção
- Validação mais rigorosa
- Rate limiting
- Sanitização de inputs

## Extensibilidade

### Adicionar Novo Exame

1. Modificar `checklistGenerator.js`
2. Adicionar condição no algoritmo
3. Definir categoria e prioridade

### Adicionar Nova Funcionalidade

1. Criar novo controller
2. Definir rotas
3. Criar serviço no frontend
4. Criar página/componente

## Testes

### Backend
Possíveis testes:
- Unitários: Controllers e services
- Integração: Endpoints da API
- E2E: Fluxos completos

### Frontend
Possíveis testes:
- Unitários: Componentes e serviços
- E2E: Navegação e interações

## Deployment

### Backend
- Node.js em servidor
- Variável de ambiente PORT
- Banco JSON em filesystem

### Frontend
- Build de produção: `npm run build`
- Servir pasta `www/`
- Configurar API URL

## Manutenção

### Logs
- Console do backend mostra requisições
- Erros logados no terminal

### Backup
- Copiar arquivo `db.json` periodicamente

### Atualização de Dependências
```bash
npm update
```

## Conformidade com Requisitos

| Req | Descrição | Implementação |
|-----|-----------|---------------|
| R01 | Coleta de dados | Formulário em CadastroPage |
| R02 | Processamento | checklistGenerator.js |
| R03 | Geração automática | createChecklist endpoint |
| R04 | Exibição organizada | ChecklistPage com categorias |
| R05 | Lembretes | ReminderService + LembretesPage |
| R06 | Atualização | updateUser + regenerateChecklist |
| R07 | Web responsivo | Ionic Framework |
| R08 | Feedback visual | Toasts, Alerts, Loading |

## Glossário

- **Observable**: Stream de dados assíncrono (RxJS)
- **BehaviorSubject**: Observable com valor inicial
- **CORS**: Cross-Origin Resource Sharing
- **REST**: Representational State Transfer
- **CRUD**: Create, Read, Update, Delete
- **UUID**: Identificador único universal
- **Lazy Loading**: Carregamento sob demanda
