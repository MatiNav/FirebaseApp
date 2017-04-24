import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector:'slOptions-page',
    templateUrl:'sl-options.html',
})

export class SLOptionsPage {

constructor(public viewCtrl:ViewController){

}

    onAction(action: string){
        this.viewCtrl.dismiss({action:action});
    }
}