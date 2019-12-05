import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticateService } from '../services/authentication.service';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) { }

  public userMenu: AppComponent;
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getFire().auth().onAuthStateChanged(user => {
        if (!user) this.router.navigate(['login']);
        
          resolve(user ? true : false);
    })
  });
}
}
