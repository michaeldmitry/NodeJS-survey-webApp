import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserProvider} from '../../providers/user/user';
import {HomePage} from '../home/home';
import firebase from 'firebase';
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
          loading.dismiss();

         // console.log(this.auth.auth.currentUser);
        this.auth.auth.currentUser.sendEmailVerification().then(()=>{
           // this.auth.authState.subscribe(s=>{

//           this.auth.auth.onAuthStateChanged(g=>{
//             if(!g.emailVerified)
// this.auth.auth.currentUser.delete();
//           })

     //   })

  //     loading.dismiss().then(()=>{
  //       if(this.auth.auth.currentUser.emailVerified){
  //       let toast = this.toastCtrl.create({
  //         message: "You've Created a New Account Successfully!"
  //         ,
  //         duration: 3500,
  //         position: "top"
  //         });
  //         toast.present();
  //       }
  //       else{
  //         let toast = this.toastCtrl.create({
  //           message: "Please Verify Your Email Address"
  //           ,
  //           duration: 3000,
  //           position: "top"
  //           });
  //           toast.present();
  //       }
  //     }).then(()=>{
  //       this.navCtrl.pop();
  //     })
  // this.auth.a
  // const unsubscribe = this.auth
  // .auth
  // .onAuthStateChanged(user => {
  //   if ( this.auth.auth.currentUser.emailVerified) {
  //     loading.dismiss();
  //     this.navCtrl.pop();
  //     this.navCtrl.push(HomePage)
  //     unsubscribe();
  //   } 
  // });
  // this.auth.user.subscribe(s=>{
  //   if(s.emailVerified)
  //   console.log("hello");
  // })
   }).then(()=>{
    this.navCtrl.push(HomePage);
  })

    });

   }

   catch(e){
     console.log(e);
   }
  }
}
