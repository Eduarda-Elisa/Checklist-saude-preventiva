import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  currentUser: User | null = null;

  healthConditions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hipertensao', label: 'Hipertensão' },
    { value: 'obesidade', label: 'Obesidade' },
    { value: 'cardiopatia', label: 'Cardiopatia' },
    { value: 'cancer', label: 'Histórico de Câncer' },
    { value: 'doenca_renal', label: 'Doença Renal' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      sex: ['', Validators.required],
      healthHistory: [[]]
    });
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser) {
      this.isEditMode = true;
      this.userForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
        age: this.currentUser.age,
        sex: this.currentUser.sex,
        healthHistory: this.currentUser.healthHistory || []
      });
    }
  }

  async onSubmit() {
    if (this.userForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos obrigatórios corretamente.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: this.isEditMode ? 'Atualizando dados...' : 'Cadastrando...'
    });
    await loading.present();

    const userData: User = this.userForm.value;

    if (this.isEditMode && this.currentUser && this.currentUser.id) {
      this.userService.updateUser(this.currentUser.id, userData).subscribe({
        next: async () => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Dados atualizados com sucesso!',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
          this.router.navigate(['/home']);
        },
        error: async (error) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados. Tente novamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: async () => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Cadastro realizado com sucesso!',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
          this.router.navigate(['/checklist'], { queryParams: { userId: userData.id } });
        },
        error: async (error) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Erro',
            message: error.error?.error || 'Não foi possível realizar o cadastro. Tente novamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    }
  }

  onCheckboxChange(event: any, value: string) {
    const healthHistory: string[] = this.userForm.get('healthHistory')?.value || [];
    if (event.detail.checked) {
      if (!healthHistory.includes(value)) {
        healthHistory.push(value);
      }
    } else {
      const index = healthHistory.indexOf(value);
      if (index > -1) {
        healthHistory.splice(index, 1);
      }
    }
    this.userForm.patchValue({ healthHistory });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
