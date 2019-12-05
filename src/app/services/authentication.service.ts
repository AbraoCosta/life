import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
 
@Injectable()
export class AuthenticateService {
 
  constructor(){
  }
  
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  loginUser(value){
  firebase.auth.Auth.Persistence.NONE;
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  getFire()
  {
    return firebase;
  }

  userDetails(){
    return firebase.auth().currentUser;
  }
}