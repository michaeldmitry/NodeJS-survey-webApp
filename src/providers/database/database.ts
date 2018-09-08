import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Event } from '../../models/event.interface';
import { UserProvider } from '../../providers/user/user';
import {locations} from '../../models/locations.interface';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()

export class DatabaseProvider {


    constructor(public firestore: AngularFirestore, public userService: UserProvider) {
        console.log('Hello DatabaseProvider Provider');
    }

    createEvent(name: String, location: string, image: string, date: string, time: string, id: string): Promise<void> {

        return this.firestore.collection('events').doc(id).set({
            name: name,
            date: date,
            done: false,
            id: id,
            image: image,
            location: location,
            time: time,
            user: ""
        })
    }

    createLocation(name:string,branch:string,logo:string,id:string):Promise<void>{
        console.log(name);
           return this.firestore.collection('restaurants').doc(id).set({
               name:name,
               locations:[branch],
               logo:logo,
               id:id
           })
    }

    getUnassignedEventsList(): AngularFirestoreCollection<Event> {

        return this.firestore.collection('events', ref =>
            ref.where('user', '==', '')
        );
    }
    
    getAssignedEventsList(): AngularFirestoreCollection<Event> {
        var userId = this.userService.getUserId();
        return this.firestore.collection('events', ref =>
            ref.where('user', '==', userId).where('done','==',false)
        );
    }
    getPreviousAssignedEventsList(): AngularFirestoreCollection<Event> {
        var userId = this.userService.getUserId();
        return this.firestore.collection('events', ref =>
            ref.where('user', '==', userId).where('done','==',true)
        );
    }
    undoneEvent(id) {
        this.firestore.collection('events').doc(id).set({
            user: ''
        },
            {
                merge: true
            })
    }

    doneEvent(id): Promise<void> {
        return this.firestore.collection('events').doc(id).set({
            done: true
        },
            {
                merge: true
            })
    }

    getLocationsList():AngularFirestoreCollection<locations>{
        return this.firestore.collection('restaurants');
    }

    getLocationBranches(s:string):AngularFirestoreCollection<locations>{
       // console.log(s);
        return this.firestore.collection('restaurants',ref =>ref.where('name','==', s));
    }

    checkForLocation(s:string){
        return this.firestore.collection('restaurants').ref.where('name','==', s).get();
    }

    addToExistingLocation(branch:string, id:string,s:Array<any>):Promise<void>{
          return  this.firestore.collection('restaurants').doc(id).update({
                locations:s,
              //  locations:[branch]
            })
    }
}
