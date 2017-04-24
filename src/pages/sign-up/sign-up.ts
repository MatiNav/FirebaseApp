import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {

  constructor(
    public authSrv:AuthService,
     public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl:AlertController,
     public loadingCtrl:LoadingController) {
  }

  onSignUp(form:NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing up...'
    })
    loading.present();
    this.authSrv.signUp(form.value.email,form.value.password).then(data =>{
       loading.dismiss();
        })
    .catch(error =>{
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title:'Sign up Error',
        message: error.message,
        buttons: ['OK'],
      });
      alert.present();

      });
  }

}
