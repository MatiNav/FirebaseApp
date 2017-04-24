import { AuthService } from './auth';
import { IngredientElement } from './../models/ingredients';
import { Injectable, } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {

    constructor(public http: Http, public authServ: AuthService) { }

    private ingredients: IngredientElement[] = [];

    addItem(name: string, amount: number) {
        this.ingredients.push(new IngredientElement(name, amount));
        console.log(this.ingredients);
    }

    addItems(items: IngredientElement[]) {
        this.ingredients.push(...items);
    }

    getItems() {
        return this.ingredients.slice(); //slice devuelve una copia de los array
    }
    storeList(token: string) {
        const userId = this.authServ.getCurrentUser().uid;
        return this.http
            .put('https://beaming-talent-159521.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
            .map((response: Response) => {
                return response.json();
            });

    }

    fetchList(token: string) {
        const userId = this.authServ.getCurrentUser().uid;
        return this.http
            .get('https://beaming-talent-159521.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
            .map((response: Response) => {
                return response.json();
            }).do((data) => {
                this.ingredients = data;
            });

    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }



}