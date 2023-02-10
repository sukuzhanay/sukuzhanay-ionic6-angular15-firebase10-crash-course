import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder, FormControl}from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  // Getters for form fields
  get password() { return this.validations_form.get('password'); }
  get email() { return this.validations_form.get('email'); }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  // Login and register functions
  
  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.authService.login(this.validations_form.value);
    await loading.dismiss();
    if(user){
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      await this.showAlert('Error', 'Invalid email or password');
    }
  }

  async showAlert(header: string, message: string){
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const user = await this.authService.register(this.validations_form.value);
    await loading.dismiss();
    if(user){
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      await this.showAlert('Error', 'Try again !');
    }
  }
}
