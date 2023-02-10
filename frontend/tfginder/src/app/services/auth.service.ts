import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async login(email: string, password: string){
    try {
      const userCredential = signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  logout(){ return signOut(this.auth);}

  async register(email: string, password: string){
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      console.log(error);
      return null;  
    }
  }
}
