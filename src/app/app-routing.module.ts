import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },    

  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard]  },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'store', loadChildren: './store/store.module#StorePageModule', canActivate: [AuthGuard] },
  { path: 'list', loadChildren: './list/list.module#ListPageModule'},
  { path: 'mais-visitados', loadChildren: './mais-visitados/mais-visitados.module#MaisVisitadosPageModule' },
  { path: 'historico', loadChildren: './historico/historico.module#HistoricoPageModule' },
  { path: 'detalhes-produtos', loadChildren: './detalhes-produtos/detalhes-produtos.module#DetalhesProdutosPageModule' },
  { path: 'produtos-detail', loadChildren: './modal/produtos-detail/produtos-detail.module#ProdutosDetailPageModule' }
];  


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
