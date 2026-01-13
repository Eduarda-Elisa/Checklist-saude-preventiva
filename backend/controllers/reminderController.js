const { v4: uuidv4 } = require('uuid');
const { readDatabase, writeDatabase } = require('../utils/database');

const getCategoryForExam = (examName) => {
  const name = examName.toLowerCase();
  
  if (name.includes('consulta')) {
    if (name.includes('cardio')) return 'Saúde Cardiovascular';
    if (name.includes('gineco')) return 'Saúde da Mulher';
    if (name.includes('uro')) return 'Saúde do Homem';
    if (name.includes('nutri')) return 'Controle de Peso';
    if (name.includes('odonto')) return 'Saúde Bucal';
    return 'Consultas Médicas';
  }
  
  if (name.includes('mamografia') || name.includes('papanicolau')) return 'Saúde da Mulher';
  if (name.includes('psa') || name.includes('próstát')) return 'Saúde do Homem';
  if (name.includes('glicemia') || name.includes('diabetes')) return 'Prevenção de Diabetes';
  if (name.includes('colesterol') || name.includes('lipíd')) return 'Saúde Cardiovascular';
  if (name.includes('colon') || name.includes('endoscopia')) return 'Prevenção de Câncer';
  if (name.includes('pressão')) return 'Controle de Hipertensão';
  if (name.includes('vacina')) return 'Imunização';
  
  return 'Exames de Rotina';
};

const addToChecklist = (userId, examName, period) => {
  const db = readDatabase();
  const checklistIndex = db.checklists.findIndex(c => c.userId === userId);
  
  if (checklistIndex === -1) return;
  
  const itemExists = db.checklists[checklistIndex].items.find(
    item => item.name.toLowerCase() === examName.toLowerCase()
  );
  
  if (itemExists) return;
  
  const newItem = {
    id: uuidv4(),
    type: examName.includes('Consulta') ? 'consultation' : 'exam',
    name: examName,
    frequency: period || 'Conforme agendado',
    category: getCategoryForExam(examName),
    priority: 'alta',
    completed: false,
    lastUpdate: null
  };
  
  db.checklists[checklistIndex].items.push(newItem);
  db.checklists[checklistIndex].updatedAt = new Date().toISOString();
  writeDatabase(db);
};

const createReminder = (req, res) => {
  const { userId, checklistItemId, title, description, date, recurring, examName, period } = req.body;

  if (!userId || !title || !date) {
    return res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
  }

  const db = readDatabase();

  const newReminder = {
    id: uuidv4(),
    userId,
    checklistItemId: checklistItemId || '',
    title,
    examName: examName || '',
    description: description || '',
    date,
    period: period || '',
    recurring: recurring || false,
    active: true,
    createdAt: new Date().toISOString()
  };

  db.reminders.push(newReminder);
  writeDatabase(db);

  if (examName) {
    addToChecklist(userId, examName, period);
  }

  res.status(201).json(newReminder);
};

const getRemindersByUser = (req, res) => {
  const { userId } = req.params;
  const db = readDatabase();

  const reminders = db.reminders.filter(r => r.userId === userId);

  res.json(reminders);
};

const updateReminder = (req, res) => {
  const { id } = req.params;
  const { title, description, date, recurring, active, examName, period } = req.body;

  const db = readDatabase();
  const reminderIndex = db.reminders.findIndex(r => r.id === id);

  if (reminderIndex === -1) {
    return res.status(404).json({ error: 'Lembrete não encontrado' });
  }

  db.reminders[reminderIndex] = {
    ...db.reminders[reminderIndex],
    ...(title && { title }),
    ...(examName !== undefined && { examName }),
    ...(description !== undefined && { description }),
    ...(date && { date }),
    ...(period !== undefined && { period }),
    ...(recurring !== undefined && { recurring }),
    ...(active !== undefined && { active })
  };

  writeDatabase(db);
  res.json(db.reminders[reminderIndex]);
};

const deleteReminder = (req, res) => {
  const { id } = req.params;
  const db = readDatabase();

  const reminderIndex = db.reminders.findIndex(r => r.id === id);

  if (reminderIndex === -1) {
    return res.status(404).json({ error: 'Lembrete não encontrado' });
  }

  db.reminders.splice(reminderIndex, 1);
  writeDatabase(db);

  res.status(204).send();
};

module.exports = {
  createReminder,
  getRemindersByUser,
  updateReminder,
  deleteReminder
};
