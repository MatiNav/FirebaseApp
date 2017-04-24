import { Http, HttpModule } from '@angular/http';
import { SLOptionsPage } from './../pages/shopping-list/sl-options/sl-options';
import { AuthService } from './../services/auth';
import { SignUp } from './../pages/sign-up/sign-up';
import { SignIn } from './../pages/sign-in/sign-in';
import { RecipeService } from './../services/recipes';
import { EditRecipe } from './../pages/edit-recipe/edit-recipe';
import { ShoppingListService } from './../services/shoppingList';
import { Recipe } from './../pages/recipe/recipe';
import { Recipes } from './../pages/recipes/recipes';
import { ShoppingList } from './../pages/shopping-list/shopping-list';
import { Tabs } from './../pages/tabs/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Tabs,
    ShoppingList,
    Recipes,
    EditRecipe,
    Recipe,
    SignIn,
    SignUp,
    SLOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Tabs,
    ShoppingList,
    Recipes,
    Recipe,
    EditRecipe,
    SignIn,
    SignUp,
    SLOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService,
    AuthService,
  ]
})
export class AppModule {}
