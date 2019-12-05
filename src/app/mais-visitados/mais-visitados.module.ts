import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaisVisitadosPage } from './mais-visitados.page';

const routes: Routes = [
  {
    path: '',
    component: MaisVisitadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MaisVisitadosPage]
})
export class MaisVisitadosPageModule {}
