import { Component, OnInit } from '@angular/core';

import { CrudService } from './../services/crud.service';
import * as firebase from 'firebase';
import { environment, snapshotToArray } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-produtos',
  templateUrl: './detalhes-produtos.page.html',
  styleUrls: ['./detalhes-produtos.page.scss'],
})
export class DetalhesProdutosPage implements OnInit {

  produtos = [];
  
  ref = firebase.database().ref('produtos/');
  inputText: String;
  inputText1: Number;
  inputText2: String;
  inputText3: ImageBitmap;
  inputText4: String;
  inputText5: String;

  constructor(
    private alertController: AlertController
  ) {
    this.ref.on('value', resp => {
      this.produtos = snapshotToArray(resp);
    });
  }

  ngOnInit() {

  }

  addItem(produtoAdd) {
    if(this.inputText == "" || this.inputText1 == 0 || this.inputText2 == "" || this.inputText3 == null || this.inputText4 == "" || this.inputText5 == ""){
     
      this.presentAlert("Por favor preencha todos os campos");     
      this.inputText =" ";
      this.inputText1 = 0;
      this.inputText2 = "";
      this.inputText3 = null ;
      this.inputText4 = "" ;
      this.inputText5 = "" ;
      
    }
    else{
      if(this.inputText1 !=0){
      let newItem = this.ref.push();
      newItem.set(produtoAdd);      
      this.inputText =" ";
      this.inputText1 = 0;
      this.inputText2 = "";
      this.inputText3 = null ;
      this.inputText4 = "" ;
      this.inputText5 = "" ;
      this.presentAlert("Produto cadastrado com sucesso!");
      }
    }   
    
  }

  async presentAlert(mess) {
    const alert = await this.alertController.create({
      header: 'Informativo',
      message: mess,
      buttons: ['Continuar']
    });
    await alert.present();
  }

}