const generateChecklist = (userData) => {
  const { age, sex, healthHistory } = userData;
  const checklist = [];

  if (age >= 18) {
    checklist.push({
      type: 'exam',
      name: 'Hemograma Completo',
      frequency: 'Anual',
      category: 'Exames de Rotina',
      priority: 'alta'
    });
  }

  if (age >= 40) {
    checklist.push({
      type: 'exam',
      name: 'Glicemia de Jejum',
      frequency: 'Anual',
      category: 'Prevenção de Diabetes',
      priority: 'alta'
    });
    checklist.push({
      type: 'exam',
      name: 'Perfil Lipídico',
      frequency: 'Anual',
      category: 'Saúde Cardiovascular',
      priority: 'alta'
    });
  }

  if (age >= 50) {
    checklist.push({
      type: 'exam',
      name: 'Colonoscopia',
      frequency: 'A cada 5-10 anos',
      category: 'Prevenção de Câncer',
      priority: 'alta'
    });
  }

  if (sex === 'feminino') {
    if (age >= 25) {
      checklist.push({
        type: 'exam',
        name: 'Papanicolau',
        frequency: 'Anual',
        category: 'Saúde da Mulher',
        priority: 'alta'
      });
    }
    if (age >= 40) {
      checklist.push({
        type: 'exam',
        name: 'Mamografia',
        frequency: 'Anual',
        category: 'Prevenção de Câncer',
        priority: 'alta'
      });
    }
    if (age >= 35) {
      checklist.push({
        type: 'exam',
        name: 'Ultrassom Transvaginal',
        frequency: 'Anual',
        category: 'Saúde da Mulher',
        priority: 'media'
      });
    }
  }

  if (sex === 'masculino') {
    if (age >= 45) {
      checklist.push({
        type: 'exam',
        name: 'PSA (Antígeno Prostático)',
        frequency: 'Anual',
        category: 'Saúde do Homem',
        priority: 'alta'
      });
    }
  }

  if (healthHistory && healthHistory.includes('diabetes')) {
    checklist.push({
      type: 'exam',
      name: 'Hemoglobina Glicada',
      frequency: 'Trimestral',
      category: 'Controle de Diabetes',
      priority: 'alta'
    });
  }

  if (healthHistory && healthHistory.includes('hipertensao')) {
    checklist.push({
      type: 'exam',
      name: 'Monitoramento de Pressão Arterial',
      frequency: 'Mensal',
      category: 'Controle de Hipertensão',
      priority: 'alta'
    });
  }

  if (healthHistory && healthHistory.includes('obesidade')) {
    checklist.push({
      type: 'consultation',
      name: 'Consulta com Nutricionista',
      frequency: 'Trimestral',
      category: 'Controle de Peso',
      priority: 'alta'
    });
  }

  checklist.push({
    type: 'consultation',
    name: 'Consulta Clínica Geral',
    frequency: 'Anual',
    category: 'Check-up Geral',
    priority: 'alta'
  });

  checklist.push({
    type: 'exam',
    name: 'Exame de Vista',
    frequency: 'A cada 2 anos',
    category: 'Saúde Visual',
    priority: 'media'
  });

  checklist.push({
    type: 'consultation',
    name: 'Consulta Odontológica',
    frequency: 'Semestral',
    category: 'Saúde Bucal',
    priority: 'media'
  });

  return checklist;
};

module.exports = { generateChecklist };
