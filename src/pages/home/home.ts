import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';
import { Event } from '../../models/event.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LoadingController, AlertController } from 'ionic-angular';
import { CreatePage } from '../../pages/create/create';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public user: string;
    public userId: string;
    public eventList: Observable<Event[]>;
    //public ref: AngularFirestoreCollection<Event>=this.firestore.collection('events');
    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserProvider
        , public databaseService: DatabaseProvider, public fire: AngularFirestore
    ) { }

    ionViewDidEnter() {
        const loading = this.loadingCtrl.create();
        loading.present();
        // console.log('Events');
        this.user = this.userService.getUserName();
        this.userId = this.userService.getUserId();
        // console.log(this.user, '=>', this.userId);
        this.eventList = this.databaseService.getUnassignedEventsList().valueChanges(); //Get all the events' details
        loading.dismiss();
    }

    pickSlot(id) { //if user clicks on an event
        // console.log('clicked');
        this.fire.collection('events').doc(id).set({    //set the user's auth id in the database, so that the event is assigned that user
            user: this.userId
        },
        { 
            merge: true 
        })
    }

    goToCreatePage(): void {
        this.navCtrl.push('CreatePage');
    }
}
