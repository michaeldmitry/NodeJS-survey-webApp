import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
//import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';
import { Event } from '../../models/event.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LoadingController, AlertController } from 'ionic-angular';
import { CreatePage } from '../../pages/create/create';
import { PopoverComponent } from '../../components/popover/popover';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public user: string;
    public userId: string;
    public eventList: Observable<Event[]>;
    public logoList:Array<any>;
    //public ref: AngularFirestoreCollection<Event>=this.firestore.collection('events');
    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserProvider
        , public databaseService: DatabaseProvider, public fire: AngularFirestore, public alrtCtrl:AlertController,
        public popoverCtrl:PopoverController
    ) { }

    ionViewDidEnter() {
        const loading = this.loadingCtrl.create();
        loading.present();
        // console.log('Events');
        this.logoList=[];
        this.user = this.userService.getUserName();
        this.userId = this.userService.getUserId();
         console.log(this.user, '=>', this.userId);
        this.eventList = this.databaseService.getUnassignedEventsList().valueChanges(); //Get all the events' details
        this.eventList=  this.eventList.map((each)=>{       //sort the events according to their dates ascendingly
                each.sort((a,b)=>{
                    var d1=new Date(a.date);
                    var h1 =parseInt(a.time[0]);
                    var when=a.time[1]+a.time[2];
                    if(h1==1){
                        if(a.time[1]=='2'){
                            h1=parseInt(a.time[0]+a.time[1]);
                            when=a.time[2]+a.time[3];
                        }
                    }
                        if(when=='PM'&&h1!=12){
                            h1=h1+12;
                        }
                    d1.setHours(h1);

                    var d2=new Date(b.date);
                    var h2 =parseInt(b.time[0]);
                    var when=b.time[1]+b.time[2];
                    if(h2==1){
                        if(b.time[1]=='2'){
                            h2=parseInt(b.time[0]+b.time[1]);
                            when=b.time[2]+b.time[3];
                        }
                    }
                        if(when=='PM'&&h2!=12){
                            h2=h2+12;
                        }
                    d2.setHours(h2);
                    console.log(d1,d2);
                    return d1.getTime()<d2.getTime()?-1:1;
                })
                return each;
        })
        
        loading.dismiss();
    }

    // presentPopover(myEvent) {
    //     let popover = this.popoverCtrl.create(PopoverComponent);
    //     popover.present({
    //       ev: myEvent
    //     });
    //   }

      
    pickSlot(id) { //if user clicks on an event
        // console.log('clicked');

        let alert = this.alrtCtrl.create({
            title: 'Pick This Slot',
            message: 'Are You Sure You Want to Pick This Slot?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Yes',
                handler: () => {
                    this.fire.collection('events').doc(id).set({    //set the user's auth id in the database, so that the event is assigned that user
                    user: this.userId
                },
                { 
                    merge: true 
                })                }
              }
            ]
          });
          alert.present();
       
    }

   
}
