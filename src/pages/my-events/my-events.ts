import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from '../../providers/database/database';
import { Observable } from 'rxjs';
import {Event} from '../../models/event.interface';
import { LoadingController, AlertController } from 'ionic-angular';
import Moment from 'moment';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';
import {UserProvider} from '../../providers/user/user';

/**
 * Generated class for the MyEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html',
})
export class MyEventsPage {
  public myEvents:Observable<Event[]>;
  public userId;
  constructor(public userService:UserProvider, public inapp:InAppBrowser, public loadingctrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public databaseService:DatabaseProvider) {
   this.userId=userService.getUserId();
  }

  ionViewDidEnter() {
   const loading=this.loadingctrl.create();
   loading.present();
    this.myEvents=this.databaseService.getEventsList().valueChanges();
      this.myEvents.forEach((docs)=>{ //Go through the events to get the due dates and compare them with current date
        docs.forEach((doc)=>{
          console.log(doc.date);
          let dateString=doc.date;
          let dateObject=Moment(dateString,"DD-MM-YYYY").toDate();
          console.log(dateObject);
          let currentDate=new Date();
                })
      })
   loading.dismiss();

  }

  notYet(id){
      this.databaseService.undoneEvent(id);
  }

  finished(id){
    this.databaseService.doneEvent(id).then(()=>{
      const options:InAppBrowserOptions={ //Direct the user to the survey
        zoom: 'no'
      }
      const browser=this.inapp.create('https://www.google.com/','_system',options); //should be the survey's link
    })
  }

  daysBetween(date1,date2){ //function to calc the difference between 2 dates
//Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
  }
}
