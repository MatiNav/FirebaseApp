import { RecipesElement } from './../../models/recipes';
import { Recipes } from './../recipes/recipes';
import { RecipeService } from './../../services/recipes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'

@Component({
	selector: 'page-edit-recipe',
	templateUrl: 'edit-recipe.html',
})
export class EditRecipe {

	mode = 'New';
	dificultad: any; // si bien no es necesario que la variable definida por el ngMOdel estae definida en el ts, lo hago por una cuestion de orden
	selectedOptions = [{ code: "easy", desc: 'EASY' },
	{ code: "medium", desc: "MEDIUM" },
	{ code: "difficult", desc: "DIFFICULT" }]; // ejemplo de como funciona el NGMODEL, por defecto guarda lo que se muestra
	// sino guarda lo que vos le setees a la variable definida con el ngModel con el atributo
	// que es [value]
	recipeForm: FormGroup;
	recipe: RecipesElement;
	index: number;

	constructor(public recipeService: RecipeService, public toastCtl: ToastController, public alrtController: AlertController, public navCtl: NavController, public navParams: NavParams, public actSheet: ActionSheetController) {
		this.mode = this.navParams.get('mode');
		if (this.mode == 'edit') {
			this.recipe = this.navParams.get('recipe');
			this.index = this.navParams.get('index');
		}
		this.initializeForm();
	}

	initializeForm() {

		let title = null;
		let description = null;
		let difficulty = 'Medium';
		let ingredients = [];

		if (this.mode == 'edit') {
			title = this.recipe.title;
			description = this.recipe.description;
			difficulty = this.recipe.difficulty;

			for (let ingredient of this.recipe.ingredients) {
				ingredients.push(new FormControl(ingredient.name, Validators.required));
			}
		}


		this.recipeForm = new FormGroup({
			'title': new FormControl(title, Validators.required),
			'description': new FormControl(description, Validators.required),
			'difficulty': new FormControl(difficulty, Validators.required),
			'ingredients': new FormArray(ingredients),
		});
	}

	onSubmit() {
		const value = this.recipeForm.value;
		let ingredients = [];
		if (value.ingredients.length > 0) {
			ingredients = value.ingredients.map(name => { return { name: name, amount: 1 } });
		}
		if (this.mode == 'edit') {
			this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty, value.ingredients);
		}

		this.recipeService.addRecipe(value.title, value.description, value.difficulty, value.ingredients);
		this.recipeForm.reset();
		this.navCtl.popTo(Recipes);
	}

	onManageIngredients() {
		const actionSheet = this.actSheet.create({
			title: 'What do you want to do?',
			buttons: [
				{
					text: 'Add Ingredient',
					handler: () => {
						this.createNewIngredientAlert().present();
					}
				},
				{
					text: 'Remove all Ingredients',
					role: 'destructive',
					handler: () => {
						const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
						const len = fArray.length;
						if (len > 0) {
							for (let i = len - 1; i >= 0; i--) {
								fArray.removeAt(i);
							}
						}
					}
				}, {
					text: 'Cancel',
					role: 'cancel',
				}
			]
		});

		actionSheet.present();
	}

	createNewIngredientAlert() {
		const alert = this.alrtController.create({
			title: 'Add ingredient',
			inputs: [
				{
					name: 'name',
					placeholder: 'Name',
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
				},
				{
					text: 'Add',
					handler: data => {
						if (data.name.trim() == '' || data.name == null) {
							const toast = this.toastCtl.create({
								message: 'Enter a valid value!',
								duration: 1000,
								position: 'bottom',
							});
							toast.present();
							return;
						}
						(<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required)); // el formArray es necesario
						const toast = this.toastCtl.create({
							message: 'Rigth Job due!!',
							duration: 1000,
							position: 'top',
						});
						toast.present();
					}
				}
			]
		})

		return alert;

	}

}
