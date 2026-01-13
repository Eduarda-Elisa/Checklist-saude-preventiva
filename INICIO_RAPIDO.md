# Guia de Início Rápido

## 🚀 Instalação em 3 Passos

### 1️⃣ Instalar Tudo

Abra o PowerShell na pasta do projeto e execute:

```powershell
.\install-all.ps1
```

Aguarde a instalação das dependências (pode levar alguns minutos).

### 2️⃣ Iniciar o Backend

Abra um terminal PowerShell e execute:

```powershell
.\start-backend.ps1
```

✅ Você verá: `Servidor rodando na porta 3000`

**Deixe este terminal aberto!**

### 3️⃣ Iniciar o Frontend

Abra **OUTRO** terminal PowerShell e execute:

```powershell
.\start-frontend.ps1
```

✅ O navegador abrirá automaticamente em `http://localhost:4200`

## 📱 Como Usar

### Primeiro Acesso

1. **Cadastrar-se**
   - Clique em "Cadastrar Informações"
   - Preencha seus dados
   - Selecione condições de saúde (se houver)
   - Clique em "Cadastrar"

2. **Ver seu Checklist**
   - Após cadastro, você verá automaticamente seu checklist
   - Exames organizados por categoria
   - Prioridades coloridas
   - Barra de progresso

3. **Marcar Itens**
   - Clique no checkbox para marcar como concluído
   - O progresso é atualizado automaticamente

4. **Adicionar Lembretes**
   - Clique em "Gerenciar Lembretes"
   - Clique no botão "+"
   - Selecione um exame
   - Defina data e descrição
   - Clique em "Criar Lembrete"

## 🔧 Solução de Problemas

### Erro: "npm não encontrado"

Instale o Node.js: https://nodejs.org/

### Erro: "Porta já em uso"

Feche outros programas que possam estar usando as portas 3000 ou 4200.

### Erro na instalação

Execute:
```powershell
cd backend
npm cache clean --force
npm install

cd ../frontend
npm cache clean --force
npm install
```

## 📚 Documentação Completa

- [README.md](README.md) - Visão geral do projeto
- [INSTALACAO.md](INSTALACAO.md) - Instruções detalhadas
- [DOCUMENTACAO_TECNICA.md](DOCUMENTACAO_TECNICA.md) - Arquitetura técnica
- [CASOS_DE_USO.md](CASOS_DE_USO.md) - Casos de uso do sistema

## ⚡ Comandos Úteis

### Parar os Servidores
Pressione `Ctrl + C` nos terminais

### Limpar Dados
Delete o arquivo: `backend/database/db.json`  
Na próxima inicialização, será criado um novo arquivo vazio.

### Rebuild do Frontend
```powershell
cd frontend
npm run build
```

## 🎯 URLs

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## 📞 Suporte

Se encontrar problemas:
1. Verifique se ambos os servidores estão rodando
2. Verifique o console do navegador (F12)
3. Verifique os logs no terminal do backend
