import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-produtos-detail',
  templateUrl: './produtos-detail.page.html',
  styleUrls: ['./produtos-detail.page.scss'],
})
export class ProdutosDetailPage implements OnInit {

   // Data passed in by componentProps
   @Input() NameProduto: string;
   @Input() PriceProduto: string;
   @Input() YearProduto: string;
   @Input() ProdutionProduto: string;
   @Input() DescriptionProduto: string;
   @Input() ImgProduto : ImageBitmap;

   constructor(
     navParams: NavParams,
     private ModalController: ModalController
     ) {
     // componentProps can also be accessed at construction time using NavParams
     console.log(navParams.get('NameProduto'));
     console.log(navParams.get('PriceProduto'));
     console.log(navParams.get('YearProduto'));
     console.log(navParams.get('ProdutionProduto'));
     }


  ngOnInit() {
  }

  async CloseModal(){
    await this.ModalController.dismiss();
  }
}
