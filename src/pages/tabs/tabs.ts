import { Recipes } from './../recipes/recipes';
import { ShoppingList } from './../shopping-list/shopping-list';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class Tabs{
    shoppingList = ShoppingList;
    recipes = Recipes;

    constructor(public navCtrl: NavController) {}
}