import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';
import {
  ToastController
} from "ionic-angular";
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user;
  public userEmail;
  public userPassword;
  constructor( public userService:UserProvider,
    private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, private auth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(email,pass){
    try{
      this.auth.auth.signInWithEmailAndPassword(email,pass).then((result)=>{
        this.user=this.userService.getUserName(); 
       console.log('display =>', this.user);
       if(this.user==null){
        this.user=result.user.email;
       }
        this.userService.setUser(this.user,result.user.uid);
      }).then(()=>{
        let toast = this.toastCtrl.create({
          message: 'Welcome '+this.user+'!'
          ,
          duration: 3000,
          position: "top"
          });
          toast.present();
        this.navCtrl.push(TabsPage);
      })
    }catch(e){
      console.log(e);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
  loginWithFacebook(){
    this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res)=>{
      console.log(res.user.displayName, '=>', res.user.uid);
        this.user=res.user.displayName;
        this.userService.setUser(this.user,res.user.uid); //set the user's facebook name and auth id to use them later

    }).then(()=>{ //Display a welcome message
      let toast = this.toastCtrl.create({
        message: 'Welcome '+this.user+'!'
        ,
        duration: 3000,
        position: "top"
        });
        toast.present();
      this.navCtrl.push(TabsPage);

    })
  }
}
