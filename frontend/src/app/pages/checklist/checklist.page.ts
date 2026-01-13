import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ChecklistService } from '../../services/checklist.service';
import { UserService } from '../../services/user.service';
import { Checklist, ChecklistItem, User } from '../../models/models';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss']
})
export class ChecklistPage implements OnInit {
  checklist: Checklist | null = null;
  currentUser: User | null = null;
  groupedItems: { [key: string]: ChecklistItem[] } = {};
  categories: string[] = [];
  showAddForm = false;
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

  categoryOptions = [
    'Exames de Rotina',
    'Prevenção de Diabetes',
    'Saúde Cardiovascular',
    'Saúde da Mulher',
    'Saúde do Homem',
    'Prevenção de Câncer',
    'Saúde Bucal',
    'Saúde Mental',
    'Controle de Peso',
    'Controle de Hipertensão',
    'Imunização',
    'Consultas Médicas'
  ];
  
  newItem = {
    name: '',
    type: 'exam',
    frequency: '',
    category: '',
    priority: 'media'
  };

  constructor(
    private checklistService: ChecklistService,
    private userService: UserService,
    private route: ActivatedRoute,
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

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newItem = {
      name: '',
      type: 'exam',
      frequency: '',
      category: '',
      priority: 'media'
    };
    this.searchTerm = '';
    this.filteredExames = [...this.allExames];
  }

  getCategoryForExam(examName: string): string {
    const name = examName.toLowerCase();
    
    if (name.includes('consulta')) {
      if (name.includes('cardio')) return 'Saúde Cardiovascular';
      if (name.includes('gineco')) return 'Saúde da Mulher';
      if (name.includes('uro')) return 'Saúde do Homem';
      if (name.includes('nutri')) return 'Controle de Peso';
      if (name.includes('odonto')) return 'Saúde Bucal';
      if (name.includes('psico')) return 'Saúde Mental';
      return 'Consultas Médicas';
    }
    
    if (name.includes('mamografia') || name.includes('papanicolau') || name.includes('transvaginal')) return 'Saúde da Mulher';
    if (name.includes('psa') || name.includes('próstát')) return 'Saúde do Homem';
    if (name.includes('glicemia') || name.includes('diabetes') || name.includes('glicada')) return 'Prevenção de Diabetes';
    if (name.includes('colesterol') || name.includes('lipíd') || name.includes('triglicerídeos')) return 'Saúde Cardiovascular';
    if (name.includes('colon') || name.includes('endoscopia') || name.includes('mamografia')) return 'Prevenção de Câncer';
    if (name.includes('pressão')) return 'Controle de Hipertensão';
    if (name.includes('vacina')) return 'Imunização';
    if (name.includes('odonto')) return 'Saúde Bucal';
    
    return 'Exames de Rotina';
  }

  getPeriodLabel(period: string): string {
    const periodOption = this.periodOptions.find(p => p.value === period);
    return periodOption ? periodOption.label : period;
  }

  async addNewItem() {
    if (!this.checklist || !this.newItem.name || !this.newItem.frequency) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha o nome do exame/consulta e a frequência.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const itemExists = this.checklist.items.find(
      item => item.name.toLowerCase() === this.newItem.name.toLowerCase()
    );

    if (itemExists) {
      const alert = await this.alertController.create({
        header: 'Item já existe',
        message: 'Este exame/consulta já está no seu checklist.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Adicionando item...'
    });
    await loading.present();

    const category = this.newItem.category || this.getCategoryForExam(this.newItem.name);
    const type = this.newItem.name.includes('Consulta') ? 'consultation' : 'exam';

    const newChecklistItem: ChecklistItem = {
      id: '',
      type: type as 'exam' | 'consultation',
      name: this.newItem.name,
      frequency: this.getPeriodLabel(this.newItem.frequency),
      category: category,
      priority: this.newItem.priority as 'alta' | 'media' | 'baixa',
      completed: false,
      lastUpdate: null
    };

    const updatedItems = [...this.checklist.items, newChecklistItem];
    
    this.checklistService.updateChecklist(this.checklist.id, { items: updatedItems }).subscribe({
      next: async (updatedChecklist) => {
        console.log('Checklist atualizado:', updatedChecklist);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Item adicionado com sucesso!',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.resetForm();
        this.showAddForm = false;
        // Recarrega o checklist completo do servidor
        if (this.currentUser?.id) {
          this.checklistService.getChecklistByUser(this.currentUser.id).subscribe({
            next: (freshChecklist) => {
              console.log('Checklist recarregado:', freshChecklist);
              this.checklist = freshChecklist;
              this.groupItemsByCategory();
            },
            error: (err) => console.error('Erro ao recarregar:', err)
          });
        }
      },
      error: async (error) => {
        console.error('Erro ao adicionar item:', error);
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível adicionar o item.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async loadChecklist() {
    const loading = await this.loadingController.create({
      message: 'Carregando checklist...'
    });
    await loading.present();

    if (!this.currentUser || !this.currentUser.id) {
      await loading.dismiss();
      return;
    }

    this.checklistService.getChecklistByUser(this.currentUser.id).subscribe({
      next: async (checklist) => {
        this.checklist = checklist;
        this.groupItemsByCategory();
        await loading.dismiss();
      },
      error: async (error) => {
        if (error.status === 404) {
          this.checklistService.createChecklist(this.currentUser!.id!).subscribe({
            next: async (newChecklist) => {
              this.checklist = newChecklist;
              this.groupItemsByCategory();
              await loading.dismiss();
              const toast = await this.toastController.create({
                message: 'Checklist gerado com sucesso!',
                duration: 2000,
                color: 'success'
              });
              await toast.present();
            },
            error: async () => {
              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Erro',
                message: 'Não foi possível gerar o checklist.',
                buttons: ['OK']
              });
              await alert.present();
            }
          });
        } else {
          await loading.dismiss();
        }
      }
    });
  }

  groupItemsByCategory() {
    if (!this.checklist) return;

    this.groupedItems = {};
    this.checklist.items.forEach(item => {
      if (!this.groupedItems[item.category]) {
        this.groupedItems[item.category] = [];
      }
      this.groupedItems[item.category].push(item);
    });
    this.categories = Object.keys(this.groupedItems);
  }

  async toggleItemComplete(item: ChecklistItem) {
    if (!this.checklist) return;
    
    // Validação: se o item não tem ID válido, não pode atualizar
    if (!item.id || item.id === '') {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Item inválido. Por favor, recarregue a página.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Atualizando...'
    });
    await loading.present();

    this.checklistService.updateChecklistItem(
      this.checklist.id,
      item.id,
      { 
        completed: !item.completed,
        lastUpdate: new Date().toISOString()
      }
    ).subscribe({
      next: async (updatedChecklist) => {
        this.checklist = updatedChecklist;
        this.groupItemsByCategory();
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: item.completed ? 'Item desmarcado' : 'Item marcado como concluído',
          duration: 1500,
          color: 'success'
        });
        await toast.present();
      },
      error: async () => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível atualizar o item.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async regenerateChecklist() {
    const alert = await this.alertController.create({
      header: 'Regenerar Checklist',
      message: 'Deseja gerar um novo checklist baseado nos seus dados atualizados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Regenerar',
          handler: async () => {
            if (!this.currentUser || !this.currentUser.id) return;

            const loading = await this.loadingController.create({
              message: 'Regenerando checklist...'
            });
            await loading.present();

            this.checklistService.regenerateChecklist(this.currentUser.id).subscribe({
              next: async (newChecklist) => {
                this.checklist = newChecklist;
                this.groupItemsByCategory();
                await loading.dismiss();
                const toast = await this.toastController.create({
                  message: 'Checklist regenerado com sucesso!',
                  duration: 2000,
                  color: 'success'
                });
                await toast.present();
              },
              error: async () => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Erro',
                  message: 'Não foi possível regenerar o checklist.',
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

  getCompletedPercentage(): number {
    if (!this.checklist || this.checklist.items.length === 0) return 0;
    const completed = this.checklist.items.filter(item => item.completed).length;
    return Math.round((completed / this.checklist.items.length) * 100);
  }

  getCompletedCount(): number {
    if (!this.checklist) return 0;
    return this.checklist.items.filter(item => item.completed).length;
  }

  getTotalCount(): number {
    if (!this.checklist) return 0;
    return this.checklist.items.length;
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
