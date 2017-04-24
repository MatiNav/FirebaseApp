import { Recipes } from './../recipes/recipes';
import { RecipeService } from './../../services/recipes';
import { EditRecipe } from './../edit-recipe/edit-recipe';
import { RecipesElement } from './../../models/recipes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class Recipe {

  public recipe: RecipesElement;
  public index: number;

  constructor(public recipeServ: RecipeService, public navCtrl: NavController, public navParams: NavParams) {
    this.recipe = navParams.get('recipe');
    this.index = navParams.get('index');
}


onEditRecipe(){
  this.navCtrl.push(EditRecipe,{mode:'edit',recipe: this.recipe, index: this.index});
}

onDeleteRecipe(){
  this.recipeServ.removeIndex(this.index),
  this.navCtrl.popTo(Recipes);
}


}
