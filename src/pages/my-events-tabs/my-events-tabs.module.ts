import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyEventsTabsPage } from './my-events-tabs';

@NgModule({
  declarations: [
    MyEventsTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyEventsTabsPage),
  ],
})
export class MyEventsTabsPageModule {}
