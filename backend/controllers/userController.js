const { v4: uuidv4 } = require('uuid');
const { readDatabase, writeDatabase } = require('../utils/database');

const createUser = (req, res) => {
  const { name, email, age, sex, healthHistory } = req.body;

  if (!name || !email || !age || !sex) {
    return res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
  }

  const db = readDatabase();
  
  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'Usuário já cadastrado' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    age: parseInt(age),
    sex,
    healthHistory: healthHistory || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDatabase(db);

  res.status(201).json(newUser);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  
  const user = db.users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, age, sex, healthHistory } = req.body;
  
  const db = readDatabase();
  const userIndex = db.users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  db.users[userIndex] = {
    ...db.users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(age && { age: parseInt(age) }),
    ...(sex && { sex }),
    ...(healthHistory && { healthHistory }),
    updatedAt: new Date().toISOString()
  };

  writeDatabase(db);
  res.json(db.users[userIndex]);
};

const getAllUsers = (req, res) => {
  const db = readDatabase();
  res.json(db.users);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  
  const userIndex = db.users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  db.users.splice(userIndex, 1);
  writeDatabase(db);
  
  res.status(204).send();
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser
};
