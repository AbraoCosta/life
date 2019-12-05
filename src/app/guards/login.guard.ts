import { Injectable } from '@angular/core';
import {Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getFire().auth().onAuthStateChanged(user => {
        if (user) this.router.navigate(['store']);

          resolve(!user ? true : false);
    })
  });
}
}
