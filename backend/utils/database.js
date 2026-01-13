const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../database/db.json');

const readDatabase = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], checklists: [], reminders: [] };
  }
};

const writeDatabase = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Erro ao escrever no banco de dados:', error);
    return false;
  }
};

module.exports = { readDatabase, writeDatabase };
