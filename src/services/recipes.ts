import { IngredientElement } from './../models/ingredients';
import { RecipesElement } from './../models/recipes';
export class RecipeService {
    public recipes: RecipesElement[] = [];

    addRecipe(title:string, description:string, difficulty:string, ingredients:IngredientElement[]){
        this.recipes.push(new RecipesElement(title,description,difficulty,ingredients));
    }

    getRecipes(){
        return this.recipes.slice();
    }

    updateRecipe(index:number, title:string, description:string, difficulty:string, ingredients:IngredientElement[]){
        this.recipes[index] = new RecipesElement(title,description,difficulty,ingredients);
    }

    removeIndex(index:number){
        this.recipes.splice(index, 1);
    }

}