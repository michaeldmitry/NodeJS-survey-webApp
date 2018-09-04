import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import {Event} from '../../models/event.interface';


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()

export class DatabaseProvider {

  
  constructor(public firestore: AngularFirestore) {
    console.log('Hello DatabaseProvider Provider');
  }

  getEventsList():AngularFirestoreCollection<Event>{
  
    return this.firestore.collection('events');
  }

  undoneEvent(id){
    this.firestore.collection('events').doc(id).set({
      user:''
    },
  {merge:true})
  }

  doneEvent(id):Promise<void>{
    return this.firestore.collection('events').doc(id).set({
      done:true
    },
  {merge:true})
  }
}
