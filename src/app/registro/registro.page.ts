import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  all: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'O campo email é obrigatorio.' },
      { type: 'pattern', message: 'Por favor insira um email valido.' }
    ],
    'password': [
      { type: 'required', message: 'O campo senha é obrigatorio.' },
      { type: 'minlength', message: 'A senha precisa ter mais que 5 caracteres.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryRegister(value) {    
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.all = "Usuário cadastrado com sucesso.";
        this.presentAlert();
      }, err => {
        console.log(err);
        if (err.message = "The email address is already in use by another account.") {
          this.all = "Usuário ja cadastrado.";
        }
        this.presentAlert();
      })
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: this.all,
      buttons: ['Continuar']
    });
    await alert.present();
  }

}