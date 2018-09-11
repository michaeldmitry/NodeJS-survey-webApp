import { Component, ViewChild } from '@angular/core';
import { Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CreatePage} from '../pages/create/create';
import {AddLocationPage} from '../pages/add-location/add-location';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage:any = LoginPage;

  pages:Array<{title:string,component:any, icon:string}>;

  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pages=[
        {title: 'Create Event', component:CreatePage, icon:'briefcase'},
        {title: 'Add Location', component:AddLocationPage, icon:'compass'},
      ]
    });
  }

  openPage(p){
    console.log(p.title);
    this.nav.push(p.component);
  }
}
