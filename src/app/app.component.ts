import { Component, NgZone } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { StorePage } from './store/store.page';

import { AuthenticateService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public userEmail: string;
  public userNivel: string;

  public store: StorePage;

  public appPages = [
    {
      title: 'Home',
      url: '/store',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Historico',
      url: '/historico',
      icon: 'clock'
    },
    {
      title: 'Mais Visitados',
      url: '/mais-visitados',
      icon: 'pricetag'
    },
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private authent: AuthenticateService,
    private menu: MenuController,
  ) {
    this.userEmail = "novo";
    this.userNivel = "Nivel Comum";
    this.initializeApp();
  }

  initializeApp() {
  }

  logout() {
    this.authent.logoutUser()
      .then(res => {
        console.log(res);
        this.menu.close();
        this.menu.enable(false);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

}