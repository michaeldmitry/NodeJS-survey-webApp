import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {MyEventsPage} from'../my-events/my-events';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = HomePage;
  tab2Root = MyEventsPage;
 // tab3Root = ContactPage;

  constructor() {

  }
}
