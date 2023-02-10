import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  login(email: string, password: string){
    try {
      const userCredential = signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  logout(){ return signOut(this.auth);}

  register(email: string, password: string){
    try {
      const userCredential = createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      console.log(error);
      return null;  
    }
  }
}
