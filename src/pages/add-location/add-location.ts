import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, LoadingController, } from 'ionic-angular';
import {DatabaseProvider} from'../../providers/database/database';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

/**
 * Generated class for the AddLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html',
})
export class AddLocationPage {
  public addLocationForm: FormGroup;
  public branches:Array<any>;
  constructor(public loadingctrl:LoadingController,public navCtrl: NavController, public navParams: NavParams, public databaseService:DatabaseProvider,public formBuilder: FormBuilder,
  ) {
    this.addLocationForm = formBuilder.group({
      name: ["", Validators.required],
      branch: ["", Validators.required],
      logo: ["", Validators.required],

  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLocationPage');
  }

  addLocation(){
    const loading=this.loadingctrl.create();
    loading.present();
    const name=this.addLocationForm.value.name;
    const branch=this.addLocationForm.value.branch;
    const logo=this.addLocationForm.value.logo;
    const id= Math.floor(Date.now() / 1000) + ""; //change number to string

    this.databaseService.checkForLocation(name).then((s)=>{

      console.log(s.size);
      if(s.size!=0){    //if the restaurant is already saved in the db, just add the new branch
      s.forEach((g)=>{
        this.branches=g.data().locations;
        this.branches.push(branch);
        this.databaseService.addToExistingLocation(branch,g.id,this.branches).then(()=>{
          loading.dismiss().then(()=>{
            this.navCtrl.pop();

          })
        })
      })
    }else{
      this.databaseService.createLocation(name,branch,logo,id).then(()=>{
        loading.dismiss().then(()=>{
          this.navCtrl.pop();
        })
      })
    }
    })
  }

}
