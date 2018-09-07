import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AboutPage} from '../pages/about/about';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import { UserProvider } from '../providers/user/user';
import { DatabaseProvider } from '../providers/database/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {MyEventsPage} from '../pages/my-events/my-events';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {CreatePage} from '../pages/create/create';
import {CreatePageModule} from '../pages/create/create.module';
import { PopoverComponent } from '../components/popover/popover';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCS2Uehu5QaikEKWRtpv__Z05Dq6oEbiXA",
  authDomain: "servebetter-4ad7f.firebaseapp.com",
  databaseURL: "https://servebetter-4ad7f.firebaseio.com",
  projectId: "servebetter-4ad7f",
  storageBucket: "servebetter-4ad7f.appspot.com",
  messagingSenderId: "993187465205"
};
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MyEventsPage,
    PopoverComponent
   // CreatePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpModule,
    HttpClientModule,
    CreatePageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MyEventsPage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
