import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ReminderService } from '../../services/reminder.service';
import { ChecklistService } from '../../services/checklist.service';
import { UserService } from '../../services/user.service';
import { Reminder, Checklist, ChecklistItem, User } from '../../models/models';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.page.html',
  styleUrls: ['./lembretes.page.scss']
})
export class LembretesPage implements OnInit {
  reminders: Reminder[] = [];
  currentUser: User | null = null;
  checklist: Checklist | null = null;
  showAddForm = false;
  minDate: string = new Date().toISOString();
  searchTerm: string = '';
  
  allExames = [
    'Hemograma Completo',
    'Glicemia de Jejum',
    'Hemoglobina Glicada',
    'Perfil Lipídico',
    'Colesterol Total e Frações',
    'Triglicerídeos',
    'Ureia e Creatinina',
    'Ácido Úrico',
    'TGO e TGP',
    'TSH e T4 Livre',
    'Vitamina D',
    'Vitamina B12',
    'Ferritina',
    'PSA (Antígeno Prostático)',
    'Papanicolau',
    'Mamografia',
    'Ultrassom Transvaginal',
    'Ultrassom de Abdômen',
    'Ultrassom de Tireoide',
    'Densitometria Óssea',
    'Colonoscopia',
    'Endoscopia Digestiva',
    'Eletrocardiograma (ECG)',
    'Ecocardiograma',
    'Teste Ergométrico',
    'Raio-X de Tórax',
    'Tomografia Computadorizada',
    'Ressonância Magnética',
    'Exame de Vista (Oftalmológico)',
    'Exame de Urina',
    'Cultura de Urina',
    'Parasitológico de Fezes',
    'Sorologia para HIV',
    'Sorologia para Hepatites',
    'VDRL (Sífilis)',
    'Monitoramento de Pressão Arterial',
    'Consulta Clínica Geral',
    'Consulta Cardiológica',
    'Consulta Endocrinológica',
    'Consulta Ginecológica',
    'Consulta Urológica',
    'Consulta Oftalmológica',
    'Consulta Odontológica',
    'Consulta Dermatológica',
    'Consulta com Nutricionista',
    'Consulta Psicológica',
    'Vacina Influenza (Gripe)',
    'Vacina Pneumocócica',
    'Vacina Hepatite B',
    'Vacina HPV',
    'Vacina Tétano'
  ];

  filteredExames: string[] = [];

  periodOptions = [
    { value: 'diario', label: 'Diário' },
    { value: 'semanal', label: 'Semanal' },
    { value: 'quinzenal', label: 'Quinzenal' },
    { value: 'mensal', label: 'Mensal' },
    { value: 'bimestral', label: 'Bimestral (2 meses)' },
    { value: 'trimestral', label: 'Trimestral (3 meses)' },
    { value: 'semestral', label: 'Semestral (6 meses)' },
    { value: 'anual', label: 'Anual (1 ano)' },
    { value: 'bienal', label: 'A cada 2 anos' },
    { value: 'trienal', label: 'A cada 3 anos' },
    { value: 'quadrienal', label: 'A cada 4 anos' },
    { value: 'quinquenal', label: 'A cada 5 anos' },
    { value: 'decenal', label: 'A cada 10 anos' }
  ];
  
  newReminder = {
    title: '',
    examName: '',
    description: '',
    date: '',
    period: '',
    recurring: false
  };

  constructor(
    private reminderService: ReminderService,
    private checklistService: ChecklistService,
    private userService: UserService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    if (!this.currentUser || !this.currentUser.id) {
      this.router.navigate(['/cadastro']);
      return;
    }
    this.filteredExames = [...this.allExames];
    this.loadReminders();
    this.loadChecklist();
  }

  filterExames(event: any) {
    const searchTerm = event.detail.value.toLowerCase();
    if (!searchTerm) {
      this.filteredExames = [...this.allExames];
      return;
    }
    this.filteredExames = this.allExames.filter(exame => 
      exame.toLowerCase().includes(searchTerm)
    );
  }

  async loadReminders() {
    if (!this.currentUser || !this.currentUser.id) return;

    const loading = await this.loadingController.create({
      message: 'Carregando lembretes...'
    });
    await loading.present();

    this.reminderService.getRemindersByUser(this.currentUser.id).subscribe({
      next: async (reminders) => {
        this.reminders = reminders.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        await loading.dismiss();
      },
      error: async () => {
        await loading.dismiss();
      }
    });
  }

  async loadChecklist() {
    if (!this.currentUser || !this.currentUser.id) return;

    this.checklistService.getChecklistByUser(this.currentUser.id).subscribe({
      next: (checklist) => {
        this.checklist = checklist;
      },
      error: () => {}
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newReminder = {
      title: '',
      examName: '',
      description: '',
      date: '',
      period: '',
      recurring: false
    };
    this.searchTerm = '';
    this.filteredExames = [...this.allExames];
  }

  async createReminder() {
    if (!this.currentUser || !this.currentUser.id) return;
    
    if (!this.newReminder.examName || !this.newReminder.date) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha o exame/consulta e a data.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Criando lembrete e adicionando ao checklist...'
    });
    await loading.present();

    const title = this.newReminder.title || this.newReminder.examName;

    const reminder: Reminder = {
      userId: this.currentUser.id,
      checklistItemId: '',
      title: title,
      examName: this.newReminder.examName,
      description: this.newReminder.description,
      date: this.newReminder.date,
      period: this.newReminder.period,
      recurring: this.newReminder.recurring,
      active: true
    };

    this.reminderService.createReminder(reminder).subscribe({
      next: async (createdReminder) => {
        await this.addToChecklist(createdReminder);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Lembrete criado e adicionado ao checklist com sucesso!',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.resetForm();
        this.showAddForm = false;
        this.loadReminders();
        this.loadChecklist();
      },
      error: async () => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível criar o lembrete.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async addToChecklist(reminder: Reminder) {
    if (!this.currentUser || !this.currentUser.id || !this.checklist) return;

    const itemExists = this.checklist.items.find(
      item => item.name.toLowerCase() === reminder.examName?.toLowerCase()
    );

    if (itemExists) {
      return;
    }

    const newItem = {
      id: '',
      type: reminder.examName?.includes('Consulta') ? 'consultation' as const : 'exam' as const,
      name: reminder.examName || reminder.title,
      frequency: this.getPeriodLabel(reminder.period || ''),
      category: this.getCategoryForExam(reminder.examName || ''),
      priority: 'alta' as const,
      completed: false,
      lastUpdate: null
    };

    return new Promise<void>((resolve) => {
      this.checklistService.getChecklistByUser(this.currentUser!.id!).subscribe({
        next: (checklist) => {
          const updatedItems = [...checklist.items, newItem];
          
          const checklistData = {
            ...checklist,
            items: updatedItems
          };

          resolve();
        },
        error: () => resolve()
      });
    });
  }

  getCategoryForExam(examName: string): string {
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
    if (name.includes('psa') || name.includes('prostát')) return 'Saúde do Homem';
    if (name.includes('glicemia') || name.includes('diabetes')) return 'Prevenção de Diabetes';
    if (name.includes('colesterol') || name.includes('lipíd')) return 'Saúde Cardiovascular';
    if (name.includes('colon') || name.includes('endoscopia')) return 'Prevenção de Câncer';
    if (name.includes('pressão')) return 'Controle de Hipertensão';
    if (name.includes('vacina')) return 'Imunização';
    
    return 'Exames de Rotina';
  }

  async deleteReminder(reminder: Reminder) {
    if (!reminder.id) return;

    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja realmente excluir este lembrete?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Excluindo...'
            });
            await loading.present();

            this.reminderService.deleteReminder(reminder.id!).subscribe({
              next: async () => {
                await loading.dismiss();
                const toast = await this.toastController.create({
                  message: 'Lembrete excluído com sucesso!',
                  duration: 2000,
                  color: 'success'
                });
                await toast.present();
                this.loadReminders();
              },
              error: async () => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Erro',
                  message: 'Não foi possível excluir o lembrete.',
                  buttons: ['OK']
                });
                await alert.present();
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async toggleReminderActive(reminder: Reminder) {
    if (!reminder.id) return;

    this.reminderService.updateReminder(reminder.id, { active: !reminder.active }).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: reminder.active ? 'Lembrete desativado' : 'Lembrete ativado',
          duration: 1500,
          color: 'success'
        });
        await toast.present();
        this.loadReminders();
      },
      error: async () => {
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível atualizar o lembrete.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  getItemName(itemId: string): string {
    if (!this.checklist) return 'Item não encontrado';
    const item = this.checklist.items.find(i => i.id === itemId);
    return item ? item.name : 'Item não encontrado';
  }

  isReminderPast(date: string): boolean {
    return new Date(date) < new Date();
  }

  getPeriodLabel(period: string): string {
    const periodOption = this.periodOptions.find(p => p.value === period);
    return periodOption ? periodOption.label : period;
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
