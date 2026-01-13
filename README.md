# Checklist de Saúde Preventiva

Sistema completo de gerenciamento de checklist de saúde preventiva, desenvolvido com Angular + Ionic no frontend e Node.js + Express no backend.

## Descrição

Este projeto foi desenvolvido para incentivar o cuidado preventivo à saúde, por meio de uma plataforma digital que permite aos usuários gerar um checklist personalizado de exames e consultas médicas. A plataforma coleta informações básicas como idade, sexo e histórico de saúde, processa esses dados e sugere, de forma automatizada, uma lista de cuidados médicos preventivos recomendados.

## Objetivo de Desenvolvimento Sustentável (ODS)

**ODS 03: Saúde e bem-estar**

## Setor de Aplicação

Clínica Médica em Franco da Rocha  
Avenida Dr. Hamilton Prado

## Arquitetura

O projeto é dividido em duas aplicações independentes:

- **Backend**: API REST desenvolvida com Node.js e Express
- **Frontend**: Aplicação web desenvolvida com Angular e Ionic

## Requisitos Implementados

- **R01**: Coleta de dados básicos (idade, sexo, histórico de saúde)
- **R02**: Análise e processamento de informações para identificar exames adequados
- **R03**: Geração automática de checklist personalizado
- **R04**: Exibição organizada e intuitiva do checklist
- **R05**: Sistema de lembretes automáticos
- **R06**: Atualização de checklist e dados do usuário
- **R07**: Ambiente web com design responsivo
- **R08**: Feedback visual em todas as ações

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- JSON como banco de dados
- CORS para comunicação cross-origin
- UUID para geração de IDs únicos

### Frontend
- Angular 17
- Ionic 7
- TypeScript
- SCSS
- RxJS para programação reativa
- HttpClient para comunicação com API

## Estrutura do Projeto

```
checklist-saude-preventiva/
├── backend/
│   ├── controllers/       # Controladores das rotas
│   ├── routes/           # Definição de rotas
│   ├── services/         # Lógica de negócio
│   ├── utils/            # Utilitários
│   ├── database/         # Arquivo JSON (banco de dados)
│   ├── server.js         # Servidor principal
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/        # Páginas do aplicativo
│   │   │   ├── services/     # Serviços HTTP
│   │   │   ├── models/       # Modelos de dados
│   │   │   └── app.module.ts
│   │   ├── theme/            # Estilos globais
│   │   └── index.html
│   ├── angular.json
│   └── package.json
│
└── README.md
```

## Instalação e Execução

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação:
```bash
npm start
```

ou

```bash
ionic serve
```

A aplicação estará disponível em `http://localhost:4200` (ou `http://localhost:8100` com ionic serve)

## Funcionalidades

### Cadastro de Usuário
- Formulário para coleta de informações pessoais
- Validação de dados
- Seleção de histórico de saúde
- Atualização de dados cadastrais

### Checklist Personalizado
- Geração automática baseada no perfil do usuário
- Organização por categorias
- Indicação de frequência recomendada
- Sistema de prioridades (alta, média, baixa)
- Marcação de itens concluídos
- Registro de última atualização
- Regeneração de checklist após atualização de dados

### Gerenciamento de Lembretes
- Criação de lembretes para exames e consultas
- Associação com itens do checklist
- Definição de data e descrição
- Lembretes recorrentes
- Ativação/desativação de lembretes
- Exclusão de lembretes

## API Endpoints

### Usuários
- `POST /api/users` - Criar usuário
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Checklists
- `POST /api/checklists` - Criar checklist
- `GET /api/checklists/user/:userId` - Buscar checklist por usuário
- `PUT /api/checklists/:checklistId/items/:itemId` - Atualizar item do checklist
- `POST /api/checklists/regenerate/:userId` - Regenerar checklist

### Lembretes
- `POST /api/reminders` - Criar lembrete
- `GET /api/reminders/user/:userId` - Buscar lembretes por usuário
- `PUT /api/reminders/:id` - Atualizar lembrete
- `DELETE /api/reminders/:id` - Deletar lembrete

## Lógica de Geração de Checklist

O sistema analisa os dados do usuário e gera recomendações baseadas em:

- **Idade**: Determina exames relacionados à faixa etária
- **Sexo**: Define exames específicos (mamografia, PSA, etc.)
- **Histórico de saúde**: Adiciona exames de acompanhamento para condições existentes

### Exemplos de Recomendações

- **18+ anos**: Hemograma completo anual
- **40+ anos**: Glicemia de jejum, perfil lipídico
- **50+ anos**: Colonoscopia
- **Mulheres 25+**: Papanicolau
- **Mulheres 40+**: Mamografia
- **Homens 45+**: PSA
- **Diabetes**: Hemoglobina glicada trimestral
- **Hipertensão**: Monitoramento de pressão arterial mensal

## Design e Interface

- Design limpo e moderno usando componentes Ionic
- Cores e temas personalizáveis
- Suporte a modo claro e escuro
- Interface responsiva para diferentes tamanhos de tela
- Ícones do Ionicons
- Animações e transições suaves
- Feedback visual em todas as ações

## Resultados Esperados

- Aumento do engajamento dos usuários com práticas de saúde preventiva
- Estímulo ao autocuidado e realização periódica de exames médicos
- Conscientização sobre a importância da prevenção
- Redução de problemas de saúde graves através de ações antecipadas

## Considerações de Desenvolvimento

1. **Código limpo**: Sem comentários, seguindo boas práticas
2. **Separação de responsabilidades**: Backend e frontend independentes
3. **Arquitetura RESTful**: APIs seguindo padrões REST
4. **Programação reativa**: Uso de Observables e RxJS
5. **Validações**: Tanto no frontend quanto no backend
6. **Feedback ao usuário**: Mensagens claras e informativas
7. **Persistência de dados**: JSON como banco de dados simples
8. **Gerenciamento de estado**: Serviços com BehaviorSubject

## Desenvolvido por

Eduarda Elisa da Silva Oliveira
RU: 4876813

## Desenvolvido Para
Sistema desenvolvido para a Clínica Médica Franco da Rocha  
Avenida Dr. Hamilton Prado

