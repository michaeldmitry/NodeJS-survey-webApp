import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AboutPage} from '../pages/about/about';
import {AddLocationPage} from '../pages/add-location/add-location';
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
import {RegisterPage} from '../pages/register/register';
import {CreatePageModule} from '../pages/create/create.module';
import { PopoverComponent } from '../components/popover/popover';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {Deeplinks} from '@ionic-native/deeplinks';
// Initialize Firebase
var config = {
  //config is removed for security reasons
};
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AddLocationPage,
    MyEventsPage,
    RegisterPage,
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
    CreatePageModule,
    IonicPageModule.forChild(HomePage)


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    AddLocationPage,
    MyEventsPage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Deeplinks,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    Camera,
    BarcodeScanner,
    DatabaseProvider
  ]
})
export class AppModule {}
