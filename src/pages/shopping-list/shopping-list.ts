import { AuthService } from './../../services/auth';
import { SLOptionsPage } from './sl-options/sl-options';
import { IngredientElement } from './../../models/ingredients';
import { ShoppingListService } from './../../services/shoppingList';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingList {

  public listItem: IngredientElement[];

  constructor(public authServ: AuthService, private loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public shoppingListService: ShoppingListService, public popOverCtrl: PopoverController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionWillEnter() {
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
    })
    const popover = this.popOverCtrl.create(SLOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (data) {
        if (data.action == 'load') {
          loading.present();
          this.authServ.getCurrentUser().getToken()
            .then((token: string) => {
              this.shoppingListService.fetchList(token).subscribe(
                (list: IngredientElement[]) => {
                  loading.dismiss();
                  if (list) {
                    this.listItem = list;
                  } else {
                    this.listItem = [];
                  }
                }, error => {
                  console.log(error);
                  loading.dismiss();
                  this.handleError(error.json().message);
                });
            });

        } else {
          loading.present();
          this.authServ.getCurrentUser().getToken()
            .then((token: string) => {
              this.shoppingListService.storeList(token).subscribe(
                () => {
                  console.log('success !!');
                  loading.dismiss();
                },
                error => {
                  console.log('error');
                  this.handleError(error.json().error);
                  loading.dismiss();
                });

            })
            .catch()
        }
      } else { return; }
    })
  }
  handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error ocurred!',
      message: errorMessage,
      buttons: ['Ok'],
    });
    alert.present();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(i) {
    this.shoppingListService.removeItem(i);
    this.loadItems();
  }

  private loadItems() {
    this.listItem = this.shoppingListService.getItems();
  }

}
