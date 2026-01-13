const { v4: uuidv4 } = require('uuid');
const { readDatabase, writeDatabase } = require('../utils/database');
const { generateChecklist } = require('../services/checklistGenerator');

const createChecklist = (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'ID do usuário não fornecido' });
  }

  const db = readDatabase();
  const user = db.users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const items = generateChecklist(user);

  const newChecklist = {
    id: uuidv4(),
    userId,
    items: items.map(item => ({
      id: uuidv4(),
      ...item,
      completed: false,
      lastUpdate: null
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.checklists.push(newChecklist);
  writeDatabase(db);

  res.status(201).json(newChecklist);
};

const getChecklistByUser = (req, res) => {
  const { userId } = req.params;
  const db = readDatabase();

  const checklist = db.checklists.find(c => c.userId === userId);

  if (!checklist) {
    return res.status(404).json({ error: 'Checklist não encontrado' });
  }

  res.json(checklist);
};

const updateChecklistItem = (req, res) => {
  const { checklistId, itemId } = req.params;
  const { completed, lastUpdate } = req.body;

  const db = readDatabase();
  const checklistIndex = db.checklists.findIndex(c => c.id === checklistId);

  if (checklistIndex === -1) {
    return res.status(404).json({ error: 'Checklist não encontrado' });
  }

  const itemIndex = db.checklists[checklistIndex].items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  if (completed !== undefined) {
    db.checklists[checklistIndex].items[itemIndex].completed = completed;
  }

  if (lastUpdate !== undefined) {
    db.checklists[checklistIndex].items[itemIndex].lastUpdate = lastUpdate;
  }

  db.checklists[checklistIndex].updatedAt = new Date().toISOString();

  writeDatabase(db);
  res.json(db.checklists[checklistIndex]);
};

const updateChecklist = (req, res) => {
  const { checklistId } = req.params;
  const { items } = req.body;

  const db = readDatabase();
  const checklistIndex = db.checklists.findIndex(c => c.id === checklistId);

  if (checklistIndex === -1) {
    return res.status(404).json({ error: 'Checklist não encontrado' });
  }

  if (items) {
    db.checklists[checklistIndex].items = items.map(item => {
      // Se o item não tem ID ou tem ID vazio, gera um novo
      if (!item.id || item.id === '') {
        return {
          ...item,
          id: uuidv4()
        };
      }
      // Se já tem ID, mantém
      return item;
    });
  }

  db.checklists[checklistIndex].updatedAt = new Date().toISOString();

  writeDatabase(db);
  res.json(db.checklists[checklistIndex]);
};

const regenerateChecklist = (req, res) => {
  const { userId } = req.params;

  const db = readDatabase();
  const user = db.users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const checklistIndex = db.checklists.findIndex(c => c.userId === userId);

  const items = generateChecklist(user);

  if (checklistIndex !== -1) {
    db.checklists[checklistIndex].items = items.map(item => ({
      id: uuidv4(),
      ...item,
      completed: false,
      lastUpdate: null
    }));
    db.checklists[checklistIndex].updatedAt = new Date().toISOString();
    writeDatabase(db);
    return res.json(db.checklists[checklistIndex]);
  }

  const newChecklist = {
    id: uuidv4(),
    userId,
    items: items.map(item => ({
      id: uuidv4(),
      ...item,
      completed: false,
      lastUpdate: null
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.checklists.push(newChecklist);
  writeDatabase(db);
  res.status(201).json(newChecklist);
};

module.exports = {
  createChecklist,
  getChecklistByUser,
  updateChecklistItem,
  updateChecklist,
  regenerateChecklist
};
