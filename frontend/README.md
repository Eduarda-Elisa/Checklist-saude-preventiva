# Frontend - Checklist de Saúde Preventiva

Frontend desenvolvido com Angular e Ionic para o sistema de checklist de saúde preventiva.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação

```bash
npm install
```

## Executar em modo de desenvolvimento

```bash
npm start
```

ou

```bash
ionic serve
```

O aplicativo estará disponível em `http://localhost:4200` (ou `http://localhost:8100` com ionic serve)

## Build para produção

```bash
npm run build
```

## Funcionalidades

- Cadastro de informações pessoais (idade, sexo, histórico de saúde)
- Geração automática de checklist personalizado
- Visualização organizada de exames e consultas recomendadas
- Sistema de marcação de itens concluídos
- Gerenciamento de lembretes para exames e consultas
- Atualização de dados pessoais
- Interface responsiva e intuitiva

## Estrutura

- `/src/app/pages` - Páginas do aplicativo
- `/src/app/services` - Serviços de comunicação com a API
- `/src/app/models` - Modelos de dados
- `/src/theme` - Temas e estilos globais

## Requisitos Atendidos

- R01: Coleta de dados básicos (idade, sexo, histórico)
- R02: Análise e processamento de informações
- R03: Geração automática de checklist personalizado
- R04: Exibição organizada e intuitiva
- R05: Lembretes automáticos
- R06: Atualização de checklist e dados
- R07: Ambiente web com design responsivo
- R08: Feedback visual em todas as ações
