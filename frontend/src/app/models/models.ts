export interface User {
  id?: string;
  name: string;
  email: string;
  age: number;
  sex: 'masculino' | 'feminino';
  healthHistory?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ChecklistItem {
  id: string;
  type: 'exam' | 'consultation';
  name: string;
  frequency: string;
  category: string;
  priority: 'alta' | 'media' | 'baixa';
  completed: boolean;
  lastUpdate: string | null;
}

export interface Checklist {
  id: string;
  userId: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  id?: string;
  userId: string;
  checklistItemId: string;
  title: string;
  examName?: string;
  description?: string;
  date: string;
  period?: string;
  recurring?: boolean;
  active?: boolean;
  createdAt?: string;
}
