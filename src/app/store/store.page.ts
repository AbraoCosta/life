import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, MenuController, ActionSheetController, AlertController, IonSearchbar } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

import * as firebase from 'firebase';
import { environment, snapshotToArray } from 'src/environments/environment';
import { ProdutosDetailPage } from '../modal/produtos-detail/produtos-detail.page';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  public goalList: any[];
  public loadedGoalList: any[];

  produtos = [];
  ref = firebase.database().ref('produtos/');

  public userEmail: string;

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    
    private authService: AuthenticateService,

    public modalController: ModalController,

    private userEma: AppComponent
  ) {

    this.userEma.userEmail = firebase.auth().currentUser.email;

    if(userEma.userEmail == "abraocostarodrigues@gmail.com")
    {
      this.userEma.userNivel = "Nivel Administrativo";
    }
    else{
      this.userEma.userNivel = "Nivel Comum";
    }

    this.ref.push;
    this.ref.on('value', resp => {
      this.produtos = snapshotToArray(resp);
    });
  }

  ngOnInit() {
    this.ref.on('value', resp => {
      this.produtos = snapshotToArray(resp);
    });

    this.menu.open;
    this.menu.enable(true);
    
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack('');
    }

  }

  //começa aq o teste de implementação barra de busca
  
//termina aq o teste de implementação
  public logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }


  async EditarAlert(key, title, priceProd, yearProd, produtionProd, descriptionProd, imgProd) {

    const alert = await this.alertController.create({
      header: 'Editar produto ' + title,

      inputs: [
        {
          name: 'nome',
          placeholder: 'nome',

        },
        {
          name: 'preco',
          placeholder: 'Preço do Produto',
        },
        {
          name: 'ano',
          placeholder: 'Ano de lançamento',
        },
        {
          name: 'produtora',
          placeholder: 'Produtora',
        },
        {
          name: 'descricao',
          placeholder: 'Descrição do produto',
        },
        {
          name: 'imagem',
          placeholder: 'Imagem do produto'
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancela',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Salvar',
          handler: data => {            
              firebase.database().ref('Produtos/' + key).update;
              console.log('Confirm Okay');            
          }
        }
      ]
    })
    await alert.present();
}



  async ModalPage(title, priceProd, yearProd, produtionProd, descriptionProd, imgProd) {
    const modal = await this.modalController.create({
      component: ProdutosDetailPage,
      componentProps: {
        'NameProduto': title,
        'PriceProduto': priceProd,
        'YearProduto': yearProd,
        'ProdutionProduto': produtionProd,
        'DescriptionProduto': descriptionProd,
        'ImgProduto': imgProd
      }
    });
    return await modal.present();
  }

  async presentActionSheet(title, key, priceProd, yearProd, produtionProd, descriptionProd, imgProd) {
    if (firebase.auth().currentUser.email == "abraocostarodrigues@gmail.com") {
      const actionSheet = await this.actionSheetController.create({
        header: title,
        buttons: [{
          text: 'Detalhes',
          role: 'Abrir Detalhes',
          icon: 'list',
          handler: () => {
            console.log('Detalhes clicked');
            this.ModalPage(title, priceProd, yearProd, produtionProd, descriptionProd, imgProd);
          }
        }, {
          text: 'Editar',
          icon: 'create',
          handler: () => {
            console.log('Editar clicked');
            this.EditarAlert(key, title, priceProd, yearProd, produtionProd, descriptionProd, imgProd);
          }
        }, {
          text: 'Apagar',
          icon: 'trash',
          role: 'Deletar',
          handler: async () => {
            console.log('Deletar clicked');

            const alert = await this.alertController.create({
              header: 'Continuar',
              message: 'Deseja realmente apagar este item?',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'Cancelamento',
                  cssClass: 'secondary',
                  handler: () => {

                  }
                }, {
                  text: 'Sim',
                  handler: () => {
                    console.log('Delet Clicked');
                    firebase.database().ref('produtos/' + key).remove();
                  }
                }
              ]
            });
            await alert.present();
          }
        }]
      });
      await actionSheet.present();
    }
    else {
      const actionSheet = await this.actionSheetController.create({
        header: title,
        buttons: [{
          text: 'Detalhes',
          role: 'Abrir Detalhes',
          icon: 'list',
          handler: () => {
            console.log('Detalhes clicked');
            this.ModalPage(title, priceProd, yearProd, produtionProd, descriptionProd, imgProd);
          }
        }]
      });
      await actionSheet.present();
    }
  }

}