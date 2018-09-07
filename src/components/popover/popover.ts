import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CreatePage} from '../../pages/create/create';
import {AddLocationPage} from '../../pages/add-location/add-location';
/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;

  constructor(public navCtrl:NavController) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
  }

  goToCreatePage(){
    
      this.navCtrl.push(CreatePage);
  }

  goToAddLocationPage(){
      this.navCtrl.push(AddLocationPage);
  }
}
