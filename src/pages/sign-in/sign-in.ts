import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the SignIn page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignIn {

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public loadingCtrl:LoadingController,
   public alertCtrl:AlertController,
   public authSrv: AuthService) {
  }

  onSignIn(form:NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing in...'
    })
    loading.present();
    this.authSrv.signIn(form.value.email,form.value.password).then(data =>{
       loading.dismiss();
        })
    .catch(error =>{
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title:'Sign InError',
        message: error.message,
        buttons: ['OK'],
      });
      alert.present();

    });
  }

}
