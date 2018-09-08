import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public userName;
  public userEmail;
  public userPassword;

  constructor(private toastCtrl:ToastController ,public loadingCtrl:LoadingController ,public userService:UserProvider, private auth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(email,pass,name){
      const loading=this.loadingCtrl.create();
      loading.present();
    try{
    this.auth.auth.createUserWithEmailAndPassword(email,pass).then((result)=>{
          this.userService.setNameTemp(name);
          console.log(this.userService.getUserName());
        }).then(()=>{
      loading.dismiss().then(()=>{
        let toast = this.toastCtrl.create({
          message: "You've Created a New Account Successfully!"
          ,
          duration: 3500,
          position: "top"
          });
          toast.present();
      }).then(()=>{
        this.navCtrl.pop();
      })
    })
   }
   catch(e){
     console.log(e);
   }
  }
}
