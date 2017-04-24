import { AuthService } from './../services/auth';
import { SignIn } from './../pages/sign-in/sign-in';
import { SignUp } from './../pages/sign-up/sign-up';
import { Tabs } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase'
import {HTTP_PROVIDERS} from 'angular2/http';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  signUpPage: any = SignUp;
  signInPage: any = SignIn;
  tabsPage: any = Tabs;
  isAutenticated= false;
  @ViewChild('nav') nav: NavController;

  constructor
  ( public authSrv:AuthService,
  public menuCtrl: MenuController,
   platform: Platform,
    statusBar: StatusBar,
     splashScreen: SplashScreen) {
    firebase.initializeApp({
        apiKey: "AIzaSyBAvMWaiXHQ9VqsFN5YKT0JhbHd4nMr5lA",
        authDomain: "beaming-talent-159521.firebaseapp.com",
      })
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.isAutenticated = true;
        this.nav.setRoot(this.tabsPage);
      } else {
        this.isAutenticated = false;
        this.nav.setRoot(this.signInPage);
      }
    })
    platform.ready().then(() => {      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut() {
    this.authSrv.logOut();
    this.menuCtrl.close();
  }

}

