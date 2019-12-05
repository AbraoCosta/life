import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  all: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private menu: MenuController,
    private alertController: AlertController,
    private loadingController: LoadingController
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

  loginUser(value) {
    this.presentLoading();
    this.authService.loginUser(value) 
      .then(res => {                
        console.log(res);
        this.errorMessage = "";        
        this.navCtrl.navigateForward('/store');
      }, err => {
        console.log(err);
        switch(err.code)
        {
            case "auth/user-not-found":
              this.all = "Usuário não cadastrado";
            break;

            case "auth/wrong-password":
              this.all = "Senha não corresponde ao usuário"

        }
        this.presentAlert();
      })
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor aguarde...',
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading Terminado!');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: this.all,
      buttons: ['Continuar']
    });
    await alert.present();
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/registro');
  }
}