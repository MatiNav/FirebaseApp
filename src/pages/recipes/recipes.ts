import { Recipe } from './../recipe/recipe';
import { RecipesElement } from './../../models/recipes';
import { RecipeService } from './../../services/recipes';
import { EditRecipe } from './../edit-recipe/edit-recipe';
import { EditIngredient } from './../edit-ingredient/edit-ingredient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Recipes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {

   recipes: RecipesElement[];

  constructor(public recipeSrv:RecipeService, public navCtrl: NavController, public navParams: NavParams) {
  
}

ionViewWillEnter(){
  this.recipes = this.recipeSrv.getRecipes();
}

  onNewRecipe(){
    this.navCtrl.push(EditRecipe, {mode:'New'});
  }

  onLoadRecipe(recipe:RecipesElement, index:number){
    this.navCtrl.push(Recipe,{mode:'edit',recipe: recipe, index: index});
  }

}
