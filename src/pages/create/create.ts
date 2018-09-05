import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Loading, LoadingController, AlertController, Alert} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {DatabaseProvider} from '../../providers/database/database';
/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  public createEventForm: FormGroup;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public navParams: NavParams,public formBuilder: FormBuilder, public databaseService:DatabaseProvider
  ) {
    this.createEventForm = formBuilder.group({
      name: ["", Validators.required],
      location: ["", Validators.required],
      image: ["", Validators.required],
      date: ["", Validators.required],
      time: ["", Validators.required]

  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  createEvent(){
    console.log('created');
    const loading: Loading = this.loadingCtrl.create();
    loading.present();

    const name=this.createEventForm.value.name;
    const location= this.createEventForm.value.location;
    const image=this.createEventForm.value.image;
    const date=this.createEventForm.value.date;
    const time=this.createEventForm.value.time;
    const id= Math.floor(Date.now() / 1000) + "";
    this.databaseService.createEvent(name,location,image,date,time,id).then(()=>{
      loading.dismiss().then(()=>{
        this.navCtrl.pop();
      })
    })
  }
}