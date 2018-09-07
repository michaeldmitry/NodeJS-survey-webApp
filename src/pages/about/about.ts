import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';
import { Observable } from 'rxjs';
import {Event} from '../../models/event.interface';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public myEventList:Observable<Event[]>;
  constructor(public navCtrl: NavController, public databaseService:DatabaseProvider) {

  }

  ionViewDidLoad(){
    // console.log('my Events');
    // this.myEventList=this.databaseService.getEventsList().valueChanges();
    // this.myEventList.subscribe((s)=>{
    //   console.log(s);
    //})
  }
}
