import { IngredientElement } from './ingredients';
export class RecipesElement {
    constructor(public title: string, public description: string, public difficulty: string, public ingredients: IngredientElement[]){

    }
}